import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
// 全局引入vant
// import Vant from 'vant'
// import 'vant/lib/vant-css/index.css'
// Vue.use(Vant)

// 按需引入vant，使用babel-plugin-import插件
import {Button, Row, Col, Swipe, SwipeItem, Lazyload} from 'vant'
Vue.use(Router).use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload)

export default new Router({
  routes: [
    {path: '/', name: 'ShoppingMall',component: ShoppingMall}
  ]
})
