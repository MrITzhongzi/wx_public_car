<template>
  <div class="hot-car-item-box">
    <div class="hot-car-left">
      <MyImage
        class="caritem-image"
        src="http://thirdwx.qlogo.cn/mmopen/vi_32/hBbNOLicWdz4LNDHtqDXjRZdGNxNW0Uia58G8ZnOafO3WbQjTqWMDNPW31m3HWlYGlHVfBiaV9zj3zsSk9icyZpSog/132"
      ></MyImage>
    </div>
    <div class="hot-car-middle">
      <div class="car-name">{{carItem.modelName}}</div>
      <div class="car-price">{{carItem.minPrice}}-{{carItem.maxPrice}}</div>
    </div>
    <div class="hot-car-right">
      <i class="el-icon-arrow-right"></i>
    </div>
  </div>
</template>

<script>
import { Image } from "element-ui";

export default {
  components: {
    MyImage: Image
  },
  props: ["carItem"],
  data: function() {
    return {};
  }
};
</script>

<style scoped>
.hot-car-item-box {
  margin-top: 15px;
  display: flex;
}
.hot-car-left {
  flex-basis: 50px;
}

.caritem-image {
  width: 100%;
}
.hot-car-middle {
  flex-grow: 1;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.car-name {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 230px;
}
.car-price {
  font-size: 13px;
  color: #1ab5b1;
}
.hot-car-right {
    display: flex;
    align-items: center;
    font-size: 22px;
}
</style>
