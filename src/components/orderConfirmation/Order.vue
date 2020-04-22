<!-- 订单主页面 -->
<template>
  <div class="Order_class">
    <!-- 列表标题 -->
    <van-sticky :offset-top="46">
      <div class="list_head">
        <van-row type="flex" justify="center">
          <van-col span="7">订单日期</van-col>
          <van-col span="8">订单号</van-col>
          <van-col span="7">要求交期</van-col>
          <van-col span="1"></van-col>
        </van-row>
      </div>
    </van-sticky>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <router-link
        :to="'/Order/OrderInfo/'+item.orderNo"
        class="list_item"
        v-for="item in list"
        :key="item.orderNo"
        tag="div"
      >
        <van-row type="flex" justify="center">
          <van-col span="7">{{item.orderDate}}</van-col>
          <van-col span="8">{{item.orderNo}}</van-col>
          <van-col span="7">{{item.expireTime}}</van-col>
          <van-col span="1">
            <van-icon name="arrow" />
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

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      list: [],
      loading: false,
      finished: false,
      limit : 0,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    onLoad() {
      // 异步更新数据
      this.limit++;
      this.axios
        .get("/api/supplier/order/getOrderInfoList", {
          headers: {
            'token': '1',
            'supplierCode':'1'
          },
          params: {
            limit: this.limit,
            page:10
          }
        })
        .then(response => {
          console.log(response);
          // 加载状态结束
          this.loading = false;
          // this.list = response.data.data.list;
          this.list=[{orderDate:'2020-04-22',orderNo:'20200422',expireTime:'2020-04-22'}];
          if(response.data.data.total>=this.list.length){
            this.finished = true;
          }
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
.Order_class {
  font-size: 14px;
  .list_head {
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }
  .list_item {
    height: 40px;
    line-height: 40px;
    font-size: 12px;
  }
}
</style>