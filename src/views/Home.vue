<template>
  <div class="home">
    <Navbar />
    <Hero />
    <Services />
    
    <!-- CTA simplificado -->
    <section class="cta">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">¿Listo para tu asado?</h2>
          <p class="cta-description">Reserva ahora y disfruta de la mejor churrasquería de Buenos Aires</p>
          <div class="cta-buttons">
            <router-link to="/menu" class="btn btn-primary">
              Ver Menú
            </router-link>
            <router-link to="/reservas" class="btn btn-secondary">
              Reservar
            </router-link>
          </div>
        </div>
      </div>
    </section>
    
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import Hero from '../components/Hero.vue'
import Services from '../components/Services.vue'
import Footer from '../components/Footer.vue'
</script>

<style scoped>
.home {
  min-height: 100vh;
}

.cta {
  background: var(--color-primary-red);
  color: var(--color-white);
  padding: 4rem 0;
  text-align: center;
}

.cta-content {
  max-width: 600px;
  margin: 0 auto;
}

.cta-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.cta-description {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
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

@media (max-width: 768px) {
  .cta {
    padding: 3rem 0;
  }
  
  .cta-title {
    font-size: 1.75rem;
  }
  
  .cta-description {
    font-size: 1rem;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 250px;
  }
}

@media (max-width: 480px) {
  .cta-title {
    font-size: 1.5rem;
  }
  
  .cta-description {
    font-size: 0.9rem;
  }
}
</style> 