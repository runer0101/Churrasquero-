<template>
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <h1 class="hero-title">
          La mejor churrasquería a domicilio
        </h1>
        
        <p class="hero-description">
          Disfruta de auténticos asados argentinos en tu hogar con nuestros expertos parrilleros profesionales
        </p>
        
        <div class="hero-buttons">
          <router-link to="/menu" class="btn btn-primary">
            Ver Menú
          </router-link>
          <router-link to="/reservas" class="btn btn-secondary">
            Reservar
          </router-link>
        </div>
        
        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-number">4.9</span>
            <span class="stat-label">Calificación</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">500+</span>
            <span class="stat-label">Asados</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">24h</span>
            <span class="stat-label">Disponible</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Componente Hero simplificado
</script>

<style scoped>
.hero {
  background: var(--gradient-primary);
  color: var(--color-white);
  padding: 4rem 0;
  text-align: center;
}

.hero-content {
  max-width: 600px;
  margin: 0 auto;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.hero-description {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.875rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn-primary {
  background: var(--color-white);
  color: var(--color-primary-red);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.3);
}

.btn-secondary {
  background: transparent;
  color: var(--color-white);
  border: 2px solid var(--color-white);
}

.btn-secondary:hover {
  background: var(--color-white);
  color: var(--color-primary-red);
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
}

.stat-label {
  font-size: 0.875rem;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .hero {
    padding: 3rem 0;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 250px;
  }
  
  .hero-stats {
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.75rem;
  }
  
  .hero-stats {
    gap: 1rem;
  }
  
  .stat-number {
    font-size: 1.25rem;
  }
  
  .stat-label {
    font-size: 0.8rem;
  }
}
</style> 