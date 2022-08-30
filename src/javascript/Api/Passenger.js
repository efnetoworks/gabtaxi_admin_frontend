import Api from "./Api"

export default {
    ban_passenger(form) {
        return Api.post('/admin/passenger/ban', form)
    },
    unban_passenger(id) {
        return Api.post('/admin/passenger/' + id + '/unban')
    },
    passenger_resource(id) {
        return Api.get('/admin/passenger/' + id)
    },
    update_passenger(form) {
        return Api.post('/admin/passenger/update', form)
    },
    activate_passenger(id) {
        return Api.post('/admin/passenger/activate/' + id)
    },
    deactivate_passenger(id) {
        return Api.post('/admin/passenger/detactivate/' + id)
    },
    passenger_data(id) {
        return Api.get('/admin/passenger/data/' + id)
    },
    user_wallet(id) {
        return Api.get('/admin/user-wallet/' + id)
    },
    transaction_history(id) {
        return Api.get('/payments/transactions/history/' + id)
    }
}