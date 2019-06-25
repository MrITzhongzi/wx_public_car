<template>
  <div class="advantage-list">
    <template v-for="(item, index)  in advantageData" >
      <div class="advantage-item" :key="index">
        <div class="ad-item-top-img">
          <img :src="item.advantageImg" alt>
        </div>
        <div class="ad-item-theme">
          <h2>{{item.advantageTheme}}</h2>
        </div>
        <div class="ad-item-desc">
            
          <div v-for="(subItem, subIndex) in item.advantageDesc" :key="subIndex">{{subItem}}</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      advantageData: [
        {
          advantageImg: require("../../assets/speed_get.png"),
          advantageTheme: "急速提车",
          advantageDesc: ["货比全国", "专业物流"]
        },
        {
          advantageImg: require("../../assets/price.png"),
          advantageTheme: "价格透明",
          advantageDesc: ["明白消费", "省钱到位"]
        },
        {
          advantageImg: require("../../assets/invoice.png"),
          advantageTheme: "正规发票",
          advantageDesc: ["厂家直供", "安享售后"]
        }
      ]
    };
  }
};
</script>

<style>
.advantage-list {
  display: flex;
}
.advantage-item {
  flex-grow: 1;
}
.ad-item-top-img {
  text-align: center;
}
.ad-item-top-img img {
  width: 20%;
}
.ad-item-theme {
}
.ad-item-theme h2 {
  font-weight: normal;
  font-size: 14px;
  text-align: center;
  margin: 5px;
}
.ad-item-desc {
  font-size: 12px;
  color: #8d8f8a;
  text-align: center;
}
</style>
