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

    <Card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>
          <h2 class="my-box-card-title">热门车型</h2>
        </span>
      </div>
      <div class="text item">
        <template v-for="(item, index) in hotCar" >
          <HotCarItem :key="index" :carItem="item"></HotCarItem>
        </template>
      </div>
    </Card>

    <Card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>
          <h2 class="my-box-card-title">附近门店{{code}}</h2>
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
import { Carousel, CarouselItem, Image, Input, Button, Card } from "element-ui";
import SimpleCard from "@/components/sub_components/SimpleCard";
import ImgCard from "@/components/sub_components/ImgCard.vue";
import HotCarItem from "@/components/shouye/HotCarItem";

export default {
  name: "shouye",
  mounted: async function() {
    var loginData = localStorage.getItem("yhqc");
    // this.login();
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
    };
  },
  methods: {
    loginAutho: function() {
      let appID = "wx02548bbef1a53020";
      let backUrl = encodeURIComponent("http://xiaopeng.natapp1.cc/");
      console.log(backUrl);
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appID}&redirect_uri=${backUrl}&response_type=code&scope=snsapi_base&state=STATE&connect_redirect=1#wechat_redirect`;
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
            code: this.code
          }
        })
        .then(function(response) {
          ctx.hotCar = response.data.cars;
          localStorage.setItem("yhqc", JSON.stringify(response.data));
          
        });
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
