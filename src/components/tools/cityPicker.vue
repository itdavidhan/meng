<template>
  <div class="city-picker-container">
    <Select v-model="cpData.prov"  @on-change="changeProvince" :disabled="showFlag">
        <Option v-for="item in pcasData" :value="item.id" :key="item.id">{{ item.areaname }}</Option>
    </Select>
    <Select v-model="cpData.city"  @on-change="changeCity" :disabled="showFlag">
        <Option v-for="item in cityData" :value="item.id" :key="item.id">{{ item.areaname }}</Option>
    </Select>
    <Select v-model="cpData.area" @on-change="changeArea" :disabled="showFlag">
        <Option v-for="item in areaData" :value="item.id" :key="item.id">{{ item.areaname }}</Option>
    </Select>
  </div>
</template>
<script>
  import pcas from './china-area.json'
  export default {
    props: [],
    data() {
      return {
        pcasData: '',
        provinceData: '',
        cityData: '',
        showFlag: false,
        areaData: '',
        cpData: {
          prov: '',
          prov_name: '',
          city: '',
          city_name: '',
          area: '',
          area_name: '',
        }
      }
    },
    methods: {
      changeProvince(v) {
        let currentPo = this._.filter(pcas, function(item) {
          return item.id == v;
        });
        this.cityData = currentPo.length>0 ? currentPo[0].city : [];
        this.cpData.area = '';
        if(currentPo[0]) this.cpData.prov_name = currentPo[0].areaname;
      },
      changeCity(v) {
        let currentCi = this._.filter(this.cityData, function(item) {
          return item.id == v;
        });
        this.areaData = currentCi.length>0 ? currentCi[0].area : [];
        if(currentCi[0]) this.cpData.city_name = currentCi[0].areaname;
      },
      changeArea(v) {
        let currentArea = this._.filter(this.areaData, function(item) {
          return item.id == v;
        });
        if(currentArea[0]) this.cpData.area_name = currentArea[0].areaname;
        if(this.cpData.area && this.cpData.area.length>0) {
          this.$emit('getCpData', this.cpData);
        } 
      },
    },
    mounted() {
      this.pcasData = pcas;
    },
  }
</script>
<style lang="scss" scoped>
  .city-picker-container {
    // display: inline-block;
    /deep/.ivu-select {
      width: 200px;
      margin-right: 10px;
    }
    .c-text {
      padding-left: 10px;
    }
  }
</style>
