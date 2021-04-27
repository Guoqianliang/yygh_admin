import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登入
    Login({ commit }, userInfo) {
      // 硬编码
      const data = { 'token': 'admin' }
      // 将token存储在cookie中
      setToken(data.token)
      commit('SET_TOKEN', data.token)

      // const username = userInfo.username.trim()
      // return new Promise((resolve, reject) => {
      //   login(username, userInfo.password).then(response => {
      //     const data = response.data
      //     setToken(data.token)
      //     commit('SET_TOKEN', data.token)
      //     resolve()
      //   }).catch(error => {
      //     reject(error)
      //   })
      // })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {

      // 硬编码
      const data = { 'roles': 'admin', 'name': 'admin', 'avatar': 'https://wpimg.wallstcn.com/57ed425a-c71e-4201-9428-68760c0537c4.jpg' }
      if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
        commit('SET_ROLES', data.roles)
      } else {
        reject('getInfo: roles must be a non-null array !')
      }
      commit('SET_NAME', data.name)
      commit('SET_AVATAR', data.avatar)

      // return new Promise((resolve, reject) => {
      //   getInfo(state.token).then(response => {
      //     const data = response.data
      //     if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
      //       commit('SET_ROLES', data.roles)
      //     } else {
      //       reject('getInfo: roles must be a non-null array !')
      //     }
      //     commit('SET_NAME', data.name)
      //     commit('SET_AVATAR', data.avatar)

      //     resolve(response)
      //   }).catch(error => {
      //     reject(error)
      //   })
      // })
    },

    // 登出
    LogOut({ commit, state }) {

      // 硬编码
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()

      // return new Promise((resolve, reject) => {
      //   logout(state.token).then(() => {
      //     commit('SET_TOKEN', '')
      //     commit('SET_ROLES', [])
      //     removeToken()
      //     resolve()
      //   }).catch(error => {
      //     reject(error)
      //   })
      // })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      // 硬编码
      commit('SET_TOKEN', '')
      removeToken()
      resolve()


      // return new Promise(resolve => {
      //   commit('SET_TOKEN', '')
      //   removeToken()
      //   resolve()
      // })
    }
  }
}

export default user
