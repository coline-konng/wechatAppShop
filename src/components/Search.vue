<template>
  <!-- 搜索框 -->
    <view class="searchBar">
    <navigator url="/pages/search/main" open-type="navigate">
      <icon type="search" size="30rpx" />
      搜索
    </navigator>
    </view>
</template>

<script>
export default {
  
}
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
</style>
