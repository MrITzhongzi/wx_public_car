<template>
  <div class="map-box">
    <div :style="{width:'100%',height:'100%'}">
      <el-amap vid="amapDemo" :zoom="zoom" :plugin="plugin" :center="center" class="amap-demo">
        <el-amap-marker vid="marker" :position="center" ></el-amap-marker>
      </el-amap>
    </div>
  </div>
</template>

<script>
import { AMap } from "vue-amap";

export default {
  name: "amap-page",
  data() {
    return {
     
      zoom: 15,
      center: [121.326335, 37.526739],
      plugin: [
        "ToolBar",
        {
          pName: "MapType",
          defaultType: 0,
          events: {
            init(o) {
              console.log(o);
            }
          }
        }
      ]
    };
  },
  methods: {}
};
</script>

<style>
.map-box {
  height: 1px;
}
</style>
