<template>
  <div class="container">
    <h3>{{a}}</h3>
    <h3>{{b}}</h3>
    <h3>{{c}}</h3>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        a: '',
        b: '',
        c: '',
      }
    },
    mounted() {
      this.fn1();
      this.getAll();
    },
    methods: {
      async fn1() {
        this.a = '1'
        let n = await this.getNum()
        this.c = n
      },
      getNum() {
        return new Promise(resolve=>{
          setTimeout(()=>{
            resolve('3')
            this.b = '2'
          }, 3000)
        });
      },

      /*
      * Promise.all
      */
      getP1() {
        return new Promise(resolve => {
          resolve([1, 2, 3, 4]);
        })
      },
      getP2() {
        return new Promise(resolve => {
          resolve(['a', 'b', 'c', 'd']);
        })
      },
      getAll() {
        Promise.all([this.getP1(), this.getP2()]).then(result=>{
          console.log('result', result);
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  
</style>