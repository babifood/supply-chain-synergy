<!-- 到货通知页面 -->
<template>
  <div class="ArrivalNotice_class">
    <!-- 查询条件 -->
    <van-sticky :offset-top="46">
      <div class="search_head">
        <van-row type="flex" justify="center">
          <van-col span="10">
            <van-field v-model="supplier" label="供应商:" placeholder="请输入供应商" label-width="60" />
          </van-col>
          <van-col span="10">
            <van-field v-model="storageLocation" label="库位:" placeholder="请输入库位号" label-width="60" />
          </van-col>
          <van-col span="3"></van-col>
        </van-row>
        <van-row type="flex" justify="center">
          <van-col span="10">
            <van-field
              readonly
              clickable
              name="calendar"
              :value="begDateVal"
              label="起始日期:"
              placeholder="选择日期"
              @click="showBegCalendar = true"
              label-width="60"
            />
            <van-calendar v-model="showBegCalendar" @confirm="onBegConfirm" />
          </van-col>
          <van-col span="10">
            <van-field
              readonly
              clickable
              name="calendar"
              :value="endDateVal"
              label="截止日期:"
              placeholder="选择日期"
              @click="showEndCalendar = true"
              label-width="60"
            />
            <van-calendar v-model="showEndCalendar" @confirm="onEndConfirm" />
          </van-col>
          <van-col span="3" class="search_but">
            <van-button round type="primary" size="mini" @click="searchArrivalNotice">查询</van-button>
          </van-col>
        </van-row>
      </div>
    </van-sticky>
    <!-- 到货通知列表 -->
    <div class="arrivalNotice_list" v-for="(item,index) in arrivalNoticeList" :key="index">
      <van-cell-group>
        <van-field label="到货日期:" :value="item.arrivalDate" disabled />
        <van-field label="订单号:" :value="item.arrivalOrderId" disabled />
        <van-field label="物料名称:" :value="item.matterName" disabled />
        <van-field label="供应商:" :value="item.supplierName" disabled />
        <van-field label="到货数量:" :value="item.matterNum+item.matterUtil" disabled />
        <van-field label="到货方式:" :value="item.shippingMethod" disabled />
        <van-field type="textarea" label="发货说明:" :value="item.matterDesc" disabled />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import moment from "moment"; //导入日期格式化
import { Toast } from "vant";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      supplier: "", //供应商
      storageLocation: "", //库位
      begDateVal: "", //开始时间
      endDateVal: "", //结束时间
      showBegCalendar: false,
      showEndCalendar: false,
      arrivalNoticeList: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD");
      // return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    onBegConfirm(value) {
      this.begDateVal = this.formatDate(value);
      this.showBegCalendar = false;
    },
    onEndConfirm(value) {
      this.endDateVal = this.formatDate(value);
      this.showEndCalendar = false;
    },
    searchArrivalNotice() {
      // for (let i = 0; i < 30; i++) {
      //     let arrivalNoticeItem = {
      //       arrivalNoticeId: i,
      //       deliveryDate:'2020.02.26',
      //       orderCode: "4500000000"+i,
      //       productName: "阳政线馒头切刀轴YJ-1510L(切刀座+切刀杆)",//产品名称
      //       supplier:'上海*****有限公司',
      //       deliveryNum: 3000,
      //       deliveryMode :"集装箱卡车",//运送方式
      //       deliverGoodsDect :"发货说明发货说明发货说明发货说明发货说明发货说明发货说明" //发货说明
      //     };
      //     this.arrivalNoticeList.push(arrivalNoticeItem);
      // } 
      this.axios
        .get("/api/supplier/arrival/getArrivalOrderInfoList", {
          headers: {
            'token': '1',
          },
          params: {
            supplierCode:this.supplier, 	//供应商编码
            locator:this.storageLocation, 	//库位 
            startDate:this.begDateVal, //开始日期	yyyy-MM-dd 	
            endDate:this.endDateVal //结束日期	yyyy-MM-dd 	
          }
        })
        .then(response => {
          // console.log(response);
          var array = [
            {
              supplierName: "1", 
              matterUtil: "matterUtil", 
              arrivalOrderId: 1, 
              shippingMethod: "shippingMethod", 
              description: "", 
              matterNum: 0, 
              matterDesc: null, 
              arrivalDate: null, 
              matterName: "matterName"
            }
          ]
          this.arrivalNoticeList = array
          console.log(this.arrivalNoticeList);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
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
.ArrivalNotice_class {
  .search_head {
    background-color: #fff;
    .van-cell {
      padding: 0px;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    .search_but {
      padding-top: 10px;
    }
  }
  .arrivalNotice_list{
    font-size: 12px;
    .van-cell {
      padding: 0px;
      padding-top: 3px;
      padding-bottom: 3px;
      padding-left: 10px;
      padding-right: 10px;
    }
  }
}
</style>