<template>
  <div class="map-container">
    <div class="map-cont" id="map"></div>
    <!-- <div class="list">
      <div v-for="item in listData" class="list-li">
        <i class="yuan"></i>
        <span>{{ item.name }}:</span>
        <span>{{ item.num }}人次</span>
      </div>
    </div> -->
  </div>
</template>
<script>
// import { getPsychologicalScreeningAreaNum } from "@/api/api";
// import $ from "jquery";
import axios from "axios";
import echarts from "echarts";
import map_json from "../../../public/geo-data/130000.json";
export default {
  data() {
    return {
      // listData: [],
      timer: null,
      mapChart: null,
      // areaData: [],
      currentAddress: "四川省,乐山市,夹江县"
    };
  },
  mounted() {
    this.init();

    // clearInterval(this.timer);
    // this.timer = setInterval(() => {
    //   this.getPsychologicalScreeningAreaNum();
    // }, 60000);
  },
  methods: {
    init() {
      this.initRenderMap();
      this.getGeoData(130000);
      this.backMap();
    },
    initRenderMap() {
      echarts.registerMap("leShan", map_json);
      this.mapChart = echarts.init(document.getElementById("map"));
      let d = [];
      for (let i = 0; i < map_json.features.length; i++) {
        d.push({
          name: map_json.features[i].properties.name,
          adcode: map_json.features[i].properties.adcode,
        });
        if (map_json.features[i].properties.name === "夹江县") {
          d[i].selected = true;
        }
      }
      this.mapChart.setOption({
        series: [
          {
            data: d,
            type: "map",
            map: "leShan",
            label: {
              emphasis: {
                color: "#fff"
              }
            },
            itemStyle: {
              //地图区域的多边形图形样式
              normal: {
                areaColor: "#172d7b", //地图区域颜色
                borderColor: "#93c1fb", //图形的描边颜色
                borderWidth: 1, //描边线宽。为 0 时无描边
                borderType: "solid",
                opacity: 1
              },
              emphasis: {
                areaColor: "#1432a3",
                opacity: 1
              }
            }
          }
        ]
      });
      this.selectArea();
    },
    selectArea() {
      let vm = this;
      this.mapChart.on("click", function(params) {
        console.log('params', params)
        let _adcode = params.data.adcode;
        vm.getGeoData(_adcode);
      });
    },
    getGeoData(adcode) {
      axios.get('/geo-data/' + adcode + '.json')
        .then(res=>{
          let _data = res.data;
          console.log(2222, _data)
          this.renderMap(_data, adcode);
        })
    },
    renderMap(map_json, adcode) {
      echarts.registerMap("leShan", map_json);
      this.mapChart = echarts.init(document.getElementById("map"));
      let mapData = [];
      for (let i = 0; i < map_json.features.length; i++) {
        mapData.push({
          name: map_json.features[i].properties.name,
          adcode: map_json.features[i].properties.adcode,
        });
        if (map_json.features[i].properties.adcode === adcode) {
          mapData[i].selected = true;
        }
      }

      this.mapChart.setOption(
        {
          series: [
            {
              data: mapData,
              type: "map",
              map: "leShan",
              label: {
                emphasis: {
                  color: "#fff"
                }
              },
              itemStyle: {
                //地图区域的多边形图形样式
                normal: {
                  areaColor: "#172d7b", //地图区域颜色
                  borderColor: "#93c1fb", //图形的描边颜色
                  borderWidth: 1, //描边线宽。为 0 时无描边
                  borderType: "solid",
                  opacity: 1
                },
                emphasis: {
                  areaColor: "#1432a3",
                  opacity: 1
                }
              }
            }
          ]
        },
        true
      );
    },
    backMap() {
      let vm = this;
      let canvas = document.getElementsByTagName("body")
      canvas.oncontextmenu = function(){ return false; }
      let box = document.getElementById("map");

      box.addEventListener('contextmenu', function(event){
        // 阻止浏览器鼠标右击事件。
        event.preventDefault();
        vm.getGeoData(130000);
      }, false);
    },
  }
};
</script>
<style lang="scss" scoped>
.map-container {
  width: 500px;
  // height: 360px;
  height: 500px;
  border: 1px solid #DDD;
  .map-cont {
    width: 100%;
    // height: 260px;
    height: 100%;
    // background: url("../../assets/images/earth.png") center center no-repeat;
    background-size: 78% auto;
  }
  // .list {
  //   color: #00ffff;
  //   font-size: 9px;
  //   padding-left: 20px;
  //   margin-top: 10px;
  //   width: 80%;
  //   .list-li {
  //     position: relative;
  //     display: inline-block;
  //     margin-right: 30px;
  //     margin-bottom: 10px;
  //     &:after {
  //       content: "";
  //       position: absolute;
  //       width: 76px;
  //       height: 1px;
  //       left: -6px;
  //       bottom: -4px;
  //       background: url("../../assets/images/di.png") left top no-repeat;
  //     }
  //   }
  //   .yuan {
  //     display: inline-block;
  //     width: 6px;
  //     height: 6px;
  //     background-color: #ffb53c;
  //     border-radius: 10px;
  //     margin-right: 4px;
  //   }
  // }
}
</style>
