import modules from '../modules.js'
import { colors, Notify } from 'quasar'

export const mainStore = {
  namespaced: false,
  state: {
    darkMode: false,
    notifiyDefaults: {
      classes: ['notificationClass'],
      closeBtn: true,
      position: 'top-right',
      progress: true,
      timeout: 3000,
      type: 'info'
    },
    logCategories: [
      {
        icon: 'mdi-sleep',
        text: 'Sleep',
        color: 'red',
        id: 1
      },
      {
        icon: 'mdi-bottle-wine',
        text: 'Bottle Feed',
        color: 'blue',
        id: 2
      },
      {
        icon: 'mdi-mother-nurse',
        text: 'Breast Feed',
        color: 'orange',
        id: 3
      },
      {
        icon: 'mdi-water',
        text: 'Potty Liquid',
        color: 'green',
        id: 4
      },
      {
        icon: 'mdi-emoticon-poop',
        text: 'Potty Solid',
        color: 'brown',
        id: 5
      }
    ],
    logSelected: null,
    logs: [],
    theme: {
      // Defaults, api will overwrite
      disabled: 'indigo-2',
      primary: '#027BE3',
      secondary: '#fff',
      accent: '#9C27B0',
      dark: '#1d1d1d',
      positive: '#21BA',
      negative: '#C10015',
      info: '#31CCEC',
      warning: '#F2C037'
    }
  },
  getters: {},
  mutations: {
    pushStateItem(state, data) {
      state[data.key].push(data.value)
    },
    setStateItem(state, data) {
      state[data.key] = data.value
    }
  },
  actions: {
    initializeLogs({ commit }) {
      const logs = modules.logsGet()
      commit('setStateItem', { key: 'logs', value: logs || [] })
    },
    logAdd({ commit, state }, log) {
      return new Promise(resolve => {
        let id =
          state.logs.length > 0 ? state.logs[state.logs.length - 1].id + 1 : 1
        const newLog = { ...log, id: id }
        commit('pushStateItem', { key: 'logs', value: newLog })
        modules.logsSet(state.logs)
        resolve({ status: 'success', data: newLog })
      })
    },
    logSelect({ commit }, data) {
      commit('setStateItem', { key: 'logSelected', value: data })
    },
    notify({ state }, data) {
      console.log(data)
      console.log({
        ...state.notifiyDefaults,
        ...data
      })
      Notify.create({
        ...state.notifiyDefaults,
        ...data
      })
    },
    themeSet({ commit, state }) {
      return new Promise(resolve => {
        const darkMode = localStorage.getItem('darkMode') || false
        commit('setStateItem', { key: 'darkMode', value: JSON.parse(darkMode) })
        console.log(darkMode)
        console.log(state.darkMode)
        Object.keys(state.theme).forEach(color => {
          colors.setBrand(color, state.theme[color])
        })
        resolve('hi')
      })
    },
    toggleStateItem({ state, commit }, item) {
      console.log(!state[item])
      commit('setStateItem', { key: item, value: !state[item] })
    }
  }
}

export default mainStore
