<template>
  <div id="detail">
      <detail-nav-bar class="navbar" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="contentScroll">
      <detail-swiper :image-list="imageList" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageload="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="paramInfo"/>
      <detail-comment-info :comment-info="commentInfo" ref="commentInfo"/>
      <goods-list :goods="recommends" ref="goodsList"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backtopClick" v-show="isshowBackTop"/>
    <toast></toast>
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";
import GoodsList from '@/components/content/goods/GoodsList'
import BackTop from '@/components/content/backtop/BackTop'
import Toast from '@/components/common/toast/Toast'

import DetailNavBar from "./childcomps/DetailNavBar";
import DetailSwiper from "./childcomps/DetailSwiper";
import DetailBaseInfo from "./childcomps/DetailBaseInfo";
import DetailShopInfo from "./childcomps/DetailShopInfo";
import DetailGoodsInfo from "./childcomps/DetailGoodsInfo";
import DetailParamInfo from './childcomps/DetailParamInfo';
import DetailCommentInfo from './childcomps/DetailCommentInfo'
import DetailBottomBar from './childcomps/DetailBottomBar'

import { getDetail, Goods, Shop, GoodsParam, getRecommend} from "@/network/detail.js";
import { itemListenerMixin } from '@/common/mixin.js'
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
    Toast
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      iid: null,
      imageList: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      itemImgListener: null,
      themTopYs: [],
      currentIndex: 0,
      isshowBackTop: false
    };
  },
  created() {
    //??????iid
    this.iid = this.$route.params.iid;
    //??????iid??????????????????
    getDetail(this.iid).then(res => {
      // console.log(this.imageList);
      // console.log(res);
      const data = res.result;
      //?????????????????????
      this.imageList = data.itemInfo.topImages;
      // ??????????????????
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //??????????????????
      this.shop = new Shop(data.shopInfo);
      //????????????????????????
      this.detailInfo = data.detailInfo;
      //??????????????????
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
      //??????????????????
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    });
    // ??????????????????
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
  },
  mounted() {

  },
  methods: {
    titleClick(index) {
      this.$refs.scroll.Scrollto(0, -this.themTopYs[index], 200)
    },
    imageLoad() {
      this.$refs.scroll.refresh()
      this.themTopYs.push(0);
      this.themTopYs.push(this.$refs.paramInfo.$el.offsetTop);
      this.themTopYs.push(this.$refs.commentInfo.$el.offsetTop);
      this.themTopYs.push(this.$refs.goodsList.$el.offsetTop);
      this.themTopYs.push(Number.MAX_VALUE);
      // console.log(this.themTopYs);
    },

    contentScroll(position) {
      const positionY = -position.y;
      //[0, 12206, 13177, 13374]
      //positionY??? 0 12206?????? i = 0
      //positionY??? 12206 13177 i = 1
      //positionY??? 13177 13374 i = 2
      //positionY?????? 13374 i = 3
      let length = this.themTopYs.length
      for(let i = 0; i < length - 1; i++) {
        if (this.currentIndex !== i && (positionY >= this.themTopYs[i] && positionY < this.themTopYs[i+1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      // for(let i = 0; i < length; i++) {
      //   if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themTopYs[i] &&
      //   positionY < this.themTopYs[i+1]) ||(i === length - 1 && positionY >= this.themTopYs[i]))) {
      //       this.currentIndex = i;
      //       this.$refs.nav.currentIndex = this.currentIndex
      //   }
      // }

      //????????????1000px?????? backTop????????????
      this.isshowBackTop = -(position.y) > 1000;
    },
   //??????????????????????????????
   backtopClick() {
    this.$refs.scroll.Scrollto(0, 0)
   },
   //???????????????????????????
   addToCart() {
    // console.log(this.goods);
    let product = {};
    product.image = this.imageList[0];
    product.title = this.goods.title;
    product.desc = this.goods.desc;
    product.price = this.goods.realPrice;
    product.iid = this.iid;
    // this.$store.commit('addCart', product);
    this.$store.dispatch('addCart', product).then(res => {
      this.$toast.show(res,2000)
    });
   },

  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
}

.navbar {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px - 58px);
}

</style>