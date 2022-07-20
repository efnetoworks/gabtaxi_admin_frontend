import Api from "./Api"

export default {
    countries() {
        return Api.get('/countries')
    },

    create(form) {
        return Api.post('/admin/service/location/add', form)
    },

    update(form) {
        return Api.post('/admin/service/location/update', form)
    },

    deactivate(form) {
        return Api.post('/admin/service/location/deactivate', form)
    },

    getAll() {
        return Api.get('/admin/service/location/all')
    }


}