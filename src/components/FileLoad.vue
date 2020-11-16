<template>
  <div class="hello">
    <uploader
        browse_button="upload_excel"
        :url="server_config.url+'/file/upload'"
        :multi_selection="false"
        :FilesAdded="filesAdded"
        :filters="{
          mime_types : [
            { title : 'Excel files', extensions : 'xlsx' },
          ],
          max_file_size : '400Mb'
        }"
        @inputUploader="inputUploader"
      />
    <h1>{{ msg }}</h1>
    <h2>Excel数据上传</h2>
    <ul>
      <li>
        <span v-for="(file, index) in files" :key="index">{{file.name}}</span>
        <el-button id="upload_excel" type="primary" round>选择文件</el-button>
      </li>
      <br>
      <li>
        <el-button type="danger" @click="uploadStart()" round>开始上传</el-button>
      </li>
      <br>
      <li>
        <el-dialog title="正在上传" :visible.sync="dialogTableVisible">
          <el-progress v-if="files.length>0" :text-inside="true" :stroke-width="20" :percentage="files[0].percent"></el-progress>
        </el-dialog>
      </li>
      <li>
        <el-tag type="warning">只允许.docx文件, 最大只能上传100Mb的文件</el-tag>
      </li>
    </ul>
  </div>
</template>

<script>
import Uploader from '@/components/Uploader'
export default {
  name: 'FileLoad',
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
            this.$router.push({ path: '/word'})
            this.dialogTableVisible = false;
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
      inputUploader(up) {
        this.up = up;
        this.files = up.files;
      },
      uploadStart() {
        this.dialogTableVisible = true;
        this.up.start();
      }
    },
    components: {
      'uploader': Uploader
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
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
