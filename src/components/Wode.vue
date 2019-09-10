<template>
  <div class="wode-box">
    <div class="top-box-bg" :style="{'background': 'url('+ WodeImgBg +')center/ cover no-repeat'}"></div>
    <div class="wode-content-box">
      <div class="login-box">
        <template v-if="isLogin">
          <div class="username">{{userInfo.nickName}}</div>
          <div class="login-header">
            <MyImage style="border-radius: 50%;" :src="userInfo.headImage"></MyImage>
          </div>
        </template>
        <template v-else>
          <div class="username">未登录</div>
          <div class="login-header">
            <i class="el-icon-user-solid"></i>
          </div>
        </template>
      </div>

      <div class="person-infos">
        <a class="person-info-item" href="#/scoredetail">
          <div class="my-score">{{isLogin ? myScore : 0}}</div>
          <div class="person-info-desc">我的积分</div>
        </a>
        <div class="person-info-item">
          <div class="person-info-img">
            <my-image :src="personInfoImages[0]" class="person-info-image-con"></my-image>
          </div>
          <div class="person-info-desc">我的订单</div>
        </div>
      </div>

      <div class="service-list">
        <a class="service-item" href="#/referrer">
          <div class="ser-item-left">
            <MyImage :src="serviceImages[2]" class="service-item-image"></MyImage>
            <div class="ser-item-desc">我的推荐人</div>
          </div>
          <div class="ser-item-right">
            <!-- <div class="ser-item-right-desc">周一至周五 9:00~18:00</div> -->
            <div class="ser-item-right-icon">
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
        </a>
        <a class="service-item" href="#/purposecar">
          <div class="ser-item-left">
            <MyImage :src="serviceImages[1]" class="service-item-image"></MyImage>
            <div class="ser-item-desc">有意车型</div>
          </div>
          <div class="ser-item-right">
            <!-- <div class="ser-item-right-desc">周一至周五 9:00~18:00</div> -->
            <div class="ser-item-right-icon">
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
        </a>
        <a class="service-item" href="tel:17616231181">
          <div class="ser-item-left">
            <MyImage :src="serviceImages[0]" class="service-item-image"></MyImage>
            <div class="ser-item-desc">联系客服</div>
          </div>
          <div class="ser-item-right">
            <div class="ser-item-right-desc">周一至周五 9:00~18:00</div>
            <div class="ser-item-right-icon">
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
        </a>
      </div>
      <div class="our-advantage">
        <ImgCard></ImgCard>
      </div>
    </div>
  </div>
</template>

<script>
import { Image } from "element-ui";
import axios from "axios";
import WodeImgBg from "../assets/banner_bg_v2.png";
import ImgCard from "@/components/sub_components/ImgCard.vue";
export default {
  components: {
    MyImage: Image,
    ImgCard
  },
  mounted: function() {
    let loginData = JSON.parse(localStorage.getItem("yhqc"));
    if (loginData) {
      let userInfo = loginData.userinfo;
      this.userInfo = userInfo;
      this.isLogin = true;
      this.getScore();
    } else {
      this.isLogin = false;
    }
  },
  data: function() {
    return {
      personInfoImages: [
        // require("../assets/my_option.png"),
        require("../assets/my_order.png")
      ],
      serviceImages: [
        require("../assets/service.png"),
        require("../assets/share.png"),
        require("../assets/safety.png")
      ],
      WodeImgBg,
      isLogin: false,
      userInfo: {},
      myScore: 0
    };
  },
  methods: {
    getScore: async function() {
      const resData = await axios.get("/integral/userIntegral", {
        params: { userId: this.userInfo.id }
      });
      console.log(resData);
      this.myScore = resData.data.data;
    }
  }
};
</script>

<style scoped>
.wode-box {
}

.top-box-bg {
  height: 200px;
}

.wode-content-box {
  width: 90%;
  position: relative;
  left: 5%;
  top: -100px;
  background: white;
  box-shadow: 1px 1px 1px #ccc;
  box-sizing: border-box;
  padding: 10px 10px 30px 10px;
}
.login-box {
  display: flex;
}
.username {
  flex-grow: 1;
  font-weight: bold;
  font-size: 20px;
  height: 50px;
  line-height: 50px;
}
.login-header {
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 30px;
  border-radius: 50%;
  background: #ececec;
  color: white;
}
.person-infos {
  display: flex;
  margin-top: 25px;
}
.person-info-item {
  flex-grow: 1;
  text-align: center;
  color: black;
  text-decoration: none;
}
.person-info-img {
  height: 33px;
}
.my-score {
  height: 33px;
  font-size: 30px;
  font-weight: 700;
  margin-right: 5px;
}

.person-info-image-con {
  width: 25px;
}
.person-info-desc {
  margin-top: 10px;
  font-size: 13px;
}

.service-list {
}
.service-item {
  display: flex;
  align-items: center;
  margin-top: 30px;
  text-decoration: none;
  color: black;
}
.ser-item-left {
  display: flex;
  flex-grow: 1;
  font-size: 13px;
  align-items: center;
}
.service-item-image {
  width: 20px;
}
.ser-item-desc {
  margin-left: 10px;
}
.ser-item-right {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #adadad;
}
.ser-item-right-desc {
}
.ser-item-right-icon {
  font-size: 15px;
}
.our-advantage {
  margin-top: 50px;
}
</style>
