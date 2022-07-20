<!-- // eslint-disable-next-line vue/multi-word-component-names -->
<!-- /* eslint-disable vue/multi-word-component-names */ -->
<template>
    <div>
        <center>
            <center style="margin-bottom:2%;">
                <b>Geofencing </b>  <br />Add Airport
                <div class="loading" v-if="isLoading">
                    <loading />
                </div>
            </center>

            <div class="form-group">
                <label for="">Select Area <span class="required">*<small>{{this.inputErr.country_id}}</small></span></label><br/>
                <button class="area selectbutton" @click="openDropdown(1)">{{selectedArea}}<i class="fa-solid fa-caret-down" id="caret"></i> </button>
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
                <input type="text" class="name" placeholder="name" v-model="newAirport.name">                
            </div>

            <div class="form-group">
                <label for="" >
                    Coordinates <span class="required">*<small>{{this.inputErr.coordinates}}</small>
                    </span>
                </label>
                <input type="text" class="coordinates" placeholder="coordinates" v-model="newAirport.coordinates" readonly>                
            </div>
            <button style="margin-bottom: 5%;" v-if="!updateMode" @click="saveairport" id="submit">Submit</button>
            <button style="margin-bottom: 5%;" v-if="updateMode" @click="updateairport" id="update">Update</button>

            <Map :key="mapKey" @coordinates_points="coordinates_points" :locarea="{name:selectedArea}"/>

               

            
        </center>

    </div>
</template>
<script>
import Swal from 'sweetalert2'
import Location from '@/Apis/ServiceLocations.js'
import Loading from '../../Loading.vue'
import Airport from '@/Apis/Airport'
import Map from './map.vue'
     export default{
        components:{Loading, Map},
        props:{
            airport:null,
            updateMode:null,
            refresh_table:null            
        },
         data() {             
             return {
                selectedArea: this.airport != null ? this.airport.area.location_name : "Select Area ",
                newAirport:{
                    id:this.airport != null ? this.airport.id :null,                    
                    name:this.airport != null ?this.airport.name: null,
                    area:this.airport != null ? this.airport.area.id: null,
                    coordinates:this.airport != null ? this.airport.coordinates: null,                                                      
                },      
                mapKey:0,    
                searchResult:null,      
                setTrue:false,
                isLoading:false,
                inputErr:{
                    name:null,
                    area:null, 
                    coordinates:null                                                        
                },
                areas:null,
                dropdown:0,
                search_area:null,
             }
         },

         methods: {
            getEmptyFields(){
                if(this.newAirport.name == null || this.newAirport.name == ""){
                    this.inputErr.name = 'name is required'
                    let name = document.querySelector('.name');            
                    name.classList.add('inputErr')                    
                } 
                if(this.newAirport.area == null || this.newAirport.area == ""){
                    this.inputErr.area = 'area is required'
                    let area = document.querySelector('.area');            
                    area.classList.add('inputErr')                    
                }                          
            },         

            saveairport(){                
                this.getEmptyFields()                
                if(this.inputErr.name != null || this.inputErr.area != null ){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Missing Fields',
                        customClass: 'Swal-wide',
                        showConfirmButton: false,
                        timer: 3000
                    })                 
                    this.newAirport.name = null
                    this.newAirport.area = null                     
                }else{
                    this.isLoading = true
                    Airport.create_airport(this.newAirport).then((result) => {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Airport Created',
                            customClass: 'Swal-wide',
                            showConfirmButton: false,
                            timer: 3000
                        })                        
                        this.$emit('object_created');
                        this.isLoading = false
                        this.newAirport.name = null
                        this.newAirport.area = null                                                 
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
                this.newAirport.coordinates = points
            },

            updateairport(){                
                this.getEmptyFields()                               
                if(this.inputErr.name != null || this.inputErr.area != null ){
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Missing Fields',
                            customClass: 'Swal-wide',
                            showConfirmButton: false,
                            timer: 3000
                        })  
                        this.isLoading = false 
                        this.newAirport.name = null
                        this.newAirport.area = null                         
                }else{
                    this.isLoading = true 
                    Airport.update_airport(this.newAirport).then((result) => {
                        this.$emit('object_updated')
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: result.data.message,
                            customClass: 'Swal-wide',
                            showConfirmButton: false,
                            timer: 3000
                        })  
                        this.isLoading = false                                                   
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
                    this.areas = result.data.data  
                })
            },

            searchArea(){
                 // get detail from products where then name == orderData.request    
                this.searchResult = []
                this.areas.forEach(area => { 
                    var request  = this.search_area.toLowerCase()
                    var areaName = area.location_name.toLowerCase()                
                        if (request != null && request !== "" && request !== " " && areaName.match(request)) 
                        { 
                            this.searchResult.push(area)                    
                        }
                });
            },

            getArea(area){
                this.newAirport.area = area.id
                this.selectedArea = area.location_name
                this.dropdown = 0
                this.searchResult = null
                this.search_area = null
                this.mapKey ++
            },
         },       

         created(){
            this.getAreas()
         },

        computed: {
            name(){                    
                return this.newAirport.name;                    
            },
            area(){
                return this.newAirport.area;
            },            
            coordinates(){
                return this.newAirport.coordinates;
            }, 
            props(){
                return this.updateMode
            }

        },

        watch:{         
            name(){
                if(this.newAirport.name !=  null && this.newAirport.name !=  ""){
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
            area(){
                if(this.newAirport.area != null && this.newAirport.area != ""){
                    let area = document.querySelector('.area');            
                    this.inputErr.area = null                                        
                    area.classList.add('inputSucc')
                    area.classList.remove('inputErr')
                    area.classList.remove('inputEmpty')                     
                }else{
                    let area = document.querySelector('.area');            
                    area.classList.add('inputEmpty') 
                    area.classList.remove('inputSucc')                   
                }
            },
            coordinates(){
                if(this.newAirport.coordinates != null && this.newAirport.coordinates != ""){
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