import Api from "./Api";

export default {
    alltrips() {
        return Api.get('/trip/alltrips')
    }
}