<template>
  <div class="container">
    <div class="bar-cont"></div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  export default {
    data() {
      return {
        n1: 3,  // 9
        n2: 6, // 18
        m: 1.5,
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        let vm = this;
        // const CubeLeft = echarts.graphic.extendShape({
        //     shape: {
        //         x: 0,
        //         y: 0
        //     },
        //     buildPath: function(ctx, shape) {
        //         const xAxisPoint = shape.xAxisPoint
        //         const c0 = [shape.x, shape.y]
        //         const c1 = [shape.x - vm.n1, shape.y - vm.n1]
        //         const c2 = [xAxisPoint[0] - vm.n1, xAxisPoint[1] - vm.n1]
        //         const c3 = [xAxisPoint[0], xAxisPoint[1]]
        //         ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath()
        //     }
        // })
        // const CubeRight = echarts.graphic.extendShape({
        //     shape: {
        //         x: 0,
        //         y: 0
        //     },
        //     buildPath: function(ctx, shape) {
        //         const xAxisPoint = shape.xAxisPoint
        //         const c1 = [shape.x, shape.y]
        //         const c2 = [xAxisPoint[0], xAxisPoint[1]]
        //         const c3 = [xAxisPoint[0] + vm.n2, xAxisPoint[1] - vm.n1]
        //         const c4 = [shape.x + vm.n2, shape.y - vm.n1]
        //         ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
        //     }
        // })
        // const CubeTop = echarts.graphic.extendShape({
        //     shape: {
        //         x: 0,
        //         y: 0
        //     },
        //     buildPath: function(ctx, shape) {
        //         const c1 = [shape.x, shape.y]
        //         const c2 = [shape.x + vm.n2, shape.y - vm.n1]
        //         const c3 = [shape.x + vm.n1, shape.y - vm.n2]
        //         const c4 = [shape.x - vm.n1, shape.y - vm.n1]
        //         ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
        //     }
        // })

        const CubeLeft = echarts.graphic.extendShape({
            shape: {
                x: 0,
                y: 0
            },
            buildPath: function(ctx, shape) {
                const xAxisPoint = shape.xAxisPoint
                const c0 = [shape.x - vm.m*2, shape.y]
                const c1 = [shape.x + vm.m*2, shape.y]
                const c2 = [xAxisPoint[0] + vm.m*2, xAxisPoint[1]]
                const c3 = [xAxisPoint[0] - vm.m*2, xAxisPoint[1]]
                ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath()
                ctx.stroke();
            }
        });
        const CubeRight = echarts.graphic.extendShape({
            shape: {
                x: 0,
                y: 0
            },
            buildPath: function(ctx, shape) {
                const xAxisPoint = shape.xAxisPoint
                const c1 = [shape.x + vm.m*2, shape.y]
                const c2 = [xAxisPoint[0] + vm.m*2, xAxisPoint[1]]
                const c3 = [xAxisPoint[0] + vm.m*4, xAxisPoint[1] - vm.m*2]
                const c4 = [shape.x + vm.m*4, shape.y - vm.m*3]
                ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath();
                ctx.stroke();
            }
        });
        const CubeTop = echarts.graphic.extendShape({
            shape: {
                x: 0,
                y: 0
            },
            buildPath: function(ctx, shape) {
                const c1 = [shape.x - vm.m*2, shape.y]
                const c2 = [shape.x + vm.m*2, shape.y]
                const c3 = [shape.x + vm.m*4, shape.y - vm.m*3]
                const c4 = [shape.x , shape.y - vm.m*3]
                ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
                ctx.stroke();
            }
        })

        echarts.graphic.registerShape('CubeLeft', CubeLeft)
        echarts.graphic.registerShape('CubeRight', CubeRight)
        echarts.graphic.registerShape('CubeTop', CubeTop)
        const VALUE = [2012, 1230, 3790, 2349, 1654, 1230, 3790, 2349, 1654, 3790, 2349, 1654]
        let option = {
            backgroundColor: "#010d3a",
            color: ["#F18075", "#149AE9"],
            grid: {
                left: 10,
                right: 30,
                bottom: 30,
                top: 40,
                containLabel: true
            },
            legend: {
              data: ["覆盖率", "测评人数"],
              itemWidth: 6,
              itemHeight: 6,
              bottom: "5%",
              textStyle: {
                color: "#149AE9"
              }
            },
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "cross",
                label: {
                  backgroundColor: "#283b56"
                }
              }
            },
            xAxis: {
                type: 'category',
                data: ['德州', '德城区', '陵城区', '禹城市', '乐陵市', '临邑县',
                    '平原县', '夏津县', '武城县', '庆云县', '宁津县', '齐河县'
                ],
                axisPointer: {
                  type: "shadow"
                },
                axisLabel: {
                  textStyle: {
                    fontSize: 11,
                    color: "#fff"
                  }
                }
            },
            yAxis: [
              {
                type: "value",
                name: "覆盖率",
                axisLabel: {
                  fontSize: 11,
                  color: "#0075DB",
                  formatter: "{value} %"
                },
                nameTextStyle: {
                  color: "#0075DB"
                },
                splitLine: {
                  show: false,
                  lineStyle: {
                    color: ["#3292FF"]
                  }
                }
              },
              {
                type: "value",
                name: "测评人数",
                axisLabel: {
                  fontSize: 11,
                  color: "#fff"
                },
                nameTextStyle: {
                  color: "#fff"
                },
                splitLine: {
                  lineStyle: {
                    color: ["#3292FF"],
                    opacity: 0.2
                  }
                }
              }
            ],
            series: [
              {
                name: "覆盖率",
                type: "line",
                yAxisIndex: 0,
                data: VALUE
              },
              {
                name: "测评人数",
                type: 'custom',
                renderItem: (params, api) => {
                    const location = api.coord([api.value(0), api.value(1)])
                    return {
                        type: 'group',
                        children: [{
                            type: 'CubeLeft',
                            shape: {
                                api,
                                xValue: api.value(0),
                                yValue: api.value(1),
                                x: location[0],
                                y: location[1],
                                xAxisPoint: api.coord([api.value(0), 0])
                            },
                            style: {
                                fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        // color: '#3B80E2'
                                        color: '#0079e4'
                                    },
                                    {
                                        offset: 1,
                                        // color: '#49BEE5'
                                        color: '#000af5'
                                    }
                                ])
                            }
                        }, {
                            type: 'CubeRight',
                            shape: {
                                api,
                                xValue: api.value(0),
                                yValue: api.value(1),
                                x: location[0],
                                y: location[1],
                                xAxisPoint: api.coord([api.value(0), 0])
                            },
                            style: {
                                fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        // color: '#3B80E2'
                                        color: '#36c9ff'
                                    },
                                    {
                                        offset: 1,
                                        // color: '#49BEE5'
                                        color: '#003efa'
                                    }
                                ])
                            }
                        }, {
                            type: 'CubeTop',
                            shape: {
                                api,
                                xValue: api.value(0),
                                yValue: api.value(1),
                                x: location[0],
                                y: location[1],
                                xAxisPoint: api.coord([api.value(0), 0])
                            },
                            style: {
                                fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        // color: '#3B80E2'
                                        color: '#0099e4'
                                    },
                                    {
                                        offset: 1,
                                        // color: '#49BEE5'
                                        color: '#4a9df7'
                                    }
                                ])
                            }
                        }]
                    }
                },
                data: VALUE
              },
            ]
        };

        let barChart = echarts.init(document.querySelector('.bar-cont'));
        barChart.setOption(option);
      }
    }
  }
</script>
<style lang="scss" scoped>
  .container {
    .bar-cont {
      width: 260px;
      height: 170px;
      border: 1px solid #ddd;
      padding: 10px;
    }
  }
</style>