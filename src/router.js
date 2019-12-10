import Vue from 'vue'
import VueRouter from 'vue-router'

import home from '../src/pages/home'
import page2 from '../src/pages/page2'

import download_page from '../src/pages/home/download'
import pack_page from '../src/pages/home/pack'
import debounce_page from '../src/pages/home/debounce'


Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      redirect: '/home/download',
      children: [
        {
          path: 'download',
          name: 'download',
          meta: {active: 'home'},
          component: download_page,
        },
        {
          path: 'pack',
          name: 'pack',
          meta: {active: 'home'},
          component: pack_page,
        },
        {
          path: 'debounce',
          name: 'debounce',
          meta: {active: 'home'},
          component: debounce_page,
        }
      ]
    },
    {
      path: '/page2',
      name: 'page2',
      component: page2,
    },
  ]
})