<template>
  <div>
    <h3>Zones</h3>
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
          <th>Name</th>
          <th>Area</th>
          <th>Status</th>
          <th>lga</th>
          <th>state</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody :key="tableKey">
        <tr v-for="(zone, index) in zones" :key="zone">
          <td>{{index+1}}</td>
          <td>{{ zone.name }}</td>
          <td>{{ zone.location.name }}</td>
          <td v-if="zone.deleted_at==null"
          style="color:green">Active </td>
          <td v-else style="color:red">Inactive</td>
          <td>{{ zone.location.lga }}</td>
          <td>{{ zone.location.state }}</td>
          <td v-if="zone.deleted_at == null">
            <p-button class="mr-2" type="danger" size="sm" icon @click.prevent="deactivate(zone)">
              <i class="fa fa-times"></i>
            </p-button>
          </td>
          <td v-if="zone.deleted_at != null">
            <p-button class="mr-2" type="warning" size="sm" icon @click.native="activate(zone)">
              <i class="fa fa-refresh" aria-hidden="true"></i>
            </p-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  import Zone from '@/javascript/Api/Zone'
  import Swal from 'sweetalert2'
export default{
    data() {
      return {
        zones:null,
        filter:1,
        tableKey:0
      }
    },
    methods: {
        filter_table(){
          if(this.filter == 1){
              this.getAll()
          }else if(this.filter == 2){
              this.getActive()
          }else{
              this.getInActive()
          }
        },
            getAll(){
                Zone.all_zones().then((result) => {
                    this.zones = result.data.data
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

            getActive(){
                Zone.active_zones().then((result) => {
                    this.zones = result.data.data
                    this.datatable()
                    this.tableKey++
                })
            },
            getInActive(){
                Zone.inactive_zones().then((result) => {
                    this.zones = result.data.data
                    this.datatable()
                    this.tableKey++
                })
            },
 activate(zone){

                Zone.activate_zone({'id':zone.id}).then((result) => {
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
                        icon: 'error',
                        title: err.response.data.message,
                        customClass: 'Swal-wide',
                        showConfirmButton: false,
                        timer: 3000
                    })
                });
            },

            deactivate(zone){

                Zone.deactivate_zone({'id':zone.id}).then((result) => {
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
                        icon: 'error',
                        title: err.response.data.message,
                        customClass: 'Swal-wide',
                        showConfirmButton: false,
                        timer: 3000
                    })
                });
            },
        api_refresh(){
          this.getAll()
          this.getActive()
          this.getInActive()
        },
    },
    created(){
      this.getActive()
    }

  }
</script>
