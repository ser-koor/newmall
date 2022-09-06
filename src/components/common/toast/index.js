import Toast from './Toast'

const obj = {}

obj.install = function(Vue) {
  // 1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)
  // 2.new一个组件实例
  const toast = new toastContrustor()
  // 3. 将组件对象，手动挂载到位一个元素上
  toast.$mount(document.createElement('div'))
  // 4.toast.$el对应的div
  document.body.appendChild(toast.$el)
  // 5.将组件放到vue原型链上
  Vue.prototype.$toast = toast
}

export default obj