<template>
  <div class="container">
    <div class="div1"><QuadrantChart /></div>
    <div class="div2"><LineStyleChart /></div>
  </div>
</template>
<script>
  import QuadrantChart from './QuadrantChart'
  import LineStyleChart from './LineStyleChart'
  export default {
    components: {
      QuadrantChart,
      LineStyleChart,
    },
    mounted() { 
    },
    methods: {
      
    }
  }
</script>
<style lang="scss" scoped>
.container {
  .div1, .div2 {
    width: 800px;
    height: 800px;
    border: 1px solid red;
  }
}
</style>