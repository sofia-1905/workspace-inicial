document.addEventListener("DOMContentLoaded", function () {
    const username = localStorage.getItem('username');
    if (username) {
        document.getElementById('username-placeholder').innerText = username;
    } else {
        document.getElementById('username-placeholder').innerText = 'Invitado';
    }
});



// Función para mostrar los productos del carrito en el HTML
function displayCartItems() {
    const cartItemsContainer = document.getElementById("cart-items"); // Contenedor donde se muestran los productos
    const cart = JSON.parse(localStorage.getItem("cart")) || []; // Obtiene el carrito del localStorage

    // Verifica si el carrito está vacío
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>No hay productos en el carrito.</p>";
        return;
    }

    // Limpia el contenido previo en el contenedor
    cartItemsContainer.innerHTML = "";

    // Itera sobre los productos del carrito y crea el HTML para cada uno
    cart.forEach((product, index) => {
        const productHTML = `
            <div class="cart-item">
                <img src="${product.image}" alt="${product.name}" class="cart-item-image img-fluid">
                <div class="cart-item-details">
                    <div class="product-row">
                        <h4 class="product-name">${product.name}</h4>
                        <p class="product-quantity">Cantidad: <input type="number" id="${product.id}" class="quantity" value="${product.quantity}" min="1" style="width: 50px; text-align: center;"></p>
                    </div>
                    <p class="product-price">${product.currency} ${product.cost}</p>
                    <p class="product-subtotal">Subtotal: ${product.currency} ${(product.cost * product.quantity).toFixed(2)}</p>
                </div>
                <!-- Botón de papelera para eliminar el producto -->
                <button type="button" class="btn btn-outline-dark trash-button" onclick="removeFromCart(${index})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="24" fill="currentColor" class="trash-icon"
                        viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                    </svg>
                </button>
            </div>
        `;
        cartItemsContainer.innerHTML += productHTML;
    });
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1); // Elimina el producto del array
    localStorage.setItem("cart", JSON.stringify(cart)); // Actualiza el carrito en localStorage
    displayCartItems(); // Actualiza la vista del carrito

    // Oculta el carrito y muestra el producto comprado si es necesario
    if (cart.length === 0) {
        document.getElementById("cart-items").style.display = "none"; // Oculta el carrito
        displayPurchaseItem(); // Muestra el producto comprado si está en la compra
    }
}

// Función para mostrar el producto comprado en el HTML
function displayPurchaseItem() {
    const purchaseData = JSON.parse(localStorage.getItem("purchase")); // Obtiene el producto del localStorage
    const purchaseItemContainer = document.getElementById("purchase-item"); // Contenedor donde se mostrará el producto

    // Verifica si hay un producto guardado
    if (!purchaseData || purchaseData.length === 0) {
        return;
    }

    // Limpia el contenido previo en el contenedor
    purchaseItemContainer.innerHTML = "";

    // Extrae la información del producto
    const product = purchaseData[0]; // Asumiendo que solo hay un producto
    const productHTML = `
        <div class="purchase-item">
            <img src="${product.image}" alt="${product.name}" class="purchase-item-image">
            <div class="purchase-item-details">
                <h4 class="product-name">${product.name}</h4>
                <p class="product-price">${product.currency} ${product.cost}</p>
                <p class="product-quantity">Cantidad: ${product.quantity}</p>
                <p class="product-subtotal">Subtotal: ${product.currency} ${(product.cost * product.quantity).toFixed(2)}</p>
            </div>
            <!-- Botón de papelera para eliminar el producto -->
            <button type="button" class="btn btn-outline-dark trash-button" onclick="removePurchaseItem()">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="trash-icon" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
            </button>
        </div>
    `;
    
    // Agrega el HTML del producto al contenedor
    purchaseItemContainer.innerHTML = productHTML;

    // Oculta el carrito si se muestra el producto comprado
    document.getElementById("cart-items").style.display = "none"; 
}

// Función para eliminar el producto del localStorage
function removePurchaseItem() {
    localStorage.removeItem("purchase"); // Elimina el producto de la compra
    displayPurchaseItem(); // Actualiza la visualización en la página
   // Redirige a otra página 
   window.location.href = "product-info.html"; 
}

// Llama a la función para mostrar los productos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    displayCartItems();
    displayPurchaseItem();
});

// Modo Oscuro
const theme = localStorage.getItem('theme');

// Aplicar el tema guardado al cargar la página
if (theme === 'dark-mode') {
    document.body.classList.add('dark-mode');
} else {
    document.body.classList.remove('dark-mode');
}


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


function actualizarCantidad() {
    let carrito = JSON.parse(localStorage.getItem('cart')) || []; // Obtener el carrito del LocalStorage
    let quantityInputs = document.getElementsByClassName('quantity');
    
    Array.from(quantityInputs).forEach(input => {
        input.addEventListener('change', (event) => {
            let productId = event.target.id; // Obtener el ID del producto
            let nuevaCantidad = event.target.value; // Obtener el nuevo valor del input

            // Buscar el producto en el carrito y actualizar su cantidad
            let producto = carrito.find(item => item.id === productId);
            if (producto) {
                producto.quantity = parseInt(nuevaCantidad); // Actualizar la cantidad del producto encontrado
            }

            localStorage.setItem("cart", JSON.stringify(carrito)); // Guardar el carrito actualizado en localStorage
            
            // Actualizar el subtotal en el DOM
            const subtotal = (producto.cost * nuevaCantidad).toFixed(2);
            const subtotalElement = event.target.closest('.cart-item').querySelector('.product-subtotal');
            subtotalElement.textContent = `Subtotal: ${producto.currency} ${subtotal}`;
            
            mostrarNumeroCarrito(); // Actualizar el número en el badge del carrito
        });
    });
}

// Llama a esta función después de mostrar los productos en el carrito
document.addEventListener("DOMContentLoaded", () => {
    actualizarCantidad(); // Asegúrate de llamar a esta función para que se apliquen los listeners
});

/*Cuando se desencadena un evento, como un clic o un cambio en un input, 
EVENT.TARGET te permite acceder al elemento que fue interactuado.*/

/*Iteración sobre Inputs: Array.from(quantityInputs).forEach(...)
 para añadir el event listener a cada input de cantidad.*/