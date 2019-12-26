import Vue from 'vue'
import VueRouter from 'vue-router'

import home from '../src/pages/home'
import components from '../src/pages/components'

// home 
import download_page from '../src/pages/home/download'
import pack_page from '../src/pages/home/pack'
import debounce_page from '../src/pages/home/debounce'
import async_await_page from '../src/pages/home/async_await'
import form_validate from '../src/pages/home/formValidate'
import life_cycle from '../src/pages/home/lifeCycle'

// components
import draggable from '../src/pages/components/draggable'
import baiduMap from '../src/pages/components/baiduMap'


Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/home/download',
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
        },
        {
          path: 'async_await',
          name: 'async_await',
          meta: {active: 'home'},
          component: async_await_page,
        },
        {
          path: 'form_validate',
          name: 'form_validate',
          meta: {active: 'home'},
          component: form_validate,
        },
        {
          path: 'life_cycle',
          name: 'life_cycle',
          meta: {active: 'home'},
          component: life_cycle,
        }
      ]
    },
    {
      path: '/components',
      name: 'components',
      component: components,
      redirect: '/components/draggable',
      children: [
        {
          path: 'draggable',
          name: 'draggable',
          meta: {active: 'components'},
          component: draggable,
        },
        {
          path: 'baiduMap',
          name: 'baiduMap',
          meta: {active: 'components'},
          component: baiduMap,
        },
      ],
    },
  ]
})