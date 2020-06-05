<!-- 订单详情页面 -->
<template>
  <div class="OrderInfo_class">
    <van-sticky :offset-top="46">
      <van-panel title="订单信息">
        <div>
          <van-row>
            <van-col span="12">
              <van-field
                type="text"
                :value="orderNo"
                label="订单号:"
                disabled
                label-width="50px"
                :border="true"
              />
            </van-col>
            <van-col span="12">
              <van-field type="number" :value="orderSum" label="总额:" disabled label-width="40px" />
            </van-col>
          </van-row>
          <van-row>
            <van-col span="12">
              <van-field type="text" :value="buyer" label="采购员:" disabled label-width="50px" />
            </van-col>
            <van-col span="12">
              <van-field type="tel" :value="mobileNub" label="电话:" disabled label-width="40px" />
            </van-col>
          </van-row>
          <van-row>
            <van-col span="24">
              <van-field
                type="text"
                :value="orderContract"
                label="订单合同:"
                disabled
                label-width="65px"
                :border="true"
              />
            </van-col>
          </van-row>
        </div>
      </van-panel>
    </van-sticky>
    <van-panel :title="'产品'+(index+1)" v-for="(item,index) in productList" :key="index">
      <div>
        <van-cell-group>
          <van-field label="产品名:" :value="item.matterName" disabled />
          <van-field label="订单数:" :value="item.matterNum+item.matterUtil" disabled />
          <van-field label="交期:" :value="item.expireTime" disabled />
          <van-field label="单价:" :value="item.matterPrice" disabled />
          <van-field label="金额:" :value="item.amount" disabled />
          <van-field label="税率:" :value="item.taxRate" disabled />
          <van-field label="交货地址:" :value="item.address" disabled />
          <van-field type="textarea" label="订单备注:" :value="item.description" disabled />
        </van-cell-group>
      </div>
    </van-panel>
    <van-panel title="确认说明">
      <div>
        <van-field
          v-model="affirmDESC"
          rows="2"
          autosize
          label="留言:"
          type="textarea"
          placeholder="请输入留言"
        />
      </div>
      <div slot="footer">
        <van-button type="primary" block :disabled="btnStatus === 1" @click="affirmOrder">订单确认</van-button>
      </div>
    </van-panel>
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
      ordersId:'',
      orderNo: "",
      orderSum: "",
      buyer: "",
      mobileNub: "",
      orderContract:'',
      productList:[],
      affirmDESC: "",
      btnStatus :0
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //加载订单下的商品明细
    loadProduct(){
      this.axios
        .get("/supplier/order/getOrderDetailList", {
          headers: {
            'token': sessionStorage.getItem('token')
          },
          params: {
            ordersId: this.ordersId
          }
        })
        .then(res => {
          console.log(res);
          if(res.data.code=='200'){
            this.orderNo = res.data.data.orderNo;
            this.orderSum = res.data.data.totalAmount;
            this.buyer = res.data.data.purchaser;
            this.mobileNub = res.data.data.mobile;
            this.orderContract = res.data.data.contractNo;
            this.productList = res.data.data.detailInfoVos;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //订单确认
    affirmOrder() {
       if(this.affirmDESC==null||this.affirmDESC==''){
         Toast.fail('备注信息不能为空!');
       }else{
          this.axios.post('/supplier/order/updateOrderInfo',
            {
              'confirmDesc': this.affirmDESC,
              'ordersId': this.ordersId
            },{
              headers: {
                'token': sessionStorage.getItem('token'),
                'operatorId' : '1'
              }
            }
          ).then(res =>{
            this.btnStatus = 1;
            Toast.success(res.data.message);
          })
          .catch(error => {
            // console.log(error);
            Toast.fail('订单确定失败');
          });
       } 
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    //订单编号等于路由传过来的订单编号
    this.ordersId = this.$route.params.ordersId;
    this.loadProduct()
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
.OrderInfo_class{
  font-size: 14px;
  .van-cell{
    padding: 0px;
    padding-top: 3px;
    padding-bottom: 3px;
    padding-left: 16px;
    padding-right: 16px;
  }
}
</style>