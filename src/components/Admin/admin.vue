<template>
    <div>
        <nav-bar />
        <div class="main">            
            <center>
            <div class="loading" v-if="isLoading">
                <loading />
            </div>
                <button v-if="!openadmincreate" class="top-button" @click="createadmin()" style="margin-bottom:2%" data-toggle="tooltip" data-placement="top" title="Create Admin Profile"> 
                    <p>Add Admin <i class="fa fa-plus-circle" aria-hidden="true"></i></p>                    
                </button>             

                <button v-if="openadmincreate" class="top-button" @click="createadmin()" style="margin-bottom:2%; background:red" data-toggle="tooltip" data-placement="top" title="Close"> 
                    <p>Back <i class="fa fa-times" aria-hidden="true"></i></p>                    
                </button>             
            </center>
            <!-- admin form start-->   
                <TransitionGroup name="content">                                     
                    <div v-if="openadmincreate">                        
                        <create-form 
                                    :admin="singleAdmin" 
                                    :updateMode="updateMode" 
                                    @admin_created=admin_created 
                                    @admin_updated=admin_updated />            
                    </div>
                </TransitionGroup>                     
            <!-- admin form end -->
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
                        <table id="all-admin">                        
                            <thead>
                                <tr>
                                    <th>Fullname</th>
                                    <th>Telephone</th>
                                    <th>Email Address</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody :key="tableKey">
                                <tr v-for="admin in admins" :key="admin">
                                    <td>{{admin.fullname}}</td>
                                    <td>{{admin.phone}}</td>
                                    <td>{{admin.email}}</td>
                                    <td>                                       
                                        <button v-if="admin.is_active == 1" class="btn-danger" @click="deactivateAdmin(admin)" data-toggle="tooltip" data-placement="top" title="Deactivate User Account">
                                            <i class="fa fa-trash" aria-hidden="true"></i> 
                                        </button>                                            
                                        <button  v-if="admin.is_active == 1" class="btn-edit" @click="updateAdmin(admin)" data-toggle="tooltip" data-placement="top" title="Update User Account">  
                                            <i class="fa fa-edit" aria-hidden="true"></i> 
                                        </button>                                           
                                        <button  v-if="admin.is_active == 1" class="btn-details" @click="resetAdminPassword(admin)" data-toggle="tooltip" data-placement="top" title="Update User Password">  
                                            <i class="fa fa-key" aria-hidden="true"></i>
                                        </button>
                                        <button  v-if="admin.is_active == 0" class="btn-restore" @click="restoreAdmin(admin)" data-toggle="tooltip" data-placement="top" title="Reactivate User Account">  
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
import Admin from '@/Apis/Admin';
import User from '@/Apis/User';
import NavBar from '../NavBar.vue';
import CreateForm from './createform.vue';
import Loading from '../Loading.vue'
import Swal from 'sweetalert2'
    export default{          
        components:{NavBar, CreateForm, Loading},
        data() {
            return {
                user:null,
                openadmincreate:false,
                showtable:true,
                admins:null,
                singleAdmin:null,
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
                        
            alladmin(){
                Admin.all_admin().then((result) => {
                    this.admins = result.data.data
                    this.datatable()
                    this.tableKey++
                })
            },
            
            activeAdmin(){
                Admin.active_admin().then((result) => {
                    this.admins = result.data.data
                    this.datatable()
                    this.tableKey++
                })
            },

            inactiveAdmin(){
                 Admin.inactive_admin().then((result) => {
                    this.admins = result.data.data
                    this.datatable()
                    this.tableKey++
                })
            },

            api_refresh(){
                this.activeAdmin()
                this.inactiveAdmin()
                this.alladmin()
            },

            admin_created(){
                this.showtable = true            
                this.openadmincreate = false
                this.api_refresh()
            },

            admin_updated(){
                this.showtable = true
                this.openadmincreate = false
                this.alladmin()
            },

            filter_table(){
                if(this.filter == 1){
                    this.alladmin()
                }else if(this.filter == 2){
                    this.activeAdmin()
                }else{
                    this.inactiveAdmin()
                }
            },
           
            createadmin(){ 
                this.openadmincreate = !this.openadmincreate
                this.showtable = false
                this.singleAdmin = null 
                this.updateMode = false             
            },

            resetAdminPassword(admin){
                this.isLoading = true
                Admin.reset_admin_password(admin).then((result) => {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: result.data.message,
                        customClass: 'Swal-wide',
                        showConfirmButton: false,
                        timer: 3000
                    }) 
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

            restoreAdmin(admin){
                this.isLoading = true                     
                Admin.activate_admin_account(admin).then((result) => {
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
                        icon: 'warning',
                        title: err.response.data.message,
                        customClass: 'Swal-wide',
                        showConfirmButton: false,
                        timer: 3000
                    }) 
                });
            },

            deactivateAdmin(admin){  
                this.isLoading = true                     
                Admin.deactivate_admin_account(admin).then((result) => {
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
                        icon: 'warning',
                        title: err.response.data.message,
                        customClass: 'Swal-wide',
                        showConfirmButton: false,
                        timer: 3000
                    }) 
                });
            },
                        
            datatable(){            
                $(function() {
                 $('#all-admin').DataTable({                    
                    "bDestroy": true,
                        pageLength: 5,
                        lengthMenu: [[5,10,20], [5, 10, 20]],                    
                    });
                });
            },
            
            getAuth(){
                User.auth().then((result)=>{
                    this.user = result.data
                    this.alladmin()
                    this.datatable()
                }).catch(()=>{
                    this.$router.push('/')                    
                })
            },

            deleteAdmin(admin){
                console.log(admin)
            },

            updateAdmin(admin){
                this.updateMode = true
                this.singleAdmin = admin
                this.showtable = false
                this.openadmincreate=true
            },
            // viewDetails(admin){
            //     console.log(admin)
            // }
        },

        watch:{
            openadmincreate(){
                if(this.openadmincreate == false){
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