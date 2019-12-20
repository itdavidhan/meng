<template>
  <Layout>
    <Sider hide-trigger :style="{background: '#fff'}">
        <Menu active-name="download" theme="light" width="auto" :open-names="['1']">
            <Submenu name="1">
                <template slot="title">
                    <Icon type="ios-navigate"></Icon>
                    例子
                </template>
                <MenuItem name="download" to="/home/download">重命名下载</MenuItem>
                <MenuItem name="pack" to="/home/pack">批量打包下载</MenuItem>
                <MenuItem name="debounce" to="/home/debounce">防抖节流</MenuItem>
                <MenuItem name="async_await" to="/home/async_await">async & await</MenuItem>
                <MenuItem name="form_validate" to="/home/form_validate">表单验证</MenuItem>
                <MenuItem name="life_cycle" to="/home/life_cycle">生命周期</MenuItem>
            </Submenu>
            <Submenu name="2">
                <template slot="title">
                    <Icon type="ios-keypad"></Icon>
                    Item 2
                </template>
                <MenuItem name="2-1">Option 1</MenuItem>
                <MenuItem name="2-2">Option 2</MenuItem>
            </Submenu>
            <Submenu name="3">
                <template slot="title">
                    <Icon type="ios-analytics"></Icon>
                    Item 3
                </template>
                <MenuItem name="3-1">Option 1</MenuItem>
                <MenuItem name="3-2">Option 2</MenuItem>
            </Submenu>
        </Menu>
    </Sider>
    <Layout :style="{padding: '0 24px 24px'}">
        <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem v-for="(item, index) in matched" :key="index">{{item | breadcrumbText}}</BreadcrumbItem>
        </Breadcrumb>
        <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <router-view />
        </Content>
    </Layout>
  </Layout>
</template>
<script>
    export default {
        data() {
            return {
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
                    default:
                        return '缺省';
                }
            }
        },
        watch: {
            $route(to, from) {
                this.setBreadcrumb();
            }
        }
    }
</script>