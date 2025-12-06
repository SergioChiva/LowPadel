# 🔗 Integración Frontend con Backend

Guía paso a paso para conectar el componente de palas con la API de MongoDB.

---

## 📋 Cambios Necesarios en palasAdminComponent.astro

Reemplaza el código actual de localStorage por llamadas a la API.

### 1. Configuración de la API

Añade al inicio del `<script>`:

```javascript
// URL base de la API
const API_URL = 'http://localhost:4000/api/palas';

// Credenciales de admin (las mismas del .env)
const ADMIN_CREDENTIALS = {
    email: 'admin@lowpadel.com',
    password: 'Admin01@'
};
```

### 2. Función para Cargar Palas desde la API

Reemplaza la función `renderizarPalas()` y la inicialización de `jugadoresData`:

```javascript
// Variable global para almacenar palas
let jugadoresData = [];

// Cargar palas desde la API
async function cargarPalasDesdeAPI() {
    try {
        const response = await fetch(API_URL);
        const result = await response.json();
        
        if (result.success) {
            // La API ya devuelve las palas agrupadas por jugador
            jugadoresData = result.data;
            renderizarPalas();
            poblarSelectJugadores();
        } else {
            console.error('Error cargando palas:', result.error);
            alert('❌ Error al cargar las palas');
        }
    } catch (error) {
        console.error('Error de conexión:', error);
        alert('❌ Error de conexión con el servidor');
    }
}
```

### 3. Función para Crear Pala en la API

Reemplaza el handler del formulario agregar:

```javascript
const formAgregar = document.getElementById('formAgregar');
formAgregar?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const jugadorIndex = parseInt((document.getElementById('jugadorAgregar') as HTMLSelectElement).value);
    const nombrePala = (document.getElementById('nombrePalaAgregar') as HTMLInputElement).value;
    const precio = (document.getElementById('precioAgregar') as HTMLInputElement).value;
    const descripcion = (document.getElementById('descripcionAgregar') as HTMLTextAreaElement).value;
    const imagenInput = document.getElementById('imagenAgregar') as HTMLInputElement;
    
    let imagenSrc = '';
    
    if (imagenInput.files && imagenInput.files[0]) {
        const reader = new FileReader();
        imagenSrc = await new Promise((resolve) => {
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(imagenInput.files![0]);
        });
    }

    // Datos a enviar a la API
    const palaData = {
        nombre: nombrePala,
        jugador: jugadoresData[jugadorIndex].nombre,
        precio: parseFloat(precio),
        descripcion: descripcion,
        imagen: imagenSrc
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'email': ADMIN_CREDENTIALS.email,
                'password': ADMIN_CREDENTIALS.password
            },
            body: JSON.stringify(palaData)
        });

        const result = await response.json();

        if (result.success) {
            alert('✅ Pala agregada correctamente');
            (formAgregar as HTMLFormElement).reset();
            document.getElementById('previewAgregar')?.classList.remove('visible');
            
            // Recargar palas desde la API
            await cargarPalasDesdeAPI();
        } else {
            alert('❌ Error: ' + result.error);
        }
    } catch (error) {
        console.error('Error creando pala:', error);
        alert('❌ Error de conexión con el servidor');
    }
});
```

### 4. Función para Editar Pala en la API

Reemplaza el handler del formulario editar:

```javascript
const formEditar = document.getElementById('formEditar');
formEditar?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const jugadorIndex = parseInt((document.getElementById('jugadorEditar') as HTMLSelectElement).value);
    const palaIndex = parseInt((document.getElementById('palaEditar') as HTMLSelectElement).value);
    const nuevoNombre = (document.getElementById('nombrePalaEditar') as HTMLInputElement).value;
    const nuevoPrecio = (document.getElementById('precioEditar') as HTMLInputElement).value;
    const nuevaDescripcion = (document.getElementById('descripcionEditar') as HTMLTextAreaElement).value;
    const imagenInput = document.getElementById('imagenEditar') as HTMLInputElement;
    
    // Obtener ID de la pala
    const pala = jugadoresData[jugadorIndex].palas[palaIndex];
    const palaId = pala._id;
    
    // Preparar datos
    const palaData: any = {
        precio: parseFloat(nuevoPrecio),
        descripcion: nuevaDescripcion
    };
    
    if (nuevoNombre) {
        palaData.nombre = nuevoNombre;
    }
    
    if (imagenInput.files && imagenInput.files[0]) {
        const reader = new FileReader();
        palaData.imagen = await new Promise((resolve) => {
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(imagenInput.files![0]);
        });
    }

    try {
        const response = await fetch(`${API_URL}/${palaId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'email': ADMIN_CREDENTIALS.email,
                'password': ADMIN_CREDENTIALS.password
            },
            body: JSON.stringify(palaData)
        });

        const result = await response.json();

        if (result.success) {
            alert('✅ Pala actualizada correctamente');
            (formEditar as HTMLFormElement).reset();
            document.getElementById('previewEditar')?.classList.remove('visible');
            
            // Recargar palas desde la API
            await cargarPalasDesdeAPI();
        } else {
            alert('❌ Error: ' + result.error);
        }
    } catch (error) {
        console.error('Error actualizando pala:', error);
        alert('❌ Error de conexión con el servidor');
    }
});
```

### 5. Función para Eliminar Pala de la API

Reemplaza el handler del formulario eliminar:

```javascript
const formEliminar = document.getElementById('formEliminar');
formEliminar?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const jugadorIndex = parseInt((document.getElementById('jugadorEliminar') as HTMLSelectElement).value);
    const palaIndex = parseInt((document.getElementById('palaEliminar') as HTMLSelectElement).value);
    
    const pala = jugadoresData[jugadorIndex].palas[palaIndex];
    const palaId = pala._id;
    
    if (confirm(`❓ ¿Estás seguro de eliminar "${pala.nombrePala}"?`)) {
        try {
            const response = await fetch(`${API_URL}/${palaId}`, {
                method: 'DELETE',
                headers: {
                    'email': ADMIN_CREDENTIALS.email,
                    'password': ADMIN_CREDENTIALS.password
                }
            });

            const result = await response.json();

            if (result.success) {
                alert('✅ Pala eliminada correctamente');
                (formEliminar as HTMLFormElement).reset();
                
                // Recargar palas desde la API
                await cargarPalasDesdeAPI();
                
                // Actualizar select de palas
                poblarSelectPalas(jugadorIndex, 'palaEliminar');
            } else {
                alert('❌ Error: ' + result.error);
            }
        } catch (error) {
            console.error('Error eliminando pala:', error);
            alert('❌ Error de conexión con el servidor');
        }
    }
});
```

### 6. Actualizar Inicialización

Reemplaza el `DOMContentLoaded`:

```javascript
document.addEventListener('DOMContentLoaded', () => {
    verificarAdmin();
    cargarPalasDesdeAPI(); // Cargar desde API en lugar de localStorage
    setupImagePreview('imagenAgregar', 'previewAgregar', 'previewImageAgregar');
    setupImagePreview('imagenEditar', 'previewEditar', 'previewImageEditar');
});
```

### 7. Eliminar Funciones de localStorage

Puedes eliminar o comentar:
- La función `guardarJugadores()`
- La inicialización con datos hardcodeados
- Cualquier llamada a `localStorage.setItem()` o `localStorage.getItem()`

---

## 🧪 Probar la Integración

### 1. Iniciar el Backend
```bash
cd backend
npm run dev
```

### 2. Inicializar la Base de Datos
```powershell
Invoke-WebRequest -Uri "http://localhost:4000/api/palas/seed" -Method POST
```

### 3. Iniciar el Frontend de Astro
```bash
cd ..
npm run dev
```

### 4. Probar en el Navegador
1. Abre `http://localhost:4321/palas`
2. Inicia sesión como admin (admin@lowpadel.com / Admin01@)
3. Verás el panel de administración
4. Las palas ahora se cargan desde MongoDB
5. Prueba agregar, editar y eliminar palas

---

## 🔒 Configuración de CORS (si hay problemas)

Si recibes errores de CORS, asegúrate de que en `backend/src/server.js` tengas:

```javascript
app.use(cors({
    origin: 'http://localhost:4321', // Puerto de Astro
    credentials: true
}));
```

---

## ✅ Checklist de Integración

- [ ] Backend corriendo en puerto 4000
- [ ] Base de datos inicializada con seed
- [ ] Frontend actualizado con código de API
- [ ] CORS configurado correctamente
- [ ] Credenciales de admin correctas
- [ ] Palas visibles en el frontend
- [ ] Funciones CRUD funcionando

---

## 🎯 Ventajas de la Integración

- ✅ **Persistencia real:** Los datos se guardan en MongoDB
- ✅ **Multi-dispositivo:** Accede desde cualquier lugar
- ✅ **Sin límites:** localStorage tiene límite de 5-10MB
- ✅ **Seguridad:** Autenticación en el backend
- ✅ **Escalabilidad:** Fácil añadir más funciones
- ✅ **Profesional:** Base de datos real, no localStorage

---

## 📊 Flujo de Datos

```
Frontend (Astro) 
    ↓
fetch() con credenciales
    ↓
Backend (Express)
    ↓
Verificar Admin
    ↓
MongoDB Atlas
    ↓
Respuesta JSON
    ↓
Frontend actualiza UI
```

---

¡Todo listo! Ahora tu aplicación usa una base de datos real en la nube. 🚀
