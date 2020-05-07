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
      :text="item.messageTitle"
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
import { Toast } from "vant";
export default {
  name: "Home",
  data() {
    return {
      orderInfo:0,//订单确认
      deliveryReleaseInfo:0,//发货通知
      arrivalNoticeInfo:0,//到货通知
      accountMainInfo:0,//账单确认
      aptitudeInfo:0,//资质信息
      announcementInfo:0,//巴比公告
      msgs: [],
      token:'',
    };
  },
  //方法集合
  methods: {
    getData(){
      this.axios.get('/supplier/home/getHomePageInfo',
      {
        headers: {
          'token': this.token,
          'operatorId': '1'
        },
        // params: {
        //   operatorId: '操作人ID'
        // }
      }).then(res =>{
        if(res.data.code=="200"){
          this.orderInfo=res.data.data.matterOrderNum;//订单确认
          this.deliveryReleaseInfo=res.data.data.deliveryOrderNum;//发货通知
          this.arrivalNoticeInfo=this.res.data.data.arrivalNum;//到货通知(后台接口没有)
          this.accountMainInfo=res.data.data.stateOrderNum;//账单确认
          this.aptitudeInfo=res.data.data.providerNum;//资质信息
          this.announcementInfo=res.data.data.messageNum;//巴比公告
          this.msgs = res.data.data.messageList;
        }else{
          Toast.fail(res.data.message);
        }
      }).catch(error =>{
        Toast.fail("请求数据异常!");
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.token = this.$route.params.token;
    console.log("home:获取tocke："+this.token);
    
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
