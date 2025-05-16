src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
crossorigin="anonymous"
src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+"
crossorigin="anonymous"

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const rememberCheckbox = document.getElementById("rememberMe");
    const togglePassword = document.getElementById("togglePassword");

   
    togglePassword.addEventListener("click", function () {
        const type = passwordInput.type === "password" ? "text" : "password";
        passwordInput.type = type;
        this.innerHTML = type === "text"
            ? '<i class="bi bi-eye-slash"></i>'
            : '<i class="bi bi-eye"></i>';
    });

   
    if (localStorage.getItem("rememberMe") === "true") {
        usernameInput.value = localStorage.getItem("username") || "";
        passwordInput.value = localStorage.getItem("password") || "";
        rememberCheckbox.checked = true;
    }

    
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const user = usernameInput.value;
        const pass = passwordInput.value;

       
        const validUser = "admin";
        const validPass = "1234";

        if (user === validUser && pass === validPass) {
            alert("¡Inicio de sesión exitoso!");

           
            if (rememberCheckbox.checked) {
                localStorage.setItem("username", user);
                localStorage.setItem("password", pass);
                localStorage.setItem("rememberMe", "true");
            } else {
                localStorage.removeItem("username");
                localStorage.removeItem("password");
                localStorage.setItem("rememberMe", "false");
            }

        
             window.location.href = "/html/venta.html";
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    });
});

document.getElementById("registerBtn").addEventListener("click", function () {
    window.open("/html/registrouser.html", "_blank"); 
});
