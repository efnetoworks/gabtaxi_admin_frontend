<template>
    <div>
        <nav-bar />
        <div class="main">            
            <center>
            <div class="loading" v-if="isLoading">
                <loading />
            </div>
            </center>
            <!-- form start-->   
                <TransitionGroup name="content">                                     
                    <center>
                        <div class="form-group">
                            <label for="">Heat Map Toggle</label>
                            <select id="">
                                <option value="">Heat Map Options</option>
                                <option value="">Surge on demand</option>
                                <option value="">Drivers Surge</option>
                                <option value="">Passengers Surge</option>
                            </select>
                        </div>                                           
                    </center>
                </TransitionGroup>                     
            <!-- form end -->
            <!-- Table Div Start -->
            <TransitionGroup name="content">                                     
                <center>
                    <Map :key="mapKey" :locarea="{name:selectedArea}"/>
                </center>
            </TransitionGroup>                     
            <!-- Table Div End -->
        </div>
    </div>
</template>

<script>
import User from '@/Apis/User';
import NavBar from '@/components/NavBar.vue';
import Loading from '@/components/Loading.vue'
import Swal from 'sweetalert2'
import Map from './map.vue'
    export default{          
        components:{NavBar, Loading, Map},
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
                mapKey:0,
                selectedArea:"Maitama"

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