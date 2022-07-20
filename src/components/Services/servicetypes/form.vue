<template>
    <div :key="componentKey">
        <center>
            <center style="margin-bottom:2%;">
                <h1>Service Types</h1>  <br /><b>Add New Service Type</b>
                <div class="loading" v-if="isLoading">
                    <loading />
                </div>
            </center>
               
            <div class="form-group">
                <label for="" >
                    Type <span class="required">*<small>{{this.inputErr.types}}</small>
                    </span>
                </label>
                <input type="text" class="types" placeholder="Service Type" v-model="newServiceType.types">                
            </div>

            <div class="form-group">
                <label for="" >
                    Service <span class="required">*<small>{{this.inputErr.serviceid}}</small>
                    </span>
                </label>
                <select v-model="newServiceType.serviceid" class="serviceid">
                    <option value="null">Select</option>
                    <option v-for="service in allservices" :key="service" :value="service.id">
                        {{service.service_name}}
                    </option>
                </select>
            </div>

            <button style="margin-bottom: 5%;" v-if="!updateMode" @click="saveservicetype" id="submit">Submit</button>
            <button style="margin-bottom: 5%;" v-if="updateMode" @click="updateservicetype" id="update">Update</button>                    
        </center>
    </div>
    
</template>
<script>
import Swal from 'sweetalert2'
import Loading from '@/components/Loading.vue'
import ServiceType from '@/Apis/ServiceTypes.js'
import Services from '@/Apis/Services.js'
     export default{
        components:{Loading},
        props:{
            servicetype:null,
            updateMode:null,                                    
        },
        data() {             
             return {                
                newServiceType:{
                    id:this.servicetype != null ? this.servicetype.id :null,                    
                    types:this.servicetype != null ? this.servicetype.types: null,                    
                    serviceid:this.servicetype != null ?  this.servicetype.serviceid: null,                                                                          
                },          
                componentKey:0,                                
                setTrue:false,
                isLoading:false,
                allservices:null,
                inputErr:{
                    types:null,                    
                    serviceid:null                                                        
                },                
             }
         },

         methods: {           
            getEmptyFields(){
                if(this.newServiceType.types == null || this.newServiceType.types == ""){
                    this.inputErr.types = 'service name is required'
                    let types = document.querySelector('.types');            
                    types.classList.add('inputErr')                    
                }                 
                if(this.newServiceType.serviceid == null || this.newServiceType.serviceid == ""){
                    this.inputErr.serviceid = 'service is required'
                    let serviceid = document.querySelector('.serviceid');            
                    serviceid.classList.add('inputErr')                    
                }                 
            },         

            saveservicetype(){                
                this.getEmptyFields()                
                if(this.inputErr.types != null){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Missing Fields',
                        customClass: 'Swal-wide',
                        showConfirmButton: false,
                        timer: 3000
                    })                 
                    this.newServiceType.types = null                    
                }else{
                    this.isLoading = true
                    ServiceType.create(this.newServiceType).then((result) => {
                        this.$emit('typecreated');                        
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Service Type Created',
                            customClass: 'Swal-wide',
                            showConfirmButton: false,
                            timer: 3000
                        })                        
                        this.isLoading = false
                        this.newServiceType.types = null
                        this.newServiceType.serviceid = null
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
            
            services(){
                Services.allservices().then((result) => {
                    this.allservices = result.data.data  
                })
            },

            updateservicetype(){                
                this.getEmptyFields()                               
                if(this.inputErr.types != null){
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Missing Fields',
                            customClass: 'Swal-wide',
                            showConfirmButton: false,
                            timer: 3000
                        })  
                        this.isLoading = false 
                        this.newServiceType.types = null
                }else{
                    this.isLoading = true 
                    ServiceType.update(this.newServiceType).then((result) => {
                        this.$emit('typeupdated')                       
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
                            title: err,
                            customClass: 'Swal-wide',
                            showConfirmButton: false,
                            timer: 3000
                        })                             
                    });
                }                 
            },                    
        },       
         
        computed: {
            types(){                    
                return this.newServiceType.types
            },   
            serviceid(){
                return this.newServiceType.serviceid
            },   
            props(){
                return this.updateMode
            }
        },

        watch:{         
            types(){
                if(this.newServiceType.types !=  null && this.newServiceType.types !=  ""){
                    let types = document.querySelector('.types');            
                    this.inputErr.types = null                                        
                    types.classList.add('inputSucc')
                    types.classList.remove('inputErr')
                    types.classList.remove('inputEmpty') 
                }else{
                    let types = document.querySelector('.types');            
                    types.classList.add('inputEmpty') 
                    types.classList.remove('inputSucc')                   
                }                               
            },      
            serviceid(){
                if(this.newServiceType.serviceid !=  null && this.newServiceType.serviceid !=  ""){
                    let serviceid = document.querySelector('.serviceid');            
                    this.inputErr.serviceid = null                                        
                    serviceid.classList.add('inputSucc')
                    serviceid.classList.remove('inputErr')
                    serviceid.classList.remove('inputEmpty') 
                }else{
                    let serviceid = document.querySelector('.serviceid');            
                    serviceid.classList.add('inputEmpty') 
                    serviceid.classList.remove('inputSucc')                   
                }                               
            },            
        },

        created(){
            this.services()
        }
        
     }   

</script>

<style>
 
</style>