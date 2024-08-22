//array donde se cargarán los datos recibidos:
let categoriesArray = [];


//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showCategoriesList(array) {
    let htmlContentToAppend = "";

    htmlContentToAppend += '<div class="row d-flex">'; // Comienza una fila

    for (let i = 0; i < array.length; i++) {
        let category = array[i];
        
        htmlContentToAppend += `
        <div class="col-4 d-flex">
            <div class="list-group-item list-group-item-action d-flex mb-4">
                <div class="row">
                    <div class="col-12">
                        <img src="${category.image}" alt="product image" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">
                                <h4>${category.name}</h4>
                                <p>${category.description}</p>
                                <p>USD ${category.cost}</p>
                                <p>Cantidad vendidas: ${category.soldCount}</p>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

    
        if ((i + 1) % 3 === 0) {
            htmlContentToAppend += '</div><div class="row d-flex">';
        }
    }

htmlContentToAppend += '</div>';


    // Asignar el HTML generado al contenedor después de construirlo completamente
    document.getElementById("productsList").innerHTML = htmlContentToAppend;
}


/*
EJECUCIÓN:


-Al cargar la página se llama a getJSONData() pasándole por parámetro la dirección para obtener el listado.
-Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en categoriesArray.
-Por último, se llama a showCategoriesList() pasándole por parámetro categoriesArray.


*/


document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(CATEGORY_AUTOS).then(function(resultObj) {
        if (resultObj.status === "ok") {
            categoriesArray = resultObj.data.products;
            showCategoriesList(categoriesArray); // Corrección de la variable
        }
    });
});
