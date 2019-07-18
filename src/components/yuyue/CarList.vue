<template>
  <div class="carlist-box" :style="{height: navHeight + 'px',overflow: 'scroll'}">
    <template v-for='(value, index) in ["A","B","C","D","E","F","G","H","I","G","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]'>
      <CarItemList :key="index" :carItemList="allBrand[value]" v-on:update="getCarSeries" :listName="value"></CarItemList>
    </template>
    <div class="left-nav-box">
      <div class="left-nav-series" >
        <TitleLIst :list="1"></TitleLIst>
      </div>
    </div>
  </div>

</template>

<script>
import axios from "axios";
import CarItemList from "@/components/yuyue/CarItemList";
import TitleLIst from "@/components/sub_components/TitleList";

export default {
  beforeMount: async function() {
    let brandData = await this.initCarBrand();
    let tempArr = [];
    for (let i = 0; i < brandData.length; i++) {
      this.sortData(brandData[i]);
    }
    this.$forceUpdate();
  },
  components: {
    CarItemList,
    TitleLIst
  },
  data: function() {
    return {
      allBrand: {},
      allSeries: []
    };
  },
  methods: {
    async initCarBrand() {
      return (await axios.get("/vehicle/allBrands")).data;
    },
    async getCarSeries(id){
      this.allSeries = (await axios.get("vehicle/allSeries?id=" + id)).data;
      this.$forceUpdate();
    },
    sortData: function(obj) {
      let brandData = this.allBrand;
      if (Object.keys(brandData).indexOf(obj.bfirstletter) == -1) {
        brandData[obj.bfirstletter] = [];
      }
      brandData[obj.bfirstletter].push(obj);
    }
  },
  computed: {
    navHeight: function(){
      return document.body.clientHeight - 50;
    }
  }
};
</script>

<style scoped>
.carlist-box {
  position: relative;
  
}
.left-nav-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: none;
}
.left-nav-series {
  height: 100%;
  position: absolute;
  right: 0;
}
</style>
