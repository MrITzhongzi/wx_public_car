<template>
  <div class="activity-list">
    <template v-for="(item, index) in activityImgs" >
      <div class="activity-item" :key="index">
        <MyImage :src="item" fit="contain" ></MyImage>
      </div>
    </template>
  </div>
</template>

<script>
import { Image } from "element-ui";
export default {
  data: function() {
    return{
        activityImgs: [require("../assets/activity_1.png"), require("../assets/activity_2.png"), require("../assets/activity_3.png")]
    };
  },
  components: {
    MyImage: Image
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

</style>
