<template>
  <view>
    {{keyword}}
  </view>
</template>

<script>

export default {
  data () {
    return {
      keyword:''
    }
  },
  onLoad(query){
    this.keyword=query.keyword;
  }
}
</script>

<style>

</style>
