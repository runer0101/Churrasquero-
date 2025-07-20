<template>
  <div class="cart-widget">
    <button 
      class="cart-button"
      @click="toggleCart"
      :class="{ 'has-items': !isCartEmpty }"
    >
      <span class="cart-icon">🛒</span>
      <span v-if="!isCartEmpty" class="cart-count">{{ cartItemCount }}</span>
    </button>

    <!-- Cart Dropdown -->
    <div v-if="isCartOpen" class="cart-dropdown">
      <div class="cart-header">
        <h3>Tu Carrito</h3>
        <button class="close-cart" @click="closeCart">×</button>
      </div>

      <div v-if="isCartEmpty" class="cart-empty">
        <p>Tu carrito está vacío</p>
        <router-link to="/menu" class="btn btn-primary" @click="closeCart">
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
            <p class="item-price">${{ item.price }}</p>
          </div>
          
          <div class="item-controls">
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
        </div>

        <div class="cart-footer">
          <div class="cart-total">
            <span>Total:</span>
            <span class="total-price">${{ cartTotal }}</span>
          </div>
          
          <div class="cart-actions">
            <button class="btn btn-secondary" @click="clearCart">
              Vaciar
            </button>
            <router-link to="/checkout" class="btn btn-primary" @click="closeCart">
              Finalizar
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Cart Overlay -->
    <div v-if="isCartOpen" class="cart-overlay" @click="closeCart"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()
const isCartOpen = ref(false)

// Computed properties
const cartItems = computed(() => cartStore.items)
const cartTotal = computed(() => cartStore.cartTotal)
const cartItemCount = computed(() => cartStore.cartItemCount)
const isCartEmpty = computed(() => cartStore.isCartEmpty)

// Methods
const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value
}

const closeCart = () => {
  isCartOpen.value = false
}

const updateQuantity = (productId, quantity) => {
  cartStore.updateQuantity(productId, quantity)
}

const clearCart = () => {
  cartStore.clearCart()
  closeCart()
}

// Load cart from localStorage on mount
onMounted(() => {
  cartStore.loadFromLocalStorage()
})
</script>

<style scoped>
.cart-widget {
  position: relative;
}

.cart-button {
  position: relative;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-button:hover {
  background: rgba(220, 38, 38, 0.1);
  transform: scale(1.1);
}

.cart-button.has-items {
  color: var(--color-primary-red);
}

.cart-count {
  position: absolute;
  top: -5px;
  right: -5px;
  background: var(--color-primary-red);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.cart-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 350px;
  max-height: 500px;
  background: white;
  border-radius: 1rem;
  box-shadow: var(--shadow-xl);
  z-index: 1000;
  overflow: hidden;
  animation: slideInDown 0.3s ease-out;
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--color-gray-200);
  background: var(--color-gray-50);
}

.cart-header h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.close-cart {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--color-gray-500);
  padding: 0.25rem;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-cart:hover {
  background: var(--color-gray-200);
  color: var(--color-gray-700);
}

.cart-empty {
  padding: 2rem;
  text-align: center;
}

.cart-empty p {
  color: var(--color-gray-500);
  margin-bottom: 1rem;
}

.cart-items {
  max-height: 300px;
  overflow-y: auto;
  padding: 1rem;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--color-gray-100);
}

.cart-item:last-child {
  border-bottom: none;
}

.item-info h4 {
  margin: 0 0 0.25rem 0;
  font-size: 0.9rem;
  font-weight: 600;
}

.item-price {
  margin: 0;
  color: var(--color-primary-red);
  font-weight: 600;
  font-size: 0.9rem;
}

.item-controls {
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

.cart-footer {
  padding: 1rem;
  border-top: 1px solid var(--color-gray-200);
  background: var(--color-gray-50);
}

.cart-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 1.1rem;
}

.total-price {
  color: var(--color-primary-red);
  font-size: 1.2rem;
}

.cart-actions {
  display: flex;
  gap: 0.5rem;
}

.cart-actions .btn {
  flex: 1;
  padding: 0.5rem;
  font-size: 0.9rem;
}

.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

@media (max-width: 768px) {
  .cart-dropdown {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    max-width: 400px;
    border-radius: 0;
    max-height: none;
  }
  
  .cart-items {
    max-height: none;
    flex: 1;
  }
  
  .cart-footer {
    position: sticky;
    bottom: 0;
  }
}
</style> 