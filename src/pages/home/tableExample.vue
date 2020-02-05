<template>
  <div class="container">
    <div class="table-cont">
      <h3>单选网格题</h3>
      <table>
        <tr>
          <th></th>
          <th v-for="item in easyData[0].options.options">{{item.title}}</th>
        </tr>
        <tr v-for="item in easyData">
          <td>{{item.title}}</td>
          <td v-for="oItem in item.options.options" class="option-item">
            <input type="radio" v-model="item.value" :value="oItem.value">
          </td>
          </RadioGroup>
        </tr>
      </table>
    </div>
    <div class="table-cont">
      <h3>多选网格题</h3>
      <table>
        <tr>
          <th></th>
          <th v-for="item in easyData[0].options.options">{{item.title}}</th>
        </tr>
        <tr v-for="item in easyData">
          <td>{{item.title}}{{item.value2}}</td>
          <td v-for="oItem in item.options.options" class="option-item">
            <input type="checkbox" v-model="item.value2" :value="oItem.value">
          </td>
          </RadioGroup>
        </tr>
      </table>
    </div>
    <div class="table-cont">
      <h3>矩阵网格题</h3>
      <table>
        <tr>
          <th></th>
          <th v-for="item in matrixData.table_column">{{item.title}}</th>
        </tr>
        <tr v-for="(item, index) in matrixData.table_row">
          <td>{{item.title}}</td>
          <td v-for="(oItem, oIndex) in item.questionOption">
            <div v-if="oItem.question_type=='input'">
              <Input v-model="oItem.value" size="small" style="width: 100%;"></Input>
            </div>
            <div v-if="oItem.question_type=='number'">
              <InputNumber v-model="oItem.value" size="small" style="width: 200px;"></InputNumber>
            </div>
            <div v-if="oItem.question_type=='textarea'">
              <Input type="textarea" v-model="oItem.value" size="small" style="width: 100%;"></Input>
            </div>
            <div v-if="oItem.question_type=='select'">
              <Select v-model="oItem.value" style="width:200px" size="small">
                <Option v-for="rItem in oItem.options" :value="rItem.value" :key="rItem.value">{{ rItem.title }}</Option>
              </Select>
            </div>
            <div v-if="oItem.question_type=='radio'">
              <RadioGroup
                v-model="oItem.value"
                size="small"
              >
                <Radio
                  v-for="rItem in oItem.options"
                  :label="rItem.value"
                  >{{ rItem.title }}</Radio
                >
              </RadioGroup>
            </div>
            <div v-if="oItem.question_type=='checkbox'">
              <CheckboxGroup v-model="oItem.value_list">
                <Checkbox v-for="rItem in oItem.options" :label="rItem.value">{{rItem.title}}</Checkbox>
              </CheckboxGroup>
            </div>
            <div v-if="oItem.question_type=='date'">
              <DatePicker type="date" placeholder="请选择" :value="oItem.value" @on-change="oItem.value=$event" size="small"></DatePicker>
            </div>
            <div v-if="oItem.question_type=='datetime'">
              <DatePicker type="datetime" placeholder="请选择" :value="oItem.value" @on-change="oItem.value=$event" size="small"></DatePicker>
            </div>
            <div v-if="oItem.question_type=='time'">
              <TimePicker placeholder="请选择" :value="oItem.value" @on-change="oItem.value=$event" size="small"></TimePicker>
            </div>
            <div v-if="oItem.question_type=='address'">
              <cityPicker
                :cbData="{
                  index,
                  oIndex,
                  level: oItem.options.view,
                  absolute_id: oItem.field_code
                }"
                :opt="{ showText: false }"
                @getCpData="getPCCData"
              />
            </div>
          </td>
          </RadioGroup>
        </tr>
      </table>
      <Button @click="saveData">保存矩阵网格数据</Button>
    </div>
  </div>
</template>
<script>
  import cityPicker from '@/components/tools/pcaPicker'
  export default {
    components: {cityPicker},
    data() {
      return {
        // 单选网格题
        easyData: [
          {
            "title": "你是中国人吗",
            "field_code": "chn", // 变量名称
            "descriptions": "字段备注",
            "type": "var",  //字段类型 var
            "question_type": "radio",  //控件类型 radio/checkbox
            "field_length": "100", //字段长度var类型默认前端字段代入100 可修改1~1000
            "value": null,
            "value2": [],
            "options": {
              "view": "x", //x代表横向  y代表纵向
              "options": [
                {
                  "serial_number": 1,
                  "options_absolute_id": 1,
                  "title": "是",
                  "value": 1,  //实际入库内容
                },
                {
                  "serial_number": 2,
                  "options_absolute_id": 2,
                  "title": "否",
                  "value": 2,  //实际入库内容
                },
              ]
            }
          },
          {
            "title": "你是男性吗",
            "field_code": "sex", // 变量名称
            "descriptions": "字段备注",
            "type": "var",  //字段类型 var
            "question_type": "radio",  //控件类型 radio/checkbox
            "field_length": "100", //字段长度var类型默认前端字段代入100 可修改1~1000
            "value": null,
            "value2": [],
            "options": {
              "view": "x", //x代表横向  y代表纵向
              "options": [
                {
                  "serial_number": 1,
                  "options_absolute_id": 1,
                  "title": "是",
                  "value": 1,  //实际入库内容
                },
                {
                  "serial_number": 2,
                  "options_absolute_id": 2,
                  "title": "否",
                  "value": 2,  //实际入库内容
                },
              ]
            }
          },
          {
            "title": "年龄大于18岁吗",
            "field_code": "age", // 变量名称
            "descriptions": "字段备注",
            "type": "var",  //字段类型 var
            "question_type": "radio",  //控件类型 radio/checkbox
            "field_length": "100", //字段长度var类型默认前端字段代入100 可修改1~1000
            "value": null,
            "value2": [1],
            "options": {
              "view": "x", //x代表横向  y代表纵向
              "options": [
                {
                  "serial_number": 1,
                  "options_absolute_id": 1,
                  "title": "是",
                  "value": 1,  //实际入库内容
                },
                {
                  "serial_number": 2,
                  "options_absolute_id": 2,
                  "title": "否",
                  "value": 2,  //实际入库内容
                },
              ]
            }
          },
        ],
        // 矩阵网格题
        matrixData: {//matrix_table矩阵网格
           "table_row": [
              {
                 "title": "姓名",
                 "field_code": "100"
              },
              {
                 "title": "年龄",
                 "field_code": "101"
              },
              {
                 "title": "性别",
                 "field_code": "102"
              },
              {
                 "title": "简介",
                 "field_code": "103"
              },
              {
                "title": "检查结果",
                "field_code": "104"
              },
              {
                "title": "临床意义",
                "field_code": "105"
              },
              {
                "title": "日期",
                "field_code": "106"
              },
              {
                "title": "日期时间",
                "field_code": "107"
              },
              {
                "title": "时间",
                "field_code": "108"
              },
              {
                "title": "省市区",
                "field_code": "109"
              },
           ],
           "table_column":[
             {   
               "title": "潜血",
               "field_code": "201"
             },
             {   
               "title": "蛋白质",
               "field_code": "202"
             }
           ],
           "view":"row", //row行 column列
           // "view":"column", //row行 column列
           "options": [
              {
                 "descriptions": "字段备注",
                 "type": "var",  //字段类型 var
                 "question_type": "input",  //控件类型 radio/checkbox
                 "field_length": "100", //字段长度var类型默认前端字段代入100 可修改1~1000        
              },
              {
                 "descriptions": "字段备注",
                 "type": "var",  //字段类型 var
                 "question_type": "number",  //控件类型 radio/checkbox
                 "field_length": "100", //字段长度var类型默认前端字段代入100 可修改1~1000        
              },
              {
                 "descriptions": "字段备注",
                 "type": "var",  //字段类型 var
                 "question_type": "select",  //控件类型 radio/checkbox
                 "field_length": "100", //字段长度var类型默认前端字段代入100 可修改1~1000 
                 "options": [
                     {
                       "serial_number": '1',
                       "options_absolute_id": '1',
                       "title": "男",
                       "value": '1',  //实际入库内容
                     },
                     {
                       "serial_number": '2',
                       "options_absolute_id": '2',
                       "title": "女",
                       "value": '2',  //实际入库内容
                     }
                 ]                        
              },
              {
                 "descriptions": "字段备注",
                 "type": "var",  //字段类型 var
                 "question_type": "textarea",  //控件类型 radio/checkbox
                 "field_length": "100", //字段长度var类型默认前端字段代入100 可修改1~1000        
              },
              {
                 "descriptions": "字段备注",
                 "type": "var",  //字段类型 var
                 "question_type": "checkbox",  //控件类型 radio/checkbox
                 "field_length": "100", //字段长度var类型默认前端字段代入100 可修改1~1000
                 "view": "x", //x代表横向  y代表纵向
                 "options": [
                     {
                       "serial_number": '1',
                       "options_absolute_id": '1',
                       "title": "正常",
                       "value": '1',  //实际入库内容
                     },
                     {
                       "serial_number": '2',
                       "options_absolute_id": '2',
                       "title": "不正常",
                       "value": '2',  //实际入库内容
                     }
                 ]                      
              },
              {
                 "descriptions": "字段备注",
                 "type": "var",  //字段类型 var
                 "question_type": "radio",  //控件类型 radio/checkbox
                 "field_length": "100", //字段长度var类型默认前端字段代入100 可修改1~1000
                 "view": "x", //x代表横向  y代表纵向
                 "options": [
                     {
                       "serial_number": '1',
                       "options_absolute_id": '1',
                       "title": "正常",
                       "value": '1',  //实际入库内容
                     },
                     {
                       "serial_number": '2',
                       "options_absolute_id": '2',
                       "title": "异常无临床意义",
                       "value": '2',  //实际入库内容
                     }
                 ]                      
              },
              {
                 "descriptions": "字段备注",
                 "type": "var",  //字段类型 var
                 "question_type": "date",  //控件类型 radio/checkbox
                 "field_length": "100", //字段长度var类型默认前端字段代入100 可修改1~1000        
              },
              {
                 "descriptions": "字段备注",
                 "type": "var",  //字段类型 var
                 "question_type": "datetime",  //控件类型 radio/checkbox
                 "field_length": "100", //字段长度var类型默认前端字段代入100 可修改1~1000        
              },
              {
                 "descriptions": "字段备注",
                 "type": "var",  //字段类型 var
                 "question_type": "time",  //控件类型 radio/checkbox
                 "field_length": "100", //字段长度var类型默认前端字段代入100 可修改1~1000        
              },
              {
                 "descriptions": "字段备注",
                 "type": "var",  //字段类型 var
                 "question_type": "address",  //控件类型 radio/checkbox
                 "field_length": "100", //字段长度var类型默认前端字段代入100 可修改1~1000 
                 "options": {
                   "view": "province_city_county"
                 }       
              },
           ]
        },
        // 矩阵网格题-答案
        matrixAnswer: {
          // "101_201":{"absolute_id":"101_201","type":"checkbox","value_list":{"2":{"element_id":2,"title":"不正常","value":2}}},"101_202":{"absolute_id":"101_202","type":"checkbox","value_list":{"1":{"element_id":1,"title":"正常","value":1}}},"102_201":{"absolute_id":"102_201","type":"radio","value_list":{"1":{"element_id":1,"title":"正常","value":1}}},"102_202":{"absolute_id":"102_202","type":"radio","value_list":{"2":{"element_id":2,"title":"异常无临床意义","value":2}}}
        },
      }
    },
    mounted() {
      this.transformMatrixData();
    },
    methods: {
      // 第一步：获取后端数据
      // 第二步：将矩阵网格数据转换为页面渲染所需格式
      transformMatrixData() {
        this.matrixData.table_row.forEach((rItem, rIndex)=>{
          let arr = [];
          let r_code = rItem.field_code;
          this.matrixData.table_column.forEach((cItem, cIndex)=>{
            let c_code = cItem.field_code;
            // 按 行/列 展示控件
            let _index = this.matrixData.view=='row' ? rIndex : cIndex;
            let _options = this.matrixData.options[_index];
            _options.title = rItem.title;
            _options.field_code = r_code+'_'+c_code;
            if(_options.question_type=='number') {
              _options.value = null;
            }
            arr.push(this._.cloneDeep(_options));
          })
          rItem.questionOption = this._.cloneDeep(arr);
        })
        this.matrixData = this._.cloneDeep(this.matrixData)
        this.transformAnswer();
        this.bindAnswer();
      },
      // 第三步：转换答案格式
      transformAnswer() {
        if(!this.matrixAnswer) return;
        let _matrixAnswer = this._.cloneDeep(this.matrixAnswer);
        for(let key in _matrixAnswer) {
          let item = _matrixAnswer[key];
          let type = item.type;
          let arr= item.value_list ? Object.keys(item.value_list) : [];
          switch(type) {
            case 'input':
              break;
            case 'radio':
            case 'select':
              item.value = arr[0];
              break;
            case 'checkbox':
              item.value_list = arr;
              break;
          }
        }
        this.matrixAnswer = this._.cloneDeep(_matrixAnswer)
      },
      // 第四步：绑定答案
      bindAnswer() {
        this.matrixData.table_row.forEach(item=>{
          item.questionOption.forEach(oItem=>{
            if(this.matrixAnswer[oItem.field_code]) {
              oItem.value = this.matrixAnswer[oItem.field_code].value;
            }
          })
        })
        this.matrixData = this._.cloneDeep(this.matrixData)
        console.log('this.matrixData', this.matrixData)
      },
      // 第五步：保存矩阵网格数据-将数据转为后端所需格式
      saveData() {
        let arr = [];
        let json = {};
        this.matrixData.table_row.forEach(item=>{
          item.questionOption.forEach(oItem=>{
            arr.push(oItem)
          })
        })
        console.log('arr', arr)
        arr.forEach(item=>{
          let type = item.question_type;
          switch(type) {
            case 'input':
            case 'number':
              json[item.field_code] = {
                absolute_id: item.field_code,
                type: item.question_type,
                value: item.value,
                value_unit: item.value_unit,
              };
              break;
            case 'date':
            case 'datetime':
            case 'time':
            case 'textarea':
              json[item.field_code] = {
                absolute_id: item.field_code,
                type: item.question_type,
                value: item.value,
              };
              break;
            case 'address':
              json[item.field_code] = {
                absolute_id: item.field_code,
                type: item.question_type,
                value_list: item.value_list,
              };
              break;
            case 'radio':
            case 'select':
              json[item.field_code] = {
                absolute_id: item.field_code,
                type: item.question_type,
                value_list: {}
              };
              if(!item.value) return;
              let obj = {};
              item.options.forEach(oItem=>{
                if(oItem.value == item.value) {
                  obj = oItem;
                }
              })
              json[item.field_code].value_list[item.value] = {
                element_id: obj.options_absolute_id,
                title: obj.title,
                value: obj.value,
              }
              break;
            case 'checkbox':
              json[item.field_code] = {
                absolute_id: item.field_code,
                type: item.question_type,
                value_list: {}
              };
              if(!item.value_list) return;
              item.value_list.forEach(vItem=>{
                let obj = {};
                item.options.forEach(oItem=>{
                  if(oItem.value == vItem) {
                    obj = oItem;
                  }
                })
                json[item.field_code].value_list[vItem] = {
                  element_id: obj.options_absolute_id,
                  title: obj.title,
                  value: obj.value,
                }
              })
              break;
          }
          
        })
        console.log('json1', json)
        console.log('json2', JSON.stringify(json) )
      },
      getPCCData(o) {
        console.log('o', o)
        let index = o.cbData.index;
        let oIndex = o.cbData.oIndex;
        this.matrixData.table_row[index].questionOption[oIndex].value_list={
          province: { 
            "element_id":"province", 
            "title": o.prov_name, 
            "value": o.prov, 
          }, 
          city: { 
            "element_id":"city", 
            "title": o.city_name, 
            "value": o.city,
          }, 
          county: { 
            "element_id":"county", 
            "title": o.area_name, 
            "value": o.area,
          }
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  .table-cont {
    margin-bottom: 20px;
    padding: 10px;
    h3 {
      margin-bottom: 10px;
    }
    table {
      width: 100%;
      border: 1px solid #DDD;
      th, td {
        border: 1px solid #DDD;
        padding: 5px;
      }
      .option-item {
        text-align: center;
      }
    }
  }
</style>