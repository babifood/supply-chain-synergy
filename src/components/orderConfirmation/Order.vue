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
        :to="'/Order/OrderInfo/'+item.ordetId"
        class="list_item"
        v-for="item in list"
        :key="item.ordetId"
        tag="div"
      >
        <van-row type="flex" justify="center">
          <van-col span="7">{{item.orderDate}}</van-col>
          <van-col span="8">{{item.orderCode}}</van-col>
          <van-col span="7">{{item.requireDate}}</van-col>
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
      finished: false
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
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          let listItem = {
            ordetId: i,
            orderDate: "2020.02.26",
            orderCode: "450000000" + i,
            requireDate: "2020.02.26"
          };
          this.list.push(listItem);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 10) {
          this.finished = true;
        }
      }, 1000);
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