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
              <td>{{ formatDate(details.dob) }}</td>
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
            <h2 class="card-text">{{ completedTrips() }}</h2>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card text-center">
          <div class="card-body">
            <h4 class="card-title">Total Trips Cancelled</h4>
            <h2 class="card-text">{{ cancelledTrips() }}</h2>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card text-center">
          <div class="card-body">
            <h4 class="card-title">Wallet Balance</h4>
            <h2 class="card-text">{{wallet.balance.toLocaleString()}}</h2>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-10">
        <h4><b>Transaction History</b></h4>
        <table id="table" class="table table-bordered">
          <thead class="thead thead-dark">
             <tr>
                <th></th>
                <th>Transaction Type</th>
                <th>Payment Method</th>
                <th>Transaction Amount</th>
                <th>Transaction Reference</th>
                <th>Description</th>
                <th>Transaction Date</th>
             </tr>
          </thead>
          <tbody>
           <tr v-for="(transaction, index) in transaction" :key="transaction">
            <td>{{index+1}}</td>
            <td>{{transaction.type.name}}</td>
            <td>{{transaction.paymentMethod}}</td>
            <td>{{transaction.amount.toLocaleString()}}</td>
            <td>{{transaction.reference}}</td>
            <td>{{transaction.description}}</td>
            <td>{{formatDate(transaction.created_at)}}</td>
           </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Passenger from '@/javascript/Api/Passenger';
  export default{
    data(){
      return {
        details:null,
        passengerdata:null,
        wallet:null,
        transaction:null
      }
    },
    methods: {
      passenger_resource(passenger){
        Passenger.passenger_resource(passenger).then((result) => {
          this.details = result.data.data
        })

        Passenger.passenger_data(passenger).then((result) => {
          this.passengerdata = result.data.data
        })

        Passenger.user_wallet(passenger).then(result => {
          this.wallet = result.data.data
        })

        Passenger.transaction_history(passenger).then((result)=>{
          this.transaction = result.data.data
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
      getDetails(){
        this.passenger_resource(this.$route.params.id)
      },
      completedTrips(){
        if(this.passengerdata!= null && this.passengerdata.trips != []){
          var completed = []
          this.passengerdata.trips.forEach(element => {
            if(element.status == 'completed'){
              completed.push(element)
            }
          });
          return completed.length.toLocaleString()
        }else{
          return 0
        }
      },
      formatDate(date){
        return helpers.dateOnly(date)
      },
      cancelledTrips(){
        if(this.passengerdata!= null && this.passengerdata.trips != []){
          var cancelled = []
          this.passengerdata.trips.forEach(element => {
            if(element.status == 'cancelled'){
              cancelled.push(element)
            }
          });
          return cancelled.length.toLocaleString()
        }else{
          return 0;
        }
        }
    },

    created(){
      this.getDetails()
    }
  }
</script>
