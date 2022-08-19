<template>
    <div>
            <h3>Admin Profile</h3>
            <form @submit.prevent="save_admin">
                <div class="form-group">
                  <label for="" >
                      Fullname
                  </label>
                  <input required type="text" class="form-control col-lg-6" placeholder="Fullname" v-model="newAdmin.fullname">
                </div>
                <div class="form-group">
                    <label for="">
                        Telelephone
                    </label>
                    <input required type="text" class="form-control col-lg-6" placeholder="+234" v-model="newAdmin.phone">
                </div>
                <div class="form-group">
                    <label for="">Email
                    </label>
                    <input required type="text" class="form-control col-lg-6" placeholder="xyz@abc.com" v-model="newAdmin.email">
                </div>
                <div class="form-group">
                    <label for="">Gender</label>
                    <select required v-model="newAdmin.gender" class="form-control col-lg-6" >
                        <option value="null">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="">Date of Birth</label>
                    <input required type="date" v-model="newAdmin.dob" class="form-control col-lg-6" >
                </div>
                <div class="form-group">
                  <div style="height:100px; width:100px" class="mb-4">
                    <img :src="upl_img" alt="">
                    <input type="file" value="upload image" @change="upload_image">
                  </div>
                </div>
              <button type="submit" class="btn btn-success col-lg-6" id="submit">Submit</button>
            </form>
    </div>
</template>
<script>
import Swal from 'sweetalert2'
import Admin from '@/javascript/Api/Admin'
     export default{
         data() {
             return {
                newAdmin:{
                    fullname:null,
                    phone:null,
                    email:null,
                    gender:null,
                    dob:null,
                    picture:null,
                    user_type:'admin'
                },
                upl_img:"/static/img/imageholder.jpg",
             }
         },

         methods: {
          upload_image(e){
            const image = e.target.files[0]
            this.newAdmin.picture = image
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
              console.log(e);
                this.previewImage = e.target.result;
              this.upl_img = this.previewImage;
            };

          },
          save_admin(){
            const formData = new FormData()
            formData.append('picture', this.newAdmin.picture)
            formData.append('fullname', this.newAdmin.fullname)
            formData.append('phone', this.newAdmin.phone)
            formData.append('email', this.newAdmin.email)
            formData.append('gender', this.newAdmin.gender)
            formData.append('dob', this.newAdmin.dob)
            formData.append('user_type', this.newAdmin.user_type)
            Admin.register_admin(formData).then((result) => {
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Admin Created',
                  customClass: 'Swal-wide',
                  showConfirmButton: false,
                  timer: 3000
                })
                this.newAdmin.fullname = null
                this.newAdmin.phone = null
                this.newAdmin.email = null
                this.newAdmin.gender = null
                this.newAdmin.dob = null
                this.upl_img = "/static/img/imageholder.jpg"
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
          },


         },
     }

</script>

<style>

</style>
