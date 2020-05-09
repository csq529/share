<template>
  <div class="invitation-gifts">
    <div class="top-bg">
      <div class="barrage-rules">
        <div class="subtitles swiper-container" id="barrage">
          <ul class="swiper-wrapper">
            <li
              class="swiper-slide"
              v-for="(item, index) in barrageList"
              :key="index"
            >
              <div class="slide-item">
                <div class="slide-left">
                  <img class="avator" src="" alt="">
                  <span>{{ item.name }}</span>
                </div>
                <img class="go-icon" src="../../../assets/img/go-see.png" alt="">
              </div>
            </li>
          </ul>
        </div>
        <div class="rules" @click="goRule">活动规则</div>
      </div>
      <img @click="showShare = true" class="invite-now" src="../../../assets/img/invite-now.png" alt="">
      <div class="howjoin-des">
        <img class="howjoin-title" src="../../../assets/img/how-join.png" alt="">
        <img class="activity-des" src="../../../assets/img/activity-des.png" alt="">
      </div>
    </div>
    <div class="ranking-invaterecord">
      <van-tabs v-model="active" swipeable>
        <van-tab title="邀请排行榜">
          <ul class="ranking-list">
            <li class="ranking-item" v-for="(item, index) in rankingList" :key="index">
              <div class="ranking-item_left">
                <img v-if="index === 0" class="top3" src="../../../assets/img/top1.png" alt="">
                <img v-else-if="index === 1" class="top3" src="../../../assets/img/top2.png" alt="">
                <img v-else-if="index === 2" class="top3" src="../../../assets/img/top3.png" alt="">
                <span v-else class="ranking-order">{{ index + 1 }}</span>
                <img class="avator" src="../../../assets/img/avator.png" alt="">
                <span class="ranking-name">{{ item.name }}</span>
              </div>
              <div class="ranking-item_right">
                邀请<span class="num">{{ item.num }}</span>人
              </div>
            </li>
          </ul>
          <p class="tips">仅展示前10名～</p>
        </van-tab>
        <van-tab title="我的邀请记录">
          <!-- <div class="no-record">
            <img class="empty-img" src="../../../assets/img/no-record.png" alt="">
            <p class="empty-text">暂时还没有邀请记录</p>
          </div> -->
          <div class="invation-record">
            <div class="invation-reward">
              <div class="reward-left">
                <p class="left-text">共获得奖励</p>
                <p>
                  <span class="unit">¥</span>
                  <span class="money">100</span>
                </p>
              </div>
              <div class="reward-right">
                <div>
                  <p>共成功邀请3人</p>
                  <p>下单签收成功1人</p>
                </div>
                <img class="check" src="../../../assets/img/check.png" alt="">
              </div>
            </div>
            <ul class="record-list">
              <li class="record-item">
                <div class="record-item_left">
                  <img class="avator" src="" alt="">
                  <div clas="userinfo">
                    <p class="name">张***端</p>
                    <p class="date">5月10日受邀注册</p>
                  </div>
                </div>
                <div class="record-item_right">
                  <p>注册成功，暂时未下单</p>
                </div>
              </li>
              <li class="record-item">
                <div class="record-item_left">
                  <img class="avator" src="" alt="">
                  <div clas="userinfo">
                    <p class="name">张***端</p>
                    <p class="date">5月10日受邀注册</p>
                  </div>
                </div>
                <div class="record-item_right">
                  <p>注册成功，暂时未下单</p>
                </div>
              </li>
            </ul>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <van-action-sheet v-model="showShare">
      <div class="content">
        <div class="share-item">
          <img src="../../../assets/img/wechat.png" alt="">
          <span>微信好友</span>
        </div>
        <div class="share-item">
          <img src="../../../assets/img/wechat-moments.png" alt="">
          <span>微信朋友圈</span>
        </div>
      </div>
      <div @click="showShare = false" class="cancel">取消</div>
    </van-action-sheet>
  </div>
</template>

<script>
import Swiper from "swiper"

export default {
  data () {
    return {
      showShare: false,
      active: 0,
      barrageList: [
        {
          name: '张三'
        },
        {
          name: '李四'
        },
        {
          name: '王'
        }
      ],
      rankingList: [
        {
          name: 'cui1',
          num: 200
        },
        {
          name: 'cui2',
          num: 200
        },
        {
          name: 'cui3',
          num: 200
        },
        {
          name: 'cui4',
          num: 200
        },
        {
          name: 'cui5',
          num: 200
        },
        {
          name: 'cui6',
          num: 200
        },
        {
          name: 'cui7',
          num: 200
        },
        {
          name: 'cui8',
          num: 200
        },
        {
          name: 'cui9',
          num: 200
        },
        {
          name: 'cui10',
          num: 200
        }
      ]
    }
  },
  methods: {
    // 查看规则
    goRule() {
      this.$router.push('/invaition-rule')
    },
    initSwiper() {
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
          loadPrevNextAmount: 3
        },
        touchMoveStopPropagation: false
        // initialSlide: 1
      })
    }
  },
  mounted() {
    this.initSwiper()
  }
}
</script>

<style scoped src="../../../assets/css/swiper.css"></style>
<style scoped lang="stylus">
.invitation-gifts
  background #F9F9F9
  .top-bg
    position relative
    width 100%
    height 13.68rem
    background url('../../../assets/img/Invitation-bg.png') no-repeat center
    background-size 100% 13.68rem
    .subtitles {
      height: 1.2rem;
      width: 4.2rem;
      position: absolute;
      top -.4rem
      left: 0rem;
      // display: flex
      ul {
        display: -webkit-box !important;
        li {
          background-color: rgba(0, 0, 0, 1);
          display: inline-flex;
          width: auto !important;
          max-width: 100%;
          color: #fff;
          opacity: 0.5;
          border-radius: 0 .4rem .4rem 0;
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
            background skyblue
            display block  
            margin-right .2rem
          }
          .go-icon {
            width .87rem
            height .2rem
            display block
          }
          }
      }
    }
    .rules
      font-size .24rem
      color #ffffff
      text-align center
      height .44rem
      line-height .44rem
      width 1.4rem
      border 1px solid rgba(255,255,255,.5)
      border-right none
      border-radius 0.2rem 0rem 0rem 0.2rem
      position absolute
      right 0
      top .32rem
  .invite-now
    position absolute
    width 6.80rem
    height 1.16rem
    left 50%
    transform translateX(-50%)
    top 7.06rem
  .howjoin-des
    position absolute
    top 8.64rem
    left 50%
    transform translateX(-50%)
    display flex
    flex-direction column
    align-items center
    justify-content center
    .howjoin-title
      width 3.36rem
      height .44rem
    .activity-des
      width 6.7rem
      height 3.4rem
      margin-top .3rem
.ranking-invaterecord
  padding-top .2rem
  >>>.van-tab__text
    font-weight bolder
    color #333333
    font-size .28rem
  >>>.van-hairline--top-bottom::after
    border-width 0
    border-bottom 1px solid #E8E8E8
  >>>.van-tabs__nav
    background #F9F9F9
  .ranking-list
    margin-top .42rem
    padding 0 .4rem
    .ranking-item
      height .64rem
      line-height .64rem
      margin-bottom .3rem
      display flex
      align-items center
      justify-content space-between
      .ranking-item_left
        .top3
          width .44rem
          height .3rem
          margin-right .2rem
          vertical-align middle
        .avator
          width .64rem
          height .64rem
          vertical-align middle
          margin-right .3rem
        .ranking-order
          font-size .3rem
          color #262628
          font-weight bold
          margin-right .32rem
          margin-left .15rem
        .ranking-name
          font-size .3rem
          color #333333
          font-weight bolder
      .ranking-item_right
        font-size .28rem
        color #333333
        font-weight bolder
        .num
          color #FF0000
          margin 0 .1rem
          font-weight bolder
    .ranking-item:last-child
      .ranking-order
        margin-left 0
  .tips
    text-align center
    color #999999
    font-size .28rem
    padding .12rem 0 .44rem
  .no-record
    display flex
    flex-direction column
    justify-content center
    align-items center
    padding .6rem 0 1.5rem
    .empty-img
      width 1.82rem
      height 1.54rem
    .empty-text
      font-size .28rem
      color #666666
      height .4rem
      line-height .4rem
      padding-top .28rem
  .invation-record
    padding .28rem 0.24rem .5rem
    .invation-reward
      background url('../../../assets/img/invation-record.png') no-repeat center
      width 7.02rem
      height 1.96rem
      background-size 7.02rem 1.96rem
      position relative
      .reward-left
        position absolute
        top .48rem
        left .46rem
        .left-text
          font-size .18rem
          color #333333
          height .26rem
          line-height .26rem
        .unit
          color #FF0000
          font-size .28rem
          font-weight bolder
        .money
          font-size .6rem
          color #FF0000
          font-weight bold
      .reward-right
        position absolute
        top .48rem
        right .48rem
        display flex
        align-items center
        justify-content space-between
        width 4.2rem
        p
          font-size .28rem
          color #333333
          height .4rem
          line-height .4rem
        p:first-child
          margin-bottom .12rem
        .check
          width 1.2rem
          height .6rem
      .reward-right:before
        content ''
        position absolute
        width 1px
        height 1.62rem
        background #EEEEEE
        top -.35rem
        left -.28rem
    .record-list
      margin-top .28rem
      padding 0 .2rem
      .record-item
        display flex
        align-items center
        justify-content space-between
        &:not(:last-child)
          margin-bottom .3rem
        .record-item_left
          display flex
          align-items center
          .avator
            margin-right .3rem
            width .96rem
            height .96rem
            border-radius 50%
            display block
            background skyblue
          .name
            height .42rem
            line-height .42rem
            color #333333
            font-size .3rem
          .date
            font-size .28rem
            color #999999
            height .36rem
            line-height .36rem
            margin-top .04rem
.content
  display flex
  align-items center
  justify-content center
  padding-top .3rem
  padding-bottom .24rem
  .share-item
    display flex
    flex-direction column
    align-items center
    &:first-child
      margin-right 1.54rem
    img
      width .8rem
      height .8rem
    span
      color #777777
      font-size .24rem
      margin-top .08rem
      height .3rem
      line-height .3rem
.cancel
  width 100%
  height 1.04rem
  line-height 1.04rem
  text-align center
  font-size .32rem
  color #666666
  border-top .2rem solid #F9F9F9
</style>