// import { reject, resolve } from 'core-js/fn/promise';
import {
  ADD_COUNT,
  ADD_Cart
} from './mutation_types'

export default {
  addCart({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      // payload新添加的商品
      let oldCartlist = state.cartList.find(item => item.iid === payload.iid)
      // 判断oldCartlist
      if (oldCartlist) {
        commit(ADD_COUNT, oldCartlist);
        resolve('商品数量+1')
      } else {
        payload.count = 1;
        commit(ADD_Cart, payload);
        resolve('成功添加商品')
      }
    })
  }
}