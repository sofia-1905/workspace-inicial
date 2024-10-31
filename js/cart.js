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
                <img src="${product.image}" alt="${product.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4>${product.name}</h4>
                    <p>${product.currency} ${product.cost}</p>
                    <p>Cantidad: ${product.quantity}</p>
                    <p>Subtotal: ${product.currency} ${(product.cost * product.quantity).toFixed(2)}</p>
                </div>
                <div class="quantity-control">
                    <input type="number" id="quantity" value="${product.quantity}" min="1" style="width: 50px; text-align: center;">
                </div>
                <!-- Botón de papelera para eliminar el producto -->
                <button type="button" class="btn btn-outline-dark trash-button" onclick="removeFromCart(${index})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="trash-icon"
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
                <h4>${product.name}</h4>
                <p>${product.currency} ${product.cost}</p>
                <p>Cantidad: ${product.quantity}</p>
                <p>Subtotal: ${product.currency} ${(product.cost * product.quantity).toFixed(2)}</p>
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


