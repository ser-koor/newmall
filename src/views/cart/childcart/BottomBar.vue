<template>
  <div class="bottom-menu">
    <check-button class="select-all" @click.native="checkBtnClick" :isCheck="isCheckAll"></check-button>
    <span class="check">全选</span>
    <span class="total-price">合计: ¥{{totalPrice | getPriceVal}}</span>
    <span class="buy-product" @click="calcClick">去计算({{cartLength}})</span>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";
import { filtersTow } from '@/common/mixin.js'
import { mapGetters } from 'vuex'
export default {
  name: "BottomBar",
  data() {
    return {
      bottonIsCheck: true
    };
  },
  mixins: [filtersTow],

  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      return this.$store.state.cartList
        .filter(value => value.isCheck)
        .reduce((preValue, value) => {
          return preValue + value.price * value.count;
        }, 0);
    },
    ...mapGetters(['cartList']),
    cartLength() {
      return this.cartList.filter(value => value.isCheck).length
    },
    isCheckAll() {
      if (this.cartList.length === 0) return false
      return !this.cartList.find(item => !item.isCheck)
    }
  },
  methods: {
    checkBtnClick() {
      if (this.isCheckAll) {
        this.cartList.forEach(item => item.isCheck = false)
      } else {
        this.cartList.forEach(item => item.isCheck = true)
      }
    },
    calcClick() {
      let calcLength = this.cartList.filter(item => !item.isCheck).length
      if (calcLength === this.cartList.length) {
        this.$toast.show('请添加商品')
      }
    }
  }
};
</script>

<style scoped>
.bottom-menu {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 50px;
  left: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
}

.bottom-menu .select-all {
  position: absolute;
  line-height: 0;
  left: 10px;
  top: 10px;
}

.check {
  padding-left: 3px;
}

.bottom-menu .total-price {
  margin-left: 15px;
  font-size: 16px;
  color: #666;
}

.bottom-menu .buy-product {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  float: right;
}
</style>
