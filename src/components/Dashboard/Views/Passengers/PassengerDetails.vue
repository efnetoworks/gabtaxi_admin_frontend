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
              <td>{{ details.sex}}</td>
            </tr>
            <tr>
              <td><b>Date of Birth:</b></td>
              <td>{{ details.dob }}</td>
            </tr>
          </thead>
        </table>
      </div>
      <div class="col-4">
        <div style="height:150px; width:180px"></div>
        <h4><b>Contact Details</b></h4>
        <table class="table">
          <thead>
            <tr>
              <td><b>Phone:</b></td>
              <td>{{ details.phone }}</td>
            </tr>
            <tr>
              <td><b>Email Address:</b></td>
              <td>{{ details.email}}</td>
            </tr>
          </thead>
        </table>
      </div>
      <div class="col-4">
        <div style="height:150px; width:180px"></div>
        <h4><b>Gab Account Status</b></h4>
        <table class="table">
          <thead>
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
            <h4 class="card-title">Wallet Balance</h4>
            <h2 class="card-text">50</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Passenger from '@/javascript/Api/Passenger';
  export default{
    data(){
      return {
        details:null
      }
    },
    methods: {
      passenger_resource(passenger){
        Passenger.passenger_resource(passenger).then((result) => {
          this.details = result.data.data
        })
      },
      getDetails(){
        this.passenger_resource(this.$route.params.id)
      }
    },
    created(){
      this.getDetails()
    }
  }
</script>
