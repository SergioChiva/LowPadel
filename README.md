# 🎾 LowPádel - Tienda Online de Pádel Premium

E-commerce moderno especializado en palas de pádel de jugadores profesionales, construido con Astro y MongoDB.

## 🚀 Características Principales

- **Catálogo de Palas Premium**: Palas exclusivas de jugadores profesionales (Agustín Tapia, Arturo Coello, Alejandro Galán, Federico Chingotto)
- **Sistema de Autenticación**: Registro, login y gestión de perfiles de usuario
- **Carrito de Compras**: Sistema completo de carrito con persistencia en localStorage
- **Checkout & Pagos**: Simulación de proceso de pago con validación de tarjetas
- **Panel de Administración**: Gestión completa de productos y pedidos
- **Blog de Noticias**: Sistema de noticias con categorías y editor visual
- **Perfil de Usuario**: Gestión de datos personales, historial de pedidos y configuración de cuenta
- **Diseño Responsive**: Adaptado a todos los dispositivos

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Astro 5.12
- **Backend**: Node.js con API Routes de Astro
- **Base de Datos**: MongoDB Atlas
- **Estilos**: CSS3 con variables custom
- **Deployment**: Vercel

## 📋 Requisitos Previos

- Node.js
- MongoDB Atlas cuenta (o instancia local de MongoDB)
- npm o pnpm

## ⚙️ Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/lowpadel.git
cd lowpadel
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto:

```env
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/lowpadel
JWT_SECRET=tu_secreto_super_seguro_cambiar_en_produccion
NODE_ENV=development
```

4. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

El proyecto estará disponible en `http://localhost:4321`

## 📁 Estructura del Proyecto

```
LowPadel/
├── src/
│   ├── components/        # Componentes Astro reutilizables
│   │   ├── aboutComponent.astro
│   │   ├── chingoComponent.astro
│   │   ├── coelloComponent.astro
│   │   ├── contactoComponent.astro
│   │   ├── galanComponent.astro
│   │   ├── noticiasComponent.astro
│   │   ├── palasComponent.astro
│   │   ├── palasAdminComponent.astro
│   │   ├── registerComponent.astro
│   │   ├── tapiaComponent.astro
│   │   └── Welcome.astro
│   ├── layouts/           # Layouts principales
│   │   └── Layout.astro
│   ├── lib/              # Utilidades
│   │   ├── auth.js       # Funciones de autenticación JWT
│   │   └── db.js         # Conexión a MongoDB
│   ├── middleware/       # Middlewares
│   │   └── authMiddleware.js
│   ├── models/           # Modelos de MongoDB
│   │   ├── Noticia.js
│   │   ├── Pala.js
│   │   ├── Pedido.js
│   │   └── User.js
│   └── pages/            # Páginas y API Routes
│       ├── api/
│       │   ├── auth/
│       │   │   ├── login.js
│       │   │   └── register.js
│       │   ├── noticias/
│       │   │   └── [id].js
│       │   ├── palas/
│       │   │   └── [id].js
│       │   ├── user/
│       │   │   └── profile.js
│       │   ├── noticias.js
│       │   ├── palas.js
│       │   └── pedidos.js
│       ├── about.astro
│       ├── admin.astro
│       ├── carrito.astro
│       ├── checkout.astro
│       ├── chingo.astro
│       ├── coello.astro
│       ├── contact.astro
│       ├── galan.astro
│       ├── index.astro
│       ├── login.astro
│       ├── noticias.astro
│       ├── palas.astro
│       ├── perfil.astro
│       ├── register.astro
│       └── tapia.astro
├── public/
│   ├── Layout/           # Imágenes del layout
│   ├── noticias/         # Imágenes de noticias
│   ├── palas/            # Imágenes de palas
│   ├── scripts/          # Scripts del cliente
│   │   ├── carrito.js
│   │   ├── jugadores.js
│   │   ├── logo.js
│   │   ├── nav.js
│   │   └── usuario.js
│   ├── styles/           # Estilos CSS
│   │   ├── admin.css
│   │   ├── noticias.css
│   │   └── palas.css
│   ├── videos/
│   └── Welcome/          # Imágenes de jugadores
├── .env
├── .env.example
├── .gitignore
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## 🎨 Características de Diseño

### Glassmorphism UI
- Fondos translúcidos con `backdrop-filter: blur()`
- Bordes sutiles con transparencia
- Sombras y profundidad
- Gradientes de color verde (#00c896) y morado (#9333ea)

### Modo Oscuro por Defecto
- Fondo oscuro principal (#0f172a)
- Texto claro (#f1f5f9)
- Alto contraste para mejor legibilidad

### Animaciones Suaves
- Transiciones CSS personalizadas
- Efectos hover interactivos
- Animaciones de entrada

## 🔐 Sistema de Autenticación

- **Registro de usuarios y login** con validación de email y contraseñas seguras
- **Perfiles de usuario** con datos editables
- **Roles**: Usuario estándar y Administrador
- **Sesiones persistentes** con localStorage

### Credenciales de Admin por Defecto
```
Email: admin@lowpadel.com
Password: Admin01@
```

## 🛒 Funcionalidades de E-commerce

### Para Usuarios
- ✅ Explorar catálogo de palas
- ✅ Añadir productos al carrito
- ✅ Proceso de checkout completo
- ✅ Historial de pedidos
- ✅ Gestión de perfil

### Para Administradores
- ✅ CRUD completo de palas
- ✅ CRUD de noticias con editor visual
- ✅ Visualización de todos los pedidos
- ✅ Cambio de estado de pedidos

## 📦 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registro de usuarios
- `POST /api/auth/login` - Login de usuarios
- `GET /api/user/profile` - Obtener perfil

### Palas
- `GET /api/palas` - Listar todas las palas
- `GET /api/palas/[id]` - Obtener pala por ID
- `POST /api/palas` - Crear pala (admin)
- `PUT /api/palas/[id]` - Actualizar pala (admin)
- `DELETE /api/palas/[id]` - Eliminar pala (admin)

### Noticias
- `GET /api/noticias` - Listar noticias
- `GET /api/noticias/[id]` - Obtener noticia por ID
- `POST /api/noticias` - Crear noticia (admin)
- `PUT /api/noticias/[id]` - Actualizar noticia (admin)
- `DELETE /api/noticias/[id]` - Eliminar noticia (admin)

### Pedidos
- `GET /api/pedidos` - Obtener pedidos del usuario
- `POST /api/pedidos` - Crear nuevo pedido


## 📄 Licencia

Este proyecto es de código abierto.

## 👤 Autor

Desarrollado por mí, Sergio Chiva, junior developer.