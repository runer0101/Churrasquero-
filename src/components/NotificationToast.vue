<template>
  <TransitionGroup 
    name="toast" 
    tag="div" 
    class="toast-container"
  >
    <div 
      v-for="toast in toasts" 
      :key="toast.id"
      :class="['toast', `toast-${toast.type}`]"
    >
      <div class="toast-icon">
        <span v-if="toast.type === 'success'">✅</span>
        <span v-else-if="toast.type === 'error'">❌</span>
        <span v-else-if="toast.type === 'warning'">⚠️</span>
        <span v-else>ℹ️</span>
      </div>
      
      <div class="toast-content">
        <h4 class="toast-title">{{ toast.title }}</h4>
        <p class="toast-message">{{ toast.message }}</p>
      </div>
      
      <button 
        class="toast-close"
        @click="removeToast(toast.id)"
      >
        ×
      </button>
    </div>
  </TransitionGroup>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const toasts = ref([])
let toastId = 0

const addToast = (toast) => {
  const id = ++toastId
  const newToast = {
    id,
    type: toast.type || 'info',
    title: toast.title,
    message: toast.message,
    duration: toast.duration || 5000
  }
  
  toasts.value.push(newToast)
  
  // Auto remove after duration
  setTimeout(() => {
    removeToast(id)
  }, newToast.duration)
}

const removeToast = (id) => {
  const index = toasts.value.findIndex(toast => toast.id === id)
  if (index > -1) {
    toasts.value.splice(index, 1)
  }
}

// Expose methods globally
onMounted(() => {
  window.$toast = {
    success: (title, message) => addToast({ type: 'success', title, message }),
    error: (title, message) => addToast({ type: 'error', title, message }),
    warning: (title, message) => addToast({ type: 'warning', title, message }),
    info: (title, message) => addToast({ type: 'info', title, message })
  }
})
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 400px;
}

.toast {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  background: white;
  border-radius: 0.75rem;
  padding: 1rem;
  box-shadow: var(--shadow-lg);
  border-left: 4px solid;
  animation: slideInRight 0.3s ease-out;
}

.toast-success {
  border-left-color: #10b981;
}

.toast-error {
  border-left-color: #ef4444;
}

.toast-warning {
  border-left-color: #f59e0b;
}

.toast-info {
  border-left-color: #3b82f6;
}

.toast-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}

.toast-content {
  flex: 1;
  min-width: 0;
}

.toast-title {
  margin: 0 0 0.25rem 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-gray-900);
}

.toast-message {
  margin: 0;
  font-size: 0.875rem;
  color: var(--color-gray-600);
  line-height: 1.4;
}

.toast-close {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: var(--color-gray-400);
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.toast-close:hover {
  background: var(--color-gray-100);
  color: var(--color-gray-600);
}

/* Animations */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 768px) {
  .toast-container {
    top: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
  }
  
  .toast {
    padding: 0.875rem;
  }
  
  .toast-title {
    font-size: 0.8rem;
  }
  
  .toast-message {
    font-size: 0.8rem;
  }
}
</style> 