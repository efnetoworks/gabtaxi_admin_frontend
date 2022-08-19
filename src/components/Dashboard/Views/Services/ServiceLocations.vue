<template>
  <div>
    <h3>Service Locations</h3>
     <div>
     <center>
        <label class="mr-2">Filter Table </label>
        <select @change="filter_table()" v-model="filter">
            <option value="1">All Locations</option>
            <option value="2">Active Locations</option>
            <option value="3">Inactive Locations</option>
        </select>
        <p-button class="btn btn-success ml-5" size="lg" type="success" icon @click.native="openModal()">
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
          <th>Location Name</th>
          <th>Country</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody :key="tableKey">
        <tr v-for="(location, index) in locations" :key="location">
          <td>{{index+1}}</td>
          <!-- <th><img :src="admin.picture" alt="" height="50" width="70"></th> -->
          <td>{{location.name}}</td>
          <td>{{location.country.name }}</td>
          <td v-if="location.deleted_at == null">
            <p-button class="mr-2" type="danger" size="lg" icon @click.prevent="deactivate(location.id)">
              <i class="fa fa-times"></i>
            </p-button>
          </td>
          <td v-if="location.deleted_at != null">
            <p-button class="mr-2" type="warning" size="lg" icon @click.native="activate(location.id)">
              <i class="fa fa-refresh" aria-hidden="true"></i>
            </p-button>
          </td>
        </tr>
      </tbody>
    </table>
      <!-- update modal -->
      <modal :show.sync="modals.classic" headerClasses="justify-content-center">
                <h4 slot="header" class="title title-up">New Location</h4>
                  <form @submit.prevent="save">
                    <div class="form-group">
                        <label for="" >Country</label>
                        <select class="form-control" v-model="form.country_id">
                          <option value="null">
                            Select Country
                          </option>
                          <option v-for="country in countries" :key="country" :value="country.id">
                            {{country.name}}
                          </option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="" >Location Name</label>
                        <input type="text" class="form-control" placeholder="Location Name" v-model="form.name" required>
                    </div>

                      <button type="submit" class="btn btn-success col-12">Submit</button>
                  </form>
                <template slot="footer">
                  <p-button type="default" link @click.prevent="modals.classic = false">Close</p-button>
                </template>
      </modal>
  </div>
</template>
<script>
  import { Modal } from '@/components/UIComponents'
  import Locations from '@/javascript/Api/ServiceLocations'
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
        tableKey:0,
        form:{
          id:null,
          name:null,
          country_id:"null",
        },
        countries:null,
        modals: {
          classic: false,
          notice: false,
          mini: false
        },
      }
    },
    methods: {
      openModal(){
        this.modals.classic = true
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
      save(){
        Locations.create(this.form).then((result) => {
          Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: result.data.message,
              customClass: 'Swal-wide',
              showConfirmButton: false,
              timer: 3000
          })
          this.api_refresh()
          this.form.name = null
          this.form.country_id = null
        }).catch((err) => {
          this.isLoading = false
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
      all_locations(){
          Locations.all_locations().then((result) => {
              this.locations = result.data.data
              this.tableKey++
              this.datatable()
          });
        },
            allCountries(){
                Locations.countries().then((result) => {
                    this.countries = result.data.data
                })
            },

           filter_table(){
                if(this.filter == 1){
                    this.all_locations()
                }else if(this.filter == 2){
                    this.activeLocations()
                }else{
                    this.inactiveLocations()
                }
            },
            activate(location){
                Locations.activate({'id':location}).then((result) => {
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
            deactivate(location){
                Locations.deactivate({'id':location}).then((result) => {
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
          this.all_locations()
        },
    },
    created(){
      this.all_locations()
       this.allCountries()
    }

  }
</script>
