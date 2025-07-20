// Validation utilities
export const validators = {
  required: (value) => {
    if (value === null || value === undefined || value === '') {
      return 'Este campo es requerido'
    }
    return true
  },

  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return 'Ingresa un email válido'
    }
    return true
  },

  minLength: (min) => (value) => {
    if (value && value.length < min) {
      return `Mínimo ${min} caracteres`
    }
    return true
  },

  maxLength: (max) => (value) => {
    if (value && value.length > max) {
      return `Máximo ${max} caracteres`
    }
    return true
  },

  phone: (value) => {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/
    if (!phoneRegex.test(value)) {
      return 'Ingresa un teléfono válido'
    }
    return true
  },

  price: (value) => {
    const priceRegex = /^\d+(\.\d{1,2})?$/
    if (!priceRegex.test(value)) {
      return 'Ingresa un precio válido'
    }
    return true
  },

  positiveNumber: (value) => {
    if (isNaN(value) || value <= 0) {
      return 'Debe ser un número positivo'
    }
    return true
  }
}

export function validateField(value, rules) {
  for (const rule of rules) {
    const result = rule(value)
    if (result !== true) {
      return result
    }
  }
  return true
}

export function validateForm(formData, validationSchema) {
  const errors = {}
  
  for (const [field, rules] of Object.entries(validationSchema)) {
    const value = formData[field]
    const error = validateField(value, rules)
    
    if (error !== true) {
      errors[field] = error
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
} 