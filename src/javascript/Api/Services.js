import Api from "./Api"

export default {
    create(form) {
        return Api.post('/admin/services/add', form)
    },

    update(form) {
        return Api.post('/admin/services/update', form)
    },

    activate(form) {
        return Api.post('/admin/services/activate', form)
    },

    deactivate(form) {
        return Api.post('/admin/services/deactivate', form)
    },

    allservices() {
        return Api.get('/admin/services/all')
    }


}