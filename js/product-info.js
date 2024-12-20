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
                // Comprobar el objeto del producto en la consola
                console.log(product); 

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
                    <div class="row justify-content-center">
                        <!-- Columna para el carrusel de imágenes -->
                        <div class="col-md-9 carousel-container">
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
                    <div class="row">
                        <div class="col-md-6 offset-md-7">
                            <div class="botones-container">
                                <button class="boton boton-carrito">
                                    <i class="fas fa-shopping-cart"></i> Agregar al carrito
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                `;

                // Insertar el contenido en la página en el elemento con id 'product-info'
                document.getElementById('product-info').innerHTML = productHTML;

                // Mostrar productos relacionados
                showRelatedProducts(product.relatedProducts);

                // Agregar funcionalidad al botón "Agregar al carrito"
                document.querySelector(".boton-carrito").addEventListener("click", () => {
                    addToCart(product);
                    establecerNumeroCarrito();
                    mostrarBadge();
                    alert("Producto agregado al carrito");
                });

            })
            .catch(error => {
                // Manejo de errores en la carga de datos
                console.error("Error al cargar el producto:", error);
            });
    }

    // Función para agregar el producto al carrito
    function addToCart(product) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const productData = {
            id: product.id,
            name: product.name,
            cost: product.cost,
            currency: product.currency,
            quantity: 1,
            image: product.images[0] // Primera imagen
        };

        // Verifica si el producto ya está en el carrito
        const existingProductIndex = cart.findIndex(item => item.id === productData.id); // Busca el índice del producto

        if (existingProductIndex !== -1) {
        // Si ya existe, incrementa la cantidad
        cart[existingProductIndex].quantity += productData.quantity; // Aumenta la cantidad
        } else {
        // Si no existe, lo agrega al carrito
        cart.push(productData);
    }
    localStorage.setItem("cart", JSON.stringify(cart));

}

    // Función para mostrar productos relacionados
    function showRelatedProducts(relatedProducts) {
        const slideItems = 3; // Número de productos por "slide"
        const carouselItemsHTML = [];

        // Agrupar productos en grupos de "Slideitems"
        for (let i = 0; i < relatedProducts.length; i += slideItems) {
            const productsToShow = relatedProducts.slice(i, i + slideItems);
            
            const productsHTML = productsToShow.map(product => `
                <div class="col related-product">
                    <div class="card related-product-card" onclick="selectRelatedProduct(${product.id})">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                        </div>
                    </div>
                </div>
            `).join('');

            // Añadir el grupo de productos como un nuevo item del carousel
            carouselItemsHTML.push(`
                <div class="carousel-item ${i === 0 ? 'active' : ''}">
                    <div class="row">
                        ${productsHTML}
                    </div>
                </div>
            `);
        }

        // Insertar los productos relacionados en el contenedor correspondiente
        document.getElementById('related-products-list').innerHTML = `
            <div id="relatedProductCarousel" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    ${carouselItemsHTML.join('')}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#relatedProductCarousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#relatedProductCarousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        `;
    }

});


// Función para seleccionar un producto relacionado
function selectRelatedProduct(productId) {
    localStorage.setItem("productID", productId);  // Guardar el ID del producto en localStorage
    location.reload();  // Recargar la página para mostrar el nuevo producto
}

// Función para mostrar las calificaciones
function showComments(array) {
    let htmlContentToAppend = '';
  
    // Verificar si hay comentarios antes de mostrar el contenedor
    if (array.length > 0) {
      htmlContentToAppend += `<h5 id="calificacionestitle">Calificaciones</h5>`;
  
      // Agregar los comentarios al HTML
      for (let i = 0; i < array.length; i++) {
        let product = array[i];
  
        htmlContentToAppend += `
          <div id="commentdiv" class="row">
    <div id="iconos" class="col-sm-6 col-md-5 col-lg-4 d-flex">
        <span class="score-icon">${getIconForScore(product.score)}</span>
    </div>
    <div id="userdatedesc" class="col-sm-6 col-md-7 col-lg-8">
        <div class="row"> 
            <div class="col-lg-6">
                <p id="usuariocomment">${product.user}</p>
            </div>
            <div class="col-lg-6">
                <p id="fechacomment">${product.dateTime}</p>
            </div>
        </div>
        <div class="col-lg-12 mt-2"> 
            <p id="descripcioncomment">${product.description}</p>
        </div>
    </div>
</div>

        `;
      }
  
      // Mostrar los comentarios
      document.getElementById("comments").innerHTML = htmlContentToAppend;
  
      // Hacer visible el contenedor de comentarios
      document.getElementById('comments-list').style.display = 'block'; 
      document.getElementById('spinner-wrapper').style.display = 'none'; // Ocultar spinner
    } else {
      // Si no hay comentarios, ocultar el contenedor
      document.getElementById('comments-list').style.display = 'none';
      document.getElementById('spinner-wrapper').style.display = 'none'; // También ocultar el spinner si no hay comentarios
    }
}
  
document.addEventListener("DOMContentLoaded", function() {
    let productcommentId = localStorage.getItem("productID");

    getJSONData(PRODUCT_INFO_COMMENTS_URL + productcommentId + ".json").then(function(resultObj) {
        if (resultObj.status === "ok") {
            let commentsArray = resultObj.data;
            let comentariosGuardados = JSON.parse(localStorage.getItem('user-comment')) || [];
            commentsArray = commentsArray.concat(comentariosGuardados.filter(aux => aux.productId === productcommentId));
            showComments(commentsArray);
        }
    });
});

const score = localStorage.getItem('score');

//Funcion para obtener iconos de acuerdo al puntaje
function getIconForScore(score) {
    let icons = [
        '<i class="far fa-angry fa-lg"></i>',    // 1
        '<i class="far fa-frown fa-lg"></i>',    // 2
        '<i class="far fa-meh fa-lg"></i>',      // 3
        '<i class="far fa-smile fa-lg"></i>',    // 4
        '<i class="far fa-grin-stars fa-lg"></i>' // 5
    ];

    // Verifica si el puntaje está dentro del rango válido
    if (score >= 1 && score <= 5) {
        return `<ul class="rating" id="rating" data-mdb-toggle="rating" data-mdb-dynamic="true">
                    <li data-value="${score}">
                        ${icons[score - 1]}
                    </li>
                </ul>`;
    }
    return ''; // Retorna vacío si el puntaje es fuera de rango
}

//Seleccionar iconos de calificacion
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

//Muestra los calificaciones del JSON y las nuevas guardadas en LocalStorage
function mostrarComentariosActualizado() {

    let productcommentId = localStorage.getItem("productID");

    getJSONData(PRODUCT_INFO_COMMENTS_URL + productcommentId + ".json").then(function(resultObj) {
        if (resultObj.status === "ok") {
            let commentsArray = resultObj.data;
            let comentariosGuardados = JSON.parse(localStorage.getItem('user-comment')) || []; //Obtener la lista de comentarios guardados en Local Storage
            commentsArray = commentsArray.concat(comentariosGuardados.filter(aux => aux.productId === productcommentId)); //Filtrar los comentarios que coindicen con el id del producto guardado
            showComments(commentsArray);
        }
    });
}

// Función para agregar un nuevo ítem
function agregarCalificacion(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del formulario

    const inputItem = document.getElementById('user-comment');
    const nuevoItem = inputItem.value.trim();
    const inputRating = document.getElementById('rating-value');
    const nuevoRating = inputRating.value;

    let nuevoComentario = {
        productId: localStorage.getItem("productID"),  //Obtener identificador del producto que se comenta
        score: nuevoRating,                            //Valor de la puntuacion para las caritas
        description: nuevoItem,                     //Descripcion valor de texto con el trim para los espacios
        user: localStorage.getItem('username'),       //Devuelve el usuario del Local Storage
        dateTime: new Date().toISOString().slice(0, 19).replace('T', ' ')    //Devuelve la fecha
    };

    if (nuevoComentario) {
        let items = JSON.parse(localStorage.getItem('user-comment')) || [];
        items.push(nuevoComentario); // Agregar el nuevo ítem al array
        localStorage.setItem('user-comment', JSON.stringify(items)); // Guardar el array actualizado en localStorage

        inputItem.value = ''; // Limpiar el campo de entrada
        mostrarComentariosActualizado(); // Actualizar la lista con el nuevo ítem
    }
}

// Agregar el evento de clic para el botón de enviar
document.getElementById('comment-form').addEventListener('submit', agregarCalificacion);


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

function mostrarBadge() {
    // Obtener el valor del badge almacenado en localStorage
    let badge = localStorage.getItem('badge');
    // Seleccionar el elemento del badge en el DOM
    let numerocarrito = document.getElementById('badge');
    // Asignar el valor obtenido al contenido del badge
    numerocarrito.textContent = badge || '0'; // Muestra '0' si no hay valor
}
// Llama a la función al cargar el DOM
document.addEventListener('DOMContentLoaded', mostrarBadge);

function establecerNumeroCarrito() {
    const carrito = JSON.parse(localStorage.getItem('cart')) || []; // Obtener carrito del LocalStorage
    let totalCantidad = 0;

    carrito.forEach(producto => {
        let cantidad = producto.quantity; // Cantidad de cada producto
        totalCantidad += cantidad;
    });

    localStorage.setItem("badge",totalCantidad);
}