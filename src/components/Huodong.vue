<template>
  <div class="activity-list">
    <template v-for="(item, index) in activityImgs">
      <div class="activity-item" :key="index">
        <a href="#/sign">
          <MyImage :src="item" fit="contain"></MyImage>
        </a>
      </div>
    </template>
    <div class="activity-item">
      <a @click="getPrize">
        <MyImage :src="Activity4Img" fit="contain"></MyImage>
      </a>
    </div>
  </div>
</template>

<script>
import { Image, MessageBox } from "element-ui";
import Activity4Img from "../assets/activity_4.png";
export default {
  data: function() {
    return {
      activityImgs: [
        require("../assets/activity_1.png"),
        require("../assets/activity_2.png"),
        require("../assets/activity_3.png")
      ],
      Activity4Img
    };
  },
  components: {
    MyImage: Image
  },
  methods: {
    getPrize: function() {
      MessageBox.alert("恭喜您，兑换成功，工作人员将会在一到三个工作日内与您取得联系。", "提示", {
        confirmButtonText: "确定",
        callback: action => {}
      });
    }
  }
};
</script>

<style scoped>
.activity-list {
  padding: 20px 20px 0;
}
.activity-item {
  margin-bottom: 20px;
}
.activity-img {
}
</style>
