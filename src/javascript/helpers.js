export default {
    formatDate(date) {
        var date = new Date(date)
        return date.toDateString()
    },
    formatTime(date) {
        var time = new Date(date)
        let hours = time.getHours()
        let minutes = time.getMinutes()
        let seconds = time.getSeconds()
        var ampm = hours >= 12 ? 'pm' : 'am'
        return hours + ":" + minutes + " " + ampm

    },

}
