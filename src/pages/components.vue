<template>
  <Layout>
    <Sider hide-trigger style="overflow-y: auto; background-color: #fff;">
      <Menu :active-name="activeIndex" theme="light" style="width: auto; padding-bottom: 70px;">
        <MenuItem name="draggable" to="/components/draggable">拖拽</MenuItem>
        <MenuItem name="baiduMap" to="/components/baiduMap">百度地图</MenuItem>
        <MenuItem name="lottie" to="/components/lottie">lottie</MenuItem>
        <MenuItem name="better_scroll" to="/components/better_scroll">better scroll</MenuItem>
        <MenuItem name="echarts_line" to="/components/echarts_line">echarts折线图</MenuItem>
        <MenuItem name="echarts_map" to="/components/echarts_map">echarts地图</MenuItem>
        <MenuItem name="print" to="/components/print">打印</MenuItem>
        <MenuItem name="bar_chart_3d" to="/components/bar_chart_3d">3D柱状图</MenuItem>
        <MenuItem name="js_pdf" to="/components/js_pdf">导出pdf</MenuItem>
      </Menu>
    </Sider>
    <Layout :style="{padding: '0 24px 24px'}">
      <Breadcrumb :style="{margin: '24px 0'}">
        <BreadcrumbItem v-for="(item, index) in matched" :key="index">{{item | breadcrumbText}}</BreadcrumbItem>
      </Breadcrumb>
      <Content :style="{padding: '24px',' overflow-y': 'auto', background: '#fff'}">
        <router-view />
      </Content>
    </Layout>
  </Layout>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: this.$route.name,
        matched: [],
      }
    },
    methods: {
      setBreadcrumb() {
        this.matched = this.$route.matched.map(item => item.name);
      }
    },
    created() {
      this.setBreadcrumb();
    },
    filters: {
      breadcrumbText(path) {
        switch(path) {
          case 'components':
              return '组件';
          case 'draggable':
            return '拖拽';
          case 'baiduMap':
            return '百度地图';
          case 'lottie':
            return 'lottie';
          case 'echarts_line':
            return 'echarts折线图';
          case 'echarts_map':
            return 'echarts地图';
          case 'bar_chart_3d':
            return '3D柱状图';
          case 'js_pdf':
            return '导出pdf';
          default:
            return '缺省';
        }
      }
    },
    watch: {
      $route() {
        this.activeIndex = this.$route.name
        this.setBreadcrumb()
      }
    }
  }
</script>