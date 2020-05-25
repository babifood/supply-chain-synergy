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
      statesId:this.$route.params.statesId,
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
      submitFaleValues:[],//保存提交需要的文件参数
      compressFile:null,//压缩的图片
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
      this.uploadImg(file);
      const formData = new FormData();  // 声明一个FormData对象
	    formData.append("files", file.file);
      this.axios.post('/supplier/file/multiFileUpload',formData,
          {
            headers: {
              'token': sessionStorage.getItem('token'),
              "content-type": "multer/form-data"
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
    uploadImg(file) {//压缩图片
      // 大于1.5MB的jpeg和png图片都缩小像素上传
      if(/\/(?:jpeg|png)/i.test(file.file.type)&&file.file.size>1500000) {
        // 创建Canvas对象(画布)
        let canvas =  document.createElement('canvas')  
        // 获取对应的CanvasRenderingContext2D对象(画笔)
        let context = canvas.getContext('2d') 
        // 创建新的图片对象 
        let img = new Image()
        // 指定图片的DataURL(图片的base64编码数据)
        img.src = file.content
        // 监听浏览器加载图片完成，然后进行进行绘制
        img.onload = () => {
          // 指定canvas画布大小，该大小为最后生成图片的大小
          canvas.width = 400
          canvas.height = 300
          /* drawImage画布绘制的方法。(0,0)表示以Canvas画布左上角为起点，400，300是将图片按给定的像素进行缩小。
          如果不指定缩小的像素图片将以图片原始大小进行绘制，图片像素如果大于画布将会从左上角开始按画布大小部分绘制图片，最后的图片就是张局部图。*/ 
          context.drawImage(img, 0, 0, 400, 300)
          // 将绘制完成的图片重新转化为base64编码，file.file.type为图片类型，0.92为默认压缩质量
          file.content = canvas.toDataURL(file.file.type, 0.92) 
          this.compressFile = file.content;
        }                       
      }else{
        // 不做处理的jpg和png以及gif直接保存
        this.compressFile = file.content;
      }
    },
    uploadFileVelue(array,fileDesc){
      array.forEach(obj =>{
        let f = {
          statesId:this.statesId,
          fileId:obj.fileId,
          fileName:obj.file.name,
          fileDesc:fileDesc
        }
        this.submitFaleValues.push(f)
      })
    },
    submit(){//对账单附件上传提交
      this.uploadFileVelue(this.billFileList,'bill')
      this.uploadFileVelue(this.invoiceFileList,'invoice')
      this.uploadFileVelue(this.restsFileList,'rests')
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
            Toast.success('附件上传保存成功');
          }else{
            Toast.fail(res.message);
          }
        })
        .catch(function (error) {
          Toast.fail(error);
        });
    },
    //获取附件数据
    getAccessoryData(){
      this.axios.get("/supplier/state/getStateOrderFileDetail", {
          headers: {
            'token': sessionStorage.getItem('token')
          },
          params: {
            statesId: this.statesId,
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
          this.fileConvertTypeListFile(res.data.data.fileInfoMap)
        }else{
          Toast.fail(res.data.msg);
        }  
      }).catch(error => {
        console.log(error);
      });
    },
    fileConvertTypeListFile(fileObjs){
      this.fileSetFileList(fileObjs.bill,this.billFileList);
      this.fileSetFileList(fileObjs.invoice,this.invoiceFileList);
      this.fileSetFileList(fileObjs.rests,this.restsFileList);
    },
    fileSetFileList(resultFile,fileTypeList){
      resultFile.forEach(f =>{
          this.axios.get("/supplier/file/fileDownload", {
            headers: {
              'token': sessionStorage.getItem('token')
            },
            responseType: 'arraybuffer',
            params: {
              fileId: f.fileId
            }
        }).then(res => {
          let fileObj = {
            content:'data:image/png;base64,'+ btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), '')),
            file:{
              name:f.fileName
            },
            fileId:f.fileId,
            status:'done'
          }
          fileTypeList.push(fileObj)
        }).catch(error => {
          console.log(error);
        });
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