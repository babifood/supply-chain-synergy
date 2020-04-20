<!-- 对账单文件上传页面 -->
<template>
  <div class="AccountUploader_class">
    <div class="AccountUploader_title_class">
      <van-row type="flex" justify="center" align="center">
        <van-col span="24">
          <van-field :value="compName" label="对账单位:" disabled label-width="65px" />
        </van-col>
      </van-row>
      <van-row type="flex" justify="center" align="center">
        <van-col span="12">
          <van-field :value="billMonth" label="账单月份:" disabled label-width="65px" />
        </van-col>
        <van-col span="12">
          <van-field :value="billCode" label="账单单号:" disabled label-width="65px" />
        </van-col>
      </van-row>
      <van-row type="flex" justify="center" align="center">
        <van-col span="12">
          <van-field :value="totalAmountPayable" label="应付货款总额:" disabled />
        </van-col>
        <van-col span="12">
          <van-field :value="currency" label="币种:" disabled label-width="65px" />
        </van-col>
      </van-row>
      <van-row type="flex" justify="center" align="center">
        <van-col span="12">
          <van-field :value="monthlyDeductions" label="月度扣款金额:" disabled />
        </van-col>
        <van-col span="12">
          <van-cell title="扣款清单附录" icon="eye-o" @click="showAccessory=true" />
          <van-image-preview v-model="showAccessory" :images="accountImages"></van-image-preview>
        </van-col>
      </van-row>
      <van-row type="flex" justify="center" align="center">
        <van-col span="24">
          <van-field :value="actualMoney" label="实际货款金额:" disabled />
        </van-col>
      </van-row>
    </div>
    <van-divider :style="{ color: '#969799', borderColor: '#969799',margin:'0px',}" />
    <!-- 附件上传 -->
    <div>
      <van-panel title="账单扫描件:">
        <div>
          <van-uploader v-model="billFileList" :max-count="4" />
        </div>
      </van-panel>
      <van-panel title="发票扫描件:">
        <div>
          <van-uploader v-model="invoiceFileList" :max-count="4" />
        </div>
      </van-panel>
      <van-panel title="其他文件:">
        <div>
          <van-uploader v-model="restsFileList" multiple :max-count="4" />
        </div>
      </van-panel>
    </div>
    <div style="margin: 16px;">
      <van-button round block type="primary"  @click="submit">保存提交</van-button>
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
      showAccessory: false, //附件查看组件显影
      accountImages: [
        "https://img.yzcdn.cn/1.jpg",
        "https://img.yzcdn.cn/2.jpg"
      ], //附件列表
      compName: "上海金乾制冷科技有限公司", //对账单位
      billMonth: "2020-02", //账单月份
      billCode: "202003050001", //账单单号
      totalAmountPayable: 116559400, //应付总金额
      currency: "CNY", //币种
      monthlyDeductions: 34, //月度扣款总额
      actualMoney: 11659172, //实际货款
      billFileList: [], //账单附件列表
      invoiceFileList: [],//发票附件列表
      restsFileList:[],//其他文件附件列表
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    submit(){
      console.log(this.billFileList);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    
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
.AccountUploader_class {
  font-size: 14px;
  .AccountUploader_title_class {
    background-color: #fff;
    .van-cell {
      padding: 0px;
      padding-left: 5px;
      padding-right: 5px;
      padding-top: 5px;
      padding-bottom: 5px;
    }
  }
}
</style>