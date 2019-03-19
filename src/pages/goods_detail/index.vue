<template>
  <view>
    商品详情页{{id}}
  </view>
</template>

<script>

export default {
  data () {
    return {
      id:''
    }
  },
  onLoad(query){
    this.id=query.id;
  }
}
</script>

<style>

</style>
