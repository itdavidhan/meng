<template>
  <div class="container">
    <prepare :planList="planList"></prepare>
    <div class="stage">
      <Button @click="handleDown" style="margin-bottom: 20px;">导出pdf</Button>
      <div id="demo" class="demo">
        <h3>春 晓</h3>
        <ul>
          <li>春眠不觉晓，</li>
          <li>处处闻啼鸟。</li>
          <li>夜来风雨声，</li>
          <li>花落知多少。</li>
        </ul>
        <img style="margin-left: 400px;" src="https://img.alicdn.com/tfs/TB1TVrFGHY1gK0jSZTEXXXDQVXa-520-280.png_q90_.webp" />
      </div>
    </div>
  </div>
</template>
<script>
  import htmlToPdf from '../../components/tools/htmlToPdf'
  import prepare from '../../components/prepare'
  export default {
    components: {prepare},
    data() {
      return {
        planList: [
          {value: 'cnpm install html2canvas --save', type: 'text'},
          {value: 'cnpm install jspdf --save', type: 'text'},
        ]
      }
    },
    methods: {
      handleDown() {
        htmlToPdf.downloadPDF(document.querySelector('#demo'), 'pdf名称')
      },
    },
  }
</script>
<style lang="scss" scoped>
  .container {
    .demo {
      background-color: orange;
      padding: 20px;
    }
  }
</style>