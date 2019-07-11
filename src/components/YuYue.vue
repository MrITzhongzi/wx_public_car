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
          <Cascader v-model="value" @change="handleChange" class="car-brand-list" :props="props"></Cascader>
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
    let ctx = this;
    return {
      form: {
        name: "",
        phone: "",
        type: ""
      },
      YuyueImgBg,
      value: [],
      carBrand: "", //车辆品牌列表
      carSerie: "", // 车辆某个品牌的系列
      carModel: "", //车辆某个系列的某个型号
      propsLevel: 0,
      props: {
        lazy: true,
        async lazyLoad(node, resolve) {
          const { level } = node;
          
          console.log("level", level);
          console.log("node", node);
          if (level == 0) {
            let { data } = node;
            const nodes = (await ctx.initCarBrand()).map(item => ({
              value: item.brandid,
              label: item.name,
              leaf: level >= 2
            }));
            resolve(nodes);
          }

          if (level == 1) {
            let { data } = node;
            const nodes = (await ctx.initCarSeries(data.value)).map(item => ({
              value: item.seriesId,
              label: item.seriesName,
              leaf: level >= 2
            }));
            resolve(nodes);
          }

          if (level == 2) {
            let { data } = node;
            console.log(data);
            console.log(await ctx.initCarModels(data.value));
            const nodes = (await ctx.initCarModels(data.value)).map(item => ({
              value: item.modelId,
              label: item.modelName,
              leaf: level >= 2
            }));
            resolve(nodes);
          }
        }
      }
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
    async initCarBrand() {
      return (await axios.get("/vehicle/allBrands")).data;
    },
    async initCarSeries(id) {
      return (await axios.get("vehicle/allSeries?id=" + id)).data;
    },
    async initCarModels(id) {
      return (await axios.get("/vehicle/allModels?id=" + id)).data;
    }
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

.car-brand-list {
  width: 100%;
}

.el-cascader-menu__list {
  max-height: 400px;
}
</style>
