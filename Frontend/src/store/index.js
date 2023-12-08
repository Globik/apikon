import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import plugins from './plugins'
// import userModule from './moduels/userModule'
// import commonModule from './moduels/commonModule'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins,
  modules: {
    // commonModule,
    // userModule
  }
})

if (module.hot) {
  module.hot.accept([
    './state',
    './getters',
    './mutations',
    './actions'
  ], () => {
    store.hotUpdate({
      state: require('./state').default,
      getters: require('./getters').default,
      mutations: require('./mutations').default,
      actions: require('./actions').default,
      modules: {
        // commonModule,
        // userModule
      }
    })
  })
}

export default store
