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
        <DatePicker type="date" :editable="false" placeholder="Select date" :value="formData.date" @on-change="formData.date=$event"></DatePicker>
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

    <div>
      <h3>多选框:{{checkedArr}}</h3>
      <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <el-checkbox-group v-model="checkedArr" @change="changeCheck">
        <el-checkbox v-for="item in list" :label="item.value">
          {{item.name}}
        </el-checkbox>
      </el-checkbox-group>
    </div>

    <div style="width: 100%; height: 2000px; border: 1px solid red;">
      
      
      333: {{tableData}}
      <el-table :data="tableData" border @selection-change="handleSelectionChange">
        <el-table-column
              type="selection"
              width="55">
            </el-table-column>
        <el-table-column
          v-for="item in tableColumn"
          :prop="item.prop"
          :label="item.label"
          width="150">
          <template slot-scope="scope">
            <div v-if="!item.button">
              <div v-if="item.prop!='eee'">
                {{scope.row[item.prop]}}
              </div>
              <div v-else>
                <el-select v-model="scope.row.eee">
                  <el-option label="一" :value="1"></el-option>
                  <el-option label="二" :value="2"></el-option>
                  <el-option label="三" :value="3"></el-option>
                  <el-option label="四" :value="4"></el-option>
                </el-select>
              </div>
            </div>
            <div v-if="item.button">
              <el-button v-for="oItem in item.button_arr" @click.stop="handleClick(scope.row, oItem.type)" type="text" size="small" v-if="scope.row.showButton[oItem.type]">
                {{oItem.text}}
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    
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
        list: [
          {name: '中国银行', value: '001'},
          {name: '交通银行', value: '002'},
          {name: '招商银行', value: '003'},
          {name: '民生银行', value: '004'},
        ],
        checkedArr: [],
        checkAll: false,
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
        },

        tableData: [
          {aaa: 1, bbb: 2, ccc: 3, eee: 1, showButton: {edit: true, delete: false,},},
          {aaa: 11, bbb: 12, ccc: 13, eee: 2, showButton: {edit: false, delete: false,},},
          {aaa: 21, bbb: 22, ccc: 23, eee: 3, showButton: {edit: true, delete: true,},},
          {aaa: 31, bbb: 32, ccc: 33, eee: 3, showButton: {edit: false, delete: true,},},
        ],
        tableColumn: [
          {prop: 'aaa', label: 'AAA'},
          {prop: 'bbb', label: 'BBB'},
          {prop: 'ccc', label: 'CCC'},
          {
            prop: 'ddd', 
            label: 'DDD', 
            button: true, 
            button_arr: [
              {text: "编辑", type: 'edit'},
              {text: "删除", type: 'delete'},
            ]
          },
          {prop: 'eee', label: 'EEE'},

        ],
      }
    },
    created() {
    },
    methods: {
      handleSelectionChange(val) {
        console.log(333, val)
      },
      handleCheckAllChange(flag) {
        this.checkedArr = flag ? ['001', '002', '003', '004'] : [];
      },
      changeCheck(data) {
        this.checkAll = data.length===4 ? true : false;
      },
      handleClick(data, type) {
        console.log('data', data)
        console.log('type', type)
      },
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