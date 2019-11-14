import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'
import mainStore from './main'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export const Store = new Vuex.Store({
  modules: {
    mainStore
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV
})

export default Store
