<template>
  <div>
    <h4>Update Driver</h4>
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
import Driver from '@/javascript/Api/Driver';
  export default{
    data(){
      return {
        details:null
      }
    },
    methods: {
      driver_resource(driver){
        Driver.driver_resource(driver).then((result) => {
          this.details = result.data.data
        })
      },
      getDetails(){
        this.driver_resource(this.$route.params.id)
      }
    },
    created(){
      this.getDetails()
    }
  }
</script>
