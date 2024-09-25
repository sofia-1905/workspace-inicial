const ORDER_PRICE_DOWN = "orderByPriceDown";
const ORDER_PRICE_UP = "orderByPriceUp";
const ORDER_REL = "orderByRelevance";
let categoriesArray = [];
let productsArray = [];
let minCount = undefined;
let maxCount = undefined;

function showCategoriesList(array) {
    let htmlContentToAppend = "";
    let catId = localStorage.getItem("catID");
    let currency = catId === "101" ? "USD" : "UYU";

    for (let i = 0; i < array.length; i++) {
        let category = array[i];

        // filtro de precios
        if ((minCount !== undefined && category.cost < minCount) ||
            (maxCount !== undefined && category.cost > maxCount)) {
            continue;
        }

        htmlContentToAppend += `
        <div class="col-md-6 col-lg-4 d-flex" onclick="setProductID(${category.id})">
            <div class="card mb-4 custom-card cursor-active  product-item">
                <img class="bd-placeholder-img card-img-top" src="${category.image}" alt="Imagen representativa">
                <h4 class="name">${category.name}</h4>
                <div class="card-body">
                    <p class="description">${category.description}</p>
                    <h4 class="price">${currency} ${category.cost}</h4>
                    <p class="sold-count">Cantidad vendidas: ${category.soldCount}</p>
                </div>
            </div>
        </div>`;
    }

    document.getElementById("productsList").innerHTML = htmlContentToAppend;
}
function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_PRICE_DOWN) {
        result = array.sort((a, b) => a.cost - b.cost);
    } else if (criteria === ORDER_PRICE_UP) {
        result = array.sort((a, b) => b.cost - a.cost);
    } else if (criteria === ORDER_REL) {
        result = array.sort((a, b) => b.soldCount - a.soldCount);
    }
    return result;
}
        function showProductsList(array){
            showCategoriesList(array);
        }
    
            document.getElementById("sortAsc").addEventListener("click", function(){
                productsArray = sortProducts(ORDER_PRICE_DOWN, productsArray);
                showProductsList(productsArray);
            });
            
            document.getElementById("sortDesc").addEventListener("click", function(){
                productsArray = sortProducts(ORDER_PRICE_UP, productsArray);
                showProductsList(productsArray);
            });
            
            document.getElementById("sortRelevance").addEventListener("click", function(){
                productsArray = sortProducts(ORDER_REL, productsArray);
                showProductsList(productsArray);
            });

//verifica que productsArray esté lleno antes de ordenar
document.addEventListener("DOMContentLoaded", function() {
    let catId = localStorage.getItem("catID");

    getJSONData(PRODUCTS_URL + catId + ".json").then(function(resultObj) {
        if (resultObj.status === "ok") {
            let categoryData = resultObj.data;
            showTitle(categoryData);
            productsArray = categoryData.products;
            showCategoriesList(productsArray);
        }
    });
});

function showTitle(category) {
    let htmlContentToAppend = `<h1>${category.catName}</h1>`;
    document.getElementById("titulo").innerHTML = htmlContentToAppend;
}

// Función para guardar el ID del producto seleccionado y redirigir a product-info.html
function setProductID(productId) {
    localStorage.setItem("productID", productId);
    window.location.href = "product-info.html";
}

// slider de precios
const rangevalue = document.querySelector(".slider-container .price-slider");
const rangeInputvalue = document.querySelectorAll(".range-input input");
const priceInputvalue = document.querySelectorAll(".price-input input");

let priceGap = 500;

rangeInputvalue.forEach(input => {
    input.addEventListener("input", e => {
        let minVal = parseInt(rangeInputvalue[0].value);
        let maxVal = parseInt(rangeInputvalue[1].value);

        let diff = maxVal - minVal;

        if (diff < priceGap) {
            if (e.target.classList.contains("minCount")) {
                rangeInputvalue[0].value = maxVal - priceGap;
            } else {
                rangeInputvalue[1].value = minVal + priceGap;
            }
        } else {
            priceInputvalue[0].value = minVal;
            priceInputvalue[1].value = maxVal;
            rangevalue.style.left = `${(minVal / rangeInputvalue[0].max) * 100}%`;
            rangevalue.style.right = `${100 - (maxVal / rangeInputvalue[1].max) * 100}%`;
        }
    });
});


document.addEventListener("DOMContentLoaded", function() {
    let catId = localStorage.getItem("catID");

    getJSONData(PRODUCTS_URL + catId + ".json").then(function(resultObj) {
        if (resultObj.status === "ok") {
            let categoryData = resultObj.data;
            showTitle(categoryData);
            categoriesArray = categoryData.products;
            showCategoriesList(categoriesArray);
        }
    });
});

document.getElementById("rangeFilterCount").addEventListener("click", function() {
    minCount = document.getElementById("rangeFilterCountMin").value;
    maxCount = document.getElementById("rangeFilterCountMax").value;

    if (minCount !== "" && !isNaN(minCount) && parseInt(minCount) >= 0) {
        minCount = parseInt(minCount);
    } else {
        minCount = undefined;
    }

    if (maxCount !== "" && !isNaN(maxCount) && parseInt(maxCount) >= 0) {
        maxCount = parseInt(maxCount);
    } else {
        maxCount = undefined;
    }

    showCategoriesList(categoriesArray);
});

document.getElementById("clearRangeFilter").addEventListener("click", function() {
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";
    minCount = undefined;
    maxCount = undefined;
    showCategoriesList(categoriesArray);
});


// BAR BUSCADOR

document.addEventListener('DOMContentLoaded', function() {
  // Selecciona el campo de búsqueda y la lista de productos
  const searchInput = document.getElementById('searchInput');
  const productsList = document.getElementById('productsList');

  // Función para filtrar productos
  function filterProducts() {
      const searchTerm = searchInput.value.toLowerCase();

      // Obtén todos los elementos de producto
      const products = productsList.getElementsByClassName('product-item');

      // Itera sobre cada producto
      for (let i = 0; i < products.length; i++) {
          const product = products[i].textContent.toLowerCase(); 
          // obtiene el texto completo de la tarjeta del producto 
          // Verifica si el producto contiene el término de búsqueda
          if (product.includes(searchTerm)) {

              products[i].parentElement.classList.add ("d-block"); 
              products[i].parentElement.classList.remove ("d-none"); // Muestra el producto
          } else {
            products[i].parentElement.classList.remove ("d-block"); 
            products[i].parentElement.classList.add ("d-none"); // Oculta el producto
          }
      }
  }

  // Añade el evento de entrada al campo de búsqueda
  searchInput.addEventListener('input', filterProducts);
});

// FIN BAR BUSCADOR