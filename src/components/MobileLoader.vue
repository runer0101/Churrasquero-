<template>
  <div v-if="isLoading" class="mobile-loader">
    <div class="loader-overlay">
      <div class="loader-content">
        <div class="loader-spinner">
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
        </div>
        <div class="loader-text">
          <h3 class="loader-title">{{ title }}</h3>
          <p class="loader-subtitle">{{ subtitle }}</p>
        </div>
        <div class="loader-progress" v-if="showProgress">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progress + '%' }"></div>
          </div>
          <span class="progress-text">{{ progress }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Cargando...'
  },
  subtitle: {
    type: String,
    default: 'Preparando tu experiencia'
  },
  showProgress: {
    type: Boolean,
    default: false
  },
  progress: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    default: 2000
  }
})

const emit = defineEmits(['complete'])

// Auto-progress simulation
const currentProgress = ref(0)

onMounted(() => {
  if (props.showProgress && props.isLoading) {
    simulateProgress()
  }
})

const simulateProgress = () => {
  const interval = setInterval(() => {
    if (currentProgress.value < 100) {
      currentProgress.value += Math.random() * 15
      if (currentProgress.value > 100) {
        currentProgress.value = 100
      }
    } else {
      clearInterval(interval)
      setTimeout(() => {
        emit('complete')
      }, 500)
    }
  }, 200)
}
</script>

<style scoped>
.mobile-loader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease;
}

.loader-overlay {
  background: white;
  border-radius: 1.5rem;
  padding: 3rem 2rem;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 90%;
  width: 400px;
  animation: slideUp 0.4s ease;
}

.loader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.loader-spinner {
  position: relative;
  width: 80px;
  height: 80px;
}

.spinner-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-top: 3px solid var(--color-primary-red);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.spinner-ring:nth-child(2) {
  width: 60px;
  height: 60px;
  top: 10px;
  left: 10px;
  border-top-color: var(--color-primary-brown);
  animation-delay: -0.3s;
}

.spinner-ring:nth-child(3) {
  width: 40px;
  height: 40px;
  top: 20px;
  left: 20px;
  border-top-color: var(--color-accent);
  animation-delay: -0.6s;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loader-text {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.loader-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-gray-900);
  margin: 0;
}

.loader-subtitle {
  font-size: 1rem;
  color: var(--color-gray-600);
  margin: 0;
  line-height: 1.5;
}

.loader-progress {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: var(--color-gray-200);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--gradient-primary);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-gray-700);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .loader-overlay {
    padding: 2.5rem 1.5rem;
    border-radius: 1rem;
  }
  
  .loader-spinner {
    width: 60px;
    height: 60px;
  }
  
  .spinner-ring:nth-child(2) {
    width: 45px;
    height: 45px;
    top: 7.5px;
    left: 7.5px;
  }
  
  .spinner-ring:nth-child(3) {
    width: 30px;
    height: 30px;
    top: 15px;
    left: 15px;
  }
  
  .loader-title {
    font-size: 1.25rem;
  }
  
  .loader-subtitle {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .loader-overlay {
    padding: 2rem 1rem;
    margin: 1rem;
  }
  
  .loader-spinner {
    width: 50px;
    height: 50px;
  }
  
  .spinner-ring:nth-child(2) {
    width: 37.5px;
    height: 37.5px;
    top: 6.25px;
    left: 6.25px;
  }
  
  .spinner-ring:nth-child(3) {
    width: 25px;
    height: 25px;
    top: 12.5px;
    left: 12.5px;
  }
  
  .loader-title {
    font-size: 1.1rem;
  }
  
  .loader-subtitle {
    font-size: 0.85rem;
  }
  
  .progress-bar {
    height: 6px;
  }
  
  .progress-text {
    font-size: 0.8rem;
  }
}
</style> 