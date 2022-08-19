/*!

  =========================================================
  * Vue Paper Dashboard 2 PRO - V2.3.0
  =========================================================

  * Product Page: https://www.creative-tim.com/product/vue-paper-dashboard-2-pro
  * Available with purchase of license from https://www.creative-tim.com/product/vue-paper-dashboard-2-pro
  * Copyright 2019 Creative Tim (https://www.creative-tim.com)
  * License Creative Tim (https://www.creative-tim.com/license)

  =========================================================

*/

import Vue from 'vue'
import './pollyfills'
import VueRouter from 'vue-router'
import VueRouterPrefetch from 'vue-router-prefetch'
import VueNotify from 'vue-notifyjs'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import App from './App.vue'

// Plugins
import GlobalComponents from './globalComponents'
import GlobalDirectives from './globalDirectives'
import SideBar from './components/UIComponents/SidebarPlugin'
import initProgress from './progressbar';

// datatable
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import moment from 'moment'

// router setup
import routes from './routes/routes'
import $ from 'jquery'
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'

// library imports

import './assets/sass/paper-dashboard.scss'
import './assets/sass/demo.scss'



import sidebarLinks from './sidebarLinks'
import './registerServiceWorker'
// plugin setup
Vue.use(VueRouter)
Vue.use(VueRouterPrefetch)
Vue.use(GlobalDirectives)
Vue.use(moment)
Vue.use(GlobalComponents)
Vue.use(VueNotify)
Vue.use(SideBar, { sidebarLinks: sidebarLinks })
locale.use(lang)

window.$ = $

// configure router
const router = new VueRouter({
    mode: 'history',
    routes, // short for routes: routes
    linkActiveClass: 'active',
    scrollBehavior: (to) => {
        if (to.hash) {
            return { selector: to.hash }
        } else {
            return { x: 0, y: 0 }
        }
    }
})

initProgress(router);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    render: h => h(App),
    router
})
