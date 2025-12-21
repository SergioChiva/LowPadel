// Script global para el carrito
(function() {
    // Actualizar contador del carrito al cargar cualquier página
    function actualizarContadorCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
        const totalItems = carrito.reduce((sum, item) => sum + (item.cantidad || 1), 0);
        
        const badge = document.getElementById('carrito-count');
        if (badge) {
            badge.textContent = totalItems;
            badge.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }

    // Ejecutar al cargar la página
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', actualizarContadorCarrito);
    } else {
        actualizarContadorCarrito();
    }

    // Actualizar cuando cambie el localStorage (desde otra pestaña)
    window.addEventListener('storage', (e) => {
        if (e.key === 'carrito') {
            actualizarContadorCarrito();
        }
    });

    // Exponer función globalmente para que otros scripts puedan usarla
    window.actualizarContadorCarrito = actualizarContadorCarrito;
})();
