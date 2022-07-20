<template>
    <div :key="componentKey">
        <nav-bar />
        <div class="main">            
            <center style="margin-bottom:5%" >                
                <button @click="changeState('service')" class="pageLink">Services</button>
                <button @click="changeState('category')" class="pageLink">Service Categories</button>
                <button @click="changeState('types')" class="pageLink">Service Types</button>
                <button @click="changeState('location_service_types')" class="pageLink">Location Service Types</button>
            </center>            
            <!-- form start-->   
                <TransitionGroup name="content" :key="stateKey">                                     
                    <div v-if="opencreateform">                                                
                        <div v-if="state == 'service'">
                            <service-form 
                                :key="serviceKey" 
                                :services="singleObject" 
                                :update-mode="updateMode" 
                                @servicecreated="serviceCreated"
                                @serviceupdated="serviceUpdated"
                            />
                        </div>
                        <div v-if="state == 'types'">
                            <type-form 
                                :key="typeKey" 
                                :servicetype="singleObject" 
                                :update-mode="updateMode"
                                @typecreated="typeCreated"
                                @typeupdated="typeUpdated" 
                            />
                        </div>
                        <div v-if="state == 'category'">
                            <category-form 
                                :key="categoryKey" 
                                :categories="singleObject" 
                                :update-mode="updateMode" 
                                @categorycreated="categoryCreated"
                                @categoryupdated="caegoryUpdated"
                            />
                        </div>
                        <div v-if="state == 'location_service_types'">
                            <location-type-form 
                                :key="locTypeKey" 
                                :locservicetype="singleObject" 
                                :update-mode="updateMode" 
                                @loctypecreated="locationTypeCreated"
                                @loctypeupdated="locationTypeUpdated"
                            />
                        </div>
                    </div>
                </TransitionGroup>                     
            <!-- form end -->
            <!-- Table Div Start -->
            <TransitionGroup name="content">                                     
                <div v-if="showtable">                        
                    <div v-if="state == 'service'">
                        <service-table 
                            :key="serviceTable" 
                            @single-object="getServiceObject" 
                            @servicecreated="serviceCreated"
                            @serviceupdated="serviceUpdated"
                        />
                    </div>
                    <div v-if="state == 'types'">
                        <type-table 
                            :key="typeTable" 
                            @single-type-object="getTypeObject"
                            @typecreated="typeCreated"
                            @typeupdated="typeUpdated" 
                        />
                    </div>
                    <div v-if="state == 'category'">
                        <category-table 
                            :key="categoryTable" 
                            @single-object="getCategoryObject" 
                            @categorycreated="categoryCreated"
                            @categoryupdated="caegoryUpdated"
                        />
                    </div>
                    <div v-if="state == 'location_service_types'">
                        <location-type-table 
                            :key="locTypeTable" 
                            @single-object="getLoctypeObject" 
                            @loctypecreated="locationTypeCreated"
                            @categoryupdated="locationTypeUpdated"                            
                        />
                    </div>
                </div>
            </TransitionGroup>                     
            <!-- Table Div End -->
        </div>
    </div>
</template>

<script>
import User from '@/Apis/User';
import NavBar from '@/components/NavBar.vue';
import ServiceForm from '@/components/Services/services/form.vue'
import ServiceTable from '@/components/Services/services/table.vue'
import TypeForm from '@/components/Services/servicetypes/form.vue'
import TypeTable from '@/components/Services/servicetypes/table.vue'
import CategoryForm from '@/components/Services/category/form.vue'
import CategoryTable from '@/components/Services/category/table.vue'
import LocationTypeForm from '@/components/Services/locationservices/form.vue'
import LocationTypeTable from '@/components/Services/locationservices/table.vue'
    export default{          
        components:{
            NavBar, 
            ServiceForm, 
            ServiceTable, 
            TypeForm, 
            TypeTable,
            CategoryForm,
            CategoryTable,
            LocationTypeForm,
            LocationTypeTable,
        },
        data() {
            return {
                user:null,
                opencreateform:false,
                showtable:true,
                singleObject:null,
                serviceTable:0,
                stateKey:0,
                updateMode:false,
                isLoading:false,
                filter:1,
                state:"service",
                componentKey:0,    
                serviceKey:0,
                typeKey:0,
                typeTable:0,
                categoryKey:0,
                categoryTable:0,
                locTypeKey:0,
                locTypeTable:0
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
            serviceCreated(){
                this.showtable = true            
                this.serviceTable++
            },
            getServiceObject(obj){
                this.singleObject = obj
                this.serviceKey++
                this.updateMode = true
            },
            serviceUpdated(){
                this.showtable = true            
                this.updateMode = false
                this.singleObject = null
                this.serviceTable++
                this.serviceKey++
            },         
            typeCreated(){
                this.showtable = true            
                this.typeTable++
            },
            getTypeObject(obj){
                this.singleObject = obj
                this.typeKey++
                this.updateMode = true
            },
            typeUpdated(){
                this.showtable = true            
                this.updateMode = false
                this.singleObject = null
                this.typeTable++
                this.typeKey++
            },
            categoryCreated(){
                this.showtable = true            
                this.categoryTable++
            },
            getCategoryObject(obj){
                this.singleObject = obj
                this.categoryKey++
                this.updateMode = true
            },
            caegoryUpdated(){
                this.showtable = true            
                this.updateMode = false
                this.singleObject = null
                this.categoryTable++
                this.categoryKey++
            },
            locationTypeCreated(){
                this.showtable = true            
                this.locTypeTable++
            },
            getLoctypeObject(obj){
                this.singleObject = obj
                this.locTypeKey++
                this.updateMode = true
            },
            locationTypeUpdated(){
                this.showtable = true            
                this.updateMode = false
                this.singleObject = null
                this.locTypeTable++
                this.locTypeKey++
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
            changeState(state){
                if(state == 'service'){                    
                    this.stateKey++
                    this.tableKey++
                    this.state = state                    
                    this.opencreateform = true
                }else{
                    //
                }
                if(state == 'category'){                    
                    this.stateKey++
                    this.tableKey++
                    this.state = state
                }else{
                    //
                }                
                if(state=='types'){
                    this.stateKey++
                    this.tableKey++
                    this.state = state
                }else{
                    //
                }
                if(state=="location_service_types"){                
                    this.stateKey++
                    this.tableKey++
                    this.state = state                    
                }else{
                    //
                }
            },                                                                                    
            getAuth(){
                User.auth().then((result)=>{
                    this.user = result.data
                }).catch(()=>{
                    this.$router.push('/')                    
                })
            },                        
        },

        watch:{
            opencreateform(){
                if(this.opencreateform == true){
                    this.showtable = true
                }
            },
        },

        created() {
            this.getAuth()
            this.changeState(this.state)
        },
    }
</script>

<style scoped>
li{
    list-style-type: none;
}
.pageLink{
    text-decoration: none;
    margin-right: 2%;
    color: white;
    font-weight: 800;
    background: black;
    width: 20%;    
    border-radius: 20px;
}
.pageLink:hover{
    background: whitesmoke;
    color:black
}

.pageLink:active{
    background:whitesmoke;
    color:black;
    
}
</style>