<template>
  <div class="sign-box" :style="signBox">
    <div class="sign-con">
      <img :src="signBg" style="width: 100%;" alt>
    </div>

    <CardList titleName="红包名单">
      <div class="packet">
        <div class="packet-title">5元红包</div>
        <div class="packet-con">
          <div v-for="item in 30" :key="item" class="packet-con-item">178****6857</div>
        </div>
      </div>

      <div class="packet">
        <div class="packet-title">66元红包</div>
        <div class="packet-con">
          <div v-for="item in 6" :key="item" class="packet-con-item">178****6857</div>
        </div>
      </div>

      <div class="card-desc">打开微信搜索"宜买车",添加“宜买车”微信号，即可进行兑奖。</div>
    </CardList>

    <CardList titleName="我的进度">
      <div class="my-progress-list">
        <div class="my-progress-item">
          <div class="my-item-left">抽奖码</div>
          <div class="my-item-right">
            <div class="number">
              <span>0</span>个
            </div>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
        <div class="my-progress-item">
          <div class="my-item-left">邀请好友</div>
          <div class="my-item-right">
            <div class="number">
              <span>0</span>名
            </div>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
      </div>
    </CardList>

    <CardList titleName="邀请排行榜">
      <template v-for="item in 10">
        <div class="invite-list" :key="item">
          <div class="invite-item">
            <div class="invite-item-left">
              <div class="item-index">{{item}}</div>
              <div class="item-img-box">
                <img :src="Logo" alt>
              </div>
              <div class="item-name">宜买车-然然</div>
            </div>
            <div class="invite-item-right">
              <span>{{item}}</span>人
            </div>
          </div>
        </div>
      </template>
    </CardList>
  </div>
</template>

<script>
import CardList from "@/components/sub_components/CardList";
import signBg from "../../assets/sign_bg.png";
import signBgLine from "../../assets/sign_bg_line.png";
import Logo from "../../assets/logo.png";
export default {
  components: {
    CardList
  },
  data: function() {
    return {
      signBox: {
        background: "url(" + signBgLine + ") center / 100% repeat-y",
        overflowY: "scroll"
      },
      signBg,
      Logo
    };
  }
};
</script>

<style>
.sign-box {
  padding-bottom: 30px;
  box-sizing: border-box;
}
.packet {
}
.packet-title {
  color: #fd564a;
  text-align: center;
  margin: 15px 0 10px 0;
  font-size: 14px;
}
.packet-con {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.packet-con-item {
  min-width: 26%;
  flex-grow: 1;
  font-size: 12px;
  margin-top: 10px;
  text-align: center;
}
.card-desc {
  font-size: 12px;
  margin-top: 30px;
  padding: 0 20px;
}

.my-progress-list {
}
.my-progress-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
}
.my-item-left {
  font-size: 13px;
}
.my-item-right {
  display: flex;
  align-items: center;
}
.number {
  font-size: 13px;
  margin-right: 3px;
}

.number span {
  color: #fe5b4f;
  font-size: 17px;
}
.my-item-right > i {
  font-size: 18px;
  color: #c5c5c5;
}

.invite-list {
}
.invite-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
}
.invite-item-left {
  display: flex;
}
.item-index {
    width: 30px;
}
.item-img-box {
  width: 25px;
  margin: 0 5px;
}
.item-img-box img {
  width: 100%;
  border-radius: 50%;
}
.item-name {
  font-size: 13px;
}
.invite-item-right {
  font-size: 13px;
  color: #ccc;
}
.invite-item-right span {
  color: black;
  margin-right: 5px;
}
</style>
