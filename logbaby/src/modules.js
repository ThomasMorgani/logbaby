import { date } from 'quasar'
const { buildDate, formatDate } = date

export default {
  logsGet: function () {
    return JSON.parse(localStorage.getItem('logs'))
  },
  logsSet: function (logs) {
    localStorage.setItem('logs', JSON.stringify(logs))
  },
  qDateToTimestamp (qDate) {
    // Takes front end formatted date and returns YYYY-MM-DD HH:mm:ss
    console.log(qDate)
    let a = buildDate(qDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
    console.log(a)
    return formatDate(qDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
  }
}
