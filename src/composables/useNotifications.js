import { ref, readonly } from 'vue'

export function useNotifications() {
  const notifications = ref([])
  let notificationId = 0

  const addNotification = (notification) => {
    const id = ++notificationId
    const newNotification = {
      id,
      type: notification.type || 'info',
      title: notification.title,
      message: notification.message,
      duration: notification.duration || 5000,
      timestamp: Date.now()
    }

    notifications.value.push(newNotification)

    // Auto remove after duration
    setTimeout(() => {
      removeNotification(id)
    }, newNotification.duration)

    return id
  }

  const removeNotification = (id) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const clearAll = () => {
    notifications.value = []
  }

  // Convenience methods
  const success = (title, message, duration) => {
    return addNotification({ type: 'success', title, message, duration })
  }

  const error = (title, message, duration) => {
    return addNotification({ type: 'error', title, message, duration })
  }

  const warning = (title, message, duration) => {
    return addNotification({ type: 'warning', title, message, duration })
  }

  const info = (title, message, duration) => {
    return addNotification({ type: 'info', title, message, duration })
  }

  return {
    notifications: readonly(notifications),
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info
  }
} 