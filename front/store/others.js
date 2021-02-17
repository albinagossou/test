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
    state.companies = []
  },
  ADD_COMPANY(state, company) {
    state.companies.push(company)
  },
  REMOVE_COMPANY(state, companyId) {
    // state.companies = [{id: x}, {id: y}, ...]
    state.companies = state.companies.filter(
      (company) => company.id !== companyId
    )
    // state.companies = [{id: y}, ...]
  },
  UPDATE_COMPANY(state, companyData) {
    // récupérer l'index correspondant

    const i = state.companies.findIndex(
      (company) => company.id === companyData.id
    )
    // puis modifier l'élément à cet index
    state.companies[i] = companyData
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
  clearMyCompanies({ commit }) {
    return commit('CLEAR_COMPANIES')
  },
  addCompanyToCompanies({ commit }, company) {
    return commit('ADD_COMPANY', company)
  },
  removeCompanyById({ commit }, companyId) {
    return commit('ADD_COMPANY', companyId)
  },
  updateCompany({ commit }, companyData) {
    return commit('UPDATE_COMPANY', companyData)
  },
}

export const getters = {
  getCompanyById: (state) => (companyId) =>
    state.companies.find((company) => companyId === company.id),
  getUserById: (state) => (userId) =>
    state.users.find((user) => userId === user.id),
}

/* const companies = [
  { id: 1, name: 'A' },
  { id: 2, name: 'B' },
  { id: 3, name: 'C' },
  { id: 4, name: 'D' },
]

// find company with id = 2
companies.find((company) => company.id === 2)
// { id: 2, name: 'B' }

// remove all companies with id > 3
companies.filter((company) => company.id <= 3)
// [
//   { id: 1, name: 'A' },
//   { id: 2, name: 'B' },
//   { id: 3, name: 'C' },
// ]
companies.find((company) => company.id <= 3)
//   { id: 1, name: 'A' }

// remove a specific company (id = companyId)
companies.filter((company) => company.id !== companyId)

SELECT * FROM users WHERE users.salary < 1000
users.filter((user) => user.salary < 1000)  */
