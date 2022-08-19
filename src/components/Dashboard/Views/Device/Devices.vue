<template>
  <div>
    <h3>Devices</h3>

    <table id="table" class="table table-striped">
      <thead>
        <tr>
          <th></th>
          <th>Token</th>
          <th>User</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(device, index) in devices" :key="device">
          <td>{{index+1}}</td>
          <td>{{device.fcm_token}}</td>
          <td>{{device.user_id}}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>
<script>
  import Devices from '@/javascript/Api/Devices'
  export default{
    data() {
      return {
        devices:null,
      }
    },
    methods: {
      all_devices(){
          Devices.devices().then((result) => {
              this.devices = result.data.data
              this.datatable()
          })
      },
      datatable(){
        $(function() {
          $('#table').DataTable({
            "bDestroy": true,
                pageLength: 5,
                lengthMenu: [[5,10,20], [5, 10, 20]],
            });
        });
      },

    },
    created(){
      this.all_devices()
    }

  }
</script>
