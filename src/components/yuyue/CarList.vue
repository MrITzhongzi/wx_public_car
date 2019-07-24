<template>
  <div
    class="carlist-box"
    :style="{height: navHeight + 'px',overflow: (leftNavSeriesShow&&leftSecondNavShow) ? 'scroll' : 'hidden'}"
  >
    <template
      v-for="(value, index) in ['A','B','C','D','E','F','G','H','I','G','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']"
    >
      <CarItemList
        :key="index"
        :carItemList="allBrand[value]"
        v-on:update="getCarSeries"
        :listName="value"
      ></CarItemList>
    </template>

    <div
      class="left-nav-box"
      :style="{display: leftNavSeriesShow ? 'block':'none'}"
      @click.self="hideModal"
    >
      <div :class="['left-nav-series','animated', 'fadeInRightBig']">
        <TitleLIst
          :list="allSeries"
          :listName="brandName"
          name="seriesName"
          v-on:updateView="getDataToUpdateView"
          v-on:back="clearData"
        ></TitleLIst>
      </div>
    </div>

    <div
      class="left-second-nav-box"
      :style="{display: leftSecondNavShow ? 'block':'none'}"
      @click.self="hideModal"
    >
      <div :class="['left-nav-modal','animated', 'fadeInRightBig']">
        <TitleLIst
          :list="allModal"
          :listName="modalName"
          name="modelName"
          v-on:updateView="getDataToUpdateView"
          v-on:back="clearData"
        ></TitleLIst>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CarItemList from "@/components/yuyue/CarItemList";
import TitleLIst from "@/components/sub_components/TitleList";
import animate from "animate.css";

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
      allSeries: [],
      brandName: "",
      leftNavSeriesShow: false,
      allModal: [],
      modalName: "",
      leftSecondNavShow: false,
      choosedCar: {
        nameList: [],
        idList: []
      }
    };
  },
  methods: {
    async initCarBrand() {
      return (await axios.get("/vehicle/allBrands")).data;
    },
    async getCarSeries(item) {
      this.allSeries = (await axios.get(
        "vehicle/allSeries?id=" + item.brandid
      )).data;
      this.brandName = item.name;
      this.leftNavSeriesShow = true;

      this.choosedCar.nameList.push(item.name);
      this.choosedCar.idList.push(item.brandid);

      this.$forceUpdate();
    },
    async getCarModal(item) {
      this.allModal = (await axios.get(
        "/vehicle/allModels?id=" + item.seriesId
      )).data;

      this.modalName = item.seriesName;
      this.leftNavSeriesShow = false;
      this.leftSecondNavShow = true;

      this.choosedCar.nameList.push(item.seriesName);
      this.choosedCar.idList.push(item.seriesId);

      this.$forceUpdate();
    },
    async getDataToUpdateView(item) {
      if (this.leftSecondNavShow) {
        this.choosedCar.nameList.push(item.modelName);
        this.choosedCar.idList.push(item.modelId);

        this.$router.push({ name: "subscribe", params: this.choosedCar });
      } else {
        await this.getCarModal(item);
      }
    },
    clearData: function() {
      this.allModal = [];
      this.allSeries = [];
      this.choosedCar = { nameList: [], idList: [] };
    },
    sortData: function(obj) {
      let brandData = this.allBrand;
      if (Object.keys(brandData).indexOf(obj.bfirstletter) == -1) {
        brandData[obj.bfirstletter] = [];
      }
      brandData[obj.bfirstletter].push(obj);
    },
    hideModal: function() {
      this.leftNavSeriesShow = false;
      this.leftSecondNavShow = false;
      this.clearData();
    }
  },
  computed: {
    navHeight: function() {
      return document.body.clientHeight - 50;
    }
  }
};
</script>

<style scoped>
.carlist-box {
  position: relative;
}
.left-nav-box,
.left-second-nav-box {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
}
.left-nav-series,
.left-nav-modal {
  height: 100%;
  position: absolute;
  right: 0px;
  overflow: scroll;
  background: white;
}
</style>
