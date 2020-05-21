<template>
  <div class="container">
    <div class="echarts-cont">
      <div class="line-cont"></div>
    </div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  export default {
    data() {
      return {

      }
    },
    mounted() {
      this.initLine();
    },
    methods: {
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
                  selected: {
                    '脉搏': true, '体温': false,
                  }
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
        let lineChart = echarts.init(oLineCont);
        lineChart.setOption(options);
      },
    },
  }
</script>
<style lang="scss" scoped>
  .container {
    .echarts-cont {
      width: 80%;
      .line-cont {
        width: 100%;
        height: 500px;
        border: 1px solid #DDD;
      }
    }
  }
</style>