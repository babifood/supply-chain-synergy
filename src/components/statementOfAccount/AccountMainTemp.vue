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
    <!-- 公告内容列表 -->
    <router-link
      class="list_item"
      v-for="item in accountList "
      :key="item.accountId"
      tag="div"
      :to="routerPath+item.accountId"
    >
      <van-row type="flex" justify="center">
        <van-col span="7">{{item.accountDate}}</van-col>
        <van-col span="9">{{item.accountCode}}</van-col>
        <van-col span="6">{{item.accountStatus}}</van-col>
        <van-col span="2">
          <div>
            <van-icon name="arrow" />
          </div>
        </van-col>
      </van-row>
      <div class="van-hairline--bottom"></div>
    </router-link>
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
      accountActive: this.parentActive,
      accountList: [],
      showCalendar: false,
      accountYear: '',
      currentDate:new Date()
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
    getAccountData() {
      for (let i = 0; i < 20; i++) {
        let listItem = {
          accountId: i,
          accountDate: "2020年02月",
          accountCode: "20200305" + i + this.accountActive,
          accountStatus: "待确定"
        };
        this.accountList.push(listItem);
      }
    },
    onConfirm(value) {
      this.accountYear = this.formatDate(value);
      this.showCalendar = false;
    },
    //更具年份查询
    searchAccount(){

    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  //接收父主键传的值
  props: ["parentActive"],
  created() {
    //默认等于当前年份
    this.accountYear = this.formatDate(new Date());
    if(this.accountActive===0){
      this.routerPath='/AccountMain/AccountInfo/';
    }else if(this.accountActive===1){
      this.routerPath='/AccountMain/AccountUploader/';
    }
    console.log(this.accountActive);
    this.getAccountData();
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