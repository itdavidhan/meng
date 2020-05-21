<template>
  <div class="container">
    <prepare :planList="planList"></prepare>
    <div class="print-cont-01">
      <div>这里不打印</div>
      <div class="print" id="printMe">
        <h3>春 晓</h3>
        <ul>
          <li>春眠不觉晓，</li>
          <li>处处闻啼鸟。</li>
          <li>夜来风雨声，</li>
          <li>花落知多少。</li>
        </ul>
      </div>
      <div>这里也不打印</div>
      <Button v-print="'#printMe'">打印</Button>
    </div>
    <div class="print-cont-02">
      <div>这里不打印</div>
      <div class="print" id="print-area">
        <h3>春 晓</h3>
        <span>孟浩然</span>
        <ul>
          <li>春眠不觉晓，</li>
          <li>处处闻啼鸟。</li>
          <li>夜来风雨声，</li>
          <li>花落知多少。</li>
        </ul>

        <h3>春 晓</h3>
        <span>孟浩然</span>
        <ul>
          <li>春眠不觉晓，</li>
          <li>处处闻啼鸟。</li>
          <li>夜来风雨声，</li>
          <li>花落知多少。</li>
        </ul>
        <h3>春 晓</h3>
        <span>孟浩然</span>
        <ul>
          <li>春眠不觉晓，</li>
          <li>处处闻啼鸟。</li>
          <li>夜来风雨声，</li>
          <li>花落知多少。</li>
        </ul>
        <h3>春 晓</h3>
        <span>孟浩然</span>
        <ul>
          <li>春眠不觉晓，</li>
          <li>处处闻啼鸟。</li>
          <li>夜来风雨声，</li>
          <li>花落知多少。</li>
        </ul>
        <h3>春 晓</h3>
        <span>孟浩然</span>
        <ul>
          <li>春眠不觉晓，</li>
          <li>处处闻啼鸟。</li>
          <li>夜来风雨声，</li>
          <li>花落知多少。</li>
        </ul>
        <h3>春 晓</h3>
        <span>孟浩然</span>
        <ul>
          <li>春眠不觉晓，</li>
          <li>处处闻啼鸟。</li>
          <li>夜来风雨声，</li>
          <li>花落知多少。</li>
        </ul>

        <h3>春 晓</h3>
        <span>孟浩然</span>
        <ul>
          <li>春眠不觉晓，</li>
          <li>处处闻啼鸟。</li>
          <li>夜来风雨声，</li>
          <li>花落知多少。</li>
        </ul>
        <h3>春 晓</h3>
        <span>孟浩然</span>
        <ul>
          <li>春眠不觉晓，</li>
          <li>处处闻啼鸟。</li>
          <li>夜来风雨声，</li>
          <li>花落知多少。</li>
        </ul>
        <h3>春 晓</h3>
        <span>孟浩然</span>
        <ul>
          <li>春眠不觉晓，</li>
          <li>处处闻啼鸟。</li>
          <li>夜来风雨声，</li>
          <li>花落知多少。</li>
        </ul>
        <h3>春 晓99999999999999999999</h3>
        <span>孟浩然</span>
        <ul>
          <li>春眠不觉晓，</li>
          <li>处处闻啼鸟。</li>
          <li>夜来风雨声，</li>
          <li>花落知多少。</li>
        </ul>
      </div>
      <div>这里也不打印</div>
      <Button @click="printHTML('print-area', 'html')">使用printJs打印</Button>
    </div>
  </div>
</template>
<script>
  import printJs from 'print-js'
  import prepare from '../../components/prepare'
  export default {
    components: {prepare},
    data() {
      return {
        planList: [
          {value: 'cnpm install print-js --save', type: 'text',},
          {
            value: 'printJS官网示例', 
            href: 'https://printjs.crabbly.com/#documentation', 
            type: 'href',
          },
        ]
      }
    },
    methods: {
      printHTML(o, type) {
        console.log('printJs',  printJs)
        printJs(o, type);
      },
    }
  }
</script>
<style lang="scss" scoped>
  .container {
    .print {
      margin: 50px 10px;
    }
  }
</style>