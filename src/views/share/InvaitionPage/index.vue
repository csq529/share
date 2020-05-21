<template>
  <div class="invation-page">
    <div class="top">
      <div class="text">
        <div v-if="userInfo.userstate == 1">
          <p>赶快领取新人礼，</p>
          <p>让美好生活一拍即合吧～</p>
        </div>
        <div v-else-if="userInfo.userstate == 3">
          <p>恭喜你领券成功，</p>
          <p>快去和你的拍品不期而遇吧～</p>
        </div>
        <p v-else-if="userInfo.userstate == 2">新人礼券包仅限新用户领取～</p>
        <div v-else-if="userInfo.userstate == 4">
          <p>不能邀请自己哦～</p>
          <p>快去邀请好友下单吧</p>
        </div>
      </div>
      <div class="go-btn">
        <img v-if="userInfo.userstate == 1" @click="getCoupon" class="go-btn_img" src="../../../assets/img/get-now.png" alt="">
        <img v-else  @click="goHome" class="go-btn_img" src="../../../assets/img/gosee-btn.png" alt="">
      </div>

    </div>
    <div class="recommend-annual">
          <div class="recommend-title">
            <img class="recommend-title_img" src="../../../assets/img/aunal-title.png" alt="">
          </div>
          <div class="auctions-scene_item" v-for="(item, index) in recommendList" :key="index" @click="jumpAuction(item.linkAddress)">
            <div class="scene-item_header">
              <img class="item-header_pic" :src="item.auctionImage" alt="">
              <div class="scene-status">
                <div class="status" :class="item.auctionStatusDesc==='已结束'?'finish': item.auctionStatusDesc === '竞拍中' ? 'previewing' : item.countdownLabel==='竞拍中' ? 'auctioning' : item.auctionStatusDesc==='即将结拍'? 'will-end' : item.auctionStatusDesc === '预展中' ? 'previewing' : item.auctionStatusDesc === '拍卖中' ? 'auctioning' : ''">{{ item.auctionStatusDesc }}</div>
                <div class="time">{{ item.countdownTime }}</div>
              </div>
            </div>
            <div class="scens-item_info">
              <p class="secens-item_name">{{ item.auctionName }}</p>
              <p class="secens-info">
                <span>{{ item.lotCount }}件拍品</span>
                <span class="weiguan">{{ item.watchCount }}次围观</span>
                <span>{{ item.offerCount }}次出价</span>
              </p>
            </div>
          </div>
    </div>
    <!-- <van-popup v-model="showCoupon" class="coupon-pop">
      <p class="coupon-title">恭喜获得以下优惠券</p>
      <div class="coupon-wrapper">
        <ul class="coupon-list">
          <li class="coupon-item"></li>
        </ul>
      </div>
      <img class="close-coupon" src="../../../assets/img/close-coupon.png" alt="">
    </van-popup> -->
    <Dialog v-show="showCoupon" @hide="showCoupon = false" class="coupon-dialog">
      <div class="coupon-dialog_wrapper">
        <img class="title" src="../../../assets/img/coupon-title.png" alt="">
        <div class="coupon-item">
          <div class="coupon-left">
            <p>全场通用</p>
            <p>仅限拍品</p>
          </div>
          <div class="coupon-right">
            <p>
              <span class="unit">¥</span>
              <span class="money">100</span>
            </p>
            <p class="text">无门槛</p>
          </div>
        </div>
        <div class="coupon-item">
          <div class="coupon-left">
            <p>全场通用</p>
            <p>仅限拍品</p>
          </div>
          <div class="coupon-right">
            <p class="coupon-type">
              包邮券
            </p>
            <p class="text">无门槛</p>
          </div>
        </div>
        <p class="tips">优惠券可在“我的-我的资产-优惠券”中查看</p>
      </div>
    </Dialog>
  </div>
</template>

<script>
import Dialog from '@/components/Dialog'
import { getStatusAndTime } from '@/untils/util'
export default {
  data() {
    return {
      showCoupon: false,
      userInfo: {},
      recommendList: [],
      env: 'ios'
    }
  },
  components: {
    Dialog
  },
  methods: {
    // 跳转小程序首页
    goHome() {
      console.log('env:', this.env)
      if(this.env === 'wx') {
        console.log('wx:', wx)
        wx.miniProgram.switchTab({ url: '/pages/home/home' })
      }
    },
    // 点击拍场跳转到小程序
    jumpAuction(url) {
      if (this.env === 'wx') {
        wx.miniProgram.navigateTo({ url: url })
      }
    },
    getCoupon() {
      let params = {
        md5Str: this.$route.query.md5Str
      }
      this.$http.fetchGet(this.URL.receiveTicket, params).then(res => {
        if (res.code === 100) {
          this.showCoupon = true
          console.log('res:', res.data)
        } else if (res.code == 1007) {
          wx.miniProgram.navigateTo({ url: '/pages/register/index' })
        }
      })
    },
    attendShareActivity() {
      let params = {
        invitationCode: this.$route.query.invitationCode || 274,
        openid: this.$route.query.openid || 'dsds2323DD',
        md5Str: this.$route.query.md5Str
      }
      this.$http.fetchGet(this.URL.attendShareActivity, params).then(res => {
        console.log('attendShareActivity:', res)
        if (res.code === 100) {
          this.userInfo = res.data
        }
      })
    },
    queryRecAuction() {
      let params = {
        md5Str: this.$route.query.md5Str
      }
      this.$http.fetchGet(this.URL.queryRecAuction, params).then(res => {
        if (res.code === 100) {
          this.recommendList = res.data.auctionList
          this.recommendList && this.recommendList.forEach(item => {
            item.countdownLabel = getStatusAndTime(new Date(item.startTimestamp).getTime(), new Date(item.endTimestamp).getTime()).countdownLabel
            item.countdownTime = getStatusAndTime(new Date(item.startTimestamp).getTime(), new Date(item.endTimestamp).getTime()).countdownTime
          })
          console.log('recommendList:', res.data)
        }
      })
    },
    testMobileType () {
        const u = navigator.userAgent
        const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
        const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            wx.miniProgram.getEnv((res)=>{
              if (res.miniprogram) {        //在小程序
                this.env = 'wx'                   
              } else {                   //在公众号
              }
            })
        }else{     //都不在
          if (isAndroid) {
            this.env = 'android'
          } else if (isiOS) {
            this.env = 'ios'
          }
        }
    }
  },
  mounted() {
    document.title = '邀好友，赚奖金'
    this.testMobileType()
    this.queryRecAuction()
    this.attendShareActivity()
  }
}
</script>

<style scoped lang="stylus">
.previewing {
  color #fff !important
}
.rightStart {
  color #B6110D !important
}
.end {
  color #666666 !important
}
.coupon-dialog
  .coupon-dialog_wrapper
    padding .52rem .24rem .2rem
    .coupon-item + .coupon-item
      margin-top .16rem
    .coupon-item
      background url('../../../assets/img/coupon-bg.png') no-repeat center
      background-size 5.14rem 1.44rem
      width 5.14rem
      height 1.44rem
      display flex
      // justify-content space-between
      align-items center
      .coupon-left
        padding-left .5rem
        font-size .3rem
        color #F5A623
      .coupon-right
        padding-left .9rem
        .coupon-type
          font-size .4rem
          font-weight bold
          color #F93E3A
          line-height .56rem
          margin-bottom .1rem
        .unit
          font-size .28rem
          color #F93E3A
          font-weight bold
        .money
          font-size .52rem
          color #F93E3A
          font-weight bold
        .text
          font-size .24rem
          color #666666
          margin-top -.1rem
  .tips
    font-size .24rem
    text-align center
    line-height .34rem
    margin-top .36rem
    color #999999
  .title
    width 3.24rem
    height .34rem
    display block
    margin 0 auto .4rem
@keyframes scaleDrew {
/* 定义关键帧、scaleDrew是需要绑定到选择器的关键帧名称 */
    0% {
      transform: scale(1);
    }

    25% {
      transform: scale(1.05);
    }

    50% {
      transform: scale(1);
    }

    75% {
      transform: scale(1.05);
    }
  }
.invation-page
  .top
    width 100%
    height 9.02rem
    display block
    background url('../../../assets/img/invation-bg.png') no-repeat center
    background-size 100% 9.02rem
    position relative
    .text
      position absolute
      top 1.96rem 
      left 0
      width 100%
      text-align center
      color #FFFFFF
      font-size .36rem
      font-weight bold
      line-height .5rem
    .go-btn
      position absolute 
      top 6.67rem
      left 50%
      transform translateX(-50%)
      width 6.8rem
      height 1.16rem
      .go-btn_img
        width 100%
        height 100%
        display block
        animation scaleDrew 1.5s ease-in-out infinite
  .recommend-annual
    background #D13028
    padding 0 .5rem .6rem
    margin-top -.04rem
    position relative
    .recommend-title
      width calc(100% - 1rem)
      height .44rem
      position absolute
      top -.72rem
      z-index: 100
      .recommend-title_img
        width 2.29rem
        height .44rem
        display block
        margin 0 auto
    .auctions-scene_item
      margin-bottom .2rem
      box-shadow:0px 0px .04rem 0px rgba(102,102,102,0.6)
      &:first-child
        margin-top .1rem
      &:last-child
        margin-bottom 0
      .finish
        background #71706e !important
      .previewing
        background #cfa645 !important
      .will-end
        background #c0413b !important
      .unstart
        background #E26619 !important
      .auctioning
        background #6bc8be !important
      .scene-item_header
        width 100%
        height 3.29rem
        border-radius .12rem .12rem 0 0
        position relative
        .item-header_pic
          width 100%
          height 100%
          display block
          border-radius: .1rem .1rem 0px 0px;
        .scene-status
          position absolute
          bottom 0
          left 0
          width 100%
          height .56rem
          background rgba(0,0,0, 0.5)
          color #ffffff
          display flex
          .status
            width 1.3rem
            background #6BC7BD
            height .56rem
            line-height .56rem
            text-align center
            font-size .22rem
          .time
            font-size .22rem
            line-height .56rem
            margin-left .32rem
      .scens-item_info
        padding .24rem .15rem .30rem
        background #ffffff
        border-radius: 0 0 .1rem .1rem;
        .secens-item_name
          margin-left -.1rem
          height .4rem
          line-height .4rem
          color #333333
          font-size .28rem
          margin-bottom .24rem
        .secens-info
          color #999999
          font-size .24rem
          .weiguan
            position relative
            padding 0 .6rem
            &::before, &::after
              content ''
              position absolute
              top 50%
              transform translateY(-50%)
              height .2rem
              width 1px
              background #999999
            &::before
              left .3rem
            &::after
              right .3rem
  .coupon-pop
    padding .52rem .35rem .4rem
    border-radius .24rem
    // position relative
    .close-coupon
      position absolute
      bottom -.3rem
      left 50%
      transform translateX(-50%)
      width .56rem
      height .56rem
    .coupon-title
      font-size .34rem
      color #FF432B
      font-weight bold
      word-break keep-all
      text-align center
      line-height .34rem
      margin-bottom .4rem
    .coupon-wrapper
      .coupon-list
        .coupon-item
          background url('../../../assets/img/coupon-bg.png') no-repeat center
          background-size 5.14rem 1.44rem
          width 5.14rem
          height 1.44rem
</style>