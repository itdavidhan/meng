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
import table_example from '../src/pages/home/tableExample'
import matrix_table from '../src/pages/home/matrix_table'
import chinese_to_pinyin from '../src/pages/home/chineseToPinyin'
import example_list from '../src/pages/home/exampleList'
import editUrl from '../src/pages/home/editUrl'
import dividend from '../src/pages/home/dividend'

// components
import draggable from '../src/pages/components/draggable'
import baiduMap from '../src/pages/components/baiduMap'
import lottie from '../src/pages/components/lottie'
import better_scroll from '../src/pages/components/betterScroll'
import echarts_line from '../src/pages/components/echartsLine'
import echarts_map from '../src/pages/components/echartsMap'
import print from '../src/pages/components/print'
import bar_chart_3d from '../src/pages/components/barChart3D'
import js_pdf from '../src/pages/components/jsPdf'
import ztree from '../src/pages/components/ztree'
import quadrant from '../src/pages/components/quadrant'


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
        },
        {
          path: 'table_example',
          name: 'table_example',
          meta: {active: 'home'},
          component: table_example,
        },
        {
          path: 'matrix_table',
          name: 'matrix_table',
          meta: {active: 'home'},
          component: matrix_table,
        },
        {
          path: 'chinese_to_pinyin',
          name: 'chinese_to_pinyin',
          meta: {active: 'home'},
          component: chinese_to_pinyin,
        },
        {
          path: 'vue_json_excel',
          name: 'vue_json_excel',
          meta: {active: 'home'},
          component: ()=>import('@/pages/home/vueJsonExcel'),
        },
        {
          path: 'html_to_doc',
          name: 'html_to_doc',
          meta: {active: 'home'},
          component: ()=>import('@/pages/home/htmlToDoc'),
        },
        {
          path: 'example_list',
          name: 'example_list',
          meta: {active: 'home'},
          component: example_list,
        },
        {
          path: 'edit_url',
          name: 'edit_url',
          meta: {active: 'home'},
          component: editUrl,
        },
        {
          path: '/example_list/directive',
          name: 'directive',
          meta: {active: 'home'},
          component: ()=>import('@/pages/home/examples/directive'),
        },
        {
          path: '/example_list/calendar',
          name: 'calendar',
          meta: {active: 'home'},
          component: ()=>import('@/pages/home/examples/calendar'),
        },
        {
          path: 'dividend',
          name: 'dividend',
          meta: {active: 'home'},
          component: dividend,
        },
        
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
        {
          path: 'lottie',
          name: 'lottie',
          meta: {active: 'components'},
          component: lottie,
        },
        {
          path: 'better_scroll',
          name: 'better_scroll',
          meta: {active: 'components'},
          component: better_scroll,
        },
        {
          path: 'echarts_line',
          name: 'echarts_line',
          meta: {active: 'components'},
          component: echarts_line,
        },
        {
          path: 'echarts_map',
          name: 'echarts_map',
          meta: {active: 'components'},
          component: echarts_map,
        },
        {
          path: 'print',
          name: 'print',
          meta: {active: 'components'},
          component: print,
        },
        {
          path: 'bar_chart_3d',
          name: 'bar_chart_3d',
          meta: {active: 'components'},
          component: bar_chart_3d,
        },
        {
          path: 'js_pdf',
          name: 'js_pdf',
          meta: {active: 'components'},
          component: js_pdf,
        },
        {
          path: 'ztree',
          name: 'ztree',
          meta: {active: 'components'},
          component: ztree,
        },
        {
          path: 'quadrant',
          name: 'quadrant',
          meta: {active: 'components'},
          component: quadrant,
        },
      ],
    },
    {
      path: '/exercise',
      name: 'exercise',
      component: ()=>import('@/pages/exercise'),
      redirect: '/exercise/chart-data-link',
      children: [
        {
          path: 'chart-data-link',
          name: 'chartDataLink',
          meta: {active: 'exercise'},
          component: ()=>import('@/pages/exercise/chart_data_link'),
        }
      ]
    }
  ]
})