import Vue from 'vue'
import Router from 'vue-router'
import FileLoad from '@/components/FileLoad'
import WordLoad from '@/components/WordLoad'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FileLoad',
      component: FileLoad
    },
    {
      path: '/word',
      name: 'WordLoad',
      component: WordLoad
    }
  ]
})
