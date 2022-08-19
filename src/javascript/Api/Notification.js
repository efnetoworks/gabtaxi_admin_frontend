import Api from "./Api"

export default {
    send_notification(form) {
        return Api.post('/admin/send-notification', form)
    },
    send_user_notifiction(form) {
        return Api.post('/admin/send-user-notification', form)
    },
    notification_history() {
        return Api.get('/admin/notification-history')
    }

}
