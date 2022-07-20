<template>
    <div>
        <table id="table">                        
            <thead>
                <tr>                                    
                    <th>Service Name</th>
                    <th>Description</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody :key="tableKey" id="table">
                <tr v-for="service in services" :key="service">                                   
                    <td>{{service.service_name}}</td>
                    <td>{{service.description}}</td>
                    <td>                                       
                        <button :disabled="updateMode" v-if="service.deleted_at == null" class="btn-danger" @click="deactivate(service)" data-toggle="tooltip" data-placement="top" title="">
                            <i class="fa fa-trash" aria-hidden="true"></i> 
                        </button>                                            
                        <button class="btn-edit" @click="update(service)" data-toggle="tooltip" data-placement="top" title="">  
                            <i class="fa fa-edit" aria-hidden="true"></i> 
                        </button>                                                                  
                        <button  v-if="service.deleted_at != null"  class="btn-restore" @click="activate(service)" data-toggle="tooltip" data-placement="top" title="">  
                            <i class="fa fa-trash-restore" aria-hidden="true"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import Services from '@/Apis/Services'
import Swal from 'sweetalert2'
    export default{  
        data() {
            return {
                services:null,
                updateMode:false,
                singleObject:null,
                tableKey:0,
                isLoading:false
            }
        },
        methods: {
            allservices(){
                Services.allservices().then((result) => {
                    this.services = result.data.data
                    this.datatable()
                })
            },
            update(service){
                this.updateMode = true
                this.singleObject = service  
                this.$emit('single-object', service)
            },
            activate(service){
                this.isLoading = true 
                Services.activate({id:service.id}).then((result) => {
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
                })
            },
            deactivate(service){
                this.isLoading = true 
                Services.deactivate({id:service.id}).then((result) => {
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
            this.allservices()
        }
    }
</script>