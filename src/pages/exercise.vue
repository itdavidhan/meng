<template>
  <Layout>
    <Sider hide-trigger style="overflow-y: auto; background-color: #fff;">
      <Menu :active-name="activeIndex" theme="light" style="width: auto; padding-bottom: 70px;">
        <MenuItem name="chartDataLink" to="/exercise/chart-data-link">数据图表联动</MenuItem>
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
          case 'exercise':
              return '练习';
          default:
            return path;
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