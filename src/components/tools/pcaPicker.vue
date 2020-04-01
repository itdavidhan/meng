<template>
  <div class="city-picker-container">
    <template
      v-if="
        cbData.level == 'province' ||
          cbData.level == 'province_city' ||
          cbData.level == 'province_city_county'
      "
    >
      <span class="c-text" v-show="opt.showText">省：</span>
      <Select
        v-model="cpData.prov"
        style="width: 150px; margin-right: 10px;"
        @on-change="changeProvince"
        :disabled="showFlag"
        clearable
        size="small"
      >
        <Option v-for="item in pcasData" :value="item.id" :key="item.id">{{
          item.areaname
        }}</Option>
      </Select>
    </template>
    <template
      v-if="
        cbData.level == 'province_city' ||
          cbData.level == 'province_city_county'
      "
    >
      <span class="c-text" v-show="opt.showText">市：</span>
      <Select
        v-model="cpData.city"
        style="width: 150px; margin-right: 10px;"
        @on-change="changeCity"
        :disabled="showFlag"
        clearable
        size="small"
      >
        <Option v-for="item in cityData" :value="item.id" :key="item.id">{{
          item.areaname
        }}</Option>
      </Select>
    </template>
    <template v-if="cbData.level == 'province_city_county'">
      <span class="c-text" v-show="opt.showText">区：</span>
      <Select
        v-model="cpData.area"
        style="width:150px"
        @on-change="changeArea"
        :disabled="showFlag"
        clearable
        size="small"
      >
        <Option v-for="item in areaData" :value="item.id" :key="item.id">{{
          item.areaname
        }}</Option>
      </Select>
    </template>
  </div>
</template>
<script>
import pcas from "./china-area.json";
// import pcas from './china-area-cdms.json'
export default {
  props: ["opt", "cp", "cbData", "disabled", "areaFlag"],
  data() {
    return {
      pcasData: "",
      provinceData: "",
      cityData: "",
      showFlag: false,
      areaData: "",
      cpData: {
        prov: "",
        city: "",
        area: "",
        prov_name: "",
        city_name: "",
        area_name: "",
        cbData: null
      }
    };
  },
  methods: {
    changeProvince(v) {
      let currentPo = this._.filter(pcas, function(item) {
        return item.id == v;
      });
      this.cityData = currentPo.length > 0 ? currentPo[0].city : [];
      if (currentPo[0]) this.cpData.prov_name = currentPo[0].areaname;
      if (
        this.cbData.level == "province" &&
        this.cpData.prov &&
        this.cpData.prov.length > 0
      ) {
        this.$emit("getCpData", this.cpData);
      }
    },
    changeCity(v) {
      let currentCi = this._.filter(this.cityData, function(item) {
        return item.id == v;
      });
      this.areaData = currentCi.length > 0 ? currentCi[0].area : [];
      if (currentCi[0]) this.cpData.city_name = currentCi[0].areaname;
      if (
        this.cbData.level == "province_city" &&
        this.cpData.city &&
        this.cpData.city.length > 0
      ) {
        this.$emit("getCpData", this.cpData);
      }
    },
    changeArea(v) {
      let currentArea = this._.filter(this.areaData, function(item) {
        return item.id == v;
      });
      if (currentArea[0]) this.cpData.area_name = currentArea[0].areaname;
      if (
        this.cbData.level == "province_city_county" &&
        this.cpData.area &&
        this.cpData.area.length > 0
      ) {
        this.$emit("getCpData", this.cpData);
      }
    },
    // 编辑
    initCp(param) {
      let data = this._.cloneDeep(param);
      if (typeof data == "undefined" || !data) return;
      if (typeof data == "string") {
        data = JSON.parse(data);
      }
      this.cpData = this._.cloneDeep(data);
      this.cpData.cbData = this._.cloneDeep(this.cbData) || this.cpData.cbData;
      this.changeProvince(data.prov);
      if (
        this.cbData.level == "province_city" ||
        this.cbData.level == "province_city_county"
      ) {
        this.changeCity(data.city);
      }
      if (
        this.cbData.level == "province" ||
        this.cbData.level == "province_city" ||
        this.cbData.level == "province_city_county"
      ) {
        this.changeArea(data.area);
      }
    }
  },
  created() {},
  mounted() {
    this.showFlag = this.disabled;
    this.cpData.cbData = this.cbData || this.cpData.cbData;
    this.pcasData = pcas;

    if (this.cbData.level == "province_city_county")
      this.changeArea(this.cpData.area);
  },
  watch: {
    cp: {
      immediate: true, // 很重要
      handler(newVal) {
        this.initCp(newVal);
      },
      deep: true
    },
    disabled(newVal) {
      this.showFlag = newVal;
    }
  }
};
</script>
<style lang="scss" scoped>
.city-picker-container {
  display: inline-block;
  .c-text {
    padding-left: 10px;
  }
}
</style>
