<template>
  <div class="container">
    <div>
      <h3>前期准备</h3>
      <p>cnpm install axios jszip file-saver --save</p>
    </div>
    <div>
      <h3>数据展示</h3>
      <ol class="data-list">
        <li v-for="(item, index) in caseData" :key="index">{{item.name}}</li>
      </ol>
    </div>
    <div>
      <Button type="primary" @click="clickDownload">批量打包下载</Button>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import JSZip from 'jszip'
  import FileSaver from 'file-saver'

  const getFile = url => {
    return new Promise((resolve, reject) => {
      axios({
        method:'get',
        url,
        responseType: 'arraybuffer'
      }).then(data => {
        resolve(data.data)
      }).catch(error => {
        reject(error.toString())
      })
    })
  }
  export default {
    data() {
      return {
        caseData: [
          {
            name: '安贞医院-病例比赛.docx',
            path: 'https://yhyd-resources.oss-cn-beijing.aliyuncs.com/files/bfb1c76737ade4b36a080e9056c84e0a.docx',
          },
          {
            name: '患者数据管理平台_测试用例.doc',
            path: 'https://yhyd-resources.oss-cn-beijing.aliyuncs.com/files/4416b09babea017d415c130902610087.doc',
          },
          {
            name: 'CDASHIG_v2(张顶焦-北京患得公司).doc',
            path: 'https://yhyd-resources.oss-cn-beijing.aliyuncs.com/files/b88a73fdf79fe4c3b85824b20141d1e6.docx',
          }
        ],
      }
    },
    methods: {
      clickDownload() {
        this.handleBatchDownload(this.caseData);
      },
      handleBatchDownload(data) {// data 需要下载打包的路径, 可以是本地相对路径, 也可以是跨域的全路径
        let zip = new JSZip()
        let cache = {}
        let promises = []
        data.forEach(item => {
          let promise = getFile(item.path).then(data => { // 下载文件, 并存成ArrayBuffer对象
            let file_name = item.name;
            zip.file(file_name, data, { binary: true }) // 逐个添加文件
            cache[file_name] = data
          })
          promises.push(promise)
        })
        Promise.all(promises).then(() => {
          zip.generateAsync({type:"blob"}).then(content => { // 生成二进制流
            FileSaver.saveAs(content, "打包下载.zip") // 利用file-saver保存文件
          })
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .container {
    >div {
      margin-bottom: 20px;
    }
    h3 {
      margin-bottom: 10px;
    }
    .data-list {
      margin-left: 16px;
    }
  }
</style>