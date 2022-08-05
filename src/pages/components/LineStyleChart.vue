<template>
  <div class="line-style-cont">
    <div id="line-style-main" class="line-style-main"></div>
  </div>
</template>
<script>
  import * as echarts from 'echarts';
  export default {
    mounted() {
      this.renderChart();
    },
    methods: {
      renderChart() {
        let chartDom = document.getElementById('line-style-main');
        let myChart = echarts.init(chartDom);
        let option;

        option = {
          legend: {
            data: ['a', 'b']
          },
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: 'a',
              data: [120, 200, 150, 80, 70, 110, 130],
              type: 'line',
              symbol: 'triangle',
              symbolSize: 20,
              lineStyle: {
                color: '#5470C6',
                width: 4,
                type: 'dashed'
              },
              itemStyle: {
                borderWidth: 1,
                borderColor: '#EE6666',
                color: 'yellow'
              }
            },
            {
              name: 'b',
              data: [20, 100, 120, 180, 50, 180, 30],
              type: 'line',
              symbol: 'rect',
              symbolSize: 20,
              lineStyle: {
                color: 'red',
                width: 4,
                type: 'dashed'
              },
              itemStyle: {
                borderWidth: 1,
                borderColor: 'red',
                color: 'red'
              }
            }
          ]
        };

        option && myChart.setOption(option);
      }
    }
    
  }
</script>
<style lang="scss" scoped>
  .line-style-cont {
    width: 100%;
    height: 100%;
    .line-style-main {
      width: 100%;
      height: 100%;
    }
  }
</style> 