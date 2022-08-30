export default [{
        name: 'Dashboard',
        icon: 'fa fa-tachometer',
        path: '/admin/overview'
    },
    {
        name: 'Admin',
        icon: 'fa fa-user-o',
        children: [{
                name: 'Admin',
                path: '/admin/all-admin'
            },
            {
                name: 'Create Admin',
                path: '/admin/create-admin'
            },
        ]
    },

    {
        name: 'Services',
        icon: 'fa fa-wrench',

        children: [{
                name: 'Locations',
                path: '/services/location'
            },
            {
                name: 'Value Added Services',
                path: '/services/value-added-services'
            },
            {
                name: 'Categories',
                path: '/services/categories'
            },
            {
                name: 'Types',
                path: '/services/types'
            },
            {
                name: 'Location Types',
                path: '/services/location-types'
            }
        ]
    },
    {
        name: 'Trips',
        icon: 'fa fa-car',
        path: '/trips'
    },
    {
        name: 'Devices',
        icon: 'fa fa-tablet',
        path: '/devices'
    },
    {
        name: 'Drivers',
        icon: 'fa fa-user',
        path: '/driver'
    },
    {
        name: 'Passengers',
        icon: 'fa fa-users',
        path: '/passenger'
    },
    {
        name: 'Push Notification',
        icon: 'fa fa-paper-plane',
        children: [{
                name: 'Notification History',
                path: '/notification/history'
            },
            {
                name: 'Send Notification',
                path: '/notification/send-notification'
            },
        ]

    },
    {
        name: 'Promotion',
        icon: 'fa fa-gift',
        children: [{
                name: 'Promotions',
                path: '/promotions/promocodes'
            },
            {
                name: 'Create Promotion',
                path: '/promotions/create-promocode'
            },
            {
                name: 'Promote Users',
                path: '/promotions/promote-users'
            }
        ]
    },
    {
        name: 'Geofence',
        icon: 'fa fa-globe',
        children: [{
                name: 'Geofence',
                path: '/geofence/geofence'
            },
            {
                name: 'Heat Map',
                path: '/geofence/heatmap'
            },
            {
                name: 'Zone',
                path: '/geofence/zone'
            },
        ]
    },
    {
        name: 'Accounting',
        icon: 'fa fa-money',
        children: [{
                name: 'Transactions',
                path: '/admin/account/transactions'
            },

            {
                name: 'General Report',
                path: '/admin/account/general-report'
            },
            {
                name: 'Drivers Report',
                path: '/admin/account/drivers-report'
            },
            {
                name: 'Passengers Report',
                path: '/admin/account/passengers-report'
            },
            {
                name: 'Trips',
                path: '/admin/account/trips'
            },

        ]
    },
    {
        name: 'General Settings',
        icon: 'fa fa-wrench',
        children: [{
            name: 'Trip Percentage',
            path: '/admin/account/trip-percentage'
        }, ]
    }

]