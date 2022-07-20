<template>
    <div>
        <center>
            <center style="margin-bottom:2%;">
                <b>Create Service Location</b>
                <div class="loading" v-if="isLoading">
                    <loading />
                </div>
            </center>
            <div class="form-group">
                <label for="">Country <span class="required">*<small>{{this.inputErr.country_id}}</small></span></label><br/>
                <button class="country_id selectbutton" @click="openDropdown(1)">{{selected}}<i class="fa-solid fa-caret-down" id="caret"></i> </button>
                <div class="selectdiv" v-if="dropdown == 1">
                    <input type="text" class="searchselect" v-model="search_country" placeholder="Search Country" @input="searchCountry()">
                    <li  v-for="country in searchResult" :key="country" @click="getCountry(country)">
                        {{country.name}}
                    </li>
                </div>                
            </div><br />

           

            <div class="form-group">
                <label for="" >
                    Location Name <span class="required">*<small>{{this.inputErr.location_name}}</small>
                    </span>
                </label>
                <input type="text" class="location_name" placeholder="Location Name" v-model="serviceLocation.location_name">                
            </div>

            
            <button  @click="save" id="submit">Submit</button>            
            
        </center>

    </div>
</template>
<script>
import Swal from 'sweetalert2'
import Admin from '@/Apis/Admin.js'
import Locations from '@/Apis/ServiceLocations.js'
import Loading from '../../Loading.vue'
     export default{        
         components:{Loading},
         props:{
            servicelocation:null
         },
         data() {             
             return {
                serviceLocation:{
                    id:this.servicelocation != null ? this.servicelocation.id :null,                    
                    location_name:this.servicelocation != null ?this.servicelocation.location_name: null,
                    country_id:this.servicelocation != null ? this.servicelocation.country_id: null,                                        
                },                                
                isLoading:false,
                inputErr:{
                    location_name:null,
                    country_id:null,                    
                },
                countries:null,
                searchResult:null,
                dropdown:0,
                selected:"Select Country ",
                search_country:null

             }
         },

         methods: {
            getEmptyFields(){
                if(this.serviceLocation.location_name == null || this.serviceLocation.location_name == ""){
                    this.inputErr.location_name = 'Location Name is required'
                    let location_name = document.querySelector('.location_name');            
                    location_name.classList.add('inputErr')                    
                } 
                if(this.serviceLocation.country_id == null || this.serviceLocation.country_id == ""){
                    this.inputErr.country_id = 'country_id is required'
                    let country_id = document.querySelector('.country_id');            
                    country_id.classList.add('inputErr')                    
                }                           
            }, 
            
            allCountries(){
                Locations.countries().then((result) => {
                    this.countries = result.data.data  
                    
                })
            },

            save(){                
                this.getEmptyFields()                
                if(this.inputErr.location_name !== null || this.inputErr.country_id != null){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Missing Fields',
                        customClass: 'Swal-wide',
                        showConfirmButton: false,
                        timer: 3000
                    })                 
                                                        
                }else{
                    this.isLoading = true
                    Locations.create(this.serviceLocation).then((result) => {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: result.data.message,
                            customClass: 'Swal-wide',
                            showConfirmButton: false,
                            timer: 3000
                        })                        
                        this.$emit('object_created');
                        this.isLoading = false
                        this.serviceLocation.location_name = null
                    this.serviceLocation.country_id = null                                       
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

            openDropdown(id){
                if(this.dropdown == id){
                    this.dropdown = 0                    
                }else{
                    this.dropdown = id
                }
            },

            searchCountry(){
                 // get detail from products where then name == orderData.request    
                this.searchResult = []
                this.countries.forEach(country => { 
                    var request  = this.search_country.toLowerCase()
                    var countryName = country.name.toLowerCase()                
                        if (request != null && request !== "" && request !== " " && countryName.match(request)) 
                        { 
                            this.searchResult.push(country)                    
                        }
                });
            },

            getCountry(country){
                this.serviceLocation.country_id = country.id
                this.selected = country.name
                this.dropdown = 0
                this.searchResult = null
            },

            updateAdmin(){                
                this.getEmptyFields()                               
                if(this.inputErr.location_name != null || this.inputErr.phone != null || this.inputErr.email != null || this.inputErr.gender != null || this.inputErr.dob != null){
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Missing Fields',
                            customClass: 'Swal-wide',
                            showConfirmButton: false,
                            timer: 3000
                        })  
                        this.isLoading = false 
                        this.serviceLocation.location_name = null
                        this.serviceLocation.country_id = null                       
                }else{
                    this.isLoading = true 
                    Admin.update_admin(this.servicelocation).then((result) => {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: result.data.message,
                            customClass: 'Swal-wide',
                            showConfirmButton: false,
                            timer: 3000
                        })  
                        this.isLoading = false                           
                        this.$emit('admin_updated')
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
            }
         },       

        computed: {
            location_name(){                    
                return this.serviceLocation.location_name;                    
            },
            country_id(){
                return this.serviceLocation.country_id;
            },            
        },

        watch:{         
            location_name(){
                if(this.serviceLocation.location_name !=  null && this.serviceLocation.location_name !=  ""){
                    let location_name = document.querySelector('.location_name');            
                    this.inputErr.location_name = null                                        
                    location_name.classList.add('inputSucc')
                    location_name.classList.remove('inputErr')
                    location_name.classList.remove('inputEmpty') 
                }else{
                    let location_name = document.querySelector('.location_name');            
                    location_name.classList.add('inputEmpty') 
                    location_name.classList.remove('inputSucc')                   
                }                               
            },
            country_id(){
                if(this.serviceLocation.country_id != null && this.serviceLocation.country_id != ""){
                    let country_id = document.querySelector('.country_id');            
                    this.inputErr.country_id = null                                        
                    country_id.classList.add('inputSucc')
                    country_id.classList.remove('inputErr')
                    country_id.classList.remove('inputEmpty')                     
                }else{
                    let country_id = document.querySelector('.country_id');            
                    country_id.classList.add('inputEmpty') 
                    country_id.classList.remove('inputSucc')                   
                }
            },           
        },

        created() {
            this.allCountries()
        },


        
     }   

</script>

<style>
 
</style>