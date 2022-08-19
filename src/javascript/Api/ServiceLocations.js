import Api from "./Api"

export default{
    countries(){
        return Api.get('/countries')
    },

    all_locations(){
        return Api.get('/admin/servicelocations')
    },

    create(form){
        return Api.post('/admin/addlocation', form)
    },

    update(form){
        return Api.post('/admin/editlocation', form)
    },

    deactivate(form){
        return Api.post('/admin/location/deactivate', form)
    },

    activate(form){
        return Api.post('/admin/location/activate', form)
    },

    activeLocations(){
        return Api.get('/admin/location/active')
    },

    inactiveLocations(){
        return Api.get('/admin/location/inactive')
    }
}