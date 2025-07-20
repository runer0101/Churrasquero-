<template>
  <div v-if="isOpen" class="auth-modal">
    <div class="modal-overlay" @click="closeModal"></div>
    
    <div class="modal-content">
      <div class="modal-header">
        <h2>{{ isLogin ? 'Iniciar Sesión' : 'Registrarse' }}</h2>
        <button class="close-btn" @click="closeModal">×</button>
      </div>
      
      <div class="modal-body">
        <form @submit.prevent="handleSubmit" class="auth-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              id="email"
              v-model="form.email"
              type="email" 
              required
              placeholder="tu@email.com"
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input 
              id="password"
              v-model="form.password"
              type="password" 
              required
              placeholder="••••••••"
              class="form-input"
            />
          </div>
          
          <div v-if="!isLogin" class="form-group">
            <label for="firstName">Nombre</label>
            <input 
              id="firstName"
              v-model="form.firstName"
              type="text" 
              required
              placeholder="Tu nombre"
              class="form-input"
            />
          </div>
          
          <div v-if="!isLogin" class="form-group">
            <label for="lastName">Apellido</label>
            <input 
              id="lastName"
              v-model="form.lastName"
              type="text" 
              required
              placeholder="Tu apellido"
              class="form-input"
            />
          </div>
          
          <div v-if="!isLogin" class="form-group">
            <label for="phone">Teléfono</label>
            <input 
              id="phone"
              v-model="form.phone"
              type="tel" 
              required
              placeholder="+54 11 1234-5678"
              class="form-input"
            />
          </div>
          
          <div class="form-actions">
            <button 
              type="submit" 
              class="btn btn-primary"
              :disabled="isLoading"
            >
              {{ isLoading ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Registrarse') }}
            </button>
          </div>
        </form>
        
        <div class="auth-switch">
          <p>
            {{ isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?' }}
            <button 
              class="switch-btn" 
              @click="toggleMode"
              type="button"
            >
              {{ isLogin ? 'Registrarse' : 'Iniciar Sesión' }}
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useAuthStore } from '../stores/auth'

const props = defineProps({
  isOpen: Boolean,
  initialMode: {
    type: String,
    default: 'login' // 'login' or 'register'
  }
})

const emit = defineEmits(['close', 'success'])

const authStore = useAuthStore()
const isLogin = ref(props.initialMode === 'login')
const isLoading = ref(false)

const form = reactive({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  phone: ''
})

const closeModal = () => {
  emit('close')
  resetForm()
}

const toggleMode = () => {
  isLogin.value = !isLogin.value
  resetForm()
}

const resetForm = () => {
  Object.keys(form).forEach(key => {
    form[key] = ''
  })
}

const handleSubmit = async () => {
  isLoading.value = true
  
  try {
    let result
    
    if (isLogin.value) {
      result = await authStore.login({
        email: form.email,
        password: form.password
      })
    } else {
      result = await authStore.register({
        email: form.email,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone
      })
    }
    
    if (result.success) {
      if (window.$toast) {
        window.$toast.success('¡Bienvenido!', 'Has iniciado sesión correctamente')
      }
      emit('success', result.user)
      closeModal()
    } else {
      if (window.$toast) {
        window.$toast.error('Error', result.error || 'Error en la autenticación')
      } else {
        alert(result.error || 'Error en la autenticación')
      }
    }
  } catch (error) {
    if (window.$toast) {
      window.$toast.error('Error', 'Error inesperado: ' + error.message)
    } else {
      alert('Error inesperado: ' + error.message)
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.auth-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal-content {
  position: relative;
  background: white;
  border-radius: 1rem;
  box-shadow: var(--shadow-xl);
  width: 100%;
  max-width: 400px;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideInUp 0.3s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-gray-200);
}

.modal-header h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-gray-900);
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--color-gray-500);
  padding: 0.25rem;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: var(--color-gray-200);
  color: var(--color-gray-700);
}

.modal-body {
  padding: 1.5rem;
}

.auth-form {
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--color-gray-700);
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--color-gray-300);
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary-red);
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.form-actions {
  margin-top: 1.5rem;
}

.form-actions .btn {
  width: 100%;
  padding: 0.875rem;
  font-size: 1rem;
}

.auth-switch {
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid var(--color-gray-200);
}

.auth-switch p {
  margin: 0;
  color: var(--color-gray-600);
}

.switch-btn {
  background: none;
  border: none;
  color: var(--color-primary-red);
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.3s ease;
}

.switch-btn:hover {
  color: var(--color-primary-brown);
}

@media (max-width: 480px) {
  .modal-content {
    margin: 0;
    border-radius: 0;
    max-height: 100vh;
  }
  
  .modal-header,
  .modal-body {
    padding: 1rem;
  }
}
</style> 