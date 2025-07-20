<template>
  <div class="pedido-confirmado">
    <Navbar />
    
    <div class="container">
      <div class="confirmation-content">
        <div class="confirmation-card">
          <div class="success-icon">
            <span>✅</span>
          </div>
          
          <h1>¡Pedido Confirmado!</h1>
          <p class="confirmation-message">
            Tu pedido ha sido recibido y está siendo procesado. Te enviaremos una confirmación por email.
          </p>
          
          <div class="order-details">
            <h3>Detalles del Pedido</h3>
            <div class="detail-item">
              <span class="label">Número de Pedido:</span>
              <span class="value">{{ orderNumber }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Fecha de Entrega:</span>
              <span class="value">{{ deliveryDate }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Hora de Entrega:</span>
              <span class="value">{{ deliveryTime }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Total:</span>
              <span class="value total">${{ orderTotal }}</span>
            </div>
          </div>
          
          <div class="next-steps">
            <h3>Próximos Pasos</h3>
            <ul>
              <li>Recibirás una confirmación por email en los próximos minutos</li>
              <li>Te notificaremos cuando tu pedido esté en camino</li>
              <li>Puedes rastrear tu pedido en la sección "Mis Pedidos"</li>
            </ul>
          </div>
          
          <div class="action-buttons">
            <router-link to="/" class="btn btn-secondary">
              Volver al Inicio
            </router-link>
            <router-link to="/pedidos" class="btn btn-primary">
              Ver Mis Pedidos
            </router-link>
          </div>
        </div>
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

const orderNumber = ref('')
const deliveryDate = ref('')
const deliveryTime = ref('')
const orderTotal = ref(0)

onMounted(() => {
  // Generar número de pedido aleatorio
  orderNumber.value = 'CH-' + Math.random().toString(36).substr(2, 9).toUpperCase()
  
  // Obtener datos del localStorage o usar valores por defecto
  const orderData = localStorage.getItem('last-order')
  if (orderData) {
    const data = JSON.parse(orderData)
    deliveryDate.value = data.deliveryDate || 'Mañana'
    deliveryTime.value = data.deliveryTime || '18:00'
    orderTotal.value = data.total || 0
  } else {
    // Valores por defecto
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    deliveryDate.value = tomorrow.toLocaleDateString('es-ES')
    deliveryTime.value = '18:00'
    orderTotal.value = 0
  }
})
</script>

<style scoped>
.pedido-confirmado {
  min-height: 100vh;
  background: var(--color-gray-50);
}

.confirmation-content {
  padding: 3rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
}

.confirmation-card {
  background: white;
  border-radius: 1rem;
  padding: 3rem;
  box-shadow: var(--shadow-xl);
  max-width: 600px;
  width: 100%;
  text-align: center;
}

.success-icon {
  margin-bottom: 2rem;
}

.success-icon span {
  font-size: 4rem;
  animation: bounce 0.6s ease-out;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.confirmation-card h1 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-gray-900);
  margin-bottom: 1rem;
}

.confirmation-message {
  font-size: 1.1rem;
  color: var(--color-gray-600);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.order-details {
  background: var(--color-gray-50);
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  text-align: left;
}

.order-details h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-gray-900);
  margin-bottom: 1rem;
  text-align: center;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--color-gray-200);
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-item .label {
  font-weight: 500;
  color: var(--color-gray-700);
}

.detail-item .value {
  font-weight: 600;
  color: var(--color-gray-900);
}

.detail-item .value.total {
  color: var(--color-primary-red);
  font-size: 1.1rem;
}

.next-steps {
  margin-bottom: 2rem;
  text-align: left;
}

.next-steps h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-gray-900);
  margin-bottom: 1rem;
  text-align: center;
}

.next-steps ul {
  list-style: none;
  padding: 0;
}

.next-steps li {
  padding: 0.5rem 0;
  color: var(--color-gray-600);
  position: relative;
  padding-left: 1.5rem;
}

.next-steps li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--color-primary-red);
  font-weight: bold;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.action-buttons .btn {
  padding: 0.875rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn-primary {
  background: var(--color-primary-red);
  color: white;
}

.btn-primary:hover {
  background: var(--color-primary-brown);
  transform: translateY(-2px);
}

.btn-secondary {
  background: transparent;
  color: var(--color-primary-red);
  border: 2px solid var(--color-primary-red);
}

.btn-secondary:hover {
  background: var(--color-primary-red);
  color: white;
}

@media (max-width: 768px) {
  .confirmation-card {
    padding: 2rem;
    margin: 1rem;
  }
  
  .confirmation-card h1 {
    font-size: 1.75rem;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .action-buttons .btn {
    width: 100%;
  }
}
</style> 