<template>
  <div class="menu">
    <Navbar />
    
    <section class="menu-hero">
      <div class="container">
        <div class="menu-hero-content">
          <h1 class="menu-title">Nuestro Menú</h1>
          <p class="menu-description">
            Descubre nuestra selección de carnes premium y acompañamientos artesanales
          </p>
        </div>
      </div>
    </section>
    
    <section class="menu-content">
      <div class="container">
        <div class="menu-categories">
          <button 
            v-for="category in categories" 
            :key="category.id"
            @click="selectedCategory = category.id"
            :class="['category-btn', { active: selectedCategory === category.id }]"
          >
            {{ category.name }}
          </button>
        </div>
        
        <div class="menu-items">
          <div 
            v-for="item in filteredItems" 
            :key="item.id"
            class="menu-item card fade-in"
          >
            <div class="item-image">
              <!-- 
                ÁREA PARA IMÁGENES:
                Aquí puedes agregar las imágenes de los productos más adelante.
                
                Ejemplo de cómo importar y usar las imágenes:
                1. Coloca las imágenes en: src/assets/images/menu/
                2. Importa la imagen: import productImage from '@/assets/images/menu/producto.jpg'
                3. Reemplaza el div image-placeholder con: <img :src="productImage" alt="Producto" />
                
                Estructura sugerida de carpetas:
                src/assets/images/menu/
                ├── carnes/
                │   ├── bife-chorizo.jpg
                │   ├── ojo-bife.jpg
                │   ├── tira-asado.jpg
                │   └── vacio.jpg
                └── acompanamientos/
                    ├── arroz.jpg
                    ├── papas-fritas.jpg
                    ├── ensaladas.jpg
                    └── yuca.jpg
              -->
              <div class="image-placeholder">
                <div class="image-note">
                  <small>Imagen 100x100px</small>
                </div>
              </div>
            </div>
            <div class="item-content">
              <h3 class="item-title">{{ item.name }}</h3>
              <p class="item-description">{{ item.description }}</p>
              <div class="item-details">
                <span class="item-price">${{ item.price }}</span>
                <span class="item-weight">{{ item.weight }}</span>
              </div>
              <button class="btn btn-primary" @click="addToCart(item)">
                Agregar al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { useCartStore } from '../stores/cart'

// 
// INSTRUCCIONES PARA AGREGAR IMÁGENES:
// 
// 1. Crea la carpeta: src/assets/images/menu/
// 2. Dentro crea las subcarpetas: carnes/ y acompanamientos/
// 3. Coloca las imágenes con nombres descriptivos:
//    - carnes/bife-chorizo.jpg
//    - carnes/ojo-bife.jpg
//    - carnes/tira-asado.jpg
//    - carnes/vacio.jpg
//    - acompanamientos/arroz.jpg
//    - acompanamientos/papas-fritas.jpg
//    - acompanamientos/ensaladas.jpg
//    - acompanamientos/yuca.jpg
// 
// 4. Para usar las imágenes, importa cada una:
//    import bifeChorizo from '@/assets/images/menu/carnes/bife-chorizo.jpg'
//    import arroz from '@/assets/images/menu/acompanamientos/arroz.jpg'
// 
// 5. Luego reemplaza el div image-placeholder con:
//    <img :src="bifeChorizo" alt="Bife de Chorizo" class="product-image" />
// 
// 6. Agrega estos estilos CSS:
//    .product-image {
//      width: 100px;
//      height: 100px;
//      object-fit: cover;
//      border-radius: 0.5rem;
//    }
//

const selectedCategory = ref('carnes')

const categories = [
  { id: 'carnes', name: 'Carnes Premium' },
  { id: 'acompañamientos', name: 'Acompañamientos' }
]

const menuItems = [
  // Carnes Premium
  {
    id: 1,
    category: 'carnes',
    name: 'Bife de Chorizo',
    description: 'Corte premium de bife de chorizo, jugoso y tierno',
    price: 4500,
    weight: '300g'
  },
  {
    id: 2,
    category: 'carnes',
    name: 'Ojo de Bife',
    description: 'Corte magro y sabroso, perfecto para parrilla',
    price: 4200,
    weight: '280g'
  },
  {
    id: 3,
    category: 'carnes',
    name: 'Tira de Asado',
    description: 'Tira de asado tradicional argentina',
    price: 3800,
    weight: '400g'
  },
  {
    id: 4,
    category: 'carnes',
    name: 'Vacío',
    description: 'Vacío premium con marmoleado perfecto',
    price: 4800,
    weight: '350g'
  },
  
  // Acompañamientos
  {
    id: 5,
    category: 'acompañamientos',
    name: 'Arroz',
    description: 'Arroz blanco cocido al vapor con hierbas',
    price: 600,
    weight: '200g'
  },
  {
    id: 6,
    category: 'acompañamientos',
    name: 'Papas Fritas',
    description: 'Papas fritas caseras con sal marina',
    price: 800,
    weight: '250g'
  },
  {
    id: 7,
    category: 'acompañamientos',
    name: 'Ensaladas',
    description: 'Ensalada mixta con lechuga, tomate y cebolla',
    price: 700,
    weight: '150g'
  },
  {
    id: 8,
    category: 'acompañamientos',
    name: 'Yuca',
    description: 'Yuca cocida y frita con sal',
    price: 900,
    weight: '200g'
  }
]

const cartStore = useCartStore()

const filteredItems = computed(() => {
  return menuItems.filter(item => item.category === selectedCategory.value)
})

const addToCart = (item) => {
  cartStore.addItem(item)
  if (window.$toast) {
    window.$toast.success('Producto agregado', `${item.name} se agregó al carrito`)
  }
}
</script>

<style scoped>
.menu {
  min-height: 100vh;
}

.menu-hero {
  background: linear-gradient(135deg, var(--color-primary-red) 0%, var(--color-primary-brown) 100%);
  color: var(--color-white);
  padding: 4rem 0;
  text-align: center;
}

.menu-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.menu-description {
  font-size: 1.25rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

.menu-content {
  padding: 4rem 0;
  background-color: var(--color-gray-50);
}

.menu-categories {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.category-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--color-primary-red);
  background-color: transparent;
  color: var(--color-primary-red);
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.category-btn:hover,
.category-btn.active {
  background-color: var(--color-primary-red);
  color: var(--color-white);
}

.menu-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.menu-item {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  transition: all 0.3s ease-in-out;
}

.menu-item:hover {
  transform: translateY(-5px);
}

.item-image {
  flex-shrink: 0;
}

.image-placeholder {
  width: 100px;
  height: 100px;
  background-color: var(--color-gray-100);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.image-note {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-gray-600);
  color: var(--color-white);
  padding: 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  white-space: nowrap;
  text-align: center;
}

.item-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.item-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-gray-900);
}

.item-description {
  color: var(--color-gray-600);
  line-height: 1.5;
  flex: 1;
}

.item-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.item-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary-red);
}

.item-weight {
  font-size: 0.875rem;
  color: var(--color-gray-500);
}

@media (max-width: 768px) {
  .menu-hero {
    padding: 3rem 0;
  }
  
  .menu-title {
    font-size: 2.5rem;
  }
  
  .menu-description {
    font-size: 1.1rem;
  }
  
  .menu-content {
    padding: 3rem 0;
  }
  
  .menu-categories {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }
  
  .category-btn {
    width: 100%;
    max-width: 300px;
    padding: 1rem 1.5rem;
  }
  
  .menu-items {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .menu-item {
    flex-direction: column;
    text-align: center;
    padding: 1.25rem;
  }
  
  .item-image {
    margin-bottom: 1rem;
  }
  
  .image-placeholder {
    width: 80px;
    height: 80px;
    margin: 0 auto;
  }
  
  .item-content {
    gap: 0.5rem;
  }
  
  .item-title {
    font-size: 1.1rem;
  }
  
  .item-description {
    font-size: 0.9rem;
  }
  
  .item-price {
    font-size: 1.25rem;
  }
}

@media (max-width: 480px) {
  .menu-hero {
    padding: 2.5rem 0;
  }
  
  .menu-title {
    font-size: 2rem;
  }
  
  .menu-description {
    font-size: 1rem;
  }
  
  .menu-content {
    padding: 2.5rem 0;
  }
  
  .menu-categories {
    margin-bottom: 2rem;
  }
  
  .category-btn {
    max-width: 250px;
    padding: 0.875rem 1.25rem;
    font-size: 0.9rem;
  }
  
  .menu-items {
    gap: 1.25rem;
  }
  
  .menu-item {
    padding: 1rem;
  }
  
  .image-placeholder {
    width: 70px;
    height: 70px;
  }
  
  .item-title {
    font-size: 1rem;
  }
  
  .item-description {
    font-size: 0.85rem;
  }
  
  .item-price {
    font-size: 1.1rem;
  }
  
  .item-weight {
    font-size: 0.8rem;
  }
  
  .btn {
    padding: 0.75rem 1.25rem;
    font-size: 0.9rem;
  }
}
</style> 