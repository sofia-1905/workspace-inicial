// Activar validación personalizada de Bootstrap
(function () {
    'use strict'

    // Obtener todos los formularios a los que se les aplicará la validación de Bootstrap
    var forms = document.querySelectorAll('.needs-validation')

    // Bucle sobre los formularios y prevenir el envío si es inválido
    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()

document.addEventListener("DOMContentLoaded", function () {
    const profileImage = document.getElementById("profileImage");
    const fileInput = document.getElementById("fileInput");

    // Cargar imagen de perfil desde localStorage si existe
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
        profileImage.src = storedImage;
    }

    // Manejar el cambio de la imagen
    fileInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                // Mostrar la imagen seleccionada en la vista previa
                profileImage.src = e.target.result;

                // Guardar la imagen en localStorage
                localStorage.setItem("profileImage", e.target.result);
            };
            reader.readAsDataURL(file); // Leer el archivo como Data URL (base64)
        }
    });

    // Guardar otros datos del formulario en localStorage
    const profileForm = document.getElementById("profileForm");
    profileForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar recarga

        // Validar formulario
        if (!profileForm.checkValidity()) {
            event.stopPropagation();
            profileForm.classList.add('was-validated');
            return;
        }

        // Aquí puedes agregar la lógica para guardar otros datos del formulario en localStorage
        document.getElementById('successMessage').style.display = 'block';
    });
});

// Asocia el clic en el texto "Editar foto de perfil" al input de tipo file
document.getElementById('editProfileText').addEventListener('click', function() {
    document.getElementById('fileInput').click();
});

// Cambia la imagen de perfil cuando se selecciona un archivo
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profileImage').src = e.target.result; // Cambia la imagen
        };
        reader.readAsDataURL(file); // Lee el archivo seleccionado como una URL de datos
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const username = localStorage.getItem('username');
    const dropdownButton = document.querySelector('.dropdown-toggle');
    if (username) {
        dropdownButton.innerText = username; 
        document.getElementById('username-placeholder').innerText = username;
    } else {
        dropdownButton.innerText = 'Invitado';
        document.getElementById('username-placeholder').innerText = ' ';
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


document.addEventListener("DOMContentLoaded", function() {
    // Obtener el username almacenado en localStorage
    const username = localStorage.getItem('username');

    // Rellenar el campo de e-mail en el formulario si existe un username
    if (username) {
        const emailField = document.getElementById('email');
        if (emailField) {
            emailField.value = username;  // Rellena el campo de e-mail
        }

        // También actualizamos el dropdown con el username
        const dropdownButton = document.querySelector('.dropdown-toggle');
        if (dropdownButton) {
            dropdownButton.innerText = username;
        }
    }
});



document.addEventListener("DOMContentLoaded", function() {
    // Referencia al formulario y al botón de guardar
    const profileForm = document.querySelector('form');
    
    // Manejar el evento de envío del formulario
    profileForm.addEventListener('submit', function(event) {
        event.preventDefault();  // Evita el envío tradicional del formulario

        // Capturar los datos del formulario
        const formData = {
            nombre: document.getElementById('nombre').value,
            segundoNombre: document.getElementById('segundo-nombre').value,
            apellido: document.getElementById('apellido').value,
            segundoApellido: document.getElementById('segundo-apellido').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value
        };

        // Convertir el objeto formData a JSON y almacenarlo en localStorage
        localStorage.setItem('userProfile', JSON.stringify(formData));

        // Opcional: Mostrar un mensaje o redirigir a otra página
        alert('Datos guardados correctamente.');
    });

    // Opcional: Cargar los datos almacenados en localStorage cuando se cargue la página
    const storedData = JSON.parse(localStorage.getItem('userProfile'));
    if (storedData) {
        // Rellenar los campos del formulario con los datos guardados
        document.getElementById('nombre').value = storedData.nombre || '';
        document.getElementById('segundo-nombre').value = storedData.segundoNombre || '';
        document.getElementById('apellido').value = storedData.apellido || '';
        document.getElementById('segundo-apellido').value = storedData.segundoApellido || '';
        document.getElementById('email').value = storedData.email || '';
        document.getElementById('telefono').value = storedData.telefono || '';
    }
});

/*Cambiar a modo oscuro al hacer click*/
const switchbutton = document.getElementById('switchbutton');
const body = document.body;
theme = localStorage.getItem('theme');

// Aplicar el tema guardado en el almacenamiento local al cargar la pagina
if (theme === 'dark-mode') {
    body.classList.add('dark-mode');
    switchbutton.checked = true;   //Se sincroniza el estado inicial del botón con el tema almacenado en localStorage.
} else {
    body.classList.remove('dark-mode');
    switchbutton.checked = false;
}

switchbutton.addEventListener('click', () => {
    // Alternar entre agregar o quitar la clase 'dark-mode' al hacer click usando toggle
    body.classList.toggle('dark-mode');
    
    // Guardar el nuevo estado del tema en el almacenamiento local
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark-mode');
        switchbutton.checked = true;
    } else {
        localStorage.setItem('theme', 'light-mode');
        switchbutton.checked = false;
    }
});