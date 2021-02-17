import CompaniesServices from '@/services/companiesServices.js'
import UsersServices from '@/services/usersServices.js'

export const state = () => ({
  companies: [],
  users: [],
})

export const mutations = {
  SET_COMPANIES(state, companiesDataList) {
    state.companies = companiesDataList
  },
  CLEAR_COMPANIES(state) {
    state.companies = null
  },
  SET_USERS(state, usersDataList) {
    state.users = usersDataList
  },
}

export const actions = {
  fetchCompanies({ commit }) {
    return CompaniesServices.getAllCompanies().then((response) => {
      if (response.data) {
        return commit('SET_COMPANIES', response.data)
      }
      throw new Error("L'entreprise n'existe pas")
    })
  },
  fetchUsers({ commit }) {
    return UsersServices.getAllUsers().then((response) => {
      if (response.data) {
        return commit('SET_USERS', response.data)
      }
      throw new Error("L'utilisateur n'existe pas")
    })
  },
  deleteMyCompanies({ commit }) {
    return CompaniesServices.deleteMyCompanies().then((response) => {
      if (response.data) {
        return commit('CLEAR_COMPANIES', response.data)
      }
      throw new Error('Problème pendant la suppression des entreprises')
    })
  },
}

export const getters = {
  getCompanyById: (state) => (companyId) =>
    state.companies.find((company) => companyId === company.id),
  getUserById: (state) => (userId) =>
    state.users.find((user) => userId === user.id),
}
