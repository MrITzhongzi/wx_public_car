<template>
  <div class="top-carousel">
    <Carousel>
      <CarouselItem v-for="item in 4" :key="item">
        <MyImage :src="carouselSrc"></MyImage>
        <!-- <img :src="carouselSrc" alt=""> -->
      </CarouselItem>
    </Carousel>

  </div>
</template>

<script>
import { Carousel, CarouselItem, Image } from "element-ui";

export default {
  name: "shouye",
  components: {
    Carousel,
    CarouselItem,
    MyImage: Image
  },
  data: function() {
    return {
      carouselSrc: require('../assets/carousel_img.png'),
      
    };
  }
};
</script>

<style>
.top-carousel {
}
</style>
