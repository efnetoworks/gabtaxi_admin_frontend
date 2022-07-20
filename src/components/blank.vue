<template>
    <div>
        <nav-bar />
        <div class="main">            
            <center>
            <div class="loading" v-if="isLoading">
                <loading />
            </div>
                <button v-if="!opencreateform" class="top-button" @click="create()" style="margin-bottom:2%" data-toggle="tooltip" data-placement="top" title=""> 
                    <p>Create <i class="fa fa-plus-circle" aria-hidden="true"></i></p>                    
                </button>             

                <button v-if="opencreateform" class="top-button" @click="create()" style="margin-bottom:2%; background:red" data-toggle="tooltip" data-placement="top" title="Close"> 
                    <p>Close <i class="fa fa-times" aria-hidden="true"></i></p>                    
                </button>             
            </center>
            <!-- form start-->   
                <TransitionGroup name="content">                                     
                    <div v-if="opencreateform">                        

                    </div>
                </TransitionGroup>                     
            <!-- form end -->
            <!-- Table Div Start -->
            <TransitionGroup name="content">                                     
                <div v-if="showtable">                        
                        <center>
                            <div style="width:20%; margin-top:5%">
                                <label for="">Filter Table</label>
                                <select @change="filter_table()" v-model="filter">
                                    <option value="1">All Admin</option>
                                    <option value="2">Active Admin</option>
                                    <option value="3">Inactive</option>
                                </select>                    
                            </div>
                        </center>
                        <table id="table">                        
                            <thead>
                                <tr>                                    
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody :key="tableKey">
                                <tr>                                   
                                    <td>                                       
                                        <button class="btn-danger" @click="add_function" data-toggle="tooltip" data-placement="top" title="">
                                            <i class="fa fa-trash" aria-hidden="true"></i> 
                                        </button>                                            
                                        <button  class="btn-edit" @click="add_function" data-toggle="tooltip" data-placement="top" title="">  
                                            <i class="fa fa-edit" aria-hidden="true"></i> 
                                        </button>                                           
                                        <button  class="btn-details" @click="add_function" data-toggle="tooltip" data-placement="top" title="">  
                                            <i class="fa fa-key" aria-hidden="true"></i>
                                        </button>
                                        <button  class="btn-restore" @click="add_function" data-toggle="tooltip" data-placement="top" title="">  
                                            <i class="fa fa-trash-restore" aria-hidden="true"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                </div>
            </TransitionGroup>                     
            <!-- Table Div End -->
        </div>
    </div>
</template>

<script>
import User from '@/Apis/User';
import NavBar from '@/NavBar.vue';
import Loading from '@/Loading.vue'
import Swal from 'sweetalert2'
    export default{          
        components:{NavBar, Loading},
        data() {
            return {
                user:null,
                opencreateform:false,
                showtable:true,
                singleObject:null,
                tableKey:0,
                updateMode:false,
                isLoading:false,
                filter:1
            }
        },

        methods: {
            toggleMenu(){
                let toggle = document.querySelector('.toggle');            
                let navigation = document.querySelector('.navigation')
                let main = document.querySelector('.main')            
                navigation.classList.toggle('active')
                toggle.classList.toggle('active')
                main.classList.toggle('active')			
		    },

            api_refresh(){
                // 
            },

            object_created(){
                this.showtable = true            
                this.opencreateform = false
                this.api_refresh()
            },

            object_updated(){
                this.showtable = true
                this.opencreateform = false
                this.alladmin()
            },

            filter_table(){
                if(this.filter == 1){
                    // this.alladmin()
                }else if(this.filter == 2){
                    // this.activeAdmin()
                }else{
                    // this.inactiveAdmin()
                }
            },
           
            create(){ 
                this.opencreateform = !this.opencreateform
                this.showtable = false
                this.singleObject = null
                this.updateMode = false             
            },                      
                        
            datatable(){            
                $(function() {
                 $('#table').DataTable({                    
                    "bDestroy": true,
                        pageLength: 5,
                        lengthMenu: [[5,10,20], [5, 10, 20]],                    
                    });
                });
            },
            
            getAuth(){
                User.auth().then((result)=>{
                    this.user = result.data
                    // 
                    this.datatable()
                }).catch(()=>{
                    this.$router.push('/')                    
                })
            },            

            updateAdmin(object){
                this.updateMode = true
                this.singleObject = object
                this.showtable = false
                this.opencreateform=true
            },

        },

        watch:{
            opencreateform(){
                if(this.opencreateform == false){
                    this.showtable = true
                    this.datatable()
                }
            }
        },

        created() {
            this.getAuth()
            this.datatable()
        },
    }
</script>

<style scoped>
li{
    list-style-type: none;
}
</style>