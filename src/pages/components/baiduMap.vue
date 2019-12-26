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
      </div>
      <baidu-map
        class="bm-view"
        ak="BZSVxWBVaR0VtZG5hPMuBsGuGWskFnMs" 
        :center="mapData.position"
        :scroll-wheel-zoom="true"
        :map-type="mapData.mapType"
        :zoom="15">
        <bm-marker 
          :position="mapData.position" 
          :dragging="true"
          @dragend="dragend"
          animation="BMAP_ANIMATION_BOUNCE">
        </bm-marker>
        <!--比例尺控件-->
        <bm-scale anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-scale>
        <!--缩放控件-->
        <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" ></bm-navigation>
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
// 地图 - 缩放组件
import BmNavigation from 'vue-baidu-map/components/controls/Navigation'

export default {
  components: {
    BaiduMap, BmMarker, BmScale, BmNavigation
  },
  data() {
    return {
      mapData: {
        mapType: 'BMAP_NORMAL_MAP',
        position: {lng: 116.482674, lat: 39.913098},
      },
      mapTypeList: [
        {label: '普通街道视图', value: 'BMAP_NORMAL_MAP'},
        {label: '卫星视图', value: 'BMAP_SATELLITE_MAP'},
        {label: '卫星和路网的混合视图', value: 'BMAP_HYBRID_MAP'},
      ],
    }
  },
  methods: {
    dragend(event) {
      console.log('event', event)
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