// Espera a que el contenido del documento esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Obtener el ID del producto almacenado en localStorage
    let productId = localStorage.getItem("productID");

    // Comprobar si hay un ID de producto almacenado
    if (productId) {
        // Realizar la solicitud a la API para obtener la información del producto
        fetch(`${PRODUCT_INFO_URL}${productId}${EXT_TYPE}`)
            .then(response => response.json())  // Convertir la respuesta a formato JSON
            .then(product => {
                // Crear el contenido HTML para mostrar el producto
                const productHTML = `
                <div class="container-fluid">
                    <ul class="breadcrumb">
                        <li><a href="index.html" class="home">Inicio</a></li>
                        <li><a href="categories.html" class="category-products">Categoría</a></li>
                        <li><a href="products.html?category=${product.category}" class="product-category">${product.category}</a></li>
                        <li><a class="product-name">${product.name}</a></li>
                    </ul>
                </div>

                <div class="product-details row justify-content-center">
                    <!-- Columna para el carrusel de imágenes -->
                    <div class="col-md-6 carousel-container">
                        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-indicators">
                                ${product.images.map((_image, index) => `
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${index}" class="${index === 0 ? 'active' : ''}" aria-current="${index === 0 ? 'true' : ''}" aria-label="Slide ${index + 1}"></button>
                                `).join('')}
                            </div>
                            <div class="carousel-inner">
                                ${product.images.map((image, index) => `
                                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                                        <img src="${image}" class="d-block w-100 img-fluid" alt="${product.name}">
                                    </div>
                                `).join('')}
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
            
                    <!-- Columna para la información del producto -->
                    <div class="col-md-6 product-info-container">
                        <h2 class="product-name">${product.name}</h2>
                        <p class="product-description">${product.description}</p>
                        <h4 class="product-price">Precio: ${product.currency} ${product.cost}</h4>
                        <p class="product-sold">Cantidad vendidas: ${product.soldCount}</p>
                    </div>
                </div>
                `;
                
                // Insertar el contenido en la página en el elemento con id 'product-info'
                document.getElementById('product-info').innerHTML = productHTML;

                // Mostrar productos relacionados
                showRelatedProducts(product.relatedProducts); 

            })
            .catch(error => {
                // Manejo de errores en la carga de datos
                console.error("Error al cargar el producto:", error);
            });
    }


    // Función para mostrar productos relacionados
    function showRelatedProducts(relatedProducts) {
        const relatedProductsHTML = relatedProducts.map(product => `
            <div class="col-md-4 cursor-pointer" onclick="selectRelatedProduct(${product.id})">
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                    </div>
                </div>
            </div>
        `).join('');

        // Insertar los productos relacionados en el contenedor correspondiente
        document.getElementById('related-products-list').innerHTML = relatedProductsHTML;
    }
});

// Función para seleccionar un producto relacionado
function selectRelatedProduct(productId) {
    localStorage.setItem("productID", productId);
    location.reload();  // Recargar la página para mostrar el nuevo producto
}

  document.querySelectorAll('#rating li').forEach(item => {
    item.addEventListener('click', function() {
      const ratingValue = this.getAttribute('data-value');
      document.getElementById('rating-value').value = ratingValue;

      // Remover la clase 'selected' de todas las caritas
      document.querySelectorAll('#rating li').forEach(e => e.classList.remove('selected'));
      
      // Añadir la clase 'selected' a la carita clickeada
      this.classList.add('selected');
    });
  });

