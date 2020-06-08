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
        <ul style="list-style: none;">
          <li>春眠不觉晓，</li>
          <li>处处闻啼鸟。</li>
          <li>夜来风雨声，</li>
          <li>花落知多少。</li>
        </ul>

        <img style="margin-left: 400px;" src="https://img.alicdn.com/tfs/TB1TVrFGHY1gK0jSZTEXXXDQVXa-520-280.png_q90_.webp" />
        <div style="width: 100%; height: 100px; overflow-x: auto; border: 1px solid #DDD;">
          <table>
            <tr>
              <td style="width: 200px;">111111111111111111111111111111111111111</td>
              <td style="width: 200px;">2222222222222222222222222222222222222222</td>
              <td style="width: 200px;">3333333333333333333333333333333333333333</td>
              <td style="width: 200px;">44444444444444444444444444444444444444444</td>
              <td style="width: 200px;">55555555555555555555555555555555555555555</td>
              <td style="width: 200px;">666666666666666666666666666666666666</td>
              <td style="width: 200px;">557777777777777777777777777777777777775</td>
              <td style="width: 200px;">888888888888888888888888888888888888888</td>
            </tr>
            <tr>
              <td>111</td>
              <td>222</td>
              <td>333</td>
              <td>444</td>
              <td>555</td>
              <td>666</td>
              <td>7777</td>
              <td>888888</td>
            </tr>
          </table>
          <p style="width: 1400px;">符合当地经济的闯荡江湖热风热风热风热风热发热发热发热发热发热发 热发温度额外的额外的额位的我非人防几份文件废物间谍位居第五间谍网间谍网蛱蝶我对接文档间谍网蛱蝶我觉得我i的结尾间谍网间谍网蛱蝶外大街我觉得我降低我觉得我i间谍我的几位无法接入网关分解公积金特务赤u而无法看完潜伏冲咖啡hi起飞后 偶就我姐夫我UFO我杰佛我飞机午饭后i仍未恢复ui让我去回复期望官方忽然问起和趣味乳房hi认为回复韦杰夫我非完全融合范维强哈佛i热武器废弃物恢复往日情怀放弃和我去防护热负荷房和和发黑发黄如放入飞花如</p>
        </div>
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
        printJs({
          printable: o,
          type: type,
            // 继承原来的所有样式
          targetStyles: ['*']
        })
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