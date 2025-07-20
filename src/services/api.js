import axios from 'axios'

// Configuración base de axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.churasquero.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor para agregar token de autenticación
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('churasquero-auth')
    if (token) {
      const authData = JSON.parse(token)
      if (authData.token) {
        config.headers.Authorization = `Bearer ${authData.token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('churasquero-auth')
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)

// Servicios específicos
export const menuService = {
  getItems: () => api.get('/menu'),
  getCategories: () => api.get('/categories'),
  getItem: (id) => api.get(`/menu/${id}`)
}

export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  refreshToken: () => api.post('/auth/refresh'),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (profileData) => api.put('/auth/profile', profileData)
}

export const orderService = {
  createOrder: (orderData) => api.post('/orders', orderData),
  getOrders: () => api.get('/orders'),
  getOrder: (id) => api.get(`/orders/${id}`),
  updateOrder: (id, orderData) => api.put(`/orders/${id}`, orderData),
  cancelOrder: (id) => api.delete(`/orders/${id}`)
}

export const churrasqueroService = {
  getChurrasqueros: () => api.get('/churrasqueros'),
  getChurrasquero: (id) => api.get(`/churrasqueros/${id}`),
  getTopChurrasqueros: () => api.get('/churrasqueros/top'),
  getChurrasqueroReviews: (id) => api.get(`/churrasqueros/${id}/reviews`)
}

export const reservationService = {
  createReservation: (reservationData) => api.post('/reservations', reservationData),
  getReservations: () => api.get('/reservations'),
  getReservation: (id) => api.get(`/reservations/${id}`),
  updateReservation: (id, reservationData) => api.put(`/reservations/${id}`, reservationData),
  cancelReservation: (id) => api.delete(`/reservations/${id}`)
}

export const reviewService = {
  createReview: (reviewData) => api.post('/reviews', reviewData),
  getReviews: (params) => api.get('/reviews', { params }),
  getReview: (id) => api.get(`/reviews/${id}`),
  updateReview: (id, reviewData) => api.put(`/reviews/${id}`, reviewData),
  deleteReview: (id) => api.delete(`/reviews/${id}`)
}

export default api 