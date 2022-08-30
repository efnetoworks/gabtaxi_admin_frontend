import Api from "./Api"

export default {
    ban_driver(id) {
        return Api.post('/admin/drivers/' + id + '/ban')
    },
    unban_driver(id) {
        return Api.post('/admin/drivers/' + id + '/unban')
    },
    driver_resource(id) {
        return Api.get('/admin/drivers/' + id)
    },
    activate_driver(id) {
        return Api.post('/admin/driver/activate/' + id)
    },
    deactivate_driver(id) {
        return Api.post('/admin/driver/detactivate/' + id)
    },
    driver_data(id) {
        return Api.get('/admin/user/data/' + id)
    },
    user_wallet(id) {
        return Api.get('/admin/user-wallet/' + id)
    },
    transaction_history(id) {
        return Api.get('/payments/transactions/history/' + id)
    }

}