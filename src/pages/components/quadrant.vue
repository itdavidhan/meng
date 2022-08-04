<template>
  <div class="container">
    <QuadrantChart />
  </div>
</template>
<script>
  import QuadrantChart from './QuadrantChart'
  export default {
    components: {
      QuadrantChart,
    },
    mounted() { 
    },
    methods: {
      
    }
  }
</script>
<style lang="scss" scoped>
.container {
  width: 500px;
  height: 500px;
  border: 1px solid red;
}
</style>