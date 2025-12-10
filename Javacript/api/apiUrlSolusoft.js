// ✅ URLs de la API REAL de Solusoft
export const API_BASE_URL = 'http://www.solusoftweb.somee.com/api';

// Endpoints de Usuarios y Autenticación
export const apiUrlLogin = `${API_BASE_URL}/empleadoUsuario/login`;
export const apiUrlRegistroEmpleadoUsuario = `${API_BASE_URL}/empleadoUsuario/registrar`;

// Endpoints de Gestión
export const apiUrlEmpleadoUsuario = `${API_BASE_URL}/empleadoUsuario`;
export const apiUrlUsuario = `${API_BASE_URL}/usuario`;
export const apiUrlEmpleado = `${API_BASE_URL}/empleado`;
export const apiUrlCliente = `${API_BASE_URL}/cliente`;
export const apiUrlProducto = `${API_BASE_URL}/producto`;
export const apiUrlProveedor = `${API_BASE_URL}/proveedor`;
export const apiUrlInventario = `${API_BASE_URL}/inventario`;
export const apiUrlCategoria = `${API_BASE_URL}/categoria`;
export const apiUrlMetodoPago = `${API_BASE_URL}/metodoPago`;
export const apiUrlVenta = `${API_BASE_URL}/venta`;
export const apiUrlDetalleVenta = `${API_BASE_URL}/detalleventa`;

// Funciones auxiliares para LocalStorage (sesión del usuario)
export const guardarSesion = (usuario) => {
    localStorage.setItem('usuario', JSON.stringify(usuario));
};

export const obtenerSesion = () => {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
};

export const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    window.location.href = 'index.html';
};

export const verificarSesion = () => {
    const usuario = obtenerSesion();
    if (!usuario) {
        window.location.href = 'index.html';
        return null;
    }
    return usuario;
};
