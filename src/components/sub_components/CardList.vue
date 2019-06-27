<template>
  <div class="list-card">
    <div class="card-title">{{titleName}}</div>
    <div class="card-content">
        <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["titleName"],
  data: function(){
      return {
          
      };
  }
};
</script>

<style scoped>
.list-card {
  width: 96%;
  margin-left: 2%;
  background: white;
  border-radius: 6px;
  margin-top: 20px;
}
.card-title {
  background-color: #fd564a;
  width: 110px;
  height: 26px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  margin: 0 auto;
  font-size: 13px;
  text-align: center;
  color: white;
  line-height: 23px;
}
.card-content {
    min-height: 100px;
    max-height: 600px;
    overflow-y: scroll;
    box-sizing: border-box;
    padding: 10px;
}
</style>
