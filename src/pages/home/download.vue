<template>
  <div class="container">
    <Form :model="formData">
      <FormItem label="URL">
        <Input v-model="formData.url" placeholder="请输入要下载的文件url地址"></Input>
      </FormItem>
      <FormItem label="名称">
        <Input v-model="formData.name" placeholder="请输入要保存的名称"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="submit">下载</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        formData: {
          url: 'https://yhyd-resources.oss-cn-beijing.aliyuncs.com/files/bfb1c76737ade4b36a080e9056c84e0a.docx',
          name: '',
        }
      }
    },
    methods: {
      submit() {
        let url = this.formData.url;
        let filename = this.formData.name;
        this.downloadFile(url, filename);
      },
      /**
       * 获取 blob
       * @param  {String} url 目标文件地址
       * @return {Promise} 
       */
      getBlob(url) {
        return new Promise(resolve => {
          const xhr = new XMLHttpRequest(); 
          xhr.open('GET', url, true);
          xhr.responseType = 'blob';
          xhr.onload = () => {
            if (xhr.status === 200) {
              resolve(xhr.response);
            }
          };
          xhr.send();
        });
      },
      /**
       * 保存
       * @param  {Blob} blob     
       * @param  {String} filename 想要保存的文件名称
       */
      saveAs(blob, filename) {
        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob, filename);
        } else {
          const link = document.createElement('a');
          const body = document.querySelector('body');

          link.href = window.URL.createObjectURL(blob);
          link.download = filename;

          // fix Firefox
          link.style.display = 'none';
          body.appendChild(link);
          
          link.click();
          body.removeChild(link);

          clearTimeout(this.timer);
          this.timer = setTimeout(()=>{
            this.showDownload = false;
          }, 1000);

          window.URL.revokeObjectURL(link.href);
        }
      },
      /**
       * 下载
       * @param  {String} url 目标文件地址
       * @param  {String} filename 想要保存的文件名称
       */
      downloadFile(url, filename) {
        this.showDownload = true;
        this.getBlob(url).then(blob => {
          this.saveAs(blob, filename);
        });
      },
    }
  }
</script>
<style lang="scss" scoped></style>