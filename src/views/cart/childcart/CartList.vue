<template>
  <div class="cart-list">
      <cart-list-item v-for='(item, index) in list' :key="index" :itemInfo='item'></cart-list-item>
  </div>
</template>

<script>
import CartListItem from './CartListItem'

import { mapGetters } from 'vuex'

export default {
  name: 'CartList',
  components: {
    CartListItem
  },
  computed: {
      ...mapGetters({list: 'cartList'})
  }
}
</script>

<style scoped>

</style>