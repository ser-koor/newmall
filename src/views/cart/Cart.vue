<template>
  <div id="cart">
    <nav-bar class="cart-top">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <scroll class="content" :probe-type="3" :pull-up-load="true" ref="scroll">
      <cart-list></cart-list>
    </scroll>
    <bottom-bar/>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue'
import Scroll from '@/components/common/scroll/Scroll.vue'

import CartList from './childcart/CartList'
import BottomBar from './childcart/BottomBar'

import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  components: {
    NavBar,
    Scroll,
    CartList,
    BottomBar
  },
  computed: {
    ...mapGetters({
      length: 'cartLength'
    })
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
  #cart {
    height: 100vh;
  }
  .cart-top {
    background-color: var(--color-tint);
    color: #fff;
  }
  .content {
    height: calc(100% - 44px);
    overflow: hidden;
  }
</style>