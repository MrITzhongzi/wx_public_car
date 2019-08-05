<template>
  <div class="calendar-box">
    <div class="calendar-top">
      <div
        class="calendar-top-content"
      >{{currentDate}}</div>
    </div>
    <Calendar>
      <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
      <template slot="dateCell" slot-scope="{date, data}">
        <div class="my-calendar-cell">
          <div
            :class="['my-calendar-cell-content', chooseData.indexOf(data.day) != -1 ? 'is-selected' : '']"
          >{{ data.day.split("-")[2]}}</div>
        </div>
      </template>
    </Calendar>
    <div class="calendar-bottom">
        <div class="calendar-botom-desc">你已经累计签到</div>
        <div class="calendar-botom-num">{{1}}天</div>
    </div>
    <div class="sign-btn">已签到</div>
  </div>
</template>

<script>
import Vue from "vue";
import { Calendar, Button, ButtonGroup } from "element-ui";
import axios from "axios";
Vue.component(Button.name, Button);
Vue.component(ButtonGroup.name, ButtonGroup);
export default {
  beforeMount: async function() {
    const ctx = this;
    //   const openId = JSON.parse(localStorage.getItem('yhqc')).userinfo.openId;
    await axios
      .get("/integral/getSignInfo?openId=o8Hzb1bR8aSfsq_HiLYzHSQJu09w")
      .then(function(response) {
        console.log(response.data);
        let tmp = [];

        for (let i = 0; i < response.data.data.dateList.length; i++) {
          let dateArr = new Date(response.data.data.dateList[i])
            .toLocaleString()
            .split(" ")[0]
            .split("/");

          if (dateArr[1].length == 1) {
            dateArr[1] = "0" + dateArr[1];
          }
          if (dateArr[2].length == 1) {
            dateArr[2] = "0" + dateArr[2];
          }

          tmp.push(dateArr.join("-"));
        }
        ctx.chooseData = tmp;
      });
  },
  data: function() {
    return {
      chooseData: []
    };
  },
  components: {
    Calendar,
    Button,
    ButtonGroup
  },
  computed: {
    currentDate: function() {
      let tmpArr = new Date()
        .toLocaleString()
        .split(" ")[0]
        .split("/");
      let str = tmpArr[0] + "年" + tmpArr[1] + "月" + tmpArr[2] + "日";
      return str;
    }
  }
};
</script>

<style>
.calendar-box .el-calendar__header {
  display: none;
}
.calendar-box .el-calendar__body {
    padding-bottom: 0px;
}
.calendar-box .el-calendar-day {
  height: 50px !important;
  margin: 0;
  padding: 0 !important;
}

.calendar-box .el-calendar__button-group {
  display: none;
}

.calendar-box .el-calendar-table th {
  font-size: 12px;
}
.calendar-box .el-calendar-table td,
.el-calendar-table tr:first-child td,
.el-calendar-table tr td:first-child {
  border: none;
}

.calendar-top-content {
  width: 90%;
  height: 50px;
  border-radius: 25px;
  background-image: linear-gradient(left, #73c509, #97ce24);
  text-align: center;
  margin: 20px auto;
  line-height: 50px;
  color: #faffef;
}

.my-calendar-cell {
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 12px;
  box-sizing: border-box;
  padding: 10px 7px;
}
.my-calendar-cell-content {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  line-height: 30px;
}
.my-calendar-cell-content.is-selected {
  color: white;
  background-image: linear-gradient(left, #97ce24, #73c509);
}
.calendar-bottom {
    text-align: center;
    font-size: 13px;
    
}
.calendar-botom-desc {

}

.calendar-botom-num {
    font-size: 24px;
}
.sign-btn {
    width: 140px;
    height: 45px;
    border-radius: 22px;
    text-align: center;
    line-height: 45px;
    margin: 10px auto;
    background-image: linear-gradient(left, #78c60e, #94cf23);
}
</style>
