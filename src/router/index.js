import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
//订单主页面
import Order from '@/components/orderConfirmation/Order'
//订单详情页面
import OrderInfo from '@/components/orderConfirmation/OrderInfo'
//发货通知主业面
import DeliveryRelease from '@/components/deliveryRelease/DeliveryRelease'
//整单发货页面
import EntiretyFaHuo from '@/components/deliveryRelease/EntiretyFaHuo'
//分料发货页面
import SeparateFaHuo from '@/components/deliveryRelease/SeparateFaHuo'
//到货通知查询页面
import ArrivalNotice from '@/components/deliveryRelease/ArrivalNotice'
//对账单主列表
import AccountMain from '@/components/statementOfAccount/AccountMain'
//对账单详情列表
import AccountInfo from '@/components/statementOfAccount/AccountInfo'
//对账单详情列表
import AccountProducInfo from '@/components/statementOfAccount/AccountProducInfo'
//对账单文件上传页面
import AccountUploader from '@/components/statementOfAccount/AccountUploader'
//个人中心
import PersonageInfo from '@/components/userSettings/PersonageInfo'
//联系巴比
import ContactUs from '@/components/userSettings/ContactUs'
//用户绑定
import CustomerBinding from '@/components/userSettings/CustomerBinding'
//信息修改
import InfoModification from '@/components/userSettings/InfoModification'
//业务资质
import Aptitude from '@/components/userSettings/Aptitude'
//业务资质修改
import AptitudeInfo from '@/components/userSettings/AptitudeInfo'
//巴比公告
import Announcement from '@/components/announcement/Announcement'
//巴比公告详情页面
import AnnouncementInfo from '@/components/announcement/AnnouncementInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Home/:token',
      name: 'Home',
      component: Home
    },
    {
      path: '/Order',
      name: 'Order',
      component: Order
    },
    {
      path: '/Order/OrderInfo/:ordersId',
      name: 'OrderInfo',
      component: OrderInfo
    },
    {
      path: '/DeliveryRelease',
      name: 'DeliveryRelease',
      component: DeliveryRelease
    },
    {
      path: '/DeliveryRelease/EntiretyFaHuo',
      name: 'EntiretyFaHuo',
      component: EntiretyFaHuo
    },
    {
      path: '/DeliveryRelease/SeparateFaHuo',
      name: 'SeparateFaHuo',
      component: SeparateFaHuo
    },
    {
      path: '/ArrivalNotice',
      name: 'ArrivalNotice',
      component: ArrivalNotice
    },
    {
      path: '/AccountMain',
      name: 'AccountMain',
      component: AccountMain
    },
    {
      path: '/AccountMain/AccountInfo/:statesId/:billMonth/:sataus',
      name: 'AccountInfo',
      component: AccountInfo
    },
    {
      path: '/AccountMain/AccountInfo/AccountProducInfo/:productId/:statesId/:billMonth',
      name: 'AccountProducInfo',
      component: AccountProducInfo
    },
    {
      path: '/AccountMain/AccountUploader/:statesId/:billMonth/:sataus',
      name: 'AccountUploader',
      component: AccountUploader
    },
    {
      path: '/PersonageInfo',
      name: 'PersonageInfo',
      component: PersonageInfo
    },
    {
      path: '/ContactUs',
      name: 'ContactUs',
      component: ContactUs
    },
    {
      path: '/CustomerBinding/:sessionId',
      name: 'CustomerBinding',
      component: CustomerBinding
    },
    {
      path: '/InfoModification',
      name: 'InfoModification',
      component: InfoModification
    },
    {
      path: '/Aptitude',
      name: 'Aptitude',
      component: Aptitude
    },
    {
      path: '/Aptitude/AptitudeInfo/:aptitudeId',
      name: 'AptitudeInfo',
      component: AptitudeInfo
    },
    {
      path: '/Announcement',
      name: 'Announcement',
      component: Announcement
    },
    {
      path: '/Announcement/AnnouncementInfo/:announcementId',
      name: 'AnnouncementInfo',
      component: AnnouncementInfo
    }
  ]
})
