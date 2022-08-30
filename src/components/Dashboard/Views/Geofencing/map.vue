<template>
<div>
        <center>
            <button class="btn btn-secondary mr-2" @click.prevent="drawPolygon()">
                <i class="fa fa-pencil" aria-hidden="true"></i>
            </button>
            <button class="btn btn-warning mr-2" @click.prevent="deleteSelectedShape()">
                <i class="fa fa-times" aria-hidden="true"></i>
            </button>
            <button class="btn btn-danger mr-2" @click.prevent="clearMap()" >
                <i class="fa fa-trash" aria-hidden="true"></i>
            </button>   <br />
              <input type="hidden" id="info">
        </center>
  <div id="map" style="width:100%; border:none; height:1000px; margin-bottom: 20%; margin-top: 5%;">
  </div> <br/>
</div>
</template>

<script>
import Geofence from "@/javascript/initmap.js";
export default {
    props:{
        locarea:{name:null}
    },
  name: 'AppMap',
  data() {
    return {
      location:this.locarea.name!=null?this.locarea.name:'Nigeria',
      drawingMode:null,
      selectedShape:null,
      selectedKernel:null,
      gmarkers:[],
      coordinates:[],
      allShapes:[],
      sendable_coordinates:[],
      shapeColor:"#7777",
      kernelColor:"#000",
      drawingManager:null,
      infowindow: null
    }
  },

  methods: {
    changeOpacityHover() {
        var element = document.getElementById("opcard");
        element.classList.remove("ccard");
        element.classList.add("vcard");
    },

    changeOpacityOut() {
        var element = document.getElementById("opcard");
        element.classList.remove("vcard");
        element.classList.add("ccard");
    },

    setMapOnAll(map) {
        for (var i = 0; i < this.gmarkers.length; i++) {
            this.gmarkers[i].setMap(map);
        }
    },

    clearMarkers() {
        this.setMapOnAll(null);
    },

    deleteMarkers() {
      this.setMapOnAll(null);
        this.clearMarkers();
        this.gmarkers = [];
    },


    deleteSelectedShape() {
        if (this.selectedShape) {
            this.coordinates = []
            this.selectedShape.setMap(null);
            var index = this.allShapes.indexOf(this.selectedShape);
            if (index > -1) {
                this.allShapes.splice(index, 1);
            }
            document.getElementById('info').value = null; // actualizează lista de coordonate afisata
        }

        if (this.selectedKernel) {
            this.selectedKernel.setMap(null);
            // document.getElementById('info').value = null; // actualizează lista de coordonate afisata
        }
    },

    clearMap() {
        if (this.allShapes.length > 0) {
            for (var i = 0; i < this.allShapes.length; i++)
            {
                this.allShapes[i].setMap(null);
            }
            this.allShapes = [];
            this.coordinates = []
            this.deleteMarkers();
            document.getElementById('info').value = null;
            // document.getElementById('info').innerHTML = "Desenează un poligon. Aici vor apărea coordonatele vârfurilor sale și vor fi actualizate în timp real."; // actualizează lista de coordonate afisata
        }
    },


    update(picker) {
        this.shapeColor = picker.toHEXString();
        if (this.electedShape) {
            this.selectedShape.setOptions({ fillColor: this.shapeColor },);
        }
    },

    clearSelection() {
        if (this.selectedShape) { //check that the selected shape is a polygon
            if (this.selectedShape.type !== 'marker') {
                this.selectedShape.setEditable(false);
            }
            this.selectedShape = null;
        }

        if (this.selectedKernel) { // check to see if the selected shape is a core
            if (this.selectedKernel.type !== 'marker') {
                this.selectedKernel.setEditable(false);
            }
            this.selectedKernel = null;
        }
    },

    setSelection(shape, check) {
        this.clearSelection();
        shape.setEditable(true);
        shape.setDraggable(true);
        if (check) {
            this.selectedKernel = shape;
        } else { this.selectedShape = shape; }
    },



//display that saves in the list "coordinates" the coordinates of the points of the polygon given as parameter coordinates coordonatele varfurilor poligonului dat ca parametru
getCoordinates(polygon) {
    var path = polygon.getPath();
    this.coordinates = [];
    for (var i = 0; i < path.length; i++) {
        this.coordinates.push({
            lat: path.getAt(i).lat(),
            lng: path.getAt(i).lng()
        },);
    }
    return this.coordinates;
    // document.getElementById('info').value = coordinates;
},


createMarker(coord, nr, map) {
    var mesaj = "<h6>Vârf " + nr + "</h6><br>" + "Lat: " + coord.lat + "<br>" + "Lng: " + coord.lng;
    var marker = new google.maps.Marker({
        position: coord,
        map: map,
        //zIndex: Math.round(coord.lat * -100000) << 5
    },);
    // displaying marker information at "click"
    var self = this
    google.maps.event.addListener(marker, 'click', function() {
        self.infowindow.setContent(mesaj);
        self.infowindow.open(map, marker);
    },);
    google.maps.event.addListener(marker, 'dblclick', function() { // delete marker at "double click"
        marker.setMap(null);
    },);
    return marker;
},

testFunction(){
  console.log('this is a test function')
},

searchBox() {
    // Create the search box
    var input = document.getElementById('search-box');
    var searchBox = new google.maps.places.SearchBox(input);

    // Results relevant to the current location
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    },);


    // Get more details on the selected place
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();
        if (places.length == 0) {
            return;
        }

        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            if (!place.geometry) {
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            }

            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });

},

findAvg(Coords) {
    var lat = [];
    var lng = [];
    var LatAndLng = [];
    Object.keys(Coords).forEach((key) => {
        lat.push(Coords[key][key].lat);
        lng.push(Coords[key][key].lng);
    },);

    LatAndLng['lat'] = lat.reduce((a, b) => a + b) / lat.length
    LatAndLng['lng'] = lng.reduce((a, b) => a + b) / lng.length
    return LatAndLng;
},
async loadMap(){
    var shapeOptions = {
        strokeWeight: 1,
        fillOpacity: 0.4,
        editable: true,
        draggable: true
    }

    const google =  await Geofence()
    //   console.log('map initialized')
    const geocoder = new google.maps.Geocoder()
    const map = new google.maps.Map(document.getElementById('map'))
    this.drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode:null,
        drawingControl: false, //dezactivat
        drawingControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER,
            drawingModes: ['polygon'], //  you can also add: 'marker', 'polyline', 'rectangle', 'circle',
        },
        polygonOptions: shapeOptions,
        map: map
    })

    geocoder.geocode({ address: this.location }, (results, status) => {
        //   console.log(this.location)
        if (status !== 'OK' || !results[0]) {
            throw new Error(status)
        }
        map.setCenter(results[0].geometry.location)
        map.fitBounds(results[0].geometry.viewport)
    })

      // break
      var self = this
      google.maps.event.addListener(self.drawingManager, 'overlaycomplete', function(e) {
        var newShape = e.overlay
        self.allShapes = []
        self.allShapes.push(newShape) // save the form to the allShapes list
        let lat_lng = []
        self.allShapes.forEach(function(data, index) {
          lat_lng[index] = self.getCoordinates(data)
        })
        // alert("Hello Ikenna here are your coordinates:"+JSON.stringify(lat_lng))
        self.$emit('coordinates_points', lat_lng);
        document.getElementById('info').value = JSON.stringify(lat_lng)

        newShape.setOptions({ fillColor: self.shapeColor }) // color form with the current value of shapeColor

        self.getCoordinates(newShape) // find coordinates peaks
        // exit drawing mode after completion of the polygon
        self.setSelection(newShape, 0)
        self.drawingManager.setDrawingMode(null)
        // select polygon at "click"
        google.maps.event.addListener(newShape, 'click', function(e) {
            console.log('polygon clicked')
            if (e.vertex !== undefined) {
                var path = newShape.getPaths().getAt(e.path)
                path.removeAt(e.vertex)
                self.getCoordinates(newShape)
                if (path.length < 3) {
                    newShape.setMap(null)
                }
            }
            self.setSelection(newShape, 0)
        })


        //update coordinates
        google.maps.event.addListener(newShape, 'click', function(e) { self.getCoordinates(newShape) })
        google.maps.event.addListener(newShape, "dragend", function(e) { self.getCoordinates(newShape) })
        google.maps.event.addListener(newShape.getPath(), "insert_at", function(e) { self.getCoordinates(newShape) })
        google.maps.event.addListener(newShape.getPath(), "remove_at", function(e) { self.getCoordinates(newShape) })
        google.maps.event.addListener(newShape.getPath(), "set_at", function(e) { self.getCoordinates(newShape) })

    })
    // Deselect the form when changing the drawing mode or when the user clicks on the map
    google.maps.event.addListener(self.drawingManager, 'drawingmode_changed', self.clearSelection())
    google.maps.event.addListener(map, 'click', self.clearSelection())
    },
    drawPolygon(){
        this.drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON)
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
    },
  },


}
</script>

<style>



</style>

