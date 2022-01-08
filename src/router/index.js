import Vue from 'vue'
import Router from 'vue-router'
import ProductDetail from '@/components/ProductDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ProductDetail',
      component: ProductDetail
    }
  ],
  mode: 'history'
})
