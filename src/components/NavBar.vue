<template>
    <div>
        <div class="navigation">
            <ul>
				<li class="first-child">
					<router-link to="">
						<span class="icon">
                            <!-- <i class="fas fa-cart-plus" aria-hidden="true"></i> -->
							<img src="/gabtaxi.png" alt="" >
                        </span>
						<span class="title"><h2>GabTaxi Admin</h2></span>
					</router-link>
				</li>
				<li>
					<router-link active-class="activeLink" to="/dashboard">
						<span class="icon">
							<i class="fas fa-tachometer-alt"></i>
						</span>
						<span class="title">Dashboard</span>
					</router-link>	
				</li>
				<li>
					<router-link active-class="activeLink" to="/admin" >
						<span class="icon"><i class="fas fa-user-circle" aria-hidden="true"></i></span>
						<span class="title">Admins</span>
					</router-link>	
				</li>

				<!-- <li>
					<a href="#" @click="openCollapse(1)">
						<span class="icon">
							<i class="fas fa-code-fork"></i>
						</span>
						<span class="title">
							Master Data <span><i class="fas fa-caret-down"></i></span> 							
						</span> 						
					</a>	
				</li>
				<div class="content">
					<TransitionGroup name="content">						
						<li v-if="show == 1">
							<router-link to="#">
								<span style="margin-right: 2%;">
									<i class="fas fa-circle" aria-hidden="true"></i>
								</span> Content b
							</router-link>
						</li>
						<li v-if="show == 1">
							<router-link to="#">
								<span style="margin-right: 2%;">
									<i class="fas fa-circle" aria-hidden="true"></i>
								</span> Content c</router-link>
						</li>
					</TransitionGroup>			
				</div>		 -->
						
				<li>
					<router-link active-class="activeLink" to="/service-locations">						
						<span class="icon">
							<i class="fas fa-map-marker"></i>
						</span>
						<span class="title">Service Locations</span>
					</router-link>				
				</li>
				<li>
					<router-link active-class="activeLink" to="/services">						
						<span class="icon">
							<i class="fas fa-wrench"></i>
						</span>
						<span class="title">Services</span>
					</router-link>				
				</li>				
				<li>
					<a href="#" @click="openCollapse(2)">
						<span class="icon">
							<i class="fas fa-map"></i>
						</span>
						<span class="title">
							Trip Requests <span><i class="fas fa-caret-down"></i></span>							
						</span> 						
					</a>	
				</li>
				<div class="content" >
					<TransitionGroup name="content">						
						<li v-if="show == 2" >
							<router-link to="/trip" active-class="activeLink">
								<span style="margin-right: 2%;">
									<i class="fas fa-circle" aria-hidden="true"></i>
								</span> Trips
							</router-link>
						</li>
						<li v-if="show == 2">
							<router-link to="/ride" active-class="activeLink">
								<span style="margin-right: 2%;">
									<i class="fas fa-circle" aria-hidden="true"></i>
								</span> Rides
							</router-link>
						</li>
						<li v-if="show == 2">
							<router-link to="/cancelled" active-class="activeLink">
								<span style="margin-right: 2%;">
									<i class="fas fa-circle" aria-hidden="true"></i>
								</span> Cancelled Rides
							</router-link>
						</li>
					</TransitionGroup>			
				</div>				
				<li>
					<a href="#" @click="openCollapse(3)">
						<span class="icon">
							<i class="fas fa-users"></i>
						</span>
						<span class="title">
							Drivers <span><i class="fas fa-caret-down"></i></span>
						</span> 						
					</a>	
				</li>
				<div class="content" >
					<TransitionGroup name="content">						
						<li v-if="show == 3" active-class="activeLink">
							<router-link to="#">
								<span style="margin-right: 2%;">
									<i class="fas fa-circle" aria-hidden="true"></i>
								</span> Driver Details</router-link>
						</li>
						<li v-if="show == 3" active-class="activeLink">
							<router-link to="#">
								<span style="margin-right: 2%;">
									<i class="fas fa-circle" aria-hidden="true"></i>
								</span> Driver Ratings</router-link>
						</li>
					</TransitionGroup>			
				</div>
				<li>
					<a href="#" @click="openCollapse(4)">
						<span class="icon">
							<i class="fas fa-user"></i>
						</span>
						<span class="title">
							Passengers <span><i class="fas fa-caret-down"></i></span>
						</span> 						
					</a>					
				</li>
				<div class="content" >
					<TransitionGroup name="content">						
						<li v-if="show == 4" active-class="activeLink">
							<router-link to="#">
								<span style="margin-right: 2%;">
									<i class="fas fa-circle" aria-hidden="true"></i>
								</span> User Details</router-link>
						</li>						
					</TransitionGroup>			
				</div>
				
				
				<li>
					<a href="#" @click="openCollapse(5)">
						<span class="icon">
							<i class="fas fa-map"></i>
						</span>
						<span class="title">
							Geofencing <span><i class="fas fa-caret-down"></i></span>
						</span> 						
					</a>										
				</li>    
				<div class="content" >
					<TransitionGroup name="content">												
						<li v-if="show == 5" active-class="activeLink">
							<router-link to="/zone">
								<span style="margin-right: 2%;">
									<i class="fas fa-circle" aria-hidden="true"></i>
								</span> Zone</router-link>
						</li>						
						<li v-if="show == 5" active-class="activeLink">
							<router-link to="geofencing/airport">
								<span style="margin-right: 2%;">
									<i class="fas fa-circle" aria-hidden="true"></i>
								</span> Airport</router-link>
						</li>						
					</TransitionGroup>			
				</div>            
				
				
				<li>
					<router-link active-class="activeLink" to="/sms">					
						<span class="icon">
							<i class="fas fa-gift" aria-hidden="true"></i>
						</span>
						<span class="title">Promo Code</span>
					</router-link>				
				</li>
				<li>
					<router-link active-class="activeLink" to="/followup">
						<span class="icon">
							<i class="fa fa-paper-plane"></i>
							</span>
						<span class="title">Custom Notification</span>
					</router-link>
				</li>                
				
				<li>
					<router-link active-class="activeLink" to="/report">
						<span class="icon">
							<i class="fas fa-ban" aria-hidden="true"></i>
						</span>
						<span class="title">Cancellation</span>
					</router-link>
				</li> 
				<!-- <li>
					<a href="#" @click="openCollapse(6)">
						<span class="icon">
							<i class="fas fa-list-alt"></i>
						</span>
						<span class="title">
							Complaints <span><i class="fas fa-caret-down"></i></span>
						</span> 						
					</a>																			
				</li> 
				<div class="content" >
					<TransitionGroup name="content">						
						<li v-if="show == 6" active-class="activeLink">
							<router-link to="#">
								<span style="margin-right: 2%;">
									<i class="fas fa-circle" aria-hidden="true"></i>
								</span> Complaint Title</router-link>
						</li>						
						<li v-if="show == 6" active-class="activeLink" @click="openSubMenu(1)">
							<router-link to="#">
								<span style="margin-right: 2%;">
									<i class="fas fa-circle" aria-hidden="true"></i>
								</span> User Complaint <span style="margin-left:2%"><i class="fas fa-caret-down"></i></span></router-link>
						</li>				
							<div class="content" style="background-color:#777" >
								<TransitionGroup name="content">						
									<li v-if="submenu == 1" active-class="activeLink">
										<router-link to="#">General Complaint</router-link>
									</li>						
									<li v-if="submenu == 1" active-class="activeLink">
										<router-link to="#">Request Complaint</router-link>
									</li>														
								</TransitionGroup>			
							</div> 		
						<li v-if="show == 6" active-class="activeLink" @click="openSubMenu(2)">
							<router-link to="#">
								<span style="margin-right: 2%;">
									<i class="fas fa-circle" aria-hidden="true"></i>
								</span> Driver Complaint  <span style="margin-left:2%"><i class="fas fa-caret-down"></i></span></router-link>
						</li>
							<div class="content" style="background-color:#777" >
								<TransitionGroup name="content">						
									<li v-if="submenu == 2" active-class="activeLink">
										<router-link to="#">General Complaint</router-link>
									</li>						
									<li v-if="submenu == 2" active-class="activeLink">
										<router-link to="#">Request Complaint</router-link>
									</li>														
								</TransitionGroup>			
							</div> 						
					</TransitionGroup>			
				</div>   -->
				<!-- <li>
					<a href="#" @click="openCollapse(7)">
						<span class="icon">
							<i class="fas fa-file-pdf"></i>
						</span>
						<span class="title">
							Reports <span><i class="fas fa-caret-down"></i></span>
						</span> 						
					</a>																								
				</li> 
				<div class="content" >
					<TransitionGroup name="content">						
						<li v-if="show == 7" active-class="activeLink">
							<router-link to="#">
								<span style="margin-right: 2%;">
									<i class="fas fa-circle" aria-hidden="true"></i>
								</span> User Report</router-link>
						</li>						
						<li v-if="show == 7" active-class="activeLink">
							<router-link to="#">
								<span style="margin-right: 2%;">
									<i class="fas fa-circle" aria-hidden="true"></i>
								</span> Driver Report</router-link>
						</li>						
						<li v-if="show == 7" active-class="activeLink">
							<router-link to="#">
								<span style="margin-right: 2%;">
									<i class="fas fa-circle" aria-hidden="true"></i>
								</span> Driver Duties Report</router-link>
						</li>						
						<li v-if="show == 7" active-class="activeLink">
							<router-link to="#">
								<span style="margin-right: 2%;">
									<i class="fas fa-circle" aria-hidden="true"></i>
								</span> Travel Report</router-link>
						</li>						
					</TransitionGroup>			
				</div>      -->
				<li>
					<a href="#" @click="openCollapse(8)">
						<span class="icon">
							<i class="fas fa-globe"></i>
						</span>
						<span class="title">
							Geofencing View <span><i class="fas fa-caret-down"></i></span>							
						</span> 						
					</a>	
				</li>
				<div class="content" >
					<TransitionGroup name="content">						
						<li v-if="show == 8">
							<router-link to="/heatmap">
								<span style="margin-right: 2%;">
									<i class="fas fa-circle" aria-hidden="true"></i>
								</span> Heat Map</router-link>
						</li>
						<li v-if="show == 8">
							<router-link to="#">
								<span style="margin-right: 2%;">
									<i class="fas fa-circle" aria-hidden="true"></i>
								</span> God's Eye</router-link>
						</li>
					</TransitionGroup>			
				</div>
				<li>
					<router-link active-class="activeLink" to="/report">
						<span class="icon"><i class="fas fa-question-circle"></i></span>
						<span class="title">FAQ</span>
					</router-link>
				</li> 
				<li>
					<router-link to="" @click="logout">
						<span class="icon" ><i style="color:red" class="fas fa-power-off"></i></span>
						<span class="title" >Sign Out</span>
					</router-link>
				</li>
			</ul>
        </div>
        <div class="topbar">				
            <div class="toggle" @click="toggleMenu"></div>											
			<div class="topend">
				<button class="profile">
					<i class="fa fa-user"></i> 
					{{fullname}}
				</button>				
				<button class="sos">SOS</button>            				
				
			</div>
			<!-- <div class="dropdown-menu" v-if="shodropdown">
					<li><a class="dropdown-item" href="#">My account</a></li>
					<li><a class="dropdown-item" href="#">Logout</a></li>
			</div> -->
			
        </div>               	
    </div>
</template>

<script>
import User from '@/Apis/User';

export default {
	data() {
		return {
			user:null,
			show:0,
			submenu:0,
			shodropdown:false,
			fullname:null
		}
	},
	methods: 
	{
		showdropdown(){
			this.shodropdown = !this.shodropdown
		},

		toggleMenu(){
            let toggle = document.querySelector('.toggle');            
			let navigation = document.querySelector('.navigation')
			let main = document.querySelector('.main')            
			navigation.classList.toggle('active')
			toggle.classList.toggle('active')
			main.classList.toggle('active')			
		},  
		logout(){
			User.logout().then((result) => {
				localStorage.setItem("token", result.data['auth_token'])					
					window.location.href = 'login'									
					localStorage.clear()																
			}).catch((err) => {
				
			});
		},
		openSubMenu(id){
			if(this.submenu == id){
				this.submenu = 0				
			}else{
				this.submenu = id
			}
		},
		openCollapse(id){
			if(this.show == id){
				this.show = 0
				this.submenu = 0
			}else{
				this.submenu = 0
				this.show = id
			}
		},
		getAuth(){
                User.auth().then((result)=>{
                    this.user = result.data                                  
                }).catch(()=>{
                    this.$router.push('/')
                })
            },		
	},

	watch:{
		user(){
			this.fullname = this.user.fullname
		}
	},

	created() {
		this.getAuth()
	},
}


</script>
<style scoped>
    @import url('../assets/style.css');
</style>