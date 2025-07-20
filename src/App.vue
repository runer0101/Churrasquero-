<script setup>
import MobileOptimizer from './components/MobileOptimizer.vue'
import NotificationToast from './components/NotificationToast.vue'
</script>

<template>
  <div id="app">
    <router-view />
    <MobileOptimizer />
    <NotificationToast />
  </div>
</template>

<style>
#app {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--color-gray-900);
  line-height: 1.6;
}

/* Add bottom padding for mobile bottom navigation */
@media (max-width: 768px) {
  #app {
    padding-bottom: 80px;
  }
}
</style>
