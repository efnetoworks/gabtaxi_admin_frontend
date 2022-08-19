import Api from "./Api"

export default {
    devices() {
        return Api.get('/admin/all-devices')
    }
}
