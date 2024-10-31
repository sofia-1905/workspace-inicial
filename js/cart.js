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
function mostrarSubtotal() {
    const carrito = JSON.parse(localStorage.getItem('cart')) || []; // Obtener carrito del LocalStorage
    const subtotalContainer = document.getElementById('subtotal-container');

    subtotalContainer.innerHTML = ''; // Limpiar el contenedor

    carrito.forEach(producto => {
        let precio = producto.cost;
        let cantidad = producto.quantity; // Debería ser establecida con el control de cantidad

        // Calcular el subtotal para el producto
        let subtotalProducto = precio * cantidad;

        // Crear un elemento para mostrar el subtotal del producto
        const subtotalElement = document.createElement('div');
        subtotalElement.textContent = `${producto.name}: $${subtotalProducto.toFixed(2)}`; // Formato del subtotal
        subtotalContainer.appendChild(subtotalElement); // Agregar al contenedor

        // Agregar el subtotal como una propiedad del producto (si es necesario)
        producto.subtotal = subtotalProducto;
    });

    // Guardar el carrito actualizado en el LocalStorage
    localStorage.setItem('cart', JSON.stringify(carrito));
}

// Inicializar subtotal al cargar la página
document.addEventListener('DOMContentLoaded', mostrarSubtotal);


// Funcion para mostrar el numero de productos en el badge del carrito
function mostrarNumeroCarrito() {
    const carrito = JSON.parse(localStorage.getItem('cart')) || []; // Obtener carrito del LocalStorage

    let totalCantidad = 0;

    carrito.forEach(producto => {
        let cantidad = producto.quantity; // Cantidad de cada producto
        totalCantidad += cantidad;
    });

    // Actualizar el contenido del ícono del carrito
    const numerocarrito = document.getElementById('badge');
    numerocarrito.textContent = totalCantidad;
}

// Inicializar el badge al cargar la página
document.addEventListener('DOMContentLoaded', mostrarNumeroCarrito);


function establecerCantidad(productName, nuevaCantidad) {
    let carrito = JSON.parse(localStorage.getItem('cart')) || []; // Obtener el carrito del LocalStorage

    // Buscar el producto en el carrito y actualizar su cantidad
    let producto = carrito.find(item => item.name === productName);
    if (producto) {
        producto.quantity = parseInt(nuevaCantidad); // Actualizar la cantidad del producto encontrado
    }

    localStorage.setItem("cart", JSON.stringify(carrito)); // Guardar el carrito actualizado en localStorage
}

document.getElementById('quantity').addEventListener('change', establecerCantidad);

// Evento para actualizar el subtotal y el badge al cambiar la cantidad en cada input
document.querySelectorAll('.quantity').forEach(input => {
    input.addEventListener('input', (event) => {
        let productName = event.target.dataset.name; // Obtener el nombre del producto
        let nuevaCantidad = event.target.value; // Obtener la nueva cantidad

        establecerCantidad(productName, nuevaCantidad); // Actualizar la cantidad
        mostrarSubtotal(); // Actualizar el subtotal
        mostrarNumeroCarrito(); // Actualizar el número en el badge del carrito
    });
});

/*Cuando se desencadena un evento, como un clic o un cambio en un input, 
EVENT.TARGET te permite acceder al elemento que fue interactuado.*/
