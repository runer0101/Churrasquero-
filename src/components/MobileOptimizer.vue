<template>
  <div class="mobile-optimizer">
    <!-- Floating Action Button para móviles -->
    <div v-if="isMobile" class="mobile-fab">
      <button 
        class="fab-button fab-primary"
        @click="scrollToTop"
        :class="{ 'fab-visible': showScrollButton }"
      >
        <span class="fab-icon">↑</span>
      </button>
      
      <button 
        class="fab-button fab-secondary"
        @click="toggleQuickMenu"
        :class="{ 'fab-visible': showQuickMenu }"
      >
        <span class="fab-icon">+</span>
      </button>
      
      <!-- Quick Menu para acciones rápidas -->
      <div class="quick-menu" :class="{ 'quick-menu-open': quickMenuOpen }">
        <router-link to="/menu" class="quick-menu-item" @click="closeQuickMenu">
          <span class="quick-icon">🍖</span>
          <span>Menú</span>
        </router-link>
        <router-link to="/reservas" class="quick-menu-item" @click="closeQuickMenu">
          <span class="quick-icon">📅</span>
          <span>Reservar</span>
        </router-link>
        <router-link to="/contacto" class="quick-menu-item" @click="closeQuickMenu">
          <span class="quick-icon">📞</span>
          <span>Contacto</span>
        </router-link>
      </div>
    </div>
    
    <!-- Mobile Bottom Navigation -->
    <div v-if="isMobile" class="mobile-bottom-nav">
      <router-link to="/" class="bottom-nav-item" :class="{ active: $route.path === '/' }">
        <span class="bottom-nav-icon">🏠</span>
        <span class="bottom-nav-text">Inicio</span>
      </router-link>
      <router-link to="/menu" class="bottom-nav-item" :class="{ active: $route.path === '/menu' }">
        <span class="bottom-nav-icon">🍖</span>
        <span class="bottom-nav-text">Menú</span>
      </router-link>
      <router-link to="/churrasqueros" class="bottom-nav-item" :class="{ active: $route.path === '/churrasqueros' }">
        <span class="bottom-nav-icon">👨‍🍳</span>
        <span class="bottom-nav-text">Chefs</span>
      </router-link>
      <router-link to="/reservas" class="bottom-nav-item" :class="{ active: $route.path === '/reservas' }">
        <span class="bottom-nav-icon">📅</span>
        <span class="bottom-nav-text">Reservar</span>
      </router-link>
    </div>
    
    <!-- Mobile Search Overlay -->
    <div v-if="isMobile && showSearchOverlay" class="mobile-search-overlay">
      <div class="search-overlay-header">
        <button class="close-search" @click="closeSearchOverlay">×</button>
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Buscar..."
          class="mobile-search-input"
          ref="searchInput"
        />
      </div>
      <div class="search-results" v-if="searchQuery">
        <div class="search-result-item" v-for="result in searchResults" :key="result.id">
          <router-link :to="result.link" @click="closeSearchOverlay">
            <span class="result-icon">{{ result.icon }}</span>
            <div class="result-content">
              <h4>{{ result.title }}</h4>
              <p>{{ result.description }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    
    <!-- Mobile Notification Banner -->
    <div v-if="isMobile && showNotification" class="mobile-notification">
      <div class="notification-content">
        <span class="notification-icon">🔥</span>
        <span class="notification-text">{{ notificationMessage }}</span>
      </div>
      <button class="notification-close" @click="closeNotification">×</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Reactive data
const isMobile = ref(false)
const showScrollButton = ref(false)
const showQuickMenu = ref(false)
const quickMenuOpen = ref(false)
const showSearchOverlay = ref(false)
const searchQuery = ref('')
const showNotification = ref(false)
const notificationMessage = ref('')

// Device detection
const checkDevice = () => {
  isMobile.value = window.innerWidth <= 768 || 
                   /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

// Scroll handling
const handleScroll = () => {
  showScrollButton.value = window.scrollY > 300
}

// Quick menu
const toggleQuickMenu = () => {
  quickMenuOpen.value = !quickMenuOpen.value
  showQuickMenu.value = quickMenuOpen.value
}

const closeQuickMenu = () => {
  quickMenuOpen.value = false
  showQuickMenu.value = false
}

// Scroll to top
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// Search functionality
const searchInput = ref(null)

const searchResults = computed(() => {
  if (!searchQuery.value) return []
  
  const query = searchQuery.value.toLowerCase()
  const results = []
  
  // Menu items
  const menuItems = [
    { id: 1, title: 'Bife de Chorizo', description: 'Corte premium', icon: '🥩', link: '/menu' },
    { id: 2, title: 'Ojo de Bife', description: 'Corte magro', icon: '🥩', link: '/menu' },
    { id: 3, title: 'Tira de Asado', description: 'Tradicional argentina', icon: '🥩', link: '/menu' },
    { id: 4, title: 'Vacío', description: 'Premium marmoleado', icon: '🥩', link: '/menu' }
  ]
  
  // Churrasqueros
  const churrasqueros = [
    { id: 5, title: 'Carlos González', description: 'Asados Argentinos', icon: '👨‍🍳', link: '/churrasqueros' },
    { id: 6, title: 'María Silva', description: 'Carnes Premium', icon: '👩‍🍳', link: '/churrasqueros' },
    { id: 7, title: 'Roberto Martínez', description: 'Parrilla Tradicional', icon: '👨‍🍳', link: '/churrasqueros' }
  ]
  
  const allItems = [...menuItems, ...churrasqueros]
  
  return allItems.filter(item => 
    item.title.toLowerCase().includes(query) ||
    item.description.toLowerCase().includes(query)
  )
})

const closeSearchOverlay = () => {
  showSearchOverlay.value = false
  searchQuery.value = ''
}

// Notifications
const showMobileNotification = (message) => {
  notificationMessage.value = message
  showNotification.value = true
  
  setTimeout(() => {
    closeNotification()
  }, 5000)
}

const closeNotification = () => {
  showNotification.value = false
}

// Lifecycle
onMounted(() => {
  checkDevice()
  window.addEventListener('resize', checkDevice)
  window.addEventListener('scroll', handleScroll)
  
  // Show welcome notification on mobile
  if (isMobile.value) {
    setTimeout(() => {
      showMobileNotification('¡Bienvenido! Desliza para explorar nuestro menú')
    }, 1000)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', checkDevice)
  window.removeEventListener('scroll', handleScroll)
})

// Watch for route changes
watch(() => route.path, () => {
  closeQuickMenu()
  closeSearchOverlay()
})
</script>

<style scoped>
.mobile-optimizer {
  position: relative;
  z-index: 1000;
}

/* Floating Action Buttons */
.mobile-fab {
  position: fixed;
  bottom: 80px;
  right: 20px;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.fab-button {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  opacity: 0;
  transform: scale(0);
}

.fab-button.fab-visible {
  opacity: 1;
  transform: scale(1);
}

.fab-primary {
  background: var(--gradient-primary);
  color: white;
}

.fab-secondary {
  background: var(--gradient-secondary);
  color: white;
}

.fab-button:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.4);
}

/* Quick Menu */
.quick-menu {
  position: fixed;
  bottom: 140px;
  right: 20px;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  opacity: 0;
  transform: scale(0.8) translateY(20px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}

.quick-menu.quick-menu-open {
  opacity: 1;
  transform: scale(1) translateY(0);
  pointer-events: all;
}

.quick-menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: var(--color-gray-700);
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.quick-menu-item:hover {
  background: var(--color-gray-100);
  color: var(--color-primary-red);
}

.quick-icon {
  font-size: 1.25rem;
}

/* Bottom Navigation */
.mobile-bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-around;
  padding: 0.5rem 0;
  z-index: 1000;
}

.bottom-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: var(--color-gray-600);
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  min-width: 60px;
}

.bottom-nav-item.active {
  color: var(--color-primary-red);
  background: rgba(220, 38, 38, 0.1);
}

.bottom-nav-icon {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.bottom-nav-text {
  font-size: 0.75rem;
  font-weight: 600;
}

/* Search Overlay */
.mobile-search-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 1002;
  display: flex;
  flex-direction: column;
}

.search-overlay-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-bottom: 1px solid var(--color-gray-200);
}

.close-search {
  background: none;
  border: none;
  font-size: 2rem;
  color: var(--color-gray-600);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.close-search:hover {
  background: var(--color-gray-100);
  color: var(--color-gray-800);
}

.mobile-search-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid var(--color-gray-200);
  border-radius: 0.5rem;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s ease;
}

.mobile-search-input:focus {
  border-color: var(--color-primary-red);
}

.search-results {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.search-result-item {
  margin-bottom: 1rem;
}

.search-result-item a {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  text-decoration: none;
  color: var(--color-gray-700);
  transition: all 0.2s ease;
}

.search-result-item a:hover {
  background: var(--color-gray-50);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.result-icon {
  font-size: 2rem;
}

.result-content h4 {
  margin: 0 0 0.25rem 0;
  color: var(--color-gray-900);
  font-size: 1rem;
}

.result-content p {
  margin: 0;
  color: var(--color-gray-600);
  font-size: 0.875rem;
}

/* Notification Banner */
.mobile-notification {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--gradient-primary);
  color: white;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1003;
  animation: slideDown 0.3s ease;
}

.notification-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.notification-icon {
  font-size: 1.25rem;
}

.notification-text {
  font-size: 0.9rem;
  font-weight: 500;
}

.notification-close {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.notification-close:hover {
  background: rgba(255, 255, 255, 0.2);
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .mobile-fab {
    bottom: 70px;
    right: 15px;
  }
  
  .fab-button {
    width: 50px;
    height: 50px;
    font-size: 1.25rem;
  }
  
  .quick-menu {
    bottom: 120px;
    right: 15px;
  }
  
  .bottom-nav-item {
    min-width: 50px;
    padding: 0.375rem;
  }
  
  .bottom-nav-icon {
    font-size: 1.25rem;
  }
  
  .bottom-nav-text {
    font-size: 0.7rem;
  }
}
</style> 