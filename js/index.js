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

// Modo Oscuro
const theme = localStorage.getItem('theme');

// Aplicar el tema guardado al cargar la página
if (theme === 'dark-mode') {
    document.body.classList.add('dark-mode');
} else {
    document.body.classList.remove('dark-mode');
}

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