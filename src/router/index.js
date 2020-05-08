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
  },
  {
    path: '/auction-scene',
    component: () => import('@/views/share/AuctionsScene'),
    name: 'AuctionsScene'
  },
  {
    path: '/invitation-gifts',
    component: () => import('@/views/share/InvitationGifts'),
    name: 'InvitationGifts'
  },
  {
    path: '/special-topic',
    component: () => import('@/views/share/SpecialTopic'),
    name: 'SpecialTopic'
  }
]

const router = new VueRouter({
  routes
})
router.afterEach((to, from) => {
  window.scrollTo(0, 0)
})

export default router
