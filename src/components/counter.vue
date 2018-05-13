<template>
	<p>Ends in <span>{{now}}</span></p>
</template>
<script>
	export default{
    name: 'counter',
		props: ['endtime'],
		data() {
			return{
				now: ''
			}
		},
		mounted() {
			this.countdowm(this.endtime)
		},
		methods: {
			countdowm(timestamp){
        let self = this;
        let timer = setInterval(function(){
          let nowTime = new Date();
          let endTime = new Date(timestamp * 1000);
          let t = endTime.getTime() - nowTime.getTime();
          if(t>0){
            let day = Math.floor(t/86400000);
            let hour=Math.floor((t/3600000)%24);
            let min=Math.floor((t/60000)%60);
            let sec=Math.floor((t/1000)%60);
            hour = hour < 10 ? "0" + hour : hour;
            min = min < 10 ? "0" + min : min;
            sec = sec < 10 ? "0" + sec : sec;
            let format = '';
            if(day > 0){
              format = `${day} day ${hour}:${min}:${sec}`;
            } 
            if(day <= 0 && hour > 0 ){
              format = `${hour}:${min}:${sec}`; 
            }
            if(day <= 0 && hour <= 0){
              format =`${min}:${sec}`;
            }
            self.now = format;
          }else{
            clearInterval(timer);
            self.now = '00:00:00';
          }
        },1000);
      }
		}
	}
</script>