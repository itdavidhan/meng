<template>
  <div class="container">
    <div>
      <Button @click="exportPdf">导出</Button>
    </div>
    <div id="pdf-cont">
      <div id="pie-cont" class="echart-cont"></div>
      <div id="stack-cont" class="echart-cont"></div>
      <div class="table-cont" v-for="(item, index) in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]">
        <span>{{index}}</span>
        <Table :columns="tableColumns" :data="tableData" border class="iv-table">
          <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
          </template>
          <template slot-scope="{ row }" slot="health_1_num">
            <Input type="number" v-model="row.health_1_num"></Input>
          </template>
        </Table>
      </div>
    </div>
    <img id="head-cont" class="head-cont" src="../../assets/pdf-head.png" />
    <img id="foot-cont" class="head-cont" src="../../assets/pdf-foot.png" />
  </div>
</template>
<script>
  import htmlToPdf from '../../components/tools/htmlToPdf'
  import * as echarts from 'echarts';
  export default {
    data() {
      return {
        tableColumns: [
          {
            title: '  ',
            slot: 'name',
            align: 'center',
            width: 200,
          },
          {
            title: '健康',
            key: 'health_1',
            align: 'center',
            children: [
              {
                title: '人数',
                slot: 'health_1_num',
                align: 'center',
              },
              {
                title: '占比',
                key: 'health_1_pre',
                align: 'center',
              }
            ]
          },
          {
            title: '亚健康',
            key: 'health_2',
            align: 'center',
            children: [
              {
                title: '人数',
                key: 'health_2_num',
                align: 'center', 
              },
              {
                title: '占比',
                key: 'health_2_pre',
                align: 'center', 
              }
            ]
          },
          {
            title: '予以重点关注',
            key: 'health_3',
            align: 'center',
            children: [
              {
                title: '人数',
                key: 'health_3_num',
                align: 'center', 
              },
              {
                title: '占比',
                key: 'health_3_pre',
                align: 'center', 
              }
            ]
          },
          {
            title: '合计',
            key: 'total',
            align: 'center',
            width: 200,
            children: [
              {
                title: '人数',
                key: 'total_num',
                align: 'center', 
              },
            ]
          },
        ],
        tableData: [
          {
            name: '男',
            health_1_num: 10,
            health_1_pre: '10%',
            health_2_num: 34,
            health_2_pre: '34%',
            health_3_num: 40,
            health_3_pre: '40%',
            total_num: 84,
          },
          {
            name: '女',
            health_1_num: 10,
            health_1_pre: '10%',
            health_2_num: 34,
            health_2_pre: '34%',
            health_3_num: 40,
            health_3_pre: '40%',
            total_num: 84,
          },
          {
            name: '小计',
            health_1_num: 20, 
            health_2_num: 68, 
            health_3_num: 80, 
            health_1_pre: '-', 
            health_2_pre: '-', 
            health_3_pre: '-',
            total_num: 168,
          },
        ],
      }
    },
    mounted() {
      this.renderTable();
      this.renderStack();
      this.renderPie();
    },
    methods: {
      exportPdf() {
        htmlToPdf.downloadPDF(document.querySelector('#pdf-cont'), 'pdf名称')
      },
      renderTable() {

      },
      renderStack() {
        let chartDom = document.getElementById('stack-cont');
        let myChart = echarts.init(chartDom);
        let option;

        option = {
            legend: {
              top: "bottom"
            },
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "shadow"
              },
              formatter(params) {
                let relVal = params[0].name;
                for (let i = 0, l = params.length; i < l; i++) {
                  relVal +=
                    "<br/>" +
                    params[i].marker +
                    params[i].seriesName +
                    " : " +
                    params[i].value[params[i].seriesName] +
                    "%";
                }
                return relVal;
              }
            },
            color: ["#22BC91", "#F4C817", "#F5A623", "#E1021D"],
            dataset: {
                dimensions: ['sex','健康', '亚健康', '予以重点关注'],
                source: [
                    {sex: '男', '健康': 43.3, '亚健康': 85.8, '予以重点关注': 93.7},
                    {sex: '女', '健康': 83.1, '亚健康': 73.4, '予以重点关注': 55.1},
                ]
            },
            xAxis: {type: 'category'},
            yAxis: {
              type: "value",
              axisLine: {
                show: false
              },
              axisLabel: {
                fontSize: 11,
                color: "#0075DB",
                formatter: "{value} %"
              },
              axisTick: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: "#D9D9D9",
                  opacity: 0.5
                }
              }
            },
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: [
                {type: 'bar',stack: "sex", barWidth: "18%",
                  label: {
                    show: true, 
                    formatter: function(params) {
                      return params.value[params.seriesName]+'%';
                    },
                  }, 
                },
                {type: 'bar',stack: "sex", barWidth: "18%",
                  label: {
                    show: true, 
                    formatter: function(params) {
                      return params.value[params.seriesName]+'%';
                    },
                  }, 
                },
                {type: 'bar',stack: "sex", barWidth: "18%",
                  label: {
                    show: true, 
                    formatter: function(params) {
                      return params.value[params.seriesName]+'%';
                    },
                  }, 
                }
            ]
        };

        option && myChart.setOption(option);
      },
      renderPie() {
        let chartDom = document.getElementById('pie-cont');
        let myChart = echarts.init(chartDom);
        let option;

        option = {
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        {value: 1048, name: '搜索引擎'},
                        {value: 735, name: '直接访问'},
                        {value: 580, name: '邮件营销'},
                        {value: 484, name: '联盟广告'},
                        {value: 300, name: '视频广告'}
                    ],
                    label: {
                      formatter: function(params) {
                        return params.name+params.percent+'%';
                      },
                    },
                    emphasis: {
                      itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                    }
                }
            ]
        };

        option && myChart.setOption(option);
      }
    },
  }
</script>
<style lang="scss" scoped>
  .container {
    padding-bottom: 100px;
    .echart-cont {
      width: 800px;
      height: 400px;
    }
    .table-cont {
      padding: 0 20px;
      .iv-table {
        /deep/.ivu-table-overflowX {
          overflow-x: hidden!important;
        }
      }
    }
    .ht-logo {
      display: none;
      height: 30px;
    }
  }
</style>