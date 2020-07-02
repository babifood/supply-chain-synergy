<!-- 对账单详情页面 -->
<template>
  <div class="AccountInfo_class">
    <van-sticky :offset-top="46">
      <div class="AccountInfo_title_class">
        <van-row type="flex" justify="center" align="center">
          <van-col span="24">
            <van-field :value="compName" label="对账单位:" disabled label-width="65px" />
          </van-col>
        </van-row>
        <van-row type="flex" justify="center" align="center">
          <van-col span="12">
            <van-field :value="billMonth" label="账单月份:" disabled label-width="65px" />
          </van-col>
          <van-col span="12">
            <van-field :value="billCode" label="账单单号:" disabled label-width="65px" />
          </van-col>
        </van-row>
        <van-row type="flex" justify="center" align="center">
          <van-col span="12">
            <van-field :value="totalAmountPayable" label="应付货款总额:" disabled />
          </van-col>
          <van-col span="12">
            <van-field :value="currency" label="币种:" disabled label-width="65px" />
          </van-col>
        </van-row>
        <van-row type="flex" justify="center" align="center">
          <van-col span="12">
            <van-field :value="monthlyDeductions" label="月度扣款金额:" disabled />
          </van-col>
          <van-col span="12">
            <van-cell title="扣款清单附录" icon="eye-o" @click="showAccessory=true" />
            <van-image-preview v-model="showAccessory" :images="accountImages"></van-image-preview>
          </van-col>
        </van-row>
        <van-row type="flex" justify="center" align="center">
          <van-col span="12">
            <van-field :value="actualMoney" label="实际货款金额:" disabled />
          </van-col>
          <van-col span="6">
            <van-button round type="primary" size="small" :disabled="btnStatus === 1" @click="accountAffirm">账单确认</van-button>
          </van-col>
          <van-col span="6">
            <!-- <van-button round type="primary" size="small" @click="accountDownload">账单下载</van-button> -->
          </van-col>
        </van-row>
      </div>
      <van-divider :style="{ color: '#969799', borderColor: '#969799',margin:'0px',}" />
      <div class="list_title">
        <van-row type="flex" justify="center" align="center">
          <van-col span="12">物料名称</van-col>
          <van-col span="5">交货总数</van-col>
          <van-col span="5">对账金额</van-col>
          <van-col span="1"></van-col>
        </van-row>
      </div>
      <div class="van-hairline--bottom"></div>
    </van-sticky>
    <router-link
      class="list_item"
      v-for="item in accountProductList"
      :key="item.matterId"
      tag="div"
      :to="'/AccountMain/AccountInfo/AccountProducInfo/'+item.matterId+'/'+statesId+'/'+billMonth"
    >
      <van-row type="flex" justify="center" align="center">
        <van-col span="12">
          <van-notice-bar :scrollable="false" color="#000000" background="#fff">{{item.matterName}}</van-notice-bar>
        </van-col>
        <van-col span="5">{{item.matterNum}}</van-col>
        <van-col span="5">{{item.stateAmount}}</van-col>
        <van-col span="1">
          <van-icon name="arrow" />
        </van-col>
      </van-row>
      <div class="van-hairline--bottom"></div>
    </router-link>
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
      statesId:this.$route.params.statesId,
      billMonth:this.$route.params.billMonth,
      
      showAccessory: false, //附件查看组件显影
      accountImages: [], //附件列表
      compName: "", //对账单位
      billCode: "", //账单单号
      totalAmountPayable: 0, //应付总金额
      currency: "CNY", //币种
      monthlyDeductions: 0, //月度扣款总额
      actualMoney: 0, //实际货款
      accountProductList: [], //对账单物料集合
      btnStatus:0,//按钮状态
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //账单确认
    accountAffirm() {
      this.axios.post('/supplier/state/updateStatInfo'
        ,{
          'statesId':this.statesId
        }
        ,{
          headers: {
            'token': sessionStorage.getItem('token'),
            'operatorId':"1"
          }
        }
      ).then(res =>{
        if(res.data.code == "200"){
          this.btnStatus = 1;
          Toast.success('对账单提交成功');
        }else{
          Toast.fail(res.data.message);
        }
      })
      .catch(error => {
        console.log(error);
        Toast.fail('对账单提交失败');
      });
    },
    //账单下载
    accountDownload() {
      
    },
    //获取对账明细信息
    getAccountInfoData() {
      this.axios
        .get('/supplier/state/getStateOrderDetailList', {
          headers: {
            'token': sessionStorage.getItem('token'),
          },
          params: {
            statesId:this.statesId,
            yearMonth:this.billMonth
          }
        })
        .then(rep => {
          if(rep.data.code == '200'){
            this.compName = rep.data.data.supplierName;
            this.billMonth = rep.data.data.yearmonth;
            this.billCode = rep.data.data.stateOrderId;
            this.totalAmountPayable = rep.data.data.sumPayable;
            this.currency = rep.data.data.currency;
            this.monthlyDeductions = rep.data.data.monthWithhold;
            this.actualMoney = rep.data.data.actualSum;
            this.accountProductList = rep.data.data.matterList;
            var imgurl  = "http://122.144.202.58:8081/"+this.billCode+".JPG";
            this.accountImages.push(imgurl);
          }else{
            Toast.fail(res.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
    // onLoad(){

    // }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // console.log('orderId'+this.$route.params.orderId);
    //  console.log( 'billMonth'+this.$route.params.billMonth);
     
    this.getAccountInfoData();
    
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
.AccountInfo_class {
  font-size: 14px;
  .AccountInfo_title_class {
    background-color: #fff;
    .van-cell {
      padding: 0px;
      padding-left: 5px;
      padding-right: 5px;
      padding-top: 5px;
      padding-bottom: 5px;
    }
  }
  .van-hairline--bottom{
    z-index:100;
  }
  .list_title {
    line-height: 40px;
    background-color: #fff;
  }
  .list_item {
    line-height: 40px;
    background-color: #fff;
    .van-notice-bar {
      padding: 0px;
    }
  }
}
</style>