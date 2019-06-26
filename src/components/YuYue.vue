<template>
  <div class="yuyue-box" style="height: 100%;">
    <div class="yuyue-top" :style="{'background': 'url('+ YuyueImgBg +')center/ cover no-repeat'}">
      <div class="yueyue-title">
        <p>购车就选宜买车</p>
        <p>7天无理由退订</p>
      </div>
    </div>
    <div class="reister-box">
      <Form ref="form" :model="form" label-width="80px">
        <FormItem label="姓名">
          <Input v-model="form.name" placeholder="请填写姓名"/>
        </FormItem>
        <FormItem label="手机号码">
          <Input v-model="form.phone" placeholder="请填写手机号码"/>
        </FormItem>
        <FormItem label="车辆型号">
          <Select v-model="form.type" placeholder="请选择车辆型号">
            <Option label="区域一" value="shanghai"></Option>
            <Option label="区域二" value="beijing"></Option>
          </Select>
        </FormItem>
        <FormItem label="车辆型号">
          <Cascader
            v-model="value"
            :options="carBeandList"
            @change="handleChange"
            class="car-brand-list"
          ></Cascader>
        </FormItem>

        <Button type="info" @click="onSubmit" :style="{width: '100%', background: '#49494b'}">立即预约</Button>
      </Form>
    </div>
  </div>
</template>

<script>
// banner_bg_v2.png
import {
  Form,
  FormItem,
  Input,
  Button,
  Select,
  Option,
  Cascader
} from "element-ui";
import axios from "axios";
import YuyueImgBg from "../assets/banner_bg_v2.png";
export default {
  mounted() {
    this.initCarBrand();
  },
  data: function() {
    return {
      form: {
        name: "",
        phone: "",
        type: ""
      },
      YuyueImgBg,
      value: [],
      carBeandList: [], //车辆品牌列表
      carSeriesList: [], // 车辆某个品牌的系列
      carModelList: [] //车辆某个系列的某个型号
    };
  },
  components: {
    Form,
    FormItem,
    Input,
    Button,
    Select,
    Option,
    Cascader
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleChange(value) {
      console.log(value);
    },
    initCarBrand() {
      const ctx = this;
      axios
        .get("/vehicle/allBrands")
        .then(function(response) {
          let carBrandData = response.data;
          console.log(carBrandData);

          for (let i = 0; i < carBrandData.length; i++) {
            let brandTemp = {};

            brandTemp.value = carBrandData[i].brandid;
            brandTemp.label = carBrandData[i].name;
            brandTemp.children = [];

            ctx.$data.carBeandList.push(brandTemp);
          }
        })
        .catch(function(error) {
          console.log(error);
        })
        .then(function() {
          // always executed
        });
    },
    initCarSeries(id) {
      axios.get("vehicle/allSeries?id=" + id).then(function(response) {

        let carSeriesData = response.data;
       
          for (let i = 0; i < carSeriesData.length; i++) {
            let seriesTemp = {};

            seriesTemp.value = carSeriesData[i].seriesId;
            seriesTemp.label = carSeriesData[i].seriesName;
            seriesTemp.children = [];

            ctx.$data.carSeriesList.push(seriesTemp);
          }

      });
    }
    // async initCar
  }
};
</script>

<style>
.yuyue-box {
  height: 100%;
  width: 100%;
  min-height: 100%;
  max-height: 100%;
}
.yuyue-top {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.yueyue-title {
  font-size: 25px;
  font-weight: bold;
  color: white;
}
.yueyue-title p {
  margin: 5px 0;
}
.reister-box {
  width: 90%;
  position: relative;
  left: 5%;
  top: -50px;
  background: white;
  box-sizing: border-box;
  padding: 20px 20px 10px 20px;
  box-shadow: 1px 1px 1px #ccc;
}

.el-cascader-menu__list {
  max-height: 400px;
}
</style>
