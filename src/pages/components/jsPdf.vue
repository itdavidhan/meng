<template>
  <div class="container">
    <prepare :planList="planList"></prepare>
    <div class="stage">
      <Button @click="handleDown('pdf')" style="margin-bottom: 20px;">导出pdf</Button>
      <Button @click="handleDown('png')" style="margin-bottom: 20px;">导出png</Button>
      <div id="demo" class="demo">
        <h3>春 晓</h3>
        <ul>
          <li>春眠不觉晓，</li>
          <li>处处闻啼鸟。</li>
          <li>夜来风雨声，</li>
          <li>花落知多少。</li>
        </ul>
        <img style="margin-left: 400px;" src="https://img.alicdn.com/tfs/TB1TVrFGHY1gK0jSZTEXXXDQVXa-520-280.png_q90_.webp" crossOrigin="Anonymous" />
      </div>
    </div>
  </div>
</template>
<script>
  import htmlToPdf from '../../components/tools/htmlToPdf'
  import prepare from '../../components/prepare'

  import html2canvas from "html2canvas";

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
      handleDown(type) {
        switch(type) {
          case 'pdf':
            htmlToPdf.downloadPDF(document.querySelector('#demo'), 'pdf名称')
            // htmlToPdf.downloadPDF2(document.querySelector('#demo'), {
            //   filename: '报表.pdf',
            // })
            break;
          case 'png':
            this.saveImage(document.querySelector('#demo'), 'png名称');
            break;
        }
        
      },

      //下面是methods中的内容
      //图片转换格式的方法
      dataURLToBlob(dataurl) {
        let arr = dataurl.split(",");
        let mime = arr[0].match(/:(.*?);/)[1];
        let bstr = atob(arr[1]);
        let n = bstr.length;
        let u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
      },
      /*保存图片的方法（即按钮点击触发的方法）   
        第一个参数为需要保存的div的id名  
        第二个参数为保存图片的名称 */
      saveImage(ele, imgText) {
        let that = this;
        let a = document.createElement("a");
        html2canvas(ele).then(canvas => {
          let dom = document.body.appendChild(canvas);
          dom.style.display = "none";
          a.style.display = "none";
          document.body.removeChild(dom);
          let blob = that.dataURLToBlob(dom.toDataURL("image/png"));
          a.setAttribute("href", URL.createObjectURL(blob));
          //这块是保存图片操作  可以设置保存的图片的信息
          a.setAttribute("download", imgText + ".png");
          document.body.appendChild(a);
          a.click();
          URL.revokeObjectURL(blob);
          document.body.removeChild(a);
        });
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