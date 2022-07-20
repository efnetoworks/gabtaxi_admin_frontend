<template>
    <div :key="componentKey">
        <center>
            <center style="margin-bottom:2%;">
                <h1>Service Location Types</h1>  <br /><b>Add New Location Service Type</b>
                <div class="loading" v-if="isLoading">
                    <loading />
                </div>
            </center>
               
            <div class="form-group">
                <label for="" >
                    Service Type <span class="required">*<small>{{this.inputErr.svctypeid}}</small>
                    </span>
                </label>
                <select v-model="newForm.svctypeid" class="svctypeid">
                    <option value="null">Select</option>
                    <option v-for="type in servicetypes" :key="type" :value="type.id">
                        {{type.types}}
                    </option>
                </select>
            </div>

            <div class="form-group">
                <label for="" >
                    Service Category <span class="required">*<small>{{this.inputErr.svccategoryid}}</small>
                    </span>
                </label>
                <select v-model="newForm.svccategoryid" class="svccategoryid">
                    <option value="null">Select</option>
                    <option v-for="category in categories" :key="category" :value="category.id">
                        {{category.category}}
                    </option>
                </select>
            </div>

            <div class="form-group" v-if="!updateMode">
                <label for="" >
                    Zone <span class="required">*<small>{{this.inputErr.svclocationid}}</small>
                    </span>
                </label>
                <select @change="getCurrency" v-model="selectedZone" class="svclocationid">
                    <option value="null">Select</option>
                    <option v-for="zone in zones" :key="zone" :value="zone">
                        {{zone.name}}
                    </option>
                </select>
            </div>

            <div class="form-group" v-if="updateMode">
                <label for="" >
                    Zone Update Mode<span class="required">*<small>{{this.inputErr.svclocationid}}</small>
                    </span>
                </label>
                <select v-model="newForm.svclocationid" class="svclocationid">
                    <option value="null">Select</option>
                    <option v-for="zone in zones" :key="zone.id" :value="zone.id">
                        {{zone.name}}
                    </option>
                </select>
            </div>

            <div class="form-group">
                <label for="" >
                    Price {{ currency }} <small>per km</small> <span class="required">*<small>{{this.inputErr.svclocationid}}</small>
                    </span>
                </label>
                <input v-model="newForm.price" class="price" type="number" placeholder="0.00">
            </div>

            <button style="margin-bottom: 5%;" v-if="!updateMode" @click="savelocservicetype" id="submit">Submit</button>
            <button style="margin-bottom: 5%;" v-if="updateMode" @click="updatelocservicetype" id="update">Update</button>                    
        </center>
    </div>
    
</template>
<script>
import Swal from 'sweetalert2'
import Loading from '@/components/Loading.vue'
import ServiceType from '@/Apis/ServiceTypes.js'
import Category from '@/Apis/Category.js'
import Zone from '@/Apis/Zone.js'
import LocationService from '@/Apis/LocationService.js'
     export default{
        components:{Loading},
        props:{
            locservicetype:null,
            updateMode:null,                                    
        },
        data() {             
             return {                
                newForm:{
                    id: this.locservicetype != null ? this.locservicetype.id: null,
                    svctypeid:this.locservicetype != null ? this.locservicetype.svctypeid :null,                    
                    svccategoryid:this.locservicetype != null ? this.locservicetype.svccategoryid: null,                    
                    svclocationid:this.locservicetype != null ? this.locservicetype.svclocationid: null,                                                                          
                    price:this.locservicetype != null ?  this.locservicetype.price: null,                                                                          
                },          
                componentKey:0,                                
                setTrue:false,
                isLoading:false,
                servicetypes:null,
                categories:null,
                zones:null,
                selectedZone: this.locservicetype != null ?  this.locservicetype.svclocation: null,
                countries:[],
                currency:null,
                inputErr:{
                    svctypeid:null,                    
                    svccategoryid:null,
                    svclocationid:null,
                    price:null                                                      
                },                
             }
         },

         methods: {           
            getEmptyFields(){
                if(this.newForm.svctypeid == null || this.newForm.svctypeid == ""){
                    this.inputErr.svctypeid = 'service type name is required'
                    let types = document.querySelector('.svctypeid');            
                    types.classList.add('inputErr')                    
                }                 
                if(this.newForm.svccategoryid == null || this.newForm.svccategoryid == ""){
                    this.inputErr.svccategoryid = 'category is required'
                    let serviceid = document.querySelector('.svccategoryid');            
                    serviceid.classList.add('inputErr')                    
                }
                 if(this.newForm.svclocationid == null || this.newForm.svclocationid == ""){
                    this.inputErr.svclocationid = 'location is required'
                    let svclocationid = document.querySelector('.svclocationid');            
                    svclocationid.classList.add('inputErr')                    
                }
                 if(this.newForm.price == null || this.newForm.price == ""){
                    this.inputErr.price = 'price is required'
                    let price = document.querySelector('.price');            
                    price.classList.add('inputErr')                    
                }                 
            },         
            emptyFields(){
                this.newForm.svctypeid = null
                this.newForm.svccategoryid = null
                this.newForm.svclocationid = null
                this.newForm.price = null
            },
            savelocservicetype(){                
                this.getEmptyFields()                
                if(this.inputErr.svctypeid != null){
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
                    LocationService.create(this.newForm).then((result) => {
                        this.$emit('loctypecreated');                        
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: result.data.message,
                            customClass: 'Swal-wide',
                            showConfirmButton: false,
                            timer: 3000
                        })                        
                        this.emptyFields()
                        this.isLoading = false
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
            updatelocservicetype(){                
                this.getEmptyFields()                
                if(this.inputErr.svctypeid != null){
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
                    LocationService.update(this.newForm).then((result) => {
                        this.$emit('loctypeupdated');                        
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: result.data.message,
                            customClass: 'Swal-wide',
                            showConfirmButton: false,
                            timer: 3000
                        })                        
                        this.emptyFields()
                        this.isLoading = false
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
            
            fetchApis(){
                ServiceType.allservicetypes().then((result) => {
                    this.servicetypes = result.data.data                    
                })

                Category.allcategories().then((result) => {
                    this.categories = result.data.data
                })

                Zone.active_zones().then((result) => {
                    this.zones = result.data.data
                })
                
                LocationService.countries().then((result)=> {
                    this.countries = result.data.data
                })  
            },

            getCurrency(){                               
                this.countries.forEach(element => {
                    if(this.selectedZone.location.country_id == element.id){
                        this.currency = element.currency_symbol
                        this.newForm.svclocationid = this.selectedZone.id
                    }
                })                
            }

                
        },       
         
        computed: {
            svctypeid(){                    
                return this.newForm.svctypeid
            },   
            svccategoryid(){
                return this.newForm.svccategoryid
            },  
            svclocationid(){                    
                return this.newForm.svclocationid
            },   
            price(){
                return this.newForm.price
            },   
            props(){
                return this.updateMode
            }
        },

        watch:{         
            svctypeid(){
                if(this.newForm.svctypeid !=  null && this.newForm.svctypeid !=  ""){
                    let svctypeid = document.querySelector('.svctypeid');            
                    this.inputErr.svctypeid = null                                        
                    svctypeid.classList.add('inputSucc')
                    svctypeid.classList.remove('inputErr')
                    svctypeid.classList.remove('inputEmpty') 
                }else{
                    let svctypeid = document.querySelector('.svctypeid');            
                    svctypeid.classList.add('inputEmpty') 
                    svctypeid.classList.remove('inputSucc')                   
                }                               
            },      
            svccategoryid(){
                if(this.newForm.svccategoryid !=  null && this.newForm.svccategoryid !=  ""){
                    let svccategoryid = document.querySelector('.svccategoryid');            
                    this.inputErr.svccategoryid = null                                        
                    svccategoryid.classList.add('inputSucc')
                    svccategoryid.classList.remove('inputErr')
                    svccategoryid.classList.remove('inputEmpty') 
                }else{
                    let svccategoryid = document.querySelector('.svccategoryid');            
                    svccategoryid.classList.add('inputEmpty') 
                    svccategoryid.classList.remove('inputSucc')                   
                }                               
            }, 
            svclocationid(){
                if(this.newForm.svclocationid !=  null && this.newForm.svclocationid !=  ""){
                    let svclocationid = document.querySelector('.svclocationid');            
                    this.inputErr.svclocationid = null                                        
                    svclocationid.classList.add('inputSucc')
                    svclocationid.classList.remove('inputErr')
                    svclocationid.classList.remove('inputEmpty') 
                }else{
                    let svclocationid = document.querySelector('.svclocationid');            
                    svclocationid.classList.add('inputEmpty') 
                    svclocationid.classList.remove('inputSucc')                   
                }                               
            },
            price(){
                if(this.newForm.price !=  null && this.newForm.price !=  ""){
                    let price = document.querySelector('.price');            
                    this.inputErr.price = null                                        
                    price.classList.add('inputSucc')
                    price.classList.remove('inputErr')
                    price.classList.remove('inputEmpty') 
                }else{
                    let price = document.querySelector('.price');            
                    price.classList.add('inputEmpty') 
                    price.classList.remove('inputSucc')                   
                }                               
            },
                   
        },

        created(){
            this.fetchApis()
        }
        
     }   

</script>

<style>
 
</style>