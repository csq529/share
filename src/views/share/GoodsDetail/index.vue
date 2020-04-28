<template>
  <a class="goods-wrapper" id="btnOpenApp" @click="downLoad">
    <div class="download-wrapper">
      <img class="download-bg" src="../../../assets/img/download.png" alt="">
      <div class="godownload">去下载</div>
    </div>
    <div v-if="!showLoading">
      <div class="header">
        <van-swipe class="my-swipe" indicator-color="#000" :autoplay="3000">
          <van-swipe-item v-for="(item, index) in goodsDetail.picBannerList" :key="index">
            <img class="auction-img" :src="item.picUrl" />
          </van-swipe-item>
        </van-swipe>
        <div class="price-wrapper flex-center">
          <div>
            <div class="price-info flex-center">
              <div class="current-price">
                <span>一口价：</span>
                <span class="unit">￥</span>
                <span class="price">{{ goodsDetail.minMemberPrice ? goodsDetail.minMemberPrice : goodsDetail.minCurrentPrice }}</span>
              </div>
              <div class="original-price" v-if="goodsDetail.minOriginalPrice">￥{{ goodsDetail.minOriginalPrice }}</div>
              <div class="member-price" v-if="goodsDetail.minMarketPrice">
                <span>会员价</span>
                <span>￥{{ goodsDetail.minMarketPrice }}</span>
              </div>
            </div>
            <div class="markat-price">
              <span>市场参考价：</span>
              <span>{{ goodsDetail.marketPrice }}</span>
            </div>
          </div>
          <div class="share">
            <img src="../../../assets/img/share.png" alt="">
            <span>分享</span>
          </div>
        </div>
      </div>
      <div class="goods-info">
        <p class="goods-name">
          <span v-if="isWillSale" class="will-sale">预售爆款</span>
          {{ goodsDetail.productName }}
        </p>
        <p class="express" v-if="goodsDetail.postage">
          <span>快递:</span>
          <span>{{ goodsDetail.postage }}</span>
        </p>
        <p class="other-info">
          <span>收藏{{ goodsDetail.collectNum }}人</span>
          <span>已售{{ goodsDetail.salesVolume }}件</span>
          <span>剩余库存{{ goodsDetail.stock }}件</span>
        </p>
        <div class="tag-list">
          <!-- <div class="tag-item">{{ goodsDetail.majorLabels }}</div> -->
          <div class="tag-item">{{ goodsDetail.minorLabels }}</div>
        </div>
      </div>
      <div class="booking_box" v-if="isWillSale">
        <div class="yx_ls">
          <div class="ls">
            <div>已预订</div>
            <div>{{goodsDetail.salesVolume}}人</div>
          </div>
          <div class="ls">
            <div>剩余库存</div>
            <div>{{goodsDetail.stock}}件</div>
          </div>
          <div class="ls">
            <div>剩余时间</div>
            <div class="tt">
              <van-count-down :time="time" use-slot :auto-start="autoTimeStart" >
                <template v-slot="timeData">
                  <!-- <span class="item">{{ timeData.hours }}</span>
                  <span class="item">{{ timeData.minutes }}</span>
                  <span class="item">{{ timeData.seconds }}</span> -->
                  <span v-if="timeData.days>0">
                    <span class="item" >{{ timeData.days}}天</span>
                  </span>
                  <span v-if="timeData.days==0 && timeData.hours>0">
                    <span class="item">{{ timeData.hours*60+timeData.minutes}}分</span>
                  </span>

                  <span v-if="timeData.hours ==0 && timeData.days==0">
                    <span class="item">{{ timeData.minutes }}分</span>
                    <span class="item">{{ timeData.seconds }}秒</span>
                  </span>
                  <span v-if="isEnd" class="item">已结束</span>
                </template>

              </van-count-down>
            </div>
          </div>
        </div>
        <div class="pre">
          <van-progress custom-class="pro_s" track-color="#ffffff" color="#ee0a24" :percentage="percentage" stroke-width="8" :show-pivot="false" />
          <!-- <van-progress custom-class="pro_s" track-color="#ffffff" color="#ee0a24" percentage="{{percentage}}" stroke-width="8" show-pivot="{{false}}" /> -->
        </div>
      </div>
      <div class="choose-property">
        <div class="property-title">
          <div class="property">
            <span>选择</span>
            <span v-if="productSpecId == ''">选择颜色、尺寸等</span>
            <span v-else>{{ specsParams }}</span>
            <!-- <span>选择颜色、尺寸</span> -->
          </div>
          <img class="arrow-more" src="../../../assets/img/arrow-more.png" alt="">
        </div>
        <div>
          <ul class="property-list">
            <li class="tips">共{{ goodsDetail.productSpec.length }}种方案可选</li>
          </ul>
        </div>
      </div>
      <div class="store-wrapper flex-center" v-if="!isWillSale">
        <div class="store-info flex-center">
          <img class="store-img" :src="shopDetail.logoPicUrl" alt="">
          <div>
            <p class="store-top">
              <span class="store-name">{{ shopDetail.shopName }}</span>
              <!-- <span class="shop-type">
                <span class="type">{{ shopDetail.shopType === 0 ? '个人' : '企业' }}</span>
                <span class="stars">V{{ shopDetail.stars }}</span>
              </span> -->
            </p>
            <div class="stars-wrapper">
              <cui-rate :score="shopDetail.stars"></cui-rate>
            </div>
            <!-- <p class="store-grade">{{ shopDetail.shopDesc }}</p> -->
          </div>
        </div>
        <div class="add-follow">+ 关注</div>
      </div>
      <p class="store-other flex-center">
        <span>商品件数：{{ shopDetail.productNum }}</span>
        <span>关注人数：{{ shopDetail.followerNum }}</span>
        <span>店铺级别：{{ shopDetail.authLevel == 0 ? '普通' : '优选' }}</span>
      </p>
      <div class="goods-detail">
        <div class="goods-title">商品详情</div>
        <div v-html="goodsDetail.detail"></div>
      </div>
        
      <div class="guess-like">
        <div class="guess-title">猜你喜欢</div>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="我也是有底线的~"
          @load="guessLike"
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

      <div class="footer flex-center">
        <div class="left">
          <ul class="service-list flex-center">
            <li class="service-item">
              <img src="../../../assets/img/service.png" alt="">
              <span>客服</span>
            </li>
            <li class="service-item">
              <img src="../../../assets/img/cart.png" alt="">
              <span>购物车</span>
            </li>
            <li class="service-item">
              <img src="../../../assets/img/collection-w.png" alt="">
              <span class="collect">收藏</span>
            </li>
          </ul>
        </div>
        <div class="right flex-center">
          <div class="add-cart" v-if="!isWillSale">加入购物车</div>
          <div class="buy-now" v-if="!isWillSale">立即购买</div>
          <div class="qiangxian" v-if="!isEnd && isWillSale">抢先购</div>
          <div class="isend" v-if="isEnd">已结束</div>
        </div>
      </div>
    </div>
    <van-loading v-else type="spinner" size="24px" vertical>加载中...</van-loading>
  </a>
</template>

<script>
import http from '@/api/ajax'
import CuiRate from '@/components/CuiRate'
export default {
  components: {
    CuiRate
  },
  data() {
    return {
      isWillSale: false, // 是否预售
      shopDetail: {},
      goodsDetail: [],
      guessLikeList: [],
      loading: false,
      finished: false,
      pageNumber: 1,
      showLoading: true,
      attributes: '',
      time: 30 * 60 * 60 * 1000,
      autoTimeStart: false,
      percentage: '',
      isEnd: false,
      productSpecId: '',
      specsParams: null
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
      });
    },
    getGoodsDetail() {
      let params = {
        productId: this.$route.query.productId || 135,
        md5Str: 'd9a839876bc6cccc22435818be9e842d'
      }
      http.fetchGet(this.URL.getGoodsDetail, params).then(res => {
        this.showLoading = false
        if (res.code === 100) {
          console.log('goodsDetail:', res.data)
          this.goodsDetail = res.data
          this.shopDetail = res.data.shopDetail
          this.isWillSale = res.data.saleType == 1 ? true : false
          this.time = res.data.saleStartTimestamp-res.data.currentTimestamp
          console.log('time:', this.time)
          this.autoTimeStart = ((res.data.saleStartTimestamp-res.data.currentTimestamp)/1000)/3600>0?true:false
          console.log('autoTimeStart:', this.autoTimeStart)
          this.percentage = res.data.salesVolume / (res.data.salesVolume + res.data.stock) * 100
          this.isEnd = res.data.saleEndTimestamp <= new Date().getTime()
          console.log('isEnd:', this.isEnd)
          this.productSpecId = res.data.productSpec && res.data.productSpec[0] && res.data.productSpec[0].id || ''
          this.specsParams = res.data.productSpec && res.data.productSpec[0] && res.data.productSpec[0].specsParams || ''
          let attr = res.data.spec
          let arr = []
          attr && attr.forEach(item => {
            arr.push(item.value[0].key)
            this.attributes = arr.toString() + '，1件'
          })
        }
      })
    },
    guessLike() {
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
    }
  },
  mounted() {
    document.title = '商品详情'
    this.getGoodsDetail()
    console.log('id:', this.$route.query.productId)
    // this.guessLike()
  }
}
</script>

<style lang="stylus" scoped>
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
.goods-wrapper
  width 100%
  height 100%
  .header
    padding-top 1.44rem
    .my-swipe
        width 100%
        height 7.5rem
      .van-swipe-item
        width 100%
        height 100%
        display block
        .auction-img
          width 100%
          height 100%
          display block
          margin 0 auto
          object-fit contain
      display block
    .price-wrapper
      padding 0 .32rem
      height 1.16rem
      line-height 1.16rem
      .markat-price
        height .48rem
        line-height .48rem
        margin-top .1rem
      .price-info
        height .48rem
        line-height .48rem
        margin-top .2rem
        .current-price
          .unit
            color #C0413B
            font-weight:600;
            font-size .32rem
          .price
            color #C0413B
            font-size .48rem
            font-weight:600;
        .original-price
          font-size .28rem
          color #999999
          text-decoration line-through
          margin 0 .16rem
        .member-price
          span:first-child
            width .66rem
            height .3rem
            padding: .03rem .12rem .04rem
            text-align center
            line-height .3rem
            font-size .22rem
            color #E2BB8E
            background:linear-gradient(270deg,rgba(98,98,98,1) 0%,rgba(51,51,51,1) 100%)
            border-radius .06rem
          span:last-child
            color #333333
            font-size .28rem
            margin-left .08rem
            font-weight 600
    .share
      display flex
      flex-direction column
      justify-content center
      align-items center
      margin-top .24rem
      position relative
      padding-left .36rem
      &::before
        content ""
        position absolute
        width .02rem
        height .3rem
        background #E6E6E6
        top .1rem
        left 0
      img
        width .32rem
        height .32rem
        margin-bottom .06rem
      span
        height .3rem
        line-height .3rem
        color #C0413B
  .goods-info
    padding .24rem .32rem
    border-bottom .24rem solid #FCFAFA
    .goods-name
      height .38rem
      line-height .38rem
      color #2D2D2D
      font-weight bold
      margin-bottom .32rem
      .will-sale
        background: #C0413B;
        border-radius .08rem
        padding: .02rem .16rem
        height .38rem
        line-height: .38rem
        color #fff
        font-size: .26rem
    .express
      font-size .24rem 
      color #9B9B9B
      margin-bottom .29rem
    .other-info
      display flex
      align-items center
      justify-content space-between
      color #9B9B9B
    .tag-list
      margin-top .28rem
      display flex
      align-items center
      .tag-item
        padding 0 .08rem
        height .26rem
        line-height .26rem
        color #DD8C8C
        font-size .18rem
        background rgba(252,237,237,1)
        border 1px solid rgba(221,140,140,1)
        border-radius .08rem
      .tag-item + .tag-item {
        margin-left .08rem
      }
  .choose-property
    padding: .24rem .32rem
    border-bottom .24rem solid #FCFAFA
    .property-title
        font-size .28rem
        display flex
        align-items flex-start
        span:first-child
          color #333333
          font-weight bold
          word-break keep-all
        span:last-child
          color #666666
          margin-left .48rem
    .property {
      display flex
      align-items flex-start
      margin-right .2rem
      justify-content center
    }
    .arrow-more
      width .2rem
      height .36rem
    .property-list
      margin-top .16rem
      margin-left 1.04rem
      display flex
      align-items center
      .property-item
        width .54rem
        height .54rem
        border: 1px solid #333333
        margin-right .17rem
    .tips
      background #F5F5F5
      color: #999999
      // width 1.59rem
      height .33rem
      padding .08rem .24rem
      text-align center
      line-height .33rem
      border-radius .12rem
  .store-wrapper
    padding: .24rem .32rem 0 .24rem
    .store-info
      .store-img
        width 1.2rem
        height 1.2rem
        border-radius .06rem
      .store-top {
        display flex
        align-items center
      }
      .stars-wrapper
        margin-left .16rem
        height .24rem
        margin-top .15rem
      .store-name
        margin-left .16rem
        font-size .28rem
        color #333333
        font-weight bold
        height .4rem
        line-height .4rem
      .shop-type
        border: 1px solid #DD8C8C
        border-radius: .08rem
        font-size: .18rem
        height: .26rem
        line-height: .26rem
        margin-left .08rem
        .type
          color: #fff;
          background: #DD8C8C
          width .52rem
          display inline-block
          text-align center
        .stars
          color #DD8C8C
          width .39rem
          display inline-block
          text-align center
      .store-grade
        margin-left .16rem
        margin-top .15rem
    .add-follow
      width 1.28rem
      height .56rem
      background #C0413B
      color #FFFFFF
      line-height .56rem
      text-align center
      border-radius .28rem
      font-size .26rem
      display flex
      align-items center
      justify-content center
  .store-other
    padding: .24rem .32rem
    font-size .24rem
    color #323232
    border-bottom .24rem solid #FCFAFA
  .goods-detail
    .goods-title
      padding .24rem .32rem
      height .88rem
      line-height .88rem
      font-size .28rem
      font-weight bold
      color #333333
    .detail-list
      display flex
      flex-direction column
      .detail-item
        width 100% 
        .detail-img
          width 100%
          background blue
  .guess-like
    padding .24rem .32rem .98rem
    .guess-title
      height .88rem
      line-height .88rem
      font-size .28rem
      color #333333
      font-weight bold
    .guess-list
      display flex
      align-items center
      justify-content space-between
      flex-wrap wrap
      .guess-item
        width 3.31rem
        margin-bottom .24rem
        .guess-img
          // object-fit: contain;
          width 100%
          height 3.31rem
          // background blue
          display block
        .gusee-goods-info
          padding .15rem .18rem .18rem
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
  .footer
    position fixed
    bottom 0
    left 0
    width 100% 
    height .98rem
    background #fff
    .left
      .service-list
        display flex
        align-items center
        .service-item
          height .98rem
          width .98rem
          display flex
          align-items center
          flex-direction column
          justify-content center
          img
            width .46rem
            height .46rem
            display block
          span
            font-size .24rem
            color #333333
            height .33rem
            line-height .33rem
            margin-top .05rem
    .right
      .isend
        width 4.96rem
        height .98rem
        color #FFFFFF
        font-size .32rem
        text-align center
        line-height .98rem
        background #CCCCCC
      .qiangxian
        width 4.96rem
        height .98rem
        color #FFFFFF
        font-size .32rem
        text-align center
        line-height .98rem
      .add-cart, .buy-now
        width 2.28rem
        height .98rem
        color #FFFFFF
        font-size .32rem
        text-align center
        line-height .98rem
      .add-cart
        background #DD8C8C
      .buy-now
        background #C0413B
        font-weight bold
      .qiangxian
        background #3BC0A2
.goods-wrapper>>>.van-list__loading {
  width: 100%;
}
.goods-wrapper>>>.van-list__finished-text {
  width: 100%;
}
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
.booking_box {
  background: #fff;
  margin: .24rem 0;
  padding: .32rem;
}

.booking_box .yx_ls {
  display: flex;
  align-items: center;
  text-align: center;
}

.booking_box .yx_ls .ls {
  flex: 1;
  color: #333;
  font-size: .22rem;
}

.booking_box .yx_ls .ls:first-child {
  text-align: left;
}

.booking_box .yx_ls .ls:last-child {
  text-align: right;
}

.booking_box .yx_ls .ls .item {
  color: #333;
  display: inline-block;
  font-size: .22rem;
}

.booking_box  .pre {
  margin-top: .20rem;
}

.booking_box .pro_s {
  border: 1px solid #c0413b;
}
</style>