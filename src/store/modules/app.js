import Cookies from 'js-cookie'

const state = {
  sidebar: Cookies.get('sidebar') ? !!+Cookies.get('sidebarStatus') : true,
}

const getters= {
  sidebar: state => state.app.sidebar,
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar = !state.sidebar
    Cookies.set('sidebar', state.sidebar)
  },
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  }
}

export default {
  getters,
  state,
  mutations,
  actions
}
