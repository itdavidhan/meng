<template>
  <div class="container">
    <p>https://github.com/evidenceprime/html-docx-js</p>
    <Button type="primary" @click="exportDoc">导出doc</Button>
    <div id="exportBox">
      <h3 class="tit">我是标题</h3>
      <div class="cont">
        <p class="p1">窗前明月光</p>
        <p class="p2">疑是地上霜</p>
        <p class="p3">举头望明月</p>
        <p class="p4">低头思故乡</p>
      </div>
      <div class="echarts-cont">
        <TrendChart :mainData="mainData"></TrendChart>
      </div>
    </div>
  </div>
</template>
<script>
  import FileSaver from 'file-saver';
  import htmlDocx from 'html-docx-js/dist/html-docx'

  import echarts from 'echarts'
  import TrendChart from '../../pages/components/TrendChart'
  export default {
    components: {
      TrendChart,
    },
    data() {
      return {
        mainData: {
          timeData: [
            {
              name: '手术开始时间',
              code: 'shoushu_kaishi',
              data: [
                '2020-02-03', '2020-02-04', '2020-02-05', '2020-02-06', '2020-02-07', '2020-02-08', '2020-02-09', '2020-02-10', '2020-02-11', '2020-02-12', 
              ],
            },
            {
              name: '手术结束时间',
              code: 'shoushu_end',
              data: [
                '2020-02-04', '2020-02-05', '2020-02-06', '2020-02-07', '2020-02-08', '2020-02-09', '2020-02-10', '2020-02-11', '2020-02-12', '2020-02-13', 
              ],
            },
          ],
          numData: [
            {
              name: '血压',
              code: 'xueya',
              data: [12, 34, 35, 21, 40, 44, 20, 12, 22, 30]
            },
            {
              name: '血糖',
              code: 'xuetang',
              data: [112, 134, 135, 121, 240, 244, 120, 112, 222, 130]
            },
            {
              name: '体重',
              code: 'weight',
              data: [152, 134, 135, 121, 140, 144, 120, 132, 122, 150]
            },
            {
              name: '身高',
              code: 'height',
              data: [162, 174, 215, 211, 160, 174, 180, 152, 202, 160]
            },
            {
              name: '出血量',
              code: 'chuxue',
              data: [62, 74, 55, 81, 60, 74, 40, 62, 32, 20]
            },
          ]
        }
      }
    },
    mounted() {
      this.initLine();
    },
    methods: {
      exportDoc() {
        let contentHtml = document.getElementById("exportBox").innerHTML;
        let cssHTML = `
            table {
              width: 100%;
              table-layout: fixed;
              margin-top:10px;
              border: 1px solid #ddd;
              border-collapse: collapse;
            }
            .export-tb .thead td {
              font-weight: bold;
            }
            td {
              border: 1px solid #ddd;
              color: #333;
              text-align: left;
              padding: 6px 10px;
            }
            .tit {
              color: red;
              font-size: 40px;
            }
            .cont {width: 200px;}
            .cont .p1 { color: blue; }
            .cont .p2 { color: yellow; font-weight: 700; margin-left: 100px;}
            .cont .p3 {
              color: green; 
              background-color: pink;
              transform:rotate(9deg);
              -ms-transform:rotate(9deg); 
              -moz-transform:rotate(9deg); 
              -webkit-transform:rotate(9deg); 
              -o-transform:rotate(9deg); 
            }
            .cont .p4 { color: orange; text-decoration: underline;}
            `
        let content = `<!DOCTYPE html><html>
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                <style>
                    ${cssHTML}
                </style>
            </head>
            <body>
                ${contentHtml}
            </body>
            </html>`;
        let converted = htmlDocx.asBlob(content);
        FileSaver.saveAs(converted, '模块汇总表.docx');
      },
      initLine() {
        let oLineCont = document.querySelector('.line-cont');
        let colors = ['#5793f3', '#d14a61', '#675bba'];
        let options = {
              color: colors,
              tooltip: {
                  trigger: 'axis', // axis / item
                  axisPointer: {
                      type: 'cross'
                  },
                  // formatter: function(params) {
                  //   let htmlStr ='<div>';
                  //   htmlStr += '日期:' + params.data.name + '<br/>';
                  //   htmlStr += params.seriesName + ':' + params.data.value + '<br/>';
                  //   htmlStr += params.data.status;
                  //   return htmlStr;
                  // },
              },
              grid: {
                  left: '25%',
                  bottom: '20%',
              },
              toolbox: {
                  feature: {
                      dataView: {show: true, readOnly: false},
                      restore: {show: true},
                      saveAsImage: {show: true}
                  }
              },
              legend: {
                  data: ['脉搏', '呼吸', '体温'],
                  // selected: {
                  //   '脉搏': true, '体温': false,
                  // }
              },
              xAxis: [
                  {
                      type: 'category',
                      axisTick: {
                          alignWithLabel: true
                      },
                      data: [
                        '2020-02-03 02',
                        '2020-02-03 06',
                        '2020-02-03 10',
                        '2020-02-03 14',
                        '2020-02-03 18',
                        '2020-02-03 22',
                        '2020-02-04 02',
                        '2020-02-04 06',
                        '2020-02-04 10',
                        '2020-02-04 14',
                        '2020-02-04 18',
                        '2020-02-04 22',
                      ],
                      axisLabel: {
                        interval: 0,
                        rotate: 40
                      },
                  }
              ],
              yAxis: [
                  {
                      type: 'value',
                      name: '脉搏(次/分)',
                      // min: 0,
                      // max: 180,
                      // scale: true,
                      position: 'left',
                      offset: 160,
                      axisLine: {
                          lineStyle: {
                              color: colors[0]
                          }
                      },
                      axisLabel: {
                          formatter: '{value}'
                      },
                      splitLine: {
                        show: false,
                      },
                  },
                  {
                      type: 'value',
                      name: '呼吸(次/分)',
                      // min: 0,
                      // max: 90,
                      // scale: true,
                      position: 'left',
                      offset: 80,
                      axisLine: {
                          lineStyle: {
                              color: colors[1]
                          }
                      },
                      axisLabel: {
                          formatter: '{value}'
                      },
                      splitLine: {
                        show: false,
                      },
                  },
                  {
                      type: 'value',
                      name: '体温(°C)',
                      // min: 0,
                      // max: 42,
                      // scale: true,
                      position: 'left',
                      axisLine: {
                          lineStyle: {
                              color: colors[2]
                          }
                      },
                      axisLabel: {
                          formatter: '{value}'
                      },
                      splitLine: {
                        show: false,
                      },
                  }
              ],
              series: [
                  {
                      name: '脉搏',
                      type: 'line',
                      // data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 152.2, 32.6, 20.0, 6.4, 3.3]
                      data: [
                        {name: '2020-02-03 02', value: 23, symbol: 'image://data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7',
                         symbolSize: 10, status: '脉搏'},
                        {name: '2020-02-03 06', value: 43, status: '起搏心率'},
                        {name: '2020-02-03 10', value: 137, status: '脉搏'},
                        {name: '2020-02-03 14', value: 43, status: '脉搏'},
                        {name: '2020-02-03 18', value: 13, status: '脉搏'},
                        {name: '2020-02-03 22', value: 13, status: '脉搏'},
                        {name: '2020-02-04 02', value: 13, status: '脉搏'},
                        {name: '2020-02-04 06', value: 43, status: '起搏心率'},
                        {name: '2020-02-04 10', value: 137, status: '脉搏'},
                        {name: '2020-02-04 14', value: 43, status: '脉搏'},
                        {name: '2020-02-04 18', value: 13, status: '脉搏'},
                        {name: '2020-02-04 22', value: 13, status: '脉搏'},
                      ]
                  },
                  {
                      name: '呼吸',
                      type: 'line',
                      yAxisIndex: 1,
                      data: [
                        {name: '2020-02-03 02', value: 73, status: '呼吸'},
                        {name: '2020-02-03 06', value: 81, status: '呼吸机'},
                        {name: '2020-02-03 10', value: 31, status: '呼吸机'},
                        {name: '2020-02-03 14', value: 60, status: '呼吸'},
                        {name: '2020-02-03 18', value: 49, status: '呼吸'},
                        {name: '2020-02-03 22', value: 78, status: '呼吸'},
                        {name: '2020-02-04 02', value: 73, status: '呼吸'},
                        {name: '2020-02-04 06', value: 81, status: '呼吸机'},
                        {name: '2020-02-04 10', value: 31, status: '呼吸机'},
                        {name: '2020-02-04 14', value: 60, status: '呼吸'},
                        {name: '2020-02-04 18', value: 49, status: '呼吸'},
                        {name: '2020-02-04 22', value: 78, status: '呼吸'},
                      ]
                  },
                  {
                      name: '体温',
                      type: 'line',
                      yAxisIndex: 2,
                      data: [
                        {name: '2020-02-03 02', value: 33, status: '口表'},
                        {name: '2020-02-03 06', value: 31, status: '口表'},
                        {name: '2020-02-03 10', value: 31, status: '口表'},
                        {name: '2020-02-03 14', value: 30, status: '口表'},
                        {name: '2020-02-03 18', value: 39, status: '口表'},
                        {name: '2020-02-03 22', value: 38, status: '口表'},
                        {name: '2020-02-04 02', value: 33, status: '口表'},
                        {name: '2020-02-04 06', value: 31, status: '口表'},
                        {name: '2020-02-04 10', value: 31, status: '口表'},
                        {name: '2020-02-04 14', value: 30, status: '口表'},
                        {name: '2020-02-04 18', value: 39, status: '口表'},
                        {name: '2020-02-04 22', value: 38, status: '口表'},
                      ]
                  }
              ]
        };
        // let lineChart = echarts.init(oLineCont);
        // lineChart.setOption(options);
      },
    },

  }
</script>
<style lang="scss" scoped>
  .container {
    #exportBox {
      .tit {
        color: red;
        font-size: 40px;
      }
      .cont {
        width: 200px;
        .p1 { color: blue; }
        .p2 { color: yellow; font-weight: 700; margin-left: 100px; }
        .p3 { 
          color: green; 
          background-color: pink;
          transform:rotate(9deg);
          -ms-transform:rotate(9deg); 
          -moz-transform:rotate(9deg); 
          -webkit-transform:rotate(9deg); 
          -o-transform:rotate(9deg); 
        }
        .p4 { color: orange; text-decoration: underline;}
      }
    }
  }
</style>