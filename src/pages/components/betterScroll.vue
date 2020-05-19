<template>
  <div class="container">
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <ul>
          <li>11111111111111111111111</li>
          <li>222222222222222222222</li>
          <li>33333333333333333</li>
          <li>444444444444444444444</li>
          <li>5555555555555555555</li>
          <li>6666666666666666666</li>
          <li>7777777777777777777777</li>
          <li>888888888888888888</li>
          <li>99999999999999999999999999</li>
          <li>00000000000000000000000000</li>
          <li>11111111111111111111111</li>
          <li>2222222222222222222222</li>
          <li>333333333333333333333</li>
          <li>44444444444444444444</li>
          <li>55555555555555</li>
          <li>6666666666666666666</li>
          <li>777777777777</li>
          <li>888888888888888888</li>
          <li>99999999999999999999999</li>
          <li>000000000000000000000000000</li>
          <li>11111111111111111111111</li>
          <li>2222222222222</li>
          <li>3333333333333</li>
          <li>444444444444444</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  export default {
    data() {
      return {
        bScroll: null,
        timer: null,
      }
    },
    mounted() {
      this.bScroll = new BScroll(this.$refs.wrapper, {
        pullDownRefresh: {
          threshold: 30, // 下拉距离超过30px触发pullingDown事件
          stop: 50 // 回弹停留在距离顶部20px的位置
        }

      })
      this.bScroll.on('pullingDown', (pos)=>{
        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
          this.bScroll.finishPullDown()
        }, 3000)
      });
      this.bScroll.on('touchEnd', (pos)=>{
        console.log(666)
      });
    },
    methods: {

    }
  }
</script>
<style lang="scss" scoped>
  .container {
    .wrapper {
      width: 500px;
      height: 400px;
      border: 1px solid #DDD;
      background-color: yellow;
      .content {
        background-color: red;
      }
    }
  }
</style>