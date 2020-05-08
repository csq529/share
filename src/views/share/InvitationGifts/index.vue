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
        <div class="rules">活动规则</div>
      </div>
      <img class="invite-now" src="../../../assets/img/invite-now.png" alt="">
      <div class="howjoin-des">
        <img class="howjoin-title" src="../../../assets/img/how-join.png" alt="">
        <img class="activity-des" src="../../../assets/img/activity-des.png" alt="">
      </div>
    </div>
    <div class="ranking-invaterecord">
      <van-tabs v-model="active">
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
          <div class="no-record">
            <img class="empty-img" src="../../../assets/img/no-record.png" alt="">
            <p class="empty-text">暂时还没有邀请记录</p>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper"

export default {
  data () {
    return {
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
  padding .2rem .4rem 0
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
</style>