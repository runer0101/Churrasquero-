import { computed } from 'vue'
import { useCartStore } from '../stores/cart'

export function useCart() {
  const cartStore = useCartStore()

  // Computed properties
  const items = computed(() => cartStore.items)
  const total = computed(() => cartStore.cartTotal)
  const itemCount = computed(() => cartStore.cartItemCount)
  const isEmpty = computed(() => cartStore.isCartEmpty)

  // Methods
  const addItem = (product) => {
    cartStore.addItem(product)
  }

  const removeItem = (productId) => {
    cartStore.removeItem(productId)
  }

  const updateQuantity = (productId, quantity) => {
    cartStore.updateQuantity(productId, quantity)
  }

  const clearCart = () => {
    cartStore.clearCart()
  }

  const getItemQuantity = (productId) => {
    const item = cartStore.items.find(item => item.id === productId)
    return item ? item.quantity : 0
  }

  const getItemTotal = (productId) => {
    const item = cartStore.items.find(item => item.id === productId)
    return item ? item.price * item.quantity : 0
  }

  return {
    // State
    items,
    total,
    itemCount,
    isEmpty,
    
    // Methods
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemQuantity,
    getItemTotal
  }
} 