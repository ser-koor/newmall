<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  data() {
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  components: {
    BScroll
  },
  mounted() {
    // 组件生成后创建滚动
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      //决定是否派发 scroll 事件，对页面的性能有影响
      // 1. probeType 为 0，在任何时候都不派发 scroll 事件，
      // 2. probeType 为 1，仅仅当手指按在滚动区域上，每隔 momentumLimitTime 毫秒派发一次 scroll 事件，
      // 3. probeType 为 2，仅仅当手指按在滚动区域上，一直派发 scroll 事件，
      // 4. probeType 为 3，任何时候都派发 scroll 事件，包括调用 scrollTo 或者触发 momentum 滚动动画
      prebeType: this.probeType,
      //上拉刷新
      pullUpLoad: this.pullUpLoad
    })

    //监听滚动的距离
    this.scroll.on('scroll', (position) => {
      // console.log(position);
      this.$emit('scroll', position)
    })

    // 监听上拉刷新
    this.scroll.on('pullingUp', () => {
      // console.log("上拉刷新成功");
      this.$emit('pullingUp')
    })
  },
  methods: {
    //滚动方法
    Scrollto(x, y, time=500) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    //上拉刷新完成
    finishPullUp() {
      this.scroll.finishPullUp()
    },
    //刷新scroll
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    //切换页面时获取之前页面的位置
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>