# 🚀 Guía de Deployment Backend en Vercel

## 📋 Preparación del Backend para Vercel

### 1. Estructura de Archivos

Tu backend ya tiene `vercel.json`, verifica que tenga esta configuración:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/server.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### 2. Actualizar `package.json`

Verifica que tu `backend/package.json` tenga:

```json
{
  "name": "lowpadel-backend",
  "version": "1.0.0",
  "type": "module",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "dependencies": {
    "express": "^5.1.0",
    "mongoose": "^8.20.0",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "multer": "^2.0.2",
    "validator": "^13.15.23"
  }
}
```

---

## 🔧 Configuración de Variables de Entorno en Vercel

### Opción 1: Via Dashboard de Vercel

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Añade las siguientes variables:

```
MONGO_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/lowpadel?retryWrites=true&w=majority
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://tu-frontend.vercel.app
```

### Opción 2: Via Vercel CLI

```powershell
vercel env add MONGO_URI
# Pegar tu conexión de MongoDB cuando te lo pida

vercel env add PORT
# Escribir: 5000

vercel env add NODE_ENV
# Escribir: production

vercel env add FRONTEND_URL
# Escribir: https://tu-frontend.vercel.app
```

---

## 📦 Deploy del Backend

### Método 1: Via Vercel CLI (Recomendado)

```powershell
# 1. Instalar Vercel CLI si no lo tienes
npm install -g vercel

# 2. Login
vercel login

# 3. Ir a la carpeta del backend
cd backend

# 4. Deploy
vercel --prod
```

### Método 2: Via GitHub

1. Sube tu código a GitHub
2. Ve a [vercel.com/dashboard](https://vercel.com/dashboard)
3. Click en "Add New Project"
4. Importa tu repositorio
5. En **Root Directory**, selecciona `backend`
6. Click en "Deploy"

---

## 🔄 Actualizar CORS en el Backend

Una vez desplegado el backend, actualiza `src/server.js`:

```javascript
import cors from 'cors';

const corsOptions = {
  origin: [
    'http://localhost:4321',
    'https://lowpadel.vercel.app',  // Tu frontend en Vercel
    'https://tu-dominio-custom.com'  // Si tienes dominio personalizado
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

Redeploya después de este cambio:

```powershell
cd backend
vercel --prod
```

---

## 🌐 Actualizar Frontend para usar Backend de Producción

### Método 1: Variables de Entorno en Astro

Crea `frontend/.env.production`:

```env
PUBLIC_API_URL=https://tu-backend.vercel.app/api
```

Y crea `frontend/.env.development`:

```env
PUBLIC_API_URL=http://localhost:5000/api
```

### Método 2: Detección Automática

En `src/config/api.js`:

```javascript
export const API_URL = 
  import.meta.env.PUBLIC_API_URL || 
  (import.meta.env.PROD 
    ? 'https://tu-backend.vercel.app/api' 
    : 'http://localhost:5000/api');
```

---

## ✅ Verificar el Deploy

### 1. Probar el Health Endpoint

```powershell
Invoke-RestMethod -Uri "https://tu-backend.vercel.app/api/palas" -Method GET
```

### 2. Ver Logs en Vercel

```powershell
vercel logs tu-backend-url
```

O en el dashboard: Project → Deployments → Click en deployment → Runtime Logs

### 3. Testing de Endpoints

```powershell
# Palas
Invoke-RestMethod -Uri "https://tu-backend.vercel.app/api/palas" -Method GET

# Noticias
Invoke-RestMethod -Uri "https://tu-backend.vercel.app/api/noticias" -Method GET

# Seed de palas (solo la primera vez)
Invoke-RestMethod -Uri "https://tu-backend.vercel.app/api/palas/seed" -Method POST

# Seed de noticias
Invoke-RestMethod -Uri "https://tu-backend.vercel.app/api/noticias/seed" -Method POST
```

---

## 🔒 MongoDB Atlas - Whitelist de IPs

### Permitir todas las IPs (para Vercel)

Vercel usa IPs dinámicas, por lo que debes permitir todas:

1. Ve a [MongoDB Atlas](https://cloud.mongodb.com/)
2. Network Access → IP Access List
3. Click "Add IP Address"
4. Selecciona "Allow Access from Anywhere"
5. IP: `0.0.0.0/0`
6. Confirm

> **⚠️ Nota de Seguridad**: Esto es necesario para serverless functions. Asegúrate de que tu usuario de MongoDB tenga permisos limitados solo a la base de datos `lowpadel`.

---

## 🎯 URLs Finales

Después del deploy, tendrás:

- **Frontend**: `https://lowpadel.vercel.app`
- **Backend**: `https://lowpadel-backend.vercel.app` (o similar)
- **API Base**: `https://lowpadel-backend.vercel.app/api`

### Endpoints Disponibles

```
# Usuarios
POST   https://tu-backend.vercel.app/api/usuarios/registro
POST   https://tu-backend.vercel.app/api/usuarios/login
GET    https://tu-backend.vercel.app/api/usuarios/:id
PUT    https://tu-backend.vercel.app/api/usuarios/:id
DELETE https://tu-backend.vercel.app/api/usuarios/:id

# Palas
GET    https://tu-backend.vercel.app/api/palas
GET    https://tu-backend.vercel.app/api/palas/:id
POST   https://tu-backend.vercel.app/api/palas
PUT    https://tu-backend.vercel.app/api/palas/:id
DELETE https://tu-backend.vercel.app/api/palas/:id
POST   https://tu-backend.vercel.app/api/palas/seed

# Noticias
GET    https://tu-backend.vercel.app/api/noticias
GET    https://tu-backend.vercel.app/api/noticias/:id
POST   https://tu-backend.vercel.app/api/noticias
PUT    https://tu-backend.vercel.app/api/noticias/:id
DELETE https://tu-backend.vercel.app/api/noticias/:id
POST   https://tu-backend.vercel.app/api/noticias/seed

# Pedidos
POST   https://tu-backend.vercel.app/api/pedidos
GET    https://tu-backend.vercel.app/api/pedidos/:id
GET    https://tu-backend.vercel.app/api/pedidos/usuario/:userId
PUT    https://tu-backend.vercel.app/api/pedidos/:id/estado
PUT    https://tu-backend.vercel.app/api/pedidos/:id/cancelar
```

---

## 🐛 Troubleshooting

### Error: "Function exceeded maximum size"

**Solución**: Optimiza `node_modules`. Crea `.vercelignore`:

```
node_modules
.env
.git
*.md
test/
```

Y ejecuta:

```powershell
npm prune --production
```

### Error: "Cannot find module"

**Solución**: Verifica que todas las imports usen `.js` en ES Modules:

```javascript
// ❌ Incorrecto
import Usuario from './models/Usuario';

// ✅ Correcto
import Usuario from './models/Usuario.js';
```

### Error: MongoDB timeout

**Solución**: 
1. Verifica que `0.0.0.0/0` esté en MongoDB Atlas whitelist
2. Verifica que `MONGO_URI` en Vercel tenga el formato correcto
3. Verifica que el cluster esté activo

### Error: CORS bloqueado

**Solución**: Asegúrate de que el frontend esté en la lista de CORS del backend:

```javascript
const corsOptions = {
  origin: 'https://tu-frontend.vercel.app',
  credentials: true
};
```

---

## 📝 Checklist Post-Deploy

- [ ] Backend desplegado en Vercel
- [ ] Variables de entorno configuradas en Vercel
- [ ] MongoDB Atlas whitelist configurado (`0.0.0.0/0`)
- [ ] Seeds ejecutados en producción
- [ ] CORS actualizado con URL del frontend
- [ ] Frontend actualizado con URL del backend
- [ ] Todos los endpoints probados
- [ ] Usuario admin creado en producción
- [ ] Logs revisados sin errores

---

## 🔄 Workflow de Desarrollo

### Desarrollo Local

```powershell
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd ..
npm run dev
```

### Deploy a Producción

```powershell
# Backend
cd backend
vercel --prod

# Frontend (si cambió)
cd ..
git add .
git commit -m "Update frontend"
git push
# Vercel autodeploya desde GitHub
```

---

## 📊 Monitoreo

### Ver estadísticas en Vercel

1. Dashboard → Tu Proyecto → Analytics
2. Revisa:
   - Requests por segundo
   - Response time
   - Error rate
   - Bandwidth usage

### Configurar Alerts

1. Settings → Notifications
2. Activa:
   - Deployment failed
   - Build errors
   - High error rate

---

## 🎉 ¡Deploy Completo!

Tu aplicación LowPadel ahora está completamente desplegada:

- ✅ Frontend en Vercel (Astro)
- ✅ Backend en Vercel (Express)
- ✅ Base de datos en MongoDB Atlas
- ✅ CORS configurado
- ✅ Variables de entorno seguras

**URLs de ejemplo**:
- Frontend: `https://lowpadel.vercel.app`
- Backend: `https://lowpadel-backend.vercel.app`
- MongoDB: `cluster0.xxxxx.mongodb.net`

---

## 🔐 Seguridad Adicional (Opcional)

### Proteger rutas de administrador

```javascript
// middleware/adminMiddleware.js
export const isAdmin = (req, res, next) => {
  if (!req.usuario?.isAdmin) {
    return res.status(403).json({ 
      mensaje: 'Acceso denegado: Solo administradores' 
    });
  }
  next();
};

// En routes
import { isAdmin } from '../middleware/adminMiddleware.js';
router.post('/palas', protect, isAdmin, createPala);
```

### Rate Limiting

```powershell
npm install express-rate-limit
```

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // máximo 100 requests por IP
});

app.use('/api/', limiter);
```

---

**¡Tu aplicación está lista para producción! 🚀**
