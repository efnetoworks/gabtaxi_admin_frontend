<template>
    <div>
        <center>
            <center style="margin-bottom:2%;">
                <b>Admin Profile</b>
                <div class="loading" v-if="isLoading">
                    <loading />
                </div>
            </center>
            <div class="form-group">
                <label for="" >
                    Fullname <span class="required">*<small>{{this.inputErr.fullname}}</small>
                    </span>
                </label>
                <input type="text" class="name" placeholder="Fullname" v-model="newAdmin.fullname">                
            </div>
            <div class="form-group">
                <label for="">
                    Telelephone <span class="required">*<small>{{this.inputErr.phone}}</small>
                    </span>
                </label>
                <input type="text" class="tel" placeholder="+234" v-model="newAdmin.phone">
            </div>
            <div class="form-group">
                <label for="">Email <span class="required">*<small>{{this.inputErr.email}}</small>
                </span>
                </label>
                <input type="text" class="emailAdd" placeholder="xyz@abc.com" v-model="newAdmin.email">
            </div>
            <div class="form-group">
                <label for="">Gender <span class="required">*<small>{{this.inputErr.gender}}</small></span>
                </label>
                <select v-model="newAdmin.gender" class="gender">
                    <option value="null">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <div class="form-group">
                <label for="">Date of Birth <span class="required">*<small>{{this.inputErr.dob}}</small></span>
                </label>
                <input type="date" v-model="newAdmin.dob" class="dob">
            </div>           

            <button v-if="!updateMode" @click="saveAdmin" id="submit">Submit</button>
            <button v-if="updateMode" @click="updateAdmin" id="update">Update</button>
            
        </center>

    </div>
</template>
<script>
import Swal from 'sweetalert2'
import Admin from '@/Apis/Admin.js'
     export default{
        props:{
            admin:null,
            updateMode:null,
            refresh_table:null            
        },
         data() {             
             return {
                newAdmin:{
                    id:this.admin != null ? this.admin.id :null,                    
                    fullname:this.admin != null ?this.admin.fullname: null,
                    phone:this.admin != null ? this.admin.phone: null,
                    email:this.admin != null ? this.admin.email: null,
                    gender:this.admin != null ? this.admin.sex: null,
                    dob:this.admin != null ?this.admin.dob: null,
                    picture:null,
                    user_type:'admin'                                     
                },
                pwdmatch:null,
                setTrue:false,
                isLoading:false,
                inputErr:{
                    fullname:null,
                    phone:null,
                    email:null,
                    gender:null,
                    dob:null,
                    picture:null,                                      
                },
             }
         },

         methods: {
            getEmptyFields(){
                if(this.newAdmin.fullname == null || this.newAdmin.fullname == ""){
                    this.inputErr.fullname = 'Fullname is required'
                    let fullname = document.querySelector('.name');            
                    fullname.classList.add('inputErr')                    
                } 
                if(this.newAdmin.phone == null || this.newAdmin.phone == ""){
                    this.inputErr.phone = 'Phone is required'
                    let phone = document.querySelector('.tel');            
                    phone.classList.add('inputErr')                    
                }
                if(this.newAdmin.email == null || this.newAdmin.email == ""){
                    this.inputErr.email = 'Email is required'
                    let email = document.querySelector('.emailAdd');            
                    email.classList.add('inputErr')
                    this.setTrue = true
                }
                if(this.newAdmin.gender == null){
                    this.inputErr.gender = 'Gender is required'
                    let gender = document.querySelector('.gender');            
                    gender.classList.add('inputErr')   
                }
                if(this.newAdmin.dob == null || this.newAdmin.dob == ""){
                    this.inputErr.dob = 'Date of Birth is required'
                    let dob = document.querySelector('.dob');            
                    dob.classList.add('inputErr')   
                }                
            },         

            saveAdmin(){                
                this.getEmptyFields()                
                if(this.inputErr.fullname != null || this.inputErr.phone != null || this.inputErr.email != null || this.inputErr.gender != null || this.inputErr.dob != null){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Missing Fields',
                        customClass: 'Swal-wide',
                        showConfirmButton: false,
                        timer: 3000
                    })                 
                                        
                }else{
                    this.isLoading = true
                    Admin.register_admin(this.newAdmin).then((result) => {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Admin Created',
                            customClass: 'Swal-wide',
                            showConfirmButton: false,
                            timer: 3000
                        })                        
                        this.$emit('admin_created');
                        this.isLoading = false
                        this.newAdmin.fullname = null
                        this.newAdmin.phone = null 
                        this.newAdmin.email = null 
                        this.newAdmin.gender = null 
                        this.newAdmin.dob = null                             
                    }).catch((err) => {
                        this.isLoading = false
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: err.response.data.message,
                            customClass: 'Swal-wide',
                            showConfirmButton: false,
                            timer: 3000
                        })                             
                    });

                }
                                
            },

            updateAdmin(){                
                this.getEmptyFields()                               
                if(this.inputErr.fullname != null || this.inputErr.phone != null || this.inputErr.email != null || this.inputErr.gender != null || this.inputErr.dob != null){
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Missing Fields',
                            customClass: 'Swal-wide',
                            showConfirmButton: false,
                            timer: 3000
                        })  
                        this.isLoading = false 
                        this.newAdmin.fullname = null
                        this.newAdmin.phone = null 
                        this.newAdmin.email = null 
                        this.newAdmin.gender = null 
                        this.newAdmin.dob = null                         
                }else{
                    this.isLoading = true 
                    Admin.update_admin(this.newAdmin).then((result) => {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: result.data.message,
                            customClass: 'Swal-wide',
                            showConfirmButton: false,
                            timer: 3000
                        })  
                        this.isLoading = false                           
                        this.$emit('admin_updated')
                    }).catch((err) => {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: err.response.data.message,
                            customClass: 'Swal-wide',
                            showConfirmButton: false,
                            timer: 3000
                        })                             
                    });
                }                 
            }
         },       

        computed: {
            fullname(){                    
                return this.newAdmin.fullname;                    
            },
            phone(){
                return this.newAdmin.phone;
            },
            email(){
                return this.newAdmin.email;
            },
            gender(){
                return this.newAdmin.gender;
            },
            dob(){
                return this.newAdmin.dob;
            },                        
            props(){
                return this.updateMode
            }

        },

        watch:{         
            fullname(){
                if(this.newAdmin.fullname !=  null && this.newAdmin.fullname !=  ""){
                    let fullname = document.querySelector('.name');            
                    this.inputErr.fullname = null                                        
                    fullname.classList.add('inputSucc')
                    fullname.classList.remove('inputErr')
                    fullname.classList.remove('inputEmpty') 
                }else{
                    let fullname = document.querySelector('.name');            
                    fullname.classList.add('inputEmpty') 
                    fullname.classList.remove('inputSucc')                   
                }                               
            },
            phone(){
                if(this.newAdmin.phone != null && this.newAdmin.phone != ""){
                    let phone = document.querySelector('.tel');            
                    this.inputErr.phone = null                                        
                    phone.classList.add('inputSucc')
                    phone.classList.remove('inputErr')
                    phone.classList.remove('inputEmpty')                     
                }else{
                    let phone = document.querySelector('.tel');            
                    phone.classList.add('inputEmpty') 
                    phone.classList.remove('inputSucc')                   
                }
            },
            email(){
                if(this.newAdmin.email != null && this.newAdmin.email != ""){
                    let email = document.querySelector('.emailAdd');            
                    this.inputErr.email = null                                        
                    email.classList.add('inputSucc')
                    email.classList.remove('inputErr')
                    email.classList.remove('inputEmpty')                     
                }else{
                    let email = document.querySelector('.emailAdd');            
                    email.classList.add('inputEmpty') 
                    email.classList.remove('inputSucc')                   
                }
            },
            gender(){
                if(this.newAdmin.gender != null && this.newAdmin.gender != ""){
                    let gender = document.querySelector('.gender');            
                    this.inputErr.gender = null                                        
                    gender.classList.add('inputSucc')
                    gender.classList.remove('inputErr')
                    gender.classList.remove('inputEmpty')                     
                }else{
                    let gender = document.querySelector('.gender');            
                    gender.classList.add('inputEmpty') 
                    gender.classList.remove('inputSucc')                   
                }
            },
            dob(){
                if(this.newAdmin.dob != null && this.newAdmin.dob != ""){
                    let dateofbirth = document.querySelector('.dob');            
                    this.inputErr.dob = null                                        
                    dateofbirth.classList.add('inputSucc')
                    dateofbirth.classList.remove('inputErr')
                    dateofbirth.classList.remove('inputEmpty')                     
                }else{
                    let dateofbirth = document.querySelector('.dob');            
                    dateofbirth.classList.add('inputEmpty') 
                    dateofbirth.classList.remove('inputSucc')                   
                }
            },
            
        },


        
     }   

</script>

<style>
 
</style>