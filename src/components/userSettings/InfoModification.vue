<!-- 信息修改 -->
<template>
  <div class="InfoModification_class">
    <van-form @submit="onSubmit">
      <van-panel title="人员信息" icon="user-circle-o">
        <div>
          <van-field
            v-model="userName"
            name="人员"
            label="人员:"
            placeholder="人员"
            readonly
          />
          <van-field
            v-model="newUserName"
            name="人员新"
            label="人员新:"
            placeholder="人员新"
            :rules="[{ required: true, message: '请填写人员新' }]"
          />
        </div>
      </van-panel>
      <van-panel title="手机号码" icon="phone-circle-o">
        <div>
          <van-field
            type="tel"
            v-model="mobile"
            name="号码"
            label="号码:"
            placeholder="请填写手机号码"
            readonly
          />
          <van-field
            type="tel"
            v-model="newMobile"
            name="号码新"
            label="号码新:"
            placeholder="请填写新手机号码"
            :rules="[{ validator, message: '手机号格式不正确' }]"
          />
        </div>
        <van-field name="radio" label="性别:">
          <template #input>
            <van-radio-group v-model="gender" direction="horizontal">
              <van-radio name='0'>男</van-radio>
              <van-radio name='1'>女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </van-panel>
      <van-panel title="关联账号" icon="friends-o" desc="关联账户权限状态，关闭后无权查看业务数据">
        <div v-for="item in accountList" :key="item.userId">
          <van-row type="flex" justify="center" align="center">
            <van-col span="7">{{item.username}}</van-col>
            <van-col span="10"></van-col>
            <van-col span="4">
              <van-switch v-model="item.status" />
            </van-col>
          </van-row>
        </div>
      </van-panel>
      <!-- <div style="margin: 16px;">
        <van-button round block type="primary" @click="submit">修改提交</van-button>
      </div> -->
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
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
      userName: "",
      newUserName: '',
      mobile: "",
      newMobile: '',
      gender: '0',
      accountList: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    validator(val) {
      return /^1[3456789]\d{9}$/.test(val);
    },
    onSubmit(values) {
      let arr = new Array()
      this.accountList.forEach(obj =>{
         let item ={
           userId:obj.userId,
           username:obj.username,
           status:obj.status==true?1:2
         }
         arr.push(item);
      })
      this.axios.post('/supplier/home/updateUserInfo',
          {
            'newUsername': this.newUserName,
            'newMobile': this.newMobile,
            'sex': this.gender,
            'userRelationBo': arr
          },{
            headers: {
              'token': sessionStorage.getItem('token'),
              'operatorId':'1'
            }
          }
        ).then(function (res) {
          console.log(res);
          Toast.success('资质提交成功');
        })
        .catch(function (error) {
          console.log(error);
          Toast.fail('资质提交失败');
        });
    },
    getAccountListDate() {
      // for (let i = 0; i < 3; i++) {
      //   let listItem = {
      //     accountId: i,
      //     accountName: "泮XXX" + i,
      //     checked: true
      //   };
      //   this.accountList.push(listItem);
      // }
      this.axios
        .get("/supplier/home/getUserRelation", {
          headers: {
            'token': sessionStorage.getItem('token'),
            'operatorId':'1'
          }
          // params: {
          //   operatorId: '操作人ID'
          // }
        })
        .then(res=> {
          console.log(res);
          this.userName = res.data.data.username;
          this.mobile = res.data.data.mobile;
          this.newUserName = res.data.data.username;
          this.newMobile = res.data.data.mobile;
          this.gender = res.data.data.sex+'';
          this.accountList = this.convert(res.data.data.userRelations);
        })
        .catch(error => {
          console.log(error);
        });
    },
    convert(arr){
      let returnArr = new Array()
      arr.forEach(obj =>{
        let item = {
          userId : obj.userId,
          username : obj.username,
          status : obj.status == 1?true:false
        }
        returnArr.push(item);
      })
      return returnArr;
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getAccountListDate();
    // console.log(this.accountList);
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