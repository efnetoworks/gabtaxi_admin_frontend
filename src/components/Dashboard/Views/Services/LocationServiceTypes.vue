<template>
  <div>
    <h3>Location Service Types</h3>
     <div class="row">
        <p-button class="btn btn-success " size="lg" type="success" icon @click.native="newForm()">
              <i class="fa fa-plus"></i>
        </p-button>
    </div>
    <div>

    </div>
    <table id="table" class="table table-striped">
      <thead>
        <tr>
          <th></th>
          <th>Service Type</th>
          <th>Category</th>
          <th>Geo Zone</th>
          <th>Price/Km</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(type, index) in locationservices" :key="type">
          <td>{{index+1}}</td>
          <td>{{type.service_type.types}}</td>
          <td>{{type.service_category.category}}</td>
          <td>{{type.service_location.name}}</td>
          <td>{{type.price_per_km}}</td>
          <td v-if="type.deleted_at == null">
              <p-button class="mr-2" type="danger" size="lg" icon @click.prevent="deactivate(type)">
                <i class="fa fa-times"></i>
              </p-button>
              <p-button class="mr-2" type="info" size="lg" icon @click.prevent="openModal(type)">
                <i class="fa fa-edit"></i>
              </p-button>
          </td>
        </tr>
      </tbody>
    </table>
      <!-- update modal -->
      <modal :show.sync="modals.classic" headerClasses="justify-content-center">
                <h4 slot="header" class="title title-up" v-show="updateMode">Update L.S.T</h4>
                <h4 slot="header" class="title title-up" v-show="!updateMode">New L.S.T</h4>
          <form @submit.prevent="save">
            <div class="form-group">
                <label for="" >
                    Service Type
                </label>
                <select v-model="form.service_type_id" class="form-control" required>
                    <option value="null">Select</option>
                    <option v-for="type in servicetypes" :key="type" :value="type.id">
                        {{type.types}}
                    </option>
                </select>
            </div>

            <div class="form-group">
                <label for="" >
                    Service Category
                </label>
                <select v-model="form.service_category_id" class="form-control" required>
                    <option value="null">Select</option>
                    <option v-for="category in categories" :key="category" :value="category.id">
                        {{category.category}}
                    </option>
                </select>
            </div>

            <div class="form-group">
                <label for="" >
                    Zone
                </label>
                <select @change="getCurrency" v-model="form.service_location_id" class="form-control" required>
                    <option value="null">Select</option>
                    <option v-for="zone in zones" :key="zone" :value="zone.id">
                        {{zone.name}}
                    </option>
                </select>
            </div>

            <div class="form-group">
                <label for="" >
                    Price/Km {{ currency }} <small>per km</small>
                </label>
                <input v-model="form.price_per_km"  class="form-control" required type="number" step="any" placeholder="0.00">
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
  import LocationType from '@/javascript/Api/LocationService'
  import ServiceType from '@/javascript/Api/ServiceTypes'
  import Category from '@/javascript/Api/Category'
  import Zone from '@/javascript/Api/Zone'

  import Swal from 'sweetalert2'
  export default{
     components: {
      Modal
    },
    data() {
      return {
        updateMode:false,
        locationservices:null,
        filter:1,
        form:{
          id: null,
          service_type_id: null,
          service_category_id: null,
          service_location_id: null,
          price_per_km: null,
        },
        servicetypes:null,
        categories:null,
        zones:null,
        countries:[],
        currency:null,
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
      newForm(){
        this.modals.classic = true
      },
      openModal(type){
        this.updateMode = true
        this.form.id = type.id
        this.form.service_type_id = type.service_type_id
        this.form.service_category_id = type.service_category_id
        this.form.service_location_id = type.service_location_id
        this.form.price_per_km = type.price_per_km
        this.modals.classic = true




      },
      alllocationservices(){
          LocationType.getAll().then((result) => {
              this.locationservices = result.data.data
              this.datatable()
          })
      },

      deactivate(type){
        LocationType.deactivate({id:type.id}).then((result) => {
          this.api_refresh()
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

      getCurrency(){
        this.countries.forEach(element => {
          if(this.selectedZone.location.country_id == element.id){
            this.currency = element.currency_symbol
            this.form.service_location_id = this.selectedZone.id
          }
        })
      },

            save(){
              if(this.updateMode == false){
                    LocationType.create(this.form).then((result) => {
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
                        title: err.response.data.message,
                        customClass: 'Swal-wide',
                        showConfirmButton: false,
                        timer: 3000
                      })
                  });
            }else{
             LocationType.update(this.form).then((result) => {
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
            fetch_Apis(){
              ServiceType.allservicetypes().then((result) => {
                this.servicetypes = result.data.data
              })

              Category.allcategories().then((result) => {
                this.categories = result.data.data
              })

              Zone.active_zones().then((result) => {
                this.zones = result.data.data
              })

              LocationType.countries().then((result)=> {
                this.countries = result.data.data
              })
            },
            api_refresh(){
              this.alllocationservices()
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
          this.form.service_type_id = null
          this.form.service_category_id = null
          this.form.service_location_id = null
          this.form.price_per_km = null
        }
      }
    },
    created(){
      this.alllocationservices()
      this.fetch_Apis()
    }

  }
</script>
