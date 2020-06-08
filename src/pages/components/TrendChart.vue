<template>
  <div class="container">
    <div class="echarts-cont">
      <div class="line-cont"></div>
    </div>
    <div class="handle-cont">
      <CheckboxGroup v-model="checkedData" @on-change="changeCheckbox">
        <Checkbox v-for="item in numData" :key="item.code" :label="item.code" style="display: block;">{{item.name}}</Checkbox>
      </CheckboxGroup>
      <Select v-model="xCode" @on-change="changeTime" class="select-time">
        <Option v-for="tItem in timeData" :value="tItem.code">{{tItem.name}}</Option>
      </Select>
    </div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  export default {
    props: ['mainData'],
    data() {
      return {
        lineChart: null,
        checkedData: [],
        xCode: null,
        xTime: [],
        colors: ['red', 'green', 'blue'],
        timeData: [],
        numData: [],
        options: {
          // color: this.colors,
          tooltip: {
            trigger: 'axis', // axis / item
            axisPointer: {
                type: 'cross'
            },
          },
          grid: {
            left: '25%',
            bottom: '20%',
          },
          legend: {
            data: [],
          },
          xAxis: {
              type: 'category',
              axisTick: {
                  alignWithLabel: true
              },
              data: [],
              axisLabel: {
                interval: 0,
                rotate: 40
              },
          },
          yAxis: [],
          series: []
        },
      }
    },
    mounted() {
      console.log('mainData', this.mainData)
      this.timeData = this.mainData.timeData;
      this.numData = this.mainData.numData;
      this.xTime = this.timeData[0].data;
      this.xCode = this.timeData[0].code;

      this.initData();
    },
    methods: {
      changeTime() {
        console.log('this.xCode', this.xCode)
        this.timeData.forEach(item=>{
          if(item.code == this.xCode) {
            this.xTime = item.data;
          }
        })
        this.updateData();
      },
      changeCheckbox() {
        if(this.checkedData.length>3) {
          this.checkedData.splice(0, 1);
        }
        this.updateData();
      },
      initData() {
        this.options.xAxis.data = this.xTime;
        this.options.color = this.colors;
        this.numData.forEach((item, index)=>{
          if(index<3) {
            this.checkedData.push(item.code);
            this.options.legend.data.push(item.name);
            this.options.yAxis.push({
              type: 'value',
              name: item.name,
              position: 'left',
              offset: 80*index,
              axisLine: {
                  lineStyle: {
                      color: this.colors[index]
                  }
              },
              axisLabel: {
                  formatter: '{value}'
              },
              splitLine: {
                show: false,
              },
            });
            let _data = [];
            this.xTime.forEach((dItem, dIndex)=>{
              _data.push({
                name: dItem,
                value: item.data[dIndex],
              })
            })

            this.options.series.push({
              name: item.name,
              type: 'line',
              yAxisIndex: index,
              data: _data
            });
          }
        })

        console.log('this.options', this.options)

        let oLineCont = document.querySelector('.line-cont');
        this.lineChart = echarts.init(oLineCont);
        this.lineChart.setOption(this.options);
      },
      updateData() {
        this.options.xAxis.data = this.xTime;
        this.options.legend.data = [];
        this.options.yAxis = [];
        this.options.series = [];
        this.checkedData.forEach((cItem, cIndex)=>{
          this.numData.forEach((item, index)=>{
            if(cItem==item.code) {
              this.options.legend.data.push(item.name);
              this.options.yAxis.push({
                type: 'value',
                name: item.name,
                position: 'left',
                offset: 80*cIndex,
                axisLine: {
                    lineStyle: {
                        color: this.colors[cIndex]
                    }
                },
                axisLabel: {
                    formatter: '{value}'
                },
                splitLine: {
                  show: false,
                },
              });
              let _data = [];
              this.xTime.forEach((dItem, dIndex)=>{
                _data.push({
                  name: dItem,
                  value: item.data[dIndex],
                })
              })

              this.options.series.push({
                name: item.name,
                type: 'line',
                yAxisIndex: cIndex,
                data: _data
              });
            }
          })
        })

        this.lineChart.setOption(this.options, true);

      },
    }
  }
</script>
<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 300px;
    display: flex;
    .echarts-cont {
      width: 80%;
      height: 100%;
      .line-cont {
        width: 100%;
        height: 100%;
      }
    }
    .handle-cont {
      position: relative;
      width: 20%;
      .select-time {
        position: absolute;
        left: 0px;
        bottom: 40px;
      }
    }
  }
</style>