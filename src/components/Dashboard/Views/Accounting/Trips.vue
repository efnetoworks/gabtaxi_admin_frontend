<template>
  <div>
    <h3>Trips</h3>
     <div class="row">
        <div class="col-6">
          Filter
          <select v-model="filter" @change="filterTable" class="form-control col-4">
              <option :value=null>Select Filter</option>
              <option value="accepted">Accepted</option>
              <option value="arrived">Arrived</option>
              <option value="inprogress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <!-- <option value="periodic">Periodic Filter</option> -->
          </select><br />
          <div>
              <label for="">Start Date</label>
              <input class="form-control col-4" type="date" v-model="startdate">
              <label for="">End Date</label>
              <input class="form-control col-4"  type="date" v-model="enddate">
          </div>
        </div>
        <div class="col-6" v-if="filter != null">
          <h3>Mini Report for {{filter}} trips</h3>
            <div class="lead"><strong>Total Amount Generated is
            <b>{{getTotalAmount()}}</b></strong></div>

        </div>
    </div><br />
    <table id="table" class="table table-striped">
      <thead>
        <tr>
          <th></th>
          <th>Trip ID</th>
          <th>Driver Name</th>
          <th>Passenger Name</th>
          <th>Pickup Location</th>
          <th>Destination</th>
          <th>Trip Amount</th>
          <th>Time in mins</th>
          <th>Trip Status</th>
          <th>Date</th>
          <th>Start Time</th>
          <th>End Time</th>
        </tr>
      </thead>
      <tbody :key="tableKey">
        <tr  v-for="(trip, index) in filtered" :key="trip" >
          <td>{{index+1}}</td>
          <td>{{trip.id}}</td>
          <td>{{trip.driver.fullname}}</td>
          <td>{{trip.user.fullname}}</td>
          <td>{{trip.start_address}}</td>
          <td>{{trip.end_address}}</td>
          <td>{{trip.amount}}</td>
          <td>{{trip.minute}}</td>
          <td>{{trip.status}}</td>
          <td>{{ getDate(trip.created_at)}}</td>
          <td>{{ timeOnly(trip.created_at)}}</td>
          <td>{{ timeOnly(trip.updated_at)}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  import Trip from '@/javascript/Api/Trip'
  export default{
    data() {
      return {
        zones:null,
        alltrips:null,
        filter:null,
        tableKey:0,
        filtered:[],
        startdate:null,
        enddate:null
      }
    },
    methods: {
      filterTable(){
        if(this.startdate == null && this.enddate == null){
            this.filtered = []
            this.alltrips.forEach(element => {
                if(element.status == this.filter){
                    this.filtered.push(element)
                    this.tableKey++
                    this.datatable()
                }
            });
        }else{
            if(this.startdate != null && this.enddate != null){
                this.filtered = []
                this.alltrips.forEach(element => {

                    if(element.status == this.filter && helpers.toEpochTime(helpers.dateOnly(element.created_at)) >= helpers.toEpochTime(this.startdate) && helpers.toEpochTime(helpers.dateOnly(element.created_at)) <= helpers.toEpochTime(this.enddate)){
                        this.filtered.push(element)
                        this.tableKey++
                        this.datatable()
                }
                });
            }
        }
      },

      getTotalAmount(){
        var amounts = []
        this.filtered.forEach(element => {
            amounts.push(element.amount)
        });
        return amounts.reduce(this.getSum, 0).toLocaleString()
      },

      getSum(total, num){
          return total + num
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
      getDate(date){
        return helpers.dateOnly(date)
      },
      timeOnly(date){
        return helpers.formatTime(date)
      },

      allTrips(){
        Trip.alltrips().then((res) => {
          this.alltrips = res.data.data.data
          this.filtered = res.data.data.data
          this.datatable()
        })
      },
    },

    watch:{
      startdate(){
        this.filterTable()
        console.log('start filtered')
      },


      enddate(){
        this.filterTable()
        console.log('start filtered')
      }
    },

    created(){
      this.allTrips()
    }

  }
</script>
