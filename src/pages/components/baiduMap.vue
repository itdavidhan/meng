<template>
  <div class="container">
    <div class="prepare">
      <h3>前期准备</h3>
      <p>npm install vue-baidu-map --save</p>
      <p>
        <span>api地址：</span>
        <a href="https://dafrok.github.io/vue-baidu-map/#/zh/start/installation" target="_blank">vue baidu map</a>
      </p>
    </div>
    <div class="stage">
      <div class="handle-cont">
        <Select v-model="mapData.mapType" style="width:200px">
          <Option v-for="item in mapTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <p>position: {{showPosition}}</p>
        <Input v-model="keyword" @on-change="querySearch"></Input>
      </div>
      <baidu-map
        class="bm-view"
        ak="BZSVxWBVaR0VtZG5hPMuBsGuGWskFnMs" 
        :center="mapData.position"
        :scroll-wheel-zoom="true"
        :map-type="mapData.mapType"
        @ready="handler"
        :zoom="15">
        <bm-marker 
          :position="mapData.position" 
          :dragging="true"
          :show="isReady"
          @dragend="dragend"
           >
        </bm-marker>
        <bm-info-window :show="isReady" :position="mapData.position" title="Info Window Title">
          <p v-text="6666"></p>
        </bm-info-window>
        <!--比例尺控件-->
        <bm-scale anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-scale>
        <!--交通流量图层-->
        <bm-traffic></bm-traffic>
        <!--缩放控件-->
        <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" ></bm-navigation>
        <!--定位-->
        <bm-geolocation 
          anchor="BMAP_ANCHOR_BOTTOM_RIGHT" 
          @locationSuccess="locationSuccess"
          :showAddressBar="true" 
          :autoLocation="true">
        </bm-geolocation>
        <bm-local-search 
          :keyword="keyword" 
          :auto-viewport="true" 
          :location="location"
          @searchcomplete="searchcomplete"
        >
        </bm-local-search>
      </baidu-map>
    </div>
  </div>
</template>

<script>
// 地图组件
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
// 地图 - 标记组件
import BmMarker from 'vue-baidu-map/components/overlays/Marker'
// 地图 - 比例尺组件
import BmScale from 'vue-baidu-map/components/controls/Scale'
// 地图 - 交通流量图层组件
import BmTraffic from 'vue-baidu-map/components/layers/Traffic'
// 地图 - 缩放组件
import BmNavigation from 'vue-baidu-map/components/controls/Navigation'
// 地图 - 信息窗口
import BmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow'
// 地图 - 定位
import BmGeolocation from 'vue-baidu-map/components/controls/Geolocation'
// 地图 - 检索
import BmLocalSearch from 'vue-baidu-map/components/search/LocalSearch'

export default {
  components: {
    BaiduMap, BmMarker, BmScale, BmNavigation, BmTraffic, BmInfoWindow, BmGeolocation, BmLocalSearch,
  },
  data() {
    return {
      mapData: {
        mapType: 'BMAP_NORMAL_MAP',
        position: {lng: 0, lat: 0}
      },
      showPosition: null,
      mapTypeList: [
        {label: '普通街道视图', value: 'BMAP_NORMAL_MAP'},
        {label: '卫星视图', value: 'BMAP_SATELLITE_MAP'},
        {label: '卫星和路网的混合视图', value: 'BMAP_HYBRID_MAP'},
      ],
      isReady: false,
      location: '北京市',
      keyword: '',
      BMap: null,
    }
  },
  mounted() {
    
  },
  methods: {
    searchcomplete(opt) {
      console.log('opt', opt)
    },
    querySearch() {
      let geo = new this.BMap.Geocoder();
      geo.getPoint(this.keyword, function (point) {
        if (point) {
          console.log(999, point);
        }
      });

    },
    handler({BMap, map}) {
      let vm = this;
      console.log('BMap, map', BMap, map)
      this.BMap = BMap;
      let geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r){
        console.log('rrr', r)
        vm.$set(vm.mapData, 'position', {
          lng: r.longitude, 
          lat: r.latitude,
        })
        vm.isReady = true;
      });
    },
    dragend(event) {
      console.log('event', event)
      this.showPosition = event.point
    },
    locationSuccess(location) {
      console.log( 'location', location)
    },
  }
}
</script>

<style lang="scss" scoped>
  .bm-view {
    width: 100%;
    height: 400px;
  }
  .handle-cont {
    margin-bottom: 20px;
  }
</style>