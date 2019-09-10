<template>
  <div class="activity-list">
    <!-- <template v-for="(item, index) in activityImgs">
      <div class="activity-item" :key="index">
        <a href="#/sign">
          <MyImage :src="item" fit="contain"></MyImage>
        </a>
      </div>
    </template> -->
    <div class="activity-item">
      <a @click="getPrize">
        <MyImage :src="Activity4Img" fit="contain"></MyImage>
      </a>
    </div>
    <div class="my-pop-box" v-show="showPop" @click.self="hiddenPop">
      <div
        class="pop-box-content"
        :style="{background:' url(' + PopBgImg + ')  center / 100% 100% no-repeat' }"
      >
        <div class="pop-title">提示</div>
        <div class="pop-content">您的积分余额不足10000,不能兑换该油卡。</div>
        <div class="pop-bottom" @click="hiddenPop">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Image, MessageBox } from "element-ui";
import Activity4Img from "../assets/activity_4.png";
import PopBgImg from "../assets/pop_bg.png";
export default {
  data: function() {
    return {
      activityImgs: [
        require("../assets/activity_1.png")
        // require("../assets/activity_2.png"),
        // require("../assets/activity_3.png")
      ],
      Activity4Img,
      PopBgImg,
      showPop: false
    };
  },
  components: {
    MyImage: Image
  },
  methods: {
    getPrize: function() {
      this.showPop = true;
    },
    hiddenPop: function() {
      this.showPop = false;
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
.my-pop-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.4);
}
.pop-box-content {
  width: 90%;
  /* height: 300px; */
  margin: 100px auto;
  box-sizing: border-box;
  padding: 20px;
}
.pop-title {
  text-align: center;
  color: black;
  font-size: 22px;
}
.pop-content {
  margin: 20px;
}
.pop-bottom {
  width: 200px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: rgb(254, 48, 87);
  color: white;
  border-radius: 20px;
  margin: 20px auto;
}
</style>
