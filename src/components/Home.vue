<template>
  <div class="hello">
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" height="180" indicator-color="white">
      <van-swipe-item>
        <van-image width="100%" lazy-load :src="require('../assets/imgs/slider1.jpg')" />
      </van-swipe-item>
      <van-swipe-item>
        <van-image width="100%" lazy-load :src="require('../assets/imgs/slider2.jpg')" />
      </van-swipe-item>
      <van-swipe-item>
        <van-image width="100%" lazy-load :src="require('../assets/imgs/slider3.jpg')" />
      </van-swipe-item>
    </van-swipe>
    <!-- 消息通知 -->
    <van-notice-bar
      v-for="(item,index) in msgs"
      :key="index"
      :text="item"
      left-icon="volume-o"
      color="rgb(230, 41, 41)"
      background="#fff"
    />
    <van-grid :gutter="10" class="grid">
      <van-grid-item icon="passed" :info="orderInfo" text="订单确认" to="/Order" />
      <van-grid-item icon="bullhorn-o" :info="deliveryReleaseInfo" text="发货通知" to="/DeliveryRelease"/>
      <van-grid-item icon="logistics" :info="arrivalNoticeInfo" text="到货通知" to="/ArrivalNotice"/>
      <van-grid-item icon="records" :info="accountMainInfo" text="账单确认" to="/AccountMain"/>
      <van-grid-item icon="good-job-o" :info="aptitudeInfo" text="资质信息" to="/Aptitude"/>
      <van-grid-item icon="volume-o" :info="announcementInfo" text="巴比公告" to="/Announcement"/>
      <van-grid-item icon="phone-circle-o" text="联系巴比" to="/ContactUs"/>
      <van-grid-item icon="user-o" text="个人中心" to="/PersonageInfo" />
    </van-grid>
    <div class="foot">
        <P>版权所有 © 中饮巴比食品股份有限公司</P>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      orderInfo:1,
      deliveryReleaseInfo:2,
      arrivalNoticeInfo:3,
      accountMainInfo:4,
      aptitudeInfo:5,
      announcementInfo:6,
      msgs: [
        "供应链协同平台即将上线！沟通需求和供应商之间的桥梁1",
        "供应链协同平台即将上线！沟通需求和供应商之间的桥梁2",
        "供应链协同平台即将上线！沟通需求和供应商之间的桥梁3"
      ],
    };
  },
  //方法集合
  methods: {
    getData(){
      this.axios.get('/api/supplier/home/getHomePageInfo',
      {
        headers: {
          'token': 'tokenValue'
        },
        params: {
          operatorId: '操作人ID'
        }
      }).then(response =>{
        console.log(response);
      }).catch(error =>{
        console.log(error);
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getData();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss' scoped>

.grid{
  padding-top: 10px;
}
.foot{
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    box-sizing: content-box;
    width: 100%;
    height: 50px;
    background-color: chocolate;
    
}
.foot p{
  width: 100%;
  font-size: 12px;
  color: #fff;
  text-align: center;
}
</style>
