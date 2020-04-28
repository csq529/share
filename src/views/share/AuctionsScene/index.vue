<template>
  <a class="auctions-scene" id="btnOpenApp" @click="downLoad">
    <div class="download-wrapper">
      <img class="download-bg" src="../../../assets/img/download.png" alt="">
      <div class="godownload">去下载</div>
    </div>
    <div class="auctions-scene_header">
      <img class="header-pic" :src="paipinInfo.imageUrl" alt="">
      <div class="scene-info">
        <p class="scene-title">{{ paipinInfo.name }}</p>
        <p class="scene-time">预展时间：{{ paipinInfo.yuzhanshijian }}</p>
        <p class="scene-time">拍卖时间：{{ paipinInfo.paimairiqi }}</p>
      </div>
    </div>
    <div class="auctions-scene_content">
      <div class="auctions-scene_item" v-for="(item, index) in paipinInfo.auctionHouseList" :key="index">
        <div class="scene-item_header">
          <img class="item-header_pic" :src="item.shouyetu" alt="">
          <div class="scene-status">
            <div class="status" :class="item.zhuangtaititle==='已结束'?'finish': item.zhuangtaititle === '竞拍中' ? 'previewing' : item.countdownLabel==='竞拍中' ? 'auctioning' : item.zhuangtaititle==='即将结拍'? 'will-end' : ''">{{ item.zhuangtaititle }}</div>
            <div class="time">{{ item.countdownTime }}</div>
          </div>
        </div>
        <div class="scens-item_info">
          <p class="secens-item_name">{{ item.zhuanchangmingcheng }}</p>
          <p class="secens-info">
            <span>{{ item.paipinshuliang }}件拍品</span>
            <span class="weiguan">{{ item.weiguancishu }}次围观</span>
            <span>{{ item.jiaojiacishu }}次出价</span>
          </p>
        </div>
      </div>
    </div>
    <div class="auctions-footer">
      <div class="footer-left flex-start">
        <span class="flex-center share">
          <img src="../../../assets/img/share-icon.png" alt="">
          <span>分享</span>
        </span>
        <span class="flex-center">
          <img src="../../../assets/img/rule.png" alt="">
          <span>参拍指南</span>
        </span>
      </div>
      <div class="footer-right">
        联系客服
      </div>
    </div>
  </a>
</template>

<script>
import http from '@/api/ajax'
import { getStatusAndTime } from '@/untils/util'
export default {
  data() {
    return {
      paipinInfo: {}
    }
  },
  methods: {
    downLoad() {
      new JMLink({
        jmlink:'https://agr903.jmlk.co/AAX8',// 短链地址
        button:document.querySelector('a#btnOpenApp'),
        autoLaunchApp : true,
        plhparams: {
          productId: this.$route.query.productId
        }
      })
    },
    getPaipinhui() {
      let params = {
        md5Str: 'd9a839876bc6cccc22435818be9e842d'
      }
      http.fetchGet(this.URL.getPaipinhui, params).then(res => {
        if (res.code === 100) {
          this.paipinInfo = res.data
          console.log('paipinInfo:', this.paipinInfo)
          this.paipinInfo.auctionHouseList.forEach(item => {
            item.countdownLabel = getStatusAndTime(new Date(item.kaishiriqi).getTime(), new Date(item.jieshuriqi).getTime()).countdownLabel
            item.countdownTime = getStatusAndTime(new Date(item.kaishiriqi).getTime(), new Date(item.jieshuriqi).getTime()).countdownTime
          })
        }
      })
    }
  },
  created() {
      this.getPaipinhui()
  }
}
</script>

<style lang="stylus" scoped>
.finish
  background #71706e !important
.previewing
  background #CEA647 !important
.unstart
  background #E26619 !important
.auctioning
  background #6BC7BD !important
// .will-end
//   background #CEA647 !important
.download-wrapper
  width 100%
  height 1.44rem
  position fixed
  top 0 
  left 0
  z-index 99
  box-sizing border-box
  .download-bg
    width 100%
    height 100%
    display block
  .godownload
    width 1.8rem
    height .72rem
    background #C0413B
    font-size .3rem
    color #fff
    line-height .72rem
    text-align center
    position absolute
    top .36rem
    right .32rem
.flex-center
  display flex
  align-items center
  justify-content space-between
.flex-start
  display flex
  align-items center
  justify-content flex-start
.auctions-scene
  .auctions-scene_header
    padding-top 1.44rem
    .header-pic
      width 100%
      height 3.62rem
      display block
    .scene-info
      padding .24rem .32rem .32rem
      .scene-title
        height .44rem
        line-height .44rem
        color #333333
        font-size .34rem
        margin-bottom .24rem
      .scene-time
        font-size .24rem
        color #999999
      .scene-time + .scene-time
        margin-top .24rem
  .auctions-scene_content
    padding .24rem .32rem 1rem
    background rgb(243,243,243)
    .auctions-scene_item
      margin-bottom .24rem
      .scene-item_header
        width 100%
        height 3.29rem
        border-radius .12rem .12rem 0 0
        position relative
        .item-header_pic
          width 100%
          height 100%
          display block
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
            width 2.28rem
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
        .secens-item_name
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
  .auctions-footer
    height .98rem
    width 100%
    position fixed
    bottom 0
    left 0
    display flex
    background #ffffff
    img
      width .34rem
      height .32rem
      display block
      margin-right .08rem
    .footer-left
      width 4.5rem
      padding-left .32rem
      .share
        margin-right .29rem
    .footer-right
      width 3rem
      height .98rem
      line-height .98rem
      text-align center
      background #CB403B
      color #ffffff
      font-size .32rem
</style>