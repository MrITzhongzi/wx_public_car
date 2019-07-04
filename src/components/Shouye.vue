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
      <Input placeholder="请输入手机号" prefix-icon="el-icon-mobile-phone" v-model="searchContent"/>
      <Button type="info" style="background: #49494B;">预约购车</Button>
    </div>

    <Card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>
          <h2 class="my-box-card-title">热门车型</h2>
        </span>
      </div>
      <!-- <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div> -->
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
import { Carousel, CarouselItem, Image, Input, Button, Card } from "element-ui";
import SimpleCard from "@/components/sub_components/SimpleCard";
import ImgCard from "@/components/sub_components/ImgCard.vue";
export default {
  name: "shouye",
  mounted: function(){
    let MyUrl = new URL(window.location.href);
    let urlParams = MyUrl.search;
    let searchParams = new URLSearchParams(urlParams);
    let wxCode = searchParams.get("code");
    alert(JSON.stringify(wxCode));
     
  },
  components: {
    Carousel,
    CarouselItem,
    MyImage: Image,
    Input,
    Button,
    Card,
    SimpleCard,
    ImgCard
  },
  data: function() {
    return {
      carouselSrc: require("../assets/carousel_img.png"),
      advantageImg: require("../assets/price.png"),
      searchContent: ""
    };
  }
};
</script>

<style>
.top-carousel {
}

.shouye-carousel-img  .el-image__inner {
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
