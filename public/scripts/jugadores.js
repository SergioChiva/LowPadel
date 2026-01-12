let main = document.querySelector("#palas");

// Cargar palas desde la API
async function cargarPalasDesdeAPI() {
    try {
        const response = await fetch('/api/palas');
        const data = await response.json();
        
        if (!data.success || data.palas.length === 0) {
            main.innerHTML = '<p style="text-align: center; color: white; font-size: 1.5rem;">No hay palas disponibles</p>';
            return;
        }
        
        // Agrupar palas por jugador
        const jugadoresPorNombre = {};
        
        data.palas.forEach(pala => {
            if (!jugadoresPorNombre[pala.jugador]) {
                jugadoresPorNombre[pala.jugador] = [];
            }
            jugadoresPorNombre[pala.jugador].push({
                _id: pala._id, // Guardar el ID de MongoDB
                imagen: pala.imagen,
                nombrePala: pala.nombre,
                precio: `${pala.precio}€`,
                descripcion: pala.descripcion
            });
        });
        
        // Convertir a formato de jugadores
        const jugadores = Object.keys(jugadoresPorNombre).map(nombre => ({
            nombre: nombre,
            palas: jugadoresPorNombre[nombre]
        }));
        
        // Renderizar palas
        main.innerHTML = '';
        
        jugadores.forEach(datos => {
            let divJugador = document.createElement("div");
            divJugador.classList.add("seccion-jugador");

            // Título del jugador más limpio
            divJugador.innerHTML = `<h2 class="titulo-jugador">${datos.nombre}</h2>`;

            // Contenedor para las palas
            let palasContainer = document.createElement("div");
            palasContainer.classList.add("palas-container"); 

            datos.palas.forEach(info => {
                let card = document.createElement("div");
                card.classList.add("card-pala");

                // Estructura de la tarjeta mejorada
                card.innerHTML = `
                    <div class="imagen-wrapper">
                        <img src="${info.imagen}" alt="${info.nombrePala}">
                    </div>
                    <div class="info-pala">
                        <h3 class="nombre-pala">${info.nombrePala}</h3>
                        <p class="precio">${info.precio}</p>
                        <p class="descripcion">${info.descripcion}</p>
                        <button class="btn-comprar">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                            Añadir al Carrito
                        </button>
                    </div>
                `;

                // Evento para añadir al carrito
                const btnComprar = card.querySelector('.btn-comprar');
                btnComprar.addEventListener('click', () => {
                    agregarAlCarrito({
                        _id: info._id, // ID de MongoDB
                        nombre: info.nombrePala,
                        precio: info.precio.replace('€', ''),
                        imagen: info.imagen,
                        jugador: datos.nombre,
                        cantidad: 1
                    });
                });
                
                // Lo adjuntamos al nuevo contenedor de palas
                palasContainer.appendChild(card);
            });

            divJugador.appendChild(palasContainer); // Adjuntamos el contenedor de palas
            main.appendChild(divJugador);
        });
        
    } catch (error) {
        console.error('Error al cargar palas:', error);
        main.innerHTML = '<p style="text-align: center; color: white; font-size: 1.5rem;">Error al cargar las palas. Por favor, intenta de nuevo más tarde.</p>';
    }
}

// Llamar la función cuando el DOM esté listo
cargarPalasDesdeAPI();

// Función para agregar al carrito
function agregarAlCarrito(pala) {
    let carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    
    // Verificar si la pala ya está en el carrito
    const indiceExistente = carrito.findIndex(item => item.nombre === pala.nombre);
    
    if (indiceExistente !== -1) {
        // Si ya existe, aumentar cantidad
        carrito[indiceExistente].cantidad += 1;
        mostrarNotificacion(`🛒 Producto añadido a la cesta (${carrito[indiceExistente].cantidad} unidades)`, 'success');
    } else {
        // Si no existe, agregar
        carrito.push(pala);
        mostrarNotificacion(`🛒 Producto añadido a la cesta`, 'success');
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    // Actualizar contador (usar función global si existe)
    if (typeof window.actualizarContadorCarrito === 'function') {
        window.actualizarContadorCarrito();
    }
}

// Función para mostrar notificación mejorada
function mostrarNotificacion(mensaje, tipo = 'success') {
    const notif = document.createElement('div');
    notif.className = `notificacion-carrito notif-${tipo}`;
    notif.innerHTML = `
        <div class="notif-content">
            <span class="notif-mensaje">${mensaje}</span>
            <button class="notif-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    document.body.appendChild(notif);
    
    setTimeout(() => notif.classList.add('show'), 100);
    
    setTimeout(() => {
        notif.classList.remove('show');
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

// Función para actualizar contador del carrito (fallback)
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    
    // Actualizar badge si existe
    const badge = document.getElementById('carrito-count');
    if (badge) {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// Actualizar contador al cargar (fallback si el script global no está cargado)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (typeof window.actualizarContadorCarrito !== 'function') {
            actualizarContadorCarrito();
        }
    });
} else {
    if (typeof window.actualizarContadorCarrito !== 'function') {
        actualizarContadorCarrito();
    }
}

// Estilos para las animaciones y notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .notificacion-carrito {
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        min-width: 300px;
    }

    .notificacion-carrito.show {
        transform: translateX(0);
    }

    .notificacion-carrito.notif-success {
        background: linear-gradient(135deg, #00c896, #6ee7b7);
        box-shadow: 0 8px 25px rgba(0, 200, 150, 0.4);
    }

    .notif-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        color: white;
        font-weight: 600;
        border: 1px solid rgba(255, 255, 255, 0.3);
    }

    .notif-mensaje {
        flex: 1;
    }

    .notif-close {
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 18px;
        line-height: 1;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .notif-close:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: scale(1.1);
    }
`;
document.head.appendChild(style);