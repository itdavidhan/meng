<template>
  <Layout>
    <Sider hide-trigger :style="{'overflow-y': 'auto', background: '#fff'}">
        <Menu :active-name="activeIndex" theme="light" style="width: auto; padding-bottom: 70px;">
          <MenuItem name="download" to="/home/download">重命名下载</MenuItem>
          <MenuItem name="pack" to="/home/pack">批量打包下载</MenuItem>
          <MenuItem name="debounce" to="/home/debounce">防抖节流</MenuItem>
          <MenuItem name="async_await" to="/home/async_await">async & await</MenuItem>
          <MenuItem name="form_validate" to="/home/form_validate">表单验证</MenuItem>
          <MenuItem name="life_cycle" to="/home/life_cycle">生命周期</MenuItem>
          <MenuItem name="table_example" to="/home/table_example">表格示例</MenuItem>
          <MenuItem name="matrix_table" to="/home/matrix_table">矩阵表格</MenuItem>
          <MenuItem name="chinese_to_pinyin" to="/home/chinese_to_pinyin">汉字转拼音</MenuItem>
          <MenuItem name="example_list" to="/home/example_list">例子</MenuItem>
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
        created() {
            this.setBreadcrumb();
        },
        methods: {
            setBreadcrumb() {
                this.matched = this.$route.matched.map(item => item.name);
            }
        },
        filters: {
            breadcrumbText(path) {
                switch(path) {
                    case 'home':
                    case 'example_list':
                        return '例子';
                    case 'download':
                        return '重命名下载';
                    case 'pack':
                        return '批量打包下载';
                    case 'debounce':
                        return '防抖节流';
                    case 'async_await':
                        return 'async & await';
                    case 'form_validate':
                        return '表单验证';
                    case 'life_cycle':
                        return '生命周期';
                    case 'table_example':
                        return '表格示例';
                    case 'matrix_table':
                        return '矩阵网格';
                    case 'chinese_to_pinyin':
                        return '汉字转拼音';
                    default:
                        return '缺省';
                }
            }
        },
        watch: {
            $route(to, from) {
                this.activeIndex = this.$route.name
                this.setBreadcrumb()
            }
        }
    }
</script>