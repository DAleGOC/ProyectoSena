// ====================================
// CONFIGURACIÓN DE LA API
// ====================================
import { apiUrlRegistroEmpleadoUsuario as API_REGISTRO} from "../api/apiUrlSolusoft.js"; 

// ====================================
// ELEMENTOS DEL DOM
// ====================================
const form = document.getElementById('registerForm');
const submitBtn = document.getElementById('submitBtn');
const volverbtn = document.getElementById('volverbtn');
const passwordField = document.getElementById('password');
const confirmPasswordField = document.getElementById('confirmPassword');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');

// ====================================
// EXPRESIONES REGULARES
// ====================================
const REGEX = {
    // Solo letras (con acentos) y espacios
    nombre: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/,
    
    // Solo números, 6-15 dígitos
    identificacion: /^[0-9]{6,15}$/,
    
    // Dirección: letras, números, espacios y caracteres especiales (#, -, ,)
    direccion: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s#\-,]{5,100}$/,
    
    // Teléfono: solo números, 7-15 dígitos
    telefono: /^[0-9]{7,15}$/,
    
    // Email válido
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    
    // Usuario: letras, números, puntos y guiones bajos, 4-50 caracteres, sin espacios
    nombreUsuario: /^[a-zA-Z0-9._]{4,50}$/,
    
    // Contraseña: mínimo 6 caracteres
    password: /^.{6,}$/
};

// ====================================
// MENSAJES DE ERROR
// ====================================
const MENSAJES_ERROR = {
    nombre: 'Solo letras y espacios (2-50 caracteres)',
    apellidos: 'Solo letras y espacios (2-50 caracteres)',
    identificacion: 'Solo números (6-15 dígitos)',
    direccion: 'Formato inválido (mínimo 5 caracteres)',
    telefono: 'Solo números (7-15 dígitos)',
    correo: 'Formato de email inválido',
    nombreUsuario: 'Solo letras, números, puntos y guiones bajos (4-50 caracteres, sin espacios)',
    password: 'Mínimo 6 caracteres',
    confirmPassword: 'Las contraseñas no coinciden'
};

// ====================================
// VALIDAR CAMPO INDIVIDUAL
// ====================================
function validarCampo(campo, regex, mensajeError, requerido = true) {
    const valor = campo.value.trim();
    const errorDiv = document.getElementById(campo.id + 'Error');
    
    // Si el campo está vacío
    if (valor === '') {
        if (requerido) {
            campo.classList.add('is-invalid');
            campo.classList.remove('is-valid');
            if (errorDiv) errorDiv.textContent = 'Este campo es obligatorio';
            return false;
        } else {
            campo.classList.remove('is-invalid', 'is-valid');
            if (errorDiv) errorDiv.textContent = '';
            return true; // Válido porque es opcional y está vacío
        }
    }
    
    // Validar con regex
    if (!regex.test(valor)) {
        campo.classList.add('is-invalid');
        campo.classList.remove('is-valid');
        if (errorDiv) errorDiv.textContent = mensajeError;
        return false;
    }
    
    // Válido
    campo.classList.remove('is-invalid');
    campo.classList.add('is-valid');
    if (errorDiv) errorDiv.textContent = '';
    return true;
}

// ====================================
// EVENT LISTENERS PARA VALIDACIÓN EN TIEMPO REAL
// ====================================
document.getElementById('nombre').addEventListener('input', function() {
    validarCampo(this, REGEX.nombre, MENSAJES_ERROR.nombre);
    validarFormulario();
});

document.getElementById('apellidos').addEventListener('input', function() {
    validarCampo(this, REGEX.nombre, MENSAJES_ERROR.apellidos);
    validarFormulario();
});

document.getElementById('identificacion').addEventListener('input', function() {
    validarCampo(this, REGEX.identificacion, MENSAJES_ERROR.identificacion);
    validarFormulario();
});

document.getElementById('direccion').addEventListener('input', function() {
    validarCampo(this, REGEX.direccion, MENSAJES_ERROR.direccion, false); // Opcional
    validarFormulario();
});

document.getElementById('telefono').addEventListener('input', function() {
    validarCampo(this, REGEX.telefono, MENSAJES_ERROR.telefono, false); // Opcional
    validarFormulario();
});

document.getElementById('correo').addEventListener('input', function() {
    validarCampo(this, REGEX.email, MENSAJES_ERROR.correo, false); // Opcional
    validarFormulario();
});

document.getElementById('nombreUsuario').addEventListener('input', function() {
    validarCampo(this, REGEX.nombreUsuario, MENSAJES_ERROR.nombreUsuario);
    validarFormulario();
});

document.getElementById('cargo').addEventListener('change', validarFormulario);

// ====================================
// VALIDACIÓN DE CONTRASEÑA (FUERZA)
// ====================================
passwordField.addEventListener('input', function() {
    const password = this.value;
    let strength = 0;
    
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    const percentage = (strength / 5) * 100;
    strengthBar.style.width = percentage + '%';
    
    if (strength <= 2) {
        strengthBar.className = 'progress-bar bg-danger';
        strengthText.textContent = 'Contraseña débil';
        strengthText.className = 'form-text text-danger';
    } else if (strength === 3) {
        strengthBar.className = 'progress-bar bg-warning';
        strengthText.textContent = 'Contraseña media';
        strengthText.className = 'form-text text-warning';
    } else {
        strengthBar.className = 'progress-bar bg-success';
        strengthText.textContent = 'Contraseña fuerte';
        strengthText.className = 'form-text text-success';
    }
    
    validarCampo(this, REGEX.password, MENSAJES_ERROR.password);
    validarFormulario();
});

// ====================================
// MOSTRAR/OCULTAR CONTRASEÑA
// ====================================
document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const targetField = document.getElementById(targetId);
        const icon = this.querySelector('i');
        
        if (targetField.type === 'password') {
            targetField.type = 'text';
            icon.classList.remove('bi-eye');
            icon.classList.add('bi-eye-slash');
        } else {
            targetField.type = 'password';
            icon.classList.remove('bi-eye-slash');
            icon.classList.add('bi-eye');
        }
    });
});

// ====================================
// VALIDAR COINCIDENCIA DE CONTRASEÑAS
// ====================================
confirmPasswordField.addEventListener('input', function() {
    const password = passwordField.value;
    const confirmPassword = this.value;
    
    if (confirmPassword.length > 0) {
        if (password !== confirmPassword) {
            this.classList.add('is-invalid');
            this.classList.remove('is-valid');
            document.getElementById('confirmPasswordError').textContent = MENSAJES_ERROR.confirmPassword;
        } else {
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            document.getElementById('confirmPasswordError').textContent = '';
        }
    } else {
        this.classList.remove('is-invalid', 'is-valid');
        document.getElementById('confirmPasswordError').textContent = '';
    }
    
    validarFormulario();
});

// ====================================
// FUNCIÓN DE VALIDACIÓN COMPLETA
// ====================================
function validarFormulario() {
    const nombre = document.getElementById('nombre');
    const apellidos = document.getElementById('apellidos');
    const identificacion = document.getElementById('identificacion');
    const direccion = document.getElementById('direccion');
    const telefono = document.getElementById('telefono');
    const correo = document.getElementById('correo');
    const nombreUsuario = document.getElementById('nombreUsuario');
    const cargo = document.getElementById('cargo');
    const password = passwordField;
    const confirmPassword = confirmPasswordField;
    
    // Validar campos requeridos
    const nombreValido = validarCampo(nombre, REGEX.nombre, MENSAJES_ERROR.nombre);
    const apellidosValido = validarCampo(apellidos, REGEX.nombre, MENSAJES_ERROR.apellidos);
    const identificacionValida = validarCampo(identificacion, REGEX.identificacion, MENSAJES_ERROR.identificacion);
    const nombreUsuarioValido = validarCampo(nombreUsuario, REGEX.nombreUsuario, MENSAJES_ERROR.nombreUsuario);
    const passwordValida = validarCampo(password, REGEX.password, MENSAJES_ERROR.password);
    const cargoValido = cargo.value !== '';
    
    // Validar campos opcionales (solo si tienen contenido)
    const direccionValida = direccion.value.trim() === '' || REGEX.direccion.test(direccion.value.trim());
    const telefonoValido = telefono.value.trim() === '' || REGEX.telefono.test(telefono.value.trim());
    const correoValido = correo.value.trim() === '' || REGEX.email.test(correo.value.trim());
    
    // Validar que las contraseñas coincidan
    const contraseñasCoinciden = password.value.length >= 6 && password.value === confirmPassword.value;
    
    // El formulario es válido si TODOS los campos son válidos
    const formularioValido = nombreValido && 
                            apellidosValido && 
                            identificacionValida && 
                            nombreUsuarioValido && 
                            passwordValida && 
                            cargoValido && 
                            direccionValida && 
                            telefonoValido && 
                            correoValido && 
                            contraseñasCoinciden;
    
    // Habilitar/deshabilitar botón
    submitBtn.disabled = !formularioValido;
    
    // Cambiar estilo del botón
    if (formularioValido) {
        submitBtn.classList.remove('btn-secondary');
        submitBtn.classList.add('btn-success');
    } else {
        submitBtn.classList.remove('btn-success');
        submitBtn.classList.add('btn-secondary');
    }
}

// ====================================
// ENVIAR FORMULARIO
// ====================================
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Deshabilitar botón mientras se procesa
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Registrando...';
    
    // Ocultar mensajes previos
    document.getElementById('registerError').classList.add('d-none');
    document.getElementById('registerSuccess').classList.add('d-none');
    
    // ✅ CONSTRUIR OBJETO CON LOS NOMBRES CORRECTOS (PascalCase)
    const nuevoEmpleadoUsuario = {
        Nombre: document.getElementById('nombre').value.trim(),
        Apellidos: document.getElementById('apellidos').value.trim(),
        Identificacion: document.getElementById('identificacion').value.trim(),
        Direccion: document.getElementById('direccion').value.trim(),
        Telefono: document.getElementById('telefono').value.trim(),
        Correo: document.getElementById('correo').value.trim(),
        Cargo: document.getElementById('cargo').value,
        Nombre_Usuario: document.getElementById('nombreUsuario').value.trim(),
        Contraseña: passwordField.value.trim(),
        Rol: "Empleado"
    };
    
    console.log('📤 Enviando datos:', nuevoEmpleadoUsuario);
    
    try {
        const response = await fetch(API_REGISTRO, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(nuevoEmpleadoUsuario)
        });
        
        console.log('📥 Status:', response.status);
        
        const resultado = await response.json();
        console.log('📥 Respuesta:', resultado);
        
        if (resultado.success) {
            // Mostrar mensaje de éxito
            const successDiv = document.getElementById('registerSuccess');
            successDiv.textContent = resultado.message || 'Usuario registrado exitosamente';
            successDiv.classList.remove('d-none');
            
            // Limpiar formulario
            form.reset();
            strengthBar.style.width = '0%';
            strengthText.textContent = '';
            
            // Limpiar clases de validación
            document.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
                el.classList.remove('is-valid', 'is-invalid');
            });
            
            // Redirigir al login después de 3 segundos
            setTimeout(() => {
                window.location.href = '/html/Login/index.html';
            }, 3000);
        } else {
            // Mostrar mensaje de error
            const errorDiv = document.getElementById('registerError');
            errorDiv.textContent = resultado.message || 'Error al registrar usuario';
            errorDiv.classList.remove('d-none');
            
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="bi bi-check-circle"></i> Registrar';
        }
    } catch (error) {
        console.error('❌ Error:', error);
        const errorDiv = document.getElementById('registerError');
        errorDiv.textContent = 'Error de conexión. Verifica que la API esté ejecutándose en https://localhost:44384';
        errorDiv.classList.remove('d-none');
        
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="bi bi-check-circle"></i> Registrar';
    }
});

// ====================================
// BOTÓN VOLVER
// ====================================
volverbtn.addEventListener('click', function() {
    window.location.href = '/html/Login/index.html';
});

// ====================================
// VALIDACIÓN INICIAL AL CARGAR
// ====================================
validarFormulario();
