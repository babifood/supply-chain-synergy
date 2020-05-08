<!--  -->
<template>
  <div class="App_class">
    <!-- 头部样式 -->
    <van-sticky>
      <van-nav-bar
        title="供应链协同平台"
        left-text="返回"
        left-arrow
        fixed:true
        @click-left="onClickLeft"
      />
    </van-sticky>
    <!-- 组件容器 -->
    <router-view></router-view>
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
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    // $route(now,old){     //监控路由变换，控制返回按钮的显示
    //  if(now.path=="/"){
    //     this.isShow=false;
    //  } else{
    //     this.isShow=true;
    //  }
    // }
  },
  //方法集合
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    // onClickRight() {
    //   Toast("按钮");
    // }
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
.App_class {
  .van-nav-bar {
    background-color: chocolate
  }
}
</style>