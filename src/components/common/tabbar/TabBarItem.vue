<template>
  <div class="tab-bar-item" @click="itemClick">
    <div>
      <slot v-if="!isActive" name="item-icon"></slot>
      <slot v-else name="item-icon-active"></slot>
      <div :style="activeStyle">
        <slot name="item-text"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data() {
    return {
      // isActive: true
    }
  },
  computed: {
    isActive() {
      // return this.$route.path.indexOf(this.path) !== -1
      return this.$route.path.includes(this.path);
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path);
    }
  }
};
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  font-size: 14px;
  height: 49px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
/* .active {
  color: deeppink;
} */
</style>