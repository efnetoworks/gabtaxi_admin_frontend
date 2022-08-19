/* eslint-disable no-undef */
<template>
<div>

    <div class="row col-6">
            <button class="btn btn-dark" @click="toggleHeatmap">Toggle Heatmap</button>
            <button class="btn btn-info" @click="changeGradient">Change gradient</button>
            <button class="btn btn-success" @click="changeRadius">Change radius</button>
            <button class="btn btn-warning" @click="changeOpacity">Change opacity</button>
    </div>

  <div id="map" style="width:100%; border:none; height:900px">
  </div> <br/>
</div>
</template>

<script>
import Geofence from "@/javascript/Api/initmap"

export default {
    props:{
        locarea:null
    },
  name: 'AppMap',
  data() {
    return {
      location:'Nigeria',
      google:null,
      heatmap:null,
      map:null,
      coordinates:[
          {"lat":9.045204473294058,"lng":7.411072578808593},
          {"lat":9.042831091654575,"lng":7.410729256054687},
          {"lat":9.03808428143931,"lng":7.411415901562499},
          {"lat":9.037745221172719,"lng":7.417595711132812},
          {"lat":9.031642081810993,"lng":7.416222420117187},
          {"lat":9.030624881868947,"lng":7.41038593330078},
          {"lat":9.030285814583774,"lng":7.406266060253905},
          {"lat":9.025877910861466,"lng":7.407296028515624},
          {"lat":9.023843475588968,"lng":7.411072578808593},
          {"lat":9.01401021009022,"lng":7.413819160839843},
          {"lat":9.045204473294058,"lng":7.411072578808593},
          {"lat":9.042831091654575,"lng":7.410729256054687},
          {"lat":9.03808428143931,"lng":7.411415901562499},
          {"lat":9.037745221172719,"lng":7.417595711132812},
          {"lat":9.031642081810993,"lng":7.416222420117187},
          {"lat":9.030624881868947,"lng":7.41038593330078},
          {"lat":9.030285814583774,"lng":7.406266060253905},
          {"lat":9.025877910861466,"lng":7.407296028515624},
          {"lat":9.023843475588968,"lng":7.411072578808593},
          {"lat":9.01401021009022,"lng":7.413819160839843},
          {"lat":9.045204473294058,"lng":7.411072578808593},
          {"lat":9.042831091654575,"lng":7.410729256054687},
          {"lat":9.03808428143931,"lng":7.411415901562499},
          {"lat":9.037745221172719,"lng":7.417595711132812},
          {"lat":9.031642081810993,"lng":7.416222420117187},
          {"lat":9.030624881868947,"lng":7.41038593330078},
          {"lat":9.030285814583774,"lng":7.406266060253905},
          {"lat":9.025877910861466,"lng":7.407296028515624},
          {"lat":9.023843475588968,"lng":7.411072578808593},
          {"lat":9.01401021009022,"lng":7.413819160839843}
        ]

    }
  },

  methods: {
    getPoints(){
        var coord = []
        this.coordinates.forEach(element => {
            coord.push(new google.maps.LatLng(element['lat'], element['lng']))
        });

        return coord
    },

   toggleHeatmap(){
        this.heatmap.setMap(this.heatmap.getMap() ? null : this.map);
    },

changeGradient(){
  const gradient = [
    "rgba(0, 255, 255, 0)",
    "rgba(0, 255, 255, 1)",
    "rgba(0, 191, 255, 1)",
    "rgba(0, 127, 255, 1)",
    "rgba(0, 63, 255, 1)",
    "rgba(0, 0, 255, 1)",
    "rgba(0, 0, 223, 1)",
    "rgba(0, 0, 191, 1)",
    "rgba(0, 0, 159, 1)",
    "rgba(0, 0, 127, 1)",
    "rgba(63, 0, 91, 1)",
    "rgba(127, 0, 63, 1)",
    "rgba(191, 0, 31, 1)",
    "rgba(255, 0, 0, 1)",
  ];

  this.heatmap.set("gradient", this.heatmap.get("gradient") ? null : gradient);
},

changeRadius(){
  this.heatmap.set("radius", this.heatmap.get("radius") ? null : 20);
},

changeOpacity(){
  this.heatmap.set("opacity", this.heatmap.get("opacity") ? null : 0.2);
},

async loadMap(){
       this.google = await Geofence()
      const google =  await Geofence()

      this.map = new google.maps.Map(document.getElementById('map'),{
            zoom: 13,
            center: { lat: 9.0765, lng: 7.3986 },

      })


        this.heatmap = new google.maps.visualization.HeatmapLayer({
            data: this.getPoints(),
            map: this.map,
        });








    },

  },

  created(){
    this.loadMap()

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

