const form = document.getElementById("formRegistro");
const inputFoto = document.getElementById("fotoPerfil");
const imagenPerfil = document.getElementById("imagenPerfilRegistro"); // ojo, en el registro
const registroContainer = document.querySelector(".registro-container");
const perfil = document.querySelector("#perfil");
const btnLogout = document.getElementById("logout");

// ✅ Convertir la imagen a Base64 cuando se sube
let fotoBase64 = "";
if (inputFoto) {
    inputFoto.addEventListener("change", (e) => {
        const archivo = e.target.files[0];
        if (archivo) {
            const reader = new FileReader();
            reader.onload = () => {
                fotoBase64 = reader.result;
                imagenPerfil.src = fotoBase64;
            };
            reader.readAsDataURL(archivo);
        }
    });
}

// ✅ Manejar registro
if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let validaRegistro = true;

        const nombre = document.getElementById("nombre").value.trim();
        const nick = document.getElementById("nick").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const errorNombre = document.getElementById("errorNombre");
        const errorEmail = document.getElementById("errorEmail");
        const errorPassword = document.getElementById("errorPassword");

        // Validar nombre
        if (!nombre.includes(" ")) {
            errorNombre.textContent = "Introduce tu nombre y apellidos";
            validaRegistro = false;
        } else {
            errorNombre.textContent = "";
        }

        // Validar correo
        if (email.includes(" ") || !email.includes("@") || !email.includes(".")) {
            errorEmail.textContent = "Dirección de email no válida";
            validaRegistro = false;
        } else {
            errorEmail.textContent = "";
        }

        // Validar contraseña
        if (
            password.length < 8 ||
            !/[A-Z]/.test(password) ||
            !/[a-z]/.test(password) ||
            !/[0-9]/.test(password) ||
            !/[!@#$%^&*._-]/.test(password)
        ) {
            errorPassword.textContent =
                "Contraseña debe tener al menos una letra mayúscula, una minúscula, un número y un carácter especial";
            validaRegistro = false;
        } else {
            errorPassword.textContent = "";
        }

        // ✅ Si todo está correcto
        if (validaRegistro) {
            // Verificar credenciales de administrador específicas
            const isAdmin = email === "admin@lowpadel.com" && password === "Admin01@";
            
            const usuario = {
                nombre,
                nick,
                email,
                imagen: fotoBase64 || "",
                admin: isAdmin,
                password // Guardamos la contraseña (en producción se hashearía)
            };

            localStorage.setItem("usuario", JSON.stringify(usuario));
            
            // Notificar si es admin y redirigir a perfil
            if (isAdmin) {
                alert("✅ ¡Bienvenido Administrador! Tienes acceso al panel de administración en Noticias y Palas.");
            }
            
            // Redirigir a la página de perfil mejorada
            window.location.href = "/perfil";
        }
    });
}

// ✅ Mostrar perfil
function mostrarPerfil(usuario) {
    if (registroContainer) registroContainer.style.display = "none";
    if (perfil) perfil.style.display = "block";

    const nombreHTML = document.querySelector("#perfilNombre");
    const nickHTML = document.querySelector("#perfilNick");
    const emailHTML = document.querySelector("#perfilEmail");

    if (nombreHTML) nombreHTML.textContent = usuario.nombre;
    if (nickHTML) nickHTML.textContent = usuario.nick;
    if (emailHTML) emailHTML.textContent = usuario.email;

    if (usuario.imagen && imagenPerfil) imagenPerfil.src = usuario.imagen;
}

// ✅ Botón “Cerrar sesión”
if (btnLogout) {
    btnLogout.addEventListener("click", () => {
        localStorage.removeItem("usuario");
        location.reload();
    });
}

// ✅ AL CARGAR CUALQUIER PÁGINA
window.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const imgPerfilLayout = document.querySelector("#imagenPerfil"); // imagen global en el layout
    const linkCuenta = document.querySelector(".registro"); // el enlace o botón de cuenta

    if (usuario) {
        // 🔹 Mostrar imagen en el layout (todas las páginas)
        if (imgPerfilLayout && usuario.imagen) {
            imgPerfilLayout.src = usuario.imagen;
        }

        // 🔹 Cambiar el texto del enlace "Cuenta"
        if (linkCuenta) {
            linkCuenta.textContent = usuario.nick || "Mi cuenta";
            linkCuenta.href = "/perfil"; // Redirigir al perfil mejorado
        }

        // 🔹 Si estás en la página de registro, mostrar directamente el perfil
        if (form && perfil && registroContainer) {
            mostrarPerfil(usuario);
        }
    }
});
