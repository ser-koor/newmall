import {
  ADD_COUNT,
  ADD_Cart
} from './mutation_types'

export default {
  [ADD_COUNT](state, payload) {
    payload.count += 1;
  },
  [ADD_Cart](state, payload) {
    payload.isCheck = true;
    state.cartList.push(payload)
  }
}