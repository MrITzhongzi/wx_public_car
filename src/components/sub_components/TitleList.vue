<template>
  <div class="title-list-box">
    <div class="list-title">
      <div class="title-con">{{listName}}</div>
      <div class="go-back" @click="back">返回</div>
    </div>
    <div class="list-con">
      <template v-for="(item, index) in list">
        <div class="list-item" :key="index" @click="chooseItem(item)">
          <div class="item-con">{{item[name]}}</div>
          <div class="item-icon">
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: ["list", "listName", "name"],
  methods: {
    chooseItem: function(item) {
      console.log(item);
      this.$emit("updateView", item);
    },
    back: function(){
        this.$emit("back");
    }
  }
};
</script>

<style scoped>
.title-list-box {
  background: white;
  width: 300px;
  height: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
}
.list-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}
.title-con {
  font-weight: bold;
}
.go-back {
}
.list-con {
  margin-top: 20px;
}
.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  font-size: 13px;
}
.item-con {
}
.item-icon {
}
</style>
