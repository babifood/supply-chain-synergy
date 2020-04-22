<!-- 订单详情页面 -->
<template>
  <div class="OrderInfo_class">
    <!-- <van-panel title="订单信息">
      <div>
        <van-row>
          <van-col span="12">
            <van-field type="text" :value="orderCode" label="订单号:" disabled label-width="50px" :border="true"/>
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
      </div>
    </van-panel>
    <van-panel title="产品">
      <div>
        <van-row>
          <van-col span="24">
            <van-field type="text" :value="orderCode" label="产品名:" disabled label-width="50px" />
          </van-col>
        </van-row>
        <van-row>
          <van-col span="12">
            <van-field type="number" :value="orderCode" label="订单数:" disabled label-width="50px" />
          </van-col>
          <van-col span="12">
            <van-field type="text" :value="orderSum" label="交期:" disabled label-width="40px" />
          </van-col>
        </van-row>
        <van-row>
          <van-col span="8">
            <van-field type="number" :value="orderCode" label="单价:" disabled label-width="40px" />
          </van-col>
          <van-col span="8">
            <van-field type="text" :value="orderSum" label="金额:" disabled label-width="40px" />
          </van-col>
          <van-col span="8">
            <van-field type="text" :value="orderSum" label="税率:" disabled label-width="40px" />
          </van-col>
        </van-row>
        <van-row>
          <van-col span="24">
            <van-field type="text" :value="orderCode" label="交货地址:" disabled label-width="60px" />
          </van-col>
        </van-row>
        <van-row>
          <van-col span="24">
            <van-field type="textarea" :value="orderCode" label="订单备注:" disabled label-width="60px"/>
          </van-col>
        </van-row>
      </div>
    </van-panel>-->
    <!-- <van-panel title="订单信息">
      <div>
        <van-cell-group>
          <van-field label="订单号:" :value="orderCode" disabled />
          <van-field label="采购员:" :value="buyer" disabled />
          <van-field label="总额:" :value="orderSum" disabled />
          <van-field label="电话:" :value="mobileNub" disabled />
        </van-cell-group>
      </div>
    </van-panel>-->
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
    <van-panel :title="'产品'+(index+1)" v-for="(item,index) in productList" :key="item.productId">
      <div>
        <van-cell-group>
          <van-field label="产品名:" :value="item.productName" disabled />
          <van-field label="订单数:" :value="item.productNum" disabled />
          <van-field label="交期:" :value="item.requireDate" disabled />
          <van-field label="单价:" :value="item.productPrice" disabled />
          <van-field label="金额:" :value="item.productSum" disabled />
          <van-field label="税率:" :value="item.taxRate" disabled />
          <van-field label="交货地址:" :value="item.address" disabled />
          <van-field type="textarea" label="订单备注:" :value="item.dect" disabled />
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
        <van-button type="primary" block @click="affirmOrder">订单确认</van-button>
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
      orderNo: "",
      orderSum: "5000000",
      buyer: "张三",
      mobileNub: "15666668888",
      orderContract:'GT-00001-1000-XXXX',
      productList: [
        {
          productId: 1,
          productName: "阳政线馒头切刀轴YJ-1510L(切刀座+切刀杆)",
          productNum: "3000",
          requireDate: "2020.02.22/16:00",
          productPrice: "3000",
          productSum: "9000000",
          taxRate: "10%",
          address: "上海市松江区茸江路789号",
          dect: "备注上海市松江区茸江路789号"
        },
        {
          productId: 2,
          productName: "阳政线馒头切刀轴YJ-1510L(切刀座+切刀杆)",
          productNum: "3000",
          requireDate: "2020.02.22/16:00",
          productPrice: "3000",
          productSum: "9000000",
          taxRate: "10%",
          address: "上海市松江区茸江路789号",
          dect: "备注上海市松江区茸江路789号"
        }
      ],
      affirmDESC: ""
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
        .get("/api/supplier/order/getOrderDetailList", {
          headers: {
            token: "tokenValue"
          },
          params: {
            orderNo: this.orderNo
          }
        })
        .then(response => {
          console.log(response);
          
        })
        .catch(error => {
          console.log(error);
        });
    },
    //订单确认
    affirmOrder() {
       this.axios.post('api/supplier/order/updateOrderInfo',
        {
          'confirmDesc': this.affirmDESC,
          'orderNo': this.orderNo
        },{
          headers: {
            token: "1",
            operatorId : '1'
          }
        }
      ).then(function (response) {
        console.log(response);
        Toast.success('订单确定成功');
      })
      .catch(function (error) {
        console.log(error);
        Toast.fail('订单确定失败');
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    //订单编号等于路由传过来的订单编号
    this.orderNo = this.$route.params.ordetId;
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