<template>
  <div>
    <h3>Products</h3>
     <div>
       <table id="table" class="table table-striped">
         <thead>
           <tr>
             <th></th>
             <th>name</th>
             <th>code</th>
             <th>category</th>
             <th>stock</th>
             <th>out of stock</th>
             <th>Actions</th>
           </tr>
         </thead>
         <tbody :key="tableKey">
           <tr v-for="(product, index) in products" :key="product.id">
             <td>{{index+1}}</td>
             <td>{{product.name}}</td>
             <td>{{product.code}}</td>
             <td>{{product.category.name}}</td>
             <td>{{product.stock}}</td>
             <td v-if="product.stock < 1" class="bg-danger">Out of Stock</td>
             <td v-else class="bg-success">Available</td>
             <td>
               <p-button class="mr-2" title="details" type="warning" size="sm" icon @click.prevent="goToRoute(product)">
                 <i class="fa fa-eye"></i>
               </p-button>
               <p-button class="mr-2" title="update" type="info" size="sm" icon @click.native="openModal('classic', 'Update Product', 'update', product)">
                 <i class="fa fa-edit"></i>
               </p-button>
               <p-button class="mr-2" title="delete" type="danger" size="sm" icon @click.prevent="delete_user(product)">
                 <i class="fa fa-trash"></i>
               </p-button>
             </td>
           </tr>
         </tbody>
       </table>
    </div>
         <!-- update modal -->
         <modal :show.sync="modals.classic" headerClasses="justify-content-center">
          <h4 slot="header" class="title title-up" v-show="updateMode">{{ modalTitle }}</h4>
          <h4 slot="header" class="title title-up" v-show="!updateMode">{{ modalTitle }}</h4>
            <div v-if="form != null">
              <form @submit.prevent="update">
                  <div class="form-group">
                    <label for="">Name</label>
                    <input type="text" v-model="form.name" class="form-control">
                  </div>
                  <div class="form-group">
                    <label for="">Category</label>
                    <input type="text" v-model="form.category_id" class="form-control">
                  </div>
                  <div class="form-group">
                    <label for="">Price</label>
                    <input type="text" v-model="form.price" class="form-control">
                  </div>
                  <div class="form-group">
                    <label for="">Stock</label>
                    <input type="text" readonly v-model="form.stock" class="form-control">
                  </div>
                  <div class="form-group">
                    <label for="">Product Code</label>
                    <input type="text" v-model="form.code" class="form-control">
                  </div>
              </form>
              <div class="form-group">
                <button type="submit" class="btn btn-success">Submit</button>
              </div>
            </div>
          <template slot="footer">
          <p-button type="default" link @click.prevent="modals.classic = false">Close</p-button>
          </template>
        </modal>

  </div>
</template>
<script>
  import { Modal } from '@/components/UIComponents'
  import Product from '@/javascript/Api/Product'
  import Swal from 'sweetalert2'

  export default{
     components: {
      Modal
    },
    data() {
      return {
        updateMode:false,
        all_users:null,
        filter:1,
        tableKey:0,
        user:null,
        form:null,
        modalTitle:null,
        products: null,
        modals: {
          classic: false,
          notice: false,
          mini: false
        },
      }
    },
    methods: {
      goToRoute(product){
        this.$router.push('/product/detail/'+product.id)
      },
      openModal(type, title, action, product){
        this.modalTitle = title
        this.modals[type] = true
        this.modalAction = action
        if(action == 'update'){
            this.updateMode = true
            this.form = product
        }
      },
      update(){
        Product.update(this.form, this.form.id).then((result) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: result.data.message,
            customClass: 'Swal-wide',
            showConfirmButton: false,
            timer: 3000
          })
          this.rows.category = [{name:null}]
          this.allcategories()
        }).catch((err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: err.data.message,
            customClass: 'Swal-wide',
            showConfirmButton: false,
            timer: 3000
          })
        });
      },

      get_product(){
        Product.products().then((result) => {
          this.products = result.data.data
          this.datatable()
        })
      },

      delete_user(user){
        Product.delete(user.id).then((result) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: result.data.message,
            customClass: 'Swal-wide',
            showConfirmButton: false,
            timer: 3000
          })
          this.get_product()
        }).catch((err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: result.data.message,
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

      filter_table(){
        if(this.filter == 1){
            this.all_users = this.all_users
            this.api_refresh()
        }else if(this.filter == 2){
            this.all_users = this.active_users
            this.api_refresh()
        }else if(this.filter == 3){
            this.all_users = this.inactive_users
            this.api_refresh()
        } else if(this.filter == 4){
          this.all_users = this.banned_users
          this.api_refresh()
        } else{
            this.all_users = this.vip_users
            this.api_refresh()
        }
      },
        api_refresh(){
            this.allUsers()
        },
    },
    created(){
      this.get_product()
    }

  }
</script>

