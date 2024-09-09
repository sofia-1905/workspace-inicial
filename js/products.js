let categoriesArray = [];

// Función para mostrar la lista de categorías en pantalla
function showCategoriesList(array) {
    let htmlContentToAppend = "";
    let catId = localStorage.getItem("catID");
    let currency = catId === "101" ? "USD" : "UYU";

    for (let i = 0; i < array.length; i++) {
        let category = array[i];
        htmlContentToAppend += `
       <div class="col-md-6 col-lg-4 d-flex">
            <div class="card mb-4 shadow-sm custom-card cursor-active">
              <img class="bd-placeholder-img card-img-top" src="${category.image}" alt="Imagen representativa">
              <h4>${category.name}</h4>
              <div class="card-body">
              <p>${category.description}</p>
                <h4>${currency} ${category.cost}</h4>
                <p>Cantidad vendidas: ${category.soldCount}</p>
              </div>
            </div>
        </div>`;
    }
    document.getElementById("productsList").innerHTML = htmlContentToAppend;
}

// Función para filtrar y ordenar productos
const filterAndSortProducts = (products, minPrice, maxPrice) => {
    if (typeof minPrice !== 'number' || typeof maxPrice !== 'number') {
        console.error('Invalid input: minPrice and maxPrice must be numbers');
        return [];
    }

    const filteredProducts = products.filter(product =>
        typeof product.cost === 'number' &&
        product.cost >= minPrice && product.cost <= maxPrice
    );

    return filteredProducts.sort((a, b) => a.cost - b.cost);
};

// Configuración del rango de precios
const rangevalue = document.querySelector(".slider-container .price-slider");
const rangeInputvalue = document.querySelectorAll(".range-input input");
let priceGap = 500;

const priceInputvalue = document.querySelectorAll(".price-input input");

for (let i = 0; i < priceInputvalue.length; i++) {
    priceInputvalue[i].addEventListener("input", e => {
        let minp = parseInt(priceInputvalue[0].value);
        let maxp = parseInt(priceInputvalue[1].value);
        let diff = maxp - minp;

        if (minp < 0) {
            alert("Minimum price cannot be less than 0");
            priceInputvalue[0].value = 0;
            minp = 0;
        }

        if (maxp > 10000) {
            alert("Maximum price cannot be greater than 10000");
            priceInputvalue[1].value = 10000;
            maxp = 10000;
        }

        if (minp > maxp - priceGap) {
            priceInputvalue[0].value = maxp - priceGap;
            minp = maxp - priceGap;

            if (minp < 0) {
                priceInputvalue[0].value = 0;
                minp = 0;
            }
        }

        if (diff >= priceGap && maxp <= rangeInputvalue[1].max) {
            if (e.target.className === "min-input") {
                rangeInputvalue[0].value = minp;
                let value1 = rangeInputvalue[0].max;
                rangevalue.style.left = `${(minp / value1) * 100}%`;
            } else {
                rangeInputvalue[1].value = maxp;
                let value2 = rangeInputvalue[1].max;
                rangevalue.style.right = `${100 - (maxp / value2) * 100}%`;
            }
        }
    });
}

for (let i = 0; i < rangeInputvalue.length; i++) {
    rangeInputvalue[i].addEventListener("input", e => {
        let minVal = parseInt(rangeInputvalue[0].value);
        let maxVal = parseInt(rangeInputvalue[1].value);
        let diff = maxVal - minVal;

        if (diff < priceGap) {
            if (e.target.className === "min-range") {
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
}

// Función para mostrar el título
function showTitle(category) {
    let htmlContentToAppend = `<h1>${category.catName}</h1>`;
    document.getElementById("titulo").innerHTML = htmlContentToAppend;
}

// Función para actualizar la lista de productos al aplicar el filtro
const updateProductList = () => {
    let minPrice = parseInt(document.querySelector(".min-input").value);
    let maxPrice = parseInt(document.querySelector(".max-input").value);

    const filteredAndSortedProducts = filterAndSortProducts(categoriesArray, minPrice, maxPrice);
    showCategoriesList(filteredAndSortedProducts);
};

// Evento DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    let catId = localStorage.getItem("catID");

    getJSONData(PRODUCTS_URL + catId + ".json").then(resultObj => {
        if (resultObj.status === "ok") {
            categoriesArray = resultObj.data.products;
            showTitle(resultObj.data);
            showCategoriesList(categoriesArray);
        }
    });

    // Evento para el botón de filtrar
    document.getElementById("clearFilterButton").addEventListener("click", showCategoriesList(array));
});
