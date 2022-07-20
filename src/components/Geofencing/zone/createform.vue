<!-- // eslint-disable-next-line vue/multi-word-component-names -->
<!-- /* eslint-disable vue/multi-word-component-names */ -->
<template>
    <div :key="componentKey">
        <center>
            <center style="margin-bottom:2%;">
                <b>Geofencing </b>  <br />Add Zone
                <div class="loading" v-if="isLoading">
                    <loading />
                </div>
            </center>

            <div class="form-group">
                <label for="">Select Location <span class="required">*<small>{{this.inputErr.country_id}}</small></span></label><br/>
                <button class="locationid selectbutton" @click="openDropdown(1)">{{selectedArea}} <i class="fa-solid fa-caret-down" id="caret"></i> </button>
                <div class="selectdiv" v-if="dropdown == 1">
                    <input type="text" class="searchselect" v-model="search_area" placeholder="Search Area" @input="searchArea()">
                    <li  v-for="area in searchResult" :key="area" @click="getArea(area)">
                        {{area.location_name}}
                    </li>
                </div>                
            </div><br />     

            <div class="form-group">
                <label for="" >
                    Name <span class="required">*<small>{{this.inputErr.name}}</small>
                    </span>
                </label>
                <input type="text" class="name" placeholder="name" v-model="newZone.name">                
            </div>

            <div class="form-group">
                <label for="" >
                    Coordinates <span class="required">*<small>{{this.inputErr.coordinates}}</small>
                    </span>
                </label>
                <input :key="coordKey" type="text" class="coordinates" placeholder="coordinates" v-model="newZone.coordinates" readonly>                
            </div>
            <div class="form-group">
                <label for="">Location Name</label>
                <p>{{location.location}}ey</p><br/>
                <label for="">Country</label>
                <p>{{location.country_id}}</p><br/>
                <label for="">State</label>
                <p>{{location.state}}</p><br/>
                <label for="">L.G.A</label>
                <p>{{location.lga}}</p><br/>
                <label for="">Neighborhood</label>
                <p>{{location.neigborhood}}</p><br/>
            </div>
            <button style="margin-bottom: 5%;" v-if="!updateMode" @click="savezone" id="submit">Submit</button>
            <button style="margin-bottom: 5%;" v-if="updateMode" @click="updatezone" id="update">Update</button>

            <Map :key="mapKey" @coordinates_points="coordinates_points" :locarea="{name:selectedArea}"/>             

            
        </center>

    </div>
</template>
<script>
import Swal from 'sweetalert2'
import Location from '@/Apis/ServiceLocations.js'
import Loading from '../../Loading.vue'
import Zone from '@/Apis/Zone'
import Map from './map.vue'
     export default{
        components:{Loading, Map},
        props:{
            zone:null,
            updateMode:null,
            refresh_table:null            
        },
         data() {             
             return {
                selectedArea: this.zone != null ? this.zone.locationid.location_name : "Select Area ",
                newZone:{
                    id:this.zone != null ? this.zone.id :null,                    
                    name:this.zone != null ?this.zone.name: null,
                    locationid:this.zone != null ? this.zone.locationid.id: null,
                    coordinates:this.zone != null ? this.zone.coordinates: null,                                                                          
                },
                coordKey:0,
                location:{
                    id:null,
                    // location_name:null,
                    location:null,
                    country_id:null,
                    state:null,
                    lga:null,
                    neigborhood:null,
                },
                componentKey:0,
                mapKey:0,    
                searchResult:null,      
                setTrue:false,
                isLoading:false,
                inputErr:{
                    name:null,
                    locationid:null, 
                    coordinates:null                                                        
                },
                coord:null,
                locations:null,
                dropdown:0,
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

            getEmptyFields(){
                if(this.newZone.name == null || this.newZone.name == ""){
                    this.inputErr.name = 'name is required'
                    let name = document.querySelector('.name');            
                    name.classList.add('inputErr')                    
                } 
                if(this.newZone.locationid == null || this.newZone.locationid == ""){
                    this.inputErr.locationid = 'area is required'
                    let area = document.querySelector('.locationid');            
                    area.classList.add('inputErr')                    
                }                          
            },         

            savezone(){                
                this.getEmptyFields()                
                if(this.inputErr.name != null || this.inputErr.locationid != null ){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Missing Fields',
                        customClass: 'Swal-wide',
                        showConfirmButton: false,
                        timer: 3000
                    })                 
                    this.newZone.name = null
                    this.newZone.locationid = null                     
                }else{
                    this.isLoading = true
                    Zone.create_zone(this.newZone).then((result) => {
                        this.$emit('zone_created');
                        Location.update(this.location).then((result) => {
                            console.log(result)                            
                        }).catch((err) => {
                            console.log(err)
                        });
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Zone Created',
                            customClass: 'Swal-wide',
                            showConfirmButton: false,
                            timer: 3000
                        })                        
                        this.isLoading = false
                        this.newZone.name = null
                        this.newZone.locationid = null                                                 
                    }).catch((err) => {
                        this.isLoading = false
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: err.response.data.message,
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
                this.coordKey++
            },

            updatezone(){                
                this.getEmptyFields()                               
                if(this.inputErr.name != null || this.inputErr.locationid != null ){
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Missing Fields',
                            customClass: 'Swal-wide',
                            showConfirmButton: false,
                            timer: 3000
                        })  
                        this.isLoading = false 
                        this.newZone.name = null
                        this.newZone.locationid = null                         
                }else{
                    this.isLoading = true 
                    Zone.update_zone(this.newZone).then((result) => {
                        this.$emit('zone_updated')                       
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: result.data.message,
                            customClass: 'Swal-wide',
                            showConfirmButton: false,
                            timer: 3000
                        })  
                        Location.update(this.location).then((result) => {
                            console.log(result)                            
                        }).catch((err) => {
                            console.log(err)
                        });
                        this.isLoading = false                     
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

            openDropdown(id){
                if(this.dropdown == id){
                    this.dropdown = 0                    
                }else{
                    this.dropdown = id
                }
            },

            getAreas(){
                Location.all_locations().then((result) => {
                    this.locationids = result.data.data  
                })
            },

            searchArea(){
                 // get detail from products where then name == orderData.request    
                this.searchResult = []
                this.locationids.forEach(area => { 
                    var request  = this.search_area.toLowerCase()
                    var areaName = area.location_name.toLowerCase()                
                        if (request != null && request !== "" && request !== " " && areaName.match(request)) 
                        { 
                            this.searchResult.push(area)                    
                        }
                });
            },

            getArea(area){
                this.newZone.locationid = area.id
                this.componentKey++
                this.selectedArea = area.location_name
                this.dropdown = 0
                this.searchResult = null
                this.search_area = null
                this.mapKey ++
            },
         },       

         created(){
            this.getAreas()
            this.allCountries()
         },

        computed: {
            name(){                    
                return this.newZone.name;                    
            },
            locationid(){
                return this.newZone.locationid;
            },            
            coordinates(){
                return this.newZone.coordinates;
            }, 
            props(){
                return this.updateMode
            }

        },

        watch:{         
            name(){
                if(this.newZone.name !=  null && this.newZone.name !=  ""){
                    let name = document.querySelector('.name');            
                    this.inputErr.name = null                                        
                    name.classList.add('inputSucc')
                    name.classList.remove('inputErr')
                    name.classList.remove('inputEmpty') 
                }else{
                    let name = document.querySelector('.name');            
                    name.classList.add('inputEmpty') 
                    name.classList.remove('inputSucc')                   
                }                               
            },
            locationid(){
                if(this.newZone.locationid != null && this.newZone.locationid != ""){
                    let area = document.querySelector('.locationid');            
                    this.inputErr.locationid = null                                        
                    area.classList.add('inputSucc')
                    area.classList.remove('inputErr')
                    area.classList.remove('inputEmpty')                     
                }else{
                    let area = document.querySelector('.locationid');            
                    area.classList.add('inputEmpty') 
                    area.classList.remove('inputSucc')                   
                }
            },
            coordinates(){
                if(this.newZone.coordinates != null && this.newZone.coordinates != ""){
                    this.getCoordinateDetails()
                    let coordinates = document.querySelector('.coordinates');            
                    this.inputErr.coordinates = null                                        
                    coordinates.classList.add('inputSucc')
                    coordinates.classList.remove('inputErr')
                    coordinates.classList.remove('inputEmpty')                     
                }else{
                    let coordinates = document.querySelector('.coordinates');            
                    coordinates.classList.add('inputEmpty') 
                    coordinates.classList.remove('inputSucc')                   
                }
            },

        },


        
     }   

</script>

<style>
 
</style>