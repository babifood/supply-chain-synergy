<!-- 对账主列表模板 -->
<template>
  <div class="AccountMainTemp_class">
    <!-- 列表标题 -->
    <van-sticky :offset-top="90">
      <div class="list_head">
        <van-row type="flex" justify="center">
          <van-col span="8">
            <van-field
              readonly
              clickable
              :border = "false"
              name="calendar"
              :value="accountYear"
              label-width="40px"
              label="年度:"
              placeholder="选择年度"
              @click="showCalendar = true"
            />
            <van-popup v-model="showCalendar" position="bottom">
              <van-datetime-picker
                v-model="currentDate"
                type="year-month"
                :formatter="formatter"
                @cancel="showCalendar = false"
                @confirm="onConfirm"
              />
            </van-popup>
          </van-col>
          <van-col span="16">
            <van-button round type="primary" size="mini" @click="searchAccount">查询</van-button>
          </van-col>
        </van-row>
        <van-row type="flex" justify="center" class="row2_class">
          <van-col span="7">账单月份</van-col>
          <van-col span="9">账单号</van-col>
          <van-col span="6">账单状态</van-col>
          <van-col span="2"></van-col>
        </van-row>
      </div>
    </van-sticky>
    <!-- 账单内容列表 -->
    <van-list v-model="loading" 
      :finished="finished" 
      finished-text="没有更多了" 
      :error.sync="error"
      error-text="请求失败，点击重新加载" @load="onLoad"> 
      <router-link
        class="list_item"
        v-for="item in list "
        :key="item.stateOrderId"
        tag="div"
        :to="routerPath+item.billNo+'/'+item.billMonth+'/'+item.billStatusVle"
      >
        <van-row type="flex" justify="center">
          <van-col span="7">{{item.billMonth}}</van-col>
          <van-col span="9">{{item.billNo}}</van-col>
          <van-col span="6">{{item.billStatus}}</van-col>
          <van-col span="2">
            <div>
              <van-icon name="arrow" />
            </div>
          </van-col>
        </van-row>
        <div class="van-hairline--bottom"></div>
      </router-link>
    </van-list>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import moment from "moment"; //导入日期格式化
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      routerPath:'',//路由地址
      url:'',//数据请求地址
      accountActive: this.parentActive,
      showCalendar: false,
      accountYear: '',
      currentDate:new Date(),

      list: [],
      loading: false,
      error: false,
      finished: false,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    formatter(type, val){
      if (type === 'year') {
        return val;
      }
    },
    formatDate(date) {
      return moment(date).format("YYYY");
    },
    onLoad(){//加载数据
      this.axios
        .get(this.url, {
          headers: {
            'token': sessionStorage.getItem('token'),
          },
          params: {
            year:this.accountYear,
          }
        })
        .then(res => {
          console.log(res);
          // 加载状态结束
          this.loading = false;
          if(res.data.code == '200'){
            if(this.accountActive===0){
              this.list = this.billBindingValue(res.data.data.list)
            }else if(this.accountActive===1){
              this.list = this.fileBindingValue(res.data.data.list)
            }
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
    billBindingValue(array){//待确认订单对象绑定值
      var returnArray = new Array();
      array.forEach(obj =>{
        let item = {
          billMonth:obj.stateDate,//账单月份
          billNo:obj.stateOrderId,//账单号
          billStatus:obj.stateStatus==0?'未确认':value==1?'已确认':value==2?'已失效':'',//订单状态
          billStatusVle:obj.stateStatus,
          billMonthFormat:obj.stateDateStr,//账单月份格式化（yyyy年mm月）
        }
        returnArray.push(item);
      });
      return returnArray;
    },
    fileBindingValue(array){//账单文件上传对象绑定值
      var returnArray = new Array();
      array.forEach(obj =>{
        let item = {
          billMonth:obj.stateDate,//账单月份
          billNo:obj.stateOrderId,//账单号
          billStatus:obj.fileStatus==0?'未上传':value==1?'已上传':'',//订单状态
          billStatusVle:obj.fileStatus,
          billMonthFormat:'',//账单月份格式化（yyyy年mm月）
        }
        returnArray.push(item);
      });
      return returnArray;
    },
    onConfirm(value) {
      this.accountYear = this.formatDate(value);
      this.showCalendar = false;
    },
    //更具年份查询
    searchAccount(){
      this.loading=true,
      this.onLoad();
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  //接收父主键传的值
  props: ["parentActive"],
  created() {
    //默认等于当前年份
    this.accountYear =this.formatDate(new Date())
    if(this.accountActive===0){
      this.routerPath='/AccountMain/AccountInfo/';
      this.url = '/supplier/state/getStateOrderInfoList'
    }else if(this.accountActive===1){
      this.routerPath='/AccountMain/AccountUploader/';
      this.url = '/supplier/state/getStateOrderFileList'
    }
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
.AccountMainTemp_class {
  font-size: 14px;
  .list_head {
    line-height: 40px;
    background-color: #fff;
    .row2_class {
      .van-col {
        text-align: center;
      }
    }
  }
  .list_item {
    line-height: 40px;
    background-color: #fff;
    .van-col {
      text-align: center;
    }
  }
}
</style>