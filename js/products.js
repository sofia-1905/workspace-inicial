//array donde se cargarán los datos recibidos:
let categoriesArray = [];


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
