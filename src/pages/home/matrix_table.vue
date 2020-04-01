<template>
  <div class="container">
    <div class="table-cont">
      <h3>矩阵网格</h3>
      <table>
        <tr>
          <th></th>
          <th v-for="item in matrixData.render_col">{{item.title}}</th>
        </tr>
        <tr v-for="item in matrixData.render_row">
          <td>{{item.title}}</td>
          <td v-for="oItem in item.data">
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
        </tr>
      </table>
    </div>
    
  </div>
</template>
<script>
  export default {
    data() {
      return {
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
           ]
        },
      }
    },
    created() {
      console.log('matrixData', this.matrixData)
      this.setMatrixDataForRender();
    },
    methods: {
      // 把数据转为页面渲染格式
      setMatrixDataForRender() {
        let view = this.matrixData.view;
        let row_data = [];
        this.matrixData.render_row = [];
        this.matrixData.render_col = [];
        if(view=='row') {
          this.matrixData.render_row = this.matrixData.table_row;
          this.matrixData.render_col = this.matrixData.table_column;
        } else if(view=='column') {
          this.matrixData.render_row = this.matrixData.table_column;
          this.matrixData.render_col = this.matrixData.table_row;
        }

        let colNum = this.matrixData.render_col.length;

        for (let i = 0; i < this.matrixData.options.length; i += colNum) {
          row_data.push({
            data: this.matrixData.options.slice(i, i + colNum)
          });
        }

        this.matrixData.render_row.forEach((rItem, rIndex)=>{
          rItem.data = row_data[rIndex].data;
        })

        console.log(666, row_data)
        console.log(888, this.matrixData)
      },
    }
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