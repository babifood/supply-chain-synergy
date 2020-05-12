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
            <van-calendar v-model="showBegCalendar" @confirm="onBegConfirm" :min-date="minDate" :max-date="maxDate"/>
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
            <van-calendar v-model="showEndCalendar" @confirm="onEndConfirm" :min-date="minDate" :max-date="maxDate"/>
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
        <van-field type="textarea" label="发货说明:" :value="item.description" disabled />
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
      minDate: null,
      maxDate: null,
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
      this.axios
        .get("/supplier/arrival/getArrivalOrderInfoList", {
          headers: {
            'token': sessionStorage.getItem('token'),
          },
          params: {
            supplierCode:this.supplier, 	//供应商编码
            locator:this.storageLocation, 	//库位 
            startDate:this.begDateVal, //开始日期	yyyy-MM-dd 	
            endDate:this.endDateVal //结束日期	yyyy-MM-dd 	
          }
        })
        .then(res => {
          if(res.data.code == '200'){
            this.arrivalNoticeList = res.data.data.list
          }else{
            Toast.fail(res.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    var data = new Date()
    this.minDate = new Date(data.getFullYear(), data.getMonth());
    this.maxDate = new Date(data.getFullYear(), data.getMonth()+2);
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