document.addEventListener("DOMContentLoaded", function() {
    const username = localStorage.getItem('username');
    if (username) {
        document.getElementById('username-placeholder').innerText = username;
    } else {
        document.getElementById('username-placeholder').innerText = 'Invitado';
    }
});

// Modo Oscuro
const theme = localStorage.getItem('theme');

// Aplicar el tema guardado al cargar la página
if (theme === 'dark-mode') {
    document.body.classList.add('dark-mode');
} else {
    document.body.classList.remove('dark-mode');
}

function actualizarSubtotal() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    let subtotal = 0;

    carrito.forEach(producto => {
        let precio = producto.precio;
        let cantidad = producto.cantidad; //Deberia ser establecida con el control de cantidad
     // let moneda = producto.currency; para tirarlo en subtotal

    subtotal += precio * cantidad;
});

    document.getElementById('subtotal').textContent = `Subtotal: $${subtotal}`;
}

// Evento para actualizar el subtotal al cambiar la cantidad en cada input
document.querySelectorAll('.quantity').forEach(input => {
    input.addEventListener('input', actualizarSubtotal);
});

// Inicializar subtotal al cargar la página
document.addEventListener('DOMContentLoaded', actualizarSubtotal);