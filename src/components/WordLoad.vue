<template>
  <div class="hello">
    <uploader
        browse_button="upload_word"
        :url="server_config.url+'/file/upload'"
        :multi_selection="false"
        :FilesAdded="filesAdded"
        :FileUploaded="fileUploaded"
        :filters="{
          mime_types : [
            { title : 'Word files', extensions : 'docx' },
          ],
          max_file_size : '10Mb'
        }"
        @inputUploader="inputUploader"
      />
    <img src="../assets/Word.png" id="banner"/>
    <span id="msg">{{ msg }}</span>
    <el-button id="return" type="danger" icon="el-icon-back" @click="returnExcel" circle>返回</el-button>
    <h2>Word模板上传</h2>
    <ul>
      <li>
        <span v-for="(file, index) in files" :key="index">{{file.name}}</span>
        <el-button id="upload_word" type="primary" icon="el-icon-document" plain round>选择文件</el-button>
      </li>
      <br>
      <li>
        <el-button id="upload" type="danger" @click="uploadStart()" icon="el-icon-upload" plain round>开始上传</el-button>
      </li>
      <br>
      <li>
        <el-dialog title="正在上传" :visible.sync="dialogTableVisible">
          <el-progress v-if="files.length>0" :text-inside="true" :stroke-width="20" :percentage="files[0].percent"></el-progress>
        </el-dialog>
      </li>
      <li>
        <el-tag id="warning" type="warning">只允许.docx文件, 最大只能上传100Mb的文件</el-tag>
      </li>
    </ul>
  </div>
</template>

<script>
import Uploader from '@/components/Uploader'
import axios from 'axios'
export default {
  name: 'WordLoad',
  data () {
    return {
      server_config: this.global.server_config,
      files:[],
      up: {},
      dialogTableVisible: false,
      msg: '基于模板的文档自动生成系统'
    }
  },
  computed: {
      status() {
        return this.files.length > 0 ? this.files[0].status : null;
      }
    },
    watch: {
      status() {
        if (this.status === 5) {
          this.$confirm('文件上传成功', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          }).then(() => {
            this.dialogTableVisible = false;
            axios.get('http://localhost:8881/word/updateWord', {
              header: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              'responseType': 'blob'
            }).then(function (response) {
              console.log("收到请求")
              const blob = new Blob([response.data], {type: 'application/msword'});
              const fileName = '报告.docx';
              if ('download' in document.createElement('a')) {
                const elink = document.createElement('a')
                elink.download = fileName
                elink.style.display = 'none'
                elink.href = URL.createObjectURL(blob)
                document.body.appendChild(elink)
                elink.click()
                URL.revokeObjectURL(elink.href)
                document.body.removeChild(elink)
              } else {
                navigator.msSaveBlob(blob, fileName)
              }
            });
          });
        }
      }
    },
    methods: {
      /**
       * setting single file limit
       * @param up
       * @param files
       */
      filesAdded(up, files) {
        if (up.files.length > 1) {
          up.removeFile(up.files[0])
        }
      },
      fileUploaded(up, file, res) {
        console.log('一个文件上传成功')
      },
      inputUploader(up) {
        this.up = up;
        this.files = up.files;
      },
      uploadStart() {
        this.dialogTableVisible = true;
        this.up.start();
      },
      returnExcel() {
        this.$router.push('/')
      }
    },
    components: {
      'uploader': Uploader
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello {
    margin: 0;
    padding: 0;
    background-image: url(../assets/background.jpg);
    background-size: cover;
    overflow: hidden;
    height: 97vh;
  }
  #upload_word,#upload{
    position: relative;
    left: 200px;
    top: 190px;
    width:15%;
    font-weight: bolder;
    font-size: large;
  }
  #warning{
    position: relative;
    left: 200px;
    top: 200px;
  }
  #banner{
    position: relative;
    width: 100px;
    height: 100px;
    top: 210px;
    left: 693px;
  }
  #msg, h2 {
    font-weight: bold;
    font-size: 25px;
    position: relative;
    left: 200px;
    top: 100px;
    color: #1E90FF;
    text-shadow: 3px 3px rgba(197, 223, 248,0.8),4px 4px rgba(197, 223, 248,0.8),5px 5px rgba(197, 223, 248,0.8),6px 6px rgba(197, 223, 248,0.8),7px 7px rgba(197, 223, 248,0.8),8px 8px rgba(197, 223, 248,0.8);
  }
  #msg{
    font-size: 50px;
    left: 190px;
    color: #000080;
  }
  #return{
    position: relative;
    color: white;
    font-weight: bold;
    right: 950px;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-flexbox;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
