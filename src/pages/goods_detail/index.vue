<template>
  <view>
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
      <block v-for="(item,index) in goodDetail.pics" :key="index">
        <swiper-item>
          <image :src="item.pics_big_url" @tap="handlePreview(item.pics_big_url)"></image>
        </swiper-item>
      </block>
    </swiper>
    <!-- 商品概要 -->
    <view class="goods-price">￥{{ goodDetail.goods_price }}</view>
    <view class="goods-info">
      <view class="info-left">{{ goodDetail.goods_name }}</view>
      <view class="info-right">
        <view class="iconfont icon-shoucang"></view>
        收藏
      </view>
    </view>
    <view class="delivery">快递：免邮费</view>
    <!-- 商品内容详情 -->
    <view class="detail">
      <view class="detail-title">商品详情标题</view>
      <view class="detail-content">
        <!-- <view v-html="goodDetail.goods_introduce"></view> -->
        <!-- wx富文本组件 -->
        <rich-text type="node" :nodes="goodDetail.goods_introduce"></rich-text>
      </view>
    </view>
    <!-- 底部工具栏 -->
    <view class="footer">
      <!-- 绝对定位，隐藏在联系客服的位置上，以调用微信的客服功能 -->
      <view class="contact">
        <button open-type="contact">联系客服</button>
      </view>
      <view class="ft-left">
        <view class="iconfont icon-kefu"></view>
        联系客服
      </view>
      <view class="ft-left">
        <view class="iconfont icon-gouwuche"></view>
        购物车
      </view>
      <view class="ft-right" @tap="handleAddCart(goodDetail.goods_id)">
        加入购物车
      </view>
      <view class="ft-right">
        立即购买
      </view>
    </view>
  </view>
</template>

<script>
import {getDetail} from '@/api/index.js';
export default {
  data() {
    return {
      goods_id: "",
      goodDetail:{}
    };
  },
  onLoad(query) {
    this.goods_id = query.goods_id;
    getDetail({
      goods_id:this.goods_id
    }).then((res)=>{
      this.goodDetail=res.data.message;
      this.goodDetail.goods_introduce=this.goodDetail.goods_introduce.replace(/jpg.+?webp/g,'jpg')
    })
  },
  methods:{
    //点击轮播图片，全屏预览展示
    handlePreview(current){
      let picUrls=this.goodDetail.pics.map(v=>v.pics_big_url);
      wx.previewImage({
        current,
        urls: picUrls //需要预览的图片链接列表,
      });
    },
    //点击加入购物车,提示添加成功，并添加到本地储存中
    handleAddCart(id){
      //如果商品数据没能成功请求完成，也就没有goods_id,此时不做任何操作
      if(!id) return;
      //如有
      // 加入购物车提示
      wx.showToast({
        title: '加入成功', //提示的内容,
        icon: 'success',  //图标,
        duration: 1000,   //延迟时间,1秒钟后自动消失
        mask: true,       //显示透明蒙层，防止触摸穿透
      });
      let cartList=wx.getStorageSync('cartList')||{};
      /* 注意：cartList的数据类型的设计：设计成对象类型，可以把商品信息存入到(id)属性中。
      方便判断该商品是否应该存在 */
      //判断该商品是否已经存在于cartList中
      if(cartList[id]){
        //存在
        cartList[id].count++;
      }else{
        //不存在
        cartList[id]=this.goodDetail;
        cartList[id].count=1;
      }
      cartList[id].selected = true; 
      wx.setStorageSync('cartList', cartList);
    }
  }
};
</script>

<style lang="scss">
swiper {
  height: 720rpx;

  image {
    height: 720rpx;
    width: 750rpx;
  }
}

.goods-price {
  padding: 20rpx;
  color: red;
  font-size: 22px;
}

.goods-info {
  padding: 20rpx;
  padding-top: 0;
  display: flex;

  .info-left {
    flex: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .info-right {
    width: 160rpx;
    flex-shrink: 0;
    text-align: center;
    color: #999;
    border-left: 1px #999 solid;
    font-size: 14px;
    margin-left: 20rpx;

    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
  }
}
.delivery{
  padding-left:20rpx;
  padding-bottom: 20rpx;
  font-size:26rpx;
  color:#999;
}
.detail {
  border-top: 20rpx #eee solid;
  padding-bottom: 120rpx;
  .detail-title {
    padding: 20rpx;
    border-bottom: 1px #eee solid;
  }
  .detail-content {
    // 父级字号设置为0，清除富文本图片之间的默认间距
    font-size: 0;
  }
}

.footer {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  height: 100rpx;
  background: #fff;
  display: flex;

  .contact {
    width: 20%;
    height: 100rpx;
    padding: 0;
    margin: 0;
    position: absolute;
    left: 0;
    top: 0;
    // 隐藏真正的客服聊天按钮
    opacity: 0;
  }

  .ft-left {
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #666;
    font-size: 14px;

    .iconfont {
      font-size: 18px;
    }
  }

  .ft-right {
    width: 30%;
    background: orange;
    line-height: 100rpx;
    text-align: center;
    color: #fff;

    &:last-child {
      background: red;
    }
  }
}
</style>
