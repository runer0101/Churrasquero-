import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    total: 0,
    itemCount: 0
  }),

  getters: {
    cartTotal: (state) => {
      return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    
    cartItemCount: (state) => {
      return state.items.reduce((count, item) => count + item.quantity, 0)
    },
    
    isCartEmpty: (state) => {
      return state.items.length === 0
    }
  },

  actions: {
    addItem(product) {
      const existingItem = this.items.find(item => item.id === product.id)
      
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        this.items.push({
          ...product,
          quantity: 1
        })
      }
      
      this.updateTotals()
      this.saveToLocalStorage()
    },

    removeItem(productId) {
      const index = this.items.findIndex(item => item.id === productId)
      if (index > -1) {
        this.items.splice(index, 1)
        this.updateTotals()
        this.saveToLocalStorage()
      }
    },

    updateQuantity(productId, quantity) {
      const item = this.items.find(item => item.id === productId)
      if (item) {
        if (quantity <= 0) {
          this.removeItem(productId)
        } else {
          item.quantity = quantity
          this.updateTotals()
          this.saveToLocalStorage()
        }
      }
    },

    clearCart() {
      this.items = []
      this.updateTotals()
      this.saveToLocalStorage()
    },

    updateTotals() {
      this.total = this.cartTotal
      this.itemCount = this.cartItemCount
    },

    saveToLocalStorage() {
      localStorage.setItem('churasquero-cart', JSON.stringify({
        items: this.items,
        total: this.total,
        itemCount: this.itemCount
      }))
    },

    loadFromLocalStorage() {
      const saved = localStorage.getItem('churasquero-cart')
      if (saved) {
        const data = JSON.parse(saved)
        this.items = data.items || []
        this.total = data.total || 0
        this.itemCount = data.itemCount || 0
      }
    }
  }
}) 