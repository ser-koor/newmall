import { debounce } from './utils.js'

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    //刷新频繁 防抖动
   const refresh = debounce(this.$refs.scroll.refresh, 100)
   //监听图片是否加载完成
   this.itemImgListener =  () => { refresh() }
   this.$bus.$on('itemImageLoad', this.itemImgListener)
 },
}

//过滤器 保留两位小数
export const filtersTow = {
  filters: {
    getPriceVal(value) {
      return parseFloat(value).toFixed(2)
    }
  }
}


