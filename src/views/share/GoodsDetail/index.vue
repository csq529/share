<template>
  <div class="goods-wrapper">
    <div class="header">
      <img class="goods-img" src="" alt="">
      <div class="price-wrapper flex-center">
        <div class="price-info flex-center">
          <div class="current-price">
            <span>￥</span>
            <span>921.00</span>
          </div>
          <div class="original-price">￥868.00</div>
          <div class="member-price">
            <span>会员价</span>
            <span>￥666.00</span>
          </div>
        </div>
        <div class="share">
          <img src="../../../assets/img/share.png" alt="">
          <span>分享</span>
        </div>
      </div>
    </div>
    <div class="goods-info">
      <p class="goods-name">格莱美黑胶唱片机</p>
      <p class="express">
        <span>快递:</span>
        <span>10.00</span>
      </p>
      <p class="other-info">
        <span>收藏2022人</span>
        <span>已售12351件</span>
        <span>剩余库存500件</span>
      </p>
    </div>
    <div class="choose-property">
      <div class="property-title flex-center">
        <div>
          <span>选择</span>
          <span>选择颜色、尺寸</span>
        </div>
        <img class="arrow-more" src="../../../assets/img/arrow-more.png" alt="">
      </div>
      <div>
        <ul class="property-list">
          <li class="property-item"></li>
          <li class="property-item"></li>
          <li class="property-item"></li>
          <li class="tips">共3种方案可选</li>
        </ul>
      </div>
    </div>
    <div class="store-wrapper flex-center">
      <div class="store-info flex-center">
        <img class="store-img" src="" alt="">
        <div>
          <p>
            <span class="store-name">山中漆器 MIYABI</span>
            <span>
              <span>个人</span>
              <span>V5</span>
            </span>
          </p>
          <p class="store-grade">dsds</p>
        </div>
      </div>
      <div class="add-follow">+ 关注</div>
    </div>
    <p class="store-other flex-center">
      <span>商品件数：999</span>
      <span>关注人数：999</span>
      <span>店铺服务：4.8分</span>
    </p>
    <div class="goods-detail">
      <div class="goods-title">商品详情</div>
      <ul class="detail-list">
        <li class="detail-item" v-for="(item, index) in 10" :key="index">
          <img class="detail-img" src="" alt="">
        </li>
      </ul>
    </div>

    <div class="guess-like">
      <div class="guess-title">猜你喜欢</div>
      <ul class="guess-list">
        <li class="guess-item" v-for="(item, index) in 10" :key="index">
          <img class="guess-img" src="" alt="">
          <div class="gusee-goods-info">
            <div class="guess-goods-name">
              <span class="zy">自营</span>
              <span class="name">GRASIL大理石烛台</span>
            </div>
            <div class="tag-list">
              <span class="tag-item">免运费</span>
              <span class="tag-item">正品保价</span>
            </div>
            <p class="guess-goods-price">
              <span class="unit">￥</span>
              <span class="price">88.90</span>
            </p>
            <p class="guess-goods-other">匡时在线自营店 ></p>
          </div>
        </li>
      </ul>
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
            <img src="../../../assets/img/collection.png" alt="">
            <span class="collect">已收藏</span>
          </li>
        </ul>
      </div>
      <div class="right flex-center">
        <div class="add-cart">加入购物车</div>
        <div class="buy-now">立即购买</div>
      </div>
    </div>
  </div>
</template>

<script>
import http from '@/api/ajax'
export default {
  data() {
    return {

    }
  },
  methods: {
    getGoodsDetail() {
      let params = {
        productId: this.$route.query.productId || 1
      }
      http.fetchGet(this.URL.getGoodsDetail, params).then(res => {
        console.log('goodsDetail:', res)
      })
    }
  },
  mounted() {
    document.title = '商品详情'
    this.getGoodsDetail()
  }
}
</script>

<style lang="stylus" scoped>
.flex-center
  display flex
  align-items center
  justify-content space-between
.goods-wrapper
  width 100%
  height 100%
  .header
    .goods-img
      width 100%
      height 7.5rem
      background skyblue
      display block
    .price-wrapper
      padding 0 .32rem
      height 1.16rem
      line-height 1.16rem
      .price-info
        .current-price
          color #C0413B
          span:first-child
            font-weight:600;
            font-size .32rem
          span:last-child
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
    .express
      font-size .24rem 
      color #9B9B9B
      margin-bottom .29rem
    .other-info
      display flex
      align-items center
      justify-content space-between
      color #9B9B9B
  .choose-property
    padding: .24rem .32rem
    border-bottom .24rem solid #FCFAFA
    .property-title
        font-size .28rem
        span:first-child
          color #333333
          font-weight bold
        span:last-child
          color #666666
          margin-left .48rem
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
        background skyblue
        border-radius .06rem
      .store-name
        margin-left .16rem
        font-size .28rem
        color #333333
        font-weight bold
        height .4rem
        line-height .4rem
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
          width 100%
          height 3.31rem
          background blue
          display block
        .gusee-goods-info
          padding .15rem .18rem .18rem
        .guess-goods-name
          display flex
          align-items center
          height .37rem
          line-height .37rem
          .zy
            width .36rem
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
          color #C0413B
          height .42rem
          line-height .42rem
          margin .08rem 0
          .unit
            font-size .18rem
            font-weight bold
          .pirce
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
          .collect
            color #C0413B
    .right
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

</style>