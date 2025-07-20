<template>
  <section class="services">
    <div class="container">
      <div class="services-header">
        <h2 class="services-title">Nuestros Servicios</h2>
        <p class="services-subtitle">Experiencias gastronómicas únicas en tu hogar</p>
      </div>
      
      <div class="services-grid">
        <div class="service-card" v-for="(service, index) in services" :key="index">
          <div class="service-icon">{{ service.icon }}</div>
          <h3 class="service-title">{{ service.title }}</h3>
          <p class="service-description">{{ service.description }}</p>
          <router-link :to="service.link" class="btn btn-primary">
            {{ service.buttonText }}
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const services = [
  {
    icon: '🔥',
    title: 'Churrasco Completo',
    description: 'Carnes premium con parrillero profesional',
    link: '/churrasqueros',
    buttonText: 'Ordenar'
  },
  {
    icon: '🥩',
    title: 'Carnes a la Carta',
    description: 'Cortes seleccionados preparados en tu hogar',
    link: '/menu',
    buttonText: 'Ver Menú'
  },
  {
    icon: '🎉',
    title: 'Eventos Especiales',
    description: 'Servicio premium para celebraciones',
    link: '/reservas',
    buttonText: 'Reservar'
  }
]
</script>

<style scoped>
.services {
  padding: 4rem 0;
  background: var(--color-gray-50);
}

.services-header {
  text-align: center;
  margin-bottom: 3rem;
}

.services-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-gray-900);
  margin-bottom: 1rem;
}

.services-subtitle {
  font-size: 1.1rem;
  color: var(--color-gray-600);
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.6;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.service-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.service-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.service-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-gray-900);
  margin-bottom: 0.75rem;
}

.service-description {
  color: var(--color-gray-600);
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.btn {
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
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

@media (max-width: 768px) {
  .services {
    padding: 3rem 0;
  }
  
  .services-title {
    font-size: 1.75rem;
  }
  
  .services-subtitle {
    font-size: 1rem;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .service-card {
    padding: 1.5rem;
  }
  
  .service-icon {
    font-size: 2.5rem;
  }
}

@media (max-width: 480px) {
  .services-title {
    font-size: 1.5rem;
  }
  
  .service-card {
    padding: 1.25rem;
  }
  
  .service-icon {
    font-size: 2rem;
  }
  
  .service-title {
    font-size: 1.1rem;
  }
}
</style> 