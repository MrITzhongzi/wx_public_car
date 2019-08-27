<template>
  <div class="yuyue-box" style="height: 100%;">
    <div class="yuyue-top" :style="{'background': 'url('+ YuyueImgBg +')center/ cover no-repeat'}">
      <div class="yueyue-title">
        <p>购车就选英豪汽车</p>
        <p>7天无理由退订</p>
      </div>
    </div>
    <div class="reister-box">
      <Form ref="form" label-width="80px">
        <FormItem label="姓名">
          <Input v-model="name" placeholder="请填写姓名" />
        </FormItem>
        <FormItem label="手机号码">
          <Input v-model="phone" placeholder="请填写手机号码" />
        </FormItem>
        <FormItem label="车辆型号">
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
  Cascader,
  Message
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
      name: "",
      phone: "",
      YuyueImgBg,
      chooseCarTypeValue: "",
      modelId: ""
    };
  },
  components: {
    Form,
    FormItem,
    Input,
    Button,
    Select,
    Option,
    Cascader,
    Message
  },
  methods: {
    onSubmit() {
      if (!this.name) {
        Message({
          message: "请填写姓名。",
          type: "warning"
        });
        return;
      }
      if (!this.phone) {
        Message({
          message: "请填写电话。",
          type: "warning"
        });
        return;
      }
      if (!this.chooseCarTypeValue) {
        Message({
          message: "请选择车辆型号。",
          type: "warning"
        });
        return;
      }

      this.reserveCar();
    },
    chooseCarModel: function() {

      this.$router.push({name: "carlist", params: {name: this.name, phone: this.phone}});
    },
    initChooseCar: function() {
      if (this.$route.params.nameList && this.$route.params.idList) {
        this.chooseCarTypeValue = this.$route.params.nameList.join(" ");
        this.modelId = this.$route.params.idList[2];
        this.name = this.$route.params.name;
        this.phone = this.$route.params.phone;
      }
    },
    reserveCar: async function() {
      let localData = JSON.parse(localStorage.getItem("yhqc"));
      const userId = localData.userinfo.id;
      const resData = await axios.get("/vehicle/saveVehicle", { params: {modelId: this.modelId,mobile: this.phone,name: this.name, userid: userId} });
      if(resData.data.code == 0) {
        Message({
          message: "预约成功。工作人员将在一到三个工作日内与您取得联系。",
          type: "success"
        });
      }else {
        Message({
          message: "预约失败，请稍后重试。",
          type: "error"
        });
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
