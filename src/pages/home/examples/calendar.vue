<template>
  <div class="calendar">
    <div class="handler">
      <a href="javascript:;" @click="prevClick">上一月</a>
      <span>{{curYear}}年{{curMonth+1}}月</span>
      <a href="javascript:;" @click="nextClick">下一月</a>
    </div>
    <ul class="tit">
      <li>星期天</li>
      <li>星期一</li>
      <li>星期二</li>
      <li>星期三</li>
      <li>星期四</li>
      <li>星期五</li>
      <li>星期六</li>
    </ul>
    <ul class="day-item">
      <li v-for="item in dateList" :class="[item.type]" @click="clickDate(item)">
        <span>{{item.value}}</span>
        <ul>
          <li v-for="mess in item.message">{{mess.start}}-{{mess.end}}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        curYear: '',
        curMonth: '',
        dateList: 0, // 本月天数
        messageList: {
          "Friday": {"code": "Friday", "time": [{"end": "18:00", "start": "8:00"},{"end": "18:00", "start": "8:00"},{"end": "18:00", "start": "8:00"}], "week": "每周五"}, 
          "Monday": {"code": "Monday", "time": [{"end": "18:00", "start": "8:00"}], "week": "每周一"}, 
          // "Sunday": {"code": "Sunday", "time": [{"end": "18:00", "start": "8:00"}], "week": "每周日"}, 
          // "Tuesday": {"code": "Tuesday", "time": [{"end": "18:00", "start": "8:00"}], "week": "每周二"}, 
          // "Saturday": {"code": "Saturday", "time": [{"end": "18:00", "start": "8:00"}], "week": "每周六"}, 
          // "Thursday": {"code": "Thursday", "time": [{"end": "18:00", "start": "8:00"}], "week": "每周四"}, 
          // "Wednesday": {"code": "Wednesday", "time": [{"end": "18:00", "start": "8:00"}], "week": "每周三"}
        },
      }
    },
    mounted() {
      this.curYear = new Date().getFullYear();
      this.curMonth = new Date().getMonth();
      console.log('this.curMonth', this.curMonth)
      // 初始化
      this.initCalendar();
    },
    methods: {
      // 设置日历-初始化
      initCalendar() {
        let dateInfo = this.getDateInfo();
        console.log('dateInfo', dateInfo);
        let arr1 = []; // 上月显示天数
        let arr2 = []; // 本月显示天数
        let arr3 = []; // 下月显示天数
        let currentWeek = dateInfo.currentMonthFirstDayWeek;
        let currentMonthNum = dateInfo.currentMonthNum;
        let prevMonthNum = dateInfo.prevMonthNum;
        for(let i=0; i<currentWeek; i++) {
          let num = prevMonthNum - i;
          let _m = this.curMonth -1;
          let _y = this.curYear;
          if(_m<0) {
            _y--;
            _m = 11;
          }
          arr1.unshift({
            type: 'prev',
            value: num,
            date: _y+'-'+this.toDubble((_m+1))+'-'+this.toDubble(num),
          });
        }
        console.log('arr1', arr1)
        for(let i=1; i<=currentMonthNum; i++) {
          arr2.push({
            type: 'current',
            value: i,
            date: this.curYear+'-'+this.toDubble((this.curMonth+1))+'-'+this.toDubble(i),
          });
        }
        let total = (arr1.length+arr2.length)<=35 ? 35 : 42;
        let surplus = total - currentMonthNum - arr1.length; // 剩余显示天数
        for(let i=1; i<=surplus; i++) {
          let _m = this.curMonth +1;
          let _y = this.curYear;
          if(_m>11) {
            _y++;
            _m = 0;
          }
          arr3.push({
            type: 'next',
            value: i,
            date: _y+'-'+this.toDubble((_m+1))+'-'+this.toDubble(i),
          });
        }
        console.log('arr3', arr3)
        let arrTotal = arr1.concat(arr2, arr3);
        console.log('arrTotal', arrTotal)
        arrTotal.forEach((item, index)=>{
          item.week_code = index%7;
          switch(item.week_code) {
            case 0:
              item.week_text = 'Sunday';
              break;
            case 1:
              item.week_text = 'Monday';
              break;
            case 2:
              item.week_text = 'Tuesday';
              break;
            case 3:
              item.week_text = 'Wednesday';
              break;
            case 4:
              item.week_text = 'Thursday';
              break;
            case 5:
              item.week_text = 'Friday';
              break;
            case 6:
              item.week_text = 'Saturday';
              break;
          }
          if(this.messageList[item.week_text]) {
            item.message = this.messageList[item.week_text].time;
          }
        })
        this.dateList = arrTotal;
      },
      // 上个月
      prevClick() {
        this.curMonth--;
        if(this.curMonth < 0) {
          this.curYear--;
          this.curMonth = 11;
        }
        this.initCalendar();
      },
      // 下个月
      nextClick() {
        this.curMonth++;
        if(this.curMonth > 11) {
          this.curYear++;
          this.curMonth = 0;
        }
        this.initCalendar();
      },
      clickDate(item) {
        // alert(item.date);
      },
      // 获取日期信息
      getDateInfo() {
        let y = this.curYear;
        let m = this.curMonth;
        let nextDate = new Date(y, m+1, 1); // 下个月第一天
        let currentDate = new Date(nextDate).getTime() - 86400000; // 本月最后1天
        let dayNum = new Date(currentDate).getDate(); // 获取本月最后一天是几号
        console.log('本月天数', dayNum);

        let curDate = new Date(y, m, 1); // 本月第一天
        let curWeek = new Date(curDate).getDay(); // 本月第一天星期几0-6 0星期天
        console.log('本月第一天星期几', curWeek)

        let prevDate = new Date(curDate).getTime() - 86400000; // 上月最后1天
        let prevMonth = new Date(curDate).getMonth();
        let pDayNum = new Date(prevDate).getDate();
        console.log('上月天数', pDayNum)

        let nNextDate = new Date(y, m+2, 1); // 下下个月第一天
        let nDate = new Date(nNextDate).getTime() - 86400000; // 下月最后1天
        let nDayNum = new Date(nDate).getDate();
        console.log('下个月天数', nDayNum)
        return {
          currentMonthNum: dayNum,
          currentMonthFirstDayWeek: curWeek,
          prevMonthNum: pDayNum,
          prevMonth: prevMonth,
          nextMonthNum: nDayNum,
        }
      },
      toDubble(num) {
        if(num.toString().length==1) {
          return '0'+num;
        } else {
          return num;
        }
      },
    }
  }
</script>
<style lang="scss" scoped>
  .calendar {
    width: 700px;
    >ul {
      display: flex;
      flex-wrap: wrap;
      border-left: 1px solid #DDD;
      >li {
        width: 99px;
        border-bottom: 1px solid #DDD;
        border-right: 1px solid #DDD;
        &:hover {
          background-color: #EEE;
        }
      }
    }
    .handler {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .tit {
      li {
        border-top: 1px solid #DDD;
        text-align: center;
        align-items: center;
        padding: 10px;
      }
    }
    .day-item {
      >li {
        padding: 10px 0 10px 10px;
        min-height: 50px;
      }
      .prev, .next {
        color: #DDD;
      }
      .current {
        color: #000;
      }
    }
  }
</style>