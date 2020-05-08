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
    <van-list v-model="loading" 
      :finished="finished" 
      finished-text="没有更多了" 
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad">
      <router-link
        class="list_item"
        v-for="item in announcementList"
        :key="item.messageId"
        tag="div"
        :to="'/Announcement/AnnouncementInfo/'+item.messageId"
      >
        <van-row type="flex" justify="center">
          <van-col span="2">
            <van-tag round type="danger" v-show="item.status">新</van-tag>
          </van-col>
          <van-col span="5">{{item.publishDate}}</van-col>
          <van-col span="15">
            <van-notice-bar
              :scrollable="false"
              color="#000000"
              background="#fff"
            >{{item.messageTitle}}</van-notice-bar>
          </van-col>
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

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      list: [],
      loading: false,
      error: false,
      finished: false,

      announcementList: [],
      active: this.parentActive, //公告类型
      announcementTitle: "公告标题",
      announcementText: "",
      tocke:''
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    onLoad(){
      this.axios.get("/supplier/message/getMessageNotifyInfoList", {
          headers: {
            'token': sessionStorage.getItem('token'),
            'supplierCode':'1'
          },
          params: {
            messageCode:this.active
          }
      }).then(res => {
        console.log(res);
          // 加载状态结束
        this.loading = false;
        if(res.data.code == '200'){
          this.list = res.data.data.list;
          if(res.data.data.total>=this.list.length){
            this.finished = true;
          }  
        }else{
          this.error = true;
        }
          
      }).catch(error => {
        console.log(error);
      });
    }
  },
  //接收父主键传的值
  props: ["parentActive"],
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    console.log(this.active);
    // this.getAnnouncementData();
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