<!-- Vista completa de todos los churrasqueros -->
<template>
  <div class="churrasqueros-page">
    <Navbar />
    
    <section class="churrasqueros-hero">
      <div class="container">
        <h1>Nuestros Churrasqueros</h1>
        <p>Los mejores parrilleros profesionales de Buenos Aires</p>
      </div>
    </section>

    <section class="churrasqueros-list">
      <div class="container">
        <div class="search-box">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Buscar churrasquero..."
            class="search-input"
          />
        </div>

        <div class="churrasqueros-grid">
          <div 
            v-for="churrasquero in filteredChurrasqueros" 
            :key="churrasquero.id"
            class="churrasquero-card"
          >
            <div class="churrasquero-avatar">
              <span class="avatar-icon">{{ churrasquero.avatar }}</span>
              <div class="ranking-badge" v-if="churrasquero.ranking <= 3">
                <span class="medal">{{ getMedal(churrasquero.ranking) }}</span>
              </div>
            </div>
            
            <div class="churrasquero-info">
              <h3 class="churrasquero-name">{{ churrasquero.nombre }}</h3>
              <p class="churrasquero-specialty">{{ churrasquero.especialidad }}</p>
              <div class="rating">
                <span v-for="star in 5" :key="star" class="star">★</span>
                <span class="rating-score">{{ churrasquero.rating }}</span>
              </div>
              <div class="churrasquero-stats">
                <span>🔥 {{ churrasquero.asados }} asados</span>
                <span>⭐ {{ churrasquero.satisfaccion }}% satisfacción</span>
              </div>
            </div>
            
            <div class="churrasquero-actions">
              <button class="btn btn-primary">Contactar</button>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { ref, computed } from 'vue'

const searchQuery = ref('')

const churrasqueros = ref([
  {
    id: 1,
    nombre: 'Carlos "El Maestro" González',
    especialidad: 'Asados Argentinos',
    avatar: '👨‍🍳',
    rating: 4.9,
    reviews: 127,
    asados: 1234,
    satisfaccion: 98,
    ranking: 1
  },
  {
    id: 2,
    nombre: 'María "La Reina del Asado" Silva',
    especialidad: 'Carnes Premium',
    avatar: '👩‍🍳',
    rating: 4.8,
    reviews: 98,
    asados: 987,
    satisfaccion: 96,
    ranking: 2
  },
  {
    id: 3,
    nombre: 'Roberto "El Parrillero" Martínez',
    especialidad: 'Parrilla Tradicional',
    avatar: '👨‍🍳',
    rating: 4.7,
    reviews: 156,
    asados: 1567,
    satisfaccion: 94,
    ranking: 3
  },
  {
    id: 4,
    nombre: 'Ana "La Especialista" Rodríguez',
    especialidad: 'Eventos Premium',
    avatar: '👩‍🍳',
    rating: 4.6,
    reviews: 89,
    asados: 756,
    satisfaccion: 92,
    ranking: 4
  },
  {
    id: 5,
    nombre: 'Luis "El Carbonero" Pérez',
    especialidad: 'Carbon y Brasas',
    avatar: '👨‍🍳',
    rating: 4.5,
    reviews: 203,
    asados: 1890,
    satisfaccion: 90,
    ranking: 5
  }
])

const filteredChurrasqueros = computed(() => {
  if (!searchQuery.value) return churrasqueros.value
  
  return churrasqueros.value.filter(churrasquero =>
    churrasquero.nombre.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    churrasquero.especialidad.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const getMedal = (ranking) => {
  const medals = { 1: '🥇', 2: '🥈', 3: '🥉' }
  return medals[ranking] || ''
}
</script>

<style scoped>
.churrasqueros-page {
  min-height: 100vh;
}

.churrasqueros-hero {
  background: linear-gradient(135deg, var(--color-primary-red), var(--color-primary-brown));
  color: var(--color-white);
  padding: 3rem 0;
  text-align: center;
}

.churrasqueros-hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.churrasqueros-hero p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.churrasqueros-list {
  padding: 3rem 0;
  background-color: var(--color-gray-50);
}

.search-box {
  margin-bottom: 2rem;
}

.search-input {
  width: 100%;
  max-width: 400px;
  padding: 0.75rem 1rem;
  border: 2px solid var(--color-gray-200);
  border-radius: 0.5rem;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: var(--color-primary-red);
}

.churrasqueros-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.churrasquero-card {
  background: var(--color-white);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: var(--shadow);
  transition: transform 0.2s;
}

.churrasquero-card:hover {
  transform: translateY(-5px);
}

.churrasquero-avatar {
  position: relative;
  text-align: center;
  margin-bottom: 1rem;
}

.avatar-icon {
  font-size: 3rem;
}

.ranking-badge {
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  background: var(--color-accent);
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}

.churrasquero-info {
  text-align: center;
  margin-bottom: 1.5rem;
}

.churrasquero-name {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--color-gray-900);
}

.churrasquero-specialty {
  color: var(--color-gray-600);
  margin-bottom: 1rem;
}

.rating {
  margin-bottom: 1rem;
}

.star {
  color: var(--color-accent);
  font-size: 1.2rem;
}

.rating-score {
  font-weight: 600;
  color: var(--color-gray-700);
  margin-left: 0.5rem;
}

.churrasquero-stats {
  display: flex;
  justify-content: center;
  gap: 1rem;
  font-size: 0.9rem;
  color: var(--color-gray-600);
}

.churrasquero-actions {
  text-align: center;
}

@media (max-width: 768px) {
  .churrasqueros-grid {
    grid-template-columns: 1fr;
  }
  
  .churrasquero-stats {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style> 