<!-- 分料发货页面 -->
<template>
  <div class="SeparateFaHuo_class">
    <div v-for="(item,index) in shipmentList" :key="item.productId">
      <van-form @submit="shipmentSubmit(item.productId)">
        <van-row>
          <van-col span="24">
            <van-field label="商品名称:" :value="item.productName" label-width="65px" disabled />
          </van-col>
        </van-row>
        <van-row>
          <van-col span="24">
            <van-field label="订单号:" :value="item.orderCode" label-width="65px" disabled />
          </van-col>
        </van-row>
        <van-row>
          <van-col span="24">
            <van-field label="交货地址:" :value="item.address" label-width="65px" disabled />
          </van-col>
        </van-row>
        <van-row>
          <van-col span="12">
            <van-field label="订单数量:" :value="item.productNub+item.unit" label-width="65px" type="number" disabled />
          </van-col>
          <van-col span="12">
            <van-field label="已发货:" :value="item.sentProductNub" label-width="65px" type="number" disabled />
          </van-col>
        </van-row>
        <van-row>
          <van-col span="12">
            <van-field
              label="本次发货:"
              label-width="65px"
              type="number"
              required
              v-model="item.thisProductNub"
              placeholder="请输入数量"
              @blur="thisShipmentBlur(item.productId)"
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
        <van-row>
          <van-col span="24">
            <van-field
              readonly
              clickable
              label="预计到货时间:"
              v-model="item.predictAOG_date"
              placeholder="请选择到货时间"
              @click="clickDateTimeShowPicker(index)"
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
              v-model="item.distribution"
              placeholder="请选择配送方式"
              @click="clickDistributionShowPicker(index)"
              :rules="[{ required: true, message: '请选择到货时间' }]"
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
              v-model="item.productDESC"
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
            <van-button round type="primary" block :disabled="item.btnStatus === 1" native-type="submit">发货提交</van-button>
          </van-col>
        </van-row>
        <van-divider :style="{ color: 'chocolate', borderColor: 'chocolate'}"></van-divider>
      </van-form>
    </div>
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
      distributionColumns: [], //配送方式选择
      distributionShowPicker: false, //配送方式下拉显示控制
      dateTimeShowPicker: false, //预计到货时间显示隐藏
      pitchOnIndex:null,//选中的下标
      shipmentList: [],
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
    //加载订单产品数据
    loadOrdeProduct(){
      this.axios
        .get("/supplier/delivery/getDeliveryOrderDetailList", {
          headers: {
            'token': sessionStorage.getItem('token'),
          },
          params: {
            deliveryIds:qs.stringify(this.deliveryIds)
          }
        })
        .then(res => {
          if(res.data.code == '200'){
            this.shipmentList = this.objectBindingValue(res.data.data);
          }else{
            Toast.fail(res.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    objectBindingValue(array){//对象绑定值
      var returnArray = new Array();
      array.forEach(obj =>{
        let item = {
          deliveryId:obj.deliveryId,//发货单id 
          productId:obj.detailId,//产品ID
          productName:obj.matterName,//产品名称
          orderCode:obj.id,//订单号
          address:obj.address,//交货地址
          productNub:obj.matterNum,//订单数量
          sentProductNub:obj.finishNum,//已发产品数量
          thisProductNub:null,//本次发货数量
          unit:obj.matterUtil,//单位
          checked:false,//是否发全
          fileList:this.fileSetFileList(obj.orderFiles),//附件列表
          predictAOG_date:'',//预计到货时间
          distribution:'',//配送方式
          productDESC:'',//备注说明
          btnStatus:0//按钮状态
        }
        returnArray.push(item);
      });
      return returnArray;
    },
    thisShipmentBlur(productId) {
      //本次发货失去焦点事件
      let en = this.shipmentList.find(item => item.productId===productId);
      if(en.checked == true) return
      if((parseFloat(en.sentProductNub) + parseFloat(en.thisProductNub))>= parseFloat(en.productNub)){
        en.checked = true;
      }else{
        en.checked = false;
      }
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
    clickDateTimeShowPicker(index){
      this.pitchOnIndex = index;
      this.dateTimeShowPicker = true;
    },
    onDateTimeConfirm(value) {
      this.shipmentList[this.pitchOnIndex].predictAOG_date = moment(value).format("YYYY-MM-DD HH:mm");
      this.dateTimeShowPicker = false;
      this.pitchOnIndex = null;
    },
    clickDistributionShowPicker(index){
      this.pitchOnIndex = index;
      this.distributionShowPicker = true;
    },
    onConfirm(value) {
      //配送方式下拉选择
      this.shipmentList[this.pitchOnIndex].distribution=value
      this.distributionShowPicker = false;
      this.pitchOnIndex = null;
    },
    shipmentSubmit(productId) {
      //发货提交
      let en = this.shipmentList.find(item => item.productId===productId);
      let fileObj = [];
      en.fileList.forEach((obj,index) =>{
        let fileitem = {
          fileName:obj.file.name,
          fileDesc:obj.file.name+'_desc',
          fileSort:index
        }
        fileObj.push(fileitem)
      })
      var dataArr = new Array()
      let item = {
        deliveryId:en.deliveryId,//发货单id 		
        detailId:en.productId,//发货详细id	
        expectTime:en.predictAOG_date+':00',//预计到货时间 		
        matterNum:en.thisProductNub,//物料数量 	
        matterUtil:en.unit,//物料单位 	 		
        shippingMethod:en.distribution,//配送类型 
        description:en.productDESC,	//描述
        fileList:fileObj,//附件对象
        isFinish:en.checked==true?1:0//发货状态0:false,1:true
      }
      dataArr.push(item);
      this.axios.post('/supplier/delivery/updateDeliveryOrderDetail',dataArr
        ,{
          headers: {
            'token': sessionStorage.getItem('token'),
            'operatorId':"1"
          }
        }
      ).then(res => {
        console.log(res);
        if(res.data.code == "200"){
          en.btnStatus = 1;//点击成功后按钮设置禁用
          Toast.success('发货提交成功');
        }
      })
      .catch(error => {
        console.log(error);
        Toast.fail('发货提交失败');
      });
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
.SeparateFaHuo_class{
  .van-cell {
    padding: 5px 16px;
  }
  .checkbox_class {
    font-size: 14px;
    padding-left: 16px;
    padding-top: 5px;
  }
  // .van-divider{
  //   margin: 1px;
  // }
}
</style>