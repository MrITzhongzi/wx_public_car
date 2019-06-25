<template>
  <div class="root">
    <div class="root-content">
      <router-view/>
    </div>
    <div class="root-bottom">
      <a href="#/" class="root-bottom-item">
        <div class="root-bottom-top-img">
          <MyImage :src="bottomImages[ this.$route.path == '/' ? 1 : 0]" class="root-bottom-top-img-con"></MyImage>
        </div>
        <div :class="['root-bottom-desc', this.$route.path == '/' ? 'blue-color' : '']">首页</div>
      </a>
      <a href="#/subscribe" class="root-bottom-item">
        <div class="root-bottom-top-img">
          <MyImage :src="bottomImages[ this.$route.path == '/subscribe' ? 3 : 2]" class="root-bottom-top-img-con"></MyImage>
        </div>
        <div :class="['root-bottom-desc', this.$route.path == '/subscribe' ? 'blue-color' : '']">预约</div>
      </a>
      <a href="#/activity" class="root-bottom-item">
        <div class="root-bottom-top-img">
          <MyImage :src="bottomImages[ this.$route.path == '/activity' ? 5 : 4]" class="root-bottom-top-img-con"></MyImage>
        </div>
        <div :class="['root-bottom-desc', this.$route.path == '/activity' ? 'blue-color' : '']">活动</div>
      </a>
      <a href="#/my" class="root-bottom-item">
        <div class="root-bottom-top-img">
          <MyImage :src="bottomImages[ this.$route.path == '/my' ? 7 : 6]" class="root-bottom-top-img-con"></MyImage>
        </div>
        <div :class="['root-bottom-desc', this.$route.path == '/my' ? 'blue-color' : '']">我的</div>
      </a>
    </div>
  </div>
</template>

<script>
import { Image } from "element-ui";

export default {
  name: "app",
  components: {
    MyImage: Image
  },
  data() {
    return {
      bottomImages: [
        require("./assets/index_bottom_icon.png"),
        require("./assets/index_bottom_icon_activity.png"),
        require("./assets/subscribe_bottom_icon.png"),
        require("./assets/subscribe_bottom_icon_activity.png"),
        require("./assets/present_bottom_icon.png"),
        require("./assets/present_bottom_icon_activity.png"),
        require("./assets/user_bottom_icon.png"),
        require("./assets/user_bottom_icon_activity.png"), 
      ]
    };
  }
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
.root {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.root-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.root-content > div {
  flex-grow: 1;
}
.root-bottom {
  display: flex;
  height: 50px;
  overflow: hidden;
}
.root-bottom-item {
  flex-grow: 1;
  color: #797979;
  text-decoration: none;
  text-align: center;
  font-size: 13px;
}
.root-bottom-top-img-con {
  width: 25px;
}
.blue-color {
  color: #00bfbc;
}
</style>
