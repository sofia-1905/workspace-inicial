//array donde se cargarán los datos recibidos:
let categoriesArray = [];
let minCount = undefined;
let maxCount = undefined;

//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showCategoriesList(array) {
    let htmlContentToAppend = "";
    let catId = localStorage.getItem("catID"); // Obtener catId desde localStorage
    let currency = catId === "101" ? "USD" : "UYU";

    for (let i = 0; i < array.length; i++) {
        let category = array[i];
        
        htmlContentToAppend += `
       <div class="col-md-6 col-lg-4 d-flex">
            <div id="elemento" class="card mb-4 shadow-sm custom-card cursor-active" id="autos">
              <img id="fotoautos" class="bd-placeholder-img card-img-top" src="${category.image}"
                alt="Imgagen representativa de la categoría 'Autos'">
              <h4 id="nombre">${category.name}</h4>
              <div class="card-body">
              <p>${category.description}</p>
                <h4 id="precio">${currency} ${category.cost}</h4>
                 <p id="vendidos">Cantidad vendidas: ${category.soldCount}</p>
              </div>
            </div>
            </div> `
    }
      // Asignar el HTML generado al contenedor después de construirlo completamente
  document.getElementById("productsList").innerHTML = htmlContentToAppend;
  }




//  Script.js
const rangevalue = document.querySelector(".slider-container .price-slider");
const rangeInputvalue = document.querySelectorAll(".range-input input");

// Set the price gap
let priceGap = 500;

// Adding event listners to price input elements
const priceInputvalue = 
    document.querySelectorAll(".price-input input");
for (let i = 0; i < priceInputvalue.length; i++) {
    priceInputvalue[i].addEventListener("input", e => {

        // Parse min and max values of the range input
        let minp = parseInt(priceInputvalue[0].value);
        let maxp = parseInt(priceInputvalue[1].value);
        let diff = maxp - minp

        if (minp < 0) {
            alert("minimum price cannot be less than 0");
            priceInputvalue[0].value = 0;
            minp = 0;
        }

        // Validate the input values
        if (maxp > 10000) {
            alert("maximum price cannot be greater than 10000");
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

        // Check if the price gap is met 
        // and max price is within the range
        if (diff >= priceGap && maxp <= rangeInputvalue[1].max) {
            if (e.target.className === "min-input") {
                rangeInputvalue[0].value = minp;
                let value1 = rangeInputvalue[0].max;
                rangevalue.style.left = `${(minp / value1) * 100}%`;
            }
            else {
                rangeInputvalue[1].value = maxp;
                let value2 = rangeInputvalue[1].max;
                rangevalue.style.right = 
                    `${100 - (maxp / value2) * 100}%`;
            }
        }
    });

    // Add event listeners to range input elements
    for (let i = 0; i < rangeInputvalue.length; i++) {
        rangeInputvalue[i].addEventListener("input", e => {
            let minVal = 
                parseInt(rangeInputvalue[0].value);
            let maxVal = 
                parseInt(rangeInputvalue[1].value);

            let diff = maxVal - minVal
            
            // Check if the price gap is exceeded
            if (diff < priceGap) {
            
                // Check if the input is the min range input
                if (e.target.className === "min-range") {
                    rangeInputvalue[0].value = maxVal - priceGap;
                }
                else {
                    rangeInputvalue[1].value = minVal + priceGap;
                }
            }
            else {
            
                // Update price inputs and range progress
                priceInputvalue[0].value = minVal;
                priceInputvalue[1].value = maxVal;
                rangevalue.style.left =
                    `${(minVal / rangeInputvalue[0].max) * 100}%`;
                rangevalue.style.right =
                    `${100 - (maxVal / rangeInputvalue[1].max) * 100}%`;
            }
        });
    }
}


    


    
 

/*
EJECUCIÓN:


-Al cargar la página se llama a getJSONData() pasándole por parámetro la dirección para obtener el listado.
-Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en categoriesArray.
-Por último, se llama a showCategoriesList() pasándole por parámetro categoriesArray.


*/

function showTitle(category) {
  let htmlContentToAppend = "";

  htmlContentToAppend += `
  <h1>${category.catName}</h1>`

  document.getElementById("titulo").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function(e) {
  let catId = localStorage.getItem("catID");

    getJSONData(PRODUCTS_URL + catId + ".json").then(function(resultObj) {
        if (resultObj.status === "ok") {
            categoryData = resultObj.data;
            showTitle(categoryData);
        }
    });
});


document.addEventListener("DOMContentLoaded", function(e) {
  let catId = localStorage.getItem("catID");
    getJSONData(PRODUCTS_URL + catId + ".json").then(function(resultObj) {
        if (resultObj.status === "ok") {
            categoriesArray = resultObj.data.products;
            showCategoriesList(categoriesArray); // Corrección de la variable
        }
    });
});
