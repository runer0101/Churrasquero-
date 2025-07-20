<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    :type="type"
    @click="handleClick"
  >
    <span v-if="loading" class="loading-spinner"></span>
    <slot v-else />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline', 'danger', 'ghost'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'button'
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const buttonClasses = computed(() => [
  'base-button',
  `base-button--${props.variant}`,
  `base-button--${props.size}`,
  {
    'base-button--disabled': props.disabled,
    'base-button--loading': props.loading,
    'base-button--full-width': props.fullWidth
  }
])

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

/* Variants */
.base-button--primary {
  background: var(--gradient-primary);
  color: var(--color-white);
  box-shadow: var(--shadow-md);
}

.base-button--primary:hover:not(.base-button--disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.base-button--secondary {
  background: var(--gradient-secondary);
  color: var(--color-white);
  box-shadow: var(--shadow-md);
}

.base-button--secondary:hover:not(.base-button--disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.base-button--outline {
  background: transparent;
  color: var(--color-primary-red);
  border: 2px solid var(--color-primary-red);
}

.base-button--outline:hover:not(.base-button--disabled) {
  background: var(--color-primary-red);
  color: var(--color-white);
}

.base-button--danger {
  background: #ef4444;
  color: var(--color-white);
  box-shadow: var(--shadow-md);
}

.base-button--danger:hover:not(.base-button--disabled) {
  background: #dc2626;
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.base-button--ghost {
  background: transparent;
  color: var(--color-gray-700);
}

.base-button--ghost:hover:not(.base-button--disabled) {
  background: var(--color-gray-100);
}

/* Sizes */
.base-button--small {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  min-height: 36px;
}

.base-button--medium {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  min-height: 44px;
}

.base-button--large {
  padding: 1rem 2rem;
  font-size: 1.125rem;
  min-height: 52px;
}

/* States */
.base-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

.base-button--loading {
  cursor: wait;
}

.base-button--full-width {
  width: 100%;
}

/* Loading spinner */
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

/* Focus styles */
.base-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.3);
}

/* Responsive */
@media (max-width: 768px) {
  .base-button--large {
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }
}
</style> 