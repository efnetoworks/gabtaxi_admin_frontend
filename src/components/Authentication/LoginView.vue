<template>
    <div class="container">
		<center>
			<!-- <div class="loading" v-if="isLoading"> -->
				
			<!-- </div> -->
		</center>
		<div class="card">
			<div class="inner-box" id="card">
				<div class="card-front">
					<h2 > GabTaxi Admin</h2>
					<center><p style="color:greenyellow; width:100%"  v-if="isLoading">Successful...</p></center>
					<center style="color:red">
						{{ message }}						
					</center>
						<input type="phone" @input="checkInput" v-model="logindata.phone" class="input-box" name="phone" placeholder="phone" required> 
						<input type="password" @input="checkInput" @keyup.enter="login" v-model="logindata.password" class="input-box" name="password" placeholder="Password" required>

						<button class="submit-btn" :disabled="!filled"  @click="login">Login</button>
						<center v-if='!filled'>
							<small>
								<p style="color:red">fields are empty</p>
							</small>
						</center>
						

					<button type="button" class="btn" style="border:none">
						<i class="fas fa-copyright"> </i> 2022 EF Technologies
					</button>
				</div>				
			</div>
		</div>
	</div>		
</template>
<script>
import User from '../../Apis/User.js'
import Loading from '../Loading.vue'
export default {
	components:{Loading},
	data() {
		return {
			filled:false,
			logindata: {
				phone:null,
				password:null,
				user_type:'admin'
			},
			isLoading:false,
			message:null,			
		}
	},
    methods: {
		checkInput(){
			this.message = null
			if(this.logindata.phone == null || this.logindata.phone == "" || this.logindata.password == ""|| this.logindata.password == null){
				this.filled = false
			}else{
				this.filled = true
			}
		},
        login(){
			this.isLoading = true
			if(this.logindata.phone != null && this.logindata.password != null){
				User.login(this.logindata).then((result) =>{
						localStorage.setItem("token", result.data['auth_token'])					
						this.isLoading = false
						window.location.href = 'dashboard'														
						User.auth().then(() =>{
							localStorage.setItem("auth", "true")											
						})				
					}
					).catch((err) => {
						this.message = err.response.data.message
					});
			}else{
				this.message = "Some fields are missing"
			}
        }
    },
        
    
}
</script>

<style scoped>
    *{
	margin: 0;
	padding: 0;
}

.container{
	width: 100%;
	height: 100vh;
	font-family: sans-serif;
	background: linear-gradient(rgba(38, 38, 115, 0.8), rgba(76, 32, 84, 0.8)),  url('../../../public/gabtaxi.png');
	background-position: center;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
}

.card{
	width: 350px;
	height: 500px;
	box-shadow: 0 0 40px 20px rgba(0, 0, 0, 0.26);	
	perspective: 1000px;
}

.inner-box{
	position: relative;
	width: 100%;
	height: 100%;	
	transform-style: preserve-3d;
	transition: transform 1s;
}

.card-front, .card-back{
	position: absolute;
	width: 100%;
	height: 100%;
	background-position: center;
	background-size: cover;
	background-image: linear-gradient(rgba(0,0,100,0.8), rgba(76, 32, 84, 0.8));
	padding: 55px;
	box-sizing: border-box;
	backface-visibility: hidden;
}

.card-back{
	transform: rotateY(180deg);
}

.card h2{
	font-weight: normal;
	font-size: 24px;
	text-align: center;
	margin-bottom: 20px;
}

.google{
    width: 100%;
	background: transparent;
	border:  1px solid #fff;
	margin:  6px 0;
	height: 32px;
	border-radius: 20px;
	padding: 0 10px;
	box-sizing: border-box;
	outline: none;
	text-align: center;
	color: #fff;
    cursor: pointer;

}

.google:hover{
    border:1px solid red
}
.input-box{
	width: 100%;
	background: transparent;
	border:  1px solid #fff;
	margin:  6px 0;
	height: 32px;
	border-radius: 20px;
	padding: 0 10px;
	box-sizing: border-box;
	outline: none;
	text-align: center;
	color: #fff;
}

::placeholder{
	color: #fff;
	font-size: 12px;
}

button{
	width: 100%;
	background: transparent;
	border: 1px solid #fff;
	margin: 35px 0 10px;
	height: 32px;
	font-size: 12px;
	border-radius: 20px;
	padding: 0 1px;
	box-sizing: border-box;
	outline: none;
	color: #fff;
	cursor: pointer;
}

.submit-btn{
	position:  relative;
}

.submit-btn::after{
	content: '\27a4';
	color: #333;
	line-height: 32px;
	font-size: 17px;
	height: 32px;
	width: 32px;
	border-radius: 50%;
	background: #fff;
	position: absolute;
	right: -1px;
	top: -1px;
}

span{
	font-size: 12px;
	margin-left: 10px;
}

.card .btn{
	margin-top: 70px;
}

.card a{
	display: block;
	text-align: center;
	color: #fff;
	font-size: 13px;
	margin-top: 8px;
}    
</style>