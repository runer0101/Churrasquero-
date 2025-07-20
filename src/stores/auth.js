import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    token: null,
    userType: null // 'customer', 'churrasquero', 'admin'
  }),

  getters: {
    isCustomer: (state) => state.userType === 'customer',
    isChurrasquero: (state) => state.userType === 'churrasquero',
    isAdmin: (state) => state.userType === 'admin',
    
    userFullName: (state) => {
      if (!state.user) return ''
      return `${state.user.firstName} ${state.user.lastName}`
    }
  },

  actions: {
    async login(credentials) {
      try {
        // Simulación de login - en producción esto sería una llamada a la API
        const mockUser = {
          id: 1,
          email: credentials.email,
          firstName: 'Usuario',
          lastName: 'Demo',
          phone: '+54 11 1234-5678',
          address: 'Buenos Aires, Argentina'
        }

        this.user = mockUser
        this.isAuthenticated = true
        this.token = 'mock-jwt-token'
        this.userType = 'customer'
        
        this.saveToLocalStorage()
        return { success: true, user: mockUser }
      } catch (error) {
        return { success: false, error: error.message }
      }
    },

    async register(userData) {
      try {
        // Simulación de registro
        const newUser = {
          id: Date.now(),
          ...userData
        }

        this.user = newUser
        this.isAuthenticated = true
        this.token = 'mock-jwt-token'
        this.userType = 'customer'
        
        this.saveToLocalStorage()
        return { success: true, user: newUser }
      } catch (error) {
        return { success: false, error: error.message }
      }
    },

    logout() {
      this.user = null
      this.isAuthenticated = false
      this.token = null
      this.userType = null
      
      localStorage.removeItem('churasquero-auth')
    },

    saveToLocalStorage() {
      localStorage.setItem('churasquero-auth', JSON.stringify({
        user: this.user,
        isAuthenticated: this.isAuthenticated,
        token: this.token,
        userType: this.userType
      }))
    },

    loadFromLocalStorage() {
      const saved = localStorage.getItem('churasquero-auth')
      if (saved) {
        const data = JSON.parse(saved)
        this.user = data.user
        this.isAuthenticated = data.isAuthenticated
        this.token = data.token
        this.userType = data.userType
      }
    },

    updateProfile(profileData) {
      if (this.user) {
        this.user = { ...this.user, ...profileData }
        this.saveToLocalStorage()
      }
    }
  }
}) 