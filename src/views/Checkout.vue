<template>
  <div class="checkout">
    <Navbar />
    
    <div class="container">
      <div class="checkout-content">
        <div class="checkout-header">
          <h1>Finalizar Pedido</h1>
          <p>Revisa tu pedido y completa la información de entrega</p>
        </div>
        
        <div class="checkout-grid">
          <!-- Resumen del Pedido -->
          <div class="order-summary">
            <h2>Resumen del Pedido</h2>
            
            <div v-if="cartItems.length === 0" class="empty-cart">
              <p>Tu carrito está vacío</p>
              <router-link to="/menu" class="btn btn-primary">
                Ver Menú
              </router-link>
            </div>
            
            <div v-else class="cart-items">
              <div 
                v-for="item in cartItems" 
                :key="item.id"
                class="cart-item"
              >
                <div class="item-info">
                  <h4>{{ item.name }}</h4>
                  <p class="item-description">{{ item.description }}</p>
                </div>
                
                <div class="item-quantity">
                  <button 
                    class="quantity-btn"
                    @click="updateQuantity(item.id, item.quantity - 1)"
                  >
                    -
                  </button>
                  <span class="quantity">{{ item.quantity }}</span>
                  <button 
                    class="quantity-btn"
                    @click="updateQuantity(item.id, item.quantity + 1)"
                  >
                    +
                  </button>
                </div>
                
                <div class="item-price">
                  ${{ item.price * item.quantity }}
                </div>
              </div>
              
              <div class="cart-totals">
                <div class="total-line">
                  <span>Subtotal:</span>
                  <span>${{ cartTotal }}</span>
                </div>
                <div class="total-line">
                  <span>Envío:</span>
                  <span>${{ deliveryFee }}</span>
                </div>
                <div class="total-line total">
                  <span>Total:</span>
                  <span>${{ totalWithDelivery }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Formulario de Entrega -->
          <div class="delivery-form">
            <h2>Información de Entrega</h2>
            
            <form @submit.prevent="submitOrder" class="checkout-form">
              <div class="form-row">
                <div class="form-group">
                  <label for="firstName">Nombre</label>
                  <input 
                    id="firstName"
                    v-model="form.firstName"
                    type="text"
                    required
                    class="form-input"
                  />
                </div>
                
                <div class="form-group">
                  <label for="lastName">Apellido</label>
                  <input 
                    id="lastName"
                    v-model="form.lastName"
                    type="text"
                    required
                    class="form-input"
                  />
                </div>
              </div>
              
              <div class="form-group">
                <label for="email">Email</label>
                <input 
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="form-input"
                />
              </div>
              
              <div class="form-group">
                <label for="phone">Teléfono</label>
                <input 
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  required
                  class="form-input"
                />
              </div>
              
              <div class="form-group">
                <label for="address">Dirección</label>
                <textarea 
                  id="address"
                  v-model="form.address"
                  required
                  rows="3"
                  class="form-input"
                  placeholder="Calle, número, piso, departamento..."
                ></textarea>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="city">Ciudad</label>
                  <input 
                    id="city"
                    v-model="form.city"
                    type="text"
                    required
                    class="form-input"
                  />
                </div>
                
                <div class="form-group">
                  <label for="postalCode">Código Postal</label>
                  <input 
                    id="postalCode"
                    v-model="form.postalCode"
                    type="text"
                    required
                    class="form-input"
                  />
                </div>
              </div>
              
              <div class="form-group">
                <label for="instructions">Instrucciones de Entrega (opcional)</label>
                <textarea 
                  id="instructions"
                  v-model="form.instructions"
                  rows="2"
                  class="form-input"
                  placeholder="Código de acceso, referencia, etc..."
                ></textarea>
              </div>
              
              <div class="form-group">
                <label for="deliveryDate">Fecha de Entrega</label>
                <input 
                  id="deliveryDate"
                  v-model="form.deliveryDate"
                  type="date"
                  required
                  class="form-input"
                  :min="minDeliveryDate"
                />
              </div>
              
              <div class="form-group">
                <label for="deliveryTime">Hora de Entrega</label>
                <select 
                  id="deliveryTime"
                  v-model="form.deliveryTime"
                  required
                  class="form-input"
                >
                  <option value="">Selecciona una hora</option>
                  <option value="12:00">12:00</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                  <option value="20:00">20:00</option>
                  <option value="21:00">21:00</option>
                </select>
              </div>
              
              <div class="form-actions">
                <button 
                  type="submit" 
                  class="btn btn-primary"
                  :disabled="isSubmitting || cartItems.length === 0"
                >
                  {{ isSubmitting ? 'Procesando...' : `Confirmar Pedido - $${totalWithDelivery}` }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

const router = useRouter()
const cartStore = useCartStore()
const authStore = useAuthStore()

const isSubmitting = ref(false)

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  instructions: '',
  deliveryDate: '',
  deliveryTime: ''
})

// Computed properties
const cartItems = computed(() => cartStore.items)
const cartTotal = computed(() => cartStore.cartTotal)
const deliveryFee = computed(() => cartTotal.value > 5000 ? 0 : 500)
const totalWithDelivery = computed(() => cartTotal.value + deliveryFee.value)

const minDeliveryDate = computed(() => {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0]
})

// Methods
const updateQuantity = (productId, quantity) => {
  cartStore.updateQuantity(productId, quantity)
}

const submitOrder = async () => {
  if (cartItems.value.length === 0) {
    alert('Tu carrito está vacío')
    return
  }
  
  isSubmitting.value = true
  
  try {
    const orderData = {
      items: cartItems.value,
      customer: {
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        email: form.value.email,
        phone: form.value.phone
      },
      delivery: {
        address: form.value.address,
        city: form.value.city,
        postalCode: form.value.postalCode,
        instructions: form.value.instructions,
        date: form.value.deliveryDate,
        time: form.value.deliveryTime
      },
      total: totalWithDelivery.value,
      deliveryFee: deliveryFee.value
    }
    
    // Aquí iría la llamada a la API
    console.log('Orden enviada:', orderData)
    
    // Guardar datos del pedido para la página de confirmación
    localStorage.setItem('last-order', JSON.stringify({
      deliveryDate: form.value.deliveryDate,
      deliveryTime: form.value.deliveryTime,
      total: totalWithDelivery.value
    }))
    
    // Simular éxito
    setTimeout(() => {
      cartStore.clearCart()
      router.push('/pedido-confirmado')
    }, 2000)
    
  } catch (error) {
    alert('Error al procesar el pedido: ' + error.message)
  } finally {
    isSubmitting.value = false
  }
}

// Load user data if authenticated
onMounted(() => {
  if (authStore.isAuthenticated && authStore.user) {
    const user = authStore.user
    form.value.firstName = user.firstName || ''
    form.value.lastName = user.lastName || ''
    form.value.email = user.email || ''
    form.value.phone = user.phone || ''
    form.value.address = user.address || ''
  }
  
  // Set default delivery date
  form.value.deliveryDate = minDeliveryDate.value
})
</script>

<style scoped>
.checkout {
  min-height: 100vh;
  background: var(--color-gray-50);
}

.checkout-content {
  padding: 2rem 0;
}

.checkout-header {
  text-align: center;
  margin-bottom: 2rem;
}

.checkout-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-gray-900);
  margin-bottom: 0.5rem;
}

.checkout-header p {
  color: var(--color-gray-600);
  font-size: 1.1rem;
}

.checkout-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.order-summary,
.delivery-form {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: var(--shadow);
}

.order-summary h2,
.delivery-form h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--color-gray-900);
}

.empty-cart {
  text-align: center;
  padding: 2rem;
}

.empty-cart p {
  color: var(--color-gray-500);
  margin-bottom: 1rem;
}

.cart-items {
  margin-bottom: 1.5rem;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-gray-200);
}

.cart-item:last-child {
  border-bottom: none;
}

.item-info h4 {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  font-weight: 600;
}

.item-description {
  margin: 0;
  font-size: 0.875rem;
  color: var(--color-gray-600);
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-btn {
  background: var(--color-gray-100);
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  transition: all 0.3s ease;
}

.quantity-btn:hover {
  background: var(--color-primary-red);
  color: white;
}

.quantity {
  min-width: 20px;
  text-align: center;
  font-weight: 600;
}

.item-price {
  font-weight: 600;
  color: var(--color-primary-red);
}

.cart-totals {
  border-top: 2px solid var(--color-gray-200);
  padding-top: 1rem;
}

.total-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.total-line.total {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-primary-red);
  border-top: 1px solid var(--color-gray-200);
  padding-top: 0.5rem;
  margin-top: 0.5rem;
}

.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--color-gray-700);
}

.form-input {
  padding: 0.75rem;
  border: 1px solid var(--color-gray-300);
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary-red);
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.form-input[type="date"],
.form-input[type="time"] {
  font-family: inherit;
}

.form-actions {
  margin-top: 1.5rem;
}

.form-actions .btn {
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
}

@media (max-width: 768px) {
  .checkout-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .order-summary,
  .delivery-form {
    padding: 1.5rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .checkout-header h1 {
    font-size: 1.75rem;
  }
}
</style> 