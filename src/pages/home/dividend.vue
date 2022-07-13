<template>
  <div class="container">
    <div class="top-cont">
      
    </div>
    <Form :label-width="80" inline>
      <FormItem label="本金数额">
        <InputNumber :min="0" v-model="capital" placeholder="本金数额" style="width: 100px;" />
      </FormItem>
      <FormItem label="股息率">
        <InputNumber :min="0" v-model="stock_yield" placeholder="股息率" style="width: 100px;" />
      </FormItem>
      <!-- <FormItem label="每股价格">
        <InputNumber :min="0" v-model="stock_price" placeholder="每股价格" style="width: 300px;" />
      </FormItem>
      <FormItem label="股数">
        <InputNumber readonly :min="0" v-model="stock_num" placeholder="股数" style="width: 300px;" />
      </FormItem>
      <FormItem label="每股分红">
        <InputNumber :min="0" v-model="stock_dividend" placeholder="每股分红" style="width: 300px;" />
      </FormItem> -->
      <FormItem label="投资年限">
        <InputNumber :min="0" v-model="year_num" placeholder="投资年限" style="width: 100px;" />
      </FormItem>
      <FormItem label="初始年度">
        <InputNumber :min="0" v-model="year_start" placeholder="初始年度" style="width: 100px;" />
      </FormItem>
      <FormItem label="每年追加">
        <InputNumber :min="0" v-model="add_num" placeholder="每年追加" style="width: 100px;" />
      </FormItem>
      <FormItem label=" ">
        <Button type="primary" @click="startCalculate">开始计算</Button>
      </FormItem>
    </Form>
    
    <div class="main-cont" style="padding-bottom: 20px;">
      <Table :columns="table_columns" :data="table_data" stripe size="small">
        <template #year="{ row }">
          <span>第{{ row.year }}年</span>
        </template>
        <template #year_start="{ row }">
          <span>{{ year_start+row.year }}年</span>
        </template>
        <template #capital="{ row }">
          <span>{{ row.capital.toFixed(0) }}</span>
        </template>
        <template #dividend="{ row }">
          <span>{{ row.dividend.toFixed(0) }}</span>
        </template>
        <template #monthly="{ row }">
          <span>{{ row.monthly.toFixed(0) }}</span>
        </template>
      </Table>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        capital: 250000, // 本金数额
        stock_price: 4.99, // 每股价格
        stock_dividend: 0.355, // 每股分红
        stock_yield: 0.07, // 股息率
        year_num: 10, // 投资年限
        year_start: 2023, // 初始年度
        add_num: 50000, // 每年追加
        table_data: [], // 表格数据
        table_columns: [
          {title: '投资年限', slot: 'year'},
          {title: '年度', slot: 'year_start'},
          {title: '本金', slot: 'capital'},
          {title: '当年分红', slot: 'dividend'},
          {title: '每月', slot: 'monthly'},
        ]
      }
    },
    computed: {
      // 股票数量: capital / stock_price
      stock_num() {
        return Number( (this.capital / this.stock_price).toFixed(0) );
      }
    },
    mounted() {
      this.startCalculate();

      // 导出数据为json文件到本地
      // var script = document.createElement('script');
      // script.src = "https://cdn.bootcss.com/FileSaver.js/2014-11-29/FileSaver.js";
      // document.getElementsByTagName('head')[0].appendChild(script);
     
      // let data = {
      //             name:"hanmeimei",
      //             age:88
      //         };
      //         var content = JSON.stringify(data);
      //         var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
      //         saveAs(blob, "save.json");
      
    }, 
    methods: {
      startCalculate() {
        let _capital = this.capital; // 初始本金
        this.table_data = [];
        for(let i=1; i<=this.year_num; i++) {
          _capital += this.add_num; // 本金+当年追加投资
          let _dividend = _capital*this.stock_yield; // 股息
          _capital += _dividend; // 本金+股息
          // _capital += this.add_num; // 本金+当年追加投资
          this.table_data.push({
            year: i,
            capital: _capital,
            dividend: _dividend,
            monthly: _dividend / 12,
          })
        }
      }
    }
  }
</script>