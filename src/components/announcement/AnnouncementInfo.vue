<!-- 通知公告详情页面 -->
<template>
  <div class="AnnouncementInfo_class">
    <div class="title_class">
      <!-- 居中 -->
      <van-row type="flex" justify="center">
        <van-col span="18">
          <h3>{{announcemenTitle}}</h3>
        </van-col>
      </van-row>
      <!-- 右对齐 -->
      <van-row type="flex" justify="space-between" class="row2_class">
        <van-col span="5">{{timesOfView}}阅读</van-col>
        <van-col span="9">{{announcemenDate}}</van-col>
      </van-row>
      <van-divider :style="{ color: '#969799', borderColor: '#969799',}"/>
    </div>
    <div>
      <van-field :value="announcemenText" autosize type="textarea" readonly />
    </div>
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
      announcemenTitle: "中饮巴比食品股有限公司公告通知",
      announcemenDate: "2020-03-05 12:31:44",
      timesOfView: 20,
      announcemenText: "   这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）"
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
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
.AnnouncementInfo_class {
  .title_class {
    h3 {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .van-col {
      text-align: center;
    }
    .row2_class {
      font-size: 8px;
    }
  }
}
</style>