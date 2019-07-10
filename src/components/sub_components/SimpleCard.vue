<template>
  <div class="lhw-simple-card">
    <a class="left-con" href="#/map">
      <div class="con-detail">山东烟台莱山区.体验店</div>
      <div class="con-desc">山东烟台烟台市莱山区万光小区18号楼</div>
    </a>
    <div class="right-icon">
      <i class="el-icon-arrow-right"></i>
    </div>
  </div>
</template>

<script>
export default {
    
};
</script>

<style scoped>
.lhw-simple-card {
  display: flex;
}
.left-con {
  color: black;
  text-decoration: none;
  flex-grow: 1;
}
.con-detail {
  font-size: 13px;
  color: #333;
}
.con-desc {
  font-size: 12px;
  color: #787878;
  margin-top: 10px;
}
.right-icon {
}
.right-icon > i {
  font-size: 22px;
  margin-top: 12px;
}
</style>
