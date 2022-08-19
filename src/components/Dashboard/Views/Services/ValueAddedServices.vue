<template>
  <div>
    <h3>Value Added Services</h3>
     <div class="row">
        <center>
          <p-button class="btn btn-success " size="lg" type="success" icon @click.native="newService()">
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
          <th>Service Name</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(service, index) in services" :key="service">
          <td>{{index+1}}</td>
          <!-- <th><img :src="admin.picture" alt="" height="50" width="70"></th> -->
          <td>{{service.service_name}}</td>
          <td>{{service.description}}</td>
          <td v-if="service.deleted_at == null">
            <p-button class="mr-2" type="danger" size="lg" icon @click.prevent="deactivate(service)">
              <i class="fa fa-times"></i>
            </p-button>
            <p-button class="mr-2" type="info" size="lg" icon @click.prevent="openModal(service)">
              <i class="fa fa-edit"></i>
            </p-button>
          </td>
          <td v-if="service.deleted_at != null">
            <p-button class="mr-2" type="warning" size="lg" icon @click.native="activate(service)">
              <i class="fa fa-refresh" aria-hidden="true"></i>
            </p-button>
          </td>
        </tr>
      </tbody>
    </table>
      <!-- update modal -->
      <modal :show.sync="modals.classic" headerClasses="justify-content-center">
                <h4 slot="header" class="title title-up" v-show="updateMode">Update V.A.S</h4>
                <h4 slot="header" class="title title-up" v-show="!updateMode">New V.A.S</h4>
                  <form @submit.prevent="save">
                    <div class="form-group">
                        <label for="" >Service Name</label>
                        <input type="text" class="form-control" placeholder="Service Name" v-model="form.service_name" required>
                    </div>
                    <div class="form-group">
                      <label for="">Description</label>
                      <textarea class="form-control" name="" id="" cols="30" rows="10" v-model="form.description"></textarea>
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
          service_name:null,
          description:null,
        },
        services:null,
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
      newService(){
        this.modals.classic = true
      },
      openModal(service){
        this.updateMode = true
        this.form.id = service.id
        this.form.service_name = service.service_name
        this.form.description = service.description
        this.modals.classic = true
      },
     allservices(){
        Services.allservices().then((result) => {
            this.services = result.data.data
            this.datatable()
        })
    },

            activate(service){
                this.isLoading = true
                Services.activate({id:service.id}).then((result) => {
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
            deactivate(service){
                Services.deactivate({id:service.id}).then((result) => {
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
                Services.create(this.form).then((result) => {
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
                  this.form.service_name = null
                  this.form.description = null
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
              Services.update(this.form).then((result) => {
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
              this.allservices()
            }
    },
    watch:{
      id(){
        this.form.id == null ? this.updateMode = false : this.updateMode = true
      },
      classic(){
        if(this.modals.classic == false){
          this.form.id = null
          this.form.description = null
          this.form.service_name = null
        }
      }
    },
    created(){
      this.allservices()
    }

  }
</script>
