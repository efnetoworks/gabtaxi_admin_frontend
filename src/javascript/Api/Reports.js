import Api from "./Api"

export default {
    general_report(form) {
        return Api.post('/report', form)
    }
}