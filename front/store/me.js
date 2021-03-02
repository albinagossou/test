/* eslint-disable no-console */
import MeService from '@/services/meService.js'

export const state = () => ({
  company: null,
  companyUsers: [],
})

export const mutations = {
  SET_COMPANY(state, companyData) {
    state.company = companyData
  },
  REMOVE_COMPANY(state) {
    state.company = null
  },
  SET_COMPANY_USERS(state, companyUsersDataList) {
    state.companyUsers = companyUsersDataList
  },
  ADD_USER_TO_MY_COMPANY(state, user) {
    state.companyUsers.push(user)
  },
  REMOVE_USER_FROM_MY_COMPANY(state, userId) {
    state.companyUsers = state.companyUsers.filter((user) => user.id !== userId)
  },
}

export const actions = {
  getProfile({ dispatch }) {
    return MeService.getMyProfile().then((response) => {
      if (response.data) {
        return dispatch('auth/setUserData', response.data, { root: true }).then(
          () => response.data
        )
      }
      throw new Error('Problème pendant le chargement du profil.')
    })
  },
  updateProfile({ dispatch }, profileData) {
    return MeService.updateMyProfile(profileData).then((response) => {
      if (response.data) {
        return dispatch('auth/setUserData', response.data, { root: true }).then(
          () => response.data
        )
      }
      throw new Error('Problème pendant la mise à jour du profil.')
    })
  },
  fetchMyCompany({ commit }) {
    return MeService.getMyCompany().then((response) => {
      if (response.data) {
        return commit('SET_COMPANY', response.data)
      }
      throw new Error('Pas encore dans une entreprise')
    })
  },
  createCompany({ commit }, companyData) {
    return MeService.createCompany(companyData).then((response) => {
      if (response.data) {
        return commit('SET_COMPANY', response.data)
      }
      throw new Error("Problème pendant la création de l'entreprise")
    })
  },
  updateCompany({ commit }, phone) {
    return MeService.updateCompany(phone).then((response) => {
      if (response.data) {
        return commit('SET_COMPANY', response.data)
      }
      throw new Error("Problème pendant la mise à jour de l'entreprise")
    })
  },

  deleteMyCompany({ commit }) {
    // console.log('cc')
    return MeService.deleteMyCompany().then((response) => {
      // console.log('cc')
      if (response.data) {
        return commit('REMOVE_COMPANY', response.data)
      }
      throw new Error("Problème pendant la suppression de l'entreprise")
    })
  },

  fetchMyCompanyUsers({ commit }) {
    return MeService.getMyCompanyUsers().then((response) => {
      if (response.data) {
        return commit('SET_COMPANY_USERS', response.data)
      }
      throw new Error(
        'Problème pendant le chargement des utilisateurs de mon entreprise'
      )
    })
  },
  addUserToMyCompany({ commit }, user) {
    console.log(user)
    return MeService.addUserToMyCompany(user.id).then((response) => {
      if (response.data) {
        return commit('ADD_USER_TO_MY_COMPANY', user)
      }
      throw new Error(
        "Problème pendant l'ajout de l'utilisateur à l'entreprise"
      )
    })
  },
  removeUserfromMyCompany({ commit }, userId) {
    return MeService.removeUserFromMyCompany(userId).then((response) => {
      if (response.data) {
        return commit('REMOVE_USER_FROM_MY_COMPANY', userId)
      }
      throw new Error(
        "Problème pendant la suppression de l'utilisateur de l'entreprise"
      )
    })
  },
}

export const getters = {}
