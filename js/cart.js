document.addEventListener("DOMContentLoaded", function () {
    displayCartItems();
    mostrarBadge();
    mostrarNumeroCarrito();
    actualizarCantidad(); // Asegurarse de que se actualicen las cantidades en tiempo real
    agregarInteractividadEnvio(); // Aseguramos que los botones de envío tengan interactividad
    updateSummary(); // Actualizamos el resumen del carrito cuando se carga la página
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
            <div class="cart-item" id="cart-item-${product.id}">
                <img src="${product.image}" alt="${product.name}" class="cart-item-image img-fluid">
                <div class="cart-item-details">
                    <div class="product-row">
                        <h4 class="product-name">${product.name}</h4>
                        <p class="product-quantity">Cantidad: <input type="number" id="${product.id}" class="quantity" value="${product.quantity}" min="1" style="width: 50px; text-align: center;"></p>
                    </div>
                    <p class="product-price">${product.currency} ${product.cost}</p>
                    <p class="product-subtotal">Subtotal: ${product.currency} ${(product.cost * product.quantity).toFixed(2)}</p>
                </div>
                <button type="button" class="btn btn-outline-dark trash-button" onclick="removeFromCart(${index})">
                    <!-- Icono de papelera -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="24" fill="currentColor" class="trash-icon" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                    </svg>
                </button>
            </div>
        `;
        cartItemsContainer.innerHTML += productHTML;
    });

    // Se añade la sección de resumen al final
    const summaryHTML = `
        <div class="cart-summary">
            <p class="subtotal-compra">Subtotal</p>
            <p class="costoEnvio-compra">Costo de envío</p>
            <p class="total-compra">Total</p>
        </div>
    `;
    cartItemsContainer.innerHTML += summaryHTML;

    // Muestra el contenedor de las pestañas (si está oculto)
    const tabsContainer = document.getElementById("tabsContainer");
    if (tabsContainer) {
        tabsContainer.style.display = "block"; // Muestra las pestañas
    }

    updateSummary(); // Para actualizar el resumen con el subtotal y costo de envío por defecto
}

// Función para agregar interactividad a los botones de tipo de envío
function agregarInteractividadEnvio() {
    const btnEnvioPremium = document.getElementById("btn-envioPremium");
    const btnEnvioExpress = document.getElementById("btn-envioExpress");
    const btnEnvioStandard = document.getElementById("btn-envioStandard");

    btnEnvioPremium.addEventListener("click", () => seleccionarEnvio("premium"));
    btnEnvioExpress.addEventListener("click", () => seleccionarEnvio("express"));
    btnEnvioStandard.addEventListener("click", () => seleccionarEnvio("standard"));
}

// Función para manejar la selección de tipo de envío
function seleccionarEnvio(tipo) {
    localStorage.setItem("shippingType", tipo); // Guardamos el tipo de envío seleccionado en localStorage
    updateSummary(); // Actualizamos el resumen del carrito con el nuevo tipo de envío
}

// Función para actualizar el resumen con el nuevo costo de envío y total
function updateSummary() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const shippingType = localStorage.getItem("shippingType") || "standard"; // Si no hay tipo de envío, es standard por defecto

    // Calcular el subtotal del carrito
    let subtotal = 0;
    cart.forEach(product => {
        subtotal += product.cost * product.quantity;
    });

    // Calcular el costo de envío según el tipo de envío
    let shippingCost = 0;
    let shippingLabel = "";
    let shippingPercentage = 0;

    // Dependiendo del tipo de envío, aplicamos un porcentaje sobre el subtotal
    if (shippingType === "premium") {
        shippingPercentage = 0.15; // 15% de cargo adicional
        shippingLabel = "Premium: 2 a 5 días";
    } else if (shippingType === "express") {
        shippingPercentage = 0.07; // 7% de cargo adicional
        shippingLabel = "Express: 5 a 8 días";
    } else if (shippingType === "standard") {
        shippingPercentage = 0.05; // 5% de cargo adicional
        shippingLabel = "Standard: 12 a 15 días";
    }

    // Calculamos el costo de envío
    shippingCost = subtotal * shippingPercentage;

    // Calcular el total (subtotal + costo de envío)
    const total = subtotal + shippingCost;

    // Actualizar el DOM con los valores calculados
    document.querySelector(".subtotal-compra").textContent = `Subtotal: ${cart[0]?.currency || "$"} ${subtotal.toFixed(2)}`;
    document.querySelector(".costoEnvio-compra").textContent = `Costo de Envío: ${cart[0]?.currency || "$"} ${shippingCost.toFixed(2)} (${shippingLabel})`;
    document.querySelector(".total-compra").textContent = `Total: ${cart[0]?.currency || "$"} ${total.toFixed(2)}`;
}

// Función para actualizar la cantidad de un producto en el carrito
function actualizarCantidad() {
    let carrito = JSON.parse(localStorage.getItem('cart')) || []; // Obtener el carrito del LocalStorage
    let quantityInputs = document.getElementsByClassName('quantity');
    
    Array.from(quantityInputs).forEach(input => {
        input.addEventListener('change', (event) => {
            let productId = Number(event.target.id); // Obtener el ID del producto
            let nuevaCantidad = parseInt(event.target.value); // Obtener el nuevo valor del input

            // Buscar el producto en el carrito y actualizar su cantidad
            let producto = carrito.find(item => item.id === productId);
            if (producto) {
                producto.quantity = nuevaCantidad; // Actualizar la cantidad del producto encontrado
            }

            // Guardar el carrito actualizado en localStorage
            localStorage.setItem("cart", JSON.stringify(carrito)); 
            
            // Actualizar el subtotal de este producto
            const subtotal = (producto.cost * nuevaCantidad).toFixed(2);
            const subtotalElement = event.target.closest('.cart-item').querySelector('.product-subtotal');
            subtotalElement.textContent = `Subtotal: ${producto.currency} ${subtotal}`;

            updateSummary(); // Actualizar el resumen con el subtotal actualizado
            mostrarNumeroCarrito(); // Actualizar el número en el badge del carrito
            mostrarBadge();
        });
    });
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Obtener el carrito desde el localStorage

    // Eliminar el producto del array
    cart.splice(index, 1);

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Actualizar la vista del carrito y el número de productos
    displayCartItems();
    mostrarNumeroCarrito();
    mostrarBadge();

    // Si el carrito está vacío, ocultamos la vista del carrito
    if (cart.length === 0) {
        document.getElementById("cart-items").style.display = "none";
    }

    updateSummary(); // Actualizar el resumen con el carrito vacío
}

// Función para mostrar el número de productos en el badge del carrito (navegación)
function mostrarNumeroCarrito() {
    const carrito = JSON.parse(localStorage.getItem('cart')) || []; // Obtener carrito del LocalStorage

    let totalCantidad = 0;
    carrito.forEach(producto => {
        totalCantidad += producto.quantity;
    });

    // Actualizar el contenido del ícono del carrito
    const numerocarrito = document.getElementById('badge');
    numerocarrito.textContent = totalCantidad || '0'; // Mostrar '0' si no hay productos

    localStorage.setItem("badge", totalCantidad); // Guardar el número actualizado en localStorage
}

// Función para mostrar el badge del carrito en el body
function mostrarBadge() {
    let badge = localStorage.getItem('badge');
    let numerocarrito = document.getElementById('badgebody'); // Elemento del badge en el body
    numerocarrito.textContent = badge || '0'; // Si no hay productos, mostrar 0
}