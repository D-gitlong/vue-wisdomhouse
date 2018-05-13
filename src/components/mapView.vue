<template>
	<div id="map" :style="style"></div>
</template>

<script>
  export default{
    name: 'mapView',
    data(){
      return{
        style:{
          width:'100%',
          height:200+'px'
        }
      }
    },
    //props:['m'],
    methods: {
    	getPosition(){
    		alert('map')
    		alert(this.$store.getters.comGeolocation)
    		var map = new BMap.Map("map")            // 创建Map实例
				var point = new BMap.Point(116.404, 39.915) // 创建点坐标
				map.centerAndZoom(point,8)                 
				map.enableScrollWheelZoom()                 //启用滚轮放大缩小
				//alert(999,this.m.longitude,this.m.latitude)
    	}
    },
    mounted(){
    	this.getPosition()
    },
    updated() {
    	this.getPosition()
    }
  }
</script>