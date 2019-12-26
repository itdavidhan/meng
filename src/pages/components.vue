<template>
  <Layout>
    <Sider hide-trigger style="overflow-y: auto; background-color: #fff;">
      <Menu :active-name="activeIndex" theme="light" style="width: auto; padding-bottom: 70px;">
        <MenuItem name="draggable" to="/components/draggable">拖拽</MenuItem>
        <MenuItem name="baiduMap" to="/components/baiduMap">百度地图</MenuItem>
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