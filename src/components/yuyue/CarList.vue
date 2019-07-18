<template>
  <div class="carlist-box">
    <template v-for='(value, index) in ["A","B","C","D","E","F","G","H","I","G","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]'>
      <CarItemList :key="index" :carItemList="allBrand[value]" :listName="value"></CarItemList>
    </template>
  </div>
  
</template>

<script>
import axios from "axios";
import CarItemList from "@/components/yuyue/CarItemList";

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
    CarItemList
  },
  data: function() {
    return {
      allBrand: {}
    };
  },
  methods: {
    async initCarBrand() {
      return (await axios.get("/vehicle/allBrands")).data;
    },
    sortData: function(obj) {
      let brandData = this.allBrand;
      if (Object.keys(brandData).indexOf(obj.bfirstletter) == -1) {
        brandData[obj.bfirstletter] = [];
      }
      brandData[obj.bfirstletter].push(obj);
    }
  }
};
</script>

<style>
</style>
