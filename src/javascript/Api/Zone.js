import axios from "axios"
import Api from "./Api"

export default{
    all_zones(){
        return Api.get('/admin/zone')
    },

    active_zones(){
        return Api.get('/admin/zone/active')
    },
    inactive_zones(){
        return Api.get('/admin/zone/inactive')
    },

    create_zone(form){
        return Api.post('/admin/zone/create', form)
    },

    update_zone(form){
        return Api.post('/admin/zone/update', form)
    },

    deactivate_zone(form){
        return Api.post('/admin/zone/deactivate', form)
    },

    activate_zone(form){
        return Api.post('/admin/zone/activate', form)
    },

    getCoordDetails(lat, lng){
        return axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&key=AIzaSyA0N1ua-tQG7S3D_t2c1Jnbde6hO0hJLm4")
    }

    
}