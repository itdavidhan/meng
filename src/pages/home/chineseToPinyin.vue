<template>
  <div class="container">
    <Form :label-width="100">
      <FormItem label="中文" prop="name">
        <Input @on-keyup="changeToPinyin" v-model="chineseTxt" />
      </FormItem>
      <FormItem label="拼音">
        <Input v-model="pinyinTxt"></Input>
      </FormItem>
    </Form>
  </div>
</template>
<script>
  import vPinyin from '../../components/tools/vue-py'
  export default {
    data() {
      return {
        chineseTxt: '',
        pinyinTxt: '',
        timer: null,
      }
    },
    created() {
      
    },
    methods: {
      changeToPinyin() {
        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
          this.pinyinTxt = vPinyin.chineseToPinYin(this.chineseTxt)
          console.log('this.pinyinTxt', this.pinyinTxt)
        }, 600)
      },
    }
  }
</script>
<style lang="scss" scoped></style>