<template> 
  <div class="container">
    <Button type="primary" @click="editUrl">修改url参数</Button>
  </div>
</template>
<script>
  import merge from 'webpack-merge';
  export default {
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {
      editUrl() {
        this.$router.push({
          undefined,
          query: merge(this.$route.query, {'maxPrice': '630', 'a': '123'})
        })
      }
    }
  }
</script>