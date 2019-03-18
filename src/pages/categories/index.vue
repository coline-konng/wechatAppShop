<template>
  <view>
    <app-search></app-search>
    <!-- 主体内容部分 -->
    <view class="cate_main">
    <!-- 左边导航栏 -->
      <scroll-view scroll-y class="left_menu">
        <block v-for="(item,index) in [1,2,13,3,4,56,3,2,4,3,2]" :key="index">
          <view class="menu_item" 
          :class="{ active: index===tabIndex }"
          @tap="handleChangeTab(index)"
          >大家电</view>
       </block>
      </scroll-view>
    <!-- 右边内容部分 -->
      <scroll-view scroll-y class="right_content">
        <view class="content_title">电视</view>
        <view class="content_list">
          <block v-for="(item,index) in [1,2,13,3,4,56,3,2,4,3,2,2,13,3,4,56,3,2,4,3,2,2,13,3,4,56,3,2,4,3,2]" :key="index">
            <view class="content_info">
              <image src="https://img.alicdn.com/bao/uploaded/i2/3248014320/TB2ETXMieySBuNjy1zdXXXPxFXa_!!3248014320-0-item_pic.jpg_200x200q90.jpg"></image>
              <view>曲面电视</view>
            </view>
          </block>
        </view>
      </scroll-view>
    </view>
  </view>
    
</template>

<script>
import Search from '../../components/Search.vue'
export default {
  data () {
    return {
      tabIndex:0
    }
  },
  components:{
    "app-search": Search
  },
  methods:{
    handleChangeTab(index){
      this.tabIndex=index;
    }
  }
}
</script>

<style>
.cate_main{
  display: flex;
  position: fixed;
  top:100rpx;
  bottom:0;
  left:0;
  right: 0;
}
.cate_main .left_menu{
  width: 200rpx;
  flex-shrink: 0;
}
.left_menu .menu_item{
  background: #f4f4f4;
  line-height: 100rpx;
  text-align: center;
  border-bottom: 1px solid #ccc;
  position: relative;
}
.left_menu .menu_item.active{
  color: #eb4450;
  background: #fff;
}
.left_menu .menu_item.active::before{
  content:'';
  width:8rpx;
  background: #eb4450;
  position: absolute;
  left:0;
  top:20rpx;
  bottom:20rpx;
}
.cate_main .right_content{
  flex: 1;
}
.right_content .content_title{
  text-align: center;
  padding:30rpx 0;
}
.right_content .content_title::before,
.right_content .content_title::after{
  content:'/';
  color: #ccc;
  margin: 0 20rpx;
}
.content_list{
  display: flex;
  flex-wrap: wrap;
}
.content_list .content_info{
  width: calc(100%/3);
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  padding:30rpx 0;
}
.content_list .content_info image{
  width: 120rpx;
  height: 80rpx;
}
</style>
