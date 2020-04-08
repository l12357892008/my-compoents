<!-- 百度地图输入提示, CDN方式引入
 index.html 加入
 <script type="text/javascript" src="http://api.map.baidu.com/getscript?v=2.0&ak=kj5X1TWZYyxA6d8LsTDT0MwiqNqsmlqw"></script>
 -->

<template>
  <div style="display:flex;width:100%">
    <input id="suggestId" class="Mapinput" :value="address" @change="bb" placeholder="收货人地址" style="height: 40px;" />
    <div id="allmap" style="width: 0;height: 0"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        address: '', // 收货地址
        userlocation: { // 收货经纬度
          lng: "",
          lat: ""
        },
      };
    },
    mounted() {
      this.createMap(this)
    },
    methods: {
      bb() { // 地址输入框输入
        this.userlocation.lng = ''
        this.userlocation.lat = ''
      },
      createMap(self) { // 初始化地图
        var that = self
        // 创建Map实例
        var map = new BMap.Map('allmap');
        // 初始化地图,设置中心点坐标，
        var point = new BMap.Point(104.06, 30.67); // 创建点坐标，成都市中心
        map.centerAndZoom(point, 15);
        var ac = new BMap.Autocomplete({ //建立一个自动完成的对象
          "input": "suggestId",
          "location": map
        })
        var myValue
        ac.addEventListener("onconfirm", function(e) { //鼠标点击下拉列表后的事件
          var _value = e.item.value;
          myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
          setPlace();
        });

        function setPlace() {
          function myFun() {
            that.userlocation = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
            that.address = myValue
            that.edit = true
          }

          var local = new BMap.LocalSearch(map, { //智能搜索
            onSearchComplete: myFun
          });
          local.search(myValue);
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .Mapinput {
    border: none;

    &::placeholder {
      color: rgb(181, 179, 179);
      font-size: 14px;
    }
  }
</style>
