<template>
  <div class="container">
    <div v-html="str"></div>
    <Form :model="formData" ref="my-form" :rules="formValidate" :label-width="100">
      <FormItem label="姓名" prop="name">
        <Input v-model="formData.name"></Input> 
      </FormItem>
      <FormItem label="姓别">
        <RadioGroup v-model="formData.sex">
          <Radio label="male">Male</Radio>
          <Radio label="female">Female</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="出生日期" prop="date">
        <DatePicker type="date" placeholder="Select date" v-model="formData.date" @on-change="formData.date=$event"></DatePicker>
      </FormItem>
      <FormItem label="所在地" prop="area">
        <cityPicker @getCpData="getData" />
      </FormItem>
      <FormItem>
        <Button type="primary" @click="submit('my-form')">提交</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
  import cityPicker from '@/components/tools/cityPicker'
  export default {
    components: {cityPicker},
    data() {
      return {
        str: '',
        formData: {
          name: '',
          sex: 'male',
          date: '',
          area: '',
        },
        formValidate: {
          name: [{ required: true, message: 'The name cannot be empty', trigger: 'blur' }],
          date: [{ required: true, message: 'Please select time', trigger: 'change' }],
          area: [{ required: true, message: 'Please select area', trigger: 'change' }],
        }
      }
    },
    created() {
       
    },
    methods: {
      add() {
        alert(1);
      },
      submit(name) {
        this.$refs[name].validate(valid => {
          if(valid) {
            this.$Modal.success({
              title: '提示',
              content: '保存成功！'
            });
          }
        });
        // if(this.formData.name.length == 0) {
        //   this.$Message.error('请输入姓名');
        // } else if(this.formData.date.length == 0) {
        //   this.$Message.error('请输入出生日期');
        // } else if(this.formData.area.length == 0) {
        //   this.$Message.error('请输入所在地');
        // } else {
        //   this.$Modal.success({
        //     title: '提示',
        //     content: '保存成功！'
        //   });
        // }
      },
      getData(o) {
        console.log('o', o);
        this.formData.area = o.prov_name + o.city_name + o.area_name;
      },
    }
  }
</script>