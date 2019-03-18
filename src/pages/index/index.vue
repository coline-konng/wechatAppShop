<template>
  <view>
    <view class="searchBar">
    <navigator url="/pages/search/main" open-type="navigate">
      <icon type="search" size="30rpx" />
      搜索
    </navigator>
    </view>
    <!-- 轮播图 -->
    <swiper
      indicator-dots
      indicator-color="rgba(255, 255, 255, .3)"
      indicator-active-color="rgba(255, 255, 255, .8)"
      autoplay
      interval="5000"
      duration="1000"
      circular
      class="bannerSwiper"
    >
      <block v-for="(item,index) in imgInfo" :key="index">
        <swiper-item>
          <image :src="item.image_src" class="slide-image"></image>
        </swiper-item>
      </block>
    </swiper>
    <!-- 导航工具栏 -->
  <view class='navBar'>
    <block v-for="(item,index) in navBarInfo" :key="index">
      <image :src="item.image_src" mode='apectfill'></image>
    </block>
  </view>
  <!-- 时尚女装 -->
<block v-for="(item,index) in productList" :key="index">
  <view class='productList'>
  <view class='listTitle'>
  <image :src="item.floor_title.image_src" ></image>
  </view>
  <view class='listContent'>
    <view class='left'>
      <image :src='item.product_list[0].image_src'></image>
    </view>
    <view class='right'>
      <block v-for="(subItem,subIndex) in item.product_list" :key="subIndex"> 
        <image :src='subItem.image_src' v-if="subIndex!=0"></image>
      </block>      
    </view>
  </view>
  </view>
</block>
</view>

</template>

<script>
export default {
  data() {
    return {
      imgInfo: [
      ],
      navBarInfo:[],
      productList:[]
    };
  },
  onLoad(){
    //请求轮播图部分
    wx.request({
      url:'https://www.zhengzhicheng.cn/api/public/v1/home/swiperdata',
      method:'GET',
      success:(res)=>{
        //console.log(res);
        const {message}=res.data;
        this.imgInfo=message;
      }
    });
    //请求导航工具栏部分
    wx.request({
      url:'https://www.zhengzhicheng.cn/api/public/v1/home/catitems',
      method:'GET',
      success:(res)=>{
        //console.log(res);
        const {message}=res.data;
        this.navBarInfo=message;
      }
    });
    //请求首页楼层数据
    wx.request({
      url:'https://www.zhengzhicheng.cn/api/public/v1/home/floordata',
      method:'GET',
      success:(res)=>{
        //console.log(res);
        const {message}=res.data;
        this.productList=message;
      }
    });
  }
};
</script>

<style>
.searchBar{
  background: #ff2d4a;
  padding:20rpx;
}
.searchBar navigator{
  box-sizing:border-box;
  height: 60rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #fff;
  background: #eee;
  font-size: 30rpx;
  color: #ccc;
}
.bannerSwiper{
  height: 340rpx;
  width: 100%;
}
.bannerSwiper image{
  height: 100%;
  width: 100%;
}
.navBar{
  display: flex;
  margin-bottom: 20rpx;
  justify-content: space-around;
  align-items: center;
  height: 180rpx;
}
.navBar image{
  width:128rpx;
  height: 140rpx;
}
.productList .listTitle{
  background: #f5f5f5;
  padding-top:30rpx;
}
.productList .listTitle image{
  width: 100%;
  height: 59rpx;
}
.productList .listContent{
  display: flex;
  margin: 10rpx 0;
}
.listContent .left image{
  width: 232rpx;
  height: 386rpx;
  margin: 0 10rpx;
}
.listContent .right image{
  width: 232rpx;
  height: 188rpx;
  margin-right: 10rpx;
}
</style>
