<!-- 对账单物料明细页面 -->
<template>
  <div class="AccountProducInfo_class">
    <van-sticky :offset-top="46">
      <div class="AccountProductInfo_title_class">
        <van-row type="flex" justify="center" align="center">
          <van-col span="24">
            <van-field :value="productName" label="物料名称:" disabled label-width="65px" />
          </van-col>
        </van-row>
        <van-row type="flex" justify="center" align="center">
          <van-col span="12">
            <van-field :value="billMonth" label="对账月份:" disabled label-width="65px" />
          </van-col>
          <van-col span="12">
            <van-field :value="totalQuantity" label="总量:" disabled label-width="40px" />
          </van-col>
        </van-row>
        <van-row type="flex" justify="center" align="center">
          <van-col span="12">
            <van-field :value="totalMoney" label="总额:" disabled label-width="65px" />
          </van-col>
          <van-col span="12">
            <van-field :value="currency" label="币种:" disabled label-width="40px" />
          </van-col>
        </van-row>
      </div>
      <van-divider :style="{ color: '#969799', borderColor: '#969799',margin:'0px',}" />
      <div class="list_title">
        <van-row type="flex" justify="center" align="center">
          <van-col span="5">交货日期</van-col>
          <van-col span="5">交货数量</van-col>
          <van-col span="3">单位</van-col>
          <van-col span="5">对账单价</van-col>
          <van-col span="5">对账金额</van-col>
        </van-row>
      </div>
      <div class="van-hairline--bottom"></div>
    </van-sticky>
    <!-- <van-list v-model="loading" 
      :finished="finished" 
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"> -->
      <div class="list_item" v-for="(item,index) in productList" :key="index">
        <van-row type="flex" justify="center" align="center">
          <van-col span="5">{{item.deliveryDate}}</van-col>
          <van-col span="5">{{item.matterNum}}</van-col>
          <van-col span="3">{{item.matterUtil}}</van-col>
          <van-col span="5">{{item.matterPrice}}</van-col>
          <van-col span="5">{{item.stateAmount}}</van-col>
        </van-row>
        <div class="van-hairline--bottom"></div>
      </div>
    <!-- </van-list> -->
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { Toast } from "vant";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      //请求参数
      billMonth:this.$route.params.billMonth,
      statesId:this.$route.params.statesId,
      productId:this.$route.params.productId,
      //数据列表
      productList: [],//产品列表集合
      loading: false,
      error: false,
      finished: false,
      //头部信息
      productName:'',//商品名称
      totalQuantity:0,//总数量
      totalMoney:0,//总金额
      currency: "CNY", //币种
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    onLoad(){
      this.axios
        .get("/supplier/state/getStateOrderDetailInfoList", {
          headers: {
            'token': sessionStorage.getItem('token'),
          },
          params: {
            statesId:this.statesId,//对账单号 		
            matterId:this.productId,//	物料编号	
            yearMonth:this.billMonth,
          }
        })
        .then(res => {
          console.log(res);
          // 加载状态结束
          // this.loading = false;
          if(res.data.code == '200'){
            this.productName = res.data.data.matterName;
            this.billMonth = res.data.data.stateDate;
            this.totalQuantity = res.data.data.sumMatterNum;
            this.totalMoney = res.data.data.sumAmount;
            this.currency = res.data.data.currency;
            this.productList = res.data.data.detailInfoList;
            // if(res.data.data.total>=this.productList.length){
            //   this.finished = true;//数据加载完毕
            // }
          }else{
            // this.error = true;
            Toast.fail(res.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // console.log("mongth:"+this.$route.params.billMonth);
    // console.log("orderId:"+this.$route.params.orderId);
    // console.log("productId:"+this.$route.params.productId);
    this.onLoad();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.AccountProducInfo_class {
  font-size: 14px;
  .AccountProductInfo_title_class {
    background-color: #fff;
    .van-cell {
      padding: 0px;
      padding-left: 5px;
      padding-right: 5px;
      padding-top: 5px;
      padding-bottom: 5px;
    }
  }
  .list_title,.list_item {
    line-height: 35px;
    background-color: #fff;
    .van-col {
      text-align: center;
    }
  }
}
</style>