# 📚 Guía de Integración Backend-Frontend

## 📋 Índice
1. [Configuración Inicial](#configuración-inicial)
2. [Variables de Entorno](#variables-de-entorno)
3. [Iniciar el Backend](#iniciar-el-backend)
4. [Poblar la Base de Datos](#poblar-la-base-de-datos)
5. [Integrar APIs en Frontend](#integrar-apis-en-frontend)
6. [Testing de Endpoints](#testing-de-endpoints)
7. [Autenticación y Tokens](#autenticación-y-tokens)

---

## 🚀 Configuración Inicial

### 1. Instalar Dependencias del Backend

```powershell
cd backend
npm install
```

### 2. Verificar Estructura del Backend

El backend debe tener la siguiente estructura:
```
backend/
├── src/
│   ├── server.js              # Punto de entrada
│   ├── models/                # Esquemas de Mongoose
│   │   ├── Usuario.js
│   │   ├── Pala.js
│   │   ├── Noticia.js
│   │   └── Pedido.js
│   ├── controllers/           # Lógica de negocio
│   │   ├── usuarioController.js
│   │   ├── palaController.js
│   │   ├── noticiaController.js
│   │   └── pedidoController.js
│   ├── routes/                # Definición de rutas
│   │   ├── usuarioRoutes.js
│   │   ├── palaRoutes.js
│   │   ├── noticiaRoutes.js
│   │   └── pedidoRoutes.js
│   ├── middlewares/           # Middleware de error
│   │   └── errorHandler.js
│   └── utils/                 # Utilidades
│       └── multerConfig.js
├── package.json
└── .env                       # Variables de entorno
```

---

## 🔐 Variables de Entorno

Crea o verifica el archivo `backend/.env`:

```env
# MongoDB
MONGO_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/lowpadel?retryWrites=true&w=majority

# Servidor
PORT=5000
NODE_ENV=development

# CORS (Frontend URL)
FRONTEND_URL=http://localhost:4321
```

> **Nota**: Reemplaza `usuario` y `contraseña` con tus credenciales de MongoDB Atlas.

---

## ▶️ Iniciar el Backend

### Modo Desarrollo (con nodemon)

```powershell
cd backend
npm run dev
```

### Modo Producción

```powershell
cd backend
npm start
```

Deberías ver:
```
🚀 Servidor corriendo en http://localhost:5000
✅ MongoDB conectado exitosamente
```

---

## 🗄️ Poblar la Base de Datos

### 1. Seed de Palas (8 palas iniciales)

```powershell
# Usando PowerShell
Invoke-RestMethod -Uri "http://localhost:5000/api/palas/seed" -Method POST
```

O usando curl:
```bash
curl -X POST http://localhost:5000/api/palas/seed
```

Respuesta esperada:
```json
{
  "mensaje": "✅ Base de datos poblada correctamente",
  "palas": 8
}
```

### 2. Seed de Noticias (3 noticias de ejemplo)

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/noticias/seed" -Method POST
```

Respuesta esperada:
```json
{
  "mensaje": "✅ Noticias de ejemplo creadas",
  "noticias": 3
}
```

### 3. Crear Usuario Administrador

```powershell
$body = @{
    nombre = "Administrador"
    email = "admin@lowpadel.com"
    password = "Admin01@"
    isAdmin = $true
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/usuarios/registro" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body
```

---

## 🔗 Integrar APIs en Frontend

### 📦 Configuración Global del Frontend

Crea `src/config/api.js`:

```javascript
// Configuración de la API
export const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:5000/api';

// Headers comunes
export const getHeaders = () => {
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  return {
    'Content-Type': 'application/json',
    ...(usuario.token && { 'Authorization': `Bearer ${usuario.token}` })
  };
};

// Función helper para fetch
export const fetchAPI = async (endpoint, options = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...getHeaders(),
      ...options.headers
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.mensaje || 'Error en la petición');
  }

  return response.json();
};
```

---

### 🔐 Integración de Autenticación

#### Actualizar `src/pages/login.astro`

Reemplaza el manejo de `localStorage` con llamadas a la API:

```javascript
// Registro
async function registrar(e) {
  e.preventDefault();
  try {
    const response = await fetch('http://localhost:5000/api/usuarios/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: document.getElementById('reg-nombre').value,
        email: document.getElementById('reg-email').value,
        password: document.getElementById('reg-password').value
      })
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.mensaje);

    // Guardar usuario en localStorage
    localStorage.setItem('usuario', JSON.stringify(data.usuario));

    alert('✅ Registro exitoso');
    window.location.href = '/perfil';
  } catch (error) {
    alert('❌ ' + error.message);
  }
}

// Login
async function iniciarSesion(e) {
  e.preventDefault();
  try {
    const response = await fetch('http://localhost:5000/api/usuarios/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: document.getElementById('login-email').value,
        password: document.getElementById('login-password').value
      })
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.mensaje);

    // Guardar usuario
    localStorage.setItem('usuario', JSON.stringify(data.usuario));

    alert('✅ Sesión iniciada');
    window.location.href = '/perfil';
  } catch (error) {
    alert('❌ ' + error.message);
  }
}
```

---

### 👤 Integración del Perfil de Usuario

#### Actualizar `src/pages/perfil.astro`

```javascript
// Cargar datos del perfil desde la API
async function cargarPerfil() {
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  
  if (!usuario._id) {
    window.location.href = '/login';
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/api/usuarios/${usuario._id}`);
    const data = await response.json();

    if (response.ok) {
      // Actualizar localStorage con datos frescos
      localStorage.setItem('usuario', JSON.stringify(data));
      
      // Mostrar en la UI
      document.getElementById('perfilNombre').textContent = data.nombre;
      document.getElementById('perfilEmail').textContent = data.email;
      document.getElementById('imagenPerfilPerfil').src = data.fotoPerfil || 'default-image.jpg';

      // Cargar pedidos
      mostrarPedidos(data.pedidos || []);
    }
  } catch (error) {
    console.error('Error cargando perfil:', error);
  }
}

// Actualizar perfil
async function actualizarPerfil(e) {
  e.preventDefault();
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

  try {
    const response = await fetch(`http://localhost:5000/api/usuarios/${usuario._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: document.getElementById('editNombre').value,
        email: document.getElementById('editEmail').value,
        fotoPerfil: document.getElementById('editFotoPerfil').value
      })
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.mensaje);

    // Actualizar localStorage
    localStorage.setItem('usuario', JSON.stringify(data));

    alert('✅ Perfil actualizado');
    location.reload();
  } catch (error) {
    alert('❌ ' + error.message);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  cargarPerfil();
});
```

---

### 🎾 Integración de Palas

#### Actualizar `public/scripts/jugadores.js`

```javascript
// Función para cargar palas desde la API
async function cargarPalas() {
  try {
    const response = await fetch('http://localhost:5000/api/palas');
    const palas = await response.json();

    // Agrupar palas por jugador
    const jugadores = agruparPorJugador(palas);

    // Renderizar
    mostrarPalas(jugadores);
  } catch (error) {
    console.error('Error cargando palas:', error);
    // Fallback a datos locales si falla la API
    mostrarPalas(jugadoresLocales);
  }
}

function agruparPorJugador(palas) {
  const agrupadas = {};

  palas.forEach(pala => {
    if (!agrupadas[pala.jugador]) {
      agrupadas[pala.jugador] = {
        nombre: pala.jugador,
        palas: []
      };
    }
    agrupadas[pala.jugador].palas.push(pala);
  });

  return Object.values(agrupadas);
}

document.addEventListener('DOMContentLoaded', () => {
  cargarPalas();
});
```

---

### 📝 Integración del Panel de Administración de Palas

#### Actualizar `src/components/palasAdminComponent.astro`

```javascript
// Cargar palas desde la API
async function cargarPalas() {
  try {
    const response = await fetch('http://localhost:5000/api/palas');
    const palas = await response.json();
    
    mostrarPalas(palas);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Crear pala
async function crearPala(palaData) {
  try {
    const response = await fetch('http://localhost:5000/api/palas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(palaData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.mensaje);
    }

    alert('✅ Pala creada exitosamente');
    cargarPalas();
  } catch (error) {
    alert('❌ ' + error.message);
  }
}

// Actualizar pala
async function actualizarPala(id, palaData) {
  try {
    const response = await fetch(`http://localhost:5000/api/palas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(palaData)
    });

    if (!response.ok) throw new Error('Error al actualizar');

    alert('✅ Pala actualizada');
    cargarPalas();
  } catch (error) {
    alert('❌ ' + error.message);
  }
}

// Eliminar pala
async function eliminarPala(id) {
  if (!confirm('¿Eliminar esta pala?')) return;

  try {
    const response = await fetch(`http://localhost:5000/api/palas/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Error al eliminar');

    alert('✅ Pala eliminada');
    cargarPalas();
  } catch (error) {
    alert('❌ ' + error.message);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  cargarPalas();
});
```

---

### 📰 Integración de Noticias

Similar al código de palas, actualiza `src/components/noticiasComponent.astro`:

```javascript
async function cargarNoticias() {
  try {
    const response = await fetch('http://localhost:5000/api/noticias');
    const noticias = await response.json();
    
    mostrarNoticias(noticias);
  } catch (error) {
    console.error('Error:', error);
  }
}

// CRUD similar a palas
// POST /api/noticias
// PUT /api/noticias/:id
// DELETE /api/noticias/:id
```

---

### 🛒 Integración del Checkout

#### Actualizar `src/pages/checkout.astro`

```javascript
async function procesarPago(carrito, usuario) {
  try {
    const response = await fetch('http://localhost:5000/api/pedidos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usuario: usuario._id,
        productos: carrito.map(item => ({
          pala: item.id,  // ID de MongoDB de la pala
          nombrePala: item.nombre,
          precio: parseFloat(item.precio),
          cantidad: item.cantidad || 1
        })),
        direccionEnvio: {
          calle: document.getElementById('direccion').value,
          ciudad: document.getElementById('ciudad').value,
          codigoPostal: document.getElementById('codigoPostal').value,
          pais: document.getElementById('pais').value
        },
        datosPago: {
          numeroTarjeta: '**** **** **** ' + document.getElementById('numeroTarjeta').value.slice(-4),
          nombreTitular: document.getElementById('nombreTitular').value,
          fechaExpiracion: document.getElementById('fechaExpiracion').value
        }
      })
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.mensaje);

    // Limpiar carrito
    localStorage.removeItem('carrito');

    // Mostrar confirmación
    document.getElementById('numeroPedido').textContent = '#' + data._id;
    document.getElementById('modalConfirmacion').classList.remove('hidden');
  } catch (error) {
    alert('❌ Error al procesar el pedido: ' + error.message);
  }
}
```

---

## 🧪 Testing de Endpoints

### Usando PowerShell

#### 1. Usuarios

```powershell
# Registro
$body = @{
    nombre = "Juan Pérez"
    email = "juan@ejemplo.com"
    password = "Password123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/usuarios/registro" `
    -Method POST -ContentType "application/json" -Body $body

# Login
$body = @{
    email = "juan@ejemplo.com"
    password = "Password123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/usuarios/login" `
    -Method POST -ContentType "application/json" -Body $body

# Obtener perfil
Invoke-RestMethod -Uri "http://localhost:5000/api/usuarios/USUARIO_ID" -Method GET
```

#### 2. Palas

```powershell
# Listar todas
Invoke-RestMethod -Uri "http://localhost:5000/api/palas" -Method GET

# Obtener una pala
Invoke-RestMethod -Uri "http://localhost:5000/api/palas/PALA_ID" -Method GET

# Crear pala
$body = @{
    nombre = "Bullpadel Vertex 04"
    jugador = "Paquito Navarro"
    precio = 89.99
    descripcion = "Pala de alto rendimiento"
    imagen = "https://example.com/imagen.jpg"
    categoria = "profesional"
    stock = 25
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/palas" `
    -Method POST -ContentType "application/json" -Body $body
```

#### 3. Noticias

```powershell
# Listar todas
Invoke-RestMethod -Uri "http://localhost:5000/api/noticias" -Method GET

# Crear noticia
$body = @{
    titulo = "Nuevo torneo anunciado"
    descripcion = "Se anuncia el nuevo torneo de pádel..."
    imagen = "https://example.com/noticia.jpg"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/noticias" `
    -Method POST -ContentType "application/json" -Body $body
```

#### 4. Pedidos

```powershell
# Crear pedido
$body = @{
    usuario = "USUARIO_ID"
    productos = @(
        @{
            pala = "PALA_ID"
            nombrePala = "Adidas Metalbone"
            precio = 75
            cantidad = 2
        }
    )
    direccionEnvio = @{
        calle = "Calle Ejemplo 123"
        ciudad = "Madrid"
        codigoPostal = "28001"
        pais = "España"
    }
    datosPago = @{
        numeroTarjeta = "**** **** **** 1234"
        nombreTitular = "Juan Pérez"
        fechaExpiracion = "12/25"
    }
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri "http://localhost:5000/api/pedidos" `
    -Method POST -ContentType "application/json" -Body $body

# Ver pedidos de un usuario
Invoke-RestMethod -Uri "http://localhost:5000/api/pedidos/usuario/USUARIO_ID" -Method GET
```

---

## 🔒 Autenticación y Tokens (TODO: Implementar JWT)

### Próxima Implementación

Actualmente el backend no implementa JWT. Para añadir autenticación segura:

#### 1. Instalar dependencias

```powershell
cd backend
npm install jsonwebtoken bcrypt
```

#### 2. Actualizar `usuarioController.js`

```javascript
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Generar token
const generarToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// En registrarUsuario
const salt = await bcrypt.genSalt(10);
usuario.password = await bcrypt.hash(password, salt);

// Devolver token
res.status(201).json({
  usuario: {
    _id: usuario._id,
    nombre: usuario.nombre,
    email: usuario.email,
    isAdmin: usuario.isAdmin
  },
  token: generarToken(usuario._id)
});
```

#### 3. Crear middleware de autenticación

```javascript
// middlewares/authMiddleware.js
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ mensaje: 'No autorizado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = await Usuario.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    res.status(401).json({ mensaje: 'Token inválido' });
  }
};
```

#### 4. Proteger rutas

```javascript
import { protect } from '../middlewares/authMiddleware.js';

router.put('/:userId', protect, actualizarUsuario);
router.delete('/:userId', protect, eliminarUsuario);
```

---

## 📌 Checklist de Integración

- [ ] Backend instalado y corriendo en `http://localhost:5000`
- [ ] MongoDB conectado correctamente
- [ ] Seeds ejecutados (palas y noticias)
- [ ] Usuario admin creado
- [ ] Frontend actualizado con llamadas a la API
- [ ] CORS configurado correctamente
- [ ] Manejo de errores implementado
- [ ] Testing de todos los endpoints
- [ ] Variables de entorno configuradas
- [ ] Implementar JWT (opcional pero recomendado)

---

## 🆘 Troubleshooting

### Error: CORS blocked

**Solución**: Verifica que `FRONTEND_URL` en `.env` coincida con la URL de tu frontend.

### Error: MongoDB connection failed

**Solución**: 
1. Verifica que tu IP esté en la whitelist de MongoDB Atlas
2. Comprueba las credenciales en `MONGO_URI`
3. Verifica que el cluster esté activo

### Error: Cannot find module

**Solución**: 
```powershell
cd backend
rm -r node_modules
rm package-lock.json
npm install
```

### Palas no se muestran en el frontend

**Solución**: 
1. Verifica que el backend esté corriendo
2. Abre la consola del navegador (F12) y busca errores
3. Comprueba que la URL de la API sea correcta
4. Verifica que las palas estén en la base de datos: `GET http://localhost:5000/api/palas`

---

## 📞 Soporte

Si encuentras problemas durante la integración:
1. Verifica los logs del backend en la terminal
2. Revisa la consola del navegador (F12)
3. Comprueba que todas las variables de entorno estén correctas
4. Asegúrate de que el backend y frontend estén corriendo simultáneamente

---

**¡Listo! Tu aplicación LowPadel ahora está completamente integrada con la base de datos MongoDB.**
