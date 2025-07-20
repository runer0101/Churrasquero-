<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3 class="footer-title">Churasquero</h3>
          <p class="footer-description">
            La mejor churrasquería a domicilio en Buenos Aires
          </p>
        </div>
        
        <div class="footer-section">
          <h4 class="footer-subtitle">Enlaces</h4>
          <div class="footer-links">
            <router-link to="/" class="footer-link">Inicio</router-link>
            <router-link to="/menu" class="footer-link">Menú</router-link>
            <router-link to="/reservas" class="footer-link">Reservas</router-link>
            <router-link to="/contacto" class="footer-link">Contacto</router-link>
          </div>
        </div>
        
        <div class="footer-section">
          <h4 class="footer-subtitle">Contacto</h4>
          <div class="footer-contact">
            <p>+54 11 1234-5678</p>
            <p>info@churasquero.com</p>
            <p>Buenos Aires, Argentina</p>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2024 Churasquero. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Footer simplificado
</script>

<style scoped>
.footer {
  background: var(--color-gray-900);
  color: var(--color-white);
  padding: 3rem 0 1rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.footer-description {
  color: var(--color-gray-400);
  line-height: 1.6;
}

.footer-subtitle {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-link {
  color: var(--color-gray-400);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: var(--color-white);
}

.footer-contact p {
  color: var(--color-gray-400);
  margin-bottom: 0.25rem;
}

.footer-bottom {
  border-top: 1px solid var(--color-gray-800);
  padding-top: 1rem;
  text-align: center;
  color: var(--color-gray-400);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .footer {
    padding: 2rem 0 1rem;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .footer-title {
    font-size: 1.25rem;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 1.5rem 0 1rem;
  }
  
  .footer-content {
    gap: 1rem;
  }
  
  .footer-title {
    font-size: 1.1rem;
  }
  
  .footer-subtitle {
    font-size: 1rem;
  }
}
</style> 