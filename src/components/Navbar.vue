<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-content">
        <router-link to="/" class="logo">
          <span class="logo-icon">🔥</span>
          <span class="logo-text">Churasquero</span>
        </router-link>
        
        <div class="navbar-menu" :class="{ 'mobile-open': isMobileMenuOpen }">
          <router-link to="/" class="nav-link" @click="isMobileMenuOpen = false">
            Inicio
          </router-link>
          <router-link to="/menu" class="nav-link" @click="isMobileMenuOpen = false">
            Menú
          </router-link>
          <router-link to="/churrasqueros" class="nav-link" @click="isMobileMenuOpen = false">
            Churrasqueros
          </router-link>
          <router-link to="/reservas" class="nav-link" @click="isMobileMenuOpen = false">
            Reservas
          </router-link>
          <router-link to="/contacto" class="nav-link" @click="isMobileMenuOpen = false">
            Contacto
          </router-link>
        </div>
        
        <button class="mobile-menu-btn" @click="toggleMobileMenu" :class="{ 'active': isMobileMenuOpen }">
          <span class="hamburger"></span>
        </button>
        
        <div class="navbar-actions">
          <CartWidget />
          <div v-if="!isAuthenticated" class="auth-buttons">
            <button class="auth-btn" @click="openAuthModal('login')">
              Iniciar Sesión
            </button>
            <button class="auth-btn primary" @click="openAuthModal('register')">
              Registrarse
            </button>
          </div>
          <div v-else class="user-menu">
            <button class="user-btn" @click="toggleUserMenu">
              <span class="user-avatar">{{ userInitials }}</span>
              <span class="user-name">{{ userFullName }}</span>
            </button>
            <div v-if="isUserMenuOpen" class="user-dropdown">
              <router-link to="/perfil" class="dropdown-item">
                Mi Perfil
              </router-link>
              <router-link to="/pedidos" class="dropdown-item">
                Mis Pedidos
              </router-link>
              <button class="dropdown-item logout" @click="logout">
                Cerrar Sesión
              </button>
            </div>
          </div>
          <router-link to="/reservas" class="btn btn-primary order-btn">
            Reservar
          </router-link>
        </div>
      </div>
    </div>
    
    <!-- Auth Modal -->
    <AuthModal 
      :is-open="isAuthModalOpen"
      :initial-mode="authModalMode"
      @close="closeAuthModal"
      @success="handleAuthSuccess"
    />
  </nav>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import CartWidget from './CartWidget.vue'
import AuthModal from './AuthModal.vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const isMobileMenuOpen = ref(false)
const isUserMenuOpen = ref(false)
const isAuthModalOpen = ref(false)
const authModalMode = ref('login')

// Computed properties
const isAuthenticated = computed(() => authStore.isAuthenticated)
const user = computed(() => authStore.user)
const userFullName = computed(() => authStore.userFullName)
const userInitials = computed(() => {
  if (!user.value) return ''
  return `${user.value.firstName?.[0] || ''}${user.value.lastName?.[0] || ''}`.toUpperCase()
})

// Methods
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

const openAuthModal = (mode) => {
  authModalMode.value = mode
  isAuthModalOpen.value = true
}

const closeAuthModal = () => {
  isAuthModalOpen.value = false
}

const handleAuthSuccess = (user) => {
  console.log('Usuario autenticado:', user)
  // Aquí podrías mostrar una notificación de éxito
}

const logout = () => {
  authStore.logout()
  isUserMenuOpen.value = false
}

// Load auth state on mount
onMounted(() => {
  authStore.loadFromLocalStorage()
})
</script>

<style scoped>
.navbar {
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--color-primary-red);
  gap: 0.5rem;
}

.logo-icon {
  font-size: 1.5rem;
}

.logo-text {
  color: var(--color-gray-900);
}

.navbar-menu {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: var(--color-gray-700);
  font-weight: 500;
  transition: color 0.3s ease;
  padding: 0.5rem 0;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--color-primary-red);
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.auth-buttons {
  display: flex;
  gap: 0.5rem;
}

.auth-btn {
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--color-gray-700);
}

.auth-btn:hover {
  background: var(--color-gray-100);
}

.auth-btn.primary {
  background: var(--color-primary-red);
  color: white;
}

.auth-btn.primary:hover {
  background: var(--color-primary-brown);
}

.user-menu {
  position: relative;
}

.user-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--color-gray-700);
}

.user-btn:hover {
  background: var(--color-gray-100);
}

.user-avatar {
  width: 32px;
  height: 32px;
  background: var(--color-primary-red);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
}

.user-name {
  font-weight: 500;
  font-size: 0.9rem;
}

.user-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 0.5rem;
  box-shadow: var(--shadow-lg);
  min-width: 200px;
  z-index: 1000;
  overflow: hidden;
  animation: slideInDown 0.2s ease-out;
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: var(--color-gray-700);
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  transition: background 0.3s ease;
  font-size: 0.9rem;
}

.dropdown-item:hover {
  background: var(--color-gray-100);
}

.dropdown-item.logout {
  color: var(--color-primary-red);
  border-top: 1px solid var(--color-gray-200);
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.order-btn {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
  background: var(--color-primary-red);
  color: white;
}

.order-btn:hover {
  background: var(--color-primary-brown);
  transform: translateY(-1px);
}

.mobile-menu-btn {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.hamburger {
  width: 2rem;
  height: 0.25rem;
  background: var(--color-gray-700);
  border-radius: 10px;
  transition: all 0.3s linear;
  position: relative;
  transform-origin: 1px;
}

.hamburger::before,
.hamburger::after {
  content: '';
  position: absolute;
  width: 2rem;
  height: 0.25rem;
  background: var(--color-gray-700);
  border-radius: 10px;
  transition: all 0.3s linear;
}

.hamburger::before {
  transform: translateY(-8px);
}

.hamburger::after {
  transform: translateY(8px);
}

.mobile-menu-btn.active .hamburger {
  transform: rotate(45deg);
}

.mobile-menu-btn.active .hamburger::before {
  transform: rotate(90deg) translateY(0);
}

.mobile-menu-btn.active .hamburger::after {
  transform: rotate(90deg) translateY(0);
}

@media (max-width: 768px) {
  .navbar-menu {
    position: fixed;
    top: 0;
    right: -100%;
    width: 100%;
    height: 100vh;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    transition: right 0.3s ease;
    z-index: 99;
  }
  
  .navbar-menu.mobile-open {
    right: 0;
  }
  
  .nav-link {
    font-size: 1.25rem;
    padding: 1rem 2rem;
    width: 100%;
    text-align: center;
  }
  
  .mobile-menu-btn {
    display: flex;
  }
  
  .order-btn {
    display: none;
  }
}

@media (max-width: 480px) {
  .logo-text {
    font-size: 1.1rem;
  }
  
  .logo-icon {
    font-size: 1.25rem;
  }
  
  .nav-link {
    font-size: 1.1rem;
    padding: 0.875rem 1.5rem;
  }
}
</style> 