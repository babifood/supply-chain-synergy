<!-- 业务资质列表 -->
<template>
  <div class="Aptitude_class">
    <!-- 列表标题 -->
    <van-sticky :offset-top="46">
      <div class="list_head">
        <van-row type="flex" justify="center">
          <van-col span="8">证件名称</van-col>
          <van-col span="7">有效截止日</van-col>
          <van-col span="5">扫描件</van-col>
          <van-col span="1"></van-col>
        </van-row>
      </div>
    </van-sticky>

    <router-link
      :to="'/Aptitude/AptitudeInfo/'+item.exNumberId"
      class="list_item"
      v-for="item in aptitudeList"
      :key="item.exNumberId"
      tag="div"
    >
      <van-row type="flex" justify="center">
        <van-col span="8">{{item.exNumberLx}}</van-col>
        <van-col span="7">{{item.exNumberTo}}</van-col>
        <van-col span="5">{{item.status}}</van-col>
        <van-col span="1">
          <van-icon name="arrow" />
        </van-col>
      </van-row>
      <div class="van-hairline--bottom"></div>
    </router-link>
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
      aptitudeList: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getAptitudeData() {
      this.axios.get("/api/supplier/provider/getProviderCertificateList", {
          headers: {
            'token': "1",
            'supplierCode': "1"
          },
          // params: {
          // }
      }).then(res => {
        console.log(res);
        if(res.data.code == '200'){
          this.aptitudeList = res.data.data;
        }else{
          Toast.fail(res.data.message);
        }
          
      }).catch(error => {
        console.log(error);
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getAptitudeData();
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
.list_head {
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}
.list_item {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
}
</style>