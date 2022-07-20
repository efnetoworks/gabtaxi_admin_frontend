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
                    Category <span class="required">*<small>{{this.inputErr.category}}</small>
                    </span>
                </label>
                <input type="text" class="category" placeholder="Category" v-model="newCategory.category">                
            </div>


            <button style="margin-bottom: 5%;" v-if="!updateMode" @click="savecategory" id="submit">Submit</button>
            <button style="margin-bottom: 5%;" v-if="updateMode" @click="updatecategory" id="update">Update</button>                    
        </center>

    </div>
</template>
<script>
import Swal from 'sweetalert2'
import Loading from '@/components/Loading.vue'
import Category from '@/Apis/Category.js'
     export default{
        components:{Loading},
        props:{
            categories:null,
            updateMode:null,
        },
        data() {             
             return {                
                newCategory:{
                    id:this.categories != null ? this.categories.id :null,                    
                    category:this.categories != null ? this.categories.category: null,                    
                },          
                componentKey:0,                                
                setTrue:false,
                isLoading:false,
                inputErr:{
                    category:null,                    
                },                
             }
         },

         methods: {           
            getEmptyFields(){
                if(this.newCategory.category == null || this.newCategory.category == ""){
                    this.inputErr.category = 'service name is required'
                    let category = document.querySelector('.category');            
                    category.classList.add('inputErr')                    
                }                 
            },         

            savecategory(){                
                this.getEmptyFields()                
                if(this.inputErr.category != null){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Missing Fields',
                        customClass: 'Swal-wide',
                        showConfirmButton: false,
                        timer: 3000
                    })                 
                    this.newCategory.category = null                    
                }else{
                    this.isLoading = true
                    Category.create(this.newCategory).then((result) => {
                        this.$emit('categorycreated');                        
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Service Created',
                            customClass: 'Swal-wide',
                            showConfirmButton: false,
                            timer: 3000
                        })                        
                        this.isLoading = false
                        this.newCategory.category = null                        
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

            updatecategory(){                
                this.getEmptyFields()                               
                if(this.inputErr.category != null){
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Missing Fields',
                            customClass: 'Swal-wide',
                            showConfirmButton: false,
                            timer: 3000
                        })  
                        this.isLoading = false 
                        this.newCategory.category = null
                }else{
                    this.isLoading = true 
                    Category.update(this.newCategory).then((result) => {
                        this.$emit('categoryupdated')                       
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
            category(){                    
                return this.newCategory.category;                    
            },         
            props(){
                return this.updateMode
            }

        },

        watch:{         
            category(){
                if(this.newCategory.category !=  null && this.newCategory.category !=  ""){
                    let category = document.querySelector('.category');            
                    this.inputErr.category = null                                        
                    category.classList.add('inputSucc')
                    category.classList.remove('inputErr')
                    category.classList.remove('inputEmpty') 
                }else{
                    let category = document.querySelector('.category');            
                    category.classList.add('inputEmpty') 
                    category.classList.remove('inputSucc')                   
                }                               
            },            
        },


        
     }   

</script>

<style>
 
</style>