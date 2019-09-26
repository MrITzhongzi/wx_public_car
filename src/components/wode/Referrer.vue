<template>
  <div class="referrer-box">
    <div class="referrer-list">
      <div class="referrer-item" v-for="(item, index) in userList" :key="index">
        <MyImage :src="item.headImage"  style="width: 80px;border-radius: 50%;"></MyImage>
        <div class="referrer-item-name">{{item.userName}}</div>
      </div>
      
    </div>
  </div>
</template>
<script>
import { Image } from "element-ui";
import axios from "axios";

export default {
  data: function() {
    return {
        userList: []
    };
  },
  components: { MyImage: Image },
  mounted: function() {
      this.getUser();
  },
  methods: {
    getUser: async function() {
      const localData = JSON.parse(localStorage.getItem("yhqc"));
      const userId = localData.userinfo.id;
        let resData = await axios.get("/user/getUserSpread", {params: {userId: userId}})
        if(resData.data.code == "0") {
            this.userList = resData.data.data;
        }
    }
  }
};
</script>
<style >
.referrer-box {
}
.referrer-list {
  box-sizing: border-box;

  display: flex;
  flex-wrap: wrap;
  
}
.referrer-item {
  flex-basis: 100px;
  max-width: 30%;
  min-width: 30%;
  height: 150px;
  box-shadow: 1px 1px 2px #888888;
  text-align: center;
  box-sizing: border-box;
  padding-top: 10px;
  margin: 1.5%;
}
.referrer-item-name {
    margin-top: 20px;
}
</style>