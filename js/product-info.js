document.addEventListener("DOMContentLoaded", function() {
    // Obtener el ID del producto almacenado en localStorage
    let productId = localStorage.getItem("productID");

    // Comprobar si hay un ID de producto almacenado
    if (productId) {
        // Realizar la solicitud a la API para obtener la información del producto
        fetch(`${PRODUCT_INFO_URL}${productId}${EXT_TYPE}`)
            .then(response => response.json())
            .then(product => {
                // Crear el contenido HTML para mostrar el producto
                 const productHTML = `
                    <div class="product-details">
                        <h2>${product.name}</h2>
                        <img src="${product.images[0]}" alt="${product.name}" class="img-fluid">
                        <p>${product.description}</p>
                        <h4>Precio: ${product.currency} ${product.cost}</h4>
                        <p>Cantidad vendidas: ${product.soldCount}</p>
                     </div>
                `;
            
           
                // Insertar el contenido en la página
                document.getElementById('product-info').innerHTML = productHTML;
            })
            .catch(error => {
                // Manejo de errores en la carga de datos
                console.error("Error al cargar el producto:", error);
            });
    }
});
