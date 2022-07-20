<template>
    <div>
        <nav-bar />
        <div class="main">
            <p class="welcome">
                Welcome, {{ user.fullname }}
            </p>        
            <TransitionGroup name="content">
		<div class="cardBoxRegInfo">
			<div class="card">
				<div >
					<div class="numbers">{{completedTrips}} 
						<span>new drivers</span>
					</div><br /> 
					<p><span>all drivers </span><b>{{completedTrips}}</b></p>
				</div>							
			</div>
			<div class="card">
				<div >
					<div class="numbers">{{completedTrips}} 
						<span>new users</span>
					</div><br /> 
					<p><span>all users </span><b>{{completedTrips}}</b></p>										
				</div>							
			</div>
			<div class="card">
				<div style="width:60%">
					<div class="numbers">{{onlineDrivers}} <br /> 
						<span>online drivers </span>						
					</div>										
				</div>
				<div style="width:30%">
					<i style="font-size:50px; padding:15%" class="activeText fa fa-taxi"></i>
				</div>							
			</div>
			<div class="card">
			<div style="width:60%">
					<div class="numbers">{{driversOnTrip}} <br /> 
						<span>drivers on trip </span>
					</div>										
				</div>
				<div style="width:30%">
					<i style="font-size:50px; padding:15%; color:yellowgreen" class="fa fa-taxi"></i>
				</div>								
			</div>
		</div>
        <div class="cardBox">
			<div class="card">
				<div style="width:60%">
					<div class="numbers">{{completedTrips}} </div>
						<div class="cardName"> 
							number of trips completed today
							<i class="fas fa-check" style="color:green; font-weight:bold"></i>
						</div>					
						<button style="margin-top:10%" >view more</button>								
				</div>
				<div style="width:30%;">
					<center>
						<i class="iconleft  fa fa-taxi"></i>
					</center>
				</div>				
			
			</div>
			<div class="card">
				<div>
					<div class="numbers">{{cancelledTrips}}</div>
					<div class="cardName">
						number of cancelled trips today
						<i class="fas fa-times" style="color:red; font-weight:bold"></i>
					</div>
					<button style="margin-top:10%" >view more</button>
				</div>
				<div style="width:30%;">
					<center>
						<i class="iconleft activeText fa fa-taxi"></i>
					</center>
				</div>	
			</div>

			<div class="card">
				<div style="width:70%;">
					<label class="cardText" style="margin-right:2%">
						driver name:
					</label>
					<label class="driverData">{{dashboardData['name']}}</label>					
					<br />
					<label class="cardText">
						completed trips:
					</label>
					<label class="driverData">{{dashboardData['trip_completed']}}</label>	
					<br />
					<label class="cardText">
						average rating:
					</label>
					<label class="driverData">{{dashboardData['averageRating']}}</label>	
					<br />	<br />	<br />	<br />	
					<label class="cardText" style="color:black">
						<small><i>ranks as driver with most completed trips</i></small> 
					</label>					
					
				</div>
				<div class="iconBoxImage">
				 <img :src="dashboardData['image']" alt="">											
				</div>
			</div>

			<div class="card">			
				<div style="width:70%;">
					<label class="cardText" style="margin-right:2%">
						driver name:
					</label>
					<label class="driverData">{{dashboardCancelled['name']}}</label>					
					<br />
					<label class="cardText">
						 cancelled trips:
					</label>
					<label class="driverData">{{dashboardCancelled['trip_cancelled']}}</label>	
					<br />	<br />	<br />	<br />	<br />	<br />
					<label class="cardText" style="color:black">
						<small><i>ranks as driver with most cancelled trips</i></small> 
					</label>			
					
				</div>
				<div class="iconBoxImage">
				 <img :src="dashboardCancelled['image']" alt="">											
				</div>
			</div>			
		</div>
		<div style="width:100%; padding:20px">
			<Map />
		</div>
	
	</TransitionGroup>
        </div>
    </div>
</template>

<script>
import User from '@/Apis/User';
import Dashboard from '@/Apis/Dashboard'
import NavBar from '../../NavBar.vue'
import db from '@/fbdb/dataservice'
import Map from './Map'

export default{
        components:{NavBar, Map},
        data() {
            return {
                user:[],
                completedTrips:null,
                cancelledTrips:null,
				dashboardData:[],
				cancelledData:[],
				dashboardCancelled:[],
				onlineDrivers:0,
				driversData:null,
				driversOnTrip:0			
            }
        },

        methods: {
            toggleMenu(){
                let toggle = document.querySelector('.toggle');            
                let navigation = document.querySelector('.navigation')
                let main = document.querySelector('.main')            
                navigation.classList.toggle('active')
                toggle.classList.toggle('active')
                main.classList.toggle('active')			
		    },

            completedtrips(){
                Dashboard.completedTrips().then((result) => {
                    this.completedTrips = result.data.data.data
                })
            },

            cancelledtrips(){
                Dashboard.cancelledTrips().then((result) => {
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
			onDataChange(items){
				let _onlineDrivers = [];
				items.forEach((item) => {
					let key = item.key;
					let data = item.val();
					_onlineDrivers.push({
						key:key,
						data:data
					});
				});
				this.onlineDrivers = _onlineDrivers.length;
				this.driversData = _onlineDrivers
				// get drivers on trip
				var driversOnTrip = []
				this.driversData.forEach(driver => {
						if(driver.data.status == 'onTrip'){							
							driversOnTrip.push(driver)
						}
					})
				this.driversOnTrip = driversOnTrip.length
			},

			onlinedrivers(){
				db.getAll().on("value", this.onDataChange)
			},

            getAuth(){
                User.auth().then((result)=>{
                    this.user = result.data                                  
                    
                }).catch(()=>{
                    this.$router.push('/')
                })
            }
        },

        created() {
            this.getAuth()
            this.completedtrips()
            this.cancelledtrips()
			this.driverDataCompleted()
			this.driverDataCancelled()
			this.onlinedrivers()			
        },
    }
</script>

<style scoped>
	.cardBox{
		position: relative;
		width: 100%;
		padding: 20px;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 50px;        
	}
	.chartBox{
		position: relative;
		width: 100%;
		padding: 20px;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 20px;
	}

	.chartBox .card {
		position: relative;
		background: #fff;		
		display: flex;
		padding: 20px;
		justify-content: space-between;
		cursor: pointer;	
	}

	.cardBox .card {
		position: relative;
		background: #fff;
		padding: 20px;        
		display: flex;
		justify-content: space-between;
		cursor: pointer;	
		border-radius: 20px;	
  		box-shadow: 5px 5px #88888832;
	}

	.cardBoxRegInfo{
		position: relative;
		width: 100%;
		padding: 20px;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-gap: 50px; 
	}

	.cardBoxRegInfo .card {
		position: relative;
		background: #fff;
		padding: 20px;        
		display: flex;
		justify-content: space-between;
		cursor: pointer;	
		border-radius: 20px;	
  		box-shadow: 5px 5px #88888832;
	}

	.activeText {color:green}
	span{color:#777}

	.welcome {
		position: relative;
		font-weight:1000; 
		font-size: 2.5em;
		margin-left:2%;
		font-family: 'Poppins', sans-serif;
	}

	button{
		box-shadow: 2px 2px  #88888832;
	}

	.iconleft{
		opacity:0.1; 
		color: #777; 
		font-size:100px; 
		padding:15%;
		transition: width 2s, height 4s;
	}
	.iconleft:hover {
		width: 300px;
	}
	.numbers{
		position: relative;
		font-size: 2em;
		font-weight: 700;
	}
	.driverData{
			position: relative;
			font-weight: 700;
			font-size:20px;
	}
	.cardName{
		color: #999;
        font-size:24px;
	}

	.iconBox{
		font-size: 1.5em;
		color: #0a2b3a;                
        margin-right: 8%;
	}

	.cardBox .card .iconBoxImage{
		font-size: 2.5em;
		color: #0a2b3a;  
        margin-right: 3%;
		border-radius:50px;
		
	}		

	.iconBoxImage img{
		position:relative;
		border-radius:20px;
		object-fit: cover;
		max-width: 200px;
		height: 150px;
	}
	.cardBox .card .cardText{
		color: #999;
        font-size:24px;
	}


	@media (max-width:992px){
		.cardBox{
			display:block;
		}	
		.chartBox{
			display: block;
		}
		.iconBoxImage{
			display: block;
		}
	}
</style>