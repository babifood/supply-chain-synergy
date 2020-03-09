<!-- 分料发货页面 -->
<template>
  <div class="SeparateFaHuo_class">
    <div v-for="(item,index) in shipmentList" :key="item.productId">
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
          <van-field label="订单数量:" :value="item.orderNum" label-width="65px" type="number" disabled />
        </van-col>
        <van-col span="12">
          <van-field label="已发货:" :value="item.numOfissued" label-width="65px" type="number" disabled />
        </van-col>
      </van-row>
      <van-row>
        <van-col span="12">
          <van-field
            label="本次发货:"
            label-width="65px"
            type="number"
            required
            v-model="item.thisShipmentNum"
            placeholder="请输入数量"
            @blur="thisShipmentBlur(item.productId)"
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
              <van-uploader v-model="item.fileList" multiple :max-count="4" />
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
            v-model="item.dateTimeValue"
            placeholder="请选择到货时间"
            @click="clickDateTimeShowPicker(index)"
          />
          <van-popup v-model="dateTimeShowPicker" position="bottom">
            <van-datetime-picker
              type="datetime"
              v-model="currentDate"
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
            v-model="item.distributionValue"
            placeholder="请选择配送方式"
            @click="clickDistributionShowPicker(index)"
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
            v-model="item.shipmentDect"
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
          <van-button round type="primary" block @click="shipmentSubmit(item.productId)">发货提交</van-button>
        </van-col>
      </van-row>
      <van-divider :style="{ color: 'chocolate', borderColor: 'chocolate'}"></van-divider>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import moment from "moment"; //导入日期格式化
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      distributionColumns: ["集装箱卡车", "快递配送"], //配送方式选择
      distributionShowPicker: false, //配送方式下拉显示控制
      currentDate: new Date(),
      dateTimeShowPicker: false, //预计到货时间显示隐藏
      pitchOnIndex:null,//选中的下标
      shipmentList: [
        {
          productId:1,
          productName:'阳政线馒头切刀轴YJ-1510L(切刀座+切刀杆)',//产品名称
          orderCode:'4500000001',//订单编号
          address:'上海市松江区茸江路789号',//配送地址
          orderNum:3000,//订单数量
          numOfissued:2000,//已发货数
          thisShipmentNum:null,//本次发货
          checked:false,//是否发全
          fileList: [],//附件列表
          dateTimeValue: "",//预计到货时间
          distributionValue: "", //配送方式
          shipmentDect:''//备注
        },
        {
          productId:2,
          productName:'阳政线馒头切刀轴YJ-1510L(切刀座+切刀杆)',//产品名称
          orderCode:'4500000002',//订单编号
          address:'上海市松江区茸江路789号',//配送地址
          orderNum:3000,//订单数量
          numOfissued:2000,//已发货数
          thisShipmentNum:null,//本次发货
          checked:false,//是否发全
          fileList: [],//附件列表
          dateTimeValue: "",//预计到货时间
          distributionValue: "", //配送方式
          shipmentDect:''//备注
        },
        {
          productId:3,
          productName:'阳政线馒头切刀轴YJ-1510L(切刀座+切刀杆)',//产品名称
          orderCode:'4500000002',//订单编号
          address:'上海市松江区茸江路789号',//配送地址
          orderNum:3000,//订单数量
          numOfissued:2000,//已发货数
          thisShipmentNum:null,//本次发货
          checked:false,//是否发全
          fileList: [],//附件列表
          dateTimeValue: "",//预计到货时间
          distributionValue: "", //配送方式
          shipmentDect:''//备注
        }
      ]
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    thisShipmentBlur(productId) {
      //本次发货失去焦点事件
      let en = this.shipmentList.find(item => item.productId===productId);
      if((parseFloat(en.numOfissued) + parseFloat(en.thisShipmentNum))>= parseFloat(en.orderNum)){
        en.checked = true;
      }else{
        en.checked = false;
      }
    },
    clickDateTimeShowPicker(index){
      this.pitchOnIndex = index;
      this.dateTimeShowPicker = true;
    },
    onDateTimeConfirm(value) {
      this.shipmentList[this.pitchOnIndex].dateTimeValue = moment(value).format("YYYY-MM-DD HH:mm");
      this.dateTimeShowPicker = false;
      this.pitchOnIndex = null;
    },
    clickDistributionShowPicker(index){
      this.pitchOnIndex = index;
      this.distributionShowPicker = true;
    },
    onConfirm(value) {
      //配送方式下拉选择
      this.shipmentList[this.pitchOnIndex].distributionValue=value
      this.distributionShowPicker = false;
      this.pitchOnIndex = null;
    },
    shipmentSubmit(productId) {
      //发货提交
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    //获取路由参数(勾选的订单ID号数组)
    console.log(this.$route.params);
    console.log(this.shipmentList);
  },
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