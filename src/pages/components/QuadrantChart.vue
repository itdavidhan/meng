<template>
  <div class="container">
    <div class="content">
      <div class="main-chart" id="main-chart" ref="mainChart">
        <div class="x-axis">
          <div class="x-scale-cont">
            <div v-for="(item, index) in xScale" class="x-scale" v-show="item%50!=0" :style="{
              position: 'absolute', 
              top: '0',
              left: index*unit*5+'px',
            }"><span v-if="index%2==0" class="x-s">{{item}}</span></div>
          </div>
        </div>
        <div class="y-axis">
          <div v-for="(item, index) in yScale" class="y-scale" v-show="item%50!=0" :style="{
            position: 'absolute', 
            top: index*unit*5+'px',
            left: '50%',
          }"><span v-if="index%2==0" class="y-s">{{item}}</span></div>
        </div>
        <div class="x-solid-1" :style="{
          position: 'absolute',
          left: 0,
          top: (100-lineParams.xsolid1)*unit+'px',
        }"></div>
        <div class="x-solid-2" :style="{
          position: 'absolute',
          left: 0,
          top: (100-lineParams.xsolid2)*unit+'px',
        }"></div>
        <div class="x-dashed-1" :style="{
          position: 'absolute',
          left: 0,
          top: (100-lineParams.xdashed1)*unit+'px',
        }"></div>
        <div class="x-dashed-2" :style="{
          position: 'absolute',
          left: 0,
          top: (100-lineParams.xdashed2)*unit+'px',
        }"></div>

        <div class="y-solid-1" :style="{
          position: 'absolute',
          left: lineParams.ysolid1*unit+'px',
          top: 0,
        }"></div>
        <div class="y-solid-2" :style="{
          position: 'absolute',
          left: lineParams.ysolid2*unit+'px',
          top: 0,
        }"></div>
        <div class="y-dashed-1" :style="{
          position: 'absolute',
          left: lineParams.ydashed1*unit+'px',
          top: 0,
        }"></div>
        <div class="y-dashed-2" :style="{
          position: 'absolute',
          left: lineParams.ydashed2*unit+'px',
          top: 0,
        }"></div>
        <div class="dot" :style="{
          position: 'absolute',
          left: dotLeft*unit+'px',
          top: dotTop*unit+'px',
        }"></div>
        <div class="top-text-cont">{{topText}}</div>
        <div class="right-text-cont">
          <ul>
            <li v-for="item in rightText">{{item}}</li>
          </ul>
        </div>
        <div class="bottom-text-cont">
          <ul>
            <li v-for="item in bottomText">{{item}}</li>
          </ul>
        </div>
        <div class="left-text-cont">
          <div>
            <ul class="ul1">
              <li>不好交际</li>
              <li>文静的</li>
              <li>被动的</li>
              <li>谨慎的</li>
            </ul>
          </div>
          <ul class="ul2">
            <li v-for="item in leftText">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  export default {
    data() {
      return {
        xScale: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
        yScale: [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5, 0],
        unit: 0,
        dotLeft: 0,
        dotTop: 0,
        dotParams: {
          top: 70,
          left: 80,
        },
        lineParams: {
          xsolid1: 57,
          xsolid2: 42,
          xdashed1: 62,
          xdashed2: 38,
          ysolid1: 43,
          ysolid2: 57,
          ydashed1: 38,
          ydashed2: 62,
        },
        topText: '心境被动易怒不稳定',
        rightText: ['冲动的', '主动的', '社会化', '开朗的'],
        bottomText: ['N量表', '（标准分）', '镇静的善领导的'],
        leftText: ['E量表', '（标准分）'],
      }
    },
    mounted() {
      this.renderChart();
    },
    methods: {
      renderChart() {
        console.log( this.$refs.mainChart.offsetWidth )
        this.unit = this.$refs.mainChart.offsetWidth / 100;
        document.querySelector('.main-chart').style.height = this.$refs.mainChart.offsetWidth+'px';
        console.log('unit', this.unit)
        this.dotLeft = this.dotParams.left;
        this.dotTop = 100 - this.dotParams.top;
      }
    }
  }
</script>
<style lang="scss" scoped>
$color: #000;
.container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-left: 60px;
  .content {
    width: 100%;
    height: 100%;
    padding: 50px;
    .main-chart {
      position: relative;
      width: 100%;
      height: 100%;
      .x-axis {
        position: absolute;
        left: 0;
        top: 50%;
        width: 100%;
        height: 1px;
        background-color: $color;
        .x-scale {
          height: 6px;
          width: 0;
          border-right: 1px solid $color;
          .x-s {
            position: absolute;
            top: 4px;
            left: -6px;
            font-size: 10px;
          }
        }
      }
      .dot {
        width: 8px;
        height: 8px;
        background-color: $color;
        border-radius: 10px;
        transform: translate(-50%, -50%);
      }
      .x-solid-1 {
        width: 100%;
        height: 0px;
        border-top: 1px solid $color;
      }
      .x-dashed-1 {
        width: 100%;
        height: 0px;
        border-top: 1px dashed $color;
      }
      .x-solid-2 {
        width: 100%;
        height: 0px;
        border-top: 1px solid $color;
      }
      .x-dashed-2 {
        width: 100%;
        height: 0px;
        border-top: 1px dashed $color;
      }
      .y-axis {
        position: absolute;
        left: 50%;
        top: 0;
        width: 1px;
        height: 100%;
        background-color: $color;
        .y-scale {
          height: 0;
          width: 6px;
          border-bottom: 1px solid $color;
          .y-s {
            position: absolute;
            top: -8px;
            left: 8px;
            font-size: 10px;
          }
        }
      }
      .y-solid-1 {
        width: 0px;
        height: 100%;
        border-right: 1px solid $color;
      }
      .y-solid-2 {
        width: 0px;
        height: 100%;
        border-right: 1px solid $color;
      }
      .y-dashed-1 {
        width: 0px;
        height: 100%;
        border-right: 1px dashed $color;
      }
      .y-dashed-2 {
        width: 0px;
        height: 100%;
        border-right: 1px dashed $color;
      }
      .top-text-cont {
        position: absolute;
        left: 0;
        top: -24px;
        width: 100%;
        text-align: center;
        font-size: 10px;
      }
      .right-text-cont {
        position: absolute;
        right: -44px;
        top: 0;
        height: 100%;
        font-size: 10px;
        display: flex;
        align-items: center;
      }
      .bottom-text-cont {
        position: absolute;
        bottom: -60px;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: center;
        font-size: 10px;
        ul {
          li {
            text-align: center;
          }
        }
      }
      .left-text-cont {
        position: absolute;
        left: -102px;
        top: 0;
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 10px;
        .ul1 {
          text-align: right;
        }
        .ul2 {
          transform: rotate(-90deg);
          li {
            text-align: center;
          }
        }
      }
    }
  }
}
</style>