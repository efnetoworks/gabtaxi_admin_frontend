<template>
  <div>
    <h3>Drivers</h3>
     <div>
      <center>
        <label class="mr-2">Filter Table </label>
        <select @change="filter_table()" v-model="filter">
            <option value="1">All</option>
            <option value="2">Active</option>
            <option value="3">Inactive</option>
            <option value="4">Banned Drivers</option>
            <option value="5">VIP Drivers</option>
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
          <th>Email Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody :key="tableKey">
        <tr v-for="(user, index) in all_users" :key="user">
          <td>{{index+1}}</td>
          <td>{{user.fullname}}</td>
          <td>{{user.phone}}</td>
          <td>{{user.email}}</td>
          <td>
            <p-button class="mr-2" title="details" type="info" size="sm" icon @click.prevent="goToRoute(user)">
              <i class="fa fa-eye"></i>
            </p-button>
            <!-- <p-button class="mr-2" title="update driver" type="primary" size="sm" icon @click.native="goToUpdate(user)">
              <i class="fa fa-edit"></i>
            </p-button> -->
            <p-button  v-if="user.is_active == 1"  class="mr-2" title="deactivate driver" type="danger" size="sm" icon @click.prevent="openModal('mini','Deactivate Driver', 'deactivate', user)">
              <i class="fa fa-times"></i>
            </p-button>
            <p-button v-if="user.is_active == 0 && user.is_banned == 0" class="mr-2" title="restore driver" type="secondary" size="sm" icon @click.prevent="openModal('mini','Activate','activate', user)">
              <i class="fa fa-refresh"></i>
            </p-button>
            <p-button v-if="user.is_banned == 0 && user.is_active == 1" class="mr-2" type="warning" size="sm" icon @click.prevent="openModal('mini','Ban Driver','ban', user)" title="ban">
              <i class="fa fa-ban"></i>
            </p-button>
            <p-button v-if="user.is_banned == 1 && user.is_active == 0" class="mr-2" type="success" size="sm" icon @click.prevent="openModal('mini','Remove Ban','unban', user)" title="remove ban">
              <i class="fa fa-refresh"></i>
            </p-button>
            <p-button class="mr-2" type="blue" size="sm" icon @click.prevent="tripHistory(user)" title="trip history">
              <i class="fa fa-car"></i>
            </p-button>
          </td>

        </tr>
      </tbody>
    </table>
       <!-- small modal -->
              <modal :show.sync="modals.mini"
                     class="modal-primary"
                     :show-close="false"
                     headerClasses="justify-content-center"
                     type="mini">
                     <h4 slot="header" class="title title-up">{{ modalTitle }}</h4>
                <h5>{{ modalContent }}</h5>
                <template slot="footer">
                  <div class="left-side">
                    <p-button type="danger" link @click.prevent="modals.mini = false">No</p-button>
                  </div>
                  <div class="divider"></div>
                  <div class="right-side">
                    <p-button type="success" link @click.prevent="modals.mini = false" @click="click_yes">Yes</p-button>
                  </div>
                </template>
              </modal>
  </div>
</template>
<script>
  import { Modal } from '@/components/UIComponents'
  import Dashboard from '@/javascript/Api/Dashboard'
  import Driver from '@/javascript/Api/Driver'
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
        modals: {
          classic: false,
          notice: false,
          mini: false
        },
        modalAction:null,
        modalTitle:null,
        modalContent:null,
        table_state:null,
        all_users: null,
        active_users: null,
        inactive_users: null,
        banned_users: null,
        vip_users: null,
        driver:null,
        assets:null
      }
    },
    methods: {
      openModal(type, title, action, user){
        this.modalTitle = title
        this.modals[type] = true
        this.modalAction = action
        this.driver = user
        if(action == 'deactivate'){
          this.modalContent = "Are you sure you want to deactivate this user?"
        }
        if(action == 'activate'){
          this.modalContent = "Are you sure you want to activate this user?"
        }
        if(action == 'ban'){
          this.modalContent = "Are you sure you want to ban this user?"
        }
        if(action == 'unban'){
          this.modalContent = "Are you sure you want to remove ban?"
        }
        if(action == 'details'){
          this.driver_resource(user.id)
        }
      },
      goToRoute(user){
        this.$router.push('/driver/details/'+user.id)
      },
      goToUpdate(user){
        this.$router.push('/driver/update/'+user.id)
      },
      tripHistory(user){
        this.$router.push('/driver/trip/history/'+user.id)
      },

      click_yes(){
        if (this.modalAction == 'ban') {
          Driver.ban_driver(this.driver.id).then((result) => {
              this.modals.mini = false
              this.api_refresh()
              Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: "Banned",
                  customClass: 'Swal-wide',
                  showConfirmButton: false,
                  timer: 3000
              })
          }).catch((err) => {
                Swal.fire({
                  position: 'top-end',
                  icon: 'error',
                  title: "Couldn't ban driver",
                  customClass: 'Swal-wide',
                  showConfirmButton: false,
                  timer: 3000
              })
          });
        }
        if(this.modalAction == 'unban'){
          Driver.unban_driver(this.driver.id).then((result) => {
              this.modals.mini = false
              this.api_refresh()
              Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: "Ban removed",
                  customClass: 'Swal-wide',
                  showConfirmButton: false,
                  timer: 3000
              })
          }).catch((err) => {
                Swal.fire({
                  position: 'top-end',
                  icon: 'error',
                  title: "Couldn't remove ban",
                  customClass: 'Swal-wide',
                  showConfirmButton: false,
                  timer: 3000
              })
          });
        }
        if(this.modalAction == 'activate'){
          Driver.activate_driver(this.driver.id).then((result) => {
              this.modals.mini = false
              this.api_refresh()
              Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: "Activated",
                  customClass: 'Swal-wide',
                  showConfirmButton: false,
                  timer: 3000
              })
          }).catch((err) => {
              Swal.fire({
                  position: 'top-end',
                  icon: 'error',
                  title: "Couldn't activate driver",
                  customClass: 'Swal-wide',
                  showConfirmButton: false,
                  timer: 3000
              })
          });
        }
         if(this.modalAction == 'deactivate'){
          Driver.deactivate_driver(this.driver.id).then((result) => {
              this.modals.mini = false
              this.api_refresh()
              Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: "Deactivated",
                  customClass: 'Swal-wide',
                  showConfirmButton: false,
                  timer: 3000
              })
          }).catch((err) => {
              Swal.fire({
                  position: 'top-end',
                  icon: 'error',
                  title: "Couldn't deactivate driver",
                  customClass: 'Swal-wide',
                  showConfirmButton: false,
                  timer: 3000
              })
          });
        }
      },

      driver_resource(driver){
        Driver.driver_resource(driver).then((result) => {
          this.driver = result.data.data
        }).catch((err) => {

        });
      },

      allUsers(){
        Dashboard.allUsers().then((result) => {
          var all_users = []
          var active_users = []
          var inactive_users = []
          var banned_users = []
          var vip_users = []

          for (let index = 0; index < result.data.data.length; index++) {
            if(result.data.data[index].account_type == 'driver'){
              all_users.push(result.data.data[index])
              if(result.data.data[index].is_active == 1){
                active_users.push(result.data.data[index])
              }else{
                inactive_users.push(result.data.data[index])
              }

              if(result.data.data[index].is_banned == 1 ){
                banned_users.push(result.data.data[index])
              }
              if(result.data.data[index].is_vip == 1){
                vip_users.push(result.data.data[index])
              }

            }


          }
            this.all_users = all_users
            this.active_users = active_users
            this.inactive_users = inactive_users
            this.banned_users = banned_users
            this.vip_users = vip_users
            this.tableKey++
            this.datatable()
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
    computed:{
      mini(){
        return this.modals.mini
      },
      classic(){
        return this.modals.classic
      }
    },
    watch:{
      classic(){
        if(this.modals.classic == false){
          this.driver = null
          this.assets = null
        }
      },
      mini(){
        if(this.modals.mini == false){
          this.driver = null
          this.assets = null
        }
      }
    },
    created(){
      this.allUsers()
    }

  }
</script>
