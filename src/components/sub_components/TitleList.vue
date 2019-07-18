<template>
  <div class="title-list-box">
      <div class="list-title">
          <div class="title-con">名字</div>
          <div class="go-back">返回</div>
      </div>
      <div class="list-con">
          <template v-for="(item, index) in list">
              <div class="list-item" :key="index">
                  <div class="item-com">名字</div>
                  <div>》</div>
              </div>
          </template>
      </div>
  </div>
</template>

<script>
export default {
    props: ["list"]
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

}
.title-con {

}
.go-back {

}
.list-con {

}
</style>
