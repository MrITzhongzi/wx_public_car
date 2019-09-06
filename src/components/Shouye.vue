<template>
  <div class="shouye-box">
    <div class="top-carousel">
      <Carousel :autoplay="true" height="150px">
        <CarouselItem v-for="item in 4" :key="item" class="shouye-carousel-img">
          <div><img :src="carouselSrc" :style="{width: '100%'}" alt=""></div>
          <!-- <img :src="carouselSrc" alt=""> -->
        </CarouselItem>
      </Carousel>
    </div>
    <div class="search-box">
      <Input placeholder="请输入手机号" prefix-icon="el-icon-mobile-phone" v-model="searchContent" />
      <Button type="info" @click="subscribeCar" style="background: #49494B;">预约购车</Button>
    </div>

    <a style="padding-left: 20px;" href="/#/signcomponent">
      <Button type="info" style="background: green;">签到</Button>
    </a>
    <!-- <Button type="info" @click="payMoney" style="background: green;">支付</Button> -->
    <!-- <Button type="info" @click="clearlocal" style="background: green;">清理缓存</Button> -->

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
import {
  Carousel,
  CarouselItem,
  Image,
  Input,
  Button,
  Card,
  Message
} from "element-ui";
import SimpleCard from "@/components/sub_components/SimpleCard";
import ImgCard from "@/components/sub_components/ImgCard.vue";
import HotCarItem from "@/components/shouye/HotCarItem";
import axios from "axios";
import wx from "weixin-js-sdk";

import { serverlUrl } from "@/components/config/GlobalParams";
export default {
  name: "shouye",
  mounted: function() {
    var loginData = localStorage.getItem("yhqc");

    this.getReferrer("userid");
    if (loginData) {
      this.initHotCar();
    } else {
      this.getCode();
      if (this.code) {
        this.getReferrer("state");
        this.getUserToken();
      } else {
        //去微信服务器获取code
        this.getBaseCodeToWx();
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
      userId: 0 // 推荐人id
    };
  },
  methods: {
    getBaseCodeToWx: function() {
      let appID = "wx02548bbef1a53020";
      // let backUrl = encodeURIComponent(officialUrl);
      let backUrl = encodeURIComponent(serverlUrl);
      console.log(backUrl);
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appID}&redirect_uri=${backUrl}&response_type=code&scope=snsapi_base&state=${this.userId}&connect_redirect=1#wechat_redirect`;
    },
    getUserinfoCodeToWx: function() {
      let appID = "wx02548bbef1a53020";
      // let backUrl = encodeURIComponent(officialUrl);
      let backUrl = encodeURIComponent(serverlUrl);
      console.log(backUrl);
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appID}&redirect_uri=${backUrl}&response_type=code&scope=snsapi_userinfo&state=${this.userId}&connect_redirect=1#wechat_redirect`;
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
      this.code = code ? code : "";
    },
    getUserToken: async function() {
      const ctx = this;
      let responseData = (await axios.get("/weixin/getTokenByCode", {
        params: {
          code: this.code,
          state: this.userId
        }
      })).data;

      if (responseData.code == 0) {
        ctx.getUserInfo();

        return;
      }
      if (responseData.code == -1) {
        // 用户信息不存在，重新获取 code
        ctx.getUserinfoCodeToWx();

        return;
      }
      if (responseData.code == 2) {
        Message({
          message: "拉去用户信息失败，请重试。",
          type: "error"
        });
        return;
      }
    },
    getUserInfo: async function() {
      const ctx = this;
      await axios.get("/index/yinghaoindex").then(function(response) {
        localStorage.setItem("yhqc", JSON.stringify(response.data));
        ctx.initHotCar();
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
      const loginData = JSON.parse(localStorage.getItem("yhqc"));

      wx.checkJsApi({
        jsApiList: ["updateAppMessageShareData"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: function(res) {
          // 以键值对的形式返回，可用的api值true，不可用为false
          // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
        }
      });

      wx.ready(function() {
        //自定义“分享给朋友”及“分享到QQ”按钮的分享内容
        wx.updateAppMessageShareData({
          title: "这是标题",
          desc: "这是描述",
          link: serverlUrl + `?userid=${loginData.userinfo.id}`,
          imgUrl: serverlUrl + "/logo.jpeg", // 分享图标
          success: function() {
            // 设置成功
          }
        });
        //自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
        wx.updateTimelineShareData({
          title: "这是标题",
          link: serverlUrl + `?userid=${loginData.userinfo.id}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: serverlUrl + "/logo.jpeg", // 分享图标
          success: function() {
            // 设置成功
          }
        });
      });
    },
    /**
     * 获取userId
     */
    getReferrer: function(keyName) {
      let url = window.location.href.split("#")[0];
      let myUrl = new URL(url);
      let searchParams = new URLSearchParams(myUrl.search);
      let userid = searchParams.get(keyName);
      console.log(userid);
      this.userId = userid ? userid : 0;
    },
    clearlocal: function() {
      localStorage.clear();
    },

    // 微信支付逻辑
    payMoney: function() {
      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
          document.addEventListener(
            "WeixinJSBridgeReady",
            onBridgeReady,
            false
          );
        } else if (document.attachEvent) {
          document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
          document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
        }
      } else {
        this.onBridgeReady();
      }
    },
    onBridgeReady: function() {
      let localData = JSON.parse(localStorage.getItem("yhqc"));
     
      let num = Math.random().toFixed(3) * 1000;
      axios
        .get("/wx/pay/doPay", {
          params: {
            openid: localData.userinfo.openId,
            orderid: num
          }
        })
        .then(function(response) {
          console.log(response);
          const payData = response.data;
          
          WeixinJSBridge.invoke(
            "getBrandWCPayRequest",
            {
              appId: payData.dataMap.appId, //公众号名称，由商户传入
              timeStamp: payData.dataMap.timeStamp, //时间戳，自1970年以来的秒数
              nonceStr: payData.dataMap.nonceStr, //随机串
              package: payData.dataMap.package,
              signType: payData.dataMap.signType, //微信签名方式：
              paySign: payData.dataMap.paySign //微信签名
            },
            function(res) {
              if (res.err_msg == "get_brand_wcpay_request:ok") {
                // 使用以上方式判断前端返回,微信团队郑重提示：
                //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                
              }
            }
          );
        });
    },
    // 预约车型
    subscribeCar: async function() {
      const localData = JSON.parse(localStorage.getItem("yhqc"));
      console.log(localData);
      if (!localData) {
        Message({
          message: "请登录。",
          type: "error"
        });
        return;
      }
      if (!this.searchContent) {
        Message({
          message: "请填写手机号。",
          type: "error"
        });
        return;
      }
      if (!/^1[3456789]\d{9}$/.test(this.searchContent)) {
        Message({
          message: "手机号填写有误，请重写填写。",
          type: "error"
        });
        return;
      }

      const userId = localData.userinfo.id;
      const name = localData.userinfo.userName;
      const resData = await axios.get("/vehicle/saveVehicle", {
        params: { mobile: this.searchContent, name: name, userid: userId }
      });
      if (resData.data.code == 0) {
        Message({
          message: "预约成功。工作人员将在一到三个工作日内与您取得联系。",
          type: "success"
        });
      } else {
        Message({
          message: "预约失败，请稍后重试。",
          type: "error"
        });
      }
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
