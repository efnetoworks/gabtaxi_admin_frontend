<template>
  <div>
    <h3>Driver Trip History</h3>
     <div>
        <center>
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
        </center>
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
          <th>Estimated Price</th>
          <th>Estimated Time</th>
          <th>Trip Status</th>
          <th>Start Time</th>
          <th>End Time</th>
        </tr>
      </thead>
      <tbody>
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
          <td>{{trip.created_at}}</td>
          <td>{{trip.updated_at}}</td>
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
                this.alltrips.forEach(element => {
                    this.filtered = []
                    if(element.status == this.filter && element.created_at >= this.startdate && element.created_at <= this.enddate){
                        if(element.status == this.filter){
                        this.filtered.push(element)
                        this.tableKey++
                        this.datatable()
                    }
                }
                });
            }else{
                //
            }
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
      allTrips(){
        Trip.alltrips().then((res) => {
          var data = res.data.data.data
          for (let index = 0; index < data.length; index++) {
            if(data[index].driver_id == this.$route.params.id){
              this.alltrips = data
              this.filtered = data
              this.datatable()
            }

          }

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
