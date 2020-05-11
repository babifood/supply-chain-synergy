<!-- 发货通知主页面 -->
<template>
  <div class="DeliveryRelease_class">
    <van-tabs sticky :offset-top="46" background="#fff" color="chocolate">
      <van-tab title="代发货订单" class="tab_one">
        <van-sticky :offset-top="90">
          <div class="list_head">
            <van-row type="flex" justify="center">
              <van-col span="2"></van-col>
              <van-col span="7">订单号</van-col>
              <van-col span="8">订单交期</van-col>
              <van-col span="5">待发物料</van-col>
            </van-row>
          </div>
        </van-sticky>
        <van-list v-model="loading" 
          :finished="finished" 
          finished-text="没有更多了"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          @load="onLoad">
          <div class="list_item" v-for="item in list" :key="item.deliveryId" tag="div">
            <van-row type="flex" justify="center">
              <van-col span="2" class="checkbox_col">
                <van-field name="checkbox">
                  <template #input>
                    <van-checkbox v-model="item.orderStatus" shape="square" />
                  </template>
                </van-field>
              </van-col>
              <van-col span="7">{{item.deliveryId}}</van-col>
              <van-col span="8">{{item.expireTime}}</van-col>
              <van-col span="5">{{item.matterNum}}</van-col>
            </van-row>
            <div class="van-hairline--bottom"></div>
          </div>
        </van-list>
        <div class="footer_button">
          <van-row type="flex" justify="space-around">
            <van-col span="11">
              <van-button round type="primary" block @click="entiretyFaHuo">整单发货</van-button>
            </van-col>
            <van-col span="11">
              <van-button round type="primary" block @click="separateFaHuo">分料发货</van-button>
            </van-col>
          </van-row>
        </div>
      </van-tab>
      <van-tab title="历史发货通知">
        <van-sticky :offset-top="90">
          <div class="search_head">
            <van-row type="flex" justify="center">
              <van-col span="10">
                <van-field
                  readonly
                  clickable
                  name="calendar"
                  :value="begDateVal"
                  label-width="70px"
                  label="起始日期:"
                  placeholder="选择日期"
                  @click="showBegCalendar = true"
                />
                <van-calendar v-model="showBegCalendar" @confirm="onBegConfirm" :min-date="minDate" :max-date="maxDate"/>
              </van-col>
              <van-col span="10">
                <van-field
                  readonly
                  clickable
                  name="calendar"
                  :value="endDateVal"
                  label-width="70px"
                  label="截止日期:"
                  placeholder="选择日期"
                  @click="showEndCalendar = true"
                />
                <van-calendar v-model="showEndCalendar" @confirm="onEndConfirm" :min-date="minDate" :max-date="maxDate"/>
              </van-col>
              <van-col span="3" class="search_but">
                <van-button round type="primary" size="mini" @click="searchHistory">查询</van-button>
              </van-col>
            </van-row>
          </div>
        </van-sticky>
        <!-- 历史发货通知列表 -->
        <div class="history_list" v-for="item in historyList" :key="item.deliverGoodsId">
          <van-cell-group>
            <van-field label="订单号:" :value="item.orderCode" disabled />
            <van-field label="物料名称:" :value="item.productName" disabled />
            <van-field label="发货日期:" :value="item.deliverGoodsDate" disabled />
            <van-field label="发货数量:" :value="item.deliverGoodsNum" disabled />
            <van-field label="预计到货时间:" :value="item.predictDate" disabled />
            <van-field label="送货方式:" :value="item.transportMode" disabled />
            <van-field type="textarea" label="发货说明:" :value="item.deliverGoodsDect" disabled />
          </van-cell-group>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { Toast } from "vant";
import moment from 'moment'//导入日期格式化
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      list: [],
      error: false,
      loading: false,
      finished: false,
    
      begDateVal: "",
      endDateVal: "",
      minDate: null,
      maxDate: null,
      showBegCalendar: false,
      showEndCalendar: false,
      historyList: [],
      orderIdList: [],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    onLoad() {
      this.axios
        .get("/supplier/delivery/getDeliveryOrderList", {
          headers: {
            'token': sessionStorage.getItem('token'),
            'operatorId':'1'
          },
          // params: {
          //   limit: this.limit,
          //   page:10
          // }
        })
        .then(res => {
          // 加载状态结束
          this.loading = false;
          if(res.data.code=="200"){
            this.list = res.data.data.list;
            if(res.data.data.total>=this.list.length){
              this.finished = true;
            }
          }else{
            this.error = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    entiretyFaHuo() {
      //整单发货
      this.list.forEach(element => {
        if(element.orderStatus){
          this.orderIdList.push(element.deliveryId);
        }
      });
      //console.log(this.orderIdList);
      this.$router.push({path:'/DeliveryRelease/EntiretyFaHuo/',query:{orders:this.orderIdList}});
    },
    separateFaHuo() {
      //分料发货
      this.list.forEach(element => {
        if(element.orderStatus){
          this.orderIdList.push(element.deliveryId);
        }
      });
      this.$router.push({path:'/DeliveryRelease/SeparateFaHuo/',query:{orders:this.orderIdList}});
    },
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD");
      // return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    onBegConfirm(date) {
      this.begDateVal = this.formatDate(date);
      this.showBegCalendar = false;
    },
    onEndConfirm(date) {
      this.endDateVal = this.formatDate(date);
      this.showEndCalendar = false;
    },
    searchHistory() {
      
       this.axios
        .get("/supplier/delivery/getDeliveryOrderHistoryList", {
          headers: {
            'token': sessionStorage.getItem('token'),
            'operatorId':'1'
          },
          params: {
            startDate:this.begDateVal,
            endDate:this.endDateVal
          }
        })
        .then(res => {
          if(res.data.code == '200'){
            this.historyList = res.data.data.list;
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
    this.minDate = new Date(data.getFullYear(), data.getMonth()-1);
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
.DeliveryRelease_class {
  .tab_one{
    padding-bottom: 48px;
  }
  .list_head {
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    font-size: 14px;
  }
  .list_item {
    height: 40px;
    line-height: 40px;
    font-size: 12px;
  }
  .van-cell {
    padding: 0;
    padding-top: 3px;
    padding-bottom: 3px;
  }
  .van-tabbar-item {
    color: black;
    font-size: 16px;
  }
  .footer_button {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;
    box-sizing: content-box;
    width: 100%;
    height: 48px;
    background-color: #fff;
    text-align: center;
  }
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
  .history_list{
    padding-left: 8px;
    padding-right: 8px;
  }
  .checkbox_col{
    padding-top: 6px;
  }
}
</style>