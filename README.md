# 🏓 LowPadel - Tienda Online de Palas de Pádel

[![Astro](https://img.shields.io/badge/Astro-5.12.4-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

**LowPadel** es una tienda online especializada en palas de pádel de jugadores profesionales. El proyecto combina un frontend moderno desarrollado con **Astro** y un backend robusto con **Node.js + Express + MongoDB Atlas**.

---

## 🌟 Características

### Frontend
- ✨ **Diseño Moderno**: Interfaz elegante con glassmorphism y gradientes verdes/morados
- 🎨 **Responsive**: Adaptado para dispositivos móviles, tablets y escritorio
- 🏆 **Perfiles de Jugadores**: Secciones dedicadas a Tapia, Galán, Coello y Chingo
- 📰 **Sistema de Noticias**: Gestión dinámica de noticias del mundo del pádel
- 🛒 **Catálogo de Palas**: Visualización y gestión de productos
- 🔐 **Panel de Admin**: Sistema de autenticación para gestionar contenido

### Backend
- 🚀 **API RESTful**: Endpoints completos para CRUD de palas
- 🔒 **Autenticación**: Sistema de verificación con email y password
- 📦 **MongoDB Atlas**: Base de datos en la nube
- 🖼️ **Manejo de Imágenes**: Soporte para Base64 y archivos
- ✅ **Validación**: Validación robusta de datos con Mongoose
- 🌐 **CORS**: Configurado para desarrollo y producción
- ☁️ **Deploy Ready**: Preparado para desplegar en Vercel

---

## 📸 Preview

```
🏠 Inicio → Bienvenida con vídeos de jugadores
👤 Jugadores → Perfiles de Tapia, Galán, Coello, Chingo
🏓 Palas → Catálogo de productos con precios
📰 Noticias → Últimas noticias del pádel
👨‍💼 Admin → Panel para gestionar palas y noticias
```

---

## 🛠️ Tecnologías

### Frontend
- **Framework**: [Astro](https://astro.build) - Framework web moderno
- **Estilos**: CSS3 con gradientes, glassmorphism y animaciones
- **JavaScript**: Vanilla JS para interactividad

### Backend
- **Runtime**: Node.js 14+
- **Framework**: Express 5.1.0
- **Base de Datos**: MongoDB Atlas (Cloud)
- **ODM**: Mongoose 8.20.0
- **Autenticación**: Headers personalizados
- **Subida de Archivos**: Multer 2.0.2
- **Validación**: Validator.js

---

## 🚀 Instalación y Uso

### Prerequisitos

- Node.js v14 o superior
- npm o yarn
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

### 3️⃣ Instalar Dependencias del Backend

```bash
cd backend
npm install
```

### 4️⃣ Configurar Variables de Entorno

Crea un archivo `.env` en la carpeta `backend`:

```env
PORT=4000
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/lowpadel?retryWrites=true&w=majority
ADMIN_EMAIL=admin@lowpadel.com
ADMIN_PASSWORD=Admin01@
```

> 📝 **Nota**: Reemplaza `usuario`, `password` y `cluster` con tus credenciales de MongoDB Atlas.

### 5️⃣ Iniciar el Backend

```bash
cd backend
npm run dev
```

El servidor estará disponible en `http://localhost:4000`

### 6️⃣ Inicializar la Base de Datos

```powershell
# Cargar las 8 palas iniciales
Invoke-WebRequest -Uri "http://localhost:4000/api/palas/seed" -Method POST
```

### 7️⃣ Iniciar el Frontend

En otra terminal:

```bash
cd ..
npm run dev
```

El sitio estará disponible en `http://localhost:4321`

---

## 📡 API Endpoints

### Base URL: `http://localhost:4000/api/palas`

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `GET` | `/` | Obtener todas las palas | No |
| `GET` | `/:id` | Obtener pala por ID | No |
| `GET` | `/jugador/:jugador` | Obtener palas por jugador | No |
| `POST` | `/seed` | Inicializar BD con datos | No |
| `POST` | `/` | Crear nueva pala | ✅ |
| `PUT` | `/:id` | Actualizar pala | ✅ |
| `DELETE` | `/:id` | Eliminar pala | ✅ |

**Autenticación (Headers):**
```javascript
headers: {
  'email': 'admin@lowpadel.com',
  'password': 'Admin01@'
}
```

---

## 🔐 Credenciales de Admin

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
