<template>
  <div class="auction-wrapper">
    <div class="download-wrapper">
      <img class="download-bg" src="../../../assets/img/download.png" alt="">
      <a id="btnOpenApp" class="godownload">去下载</a>
    </div>
    <div class="auction-goods" v-if="!showLoading">
      <!-- <img class="auction-img" src="" alt=""> -->
      <van-swipe class="my-swipe" indicator-color="#000" :autoplay="3000">
        <van-swipe-item v-for="(item, index) in auctionInfo.tupians" :key="index">
          <img class="auction-img" :src="item.url" />
        </van-swipe-item>
      </van-swipe>
      <div class="auction-status flex-center" v-if="auctionDetail && auctionDetail.row">
        <div class="current-price">
          <span class="text">当前价：</span>
          <span>
            <span class="unit">￥</span>
            <span class="price">{{ auctionDetail.row && auctionDetail.row.dangqianjiage }}</span>
          </span>
        </div>
        <div class="current-time" v-if="countTime">
          <p class="text">{{ countTime.label }}</p>
          <div class="time" v-if="countTime.time && countTime.label != '已结束'">
            <span class="time-item">{{ countTime.time.D }}</span>
            <span class="time-unit">日</span>
            <span class="time-item">{{ countTime.time.H }}</span>
            <span class="time-unit">时</span>
            <span class="time-item">{{ countTime.time.M }}</span>
            <span class="time-unit">分</span>
            <span class="time-item">{{ countTime.time.S }}</span>
            <span class="time-unit">秒</span>
          </div>
          <div v-else class="time">{{ auctionDetail.row && auctionDetail.row.jieshushijianstr }}</div>
        </div>
      </div>
      <div class="auction-info" v-if="auctionDetail && auctionDetail.row">
        <div class="auction-left">
          <!-- <span class="auction-tag">庚子贺岁</span> -->
          <p class="auction-name">{{ auctionDetail.row.zuozhe }}  {{ auctionDetail.row.paipinmingcheng }}</p>
          <p class="auction-price">估价：¥{{ auctionDetail.row.paipingujia || auctionDetail.row.beizhu2 }}</p>
        </div>
        <div class="auction-right">
          <div class="share-collect">
            <img class="share-icon" src="../../../assets/img/share-w.png" alt="">
            <span class="line"></span>
            <img class="collection-icon" src="../../../assets/img/collection-w.png" alt="">
          </div>
          <div class="tips-wrapper">
            <img class="tips-icon" src="../../../assets/img/tips.png" alt="">
            <span v-if="auctionDetail.row.zcppstatecode === '3' || auctionDetail.row.zcppstatecode === '7'">开拍提醒</span>
            <span v-else>结拍提醒</span>
          </div>
        </div>
      </div>
      <div class="price-list-wrapper" v-if="auctionDetail && auctionDetail.row">
        <ul class="pirce-list flex-center">
          <li class="price-item">
            <div>起拍价</div>
            <div>￥{{ auctionDetail.row.qipaijia || 0 }}</div>
          </li>
          <li class="price-item">
            <div>加价幅度</div>
            <div>￥{{ auctionDetail.row.jingjiajieti || 0 }}</div>
          </li>
          <li class="price-item">
            <div>保证金</div>
            <div>￥{{ auctionDetail.row.baozhengjin || 0 }}</div>
          </li>
          <li class="price-item">
            <div>佣金</div>
            <div>{{ auctionDetail.row.maijiayongjin }}%</div>
          </li>
        </ul>
      </div>
      <ul class="brand-list flex-center">
       <li class="brand-item">
          <img src="../../../assets/img/brand.png" alt="">
          <span>严选品质</span>
        </li>
        <li class="brand-item">
          <img src="../../../assets/img/safe.png" alt="">
          <span>安全支付</span>
        </li>
        <li class="brand-item">
          <img src="../../../assets/img/recharge.png" alt="">
          <span>售后保障</span>
        </li>
      </ul>
      <div class="owner-principal-wrapper" v-if="auctionInfo && auctionInfo.supervisor">
        <ul class="owner-principal-list">
          <li class="principal-item flex-center">
              <div class="principal-left flex-center">
                <img class="principal-img" :src="auctionInfo.supervisor.avatar" alt="">
                <div>
                  <p class="principal-info">
                    <span class="principal-name">{{ auctionInfo.supervisor.name }}</span>
                    <span class="principal-title">主理人</span>
                  </p>
                  <p class="other-info">
                    <span class="fans">粉丝：{{ auctionInfo.supervisor.fansAmount || 0 }}</span>
                    <span class="auction-num">拍品数：{{ auctionInfo.supervisor.auctionItemsAmount || 0 }}</span>
                  </p>
                </div>
              </div>
              <div class="add-follow">
                <span class="add">+</span>
                <span>关注</span>
              </div>
          </li>
          <!-- <li class="more">
            <span>{{ showMore ? '收起' : '查看更多' }}</span>
            <img v-if="showMore" src="../../../assets/img/arrow-top.png" alt="">
            <img v-else src="../../../assets/img/arrow-bottom.png" alt="">
          </li> -->
        </ul>
      </div>
      <div class="auction-desc">
        <p v-for="(item, index) in dongtaishuxing" :key="index">
          <span>{{ item.name }}</span>
          <span>{{ item.value }}</span>
        </p>
        <p v-for="(item, index) in moredongtaishuxing" :key="index">
          <span>{{ item.name }}</span>
          <span>{{ item.value }}</span>
        </p>
      </div>
      <div class="auction-record" v-if="jiaojiaRows && jiaojiaRows.length > 0">
        <div class="record-title flex-center">
          <span class="title-left">参拍记录（{{ jiaojiaRows.length || 0 }}）</span>
          <span class="title-right">
            <img src="../../../assets/img/refresh.png" alt="">
            <span>刷新</span>
          </span>
        </div>
        <ul class="record-list">
          <li class="record-item flex-center" v-for="(item, index) in jiaojiaRows" :key="index" v-if="index < 5">
            <div class="record-item-left">
              <div class="avator-wrapper">
                <img class="avator" :src="item.avatar" alt="">
                <span class="tip-anonymous" v-if="item.anonymous">匿名</span>
              </div>
              <span class="name" v-if="item.anonymous">匿名用户</span>
              <span v-else class="name">{{ item.jingpairen }}</span>
            </div>
            <span class="price">￥{{ item.jine }}</span>
            <span class="status" v-if="index===0 && auctionDetail.row && auctionDetail.row.zcppstatecode==='4'">成交</span>
            <span class="status" v-if="index===0 && auctionDetail.row && auctionDetail.row.zcppstatecode!=='4'">领先</span>
            <span class="status rglogoItem" v-if="index!==0">出局</span>
          </li>
          <li class="more" v-if="jiaojiaRows.length > 5">
            <span>{{ showMore ? '收起' : '查看更多' }}</span>
            <img v-if="showMore" src="../../../assets/img/arrow-top.png" alt="">
            <img v-else src="../../../assets/img/arrow-bottom.png" alt="">
          </li>
        </ul>
      </div>
      <div class="auction-detail">
        <p class="detail-title">拍品详情</p>
        <div v-html="auctionDetail.row.paipinxiangqing === undefined ? '' : auctionDetail.row.paipinxiangqing"></div>
      </div>
      <div class="other-auction">
        <div class="other-title">
          本场其他拍品
        </div>
        <ul class="auction-list">
          <li class="auction-item" v-for="(item, index) in paipinLiebiao" :key="index">
            <div class="auction-top">
              <img class="auction-img" :src="item.beijingtulujing" alt="">
              <div class="auction-status flex-center">
                <div class="status"  :class="item.zcppstatetitle==='已结束'?'finish': item.zcppstatetitle === '竞拍中' ? 'previewing' : item.countdownLabel==='竞拍中' ? 'auctioning' : item.zcppstatetitle==='即将结拍'? 'will-end' : ''">{{item.zcppstatetitle}}</div>
                <div class="time">{{item.countdownTime}}</div>
              </div>
            </div>
            <p class="auction-name">{{item.zuozhe}} {{item.mingcheng}}</p>
            <p class="auction-price">
              <span class="text">{{item.zcppstatecode==='4'? '落槌价' : '当前价'}}:</span>
              <span>
                <span class="unit">￥</span>
                <span class="price">{{item.dangqianjia}}</span>
              </span>
            </p>
          </li>
        </ul>
      </div>
      <div class="about-us">
        <p class="about-text">相关拍品详情垂询、委托竞投、装框装裱等贵宾服务 可随时联系我们</p>
        <p class="telphone">客服电话：400-630-6789</p>
      </div>
      <div class="back">
        <img src="../../../assets/img/arrow-left.png" alt="">
        <span>返回专场</span>
      </div>
      <div class="footer flex-center">
        <div class="service-wrapper">
          <div class="service">
            <img src="../../../assets/img/service.png" alt="">
            <span>客服</span>
          </div>
          <div class="price-wrapper">
            <span class="text">当前价：</span>
            <span>
              <span class="unit">￥</span>
              <span class="price">{{ auctionDetail.row && auctionDetail.row.dangqianjiage || 0 }}</span>
            </span>
          </div>
        </div>
        <div class="givemoney givemoneyend" v-if="auctionDetail.row.paipinzhuangtai=='2'||auctionDetail.row.zcppstatecode==='4'">已结束</div>

        <div class="givemoney" v-if="hasEarnest && auctionDetail.row.paipinzhuangtai=='1'&&!isHighestUser&&auctionDetail.row.zcppstatecode==='2'&&!auctionDetail.row.yikoujia">出价</div>
        <div class="givemoney" v-if="hasEarnest && auctionDetail.row.paipinzhuangtai=='1'&&!isHighestUser&&auctionDetail.row.zcppstatecode==='5'&&!auctionDetail.row.yikoujia">出价</div>
        <div class="givemoney" v-if="hasEarnest && auctionDetail.row.paipinzhuangtai=='1'&&!isHighestUser&&auctionDetail.row.zcppstatecode==='6'&&!auctionDetail.row.yikoujia">出价</div>

        <div class="givemoney givemoneyend" :class="{'noClick' : isHighestUser}" v-if="hasEarnest&&auctionDetail.row.paipinzhuangtai=='1'&&isHighestUser&&auctionDetail.row.zcppstatecode==='2'&&!auctionDetail.row.yikoujia">您已领先</div>
        <div class="givemoney givemoneyend" :class="{'noClick' : isHighestUser}" v-if="hasEarnest&&auctionDetail.row.paipinzhuangtai=='1'&&isHighestUser&&auctionDetail.row.zcppstatecode==='5'&&!auctionDetail.row.yikoujia">您已领先</div>
        <div class="givemoney givemoneyend" :class="{'noClick' : isHighestUser}" v-if="hasEarnest&&auctionDetail.row.paipinzhuangtai=='1'&&isHighestUser&&auctionDetail.row.zcppstatecode==='6'&&!auctionDetail.row.yikoujia">您已领先</div>

        <div class="givemoney" :class="{'givemoneyend' : auctionDetail.row.zcppstatecode === '3' || auctionDetail.row.zcppstatecode === '7'}" v-if="!hasEarnest&&auctionDetail.row.paipinzhuangtai=='1'">缴纳保证金</div>
      </div>
    </div>

    <van-loading v-else type="spinner" size="24px" vertical>加载中...</van-loading>
  </div>
</template>

<script>
import http from '@/api/ajax'
import { countdown } from '@/untils/countDown'
import { getStatusAndTime } from '@/untils/util'
export default {
  data() {
    return {
      showMore: false,
      auctionInfo: {},
      auctionDetail: {},
      timer: null,
      countTime: {},
      showLoading: true,
      paipinLiebiao: [], //其他拍品
      dongtaishuxing: [], // 底卡信息
      moredongtaishuxing: [],
      jiaojiaRows: [], // 参拍记录
      hasEarnest: null,
      isHighestUser: null
    }
  },
  methods: {
    // 商品详情
    getAuctionDetail() {
      let params = {
        id: this.$route.query.id || 15751,
        zcid: this.$route.query.zhuanchangid || 899
      }
      http.fetchGet(this.URL.getAuction, params).then(res => {
        this.auctionInfo = res
      })
    },
    // 商品信息
    getAuctionInfo() {
      let params = {
        paipinId: this.$route.query.id || 15751,
        zhuanchangid: this.$route.query.zhuanchangid || 899
      }
      http.fetchGet(this.URL.getAuctionInfo, params).then(res => {
        this.showLoading = false
        this.auctionDetail = res
        this.dongtaishuxing = res.dongtaishuxing
        this.moredongtaishuxing = res.moredongtaishuxing
        this.hasEarnest = res.zcppuser.hasEarnest ? true : false
        this.isHighestUser = res.zcppuser.isHighestUser
        this.jiaojiaRows = res.jiaojiaRows
        this.timer = setInterval(this.countdownTime, 1000)
      })
    },
    // 其他拍品
    getRecommend() {
      let params = {
        paipinid: this.$route.query.id || 15751,
        zcid: this.$route.query.zhuanchangid || 899
      }
      http.fetchGet(this.URL.getRecommend, params).then(res => {
        console.log('paipinLiebiao:', res)
        if (res.code === '0') {
          let data = res.rows
          data = data.map(item => {
            return {
              ...item,
              ...getStatusAndTime(item.kaishishijian, item.jieshushijian)
            };
          })
          this.paipinLiebiao = data
        }
      })
    },
    // 倒计时
    countdownTime() {
      this.countTime = countdown(this.auctionDetail.row && this.auctionDetail.row.kaishishijian, this.auctionDetail.row && this.auctionDetail.row.jieshushijian)
      if (this.countTime.label === '已结束') {
        clearInterval(this.timer)
      }
    }
  },
  created() {
    this.getAuctionDetail()
    this.getAuctionInfo()
    this.getRecommend()
  },
  mounted() {
    document.title = '拍品详情'
    // new JMLink({
    //   jmlink:'https://www/baidu.com',// 短链地址
    //   button:document.querySelector('a#btnOpenApp')
    // })
  }
}
</script>

<style scoped lang="stylus">
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
    background #7CD1CC
    font-size .3rem
    color #fff
    line-height .72rem
    text-align center
    position absolute
    top .36rem
    right .32rem
.finish
  background #3B3B3B !important
.previewing
  background #3594B6 !important
.unstart
  background #E26619 !important
.auctioning
  background #C0413B !important
.givemoney {
  width: 3rem;
  height: .98rem;
  background:#C0413B;
  font-size: .36rem;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  line-height: .98rem;
  text-align: center;
}

.givemoneyend {
  background: #666666;
}

.noClick{
  background: #666666;
}

.auction-wrapper>>>.van-loading {
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
.flex-center
  display flex
  align-items center
  justify-content space-between
.auction-wrapper
  width 100%
  height 100%
  .auction-goods
    margin-top 1.44rem
    position relative
    width 100%
    height 7.5rem
    .my-swipe
      width 100%
      height 6.57rem
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
  .auction-status
    position absolute
    bottom 0
    left 0
    width 100%
    height .93rem
    .current-price
      background #C0413B
      height 100%
      width 4.1rem
      line-height .93rem
      .text
        margin-left .33rem
      .text, .unit
        font-size .28rem
        color #fff
      .price
        font-size .4rem
        color #fff
    .current-time
      width 3.4rem
      height 100%
      background #FFD0CE
      display flex
      flex-direction column
      justify-content center
      .text
        margin-left .4rem
        color #333
        font-size .24rem
        height .33rem
        line-height .33rem
        margin-bottom .03rem
      .time
        margin-left .4rem
        display flex
        align-items center
        .time-item 
          display inline-block
          width .4rem
          height .4rem
          background #333333
          border-radius .04rem
          color #fff
          text-align center
          line-height .4rem
        .time-unit
          margin 0 .04rem
          font-size .18rem
    .auction-price
      height .28rem
      line-height .28rem
      color #666666
      font-size .28rem
  .auction-info
    padding 1.2rem .32rem 0
    display flex
    align-items flex-start
    justify-content center
    .auction-tag
      font-size .26rem
      color #FFFFFF
      background #C0413B
      padding .04rem .09rem
      border-radius .08rem
    .auction-name
      font-size .36rem
      // height .36rem
      line-height .46rem
      color #2D2D2D
      margin 0 0 .24rem
      font-weight bold
    .share-collect
      display flex
      align-items center
      justify-content flex-end
      .share-icon
        width .46rem
        height .46rem
      .collection-icon
        width .46rem
        height .42rem
          
      .line
        height .32rem
        width .02rem
        background #ECECEC
        margin 0 .30rem 0 .32rem
    .tips-wrapper
      width 1.91rem
      height .6rem
      border .02rem solid #CCCCCC
      border-radius .3rem
      display flex
      align-items center
      justify-content center
      margin-top .68rem
      
      .tips-icon 
        width .32rem
        height .32rem
        margin-right .1rem
      span
        height .28rem
        line-height .28rem
        font-size .28rem
        margin-top -.05rem
  .price-list-wrapper
    padding .32rem .32rem 0
  .pirce-list
    height 1.34rem
    background #F5F5F5
    .price-item
      display flex
      align-items center
      flex-direction column
      width 25%
      position relative
      &:not(:first-child)::after
        content ''
        position absolute
        top 50%
        left 0
        height .72rem
        width .02rem
        background #CCCCCC
        transform translateY(-50%)
      
      div:first-child
        font-size .26rem
        color #333
        height .37rem
        line-height .37rem

      div:last-child
        margin-top .04rem
        height .45rem
        line-height .45rem
        color #333333
        font-size .32rem
        font-weight bold
.brand-list
  padding .28rem .32rem
  .brand-item
    display flex
    align-items center
    justify-content center
    flex 1
    img 
      width .24rem
      height .24rem
      display block
      margin-right .08rem
    span
      font-size .24rem
      color #666
.owner-principal-wrapper
  border-top .24rem solid #FAFBF8
  border-bottom .24rem solid #FAFBF8
  .owner-principal-list
      border-radius .26rem .26rem 0 0
      height 100%
      padding .4rem
      .principal-item
        .principal-img
          width 1.02rem
          height 1.02rem
          display block
          margin-right .19rem
          border-radius 50%
        .principal-info
          .principal-name
            font-size .36rem
            color #000
            font-weight bold
            height .36rem
            line-height .36rem
          .principal-title
            font-size .28rem
            color #666666
            height .28rem
            line-height .28rem
            margin-left .1rem
        .other-info
          margin-top .16rem
          span
            color #666666
            font-size .28rem
            height .28rem
            line-height .28rem
          span + span
            margin-left .3rem
        .add-follow
          width 1.28rem
          height .56rem
          border .02rem solid rgba(192,65,59,1)
          border-radius .28rem
          line-height .56rem
          text-align center
          color #C0413B
          font-size .26rem
          display flex
          align-items center
          justify-content center
          span 
            font-weight bold
          .add
            font-size .35rem
            margin-top -.04rem
            margin-right 0.08rem
      .more
        display flex
        align-items center
        justify-content center
        font-size .28rem
        color #000
        margin-top .29rem
        padding-bottom .4rem
        img
          width .32rem
          height .32rem
          margin-top .05rem
          margin-left .08rem
.auction-desc
  padding .32rem
  border-bottom .24rem solid #FAFBF8
  p
    // height .4rem
    line-height .4rem
    font-size .28rem
    margin-bottom .24rem
    display flex
    span:first-child
      font-weight bold
      color #333
      width 1.12rem
      word-break keep-all
      margin-right .16rem
    span:last-child
      width 5.76rem
.auction-record
  padding 0 .32rem
  .record-title
    height .37rem
    line-height .37rem
    padding .22rem 0 .24rem
    .title-left 
      color #414344
      font-size .26rem
      font-weight bold
    .title-right
      font-size .24rem
      color #999999
      img
        width .24rem
        height .24rem
        vertical-align middle
        margin-right .05rem
  .record-list
    border-bottom .24rem solid #FAFBF8
    .record-item
      margin-bottom .24rem
      .record-item-left
        display flex
        align-items center
      .avator-wrapper
        position relative
        // height .8rem
        // width .8rem
        margin-right .25rem
      .avator
        height .8rem
        width .8rem
        border-radius 50%
        display inline-block
        vertical-align middle
        border .02rem solid #D9DFE0
      .tip-anonymous{
        width:.68rem;
        height:.24rem;
        line-height: .24rem;
        background:rgba(100,208,200,1);
        border-radius:.12rem;
        position: absolute;
        left: .06rem;
        bottom: -.06rem;
        color: #fff;
        font-size: .18rem;
        font-weight: 600;
        text-align: center;
      }
      .name
        font-size .32rem
        color #666666
      .price
        color #C0413B
        font-size .36rem
      .status
        width 1.02rem
        height .56rem
        background #C0413B
        text-align center
        line-height .56rem
        color #fff
        border-radius .35rem
      .rglogoItem{
        color: #999999;
        background: #ECF0F1;
      }
    .more
        display flex
        align-items center
        justify-content center
        font-size .28rem
        color #000
        margin-top .29rem
        padding-bottom .4rem
        border-top .02rem solid #ECECEC
        padding-top .32rem
        img
          width .32rem
          height .32rem
          margin-top .05rem
          margin-left .08rem

.auction-detail
  padding 0 .32rem
  .detail-title
    padding .21rem 0 .22rem
    font-size .26rem
    color #333333
    font-weight bold
.other-auction
  padding 0 .32rem
  .other-title
    padding .48rem 0 .24rem
    height .5rem
    line-height .5rem
    font-size .36rem
    color #333333
    font-weight bold
  .auction-list
    display flex
    align-items center
    justify-content space-between
    flex-wrap wrap
    .auction-item
      background #FFFEFF
      margin-bottom .24rem
      width 3.31rem
      .auction-img
        border-radius .12rem .12rem 0 0 
        width 3.31rem
        object-fit contain
        height 3.31rem
        display block
      .auction-top
        position relative
        width 3.31rem
        height 3.31rem
        background #F1F1F1
        border-radius .08rem .08rem 0 0 
        .auction-status
          position absolute
          bottom 0
          left 0
          width 100%
          height .56rem
        .status
          width 1.10rem
          height .56rem
          line-height .56rem
          text-align center
          background #C0413B
          color #ffffff
          font-size .22rem
        .time
          width 2.21rem
          height .56rem
          background #7A777A
          color #FFFFFF
          font-size .22rem
          line-height .56rem
          padding-left .21rem
          box-sizing border-box
      .auction-name
        font-size .26rem
        color #333
        height .37rem
        line-height .37rem
        padding .15rem 0 .17rem .18rem
        font-weight bold
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

      .auction-price
        height .42rem
        line-height .42rem
        color #C0413B
        padding-left .18rem
        padding-bottom .24rem
        .text
          font-size .22rem
          margin-right .08rem
        .unit
          font-size .18rem
        .price 
          font-size .3rem
          font-weight bold
 .back
    position fixed
    bottom: 2rem;
    right: 0;
    width: 1.90rem;
    height: .64rem;
    line-height: 64rem;
    background: rgba(0,0,0,.6);
    border-radius: 1rem 0 0 1rem;
    font-size: .28rem;
    font-weight: 600;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    img
      width .32rem
      height .32rem
      display block
      margin-right .1rem
.about-us
  width 5.52rem
  padding .32rem .99rem 1.46rem
  .about-text
    font-size .24rem
    color #999999
    text-align center
    line-height .33rem
  .telphone
    font-size .24rem
    color #333
    font-weight bold
    height .33rem
    line-height .33rem 
    text-align center
    margin-top .16rem
.footer
  padding-left .42rem
  box-shadow:0px 2px 0px 0px rgba(245,245,245,1);
  position fixed
  bottom 0
  left 0
  width 100%
  box-sizing border-box
  background #fff
  height .98rem

  .service-wrapper
    display flex
    align-items center
    .service
      display flex
      flex-direction column
      font-size .24rem
      color #333333
      position relative
      padding-right .4rem
      &::after
        position absolute
        content ''
        top 50%
        right 0
        height .56rem
        width .02rem
        background #ECECEC
        transform translateY(-50%)
      img
        width .46rem
        height .46rem
        display block
    .price-wrapper
      margin-left .3rem
      .text
        font-size .26rem
        color #333333
      .unit
        font-size .26rem
        color #C0413B
      .price
        font-size .46rem
        color #C0413B
        font-weight bold
  .pay
    background #C0413B
    font-size .32rem
    color #ffffff
    line-height .98rem
    width 3rem
    text-align center
</style>