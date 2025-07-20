<template>
  <div class="contacto">
    <Navbar />
    
    <section class="contacto-hero">
      <div class="container">
        <div class="contacto-hero-content">
          <h1 class="contacto-title">Contáctanos</h1>
          <p class="contacto-description">
            Estamos aquí para ayudarte. Envíanos un mensaje o llámanos directamente
          </p>
        </div>
      </div>
    </section>
    
    <section class="contacto-content">
      <div class="container">
        <div class="contacto-grid">
          <div class="contacto-info">
            <div class="info-card">
              <h2 class="info-title">Información de Contacto</h2>
              
              <div class="contact-methods">
                <div class="contact-method">
                  <div class="method-icon">📞</div>
                  <div class="method-content">
                    <h3>Teléfono</h3>
                    <p>+54 11 1234-5678</p>
                    <span class="method-note">Lunes a Domingo: 9:00 - 22:00</span>
                  </div>
                </div>
                
                <div class="contact-method">
                  <div class="method-icon">📧</div>
                  <div class="method-content">
                    <h3>Email</h3>
                    <p>info@churasquero.com</p>
                    <span class="method-note">Respuesta en 24 horas</span>
                  </div>
                </div>
                
                <div class="contact-method">
                  <div class="method-icon">📍</div>
                  <div class="method-content">
                    <h3>Oficina</h3>
                    <p>Av. Corrientes 1234</p>
                    <span class="method-note">Buenos Aires, Argentina</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="contacto-form">
            <div class="form-card">
              <h2 class="form-title">Envíanos un Mensaje</h2>
              
              <form @submit.prevent="submitContact" class="contact-form">
                <div class="form-row">
                  <div class="form-group">
                    <label for="firstName" class="form-label">Nombre *</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      v-model="form.firstName"
                      class="form-input"
                      required
                    >
                  </div>
                  
                  <div class="form-group">
                    <label for="lastName" class="form-label">Apellido *</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      v-model="form.lastName"
                      class="form-input"
                      required
                    >
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="email" class="form-label">Email *</label>
                  <input 
                    type="email" 
                    id="email" 
                    v-model="form.email"
                    class="form-input"
                    required
                  >
                </div>
                
                <div class="form-group">
                  <label for="phone" class="form-label">Teléfono</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    v-model="form.phone"
                    class="form-input"
                  >
                </div>
                
                <div class="form-group">
                  <label for="subject" class="form-label">Asunto *</label>
                  <select id="subject" v-model="form.subject" class="form-input" required>
                    <option value="">Seleccionar asunto</option>
                    <option value="consulta">Consulta General</option>
                    <option value="reserva">Reserva</option>
                    <option value="evento">Evento Especial</option>
                    <option value="reclamo">Reclamo</option>
                    <option value="sugerencia">Sugerencia</option>
                  </select>
                </div>
                
                <div class="form-group">
                  <label for="message" class="form-label">Mensaje *</label>
                  <textarea 
                    id="message" 
                    v-model="form.message"
                    class="form-input"
                    rows="5"
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    required
                  ></textarea>
                </div>
                
                <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
                  <span v-if="isSubmitting">Enviando...</span>
                  <span v-else>Enviar Mensaje</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

const isSubmitting = ref(false)

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const submitContact = async () => {
  isSubmitting.value = true
  
  try {
    // Simular envío de formulario
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Aquí iría la lógica real de envío
    console.log('Datos de contacto:', form.value)
    
    // Mostrar mensaje de éxito
    alert('¡Mensaje enviado con éxito! Te contactaremos pronto.')
    
    // Limpiar formulario
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }
    
  } catch (error) {
    console.error('Error al enviar mensaje:', error)
    alert('Error al enviar el mensaje. Por favor, intenta nuevamente.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.contacto {
  min-height: 100vh;
}

.contacto-hero {
  background: var(--gradient-primary);
  color: var(--color-white);
  padding: 4rem 0;
  text-align: center;
}

.contacto-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.contacto-description {
  font-size: 1.1rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.contacto-content {
  padding: 4rem 0;
  background-color: var(--color-gray-50);
}

.contacto-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.info-card,
.form-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.info-title,
.form-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-gray-900);
  margin-bottom: 1.5rem;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-method {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.method-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.method-content h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--color-gray-900);
}

.method-content p {
  color: var(--color-gray-700);
  margin-bottom: 0.25rem;
}

.method-note {
  font-size: 0.875rem;
  color: var(--color-gray-500);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.form-label {
  font-weight: 600;
  color: var(--color-gray-700);
}

.form-input {
  padding: 0.75rem;
  border: 2px solid var(--color-gray-200);
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary-red);
}

.form-input[type="textarea"] {
  resize: vertical;
  min-height: 120px;
}

.btn {
  padding: 0.875rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.btn-primary {
  background: var(--color-primary-red);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: var(--color-primary-brown);
  transform: translateY(-2px);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 1024px) {
  .contacto-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .contacto-info {
    order: -1;
  }
}

@media (max-width: 768px) {
  .contacto-hero {
    padding: 3rem 0;
  }
  
  .contacto-title {
    font-size: 2rem;
  }
  
  .contacto-description {
    font-size: 1rem;
  }
  
  .contacto-content {
    padding: 3rem 0;
  }
  
  .info-card,
  .form-card {
    padding: 1.5rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .contacto-hero {
    padding: 2.5rem 0;
  }
  
  .contacto-title {
    font-size: 1.75rem;
  }
  
  .contacto-description {
    font-size: 0.9rem;
  }
  
  .contacto-content {
    padding: 2.5rem 0;
  }
  
  .info-card,
  .form-card {
    padding: 1rem;
  }
  
  .info-title,
  .form-title {
    font-size: 1.25rem;
  }
}
</style> 