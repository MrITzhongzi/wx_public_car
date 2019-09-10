<template>
  <div class="purpose-box">
    <div class="purpose-car-list">
      <div class="purpose-item" v-for="(item, index) in carlist" :key="index">
        <div class="purpose-top">
          <div class="purpose-top-left ellipsis">{{item.name}}</div>
          <div class="purpose-top-right ellipsis">{{item.mobile}}</div>
        </div>
        <div class="purpose-bottom">
          <div class="purpose-bottom-left ellipsis">{{item.model_name}}</div>
          <div class="purpose-bottom-right ellipsis">{{item.min_price > 10000 ? item.min_price / 10000 + "万" : item.min_price}} - {{item.max_price > 10000 ?  item.max_price/10000 + "万" : item.max_price}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  mounted: function() {
    const ctx = this;
    const localData = JSON.parse(localStorage.getItem("yhqc"));
    const userId = localData.userinfo.id;
    axios
      .get("/vehicle/getUserVehicles?userId=" + userId)
      .then(function(response) {
        console.log(response);
        if (response.data.code == 0) {
          ctx.carlist = response.data.data;
        }
      });
  },
  data: function() {
    return {
      carlist: []
    };
  }
};
</script>
<style scoped>
.purpose-box {
}
.purpose-car-list {
}
.purpose-item {
  box-sizing: border-box;
  margin: 25px 10px 0;
  box-shadow: 1px 1px 2px 2px #ccc;
  padding: 3px;
}
.purpose-item > div {
  display: flex;
  /* justify-content: space-around; */
}
.purpose-top {
}
.purpose-top-left {
  width: 1px;
  flex-basis: 50%;
}
.purpose-top-right {
}
.purpose-bottom {
  margin-top: 10px;
  font-size: 12px;
}
.purpose-bottom-left {
  width: 1px;
}
.purpose-bottom-right {
  color: red;
}
.ellipsis {
  flex-basis: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>