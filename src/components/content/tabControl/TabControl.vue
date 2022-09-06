<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in title"
      :key="index"
      class="tab-control-item"
      :class="{active: index === currentIndex}"
      @click="clickIndex(index)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentIndex: 0
    };
  },
  props: {
    title: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    clickIndex(index) {
      this.currentIndex = index;
      this.$emit('TabClick', index)
    }
  }
};
</script>

<style>
.tab-control {
  background-color: var(--color-background);
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
}

.tab-control-item {
  flex: 1;
}

.tab-control-item span {
  padding: 5px;
}

.active {
  color: var(--color-high-text);
}

.active span {
  border-bottom: 2px solid var(--color-tint);
}
</style>