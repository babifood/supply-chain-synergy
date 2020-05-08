<!-- 通知公告 -->
<template>
  <div class="Announcement_class">
    <van-tabs v-model="active" sticky :offset-top="46">
      <van-tab title="通用类">
        <AnnouncementTemp :parentActive="active"></AnnouncementTemp>
      </van-tab>
      <van-tab title="需求类">
        <AnnouncementTemp :parentActive="active"></AnnouncementTemp>
      </van-tab>
      <van-tab title="奖惩类">
        <AnnouncementTemp :parentActive="active"></AnnouncementTemp>
      </van-tab>
    </van-tabs>
    
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
//巴比公告模板
import AnnouncementTemp from "../announcement/AnnouncementTemp.vue";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    AnnouncementTemp
  },
  data() {
    //这里存放数据
    return {
      active:'',//当前选择的tag
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // this.token = this.$route.params.token;
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
</style>