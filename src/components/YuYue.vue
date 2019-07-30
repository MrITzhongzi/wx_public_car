<template>
  <div class="yuyue-box" style="height: 100%;">
    <div class="yuyue-top" :style="{'background': 'url('+ YuyueImgBg +')center/ cover no-repeat'}">
      <div class="yueyue-title">
        <p>购车就选英豪汽车</p>
        <p>7天无理由退订</p>
      </div>
    </div>
    <div class="reister-box">
      <Form ref="form" :model="form" label-width="80px">
        <FormItem label="姓名">
          <Input v-model="form.name" placeholder="请填写姓名" />
        </FormItem>
        <FormItem label="手机号码">
          <Input v-model="form.phone" placeholder="请填写手机号码" />
        </FormItem>
        <FormItem label="车辆型号2">
          <div @click.capture="chooseCarModel">
            <Input
              :disabled="true"
              :value="chooseCarTypeValue"
              style="background: white;"
              class="choose-car-type"
              placeholder="请选择车辆型号"
            />
          </div>
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
import GlobalParams from "./config/GlobalParams";

export default {
  async mounted() {
    this.initChooseCar();
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
      chooseCarTypeValue: ""
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
    chooseCarModel: function() {
      this.$router.push("/carlist");
    },
    initChooseCar: function() {
      if (this.$route.params.nameList && this.$route.params.idList) {
        this.chooseCarTypeValue = this.$route.params.nameList.join(" ");
      }
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
  text-align: center;
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
.choose-car-type > input {
  color: black !important;
}
</style>
