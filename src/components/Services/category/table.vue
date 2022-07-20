<template>
    <div>
        <table id="table">                        
            <thead>
                <tr>                                    
                    <th>Service Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody :key="tableKey" id="table">
                <tr v-for="category in categories" :key="category">                                   
                    <td>{{category.category}}</td>
                    <td>                                       
                        <button :disabled="updateMode" v-if="category.deleted_at == null" class="btn-danger" @click="deactivate(category)" data-toggle="tooltip" data-placement="top" title="">
                            <i class="fa fa-trash" aria-hidden="true"></i> 
                        </button>                                            
                        <button class="btn-edit" @click="update(category)" data-toggle="tooltip" data-placement="top" title="">  
                            <i class="fa fa-edit" aria-hidden="true"></i> 
                        </button>                                                                  
                        <button  v-if="category.deleted_at != null"  class="btn-restore" @click="activate(category)" data-toggle="tooltip" data-placement="top" title="">  
                            <i class="fa fa-trash-restore" aria-hidden="true"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import Category from '@/Apis/Category'
import Swal from 'sweetalert2'
    export default{  
        data() {
            return {
                categories:null,
                updateMode:false,
                singleObject:null,
                tableKey:0,
                isLoading:false
            }
        },
        methods: {
            allcategories(){
                Category.allcategories().then((result) => {
                    this.categories = result.data.data
                    this.datatable()
                })
            },
            update(category){
                this.updateMode = true
                this.singleObject = category  
                this.$emit('single-object', category)
            },
            // activate(category){
            //     this.isLoading = true 
            //     Category.activate(category.id).then((result) => {
            //         this.$emit('categoryupdated')
            //         Swal.fire({
            //             position: 'top-end',
            //             icon: 'success',
            //             title: result.data.message,
            //             customClass: 'Swal-wide',
            //             showConfirmButton: false,
            //             timer: 3000
            //         })                          
            //         this.isLoading = false  
            //     })
            // },
            deactivate(category){
                this.isLoading = true 
                Category.deactivate({id:category.id}).then((result) => {
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
            this.allcategories()
        }
    }
</script>