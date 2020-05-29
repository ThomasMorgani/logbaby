import { date } from 'quasar'
<<<<<<< HEAD
const { buildDate, formatDate } = date

=======
const { isValid, formatDate, getDateDiff } = date
>>>>>>> 832610cea88aabc058eec237bfe9eb1dd7579f4d
export default {
  logsGet: function () {
    return JSON.parse(localStorage.getItem('logs'))
  },
  logsSet: function (logs) {
    localStorage.setItem('logs', JSON.stringify(logs))
  },
<<<<<<< HEAD
  qDateToTimestamp (qDate) {
    // Takes front end formatted date and returns YYYY-MM-DD HH:mm:ss
    console.log(qDate)
    let a = buildDate(qDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
    console.log(a)
    return formatDate(qDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
=======
  dateFormatDisplayed: function (date) {
    if (!isValid(date)) {
      console.log('ERR: invalid date passed')
      console.log('rcvd', date)
      return false
    } else {
      const now = new Date()
      const currentYear = now.getFullYear()
      let formatNow = formatDate(now, 'YYYY-MM-DD')
      // console.log(date)
      if (date.substring(0, 10) === formatNow.substring(0, 10)) {
        return `Today${date.substring(10, 19)}`
      } else if (Number(date.substring(8, 10)) === Number(formatNow.substring(8, 10) - 1)) {
        return `Yesterday${date.substring(10, 20)}`
      } else if (currentYear === Number(formatNow.substring(0, 4))) {
        return date.substring(5, 20)
      } else {
        return date
      }
    }
  },
  dateDifferenceDisplayed: function (date1, date2) {
    if (!isValid(date1) || !isValid(date2)) {
      console.log('ERR: invalid date passed')
      console.log('rcvd', date1, date2)
      return false
    } else {
      let lengthStr = ''
      let secondsLeft = Math.abs(getDateDiff(date1, date2, 'seconds'))
      let measurements = [
        { unit: 'days', operator: 86400 },
        { unit: 'hours', operator: 3600 },
        { unit: 'minutes', operator: 60 },
        { unit: 'seconds', operator: 1 }
      ]
      measurements.forEach(m => {
        let measurement = Math.floor(secondsLeft / m.operator)
        console.log(m.unit)
        console.log(measurement)
        console.log(secondsLeft)
        console.log(lengthStr)
        if (measurement >= 1) {
          lengthStr = lengthStr + `${measurement} ${m.unit}, `
          secondsLeft -= (measurement * m.operator)
        }
      })
      let lastCharacter = lengthStr.substring(lengthStr.length - 2)
      console.log(lastCharacter)
      return lastCharacter === ', ' ? lengthStr.substring(0, lengthStr.length - 2) : length
    }
>>>>>>> 832610cea88aabc058eec237bfe9eb1dd7579f4d
  }
}
