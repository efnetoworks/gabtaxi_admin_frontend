import Api from './Api'
export default {
    create(form) {
        return Api.post('/admin/service/category/add', form)
    },

    update(form) {
        return Api.post('/admin/service/category/update', form)
    },

    allcategories() {
        return Api.get('/admin/service/category/all')
    },

    deactivate(form) {
        return Api.post('admin/service/category/deactivate', form)
    }

}