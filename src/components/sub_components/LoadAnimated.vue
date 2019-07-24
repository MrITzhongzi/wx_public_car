<template>
  <div class="load-animated-box">
    <div class="load-animated-icon">
      <i class="el-icon-loading"></i>
    </div>
    <div class="load-animated-text">正在加载……</div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.load-animated-box {
    width: 120px;
    height: 120px;
    border-radius: 10px;
    background: rgba(0,0,0,0.6);
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -60px;
    margin-top: -60px;
    box-sizing: border-box;
    padding-top: 10px;
}
.load-animated-icon {
    height: 80px;
    text-align: center;
    font-size: 50px;
    color: white;
}
.load-animated-text {
    font-size: 14px;
    color: white;
    text-align: center;
}
</style>
