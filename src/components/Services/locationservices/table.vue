<template>
    <div>
        <table id="table">                        
            <thead>
                <tr>                                    
                    <th>Service Type</th>
                    <th>Category</th>
                    <th>Geo Zone</th>
                    <th>Price/Km</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody :key="tableKey" id="table">
                <tr v-for="type in locationservices" :key="type">                                   
                    <td>{{type.svctype.types}}</td>
                    <td>{{type.svccategory.category}}</td>
                    <td>{{type.svclocation.name}}</td>
                    <td>{{type.price}}</td>
                    <td>                                       
                        <button :disabled="updateMode" v-if="type.deleted_at == null" class="btn-danger" @click="deactivate(type)" data-toggle="tooltip" data-placement="top" title="">
                            <i class="fa fa-trash" aria-hidden="true"></i> 
                        </button>                                            
                        <button class="btn-edit" @click="update(type)" data-toggle="tooltip" data-placement="top" title="">  
                            <i class="fa fa-edit" aria-hidden="true"></i> 
                        </button>                                                                  
                        <!-- <button  v-if="type.deleted_at != null"  class="btn-restore" @click="activate(type)" data-toggle="tooltip" data-placement="top" title="">  
                            <i class="fa fa-trash-restore" aria-hidden="true"></i>
                        </button> -->
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import LocationType from '@/Apis/LocationService.js'
import Swal from 'sweetalert2'
    export default{  
        data() {
            return {
                locationservices:null,
                updateMode:false,
                singleObject:null,
                tableKey:0,
                isLoading:false
            }
        },
        methods: {
            alllocationservices(){
                LocationType.getAll().then((result) => {
                    this.locationservices = result.data.data
                    this.datatable()
                })
            },

            update(loctype){
                this.updateMode = true
                this.singleObject = loctype  
                this.$emit('single-object', loctype)
            },

            deactivate(loctype){
                this.isLoading = true 
                LocationType.deactivate({id:loctype.id}).then((result) => {
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
                })
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
        },
        
        created(){
            this.alllocationservices()
        }
    }
</script>