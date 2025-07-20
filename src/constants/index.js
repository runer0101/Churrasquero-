// App constants
export const APP_NAME = 'Churasquero'
export const APP_VERSION = '2.0.0'
export const APP_DESCRIPTION = 'La mejor churrasquería a domicilio de Buenos Aires'

// API configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'https://api.churasquero.com',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3
}

// Local storage keys
export const STORAGE_KEYS = {
  CART: 'churasquero-cart',
  AUTH: 'churasquero-auth',
  USER_PREFERENCES: 'churasquero-preferences',
  LAST_ORDER: 'last-order'
}

// Routes
export const ROUTES = {
  HOME: '/',
  MENU: '/menu',
  CHURRASQUEROS: '/churrasqueros',
  RESERVAS: '/reservas',
  CONTACTO: '/contacto',
  CHECKOUT: '/checkout',
  PEDIDO_CONFIRMADO: '/pedido-confirmado'
}

// Product categories
export const CATEGORIES = {
  CARNES: 'carnes',
  ACOMPAÑAMIENTOS: 'acompañamientos'
}

// Order status
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  READY: 'ready',
  DELIVERING: 'delivering',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
}

// User types
export const USER_TYPES = {
  CUSTOMER: 'customer',
  CHURRASQUERO: 'churrasquero',
  ADMIN: 'admin'
}

// Notification types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
}

// Delivery times
export const DELIVERY_TIMES = [
  '12:00', '13:00', '14:00', '15:00', '16:00',
  '17:00', '18:00', '19:00', '20:00', '21:00'
]

// Payment methods
export const PAYMENT_METHODS = {
  CASH: 'cash',
  CARD: 'card',
  TRANSFER: 'transfer'
}

// Validation rules
export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\+]?[0-9\s\-\(\)]{10,}$/,
  PRICE: /^\d+(\.\d{1,2})?$/
}

// Breakpoints
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1200
}

// Animation durations
export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500
}

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Error de conexión. Verifica tu internet.',
  AUTH_ERROR: 'Error de autenticación. Verifica tus credenciales.',
  VALIDATION_ERROR: 'Por favor, verifica los datos ingresados.',
  SERVER_ERROR: 'Error del servidor. Intenta más tarde.',
  UNKNOWN_ERROR: 'Error inesperado. Intenta nuevamente.'
} 