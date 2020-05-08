<!-- 用户绑定 -->
<template>
  <div class="CustomerBinding_class">
    <van-panel title="用户信息">
      <div>
        <van-form @submit="onSubmit">
          <van-field
            v-model="personName"
            name="业务联系人"
            label="业务联系人:"
            placeholder="请填写业务联系人"
            :rules="[{ required: true, message: '请填写业务联系人' }]"
          />
          <van-field
            type="tel"
            v-model="mobile"
            name="手机号码"
            label="手机号码:"
            placeholder="请填写手机号码"
            :rules="[{ validator, message: '手机号格式不正确' }]"
          />
          <van-field
            v-model="invitationCode"
            name="邀请码"
            label="邀请码:"
            placeholder="请填写邀请码"
            :rules="[{ required: true, message: '请填写邀请码' }]"
          />
          <van-field name="radio" label="性别:">
            <template #input>
              <van-radio-group v-model="gender" direction="horizontal">
                <van-radio name="1">男</van-radio>
                <van-radio name="2">女</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">提交</van-button>
          </div>
        </van-form>
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
      personName: "",
      mobile: "",
      invitationCode: "",
      gender: "1",
      sessionId:'',
      token:''
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    validator(val){
        return /^1[3456789]\d{9}$/.test(val);
    },
    onSubmit() {
      this.axios.post('/auth/login/loginWeChat',
          {
            'invitCode': this.invitationCode,
            'mobile': this.mobile,
            'userName': this.personName
          },{
            headers: {
              'token': '1',
              'sessionId': this.sessionId
            }
          }
        ).then(res =>{
          if(res.data.code == '200'){
            this.token = res.headers.token
            this.$router.push({ path:'/Home/'+this.token})
          }
        })
        .catch(error => {
          console.log(error);
          Toast.fail('绑定失败');
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.sessionId = this.$route.params.sessionId;
    console.log(this.sessionId);
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