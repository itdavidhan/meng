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
          </td>
          </RadioGroup>
        </tr>
      </table>
      <Button @click="saveData">保存矩阵网格数据</Button>
    </div>

    <!-- <Table :columns="renderEasyDataColumn" :data="renderEasyData">
      <template v-for="item in renderEasyDataColumn" slot-scope="{ row, index }" :slot="item.slot">
        <div v-if="item.slot == 'title'">{{row.title}}</div>
        <div v-else>{{row[item.slot]}}</div>
        <div>
          <RadioGroup
            v-if="row[item.slot].question_type == 'radio'"
            size="small"
          >
            <Radio
              v-for="oItem in row[item.slot].options.options"
              :label="oItem.value"
              >{{ oItem.title }}</Radio
            >
          </RadioGroup>
        </div>
      </template>
    </Table> -->
  </div>
</template>
<script>
  export default {
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
                "title": "检查结果",
                "field_code": "101"
             },
             {
                "title": "临床意义",
                "field_code": "102"
             }
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
                 "title": "检查结果",
                 "field_code": "101",
                 "descriptions": "字段备注",
                 "type": "var",  //字段类型 var
                 "question_type": "radio",  //控件类型 radio/checkbox
                 "field_length": "100", //字段长度var类型默认前端字段代入100 可修改1~1000
                 "view": "x", //x代表横向  y代表纵向
                 "options": [
                     {
                       "serial_number": 1,
                       "options_absolute_id": 1,
                       "title": "正常",
                       "value": 1,  //实际入库内容
                     },
                     {
                       "serial_number": 2,
                       "options_absolute_id": 2,
                       "title": "不正常",
                       "value": 2,  //实际入库内容
                     }
                 ]                      
              },
              {
                 "title": "临床意义",
                 "field_code": "102",
                 "descriptions": "字段备注",
                 "type": "var",  //字段类型 var
                 "question_type": "radio",  //控件类型 radio/checkbox
                 "field_length": "100", //字段长度var类型默认前端字段代入100 可修改1~1000
                 "view": "x", //x代表横向  y代表纵向
                 "options": [
                     {
                       "serial_number": 1,
                       "options_absolute_id": 1,
                       "title": "正常",
                       "value": 1,  //实际入库内容
                     },
                     {
                       "serial_number": 2,
                       "options_absolute_id": 2,
                       "title": "异常无临床意义",
                       "value": 2,  //实际入库内容
                     }
                 ]                      
              } 
           ]
        },
        columns1: [
          {
            title: 'Name',
            key: 'name'
          },
          {
            title: 'Age',
            key: 'age'
          },
          {
            title: 'Address',
            slot: 'address'
          }
        ],
        data1: [
          {
            name: 'John Brown',
            age: 18,
            address: {prov: '山东省', city: '济南市', 'area': '槐荫区'},
            date: '2016-10-03'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: {prov: '山东省', city: '济南市', 'area': '槐荫区'},
            date: '2016-10-01'
          },
          {
            name: 'Joe Black',
            age: 30,
            address: {prov: '山东省', city: '济南市', 'area': '槐荫区'},
            date: '2016-10-02'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: {prov: '山东省', city: '济南市', 'area': '槐荫区'},
            date: '2016-10-04'
          }
        ]
      }
    },
    mounted() {
      this.transformMatrixData();
    },
    methods: {
      // 将矩阵网格数据转换为页面渲染所需格式
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
            arr.push(this._.cloneDeep(_options));
          })
          rItem.questionOption = this._.cloneDeep(arr);
        })
        this.matrixData = this._.cloneDeep(this.matrixData)
        console.log(666, this.matrixData.table_row)
      },
      // 保存矩阵网格数据
      saveData() {
        let arr = [];
        this.matrixData.table_row.forEach(item=>{
          item.questionOption.forEach(oItem=>{
            arr.push(oItem)
          })
        })
        console.log('arr', arr)
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
        padding-left: 10px;
        padding-right: 10px;
      }
      .option-item {
        text-align: center;
      }
    }
  }
</style>