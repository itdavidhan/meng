<template>
  <div class="container">
    <div v-html="str"></div>
    formData: {{formData}}
    <Form :model="formData" ref="my-form" :rules="formValidate" :label-width="100">
      <FormItem label="姓名" prop="name">
        <Input v-model="formData.name" />
      </FormItem>
      <FormItem label="姓别">
        <RadioGroup v-model="formData.sex">
          <Radio label="male">Male</Radio>
          <Radio label="female">Female</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="出生日期" prop="date">
        <DatePicker type="date" :editable="false" placeholder="Select date" v-model="formData.date" @on-change="formData.date=$event"></DatePicker>
      </FormItem>
      <FormItem label="所在地" prop="area">
        <cityPicker @getCpData="getData" />
      </FormItem>
      <FormItem
        v-for="(item, index) in formData.wishes"
        :key="index"
        :label="'心愿 ' + (index+1)"
        :prop="'wishes.' + index + '.value'"
        :rules="[{required: true, message: 'wishes ' + (index+1) +' can not be empty', trigger: 'blur'}, { type: 'string', min: 5, message: 'Introduce no less than 5 words', trigger: 'blur' }]"
        >
        <Row>
          <Col span="18">
            <Input type="text" v-model="item.value" placeholder="Enter something..." />
          </Col>
          <Col span="4" offset="1">
            <Button @click="handleRemove(index)">Delete</Button>
          </Col>
        </Row>
      </FormItem>
      <FormItem>
        <Row>
          <Col span="12">
            <Button type="dashed" long @click="handleAdd" icon="md-add">Add wish item</Button>
          </Col>
        </Row>
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
      // const validateArea = (rule, value, callback) => {
      //   console.log('rule', rule)
      //   console.log('value', value)
      //   console.log('callback', callback)
      // }
      return {
        str: '',
        formData: {
          name: '',
          sex: 'male',
          date: '',
          area: '',
           // 心愿 - 动态添加
          wishes: [
            {value: '', id: 1},
          ],
        },
        formValidate: {
          name: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' },
            { type: 'string', min: 5, message: 'Introduce no less than 5 words', trigger: 'blur' }
          ],
          date: [{ required: true, message: 'Please select time', trigger: 'change' }],
          area: [{ required: true, message: 'Please select area', trigger: 'change' }],
          // area: [{ validator: validateArea, trigger: 'change' }],
        }
      }
    },
    created() {
    },
    methods: {
      handleAdd() {
        let id = (new Date()).getTime()
        this.formData.wishes.push({
          value: '',
          id
        })
      },
      handleRemove(index) {
        this.$Modal.confirm({
          title: '提示',
          content: '确定要删除吗？',
          onOk: () => {
            this.$Message.info('Clicked ok');
            this.formData.wishes.splice(index, 1)
          },
          onCancel: () => {
            this.$Message.info('Clicked cancel');
          }
        })
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