# Churasquero - Churrasquería a Domicilio

[![Vue.js](https://img.shields.io/badge/Vue.js-3.5.17-4FC08D?style=for-the-badge&logo=vue.js)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.0-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Pinia](https://img.shields.io/badge/Pinia-2.1.0-yellow?style=for-the-badge)](https://pinia.vuejs.org/)
[![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa)](https://web.dev/progressive-web-apps/)

> **La mejor churrasquería a domicilio de Buenos Aires** - Aplicación web moderna con funcionalidades completas de e-commerce.

## Características Principales

### Carrito de Compras
- Widget de carrito en navbar
- Control de cantidades
- Cálculo automático de totales
- Persistencia en localStorage
- Checkout completo

### Sistema de Autenticación
- Login/registro de usuarios
- Gestión de sesiones
- Perfiles de usuario
- Modal responsive
- Validación de formularios

### PWA (Progressive Web App)
- Instalable como app móvil
- Funcionalidad offline
- Cache de recursos
- Manifest configurado
- Service Worker

### Notificaciones
- Sistema de toast notifications
- Diferentes tipos (success, error, warning, info)
- Auto-dismiss
- Animaciones suaves

### UI/UX Moderna
- Diseño responsive
- Animaciones fluidas
- Paleta de colores rojo/marrón
- Componentes reutilizables
- Accesibilidad completa

### Arquitectura Escalable
- Composable pattern para lógica reutilizable
- Sistema de validación centralizado
- Utilidades de formateo consistentes
- Constantes centralizadas
- Componentes base reutilizables
- Code splitting y optimización de build
- ESLint + Prettier para calidad de código

## Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologías](#tecnologías)
- [Funcionalidades](#funcionalidades)
- [API](#api)
- [Deployment](#deployment)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

## Instalación

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de Instalación

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

### Scripts Disponibles

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

## Uso

### Funcionalidades Principales

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

### Ejemplos de Uso

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

## Estructura del Proyecto

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

## Tecnologías

### Frontend
- **Vue.js 3** - Framework progresivo
- **Vite** - Build tool y dev server
- **Vue Router** - Enrutamiento SPA
- **Pinia** - Estado global
- **CSS3** - Estilos y animaciones

### Librerías
- **Axios** - Cliente HTTP
- **@vueuse/core** - Utilidades de Vue
- **date-fns** - Manipulación de fechas
- **vite-plugin-pwa** - Configuración PWA

### Herramientas de Desarrollo
- **ESLint** - Linting de código
- **Prettier** - Formateo de código
- **Vue DevTools** - Herramientas de desarrollo

## Funcionalidades

### Carrito de Compras
- Agregar/remover productos
- Control de cantidades
- Cálculo automático de totales
- Persistencia en localStorage
- Proceso de checkout completo

### Autenticación
- Registro de usuarios
- Login/logout
- Gestión de sesiones
- Perfiles de usuario
- Validación de formularios

### PWA
- Instalable como app móvil
- Funcionalidad offline
- Cache de recursos
- Service Worker configurado

### Notificaciones
- Sistema de toast notifications
- Diferentes tipos (success, error, warning, info)
- Auto-dismiss configurable
- Animaciones suaves

## API

### Endpoints Principales

```javascript
// Autenticación
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout

// Productos
GET /api/products
GET /api/products/:id

// Carrito
GET /api/cart
POST /api/cart/add
PUT /api/cart/update
DELETE /api/cart/remove

// Pedidos
POST /api/orders
GET /api/orders/:id
```

### Configuración

```javascript
// src/services/api.js
const API_CONFIG = {
  BASE_URL: 'https://api.churasquero.com',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3
}
```

## Deployment

### Build para Producción

```bash
# Build optimizado
npm run build

# Preview del build
npm run preview
```

### Variables de Entorno

```env
VITE_API_URL=https://api.churasquero.com
VITE_APP_TITLE=Churasquero
VITE_APP_VERSION=2.0.0
```

### Configuración PWA

- Manifest configurado
- Service Worker activo
- Cache de recursos
- Instalación offline

## Contribuir

### Guías de Contribución

1. **Fork del repositorio**
2. **Crear rama feature**: `git checkout -b feature/nueva-funcionalidad`
3. **Commit cambios**: `git commit -m 'feat: agregar nueva funcionalidad'`
4. **Push a la rama**: `git push origin feature/nueva-funcionalidad`
5. **Crear Pull Request**

### Estándares de Código

- ESLint configurado
- Prettier para formateo
- Conventional Commits
- Tests requeridos

### Estructura de Commits

```
feat: nueva funcionalidad
fix: corrección de bug
docs: actualización de documentación
style: cambios de formato
refactor: refactorización de código
test: agregar tests
chore: tareas de mantenimiento
```

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

**Desarrollado con ❤️ para la mejor churrasquería de Buenos Aires**
