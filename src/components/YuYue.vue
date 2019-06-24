<template>
  <div class="yuyue-box">
    <div class="yuyue-top">
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
        <Button type="info" @click="onSubmit" :style="{width: '100%', background: '#49494b'}">立即预约</Button>
      </Form>
    </div>
  </div>
</template>

<script>
// banner_bg_v2.png
import { Form, FormItem, Input, Button, Select, Option } from "element-ui";
export default {
  data: function() {
    return {
      form: {
        name: "",
        phone: "",
        type: ""
      }
    };
  },
  components: {
    Form,
    FormItem,
    Input,
    Button,
    Select, Option
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style>
.yuyue-box {
  height: 100%;
  width: 100%;
}
.yuyue-top {
  height: 40%;
  background: url("../assets/banner_bg_v2.png") center/ cover no-repeat;
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
</style>
