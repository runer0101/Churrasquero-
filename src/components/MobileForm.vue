<template>
  <div class="mobile-form">
    <form @submit.prevent="handleSubmit" class="form-container">
      <div class="form-header">
        <h2 class="form-title">{{ title }}</h2>
        <p class="form-subtitle">{{ subtitle }}</p>
      </div>
      
      <div class="form-fields">
        <slot name="fields">
          <!-- Default form fields -->
          <div class="form-group" v-for="field in fields" :key="field.name">
            <label :for="field.name" class="form-label">
              {{ field.label }}
              <span v-if="field.required" class="required">*</span>
            </label>
            
            <!-- Text Input -->
            <input 
              v-if="field.type === 'text' || field.type === 'email' || field.type === 'tel'"
              :type="field.type"
              :id="field.name"
              :name="field.name"
              v-model="formData[field.name]"
              :placeholder="field.placeholder"
              :required="field.required"
              :autocomplete="field.autocomplete"
              class="form-input"
              :class="{ 'error': errors[field.name] }"
              @blur="validateField(field.name)"
            />
            
            <!-- Select Input -->
            <select 
              v-else-if="field.type === 'select'"
              :id="field.name"
              :name="field.name"
              v-model="formData[field.name]"
              :required="field.required"
              class="form-input"
              :class="{ 'error': errors[field.name] }"
              @blur="validateField(field.name)"
            >
              <option value="">{{ field.placeholder }}</option>
              <option 
                v-for="option in field.options" 
                :key="option.value" 
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
            
            <!-- Textarea -->
            <textarea 
              v-else-if="field.type === 'textarea'"
              :id="field.name"
              :name="field.name"
              v-model="formData[field.name]"
              :placeholder="field.placeholder"
              :required="field.required"
              :rows="field.rows || 3"
              class="form-input"
              :class="{ 'error': errors[field.name] }"
              @blur="validateField(field.name)"
            ></textarea>
            
            <!-- Date Input -->
            <input 
              v-else-if="field.type === 'date'"
              type="date"
              :id="field.name"
              :name="field.name"
              v-model="formData[field.name]"
              :required="field.required"
              :min="field.min"
              :max="field.max"
              class="form-input"
              :class="{ 'error': errors[field.name] }"
              @blur="validateField(field.name)"
            />
            
            <!-- Error message -->
            <div v-if="errors[field.name]" class="error-message">
              {{ errors[field.name] }}
            </div>
          </div>
        </slot>
      </div>
      
      <div class="form-actions">
        <button 
          type="submit" 
          class="btn btn-primary btn-large submit-btn"
          :disabled="isSubmitting || hasErrors"
        >
          <span v-if="isSubmitting" class="loading-spinner"></span>
          <span v-if="isSubmitting">{{ submittingText }}</span>
          <span v-else>{{ submitText }}</span>
        </button>
        
        <button 
          v-if="showCancel"
          type="button" 
          class="btn btn-secondary cancel-btn"
          @click="handleCancel"
        >
          {{ cancelText }}
        </button>
      </div>
    </form>
    
    <!-- Mobile Form Tips -->
    <div v-if="showTips" class="mobile-form-tips">
      <div class="tip-item">
        <span class="tip-icon">💡</span>
        <span class="tip-text">Usa el autocompletado para llenar más rápido</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">📱</span>
        <span class="tip-text">Los campos se ajustan automáticamente</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Formulario'
  },
  subtitle: {
    type: String,
    default: 'Completa los datos requeridos'
  },
  fields: {
    type: Array,
    default: () => []
  },
  initialData: {
    type: Object,
    default: () => ({})
  },
  submitText: {
    type: String,
    default: 'Enviar'
  },
  submittingText: {
    type: String,
    default: 'Enviando...'
  },
  cancelText: {
    type: String,
    default: 'Cancelar'
  },
  showCancel: {
    type: Boolean,
    default: false
  },
  showTips: {
    type: Boolean,
    default: true
  },
  validationRules: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['submit', 'cancel', 'validation-error'])

// Reactive data
const formData = ref({ ...props.initialData })
const errors = ref({})
const isSubmitting = ref(false)

// Computed
const hasErrors = computed(() => {
  return Object.keys(errors.value).length > 0
})

// Validation functions
const validateField = (fieldName) => {
  const value = formData.value[fieldName]
  const field = props.fields.find(f => f.name === fieldName)
  
  if (!field) return
  
  // Clear previous error
  errors.value[fieldName] = ''
  
  // Required validation
  if (field.required && (!value || value.trim() === '')) {
    errors.value[fieldName] = `${field.label} es requerido`
    return
  }
  
  // Email validation
  if (field.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      errors.value[fieldName] = 'Email inválido'
      return
    }
  }
  
  // Phone validation
  if (field.type === 'tel' && value) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/
    if (!phoneRegex.test(value)) {
      errors.value[fieldName] = 'Teléfono inválido'
      return
    }
  }
  
  // Custom validation
  if (props.validationRules[fieldName]) {
    const customError = props.validationRules[fieldName](value)
    if (customError) {
      errors.value[fieldName] = customError
      return
    }
  }
}

const validateForm = () => {
  errors.value = {}
  
  props.fields.forEach(field => {
    validateField(field.name)
  })
  
  return !hasErrors.value
}

// Form submission
const handleSubmit = async () => {
  if (!validateForm()) {
    emit('validation-error', errors.value)
    return
  }
  
  isSubmitting.value = true
  
  try {
    await emit('submit', formData.value)
  } catch (error) {
    console.error('Form submission error:', error)
  } finally {
    isSubmitting.value = false
  }
}

const handleCancel = () => {
  emit('cancel')
}

// Watch for initial data changes
watch(() => props.initialData, (newData) => {
  formData.value = { ...newData }
}, { deep: true })

// Initialize form data
const initializeFormData = () => {
  const initialData = {}
  props.fields.forEach(field => {
    initialData[field.name] = props.initialData[field.name] || ''
  })
  formData.value = initialData
}

// Initialize on mount
initializeFormData()
</script>

<style scoped>
.mobile-form {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.form-container {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.form-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-gray-900);
  margin-bottom: 0.5rem;
}

.form-subtitle {
  color: var(--color-gray-600);
  font-size: 1rem;
  line-height: 1.5;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-weight: 600;
  color: var(--color-gray-700);
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.required {
  color: var(--color-primary-red);
  font-weight: bold;
}

.form-input {
  padding: 1rem;
  border: 2px solid var(--color-gray-200);
  border-radius: 0.75rem;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: white;
  width: 100%;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary-red);
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.form-input.error {
  border-color: var(--color-red-500);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.error-message {
  color: var(--color-red-500);
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.form-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.submit-btn {
  width: 100%;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 1rem;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.cancel-btn {
  width: 100%;
  padding: 0.875rem 2rem;
  font-size: 1rem;
  border-radius: 1rem;
  background: var(--color-gray-100);
  color: var(--color-gray-700);
  border: 2px solid var(--color-gray-200);
}

.loading-spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.mobile-form-tips {
  margin-top: 2rem;
  padding: 1rem;
  background: var(--color-gray-50);
  border-radius: 0.75rem;
  border-left: 4px solid var(--color-primary-red);
}

.tip-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  color: var(--color-gray-600);
}

.tip-item:last-child {
  margin-bottom: 0;
}

.tip-icon {
  font-size: 1rem;
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .form-container {
    padding: 1.5rem;
    margin: 1rem;
    border-radius: 0.75rem;
  }
  
  .form-title {
    font-size: 1.5rem;
  }
  
  .form-subtitle {
    font-size: 0.9rem;
  }
  
  .form-input {
    padding: 0.875rem;
    font-size: 1rem;
    border-radius: 0.5rem;
  }
  
  .submit-btn {
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }
  
  .form-fields {
    gap: 1.25rem;
  }
}

@media (max-width: 480px) {
  .form-container {
    padding: 1rem;
    margin: 0.5rem;
  }
  
  .form-title {
    font-size: 1.25rem;
  }
  
  .form-input {
    padding: 0.75rem;
    font-size: 0.95rem;
  }
  
  .submit-btn {
    padding: 0.75rem 1.25rem;
    font-size: 0.95rem;
  }
  
  .mobile-form-tips {
    margin-top: 1.5rem;
    padding: 0.875rem;
  }
  
  .tip-item {
    font-size: 0.8rem;
  }
}

/* Touch-friendly improvements */
.form-input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.form-input[type="date"] {
  min-height: 44px;
}

.form-input[type="tel"] {
  font-size: 1rem;
}

/* Autocomplete styling */
.form-input:-webkit-autofill,
.form-input:-webkit-autofill:hover,
.form-input:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0px 1000px white inset;
  -webkit-text-fill-color: var(--color-gray-900);
}
</style> 