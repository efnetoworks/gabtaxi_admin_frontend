<template>
  <div>
    <h3>Send Notifications</h3>
    <form @submit.prevent="send_notification">
    <div class="col-4">
      <div class="form-group">
        <label for="">Target To</label>
        <select name="" id="" class="form-control" v-model="form.target" required>
          <option value="all">All Users</option>
          <option value="driver">Drivers</option>
          <option value="passenger">Passengers</option>
        </select>
      </div>
      <div class="form-group">
        <label for="">Title</label>
        <input v-model="form.title" type="text" class="form-control" required placeholder="input title...">
      </div>
      <div class="form-group">
        <label for="">Body</label>
        <textarea v-model="form.body" class="form-control" cols="30" rows="10" required></textarea>
      </div>
      <button class="btn btn-success col-4" type="submit">
        Send <i class="fa fa-envelope-o" aria-hidden="true"></i>
      </button>
    </div>
    </form>
  </div>

</template>

<script>
import Notification from '@/javascript/Api/Notification';
import Swal from 'sweetalert2';
  export default{
    data() {
      return {
        form: {
          target:'all',
          title:null,
          body:null,
          image:null
        }
      }
    },
    methods: {
      send_notification(){
        Notification.send_notification(this.form).then(result =>{
          this.form.target = "all"
          this.form.title = null
          this.form.body = null
          Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Sent',
              customClass: 'Swal-wide',
              showConfirmButton: false,
              timer: 3000
          })
        })
      }
    },
  }
</script>
