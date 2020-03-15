import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/goods-detail',
    component: () => import('@/views/share/GoodsDetail'),
    name: 'GoodsDetail'
  },
  {
    path: '/special-detail',
    component: () => import('@/views/share/SpecialDetail'),
    name: 'SpecialDetail'
  },
  {
    path: '/auction-detail',
    component: () => import('@/views/share/AuctionDetail'),
    name: 'AuctionDetail'
  }
]

const router = new VueRouter({
  routes
})
router.afterEach((to, from) => {
  window.scrollTo(0, 0)
})

export default router
