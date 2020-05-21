<template>
  <div class="prepare">
    <h3 class="p-tit">前期准备</h3>
    <p v-for="item in planList">
      <span v-if="item.type=='text'">{{item.value}}</span>
      <a v-if="item.type=='href'" :href="item.href" target="_blank">{{item.value}}</a>
    </p>
  </div>
</template>
<script>
  export default {
    props: ['planList'],
    data() {
      return {

      }
    }
  }
</script>
<style lang="scss" scoped>
  .prepare {
    position: relative;
    padding: 20px;
    border: 1px solid #DDD;
    .p-tit {
      position: absolute;
      left: 10px;
      top: -12px;
      padding: 0 10px;
      background-color: #FFF;
    }
    >p {
      line-height: 30px;
    }
  }
</style>