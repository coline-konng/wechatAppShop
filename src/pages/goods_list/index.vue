<template>
  <view>
    <!-- 搜索框 -->
    <view class="searchBar" @tap="gotoSearch(keyword)">
      <view class="searchInput">
        <icon type="search" size="30rpx"/>
        {{keyword}}
      </view>
    </view>
    <!-- tab栏 -->
    <view class="tabBar">
      <block v-for="(item,index) in ['综合','销量','价格']" :key="index">
        <view class="tabItem" 
        :class="{active:index===tabIndex}"
        @tap="handleChangeTab(index)"
        >{{item}}</view>
      </block>
    </view>
    <!-- 产品列表内容 -->
    <view class="goodsLsit">
      <block v-for="(item,index) in goodsList" :key="index">
        <view class="goodsItem" @tap="gotoDetail(item.goods_id)">
          <view class="goodsImg">
            <image :src="item.goods_small_logo"></image>
          </view>
          <view class="goodsInfo"> 
            <view class="goodsTitle">{{ item.goods_name }}</view>
            <view class="goodsPrice">￥<text>{{ item.goods_price }}</text></view>
          </view>
      </view>
      </block>
      
    </view>
    <!-- 4.0 没有数据的提示 -->
    <view class="loading" v-if="!hasMore">我是有底线的....</view>
  </view>
</template>

<script>
import {getSearch} from '@/api/index.js'
//console.log(getSearch);
export default {
  data() {
    return {
      keyword: "",
      tabIndex:0,
      goodsList:[],
      pagenum:1,
      pagesize:20,
      hasMore:true
    };
  },
  onLoad(query) {
    this.keyword = query.keyword;
    this.getGoodsData();
  },
  //页面卸载
  onUnload(){
    //由于小程序页面存在data缓存，所以页面卸载的时候，需要初始化数据
    this.initData();
  },
  methods:{
    handleChangeTab(index){
      this.tabIndex=index;
    },
    //初始化数据
    initData(){
      this.pagenum=1;
      this.goodsList=[];
      this.hasMore=true;
    },
    //获取商品列表数据
    getGoodsData(){
      //如果没有更多，则不再请求数据
      if(!this.hasMore) return; 
      //加载提示
      wx.showLoading();
      getSearch({
        query:this.keyword,
        cid:'',
        pagenum:this.pagenum,
        pagesize:this.pagesize
      }).then((res)=>{
      //此时的goods存放的是新请求回来的20条数据
      const {goods}=res.data.message;
      //将新请求回来的数据，追加到原有的数据goodsList之后，重新赋值给数组goodsList
      this.goodsList=[...this.goodsList,...goods];
      this.pagenum++;
      //判断还有没有更多数据(新请求回来的数据条数<设定的pagesize),没有的话，修改hasMore为false
      if(goods.length<this.pagesize){
        this.hasMore=false;
        }
      })
      //停止下拉刷新动画
      wx.stopPullDownRefresh();
      //关闭加载提示
      wx.hideLoading();
    },
    gotoSearch(keyword){
      wx.redirectTo({ url: '/pages/search/main?keyword='+keyword });
    },
    gotoDetail(id){
      wx.navigateTo({ url: '/pages/goods_detail/main?id='+id });
    }
  },
  //监听用户上拉触底事件
  onReachBottom(){
    // 修改请求数据pagenum，重新请求数据
    this.getGoodsData();
  },
  //监听用户下拉刷新
  onPullDownRefresh(){
    //修改请求数据，重新请求
    this.initData();
    this.getGoodsData();
  }
};
</script>

<style lang="scss">
/* 搜索框 */
.searchBar {
  background: #eee;
  padding: 30rpx 16rpx;
  .searchInput {
    box-sizing: border-box;
    height: 60rpx;
    display: flex;
    align-items: center;
    background: #fff;
    border:1px solid #eee;
    border-radius: 10rpx;
    font-size: 30rpx;
    color: #000;
    padding-left: 30rpx;
    icon{
      margin-right: 20rpx;
      color: #ccc;
    }
  }
}
/* tab栏 */
.tabBar{
  display: flex;
  align-items: center;
  text-align: center;
  height: 100rpx;
  border-bottom: 1rpx solid #ddd;
  .tabItem{
    flex: 1;
    &.active{
      color: #eb4450;
    }
  }
}
/* 商品列表 */
.goodsItem{
  display: flex;
  padding:20rpx 0;
  border-bottom: 1rpx solid #ddd;
  .goodsImg{
    flex: 1;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    image{
      width: 200rpx;
      height: 200rpx;
    }
  }
  .goodsInfo{
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .goodsTitle{
    /* white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; */
      display: -webkit-box ;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      -webkit-box-orient: vertical;
      -webkit-line-clamp:2;
      font-size: 30rpx;
    }
    .goodsPrice{
        color: #eb4450;
        font-size: 24rpx;
        text{
          font-size: 36rpx;
        }
    }
  }
}

.loading{
    line-height: 80rpx;
    text-align: center;
    font-size:14px;
    color:#999;
}
</style>
