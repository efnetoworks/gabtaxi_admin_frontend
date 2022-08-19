<template>
  <div>
      <h3>Geofence</h3>
      <div class="col-6">
        <form @submit.prevent="savezone">
            <div class="form-group">
                <label for="">Select Location</label>
                <select  name="" id="" class="form-control" v-model="newZone.locationid" @change="select_area()" required>
                  <option value="">Select</option>
                  <option v-for="location in locations" :key="location" :value="location.id">
                    {{ location.name }}
                  </option>
                </select>
            </div>
              <div class="form-group">
                  <label for="" >
                      Name
                  </label>
                  <input type="text" class="form-control" required placeholder="name" v-model="newZone.name">
              </div>

              <div class="form-group">
                  <label for="" >
                      Coordinates
                  </label>
                  <input type="text" required class="form-control" placeholder="coordinates" v-model="newZone.coordinates" readonly>
              </div>
              <div class="form-group">
                  <label for="">Location Name</label>
                  <input type="text" :value="location.location" readonly class="form-control">
                  <label for="">Country</label>
                  <input type="text" :value="location.country_id" readonly class="form-control">
                  <label for="">State</label>
                  <input type="text" :value="location.state" readonly class="form-control">
                  <label for="">L.G.A</label>
                  <input type="text" :value="location.lga" readonly class="form-control">
                  <label for="">Neighborhood</label>
                  <input type="text" :value="location.neigborhood" readonly class="form-control">
              </div>
              <button style="margin-bottom: 5%;" type='submit' class="btn btn-success" id="submit">Submit</button>
        </form>
      </div>

              <Map :key="mapKey" @coordinates_points="coordinates_points" :locarea="{name:selectedArea}"/>
  </div>
</template>
<script>
import Swal from 'sweetalert2'
import Location from '@/javascript/Api/ServiceLocations.js'
import Zone from '@/javascript/Api/Zone'
import Map from './map.vue'
     export default{
        components:{Map},
        props:{
            zone:null,
            updateMode:false,
            refresh_table:null
        },
         data() {
             return {
                selectedArea:'maitama',
                updateMode:false,
                newZone:{
                    id:null,
                    name:null,
                    locationid:null,
                    coordinates:null,
                },
                location:{
                    id:null,
                    location:null,
                    country_id:null,
                    state:null,
                    lga:null,
                    neigborhood:null,
                },
                mapKey:0,
                searchResult:null,
                setTrue:false,
                isLoading:false,
                coord:null,
                locations:null,
                search_area:null,
                countries:null
             }
         },

         methods: {
            getCoordinateDetails(){
                console.log("coordinates: "+ this.coord[0][0]["lat"])
                Zone.getCoordDetails(this.coord[0][0]["lat"],this.coord[0][0]["lng"]).then((result) => {
                    this.location.id = this.newZone.locationid
                    var coordRes = result.data.results[0]['address_components']
                    coordRes.forEach(element => {
                        if(element['types'][0] == "administrative_area_level_1"){
                            this.location.state = element['long_name']
                        }
                        if(element['types'][0] == "administrative_area_level_2"){
                            this.location.lga =  element['long_name']
                        }
                        if(element['types'][0] == "locality"){
                            this.location.location = element['long_name']
                        }
                        if(element['types'][0] == "neighborhood" || element['types'][0] == "route"){
                            this.location.neigborhood = element['long_name']
                        }
                        if(element['types'][0] == "country"){
                            this.countries.forEach(country => {
                                if(country['iso2'] == element['short_name'])
                                this.location.country_id = country['id']
                            });
                        }
                    });
                })
            },
            allCountries(){
                Location.countries().then((result) => {
                    this.countries = result.data.data
                })
            },
            select_area(){
              this.locations.forEach(element => {
                if(element.id == this.newZone.locationid){
                  this.selectedArea = element.name.toLowerCase()
                  this.mapKey ++
                }
              });
            },
            savezone(){
                if(!this.updateMode){
                  Zone.create_zone(this.newZone).then((result) => {
                    if(this.location.id != null){
                      Location.update(this.location).then((result) => {
                          console.log('Location Updated')
                      }).catch((err) => {
                          console.log('Error Updating Location')
                      });
                    }
                      Swal.fire({
                          position: 'top-end',
                          icon: 'success',
                          title: 'Zone Created',
                          customClass: 'Swal-wide',
                          showConfirmButton: false,
                          timer: 3000
                      })
                        this.newZone.name = null
                        this.newZone.locationid = null
                    }).catch((err) => {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: err.response.data.message,
                            customClass: 'Swal-wide',
                            showConfirmButton: false,
                            timer: 3000
                        })
                    });

                }else{
                  Zone.update_zone(this.newZone).then((result) => {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: result.data.message,
                            customClass: 'Swal-wide',
                            showConfirmButton: false,
                            timer: 3000
                        })
                            if(this.location.id != null){
                              Location.update(this.location).then((result) => {
                                  console.log('Location Updated')
                              }).catch((err) => {
                                  console.log('Error Updating Location')
                              });
                            }
                    }).catch((err) => {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: err,
                            customClass: 'Swal-wide',
                            showConfirmButton: false,
                            timer: 3000
                        })
                    });
                }
            },

            coordinates_points(points){
                var point = points[0]
                this.newZone.coordinates = JSON.stringify(point)
                this.coord = points
            },

            openDropdown(id){
                if(this.dropdown == id){
                    this.dropdown = 0
                }else{
                    this.dropdown = id
                }
            },

            getAreas(){
                Location.all_locations().then((result) => {
                    this.locations = result.data.data
                })
            },
         },

         created(){
            this.getAreas()
            this.allCountries()
         },


     }

</script>
