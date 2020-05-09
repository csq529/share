<template>
  <div class="special-topic">
    <div v-if="!showLoading">
      <div class="header-pic">
        <div class="subtitles swiper-container" id="barrage">
          <ul class="swiper-wrapper">
            <li
              class="swiper-slide"
              v-for="(item, index) in barrageList"
              :key="index"
            >
              <div class="slide-item">
                <div class="slide-left">
                  <img class="avator" :src="item.headimageurl" alt="">
                  <span class="user-name">{{ item.name }}</span>
                  <span>{{ item.content }}</span>
                </div>
                <img class="go-icon" src="../../../assets/img/go-see.png" alt="">
              </div>
            </li>
          </ul>
        </div>
        <div class="special-container">
          <!-- <img class="special-title" src="../../../assets/img/title.png" alt=""> -->
          <div class="coupons">
            <div class="coupon-on coupon"></div>
            <div class="coupon-end coupon"></div>
          </div>
          <img @click="goSee" class="advertising-space" src="../../../assets/img/advertising-space.png" alt="">
          <div class="annual-categories">
            <div class="categrory-item" v-for="(item, index) in categorylist" :key="item.id" v-if="index < 8">
              <img class="categrory-pic" :src="item.imageurl" alt="">
              <span>{{ item.catetoryname }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-bg">
        <!-- 天天嗨拍 -->
        <div class="haipai-container">
          <div class="haipai-title">
            <img class="title-icon" src="../../../assets/img/haipai-title.png" alt="">
            <img @click="showHaipai" class="haipai-pic" src="../../../assets/img/haipai-pic.png" alt="">
          </div>
          <div class="haipai-content">
            <van-tabs type="card" swipeable animated>
              <van-tab v-for="item in haipaiList" :key="item.id" :title="item.currentdate">
                <img class="haipai-img" :src="item.imageurl" alt="">
              </van-tab>
            </van-tabs>
          </div>
        </div>
        <!-- 品牌专区 -->
        <div class="brand-area">
          <div class="brand-title">品牌专区</div>
          <div class="brand-content">
            <img v-for="item in brandList" :key="item.id" class="brand-pic" :src="item.imageurl" alt="">
          </div>
        </div>
        <!-- 今日拍场 -->
        <div class="today-auction">
          <div class="brand-title">今日拍场</div>
          <div class="auctions-scene_item" v-for="(item, index) in todayAuction" :key="index">
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
        <!-- 猜你喜欢 -->
        <div class="guess-like">
          <div class="brand-title">猜你喜欢</div>
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="我也是有底线的~"
            @load="guessLikeMore"
            class="guess-list"
          >
            <div class="guess-item" v-for="(item, index) in guessLikeList" :key="index">
              <img class="guess-img" :src="item.entityImage" alt="">
              <div class="gusee-goods-info">
                <div class="guess-goods-name">
                  <!-- <span class="zy">自营</span> -->
                  <span class="zy">{{ item.mainTags && item.mainTags[0] }}</span>
                  <span class="name">{{ item.entityName }}</span>
                </div>
                <p class="guess-goods-price">
                  <span class="yikoujia">一口价</span>&nbsp;
                  <span class="unit">￥</span>
                  <span class="price">{{ item.currentPrice }}</span>
                </p>
                <div class="tag-list">
                  <span class="tag-item">{{ item.subTags && item.subTags[0] }}</span>
                </div>
                <!-- <p class="guess-goods-other">匡时在线自营店 ></p> -->
              </div>
            </div>
          </van-list>
        </div>
      </div>
      <!-- 嗨拍图录 -->
      <van-action-sheet v-model="showAction">
        <div class="sheet-title">
          <img class="sheet-title-pic" src="../../../assets/img/haipaiutlu.png" alt="">
          <img @click="showAction = false" class="close" src="../../../assets/img/close.png" alt="">
        </div>
        <div class="sheet-content">
            <van-tabs type="card" swipeable animated>
              <van-tab v-for="(item, index) in haipaituluList" :key="index" :title="item.catalogueDate">
                <ul class="sheet-list">
                  <li class="sheet-item" v-for="(sheet, i) in item.auctionHouseList" :key="i">
                    <div class="sheet-item_left">
                      <div>
                        <div class="time">{{ sheet.date }}</div>
                        <div class="status" :class="(sheet.zhuangtai == 1 || sheet.zhuangtai == 2) ? 'rightStart' : sheet.zhuangtai == 3 ? 'previewing' : sheet.zhuangtai == 4 ? 'end' : ''">{{ sheet.zhuangtaititle }}</div>
                      </div>
                      <span class="dot"></span>
                    </div>
                    <div class="sheet-item_right">
                      <img class="auction-pic" :src="sheet.shouyetu" alt="">
                      <div class="auction-info">
                        <p class="auction-name">{{ sheet.zhuanchangmingcheng }}</p>
                        <p class="auction-item_info">
                          <span>{{ sheet.paipinshuliang }}件拍品</span>
                          <span class="weiguan">{{ sheet.weiguancishu }}次围观</span>
                          <span>{{ sheet.jiaojiacishu }}次出价</span>
                        </p>
                        <img class="go-see" src="../../../assets/img/gosee-red.png" alt="">
                      </div>
                    </div>
                  </li>
                </ul>
              </van-tab>
            </van-tabs>
          </div>
      </van-action-sheet>
      <back-top ref="backTop"></back-top>
    </div>
    <van-loading v-else type="spinner" size="24px" vertical>加载中...</van-loading>
  </div>
</template>

<script>
import Swiper from "swiper"
import BackTop from '@/components/BackTop'
import http from '@/api/ajax'
import { getStatusAndTime } from '@/untils/util'
export default {
  components: {
    BackTop
  },
  data() {
    return {
      brandList: [], // 品牌信息
      haipaiList: [], // 今日嗨拍
      categorylist: [], // 拍品分类
      todayAuction: [], // 今日拍场
      barrageList: [], // 头部弹幕
      guessLikeList: [], //猜你喜欢
      haipaituluList: [], // 嗨拍图录
      showAction: false,
      loading: false,
      finished: false,
      pageNumber: 1,
      showLoading: true
    }
  },
  methods: {
    // 去看看
    goSee() {
      this.$router.push({
        path: '/invitation-gifts'
      })
    },
    // 猜你喜欢
    guessLikeMore() {
      let params = {
        type: 'product',
        pageNumber: this.pageNumber,
        pageSize: 10
      }
      if (!this.finished) {
        this.pageNumber += 1
      }
      http.fetchGet(this.URL.guessLike, params).then(res => {
        this.loading = false
        if (res.code === 100) {
          this.guessLikeList = this.guessLikeList.concat(res.data.productList)
        }
        if (res.data.productList.length === 0) {
          this.finished = true
        }
      })
    },
    // 嗨拍图录弹层
    getAuctionCatalogue() {
      let zero = function (value) {
        if (value < 10) {
          return '0' + value
        }

        return value
      }
      let params = {
        md5Str: 'd9a839876bc6cccc22435818be9e842d'
      }
      http.fetchGet(this.URL.getAuctionCatalogue, params).then(res => {
        if (res.code === 100) {
          this.haipaituluList = res.data.catalogueList
          this.haipaituluList && this.haipaituluList.forEach(item => {
            item.auctionHouseList && item.auctionHouseList.forEach(i => {
              let hours = new Date(i.jieshuriqi).getHours()
              let min = new Date(i.jieshuriqi).getMinutes()
              i.date = zero(hours) + ':' + zero(min)
            })
          })
        }
      })
    },
    // 活动分类
    getCategory() {
      let params = {
        md5Str: 'd9a839876bc6cccc22435818be9e842d'
      }
      http.fetchGet(this.URL.getCategory, params).then(res => {
        if (res.code === 100) {
          this.categorylist = res.data.categoryist
        }
      })
    },
    // 品牌专区
    getModule() {
      let params = {
        md5Str: 'd9a839876bc6cccc22435818be9e842d'
      }
      http.fetchGet(this.URL.getModule, params).then(res => {
        if (res.code === 100) {
          this.brandList = res.data.moudelList
        }
      })
    },
    // 头部弹幕
    getPageMessage() {
      let params = {
        md5Str: 'd9a839876bc6cccc22435818be9e842d'
      }
      return http.fetchGet(this.URL.getPageMessage, params).then(res => {
        this.showLoading = false
        if (res.code === 100) {
          this.barrageList = res.data.userPriceList
          console.log('barrageList:', this.barrageList)
        }
      })
    },
    // 轮播图-天天嗨拍
    getRotation() {
      let params = {
        md5Str: 'd9a839876bc6cccc22435818be9e842d'
      }
      http.fetchGet(this.URL.getRotation, params).then(res => {
        if (res.code === 100) {
          this.haipaiList = res.data.rotationList
        }
      })
    },
    // 今日拍场
    getTodayAuction() {
      let params = {
        md5Str: 'd9a839876bc6cccc22435818be9e842d'
      }
      http.fetchGet(this.URL.getTodayAuction, params).then(res => {
        if (res.code === 100) {
          this.todayAuction = res.data.auctionHouseList
          this.todayAuction && this.todayAuction.forEach(item => {
            item.countdownLabel = getStatusAndTime(new Date(item.kaishiriqi).getTime(), new Date(item.jieshuriqi).getTime()).countdownLabel
            item.countdownTime = getStatusAndTime(new Date(item.kaishiriqi).getTime(), new Date(item.jieshuriqi).getTime()).countdownTime
          })
        }
      })
    },
    showHaipai() {
      this.showAction = true
    }
  },
  mounted() {
    this.getCategory()
    this.getRotation()
    this.getModule()
    this.getTodayAuction()
    this.getAuctionCatalogue()
    this.getPageMessage().then(() => {
      const barrageWrapper = new Swiper("#barrage", {
          direction: "vertical",
          loop: true,
          slidesPerView: "auto",
          spaceBetween: 10,
          speed: 1000,
          allowTouchMove: false,
          autoplay: {
            disableOnInteraction: false,
            stopOnLastSlide: true,
            delay: 1000
          },
          lazy: {
            loadPrevNext: true,
            loadPrevNextAmount: 1
          },
          touchMoveStopPropagation: false
          // initialSlide: 1
        });
    })
  }
}
</script>
<style scoped src="../../../assets/css/swiper.css"></style>
<style lang="stylus" scoped>
.previewing {
  color #AF6F00
}
.rightStart {
  color #B6110D
}
.end {
  color #666666
}
/deep/.haipai-container .van-tabs__nav--card .van-tab
  border-right none
  color rgba(182,10,6,1)
  flex-basis 18.6% !important
/deep/.van-tabs__nav--card
  margin 0
  border none
/deep/.haipai-container .van-tabs__wrap--scrollable .van-tab
  margin-right .1rem
  background #F4D47F
  height .48rem
  line-height .48rem
  font-size .24rem
/deep/.haipai-container .van-tabs__wrap--scrollable .van-tab:last-child
  margin-right 0
/deep/.haipai-container .van-tabs__nav--card .van-tab.van-tab--active
  width 1.1rem
  height .56rem
  background url('../../../assets/img/active-date.png') no-repeat center
  color #F4D47F
  background-size 1.16rem .64rem
/deep/ .van-tabs__nav
  background none
/deep/ .van-ellipsis
  text-overflow inherit
.special-topic
  position relative
  // overflow-x hidden
  // height 100%
  .header-pic
    width 100%
    height 13.34rem
    background url('../../../assets/img/header-pic.jpg') no-repeat center
    background-size 7.5rem 13.34rem
  .subtitles {
    height: 1.2rem;
    width: 6.3rem;
    position: absolute;
    top 0rem
    left: .5rem;
    // display: flex
    margin-left .2rem
    ul {
      display: -webkit-box !important;
      li {
        background-color: rgba(0, 0, 0, 1);
        display: inline-flex;
        width: auto !important;
        max-width: 100%;
        color: #fff;
        opacity: 0.5;
        border-radius: .4rem;
        // display flex
      }

      li.swiper-slide-prev {
        opacity: 0;
      }

      li.swiper-slide-next+li {
        animation: fadeTo 0.3s;
      }

      li.swiper-slide-next+li+li {
        opacity: 0;
      }

      li.swiper-slide-next {
        opacity: .5;
        animation: next 0.3s;
      }

      li.swiper-slide-active {
        opacity: 0;
        animation: fadeOut 0.3s;
      }
    }
  }

  .swiper-wrapper { 
    .swiper-slide {
      height: .5rem !important;
      line-height: .5rem;
      width: 100% !important
      padding: 0 .2rem
      box-sizing border-box
      font-size .18rem
      .slide-item {
        width 100%
        display flex
        align-items center
        justify-content space-between
        .slide-left {
          display flex
          align-items center
          justify-content center  
        }
        .avator {
          width .3rem
          height .3rem
          // background:rgba(195,52,52,1);
          display block  
          margin-right .2rem
          border-radius .06rem
        }
        .user-name {
          margin-right .5rem
        }
        .go-icon {
          width .87rem
          height .2rem
          display block
        }
        }
    }
  }
  .special-container
    position absolute
    // left 50%
    left 0
    top 5.2rem
    // transform translateX(-50%)
  .special-title
    width 3.5rem
    height 1.05rem
    display block
    margin 0 auto
  .coupons
    display flex
    align-items center
    justify-content center
    margin-top .22rem
    // padding 0 .6rem
    box-sizing border-box
    .coupon-on
      background url('../../../assets/img/coupon.png') no-repeat center
    .coupon-end
      background url('../../../assets/img/couponed.png') no-repeat center
    .coupon
      width 3.24rem
      height 1.04rem
      background-size 3.24rem 1.04rem
  .advertising-space
    width 6.93rem
    height 1.33rem
    display block
    margin 0 auto
  .annual-categories
    display flex
    align-items center
    // justify-content space-around
    flex-wrap wrap
    margin-top .44rem
    padding 0 .6rem
    box-sizing border-box
    .categrory-item
      display flex
      flex-direction column
      justify-content center
      font-size .2rem
      align-items center
      margin-bottom .2rem
      margin-right .4rem
      &:nth-child(4n)
        margin-right 0
      .categrory-pic
        width 1.24rem
        height 1.24rem
        display block
.bottom-bg
  width 100%
  background url('../../../assets/img/bottom-bg.jpg') repeat center
  background-size 100% 100%
  padding 0 .6rem 1rem
  box-sizing border-box
  margin-top -1.5rem
  .haipai-container
    .haipai-title
      display flex
      align-items center
      justify-content space-between
      margin-bottom .1rem
      .title-icon
        width 3.90rem
        height .6rem
        display block
      .haipai-pic
        width 1.3rem
        height .4rem
        display block
    .haipai-content
      border .03rem solid rgba(182, 10, 6, 1)
      box-shadow:0px 0px 4px 0px rgba(102,102,102,0.6), 0px 0px 8px 0px rgba(0, 0, 0, 0.5);
      border-radius .1rem
      padding .2rem
      .haipai-img
        width 5.9rem
        height 2.8rem
        display block
        border-radius .06rem
  .brand-title
    text-align center
    height .35rem
    line-height .35rem
    color #BF2E2A
    font-size .36rem
    font-family PingFang SC
    font-weight bolder
    padding-bottom .29rem
    position relative
    &::after, &::before
      content '.'
      position absolute
      top -0.12rem
      color #BF2E2A
      font-size .48rem
    &::before
      left 2rem
    &::after
      right 2rem
  .brand-area
    margin-top .58rem
    .brand-content
      display flex
      align-items center
      flex-wrap wrap
      justify-content space-between
      .brand-pic
        width 1.4rem
        height 1.4rem
        display block
        margin-bottom .2rem
  .today-auction
    margin-top .59rem
    .auctions-scene_item
      margin-bottom .2rem
      box-shadow:0px 0px .04rem 0px rgba(102,102,102,0.6)
      .finish
        background #71706e !important
      .previewing
        background #CEA647 !important
      .unstart
        background #E26619 !important
      .auctioning
        background #6BC7BD !important
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
        border-radius: 0 0 .1rem .1rem;
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
.guess-like
  margin-top .59rem
  min-height 1rem
  /deep/.van-list__finished-text {
    width: 100%;
  }
  >>>.van-list__loading {
    width: 100%;
  }
  .guess-list
      display flex
      align-items center
      justify-content space-between
      flex-wrap wrap
      .guess-item
        width 3rem
        margin-bottom .29rem
        background #fff
        .guess-img
          // object-fit: contain;
          width 100%
          height 3rem
          border-radius .10rem .10rem 0px 0px
          // background blue
          display block
        .gusee-goods-info
          padding .15rem .18rem .18rem
          border-radius 0 0 .1rem .1rem
        .guess-goods-name
          display flex
          align-items center
          height .37rem
          line-height .37rem
          .zy
            word-break keep-all
            height .25rem
            line-height .25rem
            padding .03rem .1rem
            font-size .18rem
            color #ffffff
            background linear-gradient(270deg,rgba(225,118,109,1) 0%,rgba(192,65,59,1) 100%)
            border-radius .04rem
            margin-right .08rem
          .name 
            font-size .26rem
            color #333333
            font-weight bold
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        .tag-list
          display flex
          align-items center
          margin-top .13rem
          .tag-item
            color rgba(221,140,140,1)
            font-size .18rem
            background rgba(252,237,237,1)
            border-radius .08rem
            padding .03rem .1rem
            border 1px solid rgb(221,140,140)
            margin-right .08rem
        .guess-goods-price
          height .42rem
          line-height .42rem
          margin .08rem 0
          .yikoujia
            font-size .2rem
            color #999999
          .unit
            color #C0413B
            font-size .18rem
            font-weight bold
          .price
            color #C0413B
            font-size .30rem
            font-weight bold
        .guess-goods-other
          font-size .18rem
          color #999999
          height .25rem
          line-height .25rem
.sheet-title
  text-align center
  position relative
  .sheet-title-pic
    width 2.36rem
    height .76rem
    margin-top .34rem
    margin-bottom .55rem
  .close
    position absolute
    width .4rem
    height .4rem
    top .3rem
    right .3rem
>>> .van-popup
  min-height 9.766rem
  background #FFFDF0
  border .03rem solid #B6110D
  box-sizing border-box
.sheet-content
  >>> .van-tabs__nav
    padding 0 .6rem
    border-bottom 2px solid #B6110D
  .sheet-list
    padding-left .76rem
    padding-right .6rem
    margin-top .2rem
    height 7.2rem
    overflow-y scroll
    .sheet-item
      display flex
      align-items center
      position relative
      margin-bottom .1rem
      .sheet-item_left
        display flex
        align-items center
        justify-content space-between
        position relative
        .time
          font-size .32rem
          color #333233
          font-weight bolder
          margin-right .21rem
        .status
          font-size .2rem
          text-align center
          margin-top .1rem
        .dot
          width .14rem
          height .14rem
          background #B6110D
          border-radius 50%
          display inline-block
          margin-top -.4rem
      // .sheet-item_left::after
      //   content ''
      //   width .14rem 
      //   height .14rem
      //   background #B6110D
      //   top 1rem
      //   left 0
      //   -moz-border-radius 50%
      //   -o-border-radius 50%
      //   -webkit-border-radius 50%
      //   border-radius 50%
      .sheet-item_right
        margin-left .21rem
        display flex
        align-items center
        .auction-pic
          width 1.2rem
          height 1.28rem
          border-radius .1rem 0px 0px .1rem
          margin-right .04rem
        .auction-info
          color #333333
          font-size .24rem
          border 1px solid rgba(182, 17, 13, 1)
          box-shadow:0px 0px .04rem 0px rgba(51,51,51,0.4);
          border-radius:0px .10rem .1rem 0px;
          padding 0 0.29rem .10rem .22rem
          .auction-name
            margin-top .12rem
            font-size .24rem
            font-weight bolder
            // line-height .24rem
            overflow: hidden;
            white-space: nowrap;
            width 3rem
            text-overflow: ellipsis;
          .auction-item_info
            font-size .18rem
            margin-top .1rem
            margin-bottom .18rem
            height .18rem
            line-height .18rem
          .weiguan
            position relative
            padding 0 .2rem
            &::before, &::after
              content ''
              position absolute
              top 50%
              transform translateY(-50%)
              height .2rem
              width 1px
              background #999999
            &::before
              left .1rem
            &::after
              right .1rem
        .go-see
          width .91rem
          height .22rem
          float right
   .sheet-item:not(:last-child)::after
        content: "";
        position: absolute;
        z-index: 1;
        pointer-events: none;
        background-color: #B6110D;
        width: 1px;
        top: 0;
        bottom: 0;
        left: 0;
        top: 0;
        left: 1.09rem;
        bottom: -.6rem;
  /deep/.van-tabs__nav--card .van-tab
    font-size .2rem
    color #666666
    flex-basis 15% !important
    border-right none
  /deep/.van-tabs__nav--card .van-tab.van-tab--active
    background rgba(182,17,13,1)
    border-radius .1rem .10rem 0px 0px
    color #FFE9AD
    font-size .24rem
/deep/ .van-action-sheet__content
  background #FFFDF0
.van-loading {
  position: fixed;
  top: 50%;
  left: 50%;
  color: #c8c9cc;
  font-size: 0;
  vertical-align: middle;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, .7);
  width: 2rem;
  padding: .2rem 0;
  border-radius: .1rem;
}
@keyframes fadeOut {
  25% {
    opacity: 0.075;
  }
  50% {
    opacity: 0.05;
  }
  75% {
    opacity: 0.025;
  }
  100% {
    opacity: 0;
  }
}

@keyframes next {
  0% {
    opacity: 0.7;
  }
  25% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.5;
  }
  75% {
    opacity: 0.4;
  }
  100% {
    opacity: 0.3;
  }
}

@keyframes fadeTo {
  0% {
    opacity: 0.1;
  }
  25% {
    opacity: 0.25;
  }
  50% {
    opacity: 0.4;
  }
  75% {
    opacity: 0.55;
  }
  100% {
    opacity: 0.7;
  }
}
</style>