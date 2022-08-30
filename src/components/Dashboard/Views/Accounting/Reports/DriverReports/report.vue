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
            <p-button class="mr-2" type="blue" size="sm" icon @click.prevent="tripHistory(user)" title="trip history">
              <i class="fa fa-car"></i>
            </p-button>
          </td>
        </tr>
      </tbody>
    </table>

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
      goToRoute(user){
        this.$router.push('/driver/details/'+user.id)
      },
      goToUpdate(user){
        this.$router.push('/driver/update/'+user.id)
      },
      tripHistory(user){
        this.$router.push('/driver/trip/history/'+user.id)
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
                }else if(this.filter == 2){
                    this.all_users = this.active_users
                }else if(this.filter == 3){
                    this.all_users = this.inactive_users
                } else if(this.filter == 4){
                  this.all_users = this.banned_users
                } else{
                   this.all_users = this.vip_users
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
