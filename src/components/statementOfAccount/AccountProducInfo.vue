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
    <div class="list_item" v-for="item in productList" :key="item.productId">
      <van-row type="flex" justify="center" align="center">
        <van-col span="5">{{item.deliveryDate}}</van-col>
        <van-col span="5">{{item.deliveryNum}}</van-col>
        <van-col span="3">{{item.unit}}</van-col>
        <van-col span="5">{{item.price}}</van-col>
        <van-col span="5">{{item.money}}</van-col>
      </van-row>
      <div class="van-hairline--bottom"></div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      productName:'物料名称XXXXXXX',//商品名称
      billMonth:'2020-03',//账单月份
      totalQuantity:10000,//总数量
      totalMoney:10000,//总金额
      currency: "CNY", //币种
      productList:[],//产品列表集合
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getAccountProductInfoData(){
      
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getAccountProductInfoData();
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