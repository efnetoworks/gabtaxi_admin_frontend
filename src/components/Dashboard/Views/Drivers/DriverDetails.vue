<template>
  <div>
    <div class="row">
      <div class="col-4">
        <img :src="details.picture" alt="" width="180px" height="150px">
        <h4><b>Personal Details</b></h4>
        <table class="table">
          <thead>
            <tr>
              <td><b>Name:</b></td>
              <td>{{ details.fullname }}</td>
            </tr>
            <tr>
              <td><b>Gender:</b></td>
              <td>{{ details.gender}}</td>
            </tr>
            <tr>
              <td><b>Date of Birth:</b></td>
              <td>{{ details.dob }}</td>
            </tr>
             <tr>
              <td><b>Active Status:</b></td>
              <td v-if="details.is_active == 1">Active</td>
              <td v-if="details.is_active == 0">In-Active</td>
            </tr>
            <tr v-if="details.is_banned == 1">
              <td><b>Ban Status</b></td>
              <td>Banned</td>
            </tr>
            <tr v-if="details.is_banned == 1">
              <td><b>Ban Start Date</b></td>
              <td>{{ details.ban_start_date }}</td>
            </tr>
            <tr v-if="details.is_banned == 1">
              <td><b>Ban End Date</b></td>
              <td>{{ details.ban_end_date }}</td>
            </tr>
          </thead>
        </table>
      </div>
      <div class="col-4">
        <div  style="height:150px; width:180px; "></div>
        <h4><b>Vehicle Details</b></h4>
        <table class="table">
          <thead>
            <tr>
              <td><b>Vehicle Manufacturer:</b></td>
              <td>{{ details.vehicle.vehicle_manufacturer.name }}</td>
            </tr>
            <tr>
              <td><b>Vehicle Model:</b></td>
              <td>{{ details.vehicle.vehicle_model.name }} </td>
            </tr>
            <tr>
              <td><b>Vehicle Color:</b></td>
              <td>{{ details.vehicle.color }}</td>
            </tr>
             <tr>
              <td><b>Licence Plate Number:</b></td>
              <td>{{ details.vehicle.plate_number }}</td>
            </tr>
          </thead>
        </table>
      </div>
      <div class="col-4">
      <div  style="height:150px; width:180px; "></div>
        <h4><b>Bank Details</b></h4>
        <table class="table">
          <thead>
            <tr>
              <td><b>Account Name:</b></td>
              <td>{{ details.bank[0].account_name }}</td>
            </tr>
            <tr>
              <td><b>Bank Name:</b></td>
              <td>{{ details.bank[0].bank }}</td>
            </tr>
            <tr>
              <td><b>Account Number:</b></td>
              <td>{{ details.bank[0].account_number }}</td>
            </tr>
          </thead>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <div class="card text-center">
          <div class="card-body">
            <h4 class="card-title">Total Trips Completed</h4>
            <h2 class="card-text">50</h2>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card text-center">
          <div class="card-body">
            <h4 class="card-title">Total Trips Cancelled</h4>
            <h2 class="card-text">50</h2>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card text-center">
          <div class="card-body">
            <h4 class="card-title">Total Earnings</h4>
            <h2 class="card-text">50</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Driver from '@/javascript/Api/Driver';
  export default{
    data(){
      return {
        details:null
      }
    },
    methods: {
      driver_resource(driver){
        Driver.driver_resource(driver).then((result) => {
          this.details = result.data.data
        })
      },
      getDetails(){
        this.driver_resource(this.$route.params.id)
      }
    },
    created(){
      this.getDetails()
    }
  }
</script>
