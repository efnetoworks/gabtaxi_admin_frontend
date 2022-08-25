<template>
  <div>
    <h4>Update Passenger</h4>
    <section class="col-6">
      <form @submit.prevent="update">
        <div class="form-group">
          <label for="">Fullname</label>
          <input type="text" class="form-control" v-model="details.fullname">
        </div>

        <div class="form-group">
          <label for="">Email</label>
          <input type="email" class="form-control" v-model="details.email">
        </div>

        <div class="form-group">
          <label for="">BVN</label>
          <input type="text" class="form-control" v-model="details.bvn">
        </div>

        <div class="form-group">
          <label for="">Phone</label>
          <input type="text" class="form-control" v-model="details.phone">
        </div>
        <div class="form-group">
          <label for="">Date of Birth</label>
          <input type="date" class="form-control" v-model="details.dob">
        </div>
        <div class="form-group">
          <label for="">Gender</label>
          <select v-model="details.sex" class="form-control">
            <option value="male">Male</option>
            <option value="male">Female</option>
          </select>
        </div>
        <button class="btn btn-success col-8" type="submit">Submit</button>
      </form>
    </section>
  </div>
</template>

<script>
import Passenger from '@/javascript/Api/Passenger';
import Swal from 'sweetalert2';
  export default{
    data(){
      return {
        details:null,
      }
    },
    methods: {
      passenger_resource(passenger){
        Passenger.passenger_resource(passenger).then((result) => {
          this.details = result.data.data
        })
      },
      getDetails(){
        this.passenger_resource(this.$route.params.id)
      },
      update(){
        Passenger.update_passenger(this.details).then((result) => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'User Updated',
              customClass: 'Swal-wide',
              showConfirmButton: false,
              timer: 3000
            })
            this.$router.push('/passenger')
        }).catch((err) => {
          Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Update not Successful',
              customClass: 'Swal-wide',
              showConfirmButton: false,
              timer: 3000
            })
        });
      }
    },
    created(){
      this.getDetails()
    }
  }
</script>
