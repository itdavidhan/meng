<template>
  <div class="container">
    <div class="table-cont">
      <h3>自增网格题</h3>
      <div class="incr-cont">
        <table>
          <tr>
            <th v-for="item in incrData.options.table_column">
              {{item.title}}
            </th>
          </tr>
          <tr v-for="item in incrData.options.table_row" v-show="item.row_show==1">
            <td v-for="(rItem, rIndex) in item.data">
              <div v-if="rItem.question_type=='input'">
                <Input v-model="rItem.value" size="small" style="width: 200px;"></Input>
              </div>
              <div v-if="rItem.question_type=='number'">
                <InputNumber v-model="rItem.value" size="small" style="width: 200px;"></InputNumber>
              </div>
              <span class="del-btn" v-show="rIndex == incrData.options.table_column.length-1 && item.is_senior !== 1">x</span>
            </td>
          </tr>
        </table>
        <div class="btn-cont">
          <Button type="primary" @click="addNewRow">新增一行</Button>
        </div>
      </div>
    </div>
    <div class="table-cont">
      <h3>单选网格题</h3>
      <table>
        <tr>
          <th></th>
          <th v-for="item in easyData[0].options.options">{{item.title}}</th>
          <th width="120px;">操作</th>
        </tr>
        <tr v-for="item in easyData">
          <td>{{item.title}}</td>
          <td v-for="oItem in item.options.options" class="option-item">
            <input type="radio" v-model="item.value" :value="oItem.value">
          </td>
          <td>
            <div class="handle-area">
              <a href="javascript:;">编辑</a>
              <a href="javascript:;">质疑</a>
              <a href="javascript:;">稽查</a>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div class="table-cont">
      <h3>多选网格题</h3>
      <table>
        <tr>
          <th></th>
          <th v-for="item in easyData[0].options.options">{{item.title}}</th>
          <th width="120px;">操作</th>
        </tr>
        <tr v-for="item in easyData">
          <td>{{item.title}}</td>
          <td v-for="oItem in item.options.options" class="option-item">
            <input type="checkbox" v-model="item.value2" :value="oItem.value">
          </td>
          <td>
            <div class="handle-area">
              <a href="javascript:;">编辑</a>
              <a href="javascript:;">质疑</a>
              <a href="javascript:;">稽查</a>
            </div>
          </td>
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
            <div class="form-area">
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
                  :cp="oItem.value_pca"
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
            </div>
            <div class="handle-area">
              <a href="javascript:;">编辑</a>
              <a href="javascript:;">质疑</a>
              <a href="javascript:;">稽查</a>
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
                 "field_code": "10011"
              },
              {
                 "title": "年龄",
                 "field_code": "10112"
              },
              {
                 "title": "性别",
                 "field_code": "10212"
              },
              {
                 "title": "简介",
                 "field_code": "10312"
              },
              {
                "title": "检查结果",
                "field_code": "10412"
              },
              {
                "title": "临床意义",
                "field_code": "10511"
              },
              {
                "title": "日期",
                "field_code": "10612"
              },
              {
                "title": "日期时间",
                "field_code": "10711"
              },
              {
                "title": "时间",
                "field_code": "10812"
              },
              {
                "title": "省市区",
                "field_code": "10911"
              },
              {
                "title": "省市",
                "field_code": "11012"
              },
              {
                "title": "省",
                "field_code": "11112"
              },
           ],
           "table_column":[
             {   
               "title": "潜血",
               "field_code": "20101"
             },
             {   
               "title": "蛋白质",
               "field_code": "20202"
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
              {
                 "descriptions": "字段备注",
                 "type": "var",  //字段类型 var
                 "question_type": "address",  //控件类型 radio/checkbox
                 "field_length": "100", //字段长度var类型默认前端字段代入100 可修改1~1000 
                 "options": {
                   "view": "province_city"
                 }       
              },
              {
                 "descriptions": "字段备注",
                 "type": "var",  //字段类型 var
                 "question_type": "address",  //控件类型 radio/checkbox
                 "field_length": "100", //字段长度var类型默认前端字段代入100 可修改1~1000 
                 "options": {
                   "view": "province"
                 }       
              },
           ]
        },
        // 矩阵网格题-答案
        matrixAnswer: {},
        // 自增网格题
        incrData: {"ecrf_field_id":5763,"field_code":"zzsdd","field_length_min":0,"field_length_max":0,"title":"自增网格题","question_num":1,"descriptions":null,"type":"var","question_type":"incr_table","unit":null,"file_extension":"","decimal_num":0,"normal_value":null,"options":{"options":[{"show":"1","type":"var","unit":"","view":"x","title":"药物名称","enable":"1","field_code":"name_891","decimal_num":0,"descriptions":"","field_length":"255","default_value":"","question_type":"input"},{"show":"1","type":"decimal","unit":"","view":"x","title":"价格","enable":"1","field_code":"price_901","decimal_num":2,"descriptions":"","field_length":"255","default_value":"","question_type":"number"},{"show":"1","type":"var","unit":"","view":"x","title":"药物名称","enable":"1","field_code":"name_892","decimal_num":0,"descriptions":"","field_length":"255","default_value":"","question_type":"input"},{"show":"1","type":"decimal","unit":"","view":"x","title":"价格","enable":"1","field_code":"price_902","decimal_num":2,"descriptions":"","field_length":"255","default_value":"","question_type":"number"},{"show":"1","type":"var","unit":"","view":"x","title":"药物名称","enable":"1","field_code":"name_893","decimal_num":0,"descriptions":"","field_length":"255","default_value":"","question_type":"input"},{"show":"1","type":"decimal","unit":"","view":"x","title":"价格","enable":"1","field_code":"price_903","decimal_num":2,"descriptions":"","field_length":"255","default_value":"","question_type":"number"},{"show":"1","type":"var","unit":"","view":"x","title":"药物名称","enable":"1","field_code":"name_894","decimal_num":0,"descriptions":"","field_length":"255","default_value":"","question_type":"input"},{"show":"1","type":"decimal","unit":"","view":"x","title":"价格","enable":"1","field_code":"price_904","decimal_num":2,"descriptions":"","field_length":"255","default_value":"","question_type":"number"},{"show":"1","type":"var","unit":"","view":"x","title":"药物名称","enable":"1","field_code":"name_895","decimal_num":0,"descriptions":"","field_length":"255","default_value":"","question_type":"input"},{"show":"1","type":"decimal","unit":"","view":"x","title":"价格","enable":"1","field_code":"price_905","decimal_num":2,"descriptions":"","field_length":"255","default_value":"","question_type":"number"}],"setting":[{"show":"1","type":"var","unit":"","view":"x","title":"","enable":"1","field_code":"","decimal_num":0,"descriptions":"","field_length":"255","default_value":"","question_type":"input"},{"show":"1","type":"decimal","unit":"","view":"x","title":"","enable":"1","field_code":"","decimal_num":2,"descriptions":"","field_length":"255","default_value":"","question_type":"number"}],"table_column":[{"title":"药物名称","field_code":"name_89"},{"title":"价格","field_code":"price_90"}]},"default_value":null,"is_required":2,"file_max_size":1,"file_max_num":1,"show_row_num":3,"max_row_num":5,"format":null,"formula":null,"align":"left","show":1,"sort":0,"enable":1,"absolute_id":"zzsdd","value":null},
      }
    },
    mounted() {
      this.matrixAnswer = localStorage.getItem('matrixAnswer') 
                        ? JSON.parse(localStorage.getItem('matrixAnswer'))
                        : {};
      this.transformMatrixData();
      // 自增网格题
      this.incrInit();
    },
    methods: {
      // 自增网格题
      incrInit() {
        let colNum = this.incrData.options.table_column.length;
        let show_row_num = this.incrData.show_row_num;
        let table_row = [];
        this.incrData.options.options.filter((item, index, arr)=>{
          if((index+1) % colNum == 1) {
            let newArr = [arr[index], arr[index+1] ];
            table_row.push({data: newArr})
          }
        })
        // 设置每行显隐
        table_row.forEach((item, index)=>{
          if(index+1 <= show_row_num) {
            item.row_show = 1; // 显示
            item.is_senior = 1;
          } else {
            item.row_show = 2; // 隐藏
          }
        })
        console.log('table_row', table_row)
        this.incrData.options.table_row = table_row;
        console.log('this.incrData', this.incrData)
      },
      // 自增表格-新增一行
      addNewRow() {
        let max_row_num = this.incrData.max_row_num;
        if(this.incrData.show_row_num < max_row_num) {
          this.incrData.show_row_num++;
        }
        let table_row = this._.cloneDeep(this.incrData.options.table_row);
        // 设置每行显隐
        table_row.forEach((item, index)=>{
          if(index+1 <= this.incrData.show_row_num) {
            item.row_show = 1; // 显示
          } else {
            item.row_show = 2; // 隐藏
          }
        })
        this.incrData.options.table_row = table_row;
        console.log('this.incrData.options.table_row', this.incrData.options.table_row)
        this.incrData = this._.cloneDeep(this.incrData)
      },
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
        console.log('matrixAnswer', this.matrixAnswer)
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
            case 'address':
              let obj = item.value_list;
              let json = {
                prov: obj.province.value,
                city: obj.city.value,
                area: obj.county.value,
              }
              item.value_pca = json;
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
              let type = this.matrixAnswer[oItem.field_code].type;
              switch(type) {
                case 'checkbox':
                  oItem.value_list = this.matrixAnswer[oItem.field_code].value_list;
                  break;
                case 'address':
                  let value_pca = this.matrixAnswer[oItem.field_code].value_pca;
                  oItem.value_pca = value_pca;
                  oItem.value_pca = this._.cloneDeep(oItem.value_pca);
                  break;
                default:
                  oItem.value = this.matrixAnswer[oItem.field_code].value;
                  break;
              }
            }
          })
        })
        this.matrixData.table_row = this._.cloneDeep(this.matrixData.table_row)
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
        localStorage.setItem('matrixAnswer', JSON.stringify(json))
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
    .incr-cont {
      width: calc(100% - 30px);
      td {
        position: relative;
        .del-btn {
          position: absolute;
          right: -16px;
          bottom: 8px;
        }
      }
    }
    table {
      width: 100%;
      border: 1px solid #DDD;
      th, td {
        border: 1px solid #DDD;
        padding: 5px;
        .form-area {
          width: calc(100% - 120px);
          display: inline-block;
        }
        .handle-area {
          width: 120px;
          display: inline-block;
          text-align: right;
          a {
            padding-left: 5px;
            padding-right: 5px;
          }
        }
      }
      .option-item {
        text-align: center;
      }
    }
  }
</style>