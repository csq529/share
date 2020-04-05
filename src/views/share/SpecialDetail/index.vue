<template>
  <div class="special-wrapper">
    <div class="download-wrapper">
      <img class="download-bg" src="../../../assets/img/download.png" alt="">
      <div class="godownload">去下载</div>
    </div>
    <div v-if="!showLoading">
      <div class="special-goods">
        <img class="special-img" :src="dataInfo.appletmainimg || dataInfo.fabutu" alt="">
        <div class="mask-layer"></div>
        <div class="special-name">
          <!-- <span class="name">黄釉梅瓶</span> -->
          <!-- <span class="des">辽清名家瓷器专场</span> -->
          <div class="line"></div>
          <div class="special-info">
            <p class="info-item">
              <span>拍品件数：</span>
              <span>{{dataInfo.paipinshu||0}}</span>
            </p>
            <p class="info-item">
              <span>拍品件数：</span>
              <span>{{dataInfo.weiguan||0}}</span>
            </p>
            <p class="info-item">
              <span>拍品件数：</span>
              <span>{{dataInfo.chujia||0}}</span>
            </p>
            <div class="time">
              <!-- <p>开拍时间</p> -->
              <p>
                {{dataInfo.countdownTime}}
                <!-- <span>10/11</span> -->
                <!-- <span>21:00</span> -->
              </p>
            </div>
          </div>
        </div>
        <img class="share" src="../../../assets/img/right-share.png" alt="">
        <div class="status">{{dataInfo.zcppstatetitle}}</div>
      </div>
      <div class="owner-principal-wrapper">
        <ul class="owner-principal-list">
          <li class="principal-item flex-center" v-for="(item, index) in supervisors" :key="index" v-if="index < 5">
              <div class="principal-left flex-center">
                <img class="principal-img" :src="item.avatar" alt="">
                <div>
                  <p class="principal-info">
                    <span class="principal-name">{{item.name}}</span>
                    <span class="principal-title">{{index===0?'主理人':'联合主理人'}}</span>
                  </p>
                  <p class="other-info">
                    <span class="fans">粉丝：{{item.fansAmount}}</span>
                    <span class="auction-num">拍品数：{{item.auctionItemsAmount}}</span>
                  </p>
                </div>
              </div>
              <div class="add-follow">
                <span class="add">+</span>
                <span>关注</span>
              </div>
          </li>
          <li class="more" v-if="supervisors && supervisors.length >= 5" @click="showMore = !showMore">
            <span>{{ showMore ? '收起' : '展开' }}</span>
            <img v-if="showMore" src="../../../assets/img/arrow-top.png" alt="">
            <img v-else src="../../../assets/img/arrow-bottom.png" alt="">
          </li>
        </ul>
        <div class="recommend-reason" v-if="dataInfo.zhuanchangjianjie">
          <div class="reason-title">推荐理由</div>
          <div class="reason-content channel-closed" ref="reasonContent">{{ dataInfo.zhuanchangjianjie}}</div>
          <div class="more-text" @click="showMoreText">
            <span>{{ moreText ? '收起' : '展开更多' }}</span>
            <img v-if="moreText" src="../../../assets/img/arrow-top.png" alt="">
            <img v-else src="../../../assets/img/arrow-bottom.png" alt="">
          </div>
        </div>
        <div class="auction-wrapper">
          <div class="auction-title flex-center">
            <span class="current-text">本期拍品</span>
            <div>
              <span class="time">结拍时间</span>
              <span class="hot">热度</span>
            </div>
          </div>
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="我也是有底线的~"
            @load="getGoods"
            class="auction-list"
          >
            <div class="auction-item" v-for="(item, index) in benqiList" :key="index" :class="{'border-none': index === benqiList.length - 1}">
              <img class="auction-img" :src="item.jubutu" alt="">
              <div class="auction-info">
                <div class="auction-name">{{item.zuozhe}} {{item.mingcheng}}</div>
                <p class="current-price">
                  <span class="price-text">{{ item.zcppstatecode=='4'? '落槌价' : '当前价' }}：</span>
                  <span>
                    <span class="unit">￥</span>
                    <span class="price">{{ item.jiage }}</span>
                  </span>
                </p>
                <p class="gujia" v-if="item.paipingujia">估价：{{ item.paipingujia }}</p>
                <p class="auction-status">
                  <span :class="item.zcppstatetitle==='已结束'?'finish': item.zcppstatetitle === '竞拍中' ? 'previewing' : item.countdownLabel==='竞拍中' ? 'auctioning' : item.zcppstatetitle==='即将结拍'? 'will-end' : ''">{{item.zcppstatetitle}}：</span>
                  <span :class="item.zcppstatetitle==='已结束'?'finish': item.zcppstatetitle === '竞拍中' ? 'previewing' : item.countdownLabel==='竞拍中' ? 'auctioning' : item.zcppstatetitle==='即将结拍'? 'will-end' : ''">{{item.countdownTime}}</span>
                </p>
                <p class="hot-info">
                  <span>热度：围观{{ item.weiguan || 0 }}</span>
                  <span>出价{{item.chujia||0}}次</span>
                </p>
              </div>
            </div>
          </van-list>
        </div>
      </div>
      <img class="my-auction" src="../../../assets/img/my-auction.png" alt="">
    </div>
    <van-loading v-else type="spinner" size="24px" vertical>加载中...</van-loading>
  </div>
</template>

<script>
import { toggleClass } from '../../../common/utils.js'
import http from '@/api/ajax'
import { getStatusAndTime } from '@/untils/util'
import moment from "moment"

export default {
  data () {
    return {
      principalList: [1, 2, 3],
      showMore: false,
      moreText: false,
      showLoading: true,
      dataInfo: null,
      supervisors: [], //主理人
      benqiList: [],
      loading: false,
      finished: false,
      limit: 10,
      offset: 0
    }
  },
  methods: {
    showMoreText() {
      this.moreText = !this.moreText
      let dom = this.$refs.reasonContent
      toggleClass(dom, 'channel-closed')
    },
    getZhuanchangInfo() {
      let params = {
        id: this.$route.query.id || 1057
      }
      http.fetchGet(this.URL.getZhuanChangDetail, params).then(res => {
        this.showLoading = false
        if (res.code === '0') {
          let dataInfo = res.row;
          dataInfo.countdownLabel = getStatusAndTime(dataInfo.kaishiriqi || dataInfo.kaishishijian, dataInfo.jieshuriqi || dataInfo.jieshushijian).countdownLabel;
          dataInfo.countdownTime = getStatusAndTime(dataInfo.kaishiriqi || dataInfo.kaishishijian, dataInfo.jieshuriqi || dataInfo.jieshushijian).countdownTime;
          this.dataInfo = dataInfo
          this.supervisors = res.row.supervisors
        }
      })
    },

    getGoods() {
      let params = {
        zhuanChangId: this.$route.query.id || 1057,
        limit: this.limit,
        offset: this.offset
      }
      if (!this.finished) {
        this.offset += this.limit
      }
      http.fetchGet(this.URL.getGoods, params).then(res => {
        this.loading = false
        if (res.code === '0') {
          console.log('goods:', res)
          const arr = res.paipinLiebiao.map(item=>{
            return{
              ...item,
              jieshu:moment(item.jieshushijian).format("MM/DD/HH:mm")
            }
          })
          let benqiList = this.benqiList.concat(arr)
          benqiList = benqiList.map(item => {
            return {
              ...item,
              ...getStatusAndTime(item.kaishishijian, item.jieshushijian),
              curTime: new Date().getTime()
            };
          })

          this.benqiList = benqiList
          
          if (res.paipinLiebiao.length < this.limit) {
            this.finished = true
          }
        }
      })
    }
  },
  mounted() {
    document.title = '拍卖专场'
    this.getZhuanchangInfo()
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
.border-none
  border-bottom none !important
.finish
  color #3B3B3B !important
.previewing
  color #3594B6 !important
.unstart
  color #E26619 !important
.auctioning
  color #C0413B !important
.will-end
  color rgb(160, 75, 60)
.special-wrapper>>>.van-loading {
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
.special-wrapper
  height 100%
  width 100%
  .special-goods
    padding-top 1.44rem
    width 100%
    height 8.1rem
    position relative
    .special-img
      width 100%
      height 100%
      display block
      object-fit contain
    .mask-layer
      width 100%
      height 100%
      position absolute
      top 0 
      left 0
      // background:rgba(0,0,0,0.4);
    .special-name
      position absolute
      top .58rem
      left .6rem
      .name
        width .7rem
        height 2.83rem
        line-height .7rem
        font-size .7rem
        color #FFFFFF
        display inline-block
        margin-right .18rem
      .des
        width .34rem
        height 2.78rem
        line-height .34rem
        color #ffffff
        font-size .3rem
        display inline-block
      // .line
      //   width .6rem
      //   height .04rem
      //   background #fff
      //   margin 4rem 0 .4rem
      .special-info
        margin-top 4rem
        .info-item
          height .28rem
          line-height .28rem
          color #fff
          font-size .28rem
          margin-bottom .21rem
          span:first-child
            margin-right .24rem
      .time
        margin-top .4rem
        color #fff
        p:first-child
          height .28rem
          line-height .28rem
          margin-bottom .15rem
        p:last-child
          height .4rem
          line-height .4rem
          span + span 
            margin-left .3rem
    .share
      position absolute
      right .4rem
      top .58rem
      width .44rem
      height .39rem
    .status
      font-size .28rem
      color #3594B6
      height .28rem
      padding .36rem .16rem
      border 1px solid #3594B6
      position absolute
      bottom 1rem
      right .4rem
  .owner-principal-wrapper
    margin-top -.55rem
    position absolute
    width 100%
    border-radius .26rem
    background #ffffff
    .owner-principal-list
      border-radius .26rem .26rem 0 0
      height 100%
      padding .4rem
      .principal-item
        margin-bottom .3rem
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
        border-bottom 1px solid #E8E8E8
        img
          width .32rem
          height .32rem
          margin-top .05rem
          margin-left .08rem
    .recommend-reason
      padding-bottom .4rem
      .reason-title
        font-size .32rem
        color #000000
        font-weight bold
        height .32rem
        line-height .32rem
        padding .4rem .4rem .3rem
        text-align center
      .reason-content
        padding 0 .4rem
        line-height .5rem
      .channel-closed
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      .more-text
        display flex
        align-items center
        justify-content center
        margin-top .3rem
        img 
          width .32rem
          height .32rem
          margin-left .11rem
    .auction-wrapper
      padding .32rem .4rem
      .auction-title
        height .36rem
        line-height .36rem
        margin-bottom .3rem
        .current-text
          font-size .36rem
          color #000
          font-weight bold
        .time
          font-size .28rem
          color #C0413B
          padding-right .3rem
        .hot
          font-size .28rem
          color #555555
          position relative
          padding-left .3rem
          &::before
            content ''
            position absolute
            top .06rem
            left 0
            height .28rem
            width 1px
            background #CCCCCC
      .auction-list
        .auction-item
          display flex
          align-items flex-start
          justify-content space-between
          padding-bottom .3rem
          margin-bottom .3rem
          border-bottom .02rem solid #E8E8E8
          &:nth-last-child(0) {
            border-bottom none
          }
         
          .auction-img
            width 2.42rem
            height 2.42rem
            display block
            border-radius .2rem
            object-fit contain
            margin-right .3rem
          .auction-name
            padding-top .1rem
            font-size .3rem
            color #000
            font-weight bold
            width 3.98rem
            height .32rem
            line-height .32rem
            margin-bottom .2rem
            text-overflow ellipsis
            overflow hidden
            white-space nowrap
          .current-price
            height .36rem
            line-height .36rem
            margin-bottom .2rem
            .price-text
              font-size .28rem
              color #666666
            .unit
              color #C0413B
              font-size .28rem
            .price
              color #C0413B
              font-size .36rem
          .gujia
            font-size .28rem
            color #666666
            line-height .28rem
            margin-bottom .2rem
          .auction-status
            height .28rem
            line-height .28rem
            color #666
            font-size .28rem
            margin-bottom .2rem
            span + span 
              margin-left .16rem
          .hot-info
            height .28rem
            line-height .28rem
            color #666
            font-size .28rem
            span + span 
              margin-left .16rem
  .my-auction
    width 1.3rem
    height 1.3rem
    position fixed
    bottom 1.8rem
    right 0.29rem

</style>