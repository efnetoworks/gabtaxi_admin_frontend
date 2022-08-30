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
              <td>{{ formatDate(details.dob) }}</td>
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
      <div class="col-4">
        <h4><b>Guarantor Details</b></h4>
        <table class="table">
          <thead>
            <tr>
              <td><b>Guarantor Name:</b></td>
              <td>{{ details.guarantor.name }}</td>
            </tr>
            <tr>
              <td><b>Address:</b></td>
              <td>{{ details.guarantor.address }}</td>
            </tr>
            <tr>
              <td><b>Guarantor Phone Number:</b></td>
              <td>{{ details.guarantor.phone }}</td>
            </tr>
            <tr>
              <td><b>Relationship:</b></td>
              <td>{{ details.guarantor.relationship }}</td>
            </tr>
          </thead>
        </table>
      </div>
      <div class="col-4">
        <h4><b>Wallet Details</b></h4>
        <table class="table">
          <thead>
            <tr>
              <td><b>Wallet Balance:</b></td>
              <td>{{ wallet.balance.toLocaleString() }}</td>
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
            <h2 class="card-text">{{completedTrips()}}</h2>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card text-center">
          <div class="card-body">
            <h4 class="card-title">Total Trips Cancelled</h4>
            <h2 class="card-text">{{cancelledTrips()}}</h2>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card text-center">
          <div class="card-body">
            <h4 class="card-title">Total Earnings</h4>
            <h2 class="card-text">{{ driverdata.earnings.toLocaleString() }}</h2>
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
import Driver from '@/javascript/Api/Driver';
  export default{
    data(){
      return {
        details:null,
        driverdata:null,
        wallet:null,
        transaction:null
      }
    },
    methods: {
      driver_resource(driver){
        Driver.driver_resource(driver).then((result) => {
          this.details = result.data.data
        })
        Driver.driver_data(driver).then((result) => {
          this.driverdata = result.data.data
        })
        Driver.user_wallet(driver).then((result) => {
          this.wallet = result.data.data
        })
        Driver.transaction_history(driver).then((result)=>{
          this.transaction = result.data.data
          this.datatable()
        })
      },
      getDetails(){
        this.driver_resource(this.$route.params.id)
      },
      completedTrips(){
        if(this.driverdata!= null && this.driverdata.trips != []){
          var completed = []
          this.driverdata.trips.forEach(element => {
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
      datatable(){
        $(function() {
          $('#table').DataTable({
            "bDestroy": true,
                pageLength: 5,
                lengthMenu: [[5,10,20], [5, 10, 20]],
            });
        });
      },
      cancelledTrips(){
        if(this.driverdata!= null && this.driverdata.trips != []){
          var cancelled = []
          this.driverdata.trips.forEach(element => {
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
