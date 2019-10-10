import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authorized: false,
    accessToken: localStorage.getItem('access_token') || '',
    refreshToken: localStorage.getItem('refresh_token') || '',
  },
  mutations: {
    SET_AUTHORIZED: (state, payload) => {
      state.authorized = payload
    },
    SET_ACCESS_TOKEN: (state, payload) => {
      state.accessToken = payload
    },
    SET_REFRESH_TOKEN: (state, payload) => {
      state.refreshToken = payload
    },
  },
  actions: {
    AUTHORIZATION: async(context, data) => {
      const response = await axios.get('/oauth/v2/token', {
        params: {
          client_id: process.env.VUE_APP_ID,
          client_secret: process.env.VUE_APP_SECRET,
          ...data 
        }
      })
      const accessToken = response.data.access_token
      const refreshToken = response.data.refresh_token
      localStorage.setItem('access_token', accessToken)
      localStorage.setItem('refresh_token', refreshToken)

      context.commit('SET_AUTHORIZED', true)
      context.commit('SET_ACCESS_TOKEN', accessToken)
      context.commit('SET_REFRESH_TOKEN', refreshToken)
      return response;
    },

    SIGNOUT: (context) => {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')

      context.commit('SET_AUTHORIZED', false)
      context.commit('SET_ACCESS_TOKEN', '')
      context.commit('SET_REFRESH_TOKEN', '')
    },

    GET_PHOTOS: async({context}, params) => {
      const response = await axios.get('/api/photos', {
        params: {
          [params.category]: true,
          page: params.currentPage,
          limit: params.limit
        }
      })
      return {
        images: response.data.data,
        totalItems: response.data.totalItems,
      }
    },
    POST_PHOTO: async({context}, params) => {
      let formData = new FormData()
      formData.append('file', params.file.raw)
      const response = await axios.post('/api/media_objects', formData);
      return response;
    },
  },
  getters: {
    AUTHORIZED: state => {
      return state.authorized
    },
    ACCESS_TOKEN: state => {
      return state.accessToken
    },
    REFRESH_TOKEN: state => {
      return state.refreshToken
    },
    isAuthenticated: state => !!state.accessToken,
  }
})