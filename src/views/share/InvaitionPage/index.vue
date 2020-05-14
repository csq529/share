<template>
  <div class="invation-page">
    <div class="top">
      <div class="go-btn">
        <img class="go-btn_img" src="../../../assets/img/gosee-btn.png" alt="">
      </div>

    </div>
    <div class="recommend-annual">
          <div class="recommend-title">
            <img class="recommend-title_img" src="../../../assets/img/aunal-title.png" alt="">
          </div>
          <div class="auctions-scene_item" v-for="(item, index) in recommendList" :key="index">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      recommendList: [
        {
          zhuanchangid: 289,
          zhuanchangmingcheng: "「观心」名家绘画精品专场",
          zhuanchangleixing: "3",
          ennameyi: "INTROSPECTION",
          ennameer: "Fine Paintings Session",
          shouyetu: "https://icouncil.oss-cn-beijing.aliyuncs.com/zhuanchang/1539949589394.png",
          appletmainimg: "https://icouncil.oss-cn-beijing.aliyuncs.com/null",
          zhuanchangjianjie: "",
          kaishiriqi: "2018-10-26 11:00:00",
          jieshuriqi: "2018-10-27 13:30:00",
          baozhengjin: 10,
          zhuangtai: "4",
          zhuangtaititle: "已结束",
          paipinshuliang: 20,
          weiguancishu: 312,
          jiaojiacishu: 993,
          pageurl: "/pages/special_field_detail/index?id=289",
          systemTime: 1589376952278,
          countdownLabel: "已结束",
          countdownTime: "10-27 13:30"
        }
      ]
    }
  }
}
</script>

<style scoped lang="stylus">
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
    padding 0 .5rem
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
</style>