import Vue from 'vue'
import Router from 'vue-router'
import FileLoad from '@/components/FileLoad'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FileLoad',
      component: FileLoad
    }
  ]
})
