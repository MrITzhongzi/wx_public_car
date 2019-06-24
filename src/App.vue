<template>
  <Tabs :tab-position="tabPosition" :stretch="true" class="tabs-style">
    <TabPane label="首页">
      <Shouye></Shouye>
    </TabPane>
    <TabPane :lazy="true" label="预约">
      <Yuyue></Yuyue>
    </TabPane>
    <TabPane :lazy="true" label="活动">
      <Huodong></Huodong>
    </TabPane>
    <TabPane :lazy="true" label="我的">4</TabPane>
  </Tabs>
</template>

<script>
import { Tabs, TabPane } from "element-ui";
import Shouye from "@/components/Shouye";
import Yuyue from "@/components/Yuyue";
import Huodong from "@/components/Huodong"
export default {
  name: "app",
  components: {
    Tabs,
    TabPane,
    Shouye,
    Yuyue,
    Huodong
  },
  data() {
    return {
      tabPosition: "bottom"
    };
  }
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
.tabs-style {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.el-tabs__content {
  flex-grow: 1;
}
.el-tab-pane {
  height: 100%;
}
</style>
