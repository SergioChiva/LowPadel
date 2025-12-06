# 🏓 LowPadel - E-commerce de Palas de Pádel

[![Astro](https://img.shields.io/badge/Astro-5.12.4-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

**LowPadel** es una plataforma e-commerce completa especializada en palas de pádel profesionales. Desarrollada con **Astro** en el frontend y **Node.js + Express + MongoDB** en el backend, ofrece una experiencia de compra moderna con sistema de autenticación, gestión de pedidos y panel de administración.

🌐 **Demo Live**: [https://lowpadel.vercel.app](https://lowpadel.vercel.app)

---

## 🌟 Características Principales

### 🛍️ E-commerce Completo
- ✨ **Catálogo de Productos**: 8+ palas profesionales de Tapia, Galán, Coello y Chingotto
- 🛒 **Carrito de Compras**: Sistema de carrito con contador en tiempo real
- 💳 **Checkout**: Proceso de compra simulado con validación de tarjeta
- 📦 **Gestión de Pedidos**: Historial completo de compras con estados
- 🔐 **Autenticación**: Sistema completo de registro/login con localStorage y API

### 👤 Perfiles de Usuario
- 📋 **Perfil Personal**: Gestión de datos del usuario (nombre, email, foto)
- 🛍️ **Historial de Pedidos**: Visualización de compras con estados (pendiente, procesando, enviado, entregado, cancelado)
- ✏️ **Edición de Perfil**: Actualización de información personal
- 🎯 **Verificación Admin**: Acceso diferenciado para administradores

### 👨‍💼 Panel de Administración
- 🏓 **Gestión de Palas**: CRUD completo (crear, leer, actualizar, eliminar)
- 📰 **Gestión de Noticias**: Sistema de noticias con editor completo
- 👥 **Gestión de Usuarios**: Listado y administración de cuentas
- 📊 **Gestión de Pedidos**: Actualización de estados y seguimiento

### 🎨 Diseño y UX
- 💎 **Glassmorphism**: Interfaz moderna con efectos de cristal
- 🌈 **Tema Verde/Morado**: Paleta de colores profesional (#00c896, #9333ea)
- 📱 **Responsive**: Adaptado para móviles, tablets y escritorio
- ⚡ **Animaciones**: Transiciones suaves y efectos visuales
- 🌙 **Modo Oscuro**: Diseño oscuro con video de fondo

### 🏆 Perfiles de Jugadores
- 🎾 **Agustín Tapia**: Nox AT10 Luxury Genius 18K y más
- 🏅 **Alejandro Galán**: Adidas Metalbone HDR y EDT
- 💪 **Arturo Coello**: Head Delta Pro y Extreme Pro
- 🔥 **Federico Chingotto**: Bullpadel Vertex 03 Comfort y Control

---

## 🛠️ Stack Tecnológico

### Frontend
- **Framework**: [Astro 5.12.4](https://astro.build) - Framework web de próxima generación
- **Estilos**: CSS3 con variables CSS, gradientes, glassmorphism
- **JavaScript**: Vanilla JS moderno (ES6+)
- **Storage**: LocalStorage para estado temporal
- **Deploy**: Vercel (SSG)

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express 5.1.0
- **Base de Datos**: MongoDB Atlas (Cloud)
- **ODM**: Mongoose 8.20.0
- **Middleware**: CORS, Express JSON (10MB limit)
- **File Upload**: Multer 2.0.2 (5MB limit, solo imágenes)
- **Validación**: Validator 13.15.23
- **Module System**: ES Modules (import/export)
- **Deploy**: Vercel Serverless Functions

### Estructura de la Base de Datos
```javascript
// Modelos Mongoose
Usuario {
  nombre, email, password, fotoPerfil,
  isAdmin, pedidos[], timestamps
}

Pala {
  nombre, jugador, precio, descripcion,
  imagen, categoria, stock, timestamps
}

Noticia {
  titulo, descripcion, imagen, autor, timestamps
}

Pedido {
  usuario, productos[], total, estado,
  datosPago{}, direccionEnvio{}, timestamps
}
```

---

## 📸 Capturas de Pantalla

### Página Principal
![Home](docs/screenshot-home.png)

### Catálogo de Palas
![Palas](docs/screenshot-palas.png)

### Perfil de Usuario
![Perfil](docs/screenshot-perfil.png)

### Checkout
![Checkout](docs/screenshot-checkout.png)

## 🚀 Instalación Rápida

### Prerequisitos

- Node.js v18 o superior
- npm o pnpm
- Cuenta en MongoDB Atlas (gratuita)
- Git

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/SergioChiva/LowPadel.git
cd LowPadel
```

### 2️⃣ Instalar Dependencias del Frontend

```bash
npm install
```

### 3️⃣ Configurar Backend

```bash
cd backend
npm install
```

Crea el archivo `backend/.env`:

```env
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/lowpadel?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:4321
```

### 4️⃣ Iniciar el Proyecto

**Opción 1: Desarrollo completo (Frontend + Backend)**

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd ..
npm run dev
```

**Opción 2: Solo Frontend (sin base de datos)**

```bash
npm run dev
```

> El frontend funciona con localStorage sin necesidad del backend para testing básico.

### 5️⃣ Poblar la Base de Datos (Primera vez)

```powershell
# Seed de palas (8 palas)
Invoke-RestMethod -Uri "http://localhost:5000/api/palas/seed" -Method POST

# Seed de noticias (3 noticias)
Invoke-RestMethod -Uri "http://localhost:5000/api/noticias/seed" -Method POST

# Crear usuario admin
$body = @{
    nombre = "Administrador"
    email = "admin@lowpadel.com"
    password = "Admin01@"
    isAdmin = $true
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/usuarios/registro" `
    -Method POST -ContentType "application/json" -Body $body
```

### 6️⃣ Acceder a la Aplicación

- **Frontend**: [http://localhost:4321](http://localhost:4321)
- **Backend API**: [http://localhost:5000/api](http://localhost:5000/api)

**Credenciales Admin**:
- Email: `admin@lowpadel.com`
- Password: `Admin01@`

---

## 📡 API Reference

### Base URL
```
Desarrollo: http://localhost:5000/api
Producción: https://tu-backend.vercel.app/api
```

### 🔐 Usuarios

| Método | Endpoint | Descripción | Body |
|--------|----------|-------------|------|
| `POST` | `/usuarios/registro` | Registrar usuario | `{ nombre, email, password }` |
| `POST` | `/usuarios/login` | Iniciar sesión | `{ email, password }` |
| `GET` | `/usuarios/:id` | Obtener perfil | - |
| `PUT` | `/usuarios/:id` | Actualizar perfil | `{ nombre?, email?, fotoPerfil? }` |
| `DELETE` | `/usuarios/:id` | Eliminar cuenta | - |
| `GET` | `/usuarios/` | Listar usuarios (admin) | - |

### 🏓 Palas

| Método | Endpoint | Descripción | Body |
|--------|----------|-------------|------|
| `GET` | `/palas` | Listar todas las palas | - |
| `GET` | `/palas/:id` | Obtener pala por ID | - |
| `GET` | `/palas/jugador/:jugador` | Palas por jugador | - |
| `POST` | `/palas` | Crear pala (admin) | `{ nombre, jugador, precio, descripcion, imagen }` |
| `PUT` | `/palas/:id` | Actualizar pala (admin) | `{ nombre?, precio?, stock?, ... }` |
| `DELETE` | `/palas/:id` | Eliminar pala (admin) | - |
| `POST` | `/palas/seed` | Poblar BD con 8 palas | - |

### 📰 Noticias

| Método | Endpoint | Descripción | Body |
|--------|----------|-------------|------|
| `GET` | `/noticias` | Listar noticias | - |
| `GET` | `/noticias/:id` | Obtener noticia | - |
| `POST` | `/noticias` | Crear noticia (admin) | `{ titulo, descripcion, imagen }` |
| `PUT` | `/noticias/:id` | Actualizar noticia (admin) | `{ titulo?, descripcion?, imagen? }` |
| `DELETE` | `/noticias/:id` | Eliminar noticia (admin) | - |
| `POST` | `/noticias/seed` | Poblar con 3 noticias | - |

### 📦 Pedidos

| Método | Endpoint | Descripción | Body |
|--------|----------|-------------|------|
| `POST` | `/pedidos` | Crear pedido | `{ usuario, productos[], direccionEnvio, datosPago }` |
| `GET` | `/pedidos/:id` | Obtener pedido | - |
| `GET` | `/pedidos/usuario/:userId` | Pedidos de un usuario | - |
| `PUT` | `/pedidos/:id/estado` | Actualizar estado (admin) | `{ estado }` |
| `PUT` | `/pedidos/:id/cancelar` | Cancelar pedido | - |

---

## 📂 Estructura del Proyecto

```
LowPadel/
├── backend/                    # Backend API
│   ├── src/
│   │   ├── server.js          # Punto de entrada
│   │   ├── models/            # Esquemas Mongoose
│   │   │   ├── Usuario.js
│   │   │   ├── Pala.js
│   │   │   ├── Noticia.js
│   │   │   └── Pedido.js
│   │   ├── controllers/       # Lógica de negocio
│   │   │   ├── usuarioController.js
│   │   │   ├── palaController.js
│   │   │   ├── noticiaController.js
│   │   │   └── pedidoController.js
│   │   ├── routes/            # Rutas API
│   │   │   ├── usuarioRoutes.js
│   │   │   ├── palaRoutes.js
│   │   │   ├── noticiaRoutes.js
│   │   │   └── pedidoRoutes.js
│   │   ├── middlewares/
│   │   │   └── errorHandler.js
│   │   └── utils/
│   │       └── multerConfig.js
│   ├── package.json
│   ├── vercel.json            # Config Vercel
│   └── .env                   # Variables de entorno
│
├── src/                       # Frontend Astro
│   ├── components/
│   │   ├── aboutComponent.astro
│   │   ├── chingoComponent.astro
│   │   ├── coelloComponent.astro
│   │   ├── contactoComponent.astro
│   │   ├── galanComponent.astro
│   │   ├── noticiasComponent.astro
│   │   ├── palasAdminComponent.astro
│   │   ├── palasComponent.astro
│   │   ├── registerComponent.astro
│   │   ├── tapiaComponent.astro
│   │   └── Welcome.astro
│   ├── layouts/
│   │   └── Layout.astro       # Layout principal
│   ├── pages/
│   │   ├── index.astro        # Página principal
│   │   ├── login.astro        # Login/Registro
│   │   ├── perfil.astro       # Perfil de usuario
│   │   ├── checkout.astro     # Proceso de compra
│   │   ├── palas.astro        # Catálogo
│   │   ├── noticias.astro
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── chingo.astro
│   │   ├── coello.astro
│   │   ├── galan.astro
│   │   └── tapia.astro
│   └── styles/                # Estilos globales
│
├── public/                    # Recursos estáticos
│   ├── Layout/
│   │   └── logo.png
│   ├── palas/                 # Imágenes de palas
│   ├── scripts/
│   │   ├── jugadores.js       # Lógica del catálogo
│   │   ├── logo.js
│   │   ├── nav.js
│   │   └── usuario.js
│   ├── styles/
│   │   └── palas.css
│   ├── videos/
│   └── Welcome/               # Perfiles de jugadores
│
├── astro.config.mjs           # Config Astro
├── package.json
├── README.md                  # Este archivo
├── INTEGRACION_API.md         # Guía de integración
├── DEPLOY_BACKEND.md          # Guía de deployment
└── ADMIN_INSTRUCTIONS.md      # Instrucciones admin
```

---

## 🔐 Sistema de Autenticación

### Credenciales de Admin por Defecto

```
Email: admin@lowpadel.com
Password: Admin01@
```

### Roles de Usuario

- **Usuario Normal**: Puede comprar palas, ver pedidos, editar perfil
- **Administrador**: Acceso completo a CRUD de palas, noticias y gestión de pedidos

### Funcionalidades por Rol

| Funcionalidad | Usuario | Admin |
|--------------|---------|-------|
| Ver catálogo | ✅ | ✅ |
| Comprar palas | ✅ | ✅ |
| Ver/editar perfil | ✅ | ✅ |
| Historial de pedidos | ✅ | ✅ |
| Crear/editar palas | ❌ | ✅ |
| Crear/editar noticias | ❌ | ✅ |
| Gestionar usuarios | ❌ | ✅ |
| Actualizar estado de pedidos | ❌ | ✅ |

---

## 🚀 Deployment

### Deploy en Vercel (Recomendado)

#### Frontend

```bash
# Ya configurado para Vercel
git push origin main
# Vercel detectará cambios y desplegará automáticamente
```

#### Backend

Ver guía completa en [DEPLOY_BACKEND.md](DEPLOY_BACKEND.md)

```bash
cd backend
vercel --prod
```

**Variables de entorno requeridas en Vercel:**
- `MONGO_URI`
- `PORT`
- `NODE_ENV`
- `FRONTEND_URL`

### MongoDB Atlas Setup

1. Crea un cluster gratuito en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea una base de datos llamada `lowpadel`
3. Añade `0.0.0.0/0` al IP Whitelist (necesario para Vercel)
4. Copia la connection string a tu `.env`

---

## 📚 Documentación Adicional

- 📖 [**INTEGRACION_API.md**](INTEGRACION_API.md) - Guía completa para integrar el backend con el frontend
- 🚀 [**DEPLOY_BACKEND.md**](DEPLOY_BACKEND.md) - Instrucciones detalladas para desplegar en Vercel
- 👨‍💼 [**ADMIN_INSTRUCTIONS.md**](ADMIN_INSTRUCTIONS.md) - Manual del panel de administración

---

## 🧪 Testing

### Testing del Backend

```powershell
# Listar palas
Invoke-RestMethod -Uri "http://localhost:5000/api/palas" -Method GET

# Crear usuario
$body = @{
    nombre = "Juan Pérez"
    email = "juan@test.com"
    password = "Test123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/usuarios/registro" `
    -Method POST -ContentType "application/json" -Body $body
```

### Testing del Frontend

1. Navega a `http://localhost:4321`
2. Prueba el registro/login
3. Añade palas al carrito
4. Completa un pedido de prueba
5. Revisa el perfil y historial de pedidos

---

## 🐛 Troubleshooting

### Error: "Cannot find module"

```powershell
# Reinstalar dependencias
rm -r node_modules
npm install
```

### Error: MongoDB Connection Failed

- Verifica que tu IP esté en el whitelist de MongoDB Atlas
- Comprueba las credenciales en `MONGO_URI`
- Verifica que el cluster esté activo

### Error: CORS Blocked

- Asegúrate de que `FRONTEND_URL` en `.env` coincida con tu URL
- Verifica que el backend esté corriendo en el puerto correcto

### Las palas no se muestran

1. Verifica que el backend esté corriendo
2. Ejecuta el seed: `POST http://localhost:5000/api/palas/seed`
3. Revisa la consola del navegador (F12) para errores

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Roadmap

- [x] Sistema de autenticación completo
- [x] Carrito de compras
- [x] Proceso de checkout
- [x] Gestión de pedidos
- [x] Panel de administración
- [x] CRUD de palas y noticias
- [ ] Implementar JWT para autenticación
- [ ] Sistema de recuperación de contraseña
- [ ] Filtros avanzados en el catálogo
- [ ] Sistema de valoraciones
- [ ] Integración con pasarela de pago real
- [ ] Sistema de notificaciones por email
- [ ] Chat de soporte en vivo
- [ ] Modo oscuro/claro

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 👨‍💻 Autor

**Sergio Chiva**

- GitHub: [@SergioChiva](https://github.com/SergioChiva)
- Proyecto: [LowPadel](https://github.com/SergioChiva/LowPadel)

---

## 🙏 Agradecimientos

- Imágenes de palas: Adidas, Nox, Head, Bullpadel
- Jugadores destacados: Agustín Tapia, Alejandro Galán, Arturo Coello, Federico Chingotto
- Comunidad de Astro y MongoDB

---

## 📧 Contacto

¿Tienes preguntas o sugerencias? Abre un [issue](https://github.com/SergioChiva/LowPadel/issues) o contacta directamente.

---

<div align="center">

**⭐ Si te gusta el proyecto, dale una estrella en GitHub ⭐**

Hecho con ❤️ y ☕

</div>

Para acceder al panel de administración:

- **Email**: `admin@lowpadel.com`
- **Password**: `Admin01@`

---

## 📂 Estructura del Proyecto

```
LowPadel/
├── backend/                      # API Backend
│   ├── src/
│   │   ├── controllers/         # Lógica de negocio
│   │   ├── models/              # Modelos de MongoDB
│   │   ├── routes/              # Rutas de la API
│   │   ├── middlewares/         # Middleware de autenticación
│   │   ├── utils/               # Utilidades (multer)
│   │   └── server.js            # Punto de entrada
│   ├── public/palas/            # Imágenes subidas
│   ├── .env                     # Variables de entorno
│   ├── package.json
│   ├── vercel.json              # Configuración Vercel
│   ├── README.md                # Docs del backend
│   └── DEPLOY-VERCEL.md         # Guía de despliegue
│
├── src/                         # Frontend Astro
│   ├── components/              # Componentes Astro
│   │   ├── Welcome.astro
│   │   ├── palasAdminComponent.astro
│   │   ├── noticiasComponent.astro
│   │   ├── tapiaComponent.astro
│   │   └── ...
│   ├── layouts/
│   │   └── Layout.astro         # Layout principal
│   ├── pages/                   # Páginas del sitio
│   │   ├── index.astro          # Inicio
│   │   ├── palas.astro          # Catálogo
│   │   ├── noticias.astro       # Noticias
│   │   ├── tapia.astro          # Perfil Tapia
│   │   └── ...
│   └── styles/                  # Estilos globales
│
├── public/                      # Archivos estáticos
│   ├── scripts/                 # JavaScript
│   ├── styles/                  # CSS adicional
│   ├── videos/                  # Videos de jugadores
│   └── palas/                   # Imágenes de palas
│
├── astro.config.mjs             # Configuración Astro
├── package.json
└── README.md                    # Este archivo
```

---

## 🌐 Despliegue

### Frontend (Vercel/Netlify/GitHub Pages)

```bash
npm run build
```

Los archivos se generarán en `dist/`

### Backend (Vercel)

El backend incluye `vercel.json` para despliegue directo.

**Pasos rápidos:**

1. Sube el proyecto a GitHub
2. Importa en [Vercel](https://vercel.com)
3. Configura las variables de entorno
4. Deploy automático

📖 **Guía completa**: Ver `backend/DEPLOY-VERCEL.md`

---

## 🎯 Roadmap

- [x] Frontend con Astro
- [x] Backend con Express + MongoDB
- [x] Sistema de autenticación
- [x] CRUD de palas
- [x] Panel de administración
- [x] Sistema de noticias
- [ ] Carrito de compras
- [ ] Pasarela de pago
- [ ] Sistema de usuarios avanzado
- [ ] Filtros y búsqueda avanzada
- [ ] Sistema de reviews

---

## 📝 Scripts Disponibles

### Frontend
```bash
npm run dev      # Desarrollo (localhost:4321)
npm run build    # Build para producción
npm run preview  # Preview del build
```

### Backend
```bash
npm run dev      # Desarrollo con nodemon
npm start        # Producción
```

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Documentación Adicional

- 📚 [README del Backend](backend/README.md) - Documentación completa de la API
- 🚀 [Guía de Despliegue en Vercel](backend/DEPLOY-VERCEL.md)
- 🔗 [Guía de Integración Frontend](INTEGRACION_FRONTEND.md)
- 👨‍💼 [Instrucciones del Admin](ADMIN_INSTRUCTIONS.md)

---

## 🐛 Problemas Conocidos

- Las imágenes en Vercel deben manejarse con Base64 o servicios externos (Cloudinary)
- El plan gratuito de MongoDB Atlas tiene límites de almacenamiento (512MB)

---

## 👤 Autor

**Sergio Chiva**

- GitHub: [@SergioChiva](https://github.com/SergioChiva)

---

## 📜 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 🙏 Agradecimientos

- [Astro](https://astro.build) por el increíble framework
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) por la base de datos gratuita
- [Vercel](https://vercel.com) por el hosting gratuito
- La comunidad de pádel por la inspiración

---

## ⭐ ¿Te gusta el proyecto?

Si este proyecto te resulta útil, ¡dale una estrella! ⭐

---

<div align="center">

**[⬆ Volver arriba](#-lowpadel---tienda-online-de-palas-de-pádel)**

Hecho con ❤️ y mucho ☕

</div>
