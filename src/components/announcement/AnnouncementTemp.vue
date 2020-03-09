<!-- 公告模板 -->
<template>
  <div class="AnnouncementTemp_class">
    <!-- 列表标题 -->
    <van-sticky :offset-top="90">
      <div class="list_head">
        <van-row type="flex" justify="center">
          <van-col span="2"></van-col>
          <van-col span="5">发布日期</van-col>
          <van-col span="15">公告标题</van-col>
          <van-col span="2"></van-col>
        </van-row>
      </div>
    </van-sticky>
    <!-- 公告内容列表 -->
    <router-link
      class="list_item"
      v-for="item in announcementList"
      :key="item.announcementId"
      tag="div"
      :to="'/Announcement/AnnouncementInfo/'+item.announcementId"
    >
      <van-row type="flex" justify="center">
        <van-col span="2">
          <van-tag round type="danger" v-show="item.announcementStatus">新</van-tag>
        </van-col>
        <van-col span="5">{{item.announcementDate}}</van-col>
        <van-col span="15">
          <van-notice-bar
            :scrollable="false"
            color="#000000"
            background="#fff"
          >{{item.announcementTitle}}</van-notice-bar>
        </van-col>
        <van-col span="2">
          <div>
            <van-icon name="arrow" />
          </div>
        </van-col>
      </van-row>
      <div class="van-hairline--bottom"></div>
    </router-link>
    <!-- 选中公告详情 -->
    <!-- <div class="announcement_text">
      <van-cell-group>
        <van-field
          v-model="announcementText"
          autosize
          type="textarea"
          maxlength="200"
          show-word-limit
        />
      </van-cell-group>
    </div>-->
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
      announcementList: [],
      active: this.parentActive, //公告类型
      announcementTitle: "公告标题",
      announcementText: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getAnnouncementData() {
      for (let i = 0; i < 10; i++) {
        let listItem = {
          announcementId: i,
          announcementDate: "2020.02.26",
          announcementTitle: "中饮巴比食品股份公司公告" + this.active,
          announcementText: "2020.02.26",
          announcementFile: "",
          announcementStatus: true
        };
        this.announcementList.push(listItem);
      }
    }
  },
  //接收父主键传的值
  props: ["parentActive"],
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    console.log(this.active);
    this.getAnnouncementData();
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
.AnnouncementTemp_class {
  font-size: 14px;
  .list_head {
    line-height: 40px;
    background-color: #fff;
    .van-col {
      text-align: center;
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