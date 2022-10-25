import Api from "./Api"

export default {
    new_sale(form) {
        return Api.post('/sell', form)
    },
    all_sales() {
        return Api.get('/sell/all')
    },
    periodic_report(form) {
        return Api.post('/sell/periodic', form)
    },
    sales_today() {
        return Api.post('/sell/today')
    }
}