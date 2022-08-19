<template>
  <div>
    <h3>Admin</h3>
     <div>
      <center>
        <label class="mr-2">Filter Table </label>
        <select @change="filter_table()" v-model="filter">
            <option value="1">All Admin</option>
            <option value="2">Active Admin</option>
            <option value="3">Inactive</option>
        </select>
      </center>
    </div>
    <table id="table" class="table table-striped">
      <thead>
        <tr>
          <th></th>
          <!-- <th></th> -->
          <th>Fullname</th>
          <th>Telephone</th>
          <th>Gender</th>
          <th>Email Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody :key="tableKey">
        <tr v-for="(admin, index) in alladmin" :key="admin">
          <td>{{index+1}}</td>
          <!-- <th><img :src="admin.picture" alt="" height="50" width="70"></th> -->
          <td>{{admin.fullname}}</td>
          <td>{{admin.phone}}</td>
          <td>{{admin.sex}}</td>
          <td>{{admin.email}}</td>
          <td v-if="admin.is_active == 1">
            <p-button class="mr-2" type="success" size="sm" icon @click.native="openModal('classic', 'update', admin)">
              <i class="fa fa-edit"></i>
            </p-button>
            <p-button class="mr-2" type="danger" size="sm" icon @click.prevent="deactivateAdmin(admin)">
              <i class="fa fa-times"></i>
            </p-button>
            <p-button class="mr-2" type="info" size="sm" icon @click.prevent="resetAdminPassword(admin)">
              <i class="fa fa-key"></i>
            </p-button>
          </td>
          <td v-if="admin.is_active == 0">
            <p-button class="mr-2" type="warning" size="sm" icon @click.native="restoreAdmin(admin)">
              <i class="fa fa-refresh" aria-hidden="true"></i>
            </p-button>
          </td>
        </tr>
      </tbody>
    </table>
      <!-- update modal -->
      <modal :show.sync="modals.classic" headerClasses="justify-content-center">
                <h4 slot="header" class="title title-up" v-show="updateMode">Update Admin</h4>
                  <form @submit.prevent="update_admin">
                     <div class="form-group">
                          <label for="">Fullname</label>
                          <input type="text" class="form-control" placeholder="Fullname" v-model="admin.fullname" required>
                      </div>
                      <div class="form-group">
                          <label for="">Telelephone</label>
                          <input type="text" class="form-control" placeholder="+234" v-model="admin.phone">
                      </div>
                      <div class="form-group">
                          <label for="">Email</label>
                          <input type="text" class="form-control" placeholder="xyz@abc.com" v-model="admin.email">
                      </div>
                      <div class="form-group">
                          <label for="">Gender</label>
                          <select v-model="admin.gender" class="form-control">
                              <option value="null">Select</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                          </select>
                      </div>
                      <div class="form-group">
                          <label for="">Date of Birth</label>
                          <input type="date" v-model="admin.dob" class="form-control">
                      </div>
                      <button type="submit" class="btn btn-success col-12">UPDATE</button>
                  </form>
                <template slot="footer">
                  <p-button type="default" link @click.prevent="modals.classic = false">Close</p-button>
                </template>
      </modal>
  </div>
</template>
<script>
  import { Modal } from '@/components/UIComponents'
  import Admin from '@/javascript/Api/Admin'
  import Swal from 'sweetalert2'

  export default{
     components: {
      Modal
    },
    data() {
      return {
        updateMode:false,
        alladmin:null,
        filter:1,
        tableKey:0,
        admin:{
          id:null,
          fullname:null,
          phone:null,
          email:null,
          gender:null,
          dob:null,
          picture:null,
          user_type:'admin'
        },
        modals: {
          classic: false,
          notice: false,
          mini: false
        },
      }
    },
    methods: {
      openModal(modal, action, admin){
        action != 'update' ? this.updateMode = false : this.updateMode = true
        this.admin.id = admin.id
        this.admin.fullname = admin.fullname
        this.admin.phone = admin.phone
        this.admin.email = admin.email
        this.admin.gender = admin.gender
        this.admin.dob = admin.dob
        this.modals.classic = true
      },
        get_all_admin(){
          Admin.all_admin().then((result) => {
              this.alladmin = result.data.data
              this.datatable()
              this.tableKey++
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

      active_admin(){
          Admin.active_admin().then((result) => {
              this.alladmin = result.data.data
              this.datatable()
              this.tableKey++
          })
      },

        inactive_admin(){
              Admin.inactive_admin().then((result) => {
                this.alladmin = result.data.data
                this.datatable()
                this.tableKey++
            })
        },

        update_admin(){
          Admin.update_admin(this.admin).then((result) => {
              Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: result.data.message,
                  customClass: 'Swal-wide',
                  showConfirmButton: false,
                  timer: 3000
              })
              this.modals.classic = false
            this.api_refresh()
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
        },

        restoreAdmin(admin){
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
                }).catch((err) => {
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
                }).catch((err) => {
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

         resetAdminPassword(admin){
                Admin.reset_admin_password(admin).then((result) => {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: result.data.message,
                        customClass: 'Swal-wide',
                        showConfirmButton: false,
                        timer: 3000
                    })
                }).catch((err) => {
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
          filter_table(){
                if(this.filter == 1){
                    this.get_all_admin()
                }else if(this.filter == 2){
                    this.active_admin()
                }else{
                    this.inactive_admin()
                }
          },
        api_refresh(){
            this.get_all_admin()
            this.active_admin()
            this.inactive_admin()
        },
    },
    created(){
      this.active_admin()
    }

  }
</script>
