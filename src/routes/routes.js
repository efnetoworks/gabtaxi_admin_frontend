import DashboardLayout from '@/components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'
// Dashboard pages
const Overview = () =>
    import ( /* webpackChunkName: "widgets" */ '../components/Dashboard/Views/Dashboard/Overview.vue')
const Widgets = () =>
    import ( /* webpackChunkName: "widgets" */ '../components/Dashboard/Views/Dashboard/Widgets.vue')

import Login from '../components/Dashboard/Views/Pages/Login.vue'
import Lock from '../components/Dashboard/Views/Pages/Lock.vue'
import ServiceLocations from '@/components/Dashboard/Views/Services/ServiceLocations.vue'
import ServiceCategories from '@/components/Dashboard/Views/Services/ServiceCategories.vue'
import LocationServiceTypes from '@/components/Dashboard/Views/Services/LocationServiceTypes.vue'
import ServiceTypes from '@/components/Dashboard/Views/Services/ServiceTypes'
import VAS from '@/components/Dashboard/Views/Services/ValueAddedServices.vue'
import Trip from '@/components/Dashboard/Views/Trips/Trips.vue'
import Driver from '@/components/Dashboard/Views/Drivers/Drivers.vue'
import PushNotification from '@/components/Dashboard/Views/Notification/SendNotification.vue'
import NotificationHistory from '@/components/Dashboard/Views/Notification/History.vue'
import Devices from '@/components/Dashboard/Views/Device/Devices.vue'
import Promotions from '@/components/Dashboard/Views/Promotion/Promotions.vue'
import CreatePromocode from '@/components/Dashboard/Views/Promotion/Createpromotion.vue'
import Geofence from '@/components/Dashboard/Views/Geofencing/Geofence.vue'
import Heatmap from '@/components/Dashboard/Views/Geofencing/Heatmap.vue'
import Zone from '@/components/Dashboard/Views/Geofencing/Zones.vue'
import Admin from '@/components/Dashboard/Views/Admin/Admin.vue'
import CreateAdmin from '@/components/Dashboard/Views/Admin/CreateAdmin.vue'
import DriverDetails from '@/components/Dashboard/Views/Drivers/DriverDetails.vue'
import DriverUpdate from '@/components/Dashboard/Views/Drivers/DriverUpdate.vue'
import Passenger from '@/components/Dashboard/Views/Passengers/Passengers.vue'
import PassengerDetails from '@/components/Dashboard/Views/Passengers/PassengerDetails.vue'
import PassengerUpdate from '@/components/Dashboard/Views/Passengers/PassengerUpdate.vue'
import User from '@/javascript/Api/User'
import axios from 'axios'

let loginPage = {
    path: '/',
    name: 'Login',
    component: Login
}

let lockPage = {
    path: '/lock',
    name: 'Lock',
    component: Lock
}

let trips = {
    path: '/trips',
    name: 'trip',
    component: DashboardLayout,
    children: [{
        path: '/',
        name: 'Trips',
        component: Trip
    }]
}

let devices = {
    path: '/devices',
    name: 'devices',
    component: DashboardLayout,
    children: [{
        path: '/',
        name: 'Devices',
        component: Devices
    }]
}

let driver = {
    path: '/driver',
    name: 'Driver',
    component: DashboardLayout,
    children: [{
            path: '/',
            name: 'Driver',
            component: Driver
        },
        {
            path: 'details/:id',
            name: 'DriverDetails',
            component: DriverDetails
        },
        {
            path: 'update/:id',
            name: 'DriverUpdate',
            component: DriverUpdate
        }
    ]
}

let passenger = {
    path: '/passenger',
    name: 'Passenger',
    component: DashboardLayout,
    children: [{
            path: '/',
            name: 'Passenger',
            component: Passenger
        },
        {
            path: 'details/:id',
            name: 'PassengerDetails',
            component: PassengerDetails
        },
        {
            path: 'update/:id',
            name: 'PassengerUpdate',
            component: PassengerUpdate
        }
    ]
}

let services = {
    path: '/services',
    name: 'Services',
    component: DashboardLayout,
    children: [{
            path: 'location',
            name: 'ServiceLocation',
            component: ServiceLocations
        },
        {
            path: 'categories',
            name: 'ServiceCategory',
            component: ServiceCategories
        },
        {
            path: 'location-types',
            name: 'LocationServiceTypes',
            component: LocationServiceTypes
        },
        {
            path: 'types',
            name: 'ServiceTypes',
            component: ServiceTypes
        },
        {
            path: 'value-added-services',
            name: 'ValueAddedServices',
            component: VAS
        }
    ]
}

let notification = {
    path: '/notification',
    name: 'PushNotification',
    component: DashboardLayout,
    children: [{
            path: 'history',
            name: 'History',
            component: NotificationHistory
        },
        {
            path: 'send-notification',
            name: 'PushNotification',
            component: PushNotification
        },
    ]
}

let promotion = {
    path: '/promotions',
    name: 'promos',
    component: DashboardLayout,
    children: [{
            path: 'promocodes',
            name: 'Promotions',
            component: Promotions
        },
        {
            path: 'create-poromocode',
            name: 'CreatePromocode',
            component: CreatePromocode
        },
    ]
}

let geofence = {
    path: '/geofence',
    name: 'geofence',
    component: DashboardLayout,
    children: [{
            path: 'geofence',
            name: 'geofence',
            component: Geofence
        },
        {
            path: 'zone',
            name: 'Zones',
            component: Zone
        },
        {
            path: 'heatmap',
            name: 'Heatmap',
            component: Heatmap
        },
    ]
}

let admin = {
    path: '/admin',
    name: 'admin',
    component: DashboardLayout,
    children: [{
            path: 'all-admin',
            name: 'Admin',
            component: Admin
        },
        {
            path: 'create-admin',
            name: 'CrateAdmin',
            component: CreateAdmin
        },
    ]
}

const routes = [
    admin,
    loginPage,
    lockPage,
    services,
    geofence,
    driver,
    passenger,
    devices,
    trips,
    notification,
    promotion,
    {
        path: '/admin',
        component: DashboardLayout,
        name: 'dashboard',
        redirect: '/admin/overview',
        beforeEnter: (to, from, next) => {
            User.auth().then((result) => {
                if (result) {
                    next()
                } else {
                    return next({ name: 'Login' })
                }
            }).catch((err) => {
                return next({ name: 'Login' })
            })
        },
        children: [{
                path: 'overview',
                name: 'Overview',
                component: Overview
            },
            {
                path: 'widgets',
                name: 'Widgets',
                component: Widgets
            }
        ]
    },
    { path: '*', component: NotFound }
];

export default routes