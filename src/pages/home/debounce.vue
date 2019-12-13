<template>
  <div class="container">
    <div>
      <h3>防抖</h3>
      <Input v-model="name" @on-change="changeName()"></Input>
      <p>显示name：{{name}}</p>
      <p>显示showName：{{showName}}</p>
    </div>
    <div>
      <h3>节流</h3>
      <Input v-model="value" @on-change="changeValue"></Input>
      <p>显示name：{{value}}</p>
      <p>显示showName：{{showValue}}</p>
    </div>
  </div>
</template>
<script>
  import _ from 'lodash'
  export default {
    data() {
      return {
        name: '',
        showName: '',
        timer: null,

        value: '',
        showValue: '',
      }
    },
    methods: {
      // changeName() {
      //   //加入防抖
      //   clearTimeout(this.timer);
      //   this.timer = setTimeout(()=>{
      //     this.setName();
      //   }, 1000);
      // },
      // setName() {
      //   this.showName = this.name;
      // },


      /*
      * 使用lodash的debounce方法-防抖
      * 注意：debounce内部不能使用箭头函数
      */
      changeName: _.debounce(function() {
        this.showName = this.name;
      }, 1000, {
        // maxWait: 5000,
      }),
      /*
      * 使用lodash的throttle方法-节流
      * 注意：throttle内部不能使用箭头函数
      */
      changeValue: _.throttle(function() {
        this.showValue = this.value;
      }, 1000, {
        // leading: false, // 指定调用在节流开始前true/后false
      }),
    }
  }
</script>
<style lang="scss" scoped>
  .container {
    >div {
      margin-bottom: 30px;
      h3 {
        margin-bottom: 10px;
      }
      >p {
        margin-top: 10px;
      }
    }
  }
</style>