//dirección para obtener el listado en formato json:
const LIST_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";


//función para mostrar el spinner de carga:
function showSpinner(){
  document.getElementById("spinner-wrapper").style.display = "block";
}


//función para ocultar el spinner de carga:
function hideSpinner(){
  document.getElementById("spinner-wrapper").style.display = "none";
}


//función que realiza el fetch() a la url recibida y devuelve un objeto con los datos y el estado de la respuesta:
function getJSONData(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}
//array donde se cargarán los datos recibidos:
let categoriesArray = [];


//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showCategoriesList(array) {
    let htmlContentToAppend = "";


    for (let i = 0; i < array.length; i++) {
        let category = array[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="${category.imgSrc}" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                            <h4>${category.name}</h4>
                            <p>${category.description}</p>
                        </div>
                        <small class="text-muted">${category.productCount} artículos</small>
                    </div>
                </div>
            </div>
        </div>`;
    }


    // Asignar el HTML generado al contenedor después de construirlo completamente
    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
}


/*
EJECUCIÓN:


-Al cargar la página se llama a getJSONData() pasándole por parámetro la dirección para obtener el listado.
-Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en categoriesArray.
-Por último, se llama a showCategoriesList() pasándole por parámetro categoriesArray.


*/


document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(LIST_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            categoriesArray = resultObj.data;
            showCategoriesList(categoriesArray); // Corrección de la variable
        }
    });
});
