import { ref, computed, readonly } from 'vue'
import { useAuthStore } from '../stores/auth'

export function useAuth() {
  const authStore = useAuthStore()
  const isLoading = ref(false)
  const error = ref(null)

  // Computed properties
  const isAuthenticated = computed(() => authStore.isAuthenticated)
  const user = computed(() => authStore.user)
  const userFullName = computed(() => authStore.userFullName)
  const userInitials = computed(() => {
    if (!user.value) return ''
    return `${user.value.firstName?.[0] || ''}${user.value.lastName?.[0] || ''}`.toUpperCase()
  })

  // Methods
  const login = async (credentials) => {
    isLoading.value = true
    error.value = null
    
    try {
      const result = await authStore.login(credentials)
      if (!result.success) {
        error.value = result.error
      }
      return result
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      isLoading.value = false
    }
  }

  const register = async (userData) => {
    isLoading.value = true
    error.value = null
    
    try {
      const result = await authStore.register(userData)
      if (!result.success) {
        error.value = result.error
      }
      return result
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    authStore.logout()
    error.value = null
  }

  const updateProfile = (profileData) => {
    authStore.updateProfile(profileData)
  }

  return {
    // State
    isLoading: readonly(isLoading),
    error: readonly(error),
    
    // Computed
    isAuthenticated,
    user,
    userFullName,
    userInitials,
    
    // Methods
    login,
    register,
    logout,
    updateProfile
  }
} 