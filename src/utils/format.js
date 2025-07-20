import { format, formatDistance, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

// Currency formatting
export function formatCurrency(amount, currency = 'ARS') {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: currency
  }).format(amount)
}

// Date formatting
export function formatDate(date, formatStr = 'dd/MM/yyyy') {
  if (!date) return ''
  
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, formatStr, { locale: es })
}

export function formatDateTime(date) {
  if (!date) return ''
  
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, 'dd/MM/yyyy HH:mm', { locale: es })
}

export function formatRelativeTime(date) {
  if (!date) return ''
  
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return formatDistance(dateObj, new Date(), { 
    addSuffix: true, 
    locale: es 
  })
}

// Phone number formatting
export function formatPhone(phone) {
  if (!phone) return ''
  
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '')
  
  // Format as +54 11 1234-5678
  if (cleaned.length === 10) {
    return `+54 ${cleaned.slice(0, 2)} ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`
  }
  
  return phone
}

// Weight formatting
export function formatWeight(grams) {
  if (grams >= 1000) {
    return `${(grams / 1000).toFixed(1)}kg`
  }
  return `${grams}g`
}

// Rating formatting
export function formatRating(rating) {
  return rating.toFixed(1)
}

// Text truncation
export function truncateText(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

// Slug generation
export function generateSlug(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-')
} 