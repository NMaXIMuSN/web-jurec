export const state = () => ({
  authList: [],
})
export const mutations = {
  setAuthList(state, list) {
    state.authList = list.map((el) => {
      el.login_date = this.$dayjs(el.login_date).format('DD/MM/YYYY HH:mm')
      el.logout_date = this.$dayjs(el.logout_date).format('DD/MM/YYYY HH:mm')
      el.time_spent = this.$dayjs.duration(+el.time_spent * 1000).format('HH:mm:ss')

      return el
    })
  },
}

export const actions = {
  async fetchAuthList({commit}) {
    await this.$axios.get('user_activity')
      .then(({data}) => {
        commit('setAuthList', data)
      })
  },
}