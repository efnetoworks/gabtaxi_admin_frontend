import Api from "./Api"

export default {
    create(form) {
        return Api.post('/admin/service/types/add', form)
    },

    update(form) {
        return Api.post('/admin/service/types/update', form)
    },

    allservicetypes() {
        return Api.get('/admin/service/types/all')
    },

    deactivate(form) {
        return Api.post('/admin/service/types/deactivate', form)
    }
}