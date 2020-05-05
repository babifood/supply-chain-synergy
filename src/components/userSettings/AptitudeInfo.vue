<!-- 资质修改页面 -->
<template>
  <div class="AptitudeInfo_class">
    <van-panel title="修改资质">
      <div>
        <van-row>
          <van-col span="24">
            <van-field label="资质名称:" :value="aptitudeName" label-width="65px" disabled />
          </van-col>
        </van-row>
        <van-row>
          <van-col span="14">
            <van-field label="资质有效期:" :value="begDate"  disabled />
          </van-col>
          <van-col span="10">
            <van-field label="到" :value="endDate" label-width="25px" disabled />
          </van-col>
        </van-row>
        <van-row>
          <van-col span="14">
            <van-field
              readonly
              clickable
              name="calendar"
              :value="newBegDate"
              label="资质有效期新:"
              placeholder="选择日期"
              @click="showBegCalendar = true"
            />
            <van-calendar v-model="showBegCalendar" @confirm="onBegConfirm" />
          </van-col>
          <van-col span="10">
            <van-field
              readonly
              clickable
              name="calendar"
              :value="newEndDate"
              label-width="25px"
              label="到"
              placeholder="选择日期"
              @click="showEndCalendar = true"
            />
            <van-calendar v-model="showEndCalendar" @confirm="onEndConfirm" />
          </van-col>
        </van-row>
        <van-panel title="附件上传">
          <div>
            <van-row type="flex" justify="center">
              <van-col span="23">
                <van-uploader v-model="fileList" multiple :max-count="4" />
              </van-col>
            </van-row>
          </div>
        </van-panel>
        <van-row type="flex" justify="center">
          <van-col span="23">
            <van-button round type="primary" block @click="submit">保存提交</van-button>
          </van-col>
        </van-row>
      </div>
    </van-panel>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import moment from 'moment'//导入日期格式化
import { Toast } from "vant";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      //请求参数
      aptitudeId:this.$route.params.aptitudeId,

      aptitudeName: "证件名称1",
      begDate: "2020-03-03",
      endDate: "2020-03-31",
      newBegDate:'',
      newEndDate:'',
      showBegCalendar: false,
      showEndCalendar: false,
      fileList:[]
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //获取供应商详情
    getAptitudeinfo(){
      this.axios.get("/supplier/provider/getProviderCertificateInfo", {
          headers: {
            'token': "1",
          },
          params: {
            certificateId:this.aptitudeId
          }
      }).then(res => {
        if(res.data.code == '200'){
          this.aptitudeName = res.data.exNumberLx;
          this.begDate = res.data.exNumberFrom;
          this.endDate = res.data.exNumberTo;
        }else{
          Toast.fail(res.data.message);
        }  
      }).catch(error => {
        console.log(error);
      });
    },
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD");
      // return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    onBegConfirm(date) {
      this.newBegDate = this.formatDate(date);
      this.showBegCalendar = false;
    },
    onEndConfirm(date) {
      this.newEndDate = this.formatDate(date);
      this.showEndCalendar = false;
    },
    submit(){
      if(this.newEndDate == ''&& this.newBegDate == ''){
          Toast.fail('日期不能为空');
      }else{
        this.axios.post('/supplier/provider/updateProviderCertificateInfo',
          {
            'certificateId': this.aptitudeId,
            'endDate': this.newEndDate,
            'imageUrl': this.fileList,//参数格式不匹配
            'startDate': this.newBegDate
          },{
            headers: {
              token: '1',
              operatorId : '1'
            }
          }
        ).then(res =>{
          Toast.fail(res.data.message);
        })
        .catch(error => {
          console.log(error);
          Toast.fail('资质提交失败');
        });
      }
      
      
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getAptitudeinfo();
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
</style>