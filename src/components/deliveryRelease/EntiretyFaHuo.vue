<!-- 整单发货页面 -->
<template>
  <div class="EntiretyFaHuo_class">
    <van-form @submit="shipmentSubmit">
      <div v-for="(item) in entiretyList" :key="item.productId">
        <van-row>
          <van-col span="24">
            <van-field label="商品名称:" label-width="65px" :value="item.productName" disabled />
          </van-col>
        </van-row>
        <van-row>
          <van-col span="24">
            <van-field label="订单号:" label-width="65px" :value="item.orderCode" disabled />
          </van-col>
        </van-row>
        <van-row>
          <van-col span="24">
            <van-field label="交货地址:" label-width="65px" :value="item.address" disabled />
          </van-col>
        </van-row>
        <van-row>
          <van-col span="12">
            <van-field label="订单数量:" label-width="65px" type="number" :value="item.productNub+item.unit" disabled />
          </van-col>
          <van-col span="12">
            <van-field label="已发货:" label-width="65px" type="number" :value="item.sentProductNub" disabled />
          </van-col>
        </van-row>
        <van-row>
          <van-col span="12">
            <van-field
              label="本次发货:"
              label-width="65px"
              type="number"
              required
              placeholder="请输入数量"
              @blur="thisShipmentBlur(item.productId)"
              v-model="item.thisProductNub"
              :rules="[{ required: true, message: '请输入数量' }]"
            />
          </van-col>
          <van-col span="12" class="checkbox_class">
            <van-checkbox v-model="item.checked" shape="square">已发全</van-checkbox>
          </van-col>
        </van-row>
        <van-panel title="附件上传">
          <div>
            <van-row type="flex" justify="center">
              <van-col span="23">
                <van-uploader v-model="item.fileList" multiple :max-count="4" :after-read="afterRead"/>
              </van-col>
            </van-row>
          </div>
        </van-panel>
        <van-divider :style="{ color: 'chocolate', borderColor: 'chocolate'}"></van-divider>
      </div>
      <!-- 底部区域填写预计发货时间、配送方式、备注信息 -->
      <div class="footer_button">
        <van-row>
          <van-col span="24">
            <van-field
              readonly
              clickable
              label="预计到货时间:"
              :value="dateTimeValue"
              placeholder="请选择到货时间"
              @click="dateTimeShowPicker = true"
              :rules="[{ required: true, message: '请选择到货时间' }]"
            />
            <van-popup v-model="dateTimeShowPicker" position="bottom">
              <van-datetime-picker
                type="datetime"
                v-model="currentDate"
                :min-date="minDate"
                :max-date="maxDate"
                @cancel="dateTimeShowPicker = false"
                @confirm="onDateTimeConfirm"
              />
            </van-popup>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="24">
            <van-field
              readonly
              clickable
              label="配送方式:"
              :value="distributionValue"
              placeholder="请选择配送方式"
              @click="distributionShowPicker = true"
              :rules="[{ required: true, message: '请选择配送方式' }]"
            />
            <van-popup v-model="distributionShowPicker" position="bottom">
              <van-picker
                show-toolbar
                :columns="distributionColumns"
                @cancel="distributionShowPicker = false"
                @confirm="onConfirm"
              />
            </van-popup>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="24">
            <van-field
              v-model="shipmentDect"
              rows="2"
              autosize
              label="发货说明:"
              type="textarea"
              placeholder="请输入留言"
            />
          </van-col>
        </van-row>
        <van-row type="flex" justify="center">
          <van-col span="23">
            <van-button round type="primary" block :disabled="btnStatus === 1" native-type="submit">发货提交</van-button>
          </van-col>
        </van-row>
      </div>
    </van-form>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import qs from 'qs'
import moment from "moment"; //导入日期格式化
import { Toast } from "vant";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      //发货时间控制
      minDate: new Date(),
      maxDate: new Date(new Date().getFullYear()+5, 12),
      currentDate: new Date(),

      deliveryIds:[],//父页面选中的发货订单ID数组
      entiretyList:[],//整单发货商品明细列表
      shipmentDect: "",
      distributionValue: "", //配送方式
      distributionColumns: [], //配送方式选择
      distributionShowPicker: false, //配送方式下拉显示控制
      dateTimeValue: "",
      dateTimeShowPicker: false, //预计到货时间显示隐藏
      btnStatus:0,//按钮状态
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
    //加载订单产品数据
    loadOrdeProduct(){
      this.axios
        .get(" /supplier/delivery/getDeliveryOrderDetailList", {
          headers: {
            'token': sessionStorage.getItem('token'),
          },
          params: {
            deliveryIds:qs.stringify(this.deliveryIds)
          }
        })
        .then(res => {
          if(res.data.code == "200"){
            this.entiretyList = this.objectBindingValue(res.data.data);
          }else{
            Toast.fail(res.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    fileSetFileList(resultFile){//文件返回值转换
      let returnFiles = [];
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
          returnFiles.push(fileObj)
        }).catch(error => {
          console.log(error);
        });
      })
      return returnFiles;
    },
    objectBindingValue(array){//对象绑定值
      var returnArray = new Array();
      array.forEach(obj =>{
        let item = {
          deliveryId:obj.deliveryId,//发货单ID
          productId:obj.detailId,//产品ID
          productName:obj.matterName,//产品名称
          orderCode:obj.id,//订单号
          address:obj.address,//交货地址
          productNub:obj.matterNum,//订单数量
          sentProductNub:obj.finishNum,//已发产品数量
          thisProductNub:'',//本次发货数量
          unit:obj.matterUtil,//单位
          checked:false,//是否发全
          fileList:this.fileSetFileList(obj.orderFiles),//附件列表
          predictAOG_date:'',//预计到货时间
          distribution:'',//配送方式
          productDESC:''//备注说明
        }
        returnArray.push(item);
      });
      return returnArray;
    },
    thisShipmentBlur(productId) {
      //本次发货失去焦点事件
      let en = this.entiretyList.find(item => item.productId===productId);
      if((parseFloat(en.sentProductNub) + parseFloat(en.thisProductNub)) >= parseFloat(en.productNub)){
        en.checked = true;
      }else if((parseFloat(en.sentProductNub) + parseFloat(en.thisProductNub)) < parseFloat(en.productNub)){
        en.checked = false;
      }
    },
    onConfirm(value) {
      //配送方式下拉选择
      this.distributionValue = value;
      this.distributionShowPicker = false;
    },
    onDateTimeConfirm(value) {
      this.dateTimeValue = moment(value).format("YYYY-MM-DD HH:mm");
      this.dateTimeShowPicker = false;
    },
    shipmentSubmit() {
      let dateTimeValue = this.dateTimeValue;
      let distributionValue = this.distributionValue;
      let shipmentDect = this.shipmentDect;
      var dataArr = new Array()
      this.entiretyList.forEach(obj =>{
        let item = {
          deliveryId:obj.deliveryId,//发货单id 		
          detailId:obj.productId,//发货详细id	
          expectTime:dateTimeValue+':00',//预计到货时间 		
          matterNum:obj.thisProductNub,//物料数量 	
          matterUtil:obj.unit,//物料单位 	 		
          shippingMethod:distributionValue,//配送类型 
          description:shipmentDect,	//描述
          fileList:this.fileSubmitData(obj.fileList), //附件
          isFinish:obj.checked==true?1:0//发货状态0:false,1:true
        }
        dataArr.push(item);
      })
      console.log(dataArr);
      this.axios.post('/supplier/delivery/updateDeliveryOrderDetail',dataArr
        ,{
          headers: {
            'token':sessionStorage.getItem('token'),
            'operatorId':"1"
          }
        }
      ).then(res =>{
        if(res.data.code == "200"){
          this.btnStatus = 1;
          Toast.success('发货提交成功');
        }
      })
      .catch(error => {
        console.log(error);
        Toast.fail('发货提交失败');
      });
    },
    fileSubmitData(files){//文件提交数据格式转换
      let fileObj = [];
      files.forEach((obj,index) =>{
        let fileitem = {
          fileName:obj.file.name,
          fileDesc:obj.file.name+'_desc',
          fileSort:index
        }
        fileObj.push(fileitem)
      })
      return fileObj
    },
    getdistributionColumns(){//配送方式数据加载方法
       this.axios
        .get("/supplier/shippingMethod/findShippingCodeAndNameList", {
          headers: {
            'token': sessionStorage.getItem('token'),
          }
        })
        .then(res => {
          if(res.data.code == "200"){
            this.distributionConvert(res.data.data)
          }else{
            Toast.fail(res.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    distributionConvert(arr){//配送方式数据转换绑定
      arr.forEach(item =>{
        this.distributionColumns.push(item.shippingName);
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    //获取路由参数(勾选的订单ID号数组)
    // console.log(this.$route.query.orders);
    
    this.deliveryIds = this.$route.query.orders;    
    this.loadOrdeProduct();
    this.getdistributionColumns();
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
.EntiretyFaHuo_class {
  padding-bottom: 220px;
  .van-cell {
    padding: 5px 16px;
  }
  .checkbox_class {
    font-size: 14px;
    padding-left: 16px;
    padding-top: 5px;
  }
  .van-divider{
    margin: 0px;
  }
  .footer_button {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;
    box-sizing: content-box;
    width: 100%;
    height: 220px;
    background-color: #fff;
  }
}
</style>