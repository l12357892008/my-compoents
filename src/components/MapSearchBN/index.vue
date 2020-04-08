<!-- 百度地图搜索提示,NPM方式引入
   npm i vue-baidu-map -S
   main.js中加入
   import BaiduMap from 'vue-baidu-map'
   Vue.use(BaiduMap, {
     ak: 'kj5X1TWZYyxA6d8LsTDT0MwiqNqsmlqw'
   })
   不好使用,并被官方不推荐使用
 -->
<template>
  <div id=''>
    <baidu-map class='bm-view' :center="{lng: 116.403765, lat: 39.914850}" :zoom="11">
      <bm-view class="map" style="width: 300px;height: 300px;"></bm-view>
      <bm-control :offset="{width: '10px', height: '10px'}">
        <bm-auto-complete v-model="keyword" :sugStyle="{zIndex: 1}">
          <!-- <input placeholder="自带输入框,该项只用于替代"></input> -->
        </bm-auto-complete>
      </bm-control>
      <bm-local-search :keyword="keyword" :auto-viewport="true" ></bm-local-search>
    </baidu-map>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        center: {
          lng: 0,
          lat: 0
        },
        zoom: 3,
        keyword: ''
      }
    },
    created() {
      let _data = {
        query: '天安门',
        region: '成都',
        ak: 'kj5X1TWZYyxA6d8LsTDT0MwiqNqsmlqw'
      }
      let b64_args = urllib.parse.urlencode(_data)
      console.log(b64_args)
      this.$get('http://api.map.baidu.com/place/v2/suggestion',_data).then((res) => {
        console.log(res)
      })
    },
    methods: {

    }
  }
</script>

<style lang='scss' scoped>
  .bm-view {
    width: 300px;
    height: 300px;
  }
</style>
