<!-- 地图显示点标识
index.html add
<script type="text/javascript" src="http://api.map.baidu.com/api?v=3.0&ak=kj5X1TWZYyxA6d8LsTDT0MwiqNqsmlqw"></script>
 -->
<template>
  <div id='MapDot'>
    <div id="XSDFXPage" class="XSDFXPage"></div>
  </div>
</template>

<script>
  var map = null
  export default {
    data() {
      return {
        icon1: require('./img/start.png'), // 商家订单图标
        icon2: require('./img/end.png'), // 目的地图标
        icon3: require('./img/icon3.gif'), // 配送员图标
      }
    },
    props: {
      shop: {
        type: Object,
        required: true
      },
      addresses: {
        type: Object,
        required: true
      }
    },
    created() {
      this.shop.lat = Number(this.shop.lat)
      this.shop.lng = Number(this.shop.lng)
      this.addresses.lat = Number(this.addresses.lat)
      this.addresses.lng = Number(this.addresses.lng)
    },
    mounted() {
      this.MapInit(this.shop,this)
      this.MapDotInit(this.shop,this.addresses,this)
    },
    methods: {
      MapInit(shop,that) { // 地图初始化
        map = new BMap.Map("XSDFXPage", {
          enableMapClick: true
        });
        // 初始化地图,设置中心点坐标和地图级别
        map.centerAndZoom(new BMap.Point(shop.lng, shop.lat), 14);
        // 设置地图显示的城市 此项是必须设置的
        map.setCurrentCity("成都");
        // 开启鼠标滚轮缩放
        map.enableScrollWheelZoom(true);

        // 距离标尺
        map.addControl(new BMap.ScaleControl({
          anchor: BMAP_ANCHOR_TOP_LEFT
        }));

        // 右下放大缩小按钮
        map.addControl(new BMap.NavigationControl({
          anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
          type: BMAP_NAVIGATION_CONTROL_SMALL
        }));

        // 骑行路径
        // var riding = new BMap.RidingRoute(map, {
        //     renderOptions: {
        //         map: map,
        //         autoViewport: true
        //     }
        // });
        // var start = new BMap.Point(that.shop.lng, that.shop.lat);
        // var end = new BMap.Point(that.addresses.lng, that.addresses.lat);
        // riding.search(start, end);
      },
      MapDotInit(shop, addresses, that) { // 地图图标初始化
        map.clearOverlays() // 清除旧的标注点
        //定义新图标
        let start = new BMap.Icon(that.icon1, new BMap.Size(30, 30));
        let end = new BMap.Icon(that.icon2, new BMap.Size(30, 30));
        let courier = new BMap.Icon(that.icon3, new BMap.Size(30, 30));
        let startMarker = new BMap.Marker(new BMap.Point(shop.lng, shop.lat), {
          icon: start
        })
        map.addOverlay(startMarker)
        startMarker.addEventListener('click', res => {
          console.log(res)
        })
        let endMarker = new BMap.Marker(new BMap.Point(addresses.lng, addresses.lat), {
          icon: end
        })
        map.addOverlay(endMarker)
        endMarker.addEventListener('click', res => {
          console.log(res)
        })
      },
    },
    components: {}
  }
</script>

<style lang='scss' scoped>
  #MapDot {
    width: 100%;
    height: 100%;
  }

  .XSDFXPage {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    font-family: "微软雅黑";
  }
</style>
