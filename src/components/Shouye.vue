<template>
  <div class="shouye-box">
    <div class="top-carousel">
      <Carousel :autoplay="true" height="200px">
        <CarouselItem v-for="item in 4" :key="item" class="shouye-carousel-img">
          <MyImage :src="carouselSrc" fit="cover"></MyImage>
          <!-- <img :src="carouselSrc" alt=""> -->
        </CarouselItem>
      </Carousel>
    </div>
    <div class="search-box">
      <Input placeholder="请输入手机号" prefix-icon="el-icon-mobile-phone" v-model="searchContent" />
      <Button type="info" style="background: #49494B;">预约购车</Button>
    </div>

    <a style="padding-left: 20px;" href="/#/signcomponent">
      <Button type="info" style="background: green;">签到</Button>
    </a>

    <Button type="info" style="background: green;">分享</Button>

    <Card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>
          <h2 class="my-box-card-title">热门车型</h2>
        </span>
      </div>
      <div class="text item">
        <template v-for="(item, index) in hotCar">
          <HotCarItem :key="index" :carItem="item"></HotCarItem>
        </template>
      </div>
    </Card>

    <Card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>
          <h2 class="my-box-card-title">附近门店</h2>
        </span>
      </div>
      <div class="text item">
        <SimpleCard></SimpleCard>
      </div>
    </Card>

    <div class="our-advantage">
      <ImgCard></ImgCard>
    </div>
  </div>
</template>

<script>
import { Carousel, CarouselItem, Image, Input, Button, Card, Message } from "element-ui";
import SimpleCard from "@/components/sub_components/SimpleCard";
import ImgCard from "@/components/sub_components/ImgCard.vue";
import HotCarItem from "@/components/shouye/HotCarItem";
import axios from "axios";
import wx from "weixin-js-sdk";

import { testUrl, officialUrl } from "@/components/config/GlobalParams";
export default {
  name: "shouye",
  mounted: async function() {
    var loginData = localStorage.getItem("yhqc");
    console.log(JSON.parse(loginData));
    this.getReferrer();
    if (loginData) {
      this.initHotCar();
    } else {
      this.getCode();
      if (this.code) {
        await this.getUserInfo();
        this.initHotCar();
      } else {
        //去微信服务器获取code
        this.loginAutho();
      }
    }

    this.shareuser();
  },
  components: {
    Carousel,
    CarouselItem,
    MyImage: Image,
    Input,
    Button,
    Card,
    SimpleCard,
    ImgCard,
    HotCarItem
  },
  data: function() {
    return {
      carouselSrc: require("../assets/carousel_img.png"),
      advantageImg: require("../assets/price.png"),
      searchContent: "",
      state: "", // 微信回调带的状态码
      code: "",
      hotCar: [], // 热门车型
      userId: "" // 推荐热id
    };
  },
  methods: {
    loginAutho: function() {
      let appID = "wx02548bbef1a53020";
      // let backUrl = encodeURIComponent(officialUrl);
      let backUrl = encodeURIComponent(testUrl);
      console.log(backUrl);
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appID}&redirect_uri=${backUrl}&response_type=code&scope=snsapi_base&state=${this.userId ? this.userId : "state"}&connect_redirect=1#wechat_redirect`;
    },
    initHotCar: function() {
      let userData = JSON.parse(localStorage.getItem("yhqc"));
      this.hotCar = userData.cars;
      this.$forceUpdate();
    },
    getCode: function() {
      let url = window.location.href.split("#")[0];
      let myUrl = new URL(url);
      let searchParams = new URLSearchParams(myUrl.search);
      let code = searchParams.get("code");
      this.code = code;
    },
    getUserInfo: async function() {
      const ctx = this;
      await axios
        .get("/weixin/getTokenByCode", {
          params: {
            code: this.code,
            state: this.userId
          }
        })
        .then(function(response) {
          ctx.hotCar = response.data.cars;
          localStorage.setItem("yhqc", JSON.stringify(response.data));
        });
    },
    shareuser: function() {
     
      if (!localStorage.getItem("yhqc")) {
        Message({
          message: "请登录",
          type: "error"
        });
        return;
      }

      axios
        .get("/user/getWxJSConfig", {
          params: { url: window.location.href.split("#")[0] }
        })
        .then(function(response) {
          let resData = response.data;
          console.log("resData", resData);

          wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: resData.appId, // 必填，公众号的唯一标识
            timestamp: resData.timestamp, // 必填，生成签名的时间戳
            nonceStr: resData.nonceStr, // 必填，生成签名的随机串
            signature: resData.signature, // 必填，签名
            jsApiList: ["updateAppMessageShareData"] // 必填，需要使用的JS接口列表
          });
        });

      wx.checkJsApi({
        jsApiList: ["updateAppMessageShareData"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: function(res) {
          // 以键值对的形式返回，可用的api值true，不可用为false
          // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
          console.log("权限", res);
        }
      });
      
      wx.ready(function() {
        //自定义“分享给朋友”及“分享到QQ”按钮的分享内容
        wx.updateAppMessageShareData({
          title: "这是标题",
          desc: "这是描述",
          link: testUrl + `?userid=${this.userId}`,
          imgUrl: "http://xiaopeng.natapp1.cc/logo.jpeg", // 分享图标
          success: function() {
            // 设置成功
            alert("分享成功");
          }
        });
      });
    },
    getReferrer: function(){
      let url = window.location.href.split("#")[0];
      let myUrl = new URL(url);
      let searchParams = new URLSearchParams(myUrl.search);
      let userid = searchParams.get("userid");
      console.log(userid)
      this.userId = userid ? userid : ""
    }
  }
};
</script>

<style>
.top-carousel {
}

.shouye-carousel-img .el-image__inner {
  height: 200px !important;
}

.search-box {
  width: 90%;
  display: flex;
  position: relative;
  top: -20px;
  left: 5%;
  z-index: 5;
}

.el-card__body {
  padding: 10px;
  padding-left: 20px;
}
.box-card .el-card__header {
  padding-top: 0;
  padding-bottom: 0;
  border: none;
}
.my-box-card-title {
  margin: 0;
  font-size: 18px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
  border: none;
  box-sizing: border-box;
  margin-top: 20px;
}
.our-advantage {
  margin-top: 50px;
}
</style>
