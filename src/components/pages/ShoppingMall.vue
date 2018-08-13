<template>
  <div>
    <div class="search-bar">
      <van-row>
        <van-col span="3">
          <img :src="locationIcon" width="80%" class="search-icon">
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input">
        </van-col>
        <van-col span="5">
          <van-button size="mini">查找</van-button>
        </van-col>
      </van-row>
    </div>

    <!-- swipe-area -->
    <div class="swiper-area">
      <van-swipe :autoplay="1000">
        <van-swipe-item v-for="(banner, index) in bannerPicArray" :key="index">
          <img v-lazy="banner.image" width="100%">
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- type bar -->
    <div class="type-bar">
      <div v-for="(cate, index) in category" :key="index">
        <img :src="cate.image" width="90%">
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>

    <!-- adBanner area -->
    <div>
      <img v-lazy="adBanner" width="100%">
    </div>

    <!-- recommend goods area -->
    <div class="recommend-area">
      <div class="recommend-title">
        商品推荐
      </div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) in recommendGoods" :key="index" class="recommend-item">
            <img :src="item.image" alt="暂无图片" width="80%">
            <div>{{item.goodsName}}</div>
            <div>￥{{item.price | moneyFilter}}(￥{{item.mallPrice | moneyFilter}})</div>
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <!-- vue-awesome-swiper demo -->
    <!-- <swiperDefault></swiperDefault>
    <swiperDefault2></swiperDefault2>
    <swiperDefault3></swiperDefault3>
    <swiperText></swiperText> -->

    <!-- floor area -->
    <floorComponent :floorData="floor1" :floorTitle="floorName.floor1"></floorComponent>
    <floorComponent :floorData="floor2" :floorTitle="floorName.floor2"></floorComponent>
    <floorComponent :floorData="floor3" :floorTitle="floorName.floor3"></floorComponent>

    <!-- hot area -->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <!-- list组件 -->
        <van-list>
          <van-row gutter="20">
            <van-col span="12" v-for="(item, index) in hotGoods" :key="index">
              <goodsInfoComponent :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goodsInfoComponent>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'

  // import swiperDefault from '../swiper/swiperDefault'
  // import swiperDefault2 from '../swiper/swiperDefault2'
  // import swiperDefault3 from '../swiper/swiperDefault3'
  // import swiperText from '../swiper/swiperText'

  import floorComponent from '../component/floorComponent'
  import goodsInfoComponent from '../component/goodsInfoComponent'
  import {toMoney} from '@/filter/moneyFilter.js'

  export default {
    data() {
      return {
        'swiperOption': {
          slidesPerView: 3
        },
        'msg': 'Shopping mall',
        'locationIcon': require('../../assets/images/location.png'),
        'bannerPicArray': [],
        'category': [],
        'adBanner': '',
        'recommendGoods': [],
        'floor1': [],
        'floor2': [],
        'floor3': [],
        'floorName': {},
        'hotGoods': [], // 热卖商品
      }
    },
    // components: {swiper, swiperSlide, swiperDefault, swiperDefault2, swiperDefault3, swiperText},
    components: {swiper, swiperSlide, floorComponent, goodsInfoComponent},
    filters: {
      moneyFilter(money) {
        return toMoney(money);
      }
    },
    created() {
      axios({
        url: 'https://www.easy-mock.com/mock/5b58608afce1393a862d031b/index/index',
        method: 'get'
      })
      .then(response => {
        console.log(response)
        if(response.status = "200") {
          this.bannerPicArray = response.data.data.slides;
          this.category = response.data.data.category;
          this.adBanner = response.data.data.advertesPicture.PICTURE_ADDRESS;
          this.recommendGoods = response.data.data.recommend;
          this.floor1 = response.data.data.floor1;
          this.floor2 = response.data.data.floor2;
          this.floor3 = response.data.data.floor3;
          this.floorName = response.data.data.floorName;
          this.hotGoods = response.data.data.hotGoods;
        }
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
</script>

<style scoped>
.search-bar {
  height: 2.2rem;
  line-height: 2.2rem;
  background-color: #e5017d;
  overflow: hidden;
}
.search-icon {
  padding-top: .2rem;
  padding-left: .3rem;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 1px solid #fff !important;
  background-color: #e5017d;
  color: #fff;
}
.swiper-area {
  clear: both;
  max-height: 15rem;
  overflow: hidden;
}
.type-bar {
  background-color: #fff;
  margin: 0 .3rem .3rem .3rem;
  border-radius: .3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.type-bar div {
  flex: 1;
  padding: .3rem;
  font-size: 12px;
  text-align: center;
}

.recommend-area {
  background-color: #fff;
  margin-top: .3rem;
}
.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: .2rem;
  color: #e5017d;
}
.recommend-body {
  border-bottom: 1px solid #eee;
}
.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}

/* hot area */
.hot-area {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
</style>