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
  width: 600px;
  height: 600px;
  border: 1px solid red;
}
</style>