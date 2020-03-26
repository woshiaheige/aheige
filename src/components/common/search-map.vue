<template>
  <Modal v-model="modalInfo.show" title="地图" @on-cancel="cancel" width="80%;">
    <div id="myChart" :style="{ width: '100%', height: '450px' }"></div>
    <div class="info">
      <div class="input-item">
        <input id='tipinput' type="info" placeholder="关键字" />
      </div>
    </div>
    <div class="formlistbutton" style="height:64px;padding-top:10px;position:relative;" slot="footer">
      <div style="position:absolute;bottom:-0;left:0; text-align:left">经度:{{lnglat[0]}}</br>纬度:{{lnglat[1]}}</br>地址:{{address}}</div>
      <Button type="primary" @click="Submit()">确定</Button>
      <Button @click="cancel()">取消</Button>
    </div>
  </Modal>
</template>

<script>
import AMap from "AMap"; // 引入高德地图
export default {
  props: ["obj"],
  data() {
    return {
      lnglat: [], //传递走的经纬度
      address:'',
    };
  },
  mounted() {
    // this.$nextTick(function() {
    //   // this.initMap({lng:113.538754,lat:22.792099},"广东省广州市南沙区南沙街道金洲(地铁站)");
    //   this.initMap();
    // })
  },
  computed: {
    modalInfo: {
      get: function() {
        console.log(this.obj)
        if(this.obj.lnglat && this.obj.lnglat.length > 0){
          this.lnglat = this.obj.lnglat;
          this.address = this.obj.address;
          this.$nextTick(function() {
              this.initMap(this.obj.lnglat,this.obj.address);
            })
        }else{
           this.$nextTick(function() {
              this.initMap();
            })
        }
        return this.obj;
      },
      set: function() {}
    }
  },
  watch: {
    
  },
  methods: {
    // 创建点标记
    setPoint(map,lng,lat){
      this.lnglat = [lng,lat]
      map.clearMap();  //清除地图上所有覆盖物
      let marker = new AMap.Marker({
        position: [lng,lat],
        icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
          offset: new AMap.Pixel(-13, -30),
          // 设置是否可拖拽
          draggable: true,
          cursor: 'move'
      });
      marker.setMap(map);
      // 设置点标记的动画效果，此处为弹跳效果
      marker.setAnimation('AMAP_ANIMATION_BOUNCE');
      map.setCenter([lng, lat]); //重新设置地图中心点
    },
    // 创建地图
    initMap(lnglat,address){//lnglat:传进来的点的经纬度[113.538754,22.792099]，address:传进来的点的地址，不传则为空，没有点标记
      let _this = this;
      let point = [];
      if(lnglat){
        // 传入点时
        point = lnglat;
        _this.lnglat=lnglat
        _this.address = address;
      }else{
        // 未传入点时，获取ip所在地址
        point = JSON.parse(localStorage.getItem("locationPoint")).lnglat ? JSON.parse(localStorage.getItem("locationPoint")).lnglat : ['113.323192','23.029466'];
        _this.lnglat={
          lng:'',
          lat:''
        }
        _this.address = '';
      }
      let map = new AMap.Map('myChart', {
        resizeEnable: true,
        zoom: 10,
        center: point
      });
     //搜索功能，输入提示
     AMap.plugin("AMap.Autocomplete",function(){   
      let auto = new AMap.Autocomplete({
          input: "tipinput"
      });
      // let autocomplete = new AMap.Autocomplete(auto);
      AMap.event.addListener(auto, 'select', function (e) {
        console.log('data',e)
        if(e && e.poi){
          _this.setPoint(map,e.poi.location.lng,e.poi.location.lat);
          _this.address = e.poi.address;
        }
      })
     })
      // 创建点标记
      if(lnglat){
        _this.setPoint(map,lnglat[0],lnglat[1])
      }
      
      
      // 点击地图获取经纬度
      map.on('click', function(e) {
          console.log(e.lnglat.getLng() + ',' + e.lnglat.getLat())         
          map.clearMap();  //清除地图上所有覆盖物
          // 创建新点标记
          _this.setPoint(map,e.lnglat.getLng(), e.lnglat.getLat())
          _this.lnglat = [e.lnglat.getLng(),e.lnglat.getLat()]
          // 这里通过高德 SDK 完成。将经纬度转地址
           AMap.plugin("AMap.Geocoder",function(){
              let geocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: "all"
              });        
              geocoder.getAddress([e.lnglat.getLng() ,e.lnglat.getLat()], function(status, result) {
                if (status === 'complete' && result.info === 'OK') {
                  if (result && result.regeocode) {
                    _this.address = result.regeocode.formattedAddress;
                    _this.$nextTick();
                  }
                }
              });     
            })
              
      })
    },
    Submit() {
      //提交
      this.$store.commit("gitPoint", {lnglat:this.lnglat,address:this.address});
      this.$emit("getModal", {lnglat:this.lnglat,address:this.address});
      this.modalInfo.show = false;
    },
    cancel() {
      this.$store.commit("gitPoint",{ lnglat:[],address:'' })
      this.$emit("getModal", { lnglat:[],address:'' });
       this.modalInfo.show = false;
    }
  }
};
</script>
<style lang="less" scoped>
.chart-pie {
  width: 88px;
  height: 87px;
  .chart-item {
    width: 100%;
    height: 100%;
  }
}
.info{
      display: inline-block;
    position: absolute;
    top: 60px;
}
</style>
