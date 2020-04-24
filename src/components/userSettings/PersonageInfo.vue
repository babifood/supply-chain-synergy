<!-- 个人中心 -->
<template>
  <div class="PersonageInfo_class">
    <div>
      <!-- 居中 -->
      <van-row type="flex" justify="center" gutter="16" align="center" @click="InfoModification">
        <van-col span="6">
          <van-image
            round
            width="3rem"
            height="3rem"
            error-icon="user-circle-o"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
        </van-col>
        <van-col span="14">
          <h3>{{name}}</h3>
        </van-col>
        <van-col span="2">
          <van-icon name="arrow" />
        </van-col>
      </van-row>
    </div>
    <van-panel title="基本信息">
      <div>
        <van-cell-group>
          <van-field label="公司:" :value="compName" disabled />
          <van-field label="手机:" :value="phone" disabled />
          <van-field name="radio" label="性别:">
            <template #input>
              <van-radio-group v-model="gender" direction="horizontal" disabled>
                <van-radio name="0" label-disabled>男</van-radio>
                <van-radio name="1" label-disabled>女</van-radio>
              </van-radio-group>
            </template>
          </van-field>
        </van-cell-group>
      </div>
    </van-panel>
    <!-- <van-panel title="我的业务">
      <div>
        <van-grid clickable :column-num="3" :gutter="10">
          <van-grid-item icon="passed" text="订单确认" to="/Order" />
          <van-grid-item icon="bullhorn-o" text="发货通知" to="/DeliveryRelease" />
          <van-grid-item icon="balance-list-o" text="账单确认" to="/AccountMain" />
          <van-grid-item icon="edit" text="资料修改" to="/InfoModification" />
          <van-grid-item icon="setting-o" text="资质修改" to="/Aptitude" />
          <van-grid-item icon="chat-o" text="通知公告" to="/Announcement" />
        </van-grid>
      </div>
    </van-panel>-->
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
      userId: "",
      compName: "中饮巴比食品有限公司",
      phone: "13544333333",
      gender: "1",
      name: "泮XX"
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //资料修改
    InfoModification() {
      console.log("调用");
      this.$router.push({
        path: "/InfoModification"
      });
      // this.$router.push({
      //   path: "/InfoModification"
      //   ,query: { params: this.userId}
      // });
    },
    getPersonageInfo(){
      this.axios
        .get("/api/supplier/home/getUserInfo", {
          headers: {
            'token': '1',
            'operatorId':'1'
          }
          // params: {
          //   operatorId: '操作人ID'
          // }
        })
        .then(res=> {
          console.log(res);
          this.compName = res.data.data.companyName;
          this.phone = res.data.data.mobile;
          this.gender = res.data.data.sex+'';
          this.name = res.data.data.username;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getPersonageInfo();
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
.mui-card-header.mui-card-media {
  .mui-media-body {
    line-height: 34px;
  }
}
.mui-card-header > img:first-child {
  border-radius: 50%;
}
.mui-card-content-inner {
  padding: 0px;
}

.mui-table-view.mui-grid-view {
  padding: 0px;
  .mui-table-view-cell {
    border: none;
    padding: 6px 8px;
  }
}
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: none;
  img {
    width: 60px;
    height: 60px;
  }
  //图标样式
  // .mui-table-view-cell>a>.mui-badge{
  //   top: 20%;
  //   right: 20px;
  //   color:red;
  // }
}
</style>