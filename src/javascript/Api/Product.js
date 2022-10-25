import Api from "./Api"

export default {
    create(form) {
        return Api.post('/product/create', form)
    },

    update(form, id) {
        return Api.post('/product/update/' + id, form)
    },

    delete(id) {
        return Api.post('/product/delete/' + id)
    },

    periodic_report(form, id) {
        return Api.post('/product/report/' + id, form)
    },

    all_report(id) {
        return Api.post('/product/report/all/' + id)
    },

    products() {
        return Api.get('/product')
    }
}