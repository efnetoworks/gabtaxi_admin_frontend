<template>
  <div>
    <h4>Create User</h4>
    <section class="col-6">
      <form @submit.prevent="submit">
        <div class="form-group">
          <label for="">Fullname</label>
          <input type="text" class="form-control" v-model="form.fullname" required>
        </div>

        <div class="form-group">
          <label for="">Email</label>
          <input type="email" class="form-control" v-model="form.email" required>
        </div>

        <div class="form-group">
          <label for="">Phone</label>
          <input type="text" class="form-control" v-model="form.phone" required>
        </div>
        <div class="form-group">
          <label for="">address</label>
          <textarea name="" class="form-control" id="" cols="30" rows="10" v-model="form.dob" required></textarea>
        </div>
        <div class="form-group">
          <label for="">Role</label>
          <select v-model="form.role_id" class="form-control" required>
            <option value="null">Select</option>
            <option v-for="role in roles" :key="role.id" :value="role.id">
              {{ role.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="">Gender</label>
          <select v-model="form.gender" class="form-control" required>
            <option value="null">Select</option>
            <option value="male">Male</option>
            <option value="male">Female</option>
          </select>
        </div>
        <div class="form-group">
          <label for="">Password</label>
          <input type="password" class="form-control" v-model="form.password" required>
        </div>
        <div class="form-group">
          <label for="">Upload Picture</label>
          <div class="col-4">
            <img :src="upl_image" alt="" height="40%" width="80%"><br/>
             <div>
                <input class="form-control" type="file" @change="uploadfile($event.target.files)">
             </div>
             </div>
        </div>
        <button class="btn btn-success col-8" type="submit">Submit</button>
      </form>
    </section>
  </div>
</template>

<script>
import User from '@/javascript/Api/User';
import RolesPriviledge from '@/javascript/Api/RolesPriviledge';
import Swal from 'sweetalert2';
  export default{
    data(){
      return {
        form:{
          fullname:null,
          email:null,
          phone:null,
          address:null,
          role_id:null,
          password:null,
          dob:null,
          gender:null,
          picture:null
        },
        image:null,
        upl_image:'static/img/imageholder.jpg',
        roles:null
      }
    },
    methods: {
      get_roles(){
        RolesPriviledge.roles().then((result) => {
            this.roles = result.data
        })
      },
      uploadfile(e){
        // console.log(e[0])
        this.form.picture = e[0];
        var image = e[0]
          const reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onload = e =>{
            this.previewImage = e.target.result;
            this.upl_image = this.previewImage;
          };
      },
      submit(){
        var formData = new FormData()
        formData.append('fullname', this.form.fullname)
        formData.append('email', this.form.email)
        formData.append('phone', this.form.phone)
        formData.append('address', this.form.address)
        formData.append('role_id', this.form.role_id)
        formData.append('password', this.form.password)
        formData.append('dob', this.form.dob)
        formData.append('gender', this.form.gender)
        formData.append('picture', this.form.picture)

        User.create(formData).then((result) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'User Account Created',
            customClass: 'Swal-wide',
            showConfirmButton: false,
            timer: 3000
          })
        }).catch((err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: err,
            customClass: 'Swal-wide',
            showConfirmButton: false,
            timer: 3000
          })
        });
      }

    },
    created(){
      this.get_roles()
    }
  }
</script>
