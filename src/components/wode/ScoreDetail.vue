<template>
  <div class="score-box">
    <div class="score-top">{{totalScore}}积分</div>
    <div class="score-list">
      <div class="list-title">积分记录</div>

      <div class="score-item" v-for="(item, index) in scoreList" :key="index">
        <div class="score-item-left">
          <div class="get-score-shengyu">剩余<span>{{item.balance}}</span></div>
          <div class="get-score-time">{{new Date(item.createDate).toLocaleString()}}</div>
        </div>
        <div class="score-item-right">
          <div class="get-score-type">{{item.integralType == 1 ? "用户签到" : "积分兑换"}}</div>
          <span>{{item.integralType == 1 ? "+" : "-"}}{{item.integralAccount}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  mounted() {
    const ctx = this;
    const localData = JSON.parse(localStorage.getItem("yhqc")).userinfo;
    axios
      .get("/integral/userIntegral", {
        params: { userId: localData.id }
      })
      .then(function(response) {
        if (response.data.code == 0) {
          ctx.totalScore = response.data.data;
        }
      });
    axios
      .get("/integral/userIntegraldetail", {
        params: { userId: localData.id }
      })
      .then(function(response) {
        if (response.data.code == 0) {
          ctx.scoreList = response.data.data;
        }
      });
  },
  data: function() {
    return {
      totalScore: 0,
      scoreList: []
    };
  }
};
</script>
<style>
.score-box {
}
.score-top {
  height: 200px;
  line-height: 200px;
  font-size: 30px;
  font-weight: 700;
  color: black;
  text-align: center;
  background: #e2dede;
}
.score-list {
  background: #f7f7f7;
  margin-top: 10px;
}
.list-title {
  font-size: 20px;
  font-weight: 700;
  text-align: center;
}
.score-item {
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 90%;
  margin: 0 auto;
  height: 60px;
  box-sizing: border-box;
  padding: 10px;
}
.score-item-right {
  display: flex;
  align-items: flex-end;
}
.score-item-right span {
  font-size: 20px;
  font-weight: 700;
  color: red;
}

.score-item-left {
}
.get-score-type {
  font-size: 14px;
  margin-right: 10px;
}
.get-score-shengyu {
  font-size: 14px;
}
.get-score-shengyu span {
    margin-left: 5px;
}
.get-score-time {
  font-size: 13px;
  color: #ccc;
  margin-top: 10px;
}
</style>