<template>
  <view>
    <app-search></app-search>
    <!-- 主体内容部分 -->
    <view class="cate_main">
    <!-- 左边导航栏 -->
      <scroll-view scroll-y class="left_menu">
        <block v-for="(item,index) in cate" :key="index">
          <view class="menu_item" 
          :class="{ active: index===tabIndex }"
          @tap="handleChangeTab(index)"
          >
          {{item.cat_name}}
          </view>
       </block>
      </scroll-view>
    <!-- 右边内容部分 -->
      <scroll-view scroll-y class="right_content">
        <block v-for="(item,index) in rigthtData" :key="index">
          <view class="content_title">{{ item.cat_name }}</view>
          <view class="content_list">
            <block v-for="(subItem,subIndex) in item.children" :key="subIndex">
            <view class="content_info" @tap="gotoGoodsList(subItem.cat_name)">
              <image :src="subItem.cat_icon"></image>
              <view>{{ subItem.cat_name }}</view>
            </view>
            </block>
          </view>
        </block>
      </scroll-view>
    </view>
  </view>
    
</template>

<script>
import Search from '../../components/Search.vue';
import request from '../../utils/request.js';
export default {
  data () {
    return {
      tabIndex:0,
      cate:[],
      rigthtData:[]
    }
  },
  components:{
    "app-search": Search
  },
  onLoad(){
    wx.showLoading({
      title: '加载中',
      mask:true
    }),
    request('api/public/v1/categories')
    .then((res)=>{
      //console.log(res);
      const {message}=res.data;
      this.cate=message;
      wx.hideLoading();
      this.rigthtData=this.cate[this.tabIndex].children;
    })
  },
  methods:{
    //点击菜单栏，切换数据
    handleChangeTab(index){
      //通过修改tabIndex，给左侧菜单栏添加active类
      this.tabIndex=index;
      //修改右边要渲染的数据
      //因为会存在bug:缓存滚动的位置，切换到其他类别的时候，不是从顶部开始展示
      //所以需要先清空，再修改赋值
      this.rigthtData=[];
      setTimeout(()=>{
        this.rigthtData=this.cate[this.tabIndex].children;
      }) 
    },
    // 跳转到商品列表页
    gotoGoodsList(name){
      wx.navigateTo({
        url:'/pages/goods_list/main?keyword='+name
      })
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
