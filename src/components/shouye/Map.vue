<template>
  <div class="map-box">
    <div :style="{width:'100%',height:'100%'}">
      <el-amap
        vid="amapDemo"
        :zoom="zoom"
        :plugin="plugin"
        :center="center"
        class="amap-demo"
      >
        <el-amap-marker vid="marker" :position="center" :label="label"></el-amap-marker>
      </el-amap>
    </div>
  </div>
</template>

<script>
// import { AMapManager } from "vue-amap";
export default {
  name: "amap-page",
  data() {
    return {
      label: {
        content: "测试label",
        offset: [10, 12]
      },
      zoom: 15,
      center: [121.451854, 37.477066],
      
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
