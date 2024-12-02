document.addEventListener("DOMContentLoaded", function () {
    displayCartItems();
    mostrarBadge();
    mostrarNumeroCarrito();
    actualizarCantidad(); // Asegurarse de que se actualicen las cantidades en tiempo real
    agregarInteractividadEnvio(); // Aseguramos que los botones de envío tengan interactividad
    agregarInteractividadTarjeta(); // Seleccionar el tipo de tarjeta
    updateSummary(); // Actualizamos el resumen del carrito cuando se carga la página
});


// Función para mostrar los productos del carrito en el HTML
function displayCartItems() {
    const cartItemsContainer = document.getElementById("cart-items"); // Contenedor donde se muestran los productos
    const cart = JSON.parse(localStorage.getItem("cart")) ||[]; // Obtiene el carrito del localStorage

    // Verifica si el carrito está vacío
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>No hay productos en el carrito</p>"; 
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
    
    // AGREGADO: VOLVER A ASIGNAR EL EVENTO DE CAMBIO DE CANTIDAD A LOS INPUTS
    actualizarCantidad(); // Esto es necesario para reasignar los eventos después de eliminar un producto
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

function agregarInteractividadTarjeta() {
    const btnCredito = document.getElementById("btncredito");
    const btnDebito= document.getElementById("btndebito");

    btnCredito.addEventListener("click", () => seleccionarTarjeta("credito"));
    btnDebito.addEventListener("click", () => seleccionarTarjeta("debito"));
}

function seleccionarTarjeta(tipo){
    localStorage.setItem("cardType", tipo); // Guardamos el tipo de pago de tarjeta en localStorage
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
    let carrito = JSON.parse(localStorage.getItem('cart')) || [] ; // Obtener el carrito del LocalStorage
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
        displayPurchaseItems();
    }

    updateSummary(); // Actualizar el resumen con el carrito vacío
    actualizarCantidad(); // Llamar a actualizar cantidad de inputs
}

// Selecciona los elementos de las pestañas
const tabs = document.querySelectorAll('.nav-link');
const tabContent = document.querySelectorAll('.tab-pane');
let currentTab = 0; // Índice de la pestaña actual

// Función para actualizar la pestaña activa
function updateTab(index) {
    // Remover la clase 'active' de todas las pestañas y contenido
    tabs.forEach(tab => tab.classList.remove('active'));
    tabContent.forEach(content => content.classList.remove('show', 'active'));

    // Agregar la clase 'active' a la pestaña y contenido actual
    tabs[index].classList.add('active');
    tabContent[index].classList.add('show', 'active');
}

// Función para avanzar a la siguiente pestaña
function nextTab() {
    if (currentTab < tabs.length - 1) {
        currentTab++;
        updateTab(currentTab);
    }
}

// Función para regresar a la pestaña anterior
function prevTab() {
    if (currentTab > 0) {
        currentTab--;
        updateTab(currentTab);
    }
}

// Añade el evento de clic a cada botón individual
document.getElementById('btn-next-tipo-envio').addEventListener('click', nextTab);
document.getElementById('btn-back-direccion-envio').addEventListener('click', prevTab);
document.getElementById('btn-next-direccion-envio').addEventListener('click', nextTab);
document.getElementById('btn-back-forma-pago').addEventListener('click', prevTab);

// Modal de Tarjeta de Débito - Botón "Pagar"
document.querySelector('#tarjetaDebitoModal .btn-primary').addEventListener('click', (event) => {
    // Verifica si el modal está abierto
    if (document.getElementById('tarjetaDebitoModal').classList.contains('show')) {
        let esPagoValido = validarCamposPago('debito');

        if (esPagoValido) {
            alert("Pago con validado correctamente.");
            $('#tarjetaDebitoModal').modal('hide');  // Cierra el modal
        } else {
            alert("Por favor, complete los campos requeridos para la tarjeta de débito.");
        }
    }
});

document.querySelector('#tarjetaCreditoModal .btn-primary').addEventListener('click', (event) => {
    event.preventDefault();
    if (document.getElementById('tarjetaCreditoModal').classList.contains('show')) {
        
        let esPagoValido = validarCamposPago('credito');

        if (esPagoValido) {
            alert("Pago validado correctamente.");
            $('#tarjetaCreditoModal').modal('hide');
            
        } else {
            alert("Por favor, complete los campos requeridos para la tarjeta de crédito.");
        }
    }
});

// Botón de finalizar compra
document.querySelector('.btn-finalize').addEventListener('click', (event) => {
    let esDireccionValida = validarCamposDireccion();
    let esTarjetaValida = validarCamposPago();
    let esEnvioValido = validarEnvio();
    let esCantidadValida = validarProductos();
    let esPagoValido = validarPago();

    if (esDireccionValida && esPagoValido && esEnvioValido && esTarjetaValida && esCantidadValida) {
        alert("Compra exitosa");
            localStorage.removeItem("cart");
            localStorage.removeItem("cardType");
            localStorage.removeItem("shippingType");
            mostrarBadge();
            mostrarNumeroCarrito();

        window.location.href = 'index.html';
    
    } else {
        event.preventDefault(); // Previene la acción predeterminada si alguno de los campos es inválido
        event.stopPropagation();
        alert("Por favor complete todos los campos requeridos.");
    }
});

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

// Cambiar a modo oscuro al hacer clic
const switchbutton = document.getElementById('toggle');
const body = document.body;
let theme = localStorage.getItem('theme');

if (theme === 'dark-mode') {
    body.classList.add('dark-mode');
    switchbutton.checked = true;
} else {
    body.classList.remove('dark-mode');
    switchbutton.checked = false;
}

switchbutton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark-mode');
    } else {
        localStorage.setItem('theme', 'light-mode');
    }
});


// Validar si los campos de la dirección están vacíos
function validarCamposDireccion() {
    let departamento = document.getElementById("departamento");
    let localidad = document.getElementById("localidad");
    let calle = document.getElementById("calle");
    let numero = document.getElementById("numero");
    let esquina = document.getElementById("esquina");

    let valid = true; // bandera para verificar si todo está válido

    if (!departamento.value.trim()) {
        departamento.classList.add('is-invalid');
        valid = false; // marca como inválido si hay un error
    } else {
        departamento.classList.remove('is-invalid');

    }

    if (!localidad.value.trim()) {
        localidad.classList.add('is-invalid');
        valid = false;
    } else {
        localidad.classList.remove('is-invalid');
    }

    if (!calle.value.trim()) {
        calle.classList.add('is-invalid');
        valid = false;
    } else {
        calle.classList.remove('is-invalid');
    }

    if (!numero.value.trim()) {
        numero.classList.add('is-invalid');
        valid = false;
    } else {
        numero.classList.remove('is-invalid');
    }
    if (!esquina.value.trim()) {
        esquina.classList.add('is-invalid');
        valid = false;
    } else {
        esquina.classList.remove('is-invalid');
    }

    return valid;
}

function validarEnvio() {
    // Verificamos si el tipo de envío está guardado en localStorage
    let tipoEnvioSeleccionado = localStorage.getItem("shippingType");

    if (!tipoEnvioSeleccionado) {
        alert("Debe seleccionar un tipo de envío.");
        return false;
    }

    // Si el tipo de envío está en localStorage, es válido
    return true;
}

function validarCamposPago() {
    let tipoTarjeta = localStorage.getItem('cardType');

    let valid = true;

    // Variables de los campos comunes
    let numeroTarjeta, nombreTitular, fechaExpiracion, cvv;

    // Verifica el tipo de pago
    if (tipoTarjeta === 'credito') {
        // Si es tarjeta de crédito
        numeroTarjeta = document.getElementById("numeroTarjetaCredito");
        nombreTitular = document.getElementById("nombreTitularCredito");
        fechaExpiracion = document.getElementById("fechaExpiracionCredito");
        cvv = document.getElementById("cvvCredito");
    } else if (tipoTarjeta === 'debito') {
        // Si es tarjeta de débito
        numeroTarjeta = document.getElementById("numeroTarjetaDebito");
        nombreTitular = document.getElementById("nombreTitularDebito");
        fechaExpiracion = document.getElementById("fechaExpiracionDebito");
        cvv = document.getElementById("cvvDebito");
    } else {
        // Si no se seleccionó un tipo de tarjeta
        console.log("Por favor, seleccione un tipo de tarjeta (crédito o débito).");
        return false;
    }

    // Validación del número de tarjeta
    if (!numeroTarjeta.value.trim()) {
        numeroTarjeta.classList.add('is-invalid');  // Mostrar error con Bootstrap
        valid = false;
    } else {
        numeroTarjeta.classList.remove('is-invalid'); // Elimina la clase de error
    }

    // Validación del nombre del titular
    if (!nombreTitular.value.trim()) {
        nombreTitular.classList.add('is-invalid');
        valid = false;
    } else {
        nombreTitular.classList.remove('is-invalid');
    }

    // Validación de la fecha de expiración
    if (!fechaExpiracion.value.trim()) {
        fechaExpiracion.classList.add('is-invalid');
        valid = false;
    } else {
        fechaExpiracion.classList.remove('is-invalid');
    }

    // Validación del CVV
    if (!cvv.value.trim()) {
        cvv.classList.add('is-invalid');
        valid = false;
    } else {
        cvv.classList.remove('is-invalid');
    }

    return valid;
}

function validarPago() {
    // Verificamos si el tipo de tarjeta está guardado en localStorage
    let tipoPagoSeleccionado = localStorage.getItem("cardType");

    if (!tipoPagoSeleccionado) {
        alert("Debe seleccionar un método de pago.");
        return false;
    }

    // Si el tipo de tarjeta está en localStorage, es válido
    return true;
}

function validarProductos() {
    let valid = true;
    // Obtiene el carrito del localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    // Verifica si la cantidad de cada producto es válida (mayor a 0)
    cart.forEach(producto => {
        if (producto.quantity <= 0) {
            valid = false;
        }
    });

    return valid;
}