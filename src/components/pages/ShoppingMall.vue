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
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        'msg': 'Shopping mall',
        'locationIcon': require('../../assets/images/location.png'),
        'bannerPicArray': [],
        'category': [],
        'adBanner': ''
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
</style>