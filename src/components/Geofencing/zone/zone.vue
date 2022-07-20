<template>
    <div>
        <nav-bar />
        <div class="main">            
            <center>
            <div class="loading" v-if="isLoading">
                <loading />
            </div>
                <button v-if="!opencreateform" class="top-button" @click="create()" style="margin-bottom:2%" data-toggle="tooltip" data-placement="top" title="Open Create Form"> 
                    <p>Create <i class="fa fa-plus-circle" aria-hidden="true"></i></p>                    
                </button>             

                <button v-if="opencreateform" class="top-button" @click="create()" style="margin-bottom:2%; background:red" data-toggle="tooltip" data-placement="top" title="Close"> 
                    <p>Back <i class="fa fa-arrow-circle-left" aria-hidden="true"></i> </p>                    
                </button>             
            </center>
            <!-- form start-->   
                <TransitionGroup name="content">                                     
                    <div v-if="opencreateform">                        
                        <create-form 
                            :zone="singleObject" 
                            :updateMode="updateMode" 
                            @zone_created="zone_created"
                            @zone_updated="zone_updated"
                        />
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
                                    <option value="1"><center>All</center></option>
                                    <option value="2"><center>Active</center></option>
                                    <option value="3"><center>Inactive</center></option>
                                </select>                    
                            </div>
                        </center>                        

                        <table id="table" >                        
                            <thead>
                                <tr>                                    
                                    <th>Name</th>
                                    <th>Area</th>
                                    <th>Status</th>
                                    <th>lga</th>
                                    <th>state</th>                                    
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody :key="tableKey">
                                <tr  v-for="zone in zones" :key="zone">
                                    <td>{{ zone.name }}</td> 
                                    <td>{{ zone.location.location_name }}</td>
                                    <td v-if="zone.deleted_at==null" 
                                    style="color:green">Active </td>
                                    <td v-else style="color:red">Inactive</td>
                                    <td>{{ zone.location.lga }}</td>
                                    <td>{{ zone.location.state }}</td>                                    
                                    <td>                                       
                                        <button class="btn-danger" @click="deactivate(zone)" data-toggle="tooltip" data-placement="top" title="">
                                            <i class="fa fa-trash" aria-hidden="true"></i> 
                                        </button>                                            
                                        <button v-if="zone.deleted_at == null" class="btn-edit" @click="update(zone)" data-toggle="tooltip" data-placement="top" title="">  
                                            <i class="fa fa-edit" aria-hidden="true"></i> 
                                        </button>                                                                                   
                                        <button  class="btn-restore" @click="activate(zone)" data-toggle="tooltip" data-placement="top" title="">  
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
import NavBar from '../../NavBar.vue';
import Loading from '../../Loading.vue'
import Swal from 'sweetalert2'
import Zone from '@/Apis/Zone'
import CreateForm from './createform.vue'
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
                filter:2,
                zones:null
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
                this.getAll()
                this.getActive()
                this.getInActive()
            },

            zone_created(){
                this.showtable = true            
                this.opencreateform = false
                this.api_refresh()
                this.tableKey++ 
            },

            zone_updated(){
                this.showtable = true
                this.opencreateform = false
                this.alladmin()
                this.tableKey++ 
            },

            filter_table(){
                if(this.filter == 1){
                    this.getAll()
                }else if(this.filter == 2){
                    this.getActive()
                }else{
                    this.getInActive()
                }
            },
           
            create(){ 
                this.opencreateform = !this.opencreateform
                this.showtable = false
                this.singleObject = null
                this.updateMode = false             
            },     
            
            getAll(){
                Zone.all_zones().then((result) => {
                    this.zones = result.data.data                    
                    this.datatable()
                    this.tableKey++
                })
            },

            getActive(){
                Zone.active_zones().then((result) => {
                    this.zones = result.data.data                    
                    this.datatable()
                    this.tableKey++
                })
            },
            getInActive(){
                Zone.inactive_zones().then((result) => {
                    this.zones = result.data.data                    
                    this.datatable()
                    this.tableKey++
                })
            },
            
            update(zone){
                this.updateMode = true
                this.singleObject = zone
                this.showtable = false
                this.opencreateform=true
            },

            activate(zone){
                this.isLoading = true
                Zone.activate_zone({'id':zone.id}).then((result) => {
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

            deactivate(zone){
                this.isLoading = true
                Zone.deactivate_zone({'id':zone.id}).then((result) => {
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
                    this.getActive()
                }).catch(()=>{
                    this.$router.push('/')                    
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
            this.datatable()
        },
    }
</script>

<style scoped>
li{
    list-style-type: none;
}
</style>