<template>
  <div class="reservas">
    <Navbar />
    
    <section class="reservas-hero">
      <div class="container">
        <div class="reservas-hero-content">
          <h1 class="reservas-title">Reserva tu Churrasco</h1>
          <p class="reservas-description">
            Reserva con anticipación y asegúrate de tener la mejor experiencia gastronómica
          </p>
        </div>
      </div>
    </section>
    
    <section class="reservas-content">
      <div class="container">
        <div class="reservas-grid">
          <div class="reservas-form">
            <MobileForm
              title="Formulario de Reserva"
              subtitle="Completa los datos para tu reserva"
              :fields="reservationFields"
              :initial-data="form"
              submit-text="Reservar Ahora"
              submitting-text="Procesando reserva..."
              @submit="submitReservation"
              @validation-error="handleValidationError"
            />
          </div>
          
          <div class="reservas-info">
            <div class="info-card card">
              <h3 class="info-title">Información Importante</h3>
              <div class="info-list">
                <div class="info-item">
                  <span class="info-icon">⏰</span>
                  <div class="info-content">
                    <h4>Horarios de Reserva</h4>
                    <p>Lunes a Domingo: 12:00 - 22:00</p>
                  </div>
                </div>
                
                <div class="info-item">
                  <span class="info-icon">📅</span>
                  <div class="info-content">
                    <h4>Anticipación</h4>
                    <p>Reserva con al menos 24 horas de anticipación</p>
                  </div>
                </div>
                
                <div class="info-item">
                  <span class="info-icon">💰</span>
                  <div class="info-content">
                    <h4>Depósito</h4>
                    <p>Se requiere un depósito del 30% para confirmar</p>
                  </div>
                </div>
                
                <div class="info-item">
                  <span class="info-icon">🚚</span>
                  <div class="info-content">
                    <h4>Zona de Cobertura</h4>
                    <p>Buenos Aires y alrededores (hasta 50km)</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="contact-card card">
              <h3 class="contact-title">¿Necesitas Ayuda?</h3>
              <p class="contact-description">
                Llámanos directamente para consultas urgentes o reservas especiales
              </p>
              <div class="contact-info">
                <div class="contact-item">
                  <span class="contact-icon">📞</span>
                  <span>+54 11 1234-5678</span>
                </div>
                <div class="contact-item">
                  <span class="contact-icon">📧</span>
                  <span>reservas@churasquero.com</span>
                </div>
              </div>
              <button class="btn btn-secondary">Llamar Ahora</button>
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
import MobileForm from '../components/MobileForm.vue'

const isSubmitting = ref(false)

const form = ref({
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  guests: '',
  service: '',
  address: '',
  notes: ''
})

const reservationFields = [
  {
    name: 'name',
    label: 'Nombre Completo',
    type: 'text',
    placeholder: 'Ingresa tu nombre completo',
    required: true,
    autocomplete: 'name'
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'tu@email.com',
    required: true,
    autocomplete: 'email'
  },
  {
    name: 'phone',
    label: 'Teléfono',
    type: 'tel',
    placeholder: '+54 11 1234-5678',
    required: true,
    autocomplete: 'tel'
  },
  {
    name: 'date',
    label: 'Fecha',
    type: 'date',
    required: true,
    min: new Date().toISOString().split('T')[0]
  },
  {
    name: 'time',
    label: 'Hora',
    type: 'select',
    placeholder: 'Seleccionar hora',
    required: true,
    options: [
      { value: '12:00', label: '12:00' },
      { value: '13:00', label: '13:00' },
      { value: '14:00', label: '14:00' },
      { value: '19:00', label: '19:00' },
      { value: '20:00', label: '20:00' },
      { value: '21:00', label: '21:00' }
    ]
  },
  {
    name: 'guests',
    label: 'Número de Personas',
    type: 'select',
    placeholder: 'Seleccionar cantidad',
    required: true,
    options: [
      { value: '2-4', label: '2-4 personas' },
      { value: '5-8', label: '5-8 personas' },
      { value: '9-12', label: '9-12 personas' },
      { value: '13+', label: '13+ personas' }
    ]
  },
  {
    name: 'service',
    label: 'Tipo de Servicio',
    type: 'select',
    placeholder: 'Seleccionar servicio',
    required: true,
    options: [
      { value: 'churrasco-completo', label: 'Churrasco Completo' },
      { value: 'carnes-carta', label: 'Carnes a la Carta' },
      { value: 'evento-especial', label: 'Evento Especial' },
      { value: 'catering-express', label: 'Catering Express' }
    ]
  },
  {
    name: 'address',
    label: 'Dirección',
    type: 'textarea',
    placeholder: 'Ingresa la dirección completa donde se realizará el servicio',
    required: true,
    rows: 3
  },
  {
    name: 'notes',
    label: 'Notas Adicionales',
    type: 'textarea',
    placeholder: 'Alergias, preferencias especiales, etc.',
    required: false,
    rows: 3
  }
]

const submitReservation = async (formData) => {
  isSubmitting.value = true
  
  try {
    // Simular envío de formulario
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Aquí iría la lógica real de envío
    console.log('Datos de reserva:', formData)
    
    // Mostrar mensaje de éxito
    alert('¡Reserva enviada con éxito! Te contactaremos pronto.')
    
    // Limpiar formulario
    form.value = {
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: '',
      service: '',
      address: '',
      notes: ''
    }
    
  } catch (error) {
    console.error('Error al enviar reserva:', error)
    alert('Error al enviar la reserva. Por favor, intenta nuevamente.')
  } finally {
    isSubmitting.value = false
  }
}

const handleValidationError = (errors) => {
  console.log('Errores de validación:', errors)
}
</script>

<style scoped>
.reservas {
  min-height: 100vh;
}

.reservas-hero {
  background: linear-gradient(135deg, var(--color-primary-red), var(--color-primary-brown));
  color: var(--color-white);
  padding: 4rem 0;
  text-align: center;
}

.reservas-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.reservas-description {
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

.reservas-content {
  padding: 4rem 0;
  background-color: var(--color-gray-50);
}

.reservas-grid {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 3rem;
  align-items: start;
}

.reservas-form {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: var(--shadow-lg);
}

.reservas-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-card,
.contact-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: var(--shadow-lg);
}

.info-title,
.contact-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--color-gray-900);
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.info-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.info-content h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--color-gray-900);
}

.info-content p {
  color: var(--color-gray-600);
  line-height: 1.5;
}

.contact-description {
  color: var(--color-gray-600);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-gray-700);
}

.contact-icon {
  font-size: 1.25rem;
}

@media (max-width: 1024px) {
  .reservas-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .reservas-info {
    order: -1;
  }
}

@media (max-width: 768px) {
  .reservas-hero {
    padding: 3rem 0;
  }
  
  .reservas-title {
    font-size: 2rem;
  }
  
  .reservas-description {
    font-size: 1.1rem;
  }
  
  .reservas-content {
    padding: 3rem 0;
  }
  
  .reservas-form {
    padding: 1.5rem;
  }
  
  .info-card,
  .contact-card {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .reservas-hero {
    padding: 2.5rem 0;
  }
  
  .reservas-title {
    font-size: 1.75rem;
  }
  
  .reservas-description {
    font-size: 1rem;
  }
  
  .reservas-content {
    padding: 2.5rem 0;
  }
  
  .reservas-form {
    padding: 1rem;
  }
  
  .info-card,
  .contact-card {
    padding: 1rem;
  }
  
  .info-title,
  .contact-title {
    font-size: 1.25rem;
  }
}
</style> 