<template>
  <div class="container">
    <div class="prepare">
      <h3>前期准备</h3>
      <p>cnpm install --save vue-lottie</p>
    </div>
    <div class="stage">
      <lottie :options="defaultOptions" :height="200" :width="200" v-on:animCreated="handleAnimation" />
    </div>
  </div>
</template>
<script>
  import * as animationData from "@/assets/lottie/19083-elephant-jumping.json";
  export default {
    data() {
      return {
        defaultOptions: { animationData: animationData.default },
        animationSpeed: 1,
        anim: {}
      }
    },
    methods: {
      handleAnimation: function(anim) {
        this.anim = anim;
        console.log(anim); //这里可以看到 lottie 对象的全部属性
      },
    }
  }
</script>
<style lang="scss" scoped>
  
</style>