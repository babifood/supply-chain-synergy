<!-- 联系巴比 -->
<template>
  <div class="ContactUs_class">
    <van-panel title="值班信息" icon="user-circle-o">
      <div>
        <van-field type="text" :value="operatorOnDuty" label="值班人员:" disabled />
        <van-field type="text" :value="phone" label="联系电话:" disabled />
      </div>
    </van-panel>
    <van-panel title="业务投诉" icon="phone-circle-o">
      <div>
        <van-field type="text" :value="complaintDH" label="电话投诉:" disabled />
        <van-field type="text" :value="complaintSJ" label="手机投诉:" disabled />
        <van-field type="text" :value="complaintWX" label="微信投诉:" disabled />
      </div>
    </van-panel>
    <van-panel title="廉洁/反腐举报" icon="envelop-o">
      <div>
        <van-field type="text" :value="supervisionEmail" label="廉洁监督:" disabled />
        <van-field type="text" :value="informEmail" label="反腐举报:" disabled />
      </div>
    </van-panel>
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
      operatorOnDuty: "陈某某/李某某", //值班人员信息
      phone: "13500000000/18900000000", //值班人员联系方式
      complaintDH: "021-44444444", //投诉电话
      complaintSJ: "13500000000", //投诉手机
      complaintWX: "ZYBBCGTS", //投诉手机
      supervisionEmail: "panguanhua@zy1111.com", //监督邮箱
      informEmail: "panguanhua@zy1111.com" //举报邮箱
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    loadData(){
      this.axios
        .get("/api/supplier/home/getHomeHelperInfo", {
          headers: {
            'token': "1"
          }
          // params: {
          //   operatorId: '操作人ID'
          // }
        })
        .then(res=> {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.loadData();
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
.mui-card-header > img:first-child {
  border-radius: 50%;
}
.mui-card-header.mui-card-media {
  .mui-media-body {
    font-size: 16px;
    line-height: 30px;
  }
}
.mui-card-content {
  p {
    margin-left: 20px;
    margin: 10px;
    label {
      margin-right: 5px;
    }
  }
}
</style>