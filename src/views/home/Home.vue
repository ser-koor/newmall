<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :title="['流行', '新款', '精选']"
                    @TabClick="tabClick"
                    ref="tabcontrol1"
                    v-show="istabcontrol"
                    class="tab-control"/>
    <b-scroll class="content"
              ref="scroll"
              :probe-type='3'
              @scroll="contentScroll"
              :pull-up-load="true"
              @pullingUp="loadMore">
      <homeswiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <home-recommend :recommends="recommends"/>
      <feature-view/>
      <tab-control :title="['流行', '新款', '精选']"
                    @TabClick="tabClick"
                    ref="tabcontrol2"/>
      <goods-list :goods="showGoods"/>
    </b-scroll>

    <back-top @click.native="backtopClick" v-show="isshowBackTop"/>

  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar.vue";
import TabControl from "@/components/content/tabControl/TabControl.vue";
import GoodsList from "@/components/content/goods/GoodsList.vue";
import BScroll from "@/components/common/scroll/Scroll.vue";
import BackTop from '@/components/content/backtop/BackTop.vue'

import Homeswiper from "./childcomps/Homeswiper.vue";
import HomeRecommend from "./childcomps/HomeRecommend";
import FeatureView from "./childcomps/FeatureView";

import { getHomeMultidata, getHomedata } from "@/network/home.js";
import { itemListenerMixin } from '@/common/mixin.js'


export default {
  name: "Home",
  components: {
    NavBar,
    Homeswiper,
    HomeRecommend,
    FeatureView,
    TabControl,
    GoodsList,
    BScroll,
    BackTop
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isshowBackTop: false,
      tabcontroltop: 0,
      istabcontrol: false,
      saveY: 0
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  //在keep-alive组件激活时调用
  activated() {
    //重新刷新一下
    this.$refs.scroll.refresh()
    // 进入组件时回到上次离开时的位置
    this.$refs.scroll.Scrollto(0, this.saveY, 0);

  },
  //在keep-alive组件停用时调用
  deactivated() {
    //保存组件离开时的位置
    this.saveY = this.$refs.scroll.getScrollY()
    //取消全局事件的监听
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  created() {
    //获取Multidata路径
    this.getHomeMultidata()
    //获取Homedata路径
    this.getHomedata('pop');
    this.getHomedata('new');
    this.getHomedata('sell');


  },
  mounted() {

  },
  //详情页因没做缓存，所有没有deactivatd，在组件销毁时destroyed
  destroyed() {
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },

  methods: {
    /*
    *事件监听相关方法
    */
   tabClick(index) {
    switch (index) {
      case 0:
        this.currentType = 'pop';
        break;
      case 1:
        this.currentType = 'new';
        break;
      case 2:
        this.currentType = 'sell';
        break;
      // default:
      //   this.currentType = 'sell';
      //   break;
    }
    this.$refs.tabcontrol1.currentIndex = index;
    this.$refs.tabcontrol2.currentIndex = index;
   },
   //返回顶部点击事件
   backtopClick() {
    this.$refs.scroll.Scrollto(0, 0)
   },
   //监听滚动事件
   contentScroll(position) {
    // console.log(position);
    this.isshowBackTop = -(position.y) > 1000;
    this.istabcontrol = -(position.y) > this.tabcontroltop
    // console.log(this.istabcontrol);
   },
   //上拉加载更多
   loadMore() {
    this.getHomedata(this.currentType)
    // console.log("加载更多");
    //加载更多图片后重新计算可滚动的距离
    this.$refs.scroll.refresh()
   },
   //监听轮播图图片是否加载完成
   swiperImageLoad() {
    //获取tabControl2的offsetTop
    this.tabcontroltop = this.$refs.tabcontrol2.$el.offsetTop;
    // console.log(this.tabcontroltop);
   },
    /*
    *网络请求相关方法
    */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
      // console.log(res);
      //获取轮播图list放入banners
      this.banners = res.data.banner.list;
      //获取推荐recommend图片
      this.recommends = res.data.recommend.list;
    });
    },
    //获取商品列表数据
    async getHomedata(type) {
      let page = this.goods[type].page + 1;
    await getHomedata(type, page).then(res => {
      // console.log(res.data.list);
      this.goods[type].list.push(...res.data.list);
      this.goods[type].page += 1;

      //上拉刷新加载完成
      this.$refs.scroll.finishPullUp()
    })
    }
  }
};
</script>

<style scoped>
#home {
  position: relative;
  /* padding-top: 44px; */
  height: 100vh;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9; */
}

.tab-control {
  position: relative;
  top: -2px;
  z-index: 9;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 43px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
} */
</style>