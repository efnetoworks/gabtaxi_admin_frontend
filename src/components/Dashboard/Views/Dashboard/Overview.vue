<template>
  <div>
    <!--Stats cards-->
    <center><h1>Daily Summary</h1></center>
    <div class="row">
      <div class="col-lg-3 col-md-6 col-sm-6" v-for="stats in statsCards" :key="stats">
        <stats-card :type="stats.type"
                    :icon="stats.icon"
                    :small-title="stats.title"
                    :title="stats.value">
          <div class="stats" slot="footer">
            <i :class="stats.footerIcon"></i>
            {{stats.footerText}} {{stats.footerTextCount}}
          </div>
        </stats-card>
      </div>
    </div>
 <div class="row">
      <div class="col-lg-3 col-sm-6">
        <card>
          <div slot="header" class="card-text">
            <center><h4 class="card-title">Trips Completed Today</h4></center>
                <center>
                  <i class='fa fa-car fa-4x'></i>
                   <h1>{{completedTrips}}</h1>
                </center>
          </div>

        </card>
      </div>

      <div class="col-lg-3 col-sm-6">
        <card>
          <div slot="header" class="card-text">
            <center><h4 class="card-title">Trips CancelledToday</h4></center>
               <center>
                  <span class='fa-stack fa-2x'>
                      <i class='fa fa-car fa-stack-1x'></i>
                      <i class='fa fa-ban fa-stack-2x'></i>
                  </span>
                  <h1>{{ cancelledTrips }}</h1>
              </center>
          </div>
        </card>
      </div>
            <div class="col-lg-3 col-sm-6">
        <card>
          <div slot="header" class="card-text">
            <center><h4 class="card-title"><i class='fa fa-car fa-1x'></i>Driver Most Trips <i class='fa fa-check fa-1x'></i></h4></center>
               <table class="table">
                <tr>
                  <th>name</th>
                  <td>{{dashboardData['name']}}</td>
                </tr>
                <tr>
                  <th>trip count</th>
                  <td>{{dashboardData['trip_completed']}}</td>
                </tr>
                <tr>
                  <th>average rating</th>
                  <td>{{dashboardData['averageRating']}}</td>
                </tr>
               </table>
          </div>
        </card>
      </div>
            <div class="col-lg-3 col-sm-6">
        <card>
          <div slot="header" class="card-text">
            <center><h4 class="card-title">
            <span class='fa-stack'>
                      <i class='fa fa-car fa-stack-1x'></i>
                      <i class='fa fa-ban fa-stack-2x'></i>
                  </span>Driver Most Cancelled<i class='fa fa-times fa-1x'></i></h4></center>
               <table class="table">
                <tr>
                  <th>name</th>
                  <td>{{dashboardCancelled['name']}}</td>
                </tr>
                <tr>
                  <th>trip count</th>
                  <td>{{dashboardCancelled['trip_cancelled']}}</td>
                </tr>
                <tr>
                  <th></th>
                  <td></td>
                </tr>

               </table>
          </div>
        </card>
      </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-header">
            </div>
            <div class="card-body">
                <div class="col-md-7">
                  <world-map></world-map>
                </div>
            </div>
          </div>
        </div>
    </div>





  </div>
</template>
<script>
  import CircleChartCard from '@/components/UIComponents/Cards/CircleChartCard.vue'
  import ChartCard from '@/components/UIComponents/Cards/ChartCard';
  import StatsCard from '@/components/UIComponents/Cards/StatsCard';
  import Card from '@/components/UIComponents/Cards/Card';
  import {Badge} from '@/components/UIComponents'
  import Loading from '@/components/Dashboard/Layout/LoadingMainPanel.vue'
  import TaskList from './Widgets/TaskList'
  import Dashboard from '@/javascript/Api/Dashboard'
  import db from '@/fbdb/dataservice'
  const WorldMap = () => ({
    component: import('./../Maps/FullScreenMap.vue'),
    loading: Loading,
    delay: 200
  })

  export default {
    components: {
      StatsCard,
      ChartCard,
      CircleChartCard,
      WorldMap,
      Badge,
      TaskList,
      Card
    },
    /**
     * Chart data used to render stats, charts. Should be replaced with server data
     */
    data () {
      return {
        user:[],
        all:null,
        completedTrips:null,
        cancelledTrips:null,
				dashboardData:[],
				cancelledData:[],
				dashboardCancelled:[],
				onlineDrivers:0,
				driversData:null,
				driversOnTrip:0,
				spanKey:0,
        statsCards: [
          {
            type: 'dark',
            icon: 'fa fa-list',
            title: 'New Drivers',
            value: '0',
            footerText:'All Drivers',
            footerTextCount: '0',
          },
          {
            type: 'dark',
            icon: 'fa fa-check',
            title: 'New Users',
            value: '0',
            footerText: 'All Passengers',
            footerTextCount: '0',
          },
          {
            type: 'dark',
            icon: 'fa fa-hourglass',
            title: 'Online Drivers',
            value: '0',
            footerText: 'Realtime Update',
          },
          {
            type: 'dark',
            icon: 'fa fa-exchange',
            title: 'Drivers on Trip',
            value: '0',
            footerText: 'Realtime Update',
          },
        ],

      }
    },
    methods: {
      completedtrips(){
                Dashboard.completedTrips().then((result) => {
                    this.statsCards[0].value = result.data.data.data
                    this.completedTrips = result.data.data.data
                })
            },

            cancelledtrips(){
                Dashboard.cancelledTrips().then((result) => {
                    this.statsCards[1].value = result.data.data.data
                    this.cancelledTrips = result.data.data.data
                })
            },

			driverDataCompleted(){
				Dashboard.drivercompletedtrips().then((result) => {
					this.dashboardData = result.data.data
				})
			},

			driverDataCancelled(){
				Dashboard.drivercancelledtrips().then((result) => {
					this.dashboardCancelled = result.data.data
				})
			},

			details(){
				this.$router.push('/details')
			},

      allusers(){
        Dashboard.allUsers().then((result) => {
          var res = []
          var all_drivers = []
          var all_users = []

          this.all = result.data.data

          res.push(result.data.data)
          res[0].forEach(element => {
            if(element.account_type =='driver'){
              all_drivers.push(element)
            }
            if(element.account_type =='passenger'){
              all_users.push(element)
            }
          })

          this.statsCards[0].footerTextCount = all_drivers.length
          this.statsCards[1].footerTextCount = all_users.length


          // this.statsCards.footerTextCount
        })
      },
			onDataChange(items){
				let _onlineDrivers = [];
				let currDate = new Date().getTime()

				items.forEach((item) => {
					let key = item.key;
					let data = item.val();
					_onlineDrivers.push({
						key:key,
						data:data
					});
				});

				var availDrivers = []
				_onlineDrivers.forEach((element) => {
					var timeDiff = currDate - element.data['timeStamp']
					if(timeDiff/1000  < 120 && element.data['status'] == 'online'  ){
						availDrivers.push(element)
					}
				})

				this.statsCards[2].value = availDrivers.length;
				this.spanKey++
				this.driversData = availDrivers
				// get drivers on trip
				var driversOnTrip = []
				this.driversData.forEach(driver => {
						if(driver.data.status == 'onTrip'){
							driversOnTrip.push(driver)
						}
					})
				this.statsCards[3].value = driversOnTrip.length
			},

			onlinedrivers(){
				db.getAll().on("value", this.onDataChange)
			},
    },
    created(){
      this.completedtrips()
      this.cancelledtrips()
			this.driverDataCompleted()
			this.driverDataCancelled()
			this.onlinedrivers()
      this.allusers()
    }
  }

</script>
<style>

</style>
