<template>
  <div class="toast" v-show="isShow">
    <span>{{message}}</span>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message, duration = 2000) {
      this.message = message;
      this.isShow = true;
      setTimeout(() => {
        this.message = '';
        this.isShow = false;
      }, duration)
    }
  }
}
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 8px 10px;
    border-radius: 3px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 999;
  }
</style>