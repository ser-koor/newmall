<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="@/assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="titles">
      <div v-for="(item, index) in titles"
          :key="item"
          class="titles-item"
          :class="{active: index === currentIndex}"
          @click="clickIndex(index)">{{item}}</div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  components: {
    NavBar
  },
  methods: {
    clickIndex(index) {
      this.currentIndex = index;
      this.$emit('titleClick',index)
    },
    backClick() {
      this.$router.back()
    }
  }
};
</script>

<style scoped>
.titles {
  display: flex;
  font-size: 13px;
}

.titles-item {
  flex: 1;
}

.active {
  color: var(--color-high-text);
}

.back img {
  margin-top: 12px;
}
</style>