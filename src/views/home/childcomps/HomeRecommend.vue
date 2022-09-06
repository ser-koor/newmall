<template>
  <div class="home-recommend">
    <div v-for="item in recommends" :key="item.acm" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommend",
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
};
</script>

<style>
.home-recommend {
  display: flex;
  width: 100%;
  padding: 10px 0 10px;
  border-bottom: 10px solid #eee;
}
.recommend-item {
  flex: 1;
  justify-content: center;
  text-align: center;
}
.home-recommend img {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
</style>