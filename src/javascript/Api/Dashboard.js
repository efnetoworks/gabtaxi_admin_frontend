import axios from "axios"
import Api from "./Api"

export default {
    completedTrips() {
        return Api.get('/admin/completed/today')
    },

    cancelledTrips() {
        return Api.get('/admin/cancelled/today')
    },

    drivercompletedtrips() {
        return Api.get('/admin/drivertrip/today')
    },

    drivercancelledtrips() {
        return Api.get('/admin/drivercancelled/today')
    },

    onlineDrivers() {
        return axios.get('https://gab-taxi-app-default-rtdb.firebaseio.com/live_location.json')
    },

    allUsers() {
        return Api.get('/admin/all-users')
    }

}
