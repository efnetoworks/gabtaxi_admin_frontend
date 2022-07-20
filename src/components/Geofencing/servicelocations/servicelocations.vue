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
                    <p>Back <i class="fa fa-times" aria-hidden="true"></i></p>                    
                </button>             
            </center>
            <!-- form start-->   
                <TransitionGroup name="content">                                     
                    <div v-if="opencreateform">                        
                        <create-form @object_created=object_created />
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
                                    <option value="1">All Locations</option>
                                    <option value="2">Active Locations</option>
                                    <option value="3">Inactive Locations</option>
                                </select>                    
                            </div>
                        </center>
                    <center>
                        <table id="table">                        
                            <thead>
                                <tr>
                                    <th>Location Name</th>                                    
                                    <th>Country</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody :key="tableKey">
                                <tr v-for="location in locations" :key="location"> 
                                    <td><center>{{location.location_name}}</center></td>
                                    <td><center>{{location.country.name }}</center></td>
                                    <td> <center>                            
                                        <button v-if="location.deleted_at == null" class="btn-danger" @click="deactivate(location.id)" data-toggle="tooltip" data-placement="top" title="Remove Service Location">
                                            <i class="fa fa-trash" aria-hidden="true"></i> 
                                        </button>                                                                                    
                                        <button v-if="location.deleted_at != null"  class="btn-restore" @click="activate(location.id)" data-toggle="tooltip" data-placement="top" title="Restore Service Location">  
                                            <i class="fa fa-trash-restore" aria-hidden="true"></i>
                                        </button>
                                             </center>     
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </center>
                </div>
            </TransitionGroup>                     
            <!-- Table Div End -->
        </div>
    </div>
</template>

<script>
import User from '@/Apis/User';
import Locations from '@/Apis/ServiceLocations.js'
import NavBar from '../../NavBar.vue';
import Loading from '../../Loading.vue'
import CreateForm from '../servicelocations/createform.vue'
import Swal from 'sweetalert2'
    export default{          
        components:{NavBar, Loading, CreateForm},
        data() {
            return {
                user:null,
                opencreateform:false,
                showtable:true,
                singleObject:null,
                tableKey:0,
                updateMode:false,
                isLoading:false,
                filter:1,
                locations:null
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

            all_locations(){
                Locations.all_locations().then((result) => {
                    this.locations = result.data.data                    
                    this.tableKey++
                    this.datatable()                    
                });
            },

            api_refresh(){
                this.all_locations()
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
                    this.all_locations()
                }else if(this.filter == 2){
                    this.activeLocations()
                }else{
                    this.inactiveLocations()
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
            

            activate(location){
                this.isLoading = true
                Locations.activate({'id':location}).then((result) => {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: result.data.message,
                        customClass: 'Swal-wide',
                        showConfirmButton: false,
                        timer: 3000
                    }) 
                    this.api_refresh()
                    this.isLoading = false
                }).catch((err) => {
                    this.isLoading = false
                     Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: err.response.data.message,
                        customClass: 'Swal-wide',
                        showConfirmButton: false,
                        timer: 3000
                    })
                });
            },
// 
            deactivate(location){
                console.log(location)
                this.isLoading = true
                Locations.deactivate({'id':location}).then((result) => {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: result.data.message,
                        customClass: 'Swal-wide',
                        showConfirmButton: false,
                        timer: 3000
                    }) 
                    this.api_refresh()
                    this.isLoading = false
                }).catch((err) => {
                    this.isLoading = false
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: err.response.data.message,
                        customClass: 'Swal-wide',
                        showConfirmButton: false,
                        timer: 3000
                    })
                });
            },

            getAuth(){
                User.auth().then((result)=>{
                    this.user = result.data
                    this.activeLocations() 
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

            activeLocations(){
                Locations.activeLocations().then((result) => {
                    this.locations = result.data.data                    
                    this.datatable()
                    this.tableKey++
                })
            },

            inactiveLocations(){
                Locations.inactiveLocations().then((result) => {
                    this.locations = result.data.data                    
                    this.datatable()
                    this.tableKey++
                })
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
        },
    }
</script>

<style scoped>
li{
    list-style-type: none;
}
</style>