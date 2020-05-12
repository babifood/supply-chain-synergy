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
          <van-uploader v-model="billFileList" :max-count="4" :after-read="afterRead"/>
        </div>
      </van-panel>
      <van-panel title="发票扫描件:">
        <div>
          <van-uploader v-model="invoiceFileList" :max-count="4" :after-read="afterRead"/>
        </div>
      </van-panel>
      <van-panel title="其他文件:">
        <div>
          <van-uploader v-model="restsFileList" multiple :max-count="4" :after-read="afterRead"/>
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
import qs from 'qs'
import { Toast } from "vant";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      //请求参数
      orderId:this.$route.params.orderId,
      fileSataus:this.$route.params.status,

      showAccessory: false, //附件查看组件显影
      accountImages: [
        "https://img.yzcdn.cn/1.jpg",
        "https://img.yzcdn.cn/2.jpg"
      ], //附件列表
      compName: "", //对账单位
      billMonth: "", //账单月份
      billCode: "", //账单单号
      totalAmountPayable: 0, //应付总金额
      currency: "CNY", //币种
      monthlyDeductions: 0, //月度扣款总额
      actualMoney: 0, //实际货款
      billFileList: [], //账单附件列表
      invoiceFileList: [],//发票附件列表
      restsFileList:[],//其他文件附件列表
      submitFaleValues:[]//保存提交需要的文件参数
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    afterRead(file) {
      file.status = 'uploading';
      file.message = '上传中...';
      const formData = new FormData();  // 声明一个FormData对象
	    formData.append("files", file);
      this.axios.post('/supplier/file/multiFileUpload',formData,
          {
            headers: {
              'token': sessionStorage.getItem('token'),
              "content-type": "multipart/form-data"
            }
          }
        ).then(function (res) {
          console.log(res);
          if(res.data.code=='200'){
            file.status = 'done';
            file.message = '上传成功';
          }else{
            file.status = 'failed';
            file.message = '上传失败';
          }
        })
        .catch(function (error) {
          console.log(error);
          file.status = 'failed';
          file.message = '上传失败';
        });
    },
    uploadFileVelue(array,fileDesc){
      array.forEach(file =>{
        let f = {
          stateOrderId:this.billCode,
          fileId:'',
          fileName:file.file.name,
          fileDesc:fileDesc
        }
        this.submitFaleValues.push(f)
      })
    },
    submit(){//对账单附件上传提交
      uploadFileVelue(this.billFileList,'账单扫描件')
      uploadFileVelue(this.restsFileList,'发票扫描件')
      uploadFileVelue(this.submitFaleValues,'其他文件')
      console.log(this.submitFaleValues);
      this.axios.post('/supplier/state/updateStateOrderFile',this.submitFaleValues,
          {
            headers: {
              'token': sessionStorage.getItem('token'),
            }
          }
        ).then(function (res) {
          console.log(res);
          if(res.data.code=='200'){
            
          }else{
           
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //获取附件数据
    getAccessoryData(){
      this.axios.get("/supplier/state/getStateOrderFileDetail", {
          headers: {
            'token': sessionStorage.getItem('token')
          },
          params: {
            stateOrderId: this.orderId,
            fileStatus:this.fileSataus
          }
      }).then(res => {
        console.log(res);
        if(res.data.code == '200'){
          this.compName = res.data.data.supplierName; //对账单位
          this.billMonth = res.data.data.yearmonth; //账单月份
          this.billCode = res.data.data.stateOrderId; //账单单号
          this.totalAmountPayable = res.data.data.sumPayable; //应付总金额
          this.currency = res.data.data.currency; //币种
          this.monthlyDeductions = res.data.data.monthWithhold; //月度扣款总额
          this.actualMoney = res.data.data.actualSum;//实际货款
          //更具后台返回的文件数组来组织对应的文件数组
          this.fileConvertTypeListFile(res.data.data.fileInfoMap.str)
        }else{
          Toast.fail(res.data.msg);
        }  
      }).catch(error => {
        console.log(error);
      });
    },
    fileConvertTypeListFile(fileList){
      fileList.forEach(obj =>{
        console.log(obj);
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // console.log(this.$route.params);
    this.getAccessoryData();
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