<template>
    <div :key="componentKey">
        <center>
            <center style="margin-bottom:2%;">
                <h1>Service </h1>  <br /><b>Add New Service</b>
                <div class="loading" v-if="isLoading">
                    <loading />
                </div>
            </center>
               
            <div class="form-group">
                <label for="" >
                    Service Name <span class="required">*<small>{{this.inputErr.service_name}}</small>
                    </span>
                </label>
                <input type="text" class="service_name" placeholder="Service Name" v-model="newService.service_name">                
            </div>

            <div class="form-group">
                <label for="" >
                    Description <span class="required">*<small>{{this.inputErr.description}}</small>
                    </span>
                </label>
                <textarea name="description" id="" cols="30" rows="5" v-model="newService.description"></textarea>                
            </div>

            <button style="margin-bottom: 5%;" v-if="!updateMode" @click="saveservice" id="submit">Submit</button>
            <button style="margin-bottom: 5%;" v-if="updateMode" @click="updateservice" id="update">Update</button>                    
        </center>

    </div>
</template>
<script>
import Swal from 'sweetalert2'
import Loading from '@/components/Loading.vue'
import Service from '@/Apis/Services.js'
     export default{
        components:{Loading},
        props:{
            services:null,
            updateMode:null,
        },
        data() {             
             return {                
                newService:{
                    id:this.services != null ? this.services.id :null,                    
                    service_name:this.services != null ? this.services.service_name: null,                    
                    description:this.services != null ?  this.services.description: null,                                                                          
                },          
                componentKey:0,                                
                setTrue:false,
                isLoading:false,
                inputErr:{
                    service_name:null,                    
                    description:null                                                        
                },                
             }
         },

         methods: {           
            getEmptyFields(){
                if(this.newService.service_name == null || this.newService.service_name == ""){
                    this.inputErr.service_name = 'service name is required'
                    let service_name = document.querySelector('.service_name');            
                    service_name.classList.add('inputErr')                    
                }                 
            },         

            saveservice(){                
                this.getEmptyFields()                
                if(this.inputErr.service_name != null){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Missing Fields',
                        customClass: 'Swal-wide',
                        showConfirmButton: false,
                        timer: 3000
                    })                 
                    this.newService.service_name = null                    
                }else{
                    this.isLoading = true
                    Service.create(this.newService).then((result) => {
                        this.$emit('servicecreated');                        
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Service Created',
                            customClass: 'Swal-wide',
                            showConfirmButton: false,
                            timer: 3000
                        })                        
                        this.isLoading = false
                        this.newService.service_name = null
                        this.newService.description = null
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

            updateservice(){                
                this.getEmptyFields()                               
                if(this.inputErr.service_name != null){
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Missing Fields',
                            customClass: 'Swal-wide',
                            showConfirmButton: false,
                            timer: 3000
                        })  
                        this.isLoading = false 
                        this.newService.service_name = null
                }else{
                    this.isLoading = true 
                    Service.update(this.newService).then((result) => {
                        this.$emit('serviceupdated')                       
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
                        this.isLoading = false                                         
                    });
                }                 
            },                    
        },       
         
        computed: {
            service_name(){                    
                return this.newService.service_name;                    
            },         
            props(){
                return this.updateMode
            }

        },

        watch:{         
            service_name(){
                if(this.newService.service_name !=  null && this.newService.service_name !=  ""){
                    let service_name = document.querySelector('.service_name');            
                    this.inputErr.service_name = null                                        
                    service_name.classList.add('inputSucc')
                    service_name.classList.remove('inputErr')
                    service_name.classList.remove('inputEmpty') 
                }else{
                    let service_name = document.querySelector('.service_name');            
                    service_name.classList.add('inputEmpty') 
                    service_name.classList.remove('inputSucc')                   
                }                               
            },            
        },


        
     }   

</script>

<style>
 
</style>