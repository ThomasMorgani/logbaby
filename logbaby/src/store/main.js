import modules from '../modules.js'
export const mainStore = {
  namespaced: false,
  state: {
    logCategories: [
      {
        icon: 'mdi-sleep',
        text: 'Sleep',
        color: 'red',
        id: 1
      },
      {
        icon: 'mdi-baby-bottle',
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
    logSelected: {},
    logs: []
  },
  getters: {},
  mutations: {
    pushStateItem (state, data) {
      state[data.key].push(data.value)
    },
    setStateItem (state, data) {
      state[data.key] = data.value
    }
  },
  actions: {
    initializeLogs ({ commit }) {
      const logs = modules.logsGet()
      commit('setStateItem', { key: 'logs', value: logs })
    },
    logAdd ({ commit, state }, log) {
      return new Promise((resolve, reject) => {
        let id = state.logs.length > 0 ? state.logs[state.logs.length - 1].id + 1 : 1
        commit('pushStateItem', { key: 'logs', value: { ...log, id: id } })
        modules.logsSet(state.logs)
        resolve()
      })
    },
    logSelect ({ commit }, data) {
      commit('setStateItem', { key: 'logSelected', value: data })
    }
  }
}

export default mainStore
