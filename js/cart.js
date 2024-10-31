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


// Función para hacer el subtotal
function actualizarSubtotal() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || []; // Obtener carrito del LocalStorage
    const subtotalContainer = document.getElementById('subtotal-container');

    subtotalContainer.innerHTML = ''; // Limpiar el contenedor

    carrito.forEach(producto => {
        let precio = producto.precio;
        let cantidad = producto.cantidad; // Debería ser establecida con el control de cantidad

        // Calcular el subtotal para el producto
        let subtotalProducto = precio * cantidad;

        // Crear un div para mostrar el subtotal de este producto
        const subtotalDiv = document.createElement('div');
        subtotalDiv.textContent = `Subtotal: $${subtotalProducto.toFixed(2)}`; // Asegúrate de que `nombre` sea una propiedad válida del producto

        // Agregar el div al contenedor
        subtotalContainer.appendChild(subtotalDiv);
    });
}

// Inicializar subtotal al cargar la página
document.addEventListener('DOMContentLoaded', actualizarSubtotal);


// Funcion para mostrar el numero de productos en el badge del carrito
function actualizarNumeroCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || []; // Obtener carrito del LocalStorage

    let totalCantidad = 0;

    carrito.forEach(producto => {
        let cantidad = producto.cantidad; // Cantidad de cada producto
        totalCantidad += cantidad;
    });

    // Actualizar el contenido del ícono del carrito
    const numerocarrito = document.getElementById('badge');
    numerocarrito.textContent = totalCantidad;
}

// Inicializar el badge al cargar la página
document.addEventListener('DOMContentLoaded', actualizarNumeroCarrito);


function establecerCantidad() {
    const cantidad = document.getElementById('quantity').value; // Obtener el valor del input
    localStorage.setItem("cantidad", cantidad); // Guardar en localStorage
}

document.getElementById('quantity').addEventListener('change', establecerCantidad);

// Evento para actualizar el subtotal y el badge al cambiar la cantidad en cada input
document.querySelectorAll('.quantity').forEach(input => {
    input.addEventListener('input', (event) => {
        const productoId = event.target.dataset.productId; // Obtener el ID del producto
        const nuevaCantidad = event.target.value; // Obtener la nueva cantidad

        establecerCantidad(productoId, nuevaCantidad); // Actualizar la cantidad
        actualizarSubtotal(); // Actualizar el subtotal
        actualizarNumeroCarrito(); // Actualizar el número en el badge del carrito
    });
});

/*Cuando se desencadena un evento, como un clic o un cambio en un input, 
EVENT.TARGET te permite acceder al elemento que fue interactuado.*/
