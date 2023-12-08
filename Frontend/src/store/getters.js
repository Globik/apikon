export default {
  isOpenMenu (state) {
    return state.isOpenMenu
  },
  loading (state) {
    return state.loading
  },
  error (state) {
    return state.error
  },
  user (state) {
    return state.user
  },
  isLoggedIn (state) {
    return state.user !== null
  }
}
