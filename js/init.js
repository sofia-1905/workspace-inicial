const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
const CATEGORY_AUTOS = "https://japceibal.github.io/emercado-api/cats_products/101.json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
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

document.addEventListener("DOMContentLoaded", function() {
  // Redirige al usuario a la página de inicio de sesión si no está autenticado
  const isLoggedIn = sessionStorage.getItem('loggedIn');
  if (isLoggedIn !== 'true') {
      window.location.href = 'login.html';
      return; // Detiene el resto del código si no está autenticado
  }

  // Muestra el nombre de usuario en el botón de dropdown si está disponible
  const username = localStorage.getItem('username');
  const dropdownButton = document.querySelector('.dropdown-toggle');
  const usernamePlaceholder = document.getElementById('username-placeholder');

  if (username && dropdownButton) {
      dropdownButton.innerText = username;
  }
  if (username && usernamePlaceholder) {
      usernamePlaceholder.innerText = username;
  }

  // Configura el evento de cierre de sesión
  const logoutButton = document.getElementById('logout');
  if (logoutButton) {
      logoutButton.addEventListener('click', function() {
          sessionStorage.removeItem('loggedIn');
          localStorage.removeItem('username');
          window.location.href = 'login.html';
      });
  }
});
