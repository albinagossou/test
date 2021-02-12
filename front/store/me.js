import MeService from '@/services/meService.js'

export const state = () => ({
  company: null,
})

export const mutations = {
  SET_COMPANY(state, companyData) {
    state.company = companyData
  },
  REMOVE_COMPANY(state) {
    console.log('test')
    state.company = null
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
}

export const getters = {}
