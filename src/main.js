// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';//导入Vant框架
import axios from 'axios';//导入axios
import VueAxios from 'vue-axios';//导入axios
Vue.use(VueAxios,axios);//添加Vant依赖

import 'vant/lib/index.css';//导入Vant样式
Vue.use(Vant);//添加Vant依赖


import { Lazyload } from 'vant';
Vue.use(Lazyload);
//自定义组件
//首页
import Home from './components/Home.vue'
//订单主页面组件
import Order from './components/orderConfirmation/Order.vue'
//订单详情页面组件
import OrderInfo from './components/orderConfirmation/OrderInfo.vue'
//发货通知主页面
import DeliveryRelease from './components/deliveryRelease/DeliveryRelease.vue'
//整单发货页面
import EntiretyFaHuo from './components/deliveryRelease/EntiretyFaHuo.vue'
//分料发货页面
import SeparateFaHuo from './components/deliveryRelease/SeparateFaHuo.vue'
//到货通知查询页面
import ArrivalNotice from './components/deliveryRelease/ArrivalNotice.vue'
//对账单组件
//对账单主页面
import AccountMain from './components/statementOfAccount/AccountMain.vue'
//对账单详情页面
import AccountInfo from './components/statementOfAccount/AccountInfo.vue'
//对账单物料详情页面
import AccountProducInfo from './components/statementOfAccount/AccountProducInfo.vue'
//对账单文件上传页面
import AccountUploader from './components/statementOfAccount/AccountUploader.vue'
//个人中心组件
//个人中心
import PersonageInfo from './components/userSettings/PersonageInfo.vue'
//联系巴比
import ContactUs from './components/userSettings/ContactUs.vue'
//用户绑定
import CustomerBinding from './components/userSettings/CustomerBinding.vue'
//信息修改
import InfoModification from './components/userSettings/InfoModification.vue'
//业务资质
import Aptitude from './components/userSettings/Aptitude.vue'
//业务资质修改
import AptitudeInfo from './components/userSettings/AptitudeInfo.vue'
//巴比公告
import Announcement from './components/announcement/Announcement.vue'
//巴比公告详情
import AnnouncementInfo from './components/announcement/AnnouncementInfo.vue'

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App,
    Home,
    Order,
    OrderInfo,
    DeliveryRelease,
    EntiretyFaHuo,
    SeparateFaHuo,
    ArrivalNotice,
    AccountMain,
    AccountInfo,
    AccountProducInfo,
    AccountUploader,
    PersonageInfo,
    ContactUs,
    CustomerBinding,
    InfoModification,
    Aptitude,
    AptitudeInfo,
    Announcement,
    AnnouncementInfo
  },
  render: c => c(App)
})
