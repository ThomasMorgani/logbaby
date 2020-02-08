export default {
  logsGet: function () {
    return JSON.parse(localStorage.getItem('logs'))
  },
  logsSet: function (logs) {
    localStorage.setItem('logs', JSON.stringify(logs))
  }
}
