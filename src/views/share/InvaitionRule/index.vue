<template>
  <div class="invaition-rule">
    <img class="rule-title" src="../../../assets/img/rule-title.png" alt="">
    <div class="rule-content">
      <ul class="rule-list">
        <li class="rule-item">
          <div class="rule-item_left">
            <span class="dot">1</span>
          </div>
          <div class="rule-item_right">
            <span class="title">标题</span>
            <p class="content">活动具体规则具体规则具体规则具体规则具体规则具体规则具体规则具体规则具体规则具体规则具体规则具体规则活动具体规则具体规则具体规则具体规则具体规则具体规则具体规则具体规则具体规则具体规则具体规则具体规则活动具体规则具体规则具体规则具体规则具体规则</p>
          </div>
        </li>
        <li class="rule-item">
          <div class="rule-item_left">
            <span class="dot">2</span>
          </div>
          <div class="rule-item_right">
            <span class="title">标题</span>
            <p class="content">活动具体规则具体规则具体规则具体规则具体规则具体规则具体规则具体规则具体规则具体规则具体规则具体规则活动具体规则具体规则具体规则具体规则具体规则具体规则具体规则具体规则具体规则具体规则具体规则具体规则活动具体规则具体规则具体规则具体规则具体规则</p>
          </div>
        </li>
        <li class="rule-item">
          <div class="rule-item_left">
            <span class="dot">3</span>
          </div>
          <div class="rule-item_right">
            <span class="title">标题</span>
            <p class="content">活动具体规则具体规则具体规则具体规则具体规则具体规则具体规则具体规则具体规则具体规则具体规则具体规则活动具体规则具体规则具体规则具体规则具体规则具体规则具体规则具体规则具体规则具体规则具体规则具体规则活动具体规则具体规则具体规则具体规则具体规则</p>
          </div>
        </li>
        <li class="rule-item">
          <div class="rule-item_left">
            <span class="dot">4</span>
          </div>
          <div class="rule-item_right">
            <span class="title">标题</span>
            <p class="content">活动具体规则具体规则具体规则具体规则具体规则具体规则具体规则具体规则具体规则具体规则具体规则具体规则活动具体规则具体规则具体规则具体规则具体规则具体规则具体规则具体规则具体规则具体规则具体规则具体规则活动具体规则具体规则具体规则具体规则具体规则</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="stylus">
.invaition-rule
  width 100%
  height 100%
  background url('../../../assets/img/rule-bg.png') no-repeat center
  background-size 100% 100%
  overflow: hidden
  .rule-title
    width 2.6rem
    height .72rem
    display block
    margin 1rem auto .5rem
  .rule-content
    background url('../../../assets/img/rule-content.png') no-repeat center
    width 6.7rem
    height 9.4rem
    background-size 6.7rem 9.4rem
    margin 0 auto
    overflow-y scroll
    .rule-list
      padding .54rem .4rem
      .rule-item
        display flex
        align-items flex-start
        position relative
        &:not(:last-child)
          margin-bottom .44rem
        &:not(:last-child)::after
          content: "";
          position: absolute;
          z-index: 1;
          pointer-events: none;
          background-color: #FFCFC1;
          width: 1px;
          top: 0;
          bottom: 0;
          left: 0;
          top: .4rem;
          left: .25rem;
          bottom: -.5rem;

        .rule-item_left
          display flex
          align-items center
          .dot
            width .48rem
            height .48rem
            background #FFCFC1
            border-radius 50%
            font-size .28rem
            color #ffffff
            text-align center
            line-height .48rem
            font-family:PingFangSC-Semibold,PingFang SC;
            margin-right .2rem
        .rule-item_right
          .title
            font-size .28rem
            color #000000
            line-height .4rem
          .content
            font-size .24rem
            color #000000
            line-height .34rem
            margin-top .2rem
</style>