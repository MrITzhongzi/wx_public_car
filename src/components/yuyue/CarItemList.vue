<template>
  <div class="caritemlist-box">
    <div class="caritemlist-title">{{listName}}</div>
    <div class="caritemlist-con">
      <template v-for="(item, index) in carItemList">
        <div class="caritem-con" @click="showSeries"  :key="index">
          <div class="caritem-image-box">
            <MyImage class="caritem-image" :src="item.brandImage"></MyImage>
          </div>
          <div class="carItem-name">{{item.name}}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { Image } from "element-ui";
import TestImage from "../../assets/test_img.png";
export default {
  props: ["carItemList", "listName"],
  components: {
    MyImage: Image
  },
  data: function() {
    return {
      TestImage
    };
  },
  methods: {
    showSeries: function() {
      this.$emit("update", 1)
    }
  }
};
</script>

<style scoped>
.caritemlist-box {
  padding: 10px;
}
.caritemlist-title {
}
.caritemlist-con {
  margin-top: 3px;
}
.caritem-con {
  display: flex;
  align-items: center;
}
.caritem-image-box {
  width: 40px;
}
.caritem-image {
  width: 100%;
}
.carItem-name {
  flex-grow: 1;
  margin-left: 25px;
  padding-bottom: 10px;
}
</style>
