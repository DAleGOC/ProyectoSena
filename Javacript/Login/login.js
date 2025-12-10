
// ====================================
// TOGGLE PASSWORD VISIBILITY
// ====================================

import { apiUrlLogin } from "../api/apiUrlSolusoft.js"; 
import { guardarSesion, obtenerSesion } from "../api/apiUrlSolusoft.js";

document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const input = document.getElementById(targetId);
        const icon = this.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('bi-eye');
            icon.classList.add('bi-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('bi-eye-slash');
            icon.classList.add('bi-eye');
        }
    });
});

// ====================================
// LOGIN FORM
// ====================================

const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');

if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const nombreUsuario = document.getElementById('username').value.trim();
        const contraseña = document.getElementById('passwordLogin').value.trim();
        
        // Validaciones
        if (!nombreUsuario || !contraseña) {
            mostrarError('Por favor complete todos los campos');
            return;
        }
        
        // Deshabilitar botón y mostrar loader
        const btnSubmit = loginForm.querySelector('button[type="submit"]');
        const textoOriginal = btnSubmit.textContent;
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Iniciando...';
        
        try {
            const response = await fetch(apiUrlLogin, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Nombre_Usuario: nombreUsuario,
                    Contraseña: contraseña
                })
            });
            
            const data = await response.json();
            
            if (response.ok && data.success) {
                // Login exitoso
                sessionStorage.setItem('idEmpleado', data.data.iD_Empleado);
                sessionStorage.setItem('nombreUsuario', data.data.nombre_Usuario);
                sessionStorage.setItem('nombre', data.data.nombre);
                sessionStorage.setItem('apellido', data.data.apellidos  );
                guardarSesion(data.data);
                
                // Guardar "Recuérdame" si está marcado
                const rememberMe = document.getElementById('rememberMe').checked;
                console.log('Remember Me:', rememberMe);
                if (rememberMe) {
                    localStorage.setItem('rememberUser', nombreUsuario);
                    
                } else {
                    localStorage.removeItem('rememberUser');
                }
                
                mostrarExito('¡Bienvenido ' + data.data.nombre+ '!');
                
                // Redirigir según el rol
                setTimeout(() => {
                    if (data.data.rol === 'Administrador') {
                        window.location.href = '../Admin/panelAdmin.html'; // Página de admin
                    } else {
                        window.location.href = '/html/Venta/venta.html'; // Página de usuario
                    }
                }, 1500);

            } else {
                // Error de autenticación
                mostrarError(data.message || 'Credenciales inválidas o usuario inactivo. Contacta al administrador.');
            }
            
        } catch (error) {
            console.error('Error al hacer login:', error);
            mostrarError('Error de conexión. Verifica que la API esté ejecutándose en Visual Studio (puerto 44384).');
        } finally {
            btnSubmit.disabled = false;
            btnSubmit.textContent = textoOriginal;
        }
    });
}

// ====================================
// BOTÓN REGISTRARSE
// ====================================

const btnRegistro = document.getElementById('goRegister');
if (btnRegistro) {
    btnRegistro.addEventListener('click', function() {
        window.location.href = '/html/Login/modal-agregar.html'; // Crear esta página después
    });
}

// ====================================
// CARGAR USUARIO RECORDADO
// ====================================

window.addEventListener('DOMContentLoaded', function() {
    const rememberUser = localStorage.getItem('rememberUser');
    const chkRemember = document.getElementById('rememberMe');
    const inputUser = document.getElementById('username');
    if (rememberUser) {

        if (inputUser) 
            inputUser.value = rememberUser;
        if (chkRemember)
             chkRemember.checked = true;
    }
    



    // Si ya hay sesión activa, redirigir
    const sesion = obtenerSesion();
    if (sesion && window.location.pathname.includes('index.html')) {
       if (sesion.rol === 'Administrador') {
           window.location.href = '../Admin/panelAdmin.html';
      } else {
           window.location.href = '/html/Venta/venta.html';
     }

     
    }
});

// ====================================
// FUNCIONES DE NOTIFICACIONES
// ====================================

function mostrarError(mensaje) {
    const errorDiv = document.getElementById('loginError');
    if (errorDiv) {
        errorDiv.textContent = mensaje;
        errorDiv.style.display = 'block';
        
        // Ocultar después de 5 segundos
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    }
}

function mostrarExito(mensaje) {
    const errorDiv = document.getElementById('loginError');
    if (errorDiv) {
        errorDiv.textContent = mensaje;
        errorDiv.className = 'text-success mb-3';
        errorDiv.style.display = 'block';
    }
}