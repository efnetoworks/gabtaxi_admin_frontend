import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import Swal from 'sweetalert2'
import 'jquery/dist/jquery.min.js'
// import 'bootstrap/dist/css/bootstrap.min.css'
import $ from 'jquery'
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

window.Vue = require('vue').default;
window.swal = Swal
window.$ = $

// Initialize Firebase


createApp(App)
    .use(router)
    .use($)
    .mount('#app')