# 🛡️ Sistema de Administración - LowPadel

## 📋 Guía Completa de Uso

### 🎯 1. CREDENCIALES DE ADMINISTRADOR

Para acceder al panel de administración, necesitas usar las credenciales específicas:

**Credenciales de Admin:**
- 📧 **Email:** `admin@lowpadel.com`
- 🔐 **Contraseña:** `Admin01@`

**Pasos para registrarse como Admin:**
1. Ve a la página de **Registro** (`/register`)
2. Rellena el formulario con tus datos personales
3. **IMPORTANTE:** Usa exactamente estas credenciales:
   - Email: `admin@lowpadel.com`
   - Contraseña: `Admin01@`
4. Completa el registro
5. Recibirás una notificación confirmando tu rol de administrador
6. Ahora tendrás acceso a los paneles de **Noticias** y **Palas**

---

### 🎨 2. ACCEDER AL PANEL DE ADMINISTRACIÓN

Una vez registrado como admin:

1. Ve a la sección de **Noticias** (`/noticias`)
2. Verás el **Panel de Administración** en la parte superior
3. El panel incluye dos opciones principales:
   - ➕ **Agregar/Editar Noticia**
   - 🗑️ **Eliminar Noticia**

---

### ➕ 3. AGREGAR O EDITAR NOTICIAS

**Paso a paso:**

1. Haz clic en el botón **"➕ Agregar/Editar Noticia"**
2. Se desplegará un formulario con los siguientes campos:

   - **📰 Título de noticia:** El título principal (obligatorio)
   - **🖼️ Imagen:** Sube una imagen desde tu ordenador
   - **📅 Fecha:** Selecciona la fecha de publicación (obligatorio)
   - **📝 Contenido:** Escribe el contenido completo de la noticia (obligatorio)

3. **Vista previa de imagen:**
   - Al seleccionar una imagen, verás una vista previa automática
   - La imagen se guarda en Base64 para persistencia

4. **Sobrescribir noticia:**
   - Selecciona qué noticia quieres reemplazar (1, 2 o 3)
   - Haz clic en **"💾 Sobrescribir Noticia X"**
   - Recibirás una confirmación

5. **Resetear formulario:**
   - Usa el botón **"🔄 Resetear Formulario"** para limpiar todos los campos

---

### 🗑️ 4. ELIMINAR NOTICIAS

**Paso a paso:**

1. Haz clic en el botón **"🗑️ Eliminar Noticia"**
2. Se desplegará un formulario con un selector
3. Selecciona la noticia que deseas eliminar (Noticia 1, 2 o 3)
4. Haz clic en **"❌ Eliminar Noticia Seleccionada"**
5. Confirma la eliminación en el diálogo
6. La noticia se eliminará y desaparecerá de la vista

---

### 💾 5. PERSISTENCIA DE DATOS

- **Todas las noticias se guardan en `localStorage`**
- Los cambios persisten entre sesiones del navegador
- Las imágenes se convierten automáticamente a Base64
- No se requiere base de datos ni backend

**Datos almacenados:**
- `usuario`: Información del usuario actual (incluye flag `admin`)
- `noticias`: Array de las 3 noticias con todos sus datos

---

---

## 🏓 PANEL DE ADMINISTRACIÓN DE PALAS

### ➕ 6. AGREGAR NUEVAS PALAS

**Paso a paso:**

1. Ve a la sección de **Palas** (`/palas`)
2. Haz clic en **"➕ Agregar Pala"**
3. Completa el formulario:
   - **Jugador:** Selecciona a qué jugador pertenece la pala
   - **Nombre:** Nombre completo de la pala (ej: "Adidas Metalbone HDR")
   - **Imagen:** Sube una foto de la pala
   - **Precio:** Indica el precio (ej: "75$")
   - **Descripción:** Escribe una descripción completa
4. Haz clic en **"💾 Agregar Pala"**
5. La pala aparecerá inmediatamente en la lista del jugador

### ✏️ 7. EDITAR PALAS EXISTENTES

**Modificar precios y descripciones:**

1. Haz clic en **"✏️ Editar Pala"**
2. Selecciona el **Jugador**
3. Selecciona la **Pala** que quieres editar
4. Los campos se rellenarán automáticamente con los datos actuales
5. Modifica lo que necesites:
   - Cambiar nombre (opcional)
   - Nueva imagen (opcional)
   - **Nuevo precio** (obligatorio)
   - **Nueva descripción** (obligatorio)
6. Haz clic en **"✅ Guardar Cambios"**
7. Los cambios se aplicarán inmediatamente

### 🗑️ 8. ELIMINAR PALAS

**Paso a paso:**

1. Haz clic en **"🗑️ Eliminar Pala"**
2. Selecciona el **Jugador**
3. Selecciona la **Pala** a eliminar
4. Haz clic en **"❌ Eliminar Pala"**
5. Confirma la eliminación
6. La pala se eliminará permanentemente

---

### 🎨 9. CARACTERÍSTICAS DEL DISEÑO

Los paneles de administración están diseñados con:

- **Glassmorphism:** Efectos de cristal esmerilado
- **Gradientes:** Verde (#00c896) y Púrpura (#9333ea)
- **Animaciones suaves:** Transiciones y hover effects
- **Responsive:** Optimizado para móviles y tablets
- **Vista previa:** Visualización instantánea de imágenes

---

### ⚠️ 10. VALIDACIONES Y SEGURIDAD

**Validaciones del formulario:**
- Todos los campos obligatorios deben estar completos
- El sistema verifica que los campos no estén vacíos
- Mensajes de error claros y específicos

**Confirmaciones:**
- Cada acción importante requiere confirmación
- Mensajes con emojis para mejor UX:
  - ✅ Operación exitosa
  - ⚠️ Advertencia o campo incompleto
  - ❓ Confirmación antes de eliminar

---

### 🚀 11. CONSEJOS DE USO

1. **Usa imágenes optimizadas:** Para mejor rendimiento, usa imágenes de máximo 1-2MB
2. **Mantén títulos concisos:** Los títulos largos pueden afectar el diseño
3. **Contenido descriptivo:** Escribe contenido detallado para mejor SEO
4. **Fechas actuales:** Usa fechas relevantes para mantener actualidad
5. **Revisa antes de guardar:** Verifica todo en la vista previa

---

### 🔧 12. SOLUCIÓN DE PROBLEMAS

**No veo el panel de administración:**
- Verifica que uses exactamente: `admin@lowpadel.com` y contraseña `Admin01@`
- Cierra sesión y vuelve a registrarte con las credenciales correctas
- Limpia el localStorage si es necesario: `localStorage.clear()`
- Recarga la página después de registrarte

**Las imágenes no se guardan:**
- Verifica que el archivo sea una imagen válida (jpg, png, gif, webp)
- Comprueba el tamaño del archivo (máximo recomendado: 2MB)
- Revisa que el navegador soporte FileReader API

**Los cambios no persisten:**
- Verifica que localStorage esté habilitado en tu navegador
- Comprueba que no estés en modo incógnito/privado
- Revisa la consola del navegador para errores

---

### 📊 13. ESTRUCTURA DE DATOS

**Formato de una noticia:**
```javascript
{
    titulo: "Título de la noticia",
    imagen: "data:image/jpeg;base64,...",  // Base64 string
    fecha: "2024-07-15",                    // Formato YYYY-MM-DD
    contenido: "Contenido completo..."
}
```

**Array de noticias en localStorage:**
```javascript
[
    { titulo: "...", imagen: "...", fecha: "...", contenido: "..." },
    { titulo: "...", imagen: "...", fecha: "...", contenido: "..." },
    { titulo: "...", imagen: "...", fecha: "...", contenido: "..." }
]
```

---

**Formato de jugadores y palas:**
```javascript
{
    nombre: "Alejandro Galán",
    palas: [
        {
            imagen: "/ruta/imagen.png",     // String o Base64
            nombrePala: "Adidas Metalbone", // String
            precio: "75$",                  // String
            descripcion: "Descripción..."   // String
        }
    ]
}
```

**Datos almacenados en localStorage:**
- `usuario`: Información del usuario (incluye flag `admin: true/false`)
- `noticias`: Array de 3 noticias
- `jugadores`: Array de jugadores con sus palas

---

### 🎯 14. PRÓXIMAS MEJORAS SUGERIDAS

- 🔐 Sistema de autenticación con contraseña para admin
- 📱 Subida de imágenes desde URL
- 📝 Editor de texto enriquecido (bold, italic, links)
- 🔢 Más de 3 noticias (sistema dinámico)
- 📤 Exportar/Importar noticias en JSON
- 🖼️ Galería de imágenes para reutilizar
- 📊 Estadísticas de visualizaciones

---

- 🏓 Gestión de jugadores (agregar/eliminar jugadores completos)
- 🔍 Búsqueda y filtrado de palas por precio o marca
- 📈 Sistema de inventario y stock

---

### 📞 15. SOPORTE

Para cualquier duda o problema:
- Revisa este documento primero
- Verifica la consola del navegador (F12)
- Comprueba los errores en la consola de VS Code
- Revisa el código en:
  - `src/components/noticiasComponent.astro`
  - `src/components/palasAdminComponent.astro`
  - `public/scripts/usuario.js`

---

## ✨ ¡Disfruta gestionando tus noticias de pádel! 🎾
