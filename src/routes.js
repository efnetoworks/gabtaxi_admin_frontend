import { createRouter, createWebHistory } from 'vue-router'
import Login from './components/Authentication/LoginView.vue'
import Dashboard from './components/Dashboards/Index.vue'
import Admin from './components/Admin/admin.vue'
import Trip from './components/TripRequests/Trip.vue'
import ScheduledRides from './components/TripRequests/ScheduledRides.vue'
import CancellationRides from './components/TripRequests/CancellationRides.vue'
import Zone from './components/Geofencing/zone/zone.vue'
import Airport from './components/Geofencing/airport/airport.vue'
import ServiceLocation from './components/Geofencing/servicelocations/servicelocations.vue'
import HeatMap from './components/Heatmap/heatmap.vue'
import Services from './components/Services/index.vue'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'login', component: Login, alias: ['/login', '/signin'] },
        { path: '/dashboard', name: 'dashboard', component: Dashboard, alias: '/home' },
        { path: '/admin', component: Admin },
        { path: '/trip', component: Trip, name: 'trip' },
        { path: '/ride', component: ScheduledRides, name: 'ride' },
        { path: '/cancelled', component: CancellationRides, name: 'cancelled' },
        { path: '/service-locations', component: ServiceLocation, name: 'service-location' },
        { path: '/zone', component: Zone, name: 'zone' },
        { path: '/airport', component: Airport, name: 'airport' },
        { path: '/heatmap', component: HeatMap, name: 'heatmap' },
        { path: '/services', component: Services, name: 'servicse' },


    ]
})

export default router