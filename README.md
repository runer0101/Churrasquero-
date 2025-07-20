# 🔥 Churasquero - Churrasquería a Domicilio

[![Vue.js](https://img.shields.io/badge/Vue.js-3.5.17-4FC08D?style=for-the-badge&logo=vue.js)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.0-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Pinia](https://img.shields.io/badge/Pinia-2.1.0-yellow?style=for-the-badge)](https://pinia.vuejs.org/)
[![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa)](https://web.dev/progressive-web-apps/)

> **La mejor churrasquería a domicilio de Buenos Aires** - Aplicación web moderna con funcionalidades completas de e-commerce.

## 🚀 **Características Principales**

### 🛒 **Carrito de Compras**
- Widget de carrito en navbar
- Control de cantidades
- Cálculo automático de totales
- Persistencia en localStorage
- Checkout completo

### 👤 **Sistema de Autenticación**
- Login/registro de usuarios
- Gestión de sesiones
- Perfiles de usuario
- Modal responsive
- Validación de formularios

### 📱 **PWA (Progressive Web App)**
- Instalable como app móvil
- Funcionalidad offline
- Cache de recursos
- Manifest configurado
- Service Worker

### 🔔 **Notificaciones**
- Sistema de toast notifications
- Diferentes tipos (success, error, warning, info)
- Auto-dismiss
- Animaciones suaves

### 🎨 **UI/UX Moderna**
- Diseño responsive
- Animaciones fluidas
- Paleta de colores rojo/marrón
- Componentes reutilizables
- Accesibilidad completa

### 🏗️ **Arquitectura Escalable**
- Composable pattern para lógica reutilizable
- Sistema de validación centralizado
- Utilidades de formateo consistentes
- Constantes centralizadas
- Componentes base reutilizables
- Code splitting y optimización de build
- ESLint + Prettier para calidad de código

## 📋 **Tabla de Contenidos**

- [Instalación](#-instalación)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Tecnologías](#-tecnologías)
- [Funcionalidades](#-funcionalidades)
- [API](#-api)
- [Deployment](#-deployment)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

## 🛠 **Instalación**

### **Prerrequisitos**
- Node.js (versión 16 o superior)
- npm o yarn

### **Pasos de Instalación**

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/churasquero.git
cd churasquero
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:5173
```

### **Scripts Disponibles**

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting (si está configurado)
npm run lint
```

## 🎯 **Uso**

### **Funcionalidades Principales**

1. **Navegación**
   - Menú principal con categorías
   - Búsqueda de productos
   - Filtros por tipo

2. **Carrito de Compras**
   - Agregar productos al carrito
   - Modificar cantidades
   - Ver total en tiempo real
   - Proceso de checkout

3. **Autenticación**
   - Registro de nuevos usuarios
   - Login con email/password
   - Gestión de perfil
   - Logout

4. **Checkout**
   - Resumen del pedido
   - Formulario de entrega
   - Validación de datos
   - Confirmación de pedido

### **Ejemplos de Uso**

```javascript
// Agregar producto al carrito
cartStore.addItem(product)

// Ver total del carrito
console.log(cartStore.cartTotal)

// Login de usuario
authStore.login({ email, password })

// Mostrar notificación
window.$toast.success('Éxito', 'Producto agregado')
```

## 📁 **Estructura del Proyecto**

```
churasquero/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── main.css
│   ├── components/
│   │   ├── AuthModal.vue
│   │   ├── CartWidget.vue
│   │   ├── Footer.vue
│   │   ├── Hero.vue
│   │   ├── MobileForm.vue
│   │   ├── MobileLoader.vue
│   │   ├── MobileOptimizer.vue
│   │   ├── Navbar.vue
│   │   ├── NotificationToast.vue
│   │   └── Services.vue
│   ├── router/
│   │   └── index.js
│   ├── services/
│   │   └── api.js
│   ├── stores/
│   │   ├── auth.js
│   │   └── cart.js
│   ├── views/
│   │   ├── Churrasqueros.vue
│   │   ├── Checkout.vue
│   │   ├── Contacto.vue
│   │   ├── Home.vue
│   │   ├── Menu.vue
│   │   ├── PedidoConfirmado.vue
│   │   └── Reservas.vue
│   ├── App.vue
│   └── main.js
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## 🛠 **Tecnologías**

### **Frontend**
- **Vue.js 3** - Framework progresivo
- **Vite** - Build tool y dev server
- **Vue Router** - Enrutamiento SPA
- **Pinia** - Estado global
- **CSS3** - Estilos y animaciones

### **Librerías**
- **Axios** - Cliente HTTP
- **@vueuse/core** - Utilidades Vue
- **date-fns** - Manejo de fechas
- **vite-plugin-pwa** - Configuración PWA

### **Herramientas de Desarrollo**
- **Vite** - Build tool
- **Vue DevTools** - Debugging
- **Git** - Control de versiones

## ⚡ **Funcionalidades**

### **✅ Implementadas**
- [x] Estado global con Pinia
- [x] Carrito de compras funcional
- [x] Sistema de autenticación
- [x] PWA configurado
- [x] Checkout completo
- [x] Notificaciones en tiempo real
- [x] API service preparado
- [x] Diseño responsive
- [x] Animaciones y transiciones
- [x] Persistencia de datos

### **🔄 En Desarrollo**
- [ ] Integración con backend real
- [ ] Sistema de pagos
- [ ] Geolocalización
- [ ] Push notifications
- [ ] Chat en tiempo real

### **📋 Próximas Mejoras**
- [ ] Dashboard de administración
- [ ] Sistema de reseñas
- [ ] Programa de fidelidad
- [ ] Analytics y métricas
- [ ] Testing completo

## 🌐 **API**

### **Endpoints Preparados**

```javascript
// Autenticación
POST /auth/login
POST /auth/register
GET /auth/profile

// Menú
GET /menu
GET /categories
GET /menu/:id

// Pedidos
POST /orders
GET /orders
GET /orders/:id

// Churrasqueros
GET /churrasqueros
GET /churrasqueros/top
GET /churrasqueros/:id/reviews

// Reservas
POST /reservations
GET /reservations
```

### **Configuración**

```env
VITE_API_URL=https://api.churasquero.com
```

## 🚀 **Deployment**

### **Build para Producción**

```bash
npm run build
```

### **Plataformas Recomendadas**

- **Vercel** - Deploy automático
- **Netlify** - Hosting estático
- **Firebase Hosting** - Google Cloud
- **GitHub Pages** - Gratuito

### **Variables de Entorno**

```env
# Desarrollo
VITE_API_URL=http://localhost:3000

# Producción
VITE_API_URL=https://api.churasquero.com
```

## 🤝 **Contribuir**

### **Cómo Contribuir**

1. **Fork el proyecto**
2. **Crea una rama** (`git checkout -b feature/AmazingFeature`)
3. **Commit tus cambios** (`git commit -m 'Add some AmazingFeature'`)
4. **Push a la rama** (`git push origin feature/AmazingFeature`)
5. **Abre un Pull Request**

### **Guías de Contribución**

- Sigue las convenciones de Vue.js
- Mantén el código limpio y documentado
- Agrega tests para nuevas funcionalidades
- Actualiza la documentación

## 📄 **Licencia**

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 **Autores**

- **Tu Nombre** - *Desarrollo inicial* - [TuUsuario](https://github.com/TuUsuario)

## 🙏 **Agradecimientos**

- Vue.js team por el excelente framework
- Vite por las herramientas de desarrollo
- Comunidad de desarrolladores Vue.js

## 📞 **Contacto**

- **Email**: tu-email@ejemplo.com
- **GitHub**: [@TuUsuario](https://github.com/TuUsuario)
- **LinkedIn**: [Tu Perfil](https://linkedin.com/in/tu-perfil)

---

**⭐ Si te gusta este proyecto, dale una estrella en GitHub!**

---

*Desarrollado con ❤️ en Buenos Aires, Argentina*
