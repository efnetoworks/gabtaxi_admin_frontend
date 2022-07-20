/* eslint-disable no-undef */
<template>
<div :key="componentKey">

  <div id="map" style="width:100%; border:none; height:700px; margin-bottom: 20%; margin-top: 5%;">
  </div> <br/>          
</div>
</template>

<script>
import Geofence from "@/Apis/initmap.js";
import db from '@/fbdb/dataservice'
export default {
   
  name: 'AppMap',  
  data() {
    return {
      location:'Nigeria',          
      onlineDrivers:null,
      componentKey:0,
      map:null,
      google:null,
      markers:null
    }
  },

  methods: {       
    
   onDataChange(items){
				let _onlineDrivers = [];
				items.forEach((item) => {
					let key = item.key;
					let data = item.val();
					_onlineDrivers.push({
						key:key,
						data:data
					});
				});
        this.onlineDrivers = _onlineDrivers
        this.marker()        
			},    

    onlinedrivers(){
      db.getAll().on("value", this.onDataChange)      
    },

    marker(){      
      var google = this.google
      var data = this.onlineDrivers      
      var marker = []
      this.markers = null
      for (let i = 0; i < data.length; i++) {        
          var pos = new google.maps.LatLng(data[i].data['latitude'], data[i].data['longitude'])
            marker[i] = new google.maps.Marker({
                position: pos,                
                icon:{
                  url:"https://img.icons8.com/fluency/48/000000/sedan.png",
                },
            });
            marker.push(marker[i])            
      }
      this.markers = marker
      this.markers.forEach(element => {
        element.setMap(null)
        setTimeout(() => {
          console.log('fired')
           element.setMap(this.map)
        }, 2000)        
      });
      // marker.setMap(this.map)
    },
   
    async loadMap(){  
        const google =  await Geofence() 
        this.google = google   
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: {lat:9.0811, lng:7.4987}            
        }) 
        this.map = map
        setTimeout(() => {
          this.marker()  
        }, 2000);
    },
  },
  
  onMounted(){
    this.loadMap()   
  },
  created(){
    this.loadMap()
    this.onlinedrivers()
    
    
  },

  watch:{
    drawingMode(){
      if(this.drawingMode != null){
        this.loadMap()
      }else{
        this.drawingMode = null
      }
    }
  },

 
}
</script>

<style>



</style>

