document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});


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