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
  const isLoggedIn = sessionStorage.getItem('loggedIn');

    if (isLoggedIn != 'true') {
      window.location.href = 'login.html'; 
    }
});

    document.addEventListener("DOMContentLoaded", function() {
      const username = localStorage.getItem('username');
      const dropdownButton = document.querySelector('.dropdown-toggle');
            if (username) {
          dropdownButton.innerText = username; 
          document.getElementById('username-placeholder').innerText = username;
      } 
  });
  
        document.addEventListener("DOMContentLoaded", function() {
          const logoutButton = document.getElementById('logout');
               if (logoutButton) {
              logoutButton.addEventListener('click', function() {
                  sessionStorage.removeItem('loggedIn');
                  localStorage.removeItem('username');
                           window.location.href = 'login.html';
              });
          }
});