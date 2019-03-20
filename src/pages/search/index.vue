<template>
  <view>
    <!-- 搜索分区 -->
    <view class="search-wrapper">
      <view class="search-input">
        <icon type="search" size="30rpx"></icon>
        <input type="text" 
        :value="keyword"
        v-model="inputVal"
        placeholder="请输入你想要的商品"
        @confirm="handleSearch"
        @input="handleInput"
        >
      </view>
      <button class="cancel" size="mini" @tap="handleCancel" v-show="inputVal">取消</button>
    </view>
    <!-- 历史分区 -->
    <view class="history-title">
      <text>历史搜索</text>
      <icon type="clear" size="30rpx" @tap="handleRemoveHistory"></icon>
    </view>
    <view class="history-list">
      <block v-for="(item,index) in history" :key="index">
        <view class="history-list-item" @tap="gotoGoodsList(item)">{{ item }}</view>
      </block>
    </view>
    <!-- 搜索提示 -->
    <scroll-view scroll-y class="search-tips" v-show="inputVal">
      <block v-for="(item,index) in tips" :key="index">
        <view class="search-tips-item" @tap="gotoDetail(item.goods_id)">{{ item.goods_name }}</view>
      </block>
    </scroll-view>
  </view>
  
</template>

<script>
import {getTips} from '@/api/index.js';
export default {
  data () {
    return {
      keyword:'',
      history:wx.getStorageSync('history')||[],
      tips:[],
      inputVal:''
    }
  },
  onLoad(query){
    this.keyword=query.keyword;
  },
  methods:{
    //搜索框中输入完成时触发
    handleSearch(){
      //1.将输入的内容存入搜索历史数组,并存入本地储存中，避免刷新页面时，搜索历史的丢失
      this.history.unshift(this.inputVal);
      //数组去重
      this.history=[...new Set(this.history)];
      wx.setStorageSync('history',this.history);
      //2.跳转到相应的商品列表页中
      //因为商品列表页和搜索页可以相互跳转，容易造成页面栈满导致无法跳转，所以用redirectTo替代navigateTo
      wx.redirectTo({ url: '/pages/goods_list/main?keyword='+this.inputVal });
    },
    handleCancel(){
      this.inputVal='';
    },
    //点击历史搜索X，清空历史搜索
    handleRemoveHistory(){
      this.history=[],
      wx.removeStorageSync('history');
    },
    //点击历史搜索的其中一个关键字，跳转到相应的商品列表页
    gotoGoodsList(keyword){
      wx.redirectTo({ url: '/pages/goods_list/main?keyword='+keyword });
    },
    //搜索框中输入文字触发，使搜索提示tips显示
    handleInput(){
      //请求搜索建议查询数据
      getTips({query:this.inputVal})
      .then((res)=>{
        //console.log(res);
        this.tips=res.data.message;
      })
    },
    //点击tips中的选项，跳转到相应的商品详情页中
    gotoDetail(goods_id){
      wx.navigateTo({ url: '/pages/goods_detail/main?goods_id='+goods_id });
    }
  }
  
}
</script>

<style lang="scss">
// 搜索分区
.search-wrapper{
    background: #eee;
    padding:20rpx;
    display: flex;
    .search-input{
        background: #fff;
        display: flex;
        align-items: center;
        height: 60rpx;
        flex:1;
        icon{
            margin:0 10px;
        }
        input{
            flex:1;
            font-size: 14px;
            padding-right:20rpx;
        }
    }
    .cancel{
        width:160rpx;
        height:60rpx;
        padding:0;
        line-height: 58rpx;
        margin-left:20rpx;
    }
}
// 历史分区
.history-title{
    padding:20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.history-list{
    padding:10rpx;
    &-item{
        display: inline-block;
        padding:0 20rpx;
        line-height: 2;
        background:#eee;
        margin:10rpx;
    }
}
// 搜索提示
.search-tips{
  position: fixed;
  left:0;
  right:0;
  top:98rpx;
  bottom:0;
  background-color: #eee;
    &-item{
      border-bottom:1rpx solid #ccc;
      padding: 20rpx;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
}
</style>
