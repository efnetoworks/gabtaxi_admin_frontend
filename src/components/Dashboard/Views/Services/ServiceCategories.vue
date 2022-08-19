<template>
  <div>
    <h3>Service Categories</h3>
     <div class="row">
     <center>
        <p-button class="btn btn-success " size="lg" type="success" icon @click.native="newCategory()">
              <i class="fa fa-plus"></i>
        </p-button>
     </center>
    </div>
    <div>

    </div>
    <table id="table" class="table table-striped">
      <thead>
        <tr>
          <th></th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, index) in categories" :key="category">
          <td>{{index+1}}</td>
          <!-- <th><img :src="admin.picture" alt="" height="50" width="70"></th> -->
          <td>{{category.category}}</td>
          <td v-if="category.deleted_at == null">
            <p-button class="mr-2" type="danger" size="lg" icon @click.prevent="deactivate(category)">
              <i class="fa fa-times"></i>
            </p-button>
            <p-button class="mr-2" type="info" size="lg" icon @click.prevent="openModal(category)">
              <i class="fa fa-edit"></i>
            </p-button>
          </td>
          <td v-if="category.deleted_at != null">
            <p-button class="mr-2" type="warning" size="lg" icon @click.native="activate(category)">
              <i class="fa fa-refresh" aria-hidden="true"></i>
            </p-button>
          </td>
        </tr>
      </tbody>
    </table>
      <!-- update modal -->
      <modal :show.sync="modals.classic" headerClasses="justify-content-center">
                <h4 slot="header" class="title title-up" v-show="updateMode">Update Category</h4>
                <h4 slot="header" class="title title-up" v-show="!updateMode">New Category</h4>
                  <form @submit.prevent="save">
                    <div class="form-group">
                        <label for="" >Category Name</label>
                        <input type="text" class="form-control" placeholder="Category Name" v-model="form.category" required>
                    </div>


                      <button type="submit" class="btn btn-success col-12" v-show="updateMode">Update</button>
                      <button type="submit" class="btn btn-success col-12" v-show="!updateMode">Submit</button>
                  </form>
                <template slot="footer">
                  <p-button type="default" link @click.prevent="modals.classic = false">Close</p-button>
                </template>
      </modal>
  </div>
</template>
<script>
  import { Modal } from '@/components/UIComponents'
  import Category from '@/javascript/Api/Category'
  import Swal from 'sweetalert2'
  export default{
     components: {
      Modal
    },
    data() {
      return {
        updateMode:false,
        locations:null,
        filter:1,
        form:{
          id:null,
          category:null,
        },
        categories:null,
        modals: {
          classic: false,
          notice: false,
          mini: false
        },
      }
    },
    computed:{
      id(){
        return this.form.id
      },
      classic(){
        return this.modals.classic
      }
    },
    methods: {
      newCategory(){
        this.modals.classic = true
      },
      openModal(category){
        this.updateMode = true
        this.form.id = category.id
        this.form.category = category.category
        this.modals.classic = true
      },
      allcategories(){
          Category.allcategories().then((result) => {
              this.categories = result.data.data
              this.datatable()
          })
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
                Category.deactivate({id:category.id}).then((result) => {
                    this.api_refresh()
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: result.data.message,
                        customClass: 'Swal-wide',
                        showConfirmButton: false,
                        timer: 3000
                    })
                })
            },

            save(){
              if(this.updateMode == false){
                Category.create(this.form).then((result) => {
                        this.api_refresh()
                        this.modals.classic = false
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Service Created',
                            customClass: 'Swal-wide',
                            showConfirmButton: false,
                            timer: 3000
                        })
                        this.form.category = null
                    }).catch((err) => {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: err.response.data.message,
                            customClass: 'Swal-wide',
                            showConfirmButton: false,
                            timer: 3000
                        })
                    });
            }else{
             Category.update(this.form).then((result) => {
                this.api_refresh()
                this.modals.classic = false
                  Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: result.data.message,
                      customClass: 'Swal-wide',
                      showConfirmButton: false,
                      timer: 3000
                  })
              }).catch((err) => {
                  Swal.fire({
                      position: 'top-end',
                      icon: 'error',
                      title: err,
                      customClass: 'Swal-wide',
                      showConfirmButton: false,
                      timer: 3000
                  })
                  this.isLoading = false
              });
            }

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

            api_refresh(){
              this.allcategories()
            }
    },
    computed:{
      id(){
        return this.form.id
      },
      classic(){
        return this.modals.classic
      }
    },
    watch:{
      id(){
        this.form.id == null ? this.updateMode = false : this.updateMode = true
      },
      classic(){
        if(this.modals.classic == false){
          this.form.id = null
          this.form.category = null
        }
      }
    },
    created(){
      this.allcategories()
    }

  }
</script>
