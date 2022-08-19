<template>
  <div>
    <h3>Service Types</h3>
     <div>
        <p-button class="btn btn-success" size="lg" type="success" icon @click.native="newServiceType()">
              <i class="fa fa-plus"></i>
        </p-button>
    </div>
    <div>

    </div>
    <table id="table" class="table table-striped">
      <thead>
        <tr>
          <th></th>
          <th>Type</th>
          <th>Service</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(type, index) in servicetypes" :key="type">
          <td>{{index+1}}</td>
          <!-- <th><img :src="admin.picture" alt="" height="50" width="70"></th> -->
          <td>{{type.types}}</td>
          <td>{{type.service.service_name}}</td>
          <td v-if="type.deleted_at == null">
            <p-button class="mr-2" type="danger" size="lg" icon @click.prevent="deactivate(type)">
              <i class="fa fa-times"></i>
            </p-button>
            <p-button class="mr-2" type="info" size="lg" icon @click.prevent="openModal(type)">
              <i class="fa fa-edit"></i>
            </p-button>
          </td>
          <!-- <td v-if="type.deleted_at != null">
            <p-button class="mr-2" type="warning" size="lg" icon @click.native="activate(location.id)">
              <i class="fa fa-refresh" aria-hidden="true"></i>
            </p-button>
          </td> -->
        </tr>
      </tbody>
    </table>
      <!-- update modal -->
      <modal :show.sync="modals.classic" headerClasses="justify-content-center">
                <h4 slot="header" class="title title-up" v-show="!updateMode">New Service Types</h4>
                <h4 slot="header" class="title title-up" v-show="updateMode">Update Service Types</h4>
                  <form @submit.prevent="save">
                    <div class="form-group">
                      <label for="" >
                          Service
                      </label>
                      <select v-model="form.serviceid" class="form-control">
                          <option value="null">Select</option>
                          <option v-for="service in allservices" :key="service" :value="service.id">
                              {{service.service_name}}
                          </option>
                      </select>
                  </div>
                     <div class="form-group">
                        <label for="" >
                            Type
                        </label>
                        <input type="text" class="form-control" placeholder="Service Type" v-model="form.types">
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
  import ServiceTypes from '@/javascript/Api/ServiceTypes'
  import Services from '@/javascript/Api/Services'
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
          types:null,
          serviceid:null,
        },
        allservices:null,
        servicetypes:null,
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
      newServiceType(){
        this.modals.classic = true
      },
      openModal(type){
        this.updateMode = true
        this.form.id = type.id
        this.form.types = type.types
        this.form.serviceid = type.serviceid
        this.modals.classic = true
      },
       save(){
              if(this.updateMode == false){
                ServiceTypes.create(this.form).then((result) => {
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
                  this.form.serviceid = null
                  this.form.types = null
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
            }else{
              ServiceTypes.update(this.form).then((result) => {
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
      services(){
          Services.allservices().then((result) => {
              this.allservices = result.data.data
          })
      },
      allservicetypes(){
        ServiceTypes.allservicetypes().then((result) => {
          this.servicetypes = result.data.data
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
      deactivate(servicetype){
                this.isLoading = true
                ServiceTypes.deactivate({id:servicetype.id}).then((result) => {
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

        api_refresh(){
          this.allservicetypes()
        },
    },
    watch:{
      id(){
        this.form.id == null ? this.updateMode = false : this.updateMode = true
      },
      classic(){
        if(this.modals.classic == false){
          this.form.id = null
          this.form.types = null
          this.form.serviceid = null
        }
      }
    },
    created(){
      this.allservicetypes()
       this.services()
    }

  }
</script>
