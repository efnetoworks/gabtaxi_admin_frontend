<template>
  <div>
    <h3>Notification History</h3>

    <table id="table" class="table table-striped">
      <thead>
        <tr>
          <th></th>
          <th>Target</th>
          <th>Title</th>
          <th>Notification Body</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(notification, index) in notifications" :key="notification">
          <td>{{index+1}}</td>
          <td>{{notification.target}}</td>
          <td>{{notification.title}}</td>
          <td>{{notification.body}}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>
<script>
  import Notification from '@/javascript/Api/Notification'
  export default{
    data() {
      return {
        notifications:null,
      }
    },
    methods: {
      all_notifications(){
          Notification.notification_history().then((result) => {
              this.notifications = result.data.data
              this.datatable()
          })
      },
      datatable(){
        $(function() {
          $('#table').DataTable({
            "bDestroy": true,
                pageLength: 10,
                lengthMenu: [[5,10,20], [5, 10, 20]],
            });
        });
      },

    },
    created(){
      this.all_notifications()
    }

  }
</script>
