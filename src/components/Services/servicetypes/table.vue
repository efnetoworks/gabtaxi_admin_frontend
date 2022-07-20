<template>
    <div>
        <table id="table">                        
            <thead>
                <tr>                                    
                    <th>Type</th>
                    <th>Service</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody :key="tableKey" id="table">
                <tr v-for="type in servicetypes" :key="type">                                   
                    <td>{{type.types}}</td>
                    <td>{{type.service.service_name}}</td>
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
import ServiceType from '@/Apis/ServiceTypes'
import Swal from 'sweetalert2'
    export default{  
        data() {
            return {
                servicetypes:null,
                updateMode:false,
                singleObject:null,
                tableKey:0,
                isLoading:false
            }
        },
        methods: {
            allservicetypes(){
                ServiceType.allservicetypes().then((result) => {
                    this.servicetypes = result.data.data
                    this.datatable()
                })
            },

            update(servicetype){
                this.updateMode = true
                this.singleObject = servicetype  
                this.$emit('single-type-object', servicetype)
            },

            deactivate(servicetype){
                this.isLoading = true 
                ServiceType.deactivate({id:servicetype.id}).then((result) => {
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
            this.allservicetypes()
        }
    }
</script>