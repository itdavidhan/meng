<template>
  <div class="container">
    <div class="prepare">
      <h3>前期准备</h3>
      <p>api: https://github.com/jecovier/vue-json-excel</p>
    </div>
    <download-excel
      class="btn btn-default"
      :data="dataList"
      :fields="jsonFields"
      type="xls"
      name="filename.xls">
      <Button type="primary">导出</Button>
    </download-excel>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        jsonFields: { // 表头
          "报警人": "reporter_fullname",
          "报警人电话": "reporter_contact",
          "报警机构": "department_name",
          "警情类型": {
            field: 'unusual_event_type',
            callback: (value) => {
              switch(value) {
                case 10:
                  return '轻度滋事';
                case 11:
                  return '肇事';
                case 12:
                  return '肇祸';
                case 13:
                  return '自伤';
                case 14:
                  return '自杀未遂';
                case 15:
                  return '其他';
              }
            },
          },
          "警情描述": "event_describe",
          "报警时间": "add_time",
          "被报警人姓名": "participant_name",
          "被报警人电话": "participant_contact",
          "处理状态": {
            field: 'event_state',
            callback: (value) => {
              switch(value) {
                case 10:
                  return '未接警';
                case 30:
                  return '已接警';
              }
            } 
          },
          "处理结果": "event_result",
          "最新接警人": "reporter_fullname",
        },
        dataList: [],   // 数据
      }
    },
    mounted() {
      this.dataList = [
        {
          id: 11,
          project_id: 884,
          reporter_id: "qw84e5deff7d11e98cabc80aa95ba6a2",
          reporter_fullname: "李梦瑶",
          reporter_contact: "13520166062",
          department_id: 2087,
          department_name: "QA机构-人民教育部",
          unusual_event_type: 12,
          unusual_event_type_name: "自伤",
          lng: "116.4709910",
          lat: "39.9837030",
          happen_address: "444",
          map_address: "北京市朝阳区宜家办公楼",
          event_describe: "警情描述",
          participant_id: 66,
          participant_name: "李大官人",
          participant_contact: "16601110040",
          event_state: 10,
          last_operator_id: null,
          last_operator: null,
          event_result: null,
          add_time: "2021-08-31 16:38:04"
        },
        {
          id: 9,
          project_id: 884,
          reporter_id: "qw84e5deff7d11e98cabc80aa95ba6a2",
          reporter_fullname: "李梦瑶",
          reporter_contact: "13520166062",
          department_id: 2087,
          department_name: "QA机构-人民教育部",
          unusual_event_type: 13,
          unusual_event_type_name: "自伤",
          lng: "116.4709910",
          lat: "39.9837030",
          happen_address: "444",
          map_address: "北京市朝阳区宜家办公楼",
          event_describe: "警情描述",
          participant_id: 66,
          participant_name: "李大官人",
          participant_contact: "16601110040",
          event_state: 10,
          last_operator_id: "abcd1415926535897933846227950288",
          last_operator: "dev_user",
          event_result: "处理结果",
          add_time: "2021-08-30 16:28:31"
        }
      ];
    },
    methods: {
      exportFile() {

      },
    }
  }
</script>
<style lang="scss" scoped>
  .container {
    .btn-default {
      display: inline-block;
    }
  }
</style>