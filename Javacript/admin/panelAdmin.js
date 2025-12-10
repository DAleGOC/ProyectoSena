//inicio
console.log('🚀 panelAdmin.js CARGADO');
import{ apiUrlUsuario} from "../api/apiUrlSolusoft.js";
import { apiUrlEmpleado as api_empleado } from "../api/apiUrlSolusoft.js";
import { apiUrlEmpleadoUsuario as api_empleadoUsuario } from "../api/apiUrlSolusoft.js";
import { apiUrlProducto as api_producto } from "../api/apiUrlSolusoft.js";
import { apiUrlCategoria as api_categoria } from "../api/apiUrlSolusoft.js";
import { apiUrlProveedor as api_proveedor } from "../api/apiUrlSolusoft.js";  
import { apiUrlInventario as api_Inventario}    from '../api/apiUrlSolusoft.js';
import { apiUrlMetodoPago as api_MetPago} from '../api/apiUrlSolusoft.js';
import { apiUrlCliente } from '../api/apiUrlSolusoft.js';
import { apiUrlVenta } from "../api/apiUrlSolusoft.js";
import { apiUrlDetalleVenta } from "../api/apiUrlSolusoft.js";




// ===== ELEMENTOS DEL DOM =====
const adminName = document.getElementById('adminName');
//EMPLEADOS
const totalEmpleados = document.getElementById('totalEmpleados');
const tablaEmpleados = document.getElementById('tablaEmpleados');
const buscarEmpleado = document.getElementById('buscarEmpleado');
const modalEditarEmpleado = document.getElementById('modalEditarEmpleado') ;

//USUARIOS
const buscarUsuario = document.getElementById('buscarUsuario');
const tablaUsuarios = document.getElementById('tablaUsuarios');
const totalUsuarios = document.getElementById('totalUsuarios');
const modalEditarUsuario = document.getElementById('modalEditarUsuario');

//PRODUCTOS
const tablaProductos = document.getElementById('tablaProductos');
const buscarProducto = document.getElementById('buscarProducto');
const totalProductos = document.getElementById('totalProductos');
const modalEditarProducto = document.getElementById('modalEditarProducto') ;
const modalAgregarProducto = document.getElementById('modalAgregarProducto') ;  

//  NUEVA TABLA: productos por reponer
const tablaProductosPorReponer = document.getElementById('tablaProductosPorReponer');


//categoria
const totalCategorias = document.getElementById('totalCategorias');
const tablaCategorias = document.getElementById('tablaCategorias');
const buscarCategoria = document.getElementById('buscarCategoria');
const modalEditarCategoria = document.getElementById('modalEditarCategoria');
const modalAgregarCategoria = document.getElementById('modalAgregarCategoria');
//iNVENTARIO
const totalInventario = document.getElementById('totalInventario');
const tablaInventario = document.getElementById('tablaInventario');
const buscarInventario = document.getElementById('buscarInventario');
const modalEditarInventario = document.getElementById('modalEditarInventario');
const modalAgregarInventario = document.getElementById('modalAgregarInventario');

//PROVEEDOR
const totalProveedores=document.getElementById('totalProveedores');
const tablaProveedores=document.getElementById('tablaProveedores');
const buscarProveedor = document.getElementById('buscarProveedor');
const modalEditarProveedor = document.getElementById('modalEditarProveedor');

// MÉTODOS DE PAGO
const tablaMetodos = document.getElementById('tablaMetodos');
const buscarMetodo = document.getElementById('buscarMetodo');
const modalAgregarMetodo = document.getElementById('modalAgregarMetodo');
const modalEditarMetodo = document.getElementById('modalEditarMetodo');
// CLIENTES
const tablaClientes = document.getElementById('tablaClientes');
const buscarCliente = document.getElementById('buscarCliente');
const modalAgregarCliente = document.getElementById('modalAgregarCliente');
const modalEditarCliente = document.getElementById('modalEditarCliente');
const totalClientes = document.getElementById('totalClientes');
//VENTAS





const btnCerrarSesion = document.getElementById('btnCerrarSesion');

//===========FIn_Elementos_Doom======================






//vARIABLES GLOBALES
let usuarios = [];
let empleados = [];
let productos = [];
let categorias = [];
let proveedores = [];
let inventario = [];
let metodos = [];
let clientes = [];
let productosPorReponer = [];

let usuarioSeleccionado = null;
let empleadoSeleccionado = null;
let productoSeleccionado = null;
let categoriaSeleccionada = null;
let proveedorSeleccionado = null;
let inventarioSeleccionado = null;
let metodoSeleccionado = null;
let clienteSeleccionado = null;

// ===== CARGAR DATOS =====
async function cargarUsuarios() {
    try {
        const response = await fetch(`${api_empleadoUsuario}/listar`);
        const data = await response.json();
        if (data.success) {
            usuarios = data.data || [];
            mostrarUsuarios(usuarios);
            totalUsuarios.textContent = usuarios.length;
        }
    } catch (error) {
        console.error('❌ Error:', error);
        mostrarAlerta('Error al cargar usuarios', 'danger');
    }
}

async function cargarEmpleados() {
    try {
        const response = await fetch(`${api_empleado}/listar`);
        const data = await response.json();
        if (data.success) {
            empleados = data.data || [];
            mostrarEmpleados(empleados);
            totalEmpleados.textContent = empleados.filter(e => e.estado === 1 || e.estado === true).length;
        }
    } catch (error) {
        console.error('❌ Error:', error);
        mostrarAlerta('Error al cargar empleados', 'danger');
    }
}

async function cargarProductos() {
    try {
        const response = await fetch(`${api_producto}/listar`);
        const data = await response.json();
        if (data.success) {
            productos = data.data || [];
            mostrarProductos(productos);
            totalProductos.textContent = productos.length;
        }
    } catch (error) {
        console.error('❌ Error:', error);
        mostrarAlerta('Error al cargar productos', 'danger');
    }
}

// ===== MOSTRAR EN TABLAS =====
function mostrarUsuarios(lista) {
    if (!lista || lista.length === 0) {
        tablaUsuarios.innerHTML = `<tr><td colspan="7" class="text-center">No hay usuarios</td></tr>`;
        return;
    }
    
    tablaUsuarios.innerHTML = lista.map(u => `
        <tr>
            <td>#${u.iD_Empleado}</td>
            <td>${u.nombre} ${u.apellidos}</td>
            <td><code>${u.nombre_Usuario}</code></td>
            <td><span class="badge bg-info">${u.rol}</span></td>
            <td>${u.cargo || 'N/A'}</td>
            <td>${u.estado === true ? '<span class="badge bg-success">✅ Activo</span>' : '<span class="badge bg-danger">❌ Inactivo</span>'}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editarUsuario(${u.iD_Empleado})">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="eliminarUsuarioYEmpleado(${u.iD_Empleado})">Eliminar</button>
                <button class="btn btn-sm btn-outline-danger  btnResetearContraseña " onclick="resetearClaveUsuario(${u.iD_Empleado})"><i class="bi bi-key"></i> Resetear clave</button>
            </td>
        </tr>
    `).join('');
}

async function resetearClaveUsuario(idEmpleado) {
  const nuevaClave = prompt("Ingresa la nueva contraseña temporal para este usuario:");
  if (!nuevaClave) return;

  try {
    const resp = await fetch(`${apiUrlUsuario}/reset-password` , {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ID_Empleado: idEmpleado,
        NuevaClave: nuevaClave  
      })
    });
    const data = await resp.json();

    if (data.success) {
      alert("Contraseña reseteada. Comunica la clave temporal al empleado.");
    } else {
      alert(data.mensaje || "Error al resetear contraseña.");
    }
  } catch (e) {
    console.error(e);
    alert("Error de comunicación con el servidor.");
  }
}






function mostrarEmpleados(lista) {
    if (!lista || lista.length === 0) {
        tablaEmpleados.innerHTML = `<tr><td colspan="8" class="text-center">No hay empleados</td></tr>`;
        return;
    }
    
    tablaEmpleados.innerHTML = lista.map(e => `
        <tr>
            <td>#${e.iD_Empleado}</td>
            <td>${e.nombre} ${e.apellidos}</td>
            <td>${e.identificacion}</td>
            <td>${e.cargo}</td>
            <td>${e.telefono || 'N/A'}</td>
            <td>${e.correo || 'N/A'}</td>
            <td>${e.direccion || 'N/A'}</td>   
            <td>${e.estado === 1 || e.estado === true ? '<span class="badge bg-success">✅Activo</span>' : '<span class="badge bg-danger">❌</span>'}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editarEmpleado(${e.iD_Empleado})">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="eliminarEmpleado(${e.iD_Empleado})">Eliminar</button>
            </td>
        </tr>
    `).join('');
}

function mostrarProductos(lista) {
    if (!lista || lista.length === 0) {
        tablaProductos.innerHTML = `<tr><td colspan="8" class="text-center">No hay productos</td></tr>`;
        return;
    }
    
    tablaProductos.innerHTML = lista.map(p => {
        // Buscar el nombre de la categoría
        const categoria = categorias.find(c => c.ID_Categoria === p.iD_Categoria || c.iD_Categoria === p.iD_Categoria);
        const nombreCategoria = categoria ? categoria.nombre : 'Sin categoría';
        
        // Buscar el nombre del proveedor
        const proveedor = proveedores.find(pr => pr.ID_Proveedor === p.iD_Proveedor || pr.iD_Proveedor === p.iD_Proveedor);
        const nombreProveedor = proveedor ?  proveedor.nombre : 'Sin proveedor';
        
        return `
            <tr>
                <td><strong>#${p.iD_Producto}</strong></td>
                <td>${p.nombre}</td>
                <td><span class="badge bg-info">${nombreCategoria}</span></td>
                <td><span class="badge bg-warning text-dark">${nombreProveedor}</span></td>
                <td>$${parseFloat(p.precio).toFixed(2)}</td>
                <td>${p.stock}</td>
                <td>${p.descripcion ? p.descripcion.substring(0, 30) + '...' : '<span class="text-muted">-</span>'}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="editarProducto(${p.iD_Producto})">
                        <i class="bi bi-pencil"></i> Editar
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="eliminarProducto(${p.iD_Producto})">
                        <i class="bi bi-trash"></i> Eliminar
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// ===== FUNCIONES DE BÚSQUEDA =====
function filtrarUsuarios() {
    const termino = buscarUsuario.value.toLowerCase();
    const filtrados = usuarios.filter(u => 
        u.nombre.toLowerCase().includes(termino) ||
        u.nombre_Usuario.toLowerCase().includes(termino)
    );
    mostrarUsuarios(filtrados);
}

function filtrarEmpleados() {
    const termino = buscarEmpleado.value.toLowerCase();
    const filtrados = empleados.filter(e => 
        e.nombre.toLowerCase().includes(termino) ||
        e.identificacion.toLowerCase().includes(termino)
    );
    mostrarEmpleados(filtrados);
}

function filtrarProductos() {
    const termino = buscarProducto.value.toLowerCase();
    const filtrados = productos.filter(p => 
        p.nombre.toLowerCase().includes(termino)
    );
    mostrarProductos(filtrados);
}

// ===== EDITAR USUARIO =====
function editarUsuario(id) {
    usuarioSeleccionado = usuarios.find(u => u.iD_Empleado === id);
    if (!usuarioSeleccionado) {
        mostrarAlerta('Usuario no encontrado', 'warning');
        return;
    }   
    
    document.getElementById('editUsuarioId').value = id;
    document.getElementById('editNombre').value = `${usuarioSeleccionado.nombre} ${usuarioSeleccionado.apellidos}`;
    document.getElementById('editRol').value = usuarioSeleccionado.rol;
    document.getElementById('editEstado').value = usuarioSeleccionado.estado ? '1' : '0';

    new bootstrap.Modal(modalEditarUsuario).show();
}

async function guardarCambioEstadoUsuario(id, estado) {
    try {
        const response = await fetch(`${apiUrlUsuario}/actualizar-estado/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Estado: estado })
        });
        const data = await response.json();
        if (data.success) {
            mostrarAlerta('✅ Estado actualizado correctamente', 'success');
            bootstrap.Modal.getInstance(modalEditarUsuario).hide();
            cargarUsuarios();
        } else {
            mostrarAlerta(data.message || 'Error al actualizar el estado', 'danger');
        }
    } catch (error) {
        mostrarAlerta('❌ Error: ' + error.message, 'danger');
    }
}

async function guardarCambioRolUsuario(id, nuevoRol) {
    if (!nuevoRol.trim()) {
        mostrarAlerta('El rol no puede estar vacío', 'warning');
        return;
    }

    try {
        const response = await fetch(`${apiUrlUsuario}/actualizarRol/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Rol: nuevoRol })
        });
        const data = await response.json();
        if (data.success) {
            mostrarAlerta('✅ Rol actualizado correctamente', 'success');
            bootstrap.Modal.getInstance(modalEditarUsuario).hide();
            cargarUsuarios();
        } else {
            mostrarAlerta(data.message || 'Error al actualizar el rol', 'danger');
        }
    } catch (error) {
        mostrarAlerta('❌ Error: ' + error.message, 'danger');
    }
}

async function guardarCambiosUsuario() {
    const id = document.getElementById('editUsuarioId').value;
    const estado = parseInt(document.getElementById('editEstado').value);
    const nuevoRol = document.getElementById('editRol').value;

    try {
        await guardarCambioEstadoUsuario(id, estado);
        await guardarCambioRolUsuario(id, nuevoRol);
    } catch (error) {
        console.error('❌ Error:', error);
        mostrarAlerta('❌ Error de conexión: ' + error.message, 'danger');
    }
}

async function eliminarUsuarioYEmpleado(id) {
    const usuario = usuarios.find(u => u.iD_Empleado === id);
    const empleado = empleados.find(e => e.iD_Empleado === id);
    
    if (!usuario || !empleado) return;

    if (!confirm(`¿Eliminar ${usuario.nombre_Usuario} y empleado ${empleado.nombre} ${empleado.apellidos} asociados? Esta acción es permanente.`)) return;

    try {
        const response = await fetch(`${apiUrlUsuario}/eliminar-ambos/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        if (data.success) {
            mostrarAlerta('✅ Usuario y empleado eliminados', 'success');
            cargarUsuarios(); 
            cargarEmpleados();
        } else {
            mostrarAlerta(data.message || 'Error al eliminar', 'danger');
        }
    } catch (error) {
        mostrarAlerta('❌ Error de conexión: ' + error.message, 'danger');
    }
}

// ===== EDITAR EMPLEADO =====
function editarEmpleado(id) {
    empleadoSeleccionado = empleados.find(e => e.iD_Empleado === id);
    if (!empleadoSeleccionado) {
        mostrarAlerta('Empleado no encontrado', 'warning');
        return;
    }
    
    document.getElementById('editEmpleadoId').value = id;
    document.getElementById('editEmpleadoNombre').value = empleadoSeleccionado.nombre;
    document.getElementById('editEmpleadoApellidos').value = empleadoSeleccionado.apellidos;
    document.getElementById('editEmpleadoIdentificacion').value = empleadoSeleccionado.identificacion;
    document.getElementById('editEmpleadoCargo').value = empleadoSeleccionado.cargo;
    document.getElementById('editEmpleadoCorreo').value = empleadoSeleccionado.correo || '';
    document.getElementById('editEmpleadoTelefono').value = empleadoSeleccionado.telefono || '';
    document.getElementById('editEmpleadoDireccion').value = empleadoSeleccionado.direccion || '';
    document.getElementById('editEmpleadoEstado').value = (empleadoSeleccionado.estado === 1 || empleadoSeleccionado.estado === true) ? '1' : '0';
    new bootstrap.Modal(modalEditarEmpleado).show();
}

async function guardarCambiosEmpleado() {
    const id = document.getElementById('editEmpleadoId').value;
    const nombre = document.getElementById('editEmpleadoNombre').value.trim();
    const apellidos = document.getElementById('editEmpleadoApellidos').value.trim();
    const identificacion = document.getElementById('editEmpleadoIdentificacion').value.trim();
    const cargo = document.getElementById('editEmpleadoCargo').value.trim();
    const telefono = document.getElementById('editEmpleadoTelefono').value.trim();
    const direccion = document.getElementById('editEmpleadoDireccion').value.trim();
    const correo = document.getElementById('editEmpleadoCorreo').value.trim();
    const estado = parseInt(document.getElementById('editEmpleadoEstado').value);
    
    if (!validarDatosEmpleado()) {
        return;
    }

    const empleadoData = {
        ID_Empleado: parseInt(id),
        Nombre: nombre,
        Apellidos: apellidos,
        Identificacion: identificacion,
        Cargo: cargo,
        Telefono: telefono,
        Direccion: direccion,
        Correo: correo
    };

    try {
        await actualizarEmpleado(id, empleadoData);
        await guardarCambioEstadoUsuario(id, estado);
    } catch (error) {
        console.error('Error:', error);
        mostrarAlerta('❌ Error de conexión', 'danger');
    }
}

async function actualizarEmpleado(id, empleadoData) {
    try {
        const response = await fetch(`${api_empleado}/actualizar/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(empleadoData)
        });
        
        const data = await response.json();
        if (data.success) {
            mostrarAlerta('✅ Empleado actualizado correctamente', 'success');
            bootstrap.Modal.getInstance(modalEditarEmpleado).hide();
            cargarEmpleados();
        } else {
            mostrarAlerta(data.mensaje || 'Error al actualizar', 'danger');
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarAlerta('❌ Error de conexión', 'danger');
    }
}

async function eliminarEmpleado(id) {
    const empleado = empleados.find(e => e.iD_Empleado === id);
    if (!empleado) return;
    
    if (!confirm(`¿Eliminar al empleado ${empleado.nombre} ${empleado.apellidos}?`)) return;
    
    try {
        const response = await fetch(`${api_empleado}/eliminar/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        
        const data = await response.json();
        if (data.success) {
            mostrarAlerta('✅ Empleado eliminado', 'success');
            cargarEmpleados();
        } else {
            mostrarAlerta(data.message || 'Error al eliminar', 'danger');
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarAlerta('❌ Error de conexión', 'danger');
    }
}

//=============Validacion datos empleados =================
const REGEX = {
    nombre: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/,
    identificacion: /^[0-9]{6,15}$/,
    direccion: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s#\-,]{5,100}$/,
    telefono: /^[0-9]{7,15}$/,
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};

function validarDatosEmpleado() {
    const nombre = document.getElementById('editEmpleadoNombre').value.trim();
    const apellidos = document.getElementById('editEmpleadoApellidos').value.trim();
    const identificacion = document.getElementById('editEmpleadoIdentificacion').value.trim();
    const cargo = document.getElementById('editEmpleadoCargo').value.trim();
    const telefono = document.getElementById('editEmpleadoTelefono').value.trim();
    const direccion = document.getElementById('editEmpleadoDireccion').value.trim();
    const correo = document.getElementById('editEmpleadoCorreo').value.trim();

    if (!nombre || !apellidos || !identificacion || !cargo) {
        mostrarAlerta('⚠️ Completa todos los campos requeridos', 'warning');
        return false;
    }

    if (!REGEX.nombre.test(nombre)) {
        mostrarAlerta('Nombre inválido. Solo letras y espacios (2-50 caracteres)', 'warning');
        return false;
    }

    if (!REGEX.nombre.test(apellidos)) {
        mostrarAlerta('Apellidos inválidos. Solo letras y espacios (2-50 caracteres)', 'warning');
        return false;
    }

    if (!REGEX.identificacion.test(identificacion)) {
        mostrarAlerta('Identificación inválida. Solo números (6-15 dígitos)', 'warning');
        return false;
    }

    if (direccion && !REGEX.direccion.test(direccion)) {
        mostrarAlerta('Dirección inválida. Solo letras, números y caracteres (#, -, ,)', 'warning');
        return false;
    }

    if (telefono && !REGEX.telefono.test(telefono)) {
        mostrarAlerta('Teléfono inválido. Solo números (7-15 dígitos)', 'warning');
        return false;
    }

    if (correo && !REGEX.email.test(correo)) {
        mostrarAlerta('Correo electrónico inválido', 'warning');
        return false;
    }

    return true;
}

// ===== EDITAR PRODUCTO =====
function editarProducto(id) {
    productoSeleccionado = productos.find(p => p.iD_Producto === id);
    if (!productoSeleccionado) {
        mostrarAlerta('Producto no encontrado', 'warning');
        return;
    }
    
    document.getElementById('editProductoId').value = id;
    document.getElementById('editProductoNombre').value = productoSeleccionado.nombre;
    document.getElementById('editProductoCategoria').value = productoSeleccionado.categoria || '';
    document.getElementById('editProductoPrecio').value = parseFloat(productoSeleccionado.precio).toFixed(2);
    document.getElementById('editProductoStock').value = productoSeleccionado.stock;
    document.getElementById('editProductoDescripcion').value = productoSeleccionado.descripcion || '';

    const selCat = document.getElementById('editProductoCategoria');
    const selProv = document.getElementById('editProductoProveedor');
    const idCatProd = productoSeleccionado.iD_Categoria ?? productoSeleccionado.ID_Categoria;
    const idProvProd = productoSeleccionado.iD_Proveedor ?? productoSeleccionado.ID_Proveedor;

    SelectCategorias(selCat, idCatProd);
    SelectProveedores(selProv, idProvProd);



    new bootstrap.Modal(modalEditarProducto).show();
}

async function guardarCambiosProducto() {
    const id = document.getElementById('editProductoId').value;
    const nombre = document.getElementById('editProductoNombre').value.trim();
     const idCategoria = parseInt(document.getElementById('editProductoCategoria').value);
    const idProveedor = parseInt(document.getElementById('editProductoProveedor').value);
    const categoria = document.getElementById('editProductoCategoria').value.trim();
    const precio = parseFloat(document.getElementById('editProductoPrecio').value);
    const stock = parseInt(document.getElementById('editProductoStock').value);
    const descripcion = document.getElementById('editProductoDescripcion').value.trim();

    
   if (!nombre || !idCategoria || !idProveedor || isNaN(precio) || precio <= 0 || isNaN(stock) || stock < 0) {
        mostrarAlerta('⚠️ Verifica los datos del producto', 'warning');
        return;
    }
    
     try {
        const response = await fetch(`${api_producto}/actualizar/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Nombre: nombre,
                ID_Categoria: idCategoria,
                ID_Proveedor: idProveedor,
                Precio: precio,
                Stock: stock,
                Descripcion: descripcion
            })
        });

        const data = await response.json();
        if (data.success) {
            mostrarAlerta('✅ Producto actualizado correctamente', 'success');
            bootstrap.Modal.getInstance(modalEditarProducto).hide();
            cargarProductos();
        } else {
            mostrarAlerta(data.mensaje || 'Error al actualizar', 'danger');
        }
    } catch (error) {
        console.error(error);
        mostrarAlerta('❌ Error de conexión', 'danger');
    }
}

async function eliminarProducto(id) {
    const producto = productos.find(p => p.iD_Producto === id);
    if (!producto) return;
    
    if (!confirm(`¿Eliminar el producto "${producto.nombre}"?`)) return;
    
    try {
        const response = await fetch(`${api_producto}/eliminar/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        
        const data = await response.json();
        if (data.success) {
            mostrarAlerta('✅ Producto eliminado', 'success');
            cargarProductos();
        } else {
            mostrarAlerta(data.message || 'Error al eliminar', 'danger');
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarAlerta('❌ Error de conexión', 'danger');
    }
}

function ModalAgregarProducto() {
    const selCat = document.getElementById('agregarProductoCategoria');
    const selProv = document.getElementById('agregarProductoProveedor');
    SelectCategorias(selCat);
    SelectProveedores(selProv);
    document.getElementById('agregarProductoNombre').value = '';
    document.getElementById('agregarProductoPrecio').value = '';
    document.getElementById('agregarProductoStock').value = '';
    document.getElementById('agregarProductoDescripcion').value = '';




    new bootstrap.Modal(modalAgregarProducto).show();
}

function SelectCategorias(selectElement, idSeleccionado = null) {
    selectElement.innerHTML = '<option value="">-- Selecciona una categoría --</option>';
    categorias.forEach(c => {
        const id = c.ID_Categoria ?? c.iD_Categoria;
        const nombre = c.Nombre ?? c.nombre;
        const option = document.createElement('option');
        option.value = id;
        option.textContent = nombre;
        if (idSeleccionado && idSeleccionado === id) option.selected = true;
        selectElement.appendChild(option);
    });
}
function SelectProveedores(selectElement, idSeleccionado = null) {
    selectElement.innerHTML = '<option value="">-- Selecciona un proveedor --</option>';
    proveedores.forEach(p => {
        const id = p.ID_Proveedor ?? p.iD_Proveedor;
        const nombre = p.Nombre ?? p.nombre;
        const option = document.createElement('option');
        option.value = id;
        option.textContent = nombre;
        if (idSeleccionado && idSeleccionado === id) option.selected = true;
        selectElement.appendChild(option);
    });
}
console.log('Cargando proveedores para selección...');
console.log(parseInt(document.getElementById('agregarProductoCategoria').value));

async function guardarNuevoProducto() {
    const nombre = document.getElementById('agregarProductoNombre').value.trim();
    const idCategoria = parseInt(document.getElementById('agregarProductoCategoria').value);
    const idProveedor = parseInt(document.getElementById('agregarProductoProveedor').value);
    const precio = parseFloat(document.getElementById('agregarProductoPrecio').value);
    const stock = parseInt(document.getElementById('agregarProductoStock').value);
    const descripcion = document.getElementById('agregarProductoDescripcion').value.trim();

    if (!nombre || !idCategoria || !idProveedor || isNaN(precio) || precio <= 0 || isNaN(stock) || stock < 0) {
        mostrarAlerta('⚠️ Completa todos los campos requeridos correctamente', 'warning');
        return;
    }

    try {
        const response = await fetch(`${api_producto}/registrar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Nombre: nombre,
                ID_Categoria: idCategoria,
                ID_Proveedor: idProveedor,
                Precio: precio,
                Stock: stock,
                Descripcion: descripcion
            })
        });

        const data = await response.json();
        if (data.success) {
            mostrarAlerta('✅ Producto creado correctamente', 'success');
            bootstrap.Modal.getInstance(modalAgregarProducto).hide();
            cargarProductos();
        } else {
            mostrarAlerta(data.mensaje || 'Error al crear producto', 'danger');
        }
    } catch (error) {
        console.error(error);
        mostrarAlerta('❌ Error de conexión', 'danger');
    }
}

// ================== PRODUCTOS POR REPONER ==================
async function cargarProductosPorReponer() {
    try {
        const resp = await fetch(`${api_producto}/por-reponer`);
        const data = await resp.json();

        if (!data.success) {
            mostrarAlerta(data.mensaje || 'Error al obtener productos por reponer', 'danger');
            return;
        }

        productosPorReponer = data.data || [];
        renderProductosPorReponer();
    } catch (error) {
        console.error(error);
        mostrarAlerta('❌ Error de conexión al listar productos por reponer', 'danger');
    }
}

function renderProductosPorReponer() {
    if (!tablaProductosPorReponer) return;

    tablaProductosPorReponer.innerHTML = '';

    if (!productosPorReponer.length) {
        tablaProductosPorReponer.innerHTML = `
            <tr>
                <td colspan="5" class="text-center py-4 text-muted">
                    No hay productos por reponer.
                </td>
            </tr>`;
        return;
    }

    productosPorReponer.forEach(p => {
        const id = p.iD_Producto ?? p.ID_Producto;
        const nombre = p.nombre ?? p.Nombre;
        const stock = p.stock ?? p.Stock;
        const stockMin = p.stockMinimo ?? p.StockMinimo;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${id}</td>
            <td>${nombre}</td>
            <td>${stock}</td>
            <td>${stockMin}</td>
            <td>
                <button class="btn btn-sm btn-warning  btn-reponer-producto"
                        onclick="reponerDesdeListado(${id})">
                    <i class="bi bi-arrow-up-square"></i> Reponer
                </button>
            </td>`;
        tablaProductosPorReponer.appendChild(tr);
    });
}

function reponerDesdeListado(idProducto) {
    const selProd = document.getElementById('agregarInventarioProducto');

   
    SelectProductos(selProd, idProducto); 

    document.getElementById('agregarInventarioCantidad').value = '';
    document.getElementById('agregarInventarioFechaIngreso').value =
        new Date().toISOString().split('T')[0];
    document.getElementById('agregarInventarioFechaCaducidad').value = '';

    new bootstrap.Modal(modalAgregarInventario).show();
}









//  ===== FUNCIONES PARA CATEGORÍAS =====

// Cargar categorías
async function cargarCategorias() {
    try {
        const response = await fetch(`${api_categoria}/listar`);
        const data = await response.json();
        if (data.success) {
            categorias = data.data || [];
            mostrarCategorias(categorias);
           
        }
    } catch (error) {
        console.error('❌ Error:', error);
        mostrarAlerta('Error al cargar categorías', 'danger');
    }
}

function mostrarCategorias(lista) {
    if (!lista || lista.length === 0) {
        tablaCategorias.innerHTML = `<tr><td colspan="4" class="text-center text-muted py-4">📁 No hay categorías registradas</td></tr>`;
        return;
    }
    
    tablaCategorias.innerHTML = lista.map(c => `
        <tr>
            <td><strong>#${c.iD_Categoria}</strong></td>
            <td>${c.nombre}</td>
            <td>${c.descripcion ? c.descripcion.substring(0, 50) + '...' : '<span class="text-muted">Sin descripción</span>'}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editarCategoria(${c.ID_Categoria})" title="Editar">
                    <i class="bi bi-pencil"></i> Editar
                </button>
                <button class="btn btn-sm btn-danger" onclick="eliminarCategoria(${c.iD_Categoria})" title="Eliminar">
                    <i class="bi bi-trash"></i> Eliminar
                </button>
            </td>
        </tr>
    `).join('');
}

// Filtrar categorías
function filtrarCategorias() {
    const termino = buscarCategoria.value.toLowerCase();
    const filtrados = categorias.filter(c => 
        c.nombre.toLowerCase().includes(termino) ||
        (c.descripcion && c.descripcion.toLowerCase().includes(termino))
    );
    mostrarCategorias(filtrados);
}

// Editar categoría
function editarCategoria(id) {
    categoriaSeleccionada = categorias.find(c => c.ID_Categoria === id);
    if (!categoriaSeleccionada) {
        mostrarAlerta('Categoría no encontrada', 'warning');
        return;
    }
    
    document.getElementById('editCategoriaId').value = id;
    document.getElementById('editCategoriaNombre').value = categoriaSeleccionada.nombre;
    document.getElementById('editCategoriaDescripcion').value = categoriaSeleccionada.descripcion || '';
    
    new bootstrap.Modal(modalEditarCategoria).show();
}


// Guardar cambios categoría
async function guardarCambiosCategoria() {
    const id=categoriaSeleccionada.iD_Categoria;
    const nombre = document.getElementById('editCategoriaNombre').value.trim();
    const descripcion = document.getElementById('editCategoriaDescripcion').value.trim();
            
    if (!nombre) {
        mostrarAlerta('⚠️ El nombre de la categoría es requerido', 'warning');
        return;
    }
    
    try {
        const response = await fetch(`${api_categoria}/actualizar`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ID_Categoria: parseInt(id),
                Nombre: nombre,
                Descripcion: descripcion
            })
        });
        
        const data = await response.json();
        if (data.success) {
            mostrarAlerta('✅ Categoría actualizada correctamente', 'success');
            bootstrap.Modal.getInstance(modalEditarCategoria).hide();
            cargarCategorias();
        } else {
            mostrarAlerta(data.mensaje || 'Error al actualizar', 'danger');
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarAlerta('❌ Error de conexión', 'danger');
    }
}


// Eliminar categoría
async function eliminarCategoria(id) {
    const categoria = categorias.find(c => c.iD_Categoria === id);
    if (!categoria) return;
    
    if (!confirm(`¿Eliminar la categoría "${categoria.nombre}"? Esta acción no se puede deshacer.`)) return;
    
    try {
        const response = await fetch(`${api_categoria}/eliminar/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        
        const data = await response.json();
        if (data.success) {
            mostrarAlerta('✅ Categoría eliminada correctamente', 'success');
            cargarCategorias();
        } else {
            mostrarAlerta(data.mensaje || 'Error al eliminar', 'danger');
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarAlerta('❌ Error de conexión', 'danger');
    }
}


// Abrir modal agregar categoría
function abrirModalAgregarCategoria() {
    document.getElementById('agregarCategoriaNombre').value = '';
    document.getElementById('agregarCategoriaDescripcion').value = '';
    new bootstrap.Modal(modalAgregarCategoria).show();
}

// Agregar categoría
async function agregarCategoria() {
    const nombre = document.getElementById('agregarCategoriaNombre').value.trim();
    const descripcion = document.getElementById('agregarCategoriaDescripcion').value.trim();
    
    if (!nombre) {
        mostrarAlerta('⚠️ El nombre es requerido', 'warning');
        return;
    }
    
    try {
        const response = await fetch(`${api_categoria}/registrar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Nombre: nombre,
                Descripcion: descripcion
            })
        });
        
        const data = await response.json();
        if (data.success) {
            mostrarAlerta('✅ Categoría creada correctamente', 'success');
            bootstrap.Modal.getInstance(modalAgregarCategoria).hide();
            cargarCategorias();
        } else {
            mostrarAlerta(data.mensaje || 'Error al crear', 'danger');
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarAlerta('❌ Error de conexión', 'danger');
    }
}
// ===== FUNCIONES PARA PROVEEDORES  =====

async function cargarProveedores() {
    try {
        const response = await fetch(`${api_proveedor}/listar`);
        const data = await response.json();
        if (data.success) {
            proveedores = data.data || [];
            mostrarProveedores(proveedores);
            totalProveedores.textContent = proveedores.length;
        }
    } catch (error) {
        console.error('❌ Error:', error);
        mostrarAlerta('Error al cargar proveedores', 'danger');
    }
}

// ===== MOSTRAR PROVEEDORES EN TABLA =====
function mostrarProveedores(lista) {
    if (!lista || lista.length === 0) {
        tablaProveedores.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-4">🏢 No hay proveedores registrados</td></tr>`;
        return;
    }
    
    tablaProveedores.innerHTML = lista.map(p => `
        <tr>
            <td><strong>#${p.iD_Proveedor}</strong></td>
            <td>${p.nombre}</td>
            <td>${p.telefono || '<span class="text-muted">-</span>'}</td>
            <td>${p.correo ? `<a href="mailto:${p.correo}">${p.correo}</a>` : '<span class="text-muted">-</span>'}</td>
            <td>${p.direccion ? p.direccion.substring(0, 40) + '...' : '<span class="text-muted">-</span>'}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editarProveedor(${p.ID_Proveedor})" title="Editar">
                    <i class="bi bi-pencil"></i> Editar
                </button>
                <button class="btn btn-sm btn-danger" onclick="eliminarProveedor(${p.iD_Proveedor})" title="Eliminar">
                    <i class="bi bi-trash"></i> Eliminar
                </button>
            </td>
        </tr>
    `).join('');
}


// ===== FILTRAR PROVEEDORES =====
function filtrarProveedores() {
    const termino = buscarProveedor.value.toLowerCase();
    const filtrados = proveedores.filter(p => 
        p.nombre.toLowerCase().includes(termino) ||
        (p.telefono && p.telefono.includes(termino)) ||
        (p.correo && p.correo.toLowerCase().includes(termino))
    );
    mostrarProveedores(filtrados);
}



// ===== EDITAR PROVEEDOR =====
function editarProveedor(id) {
    proveedorSeleccionado = proveedores.find(p => p.ID_Proveedor === id);
    if (!proveedorSeleccionado) {
        mostrarAlerta('Proveedor no encontrado', 'warning');
        return;
    }
    
    document.getElementById('editProveedorId').value = id;
    document.getElementById('editProveedorNombre').value = proveedorSeleccionado.nombre;
    document.getElementById('editProveedorTelefono').value = proveedorSeleccionado.telefono || '';
    document.getElementById('editProveedorCorreo').value = proveedorSeleccionado.correo || '';
    document.getElementById('editProveedorDireccion').value = proveedorSeleccionado.direccion || '';
    
    new bootstrap.Modal(modalEditarProveedor).show();
}



// ===== GUARDAR CAMBIOS PROVEEDOR =====
async function guardarCambiosProveedor() {
    const id = proveedorSeleccionado.iD_Proveedor;
    const nombre = document.getElementById('editProveedorNombre').value.trim();
    const telefono = document.getElementById('editProveedorTelefono').value.trim();
    const correo = document.getElementById('editProveedorCorreo').value.trim();
    const direccion = document.getElementById('editProveedorDireccion').value.trim();
    
    if (!nombre) {
        mostrarAlerta('⚠️ El nombre del proveedor es requerido', 'warning');
        return;
    }
    
    try {
        const response = await fetch(`${api_proveedor}/actualizar`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ID_Proveedor: parseInt(id),
                Nombre: nombre,
                Telefono: telefono,
                Correo: correo,
                Direccion: direccion
            })
        });
        
        const data = await response.json();
        if (data.success) {
            mostrarAlerta('✅ Proveedor actualizado correctamente', 'success');
            bootstrap.Modal.getInstance(modalEditarProveedor).hide();
            cargarProveedores();
        } else {
            mostrarAlerta(data.mensaje || 'Error al actualizar', 'danger');
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarAlerta('❌ Error de conexión', 'danger');
    }
}


// ===== ELIMINAR PROVEEDOR =====
async function eliminarProveedor(id) {
    const proveedor = proveedores.find(p => p.iD_Proveedor === id);
    if (!proveedor) return;
    
    if (!confirm(`¿Eliminar el proveedor "${proveedor.nombre}"? Esta acción no se puede deshacer.`)) return;
    
    try {
        const response = await fetch(`${api_proveedor}/eliminar/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        
        const data = await response.json();
        if (data.success) {
            mostrarAlerta('✅ Proveedor eliminado correctamente', 'success');
            cargarProveedores();
        } else {
            mostrarAlerta(data.mensaje || 'Error al eliminar', 'danger');
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarAlerta('❌ Error de conexión', 'danger');
    }
}
// ===== ABRIR MODAL AGREGAR PROVEEDOR =====
function abrirModalAgregarProveedor() {
    document.getElementById('agregarProveedorNombre').value = '';
    document.getElementById('agregarProveedorTelefono').value = '';
    document.getElementById('agregarProveedorCorreo').value = '';
    document.getElementById('agregarProveedorDireccion').value = '';
    new bootstrap.Modal(modalAgregarProveedor).show();
}

// ===== AGREGAR PROVEEDOR =====
async function agregarProveedor() {
    const nombre = document.getElementById('agregarProveedorNombre').value.trim();
    const telefono = document.getElementById('agregarProveedorTelefono').value.trim();
    const correo = document.getElementById('agregarProveedorCorreo').value.trim();
    const direccion = document.getElementById('agregarProveedorDireccion').value.trim();
    
    if (!nombre) {
        mostrarAlerta('⚠️ El nombre es requerido', 'warning');
        return;
    }
    
    try {
        const response = await fetch(`${api_proveedor}/registrar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Nombre: nombre,
                Telefono: telefono,
                Correo: correo,
                Direccion: direccion
            })
        });
        
        const data = await response.json();
        if (data.success) {
            mostrarAlerta('✅ Proveedor creado correctamente', 'success');
            bootstrap.Modal.getInstance(modalAgregarProveedor).hide();
            cargarProveedores();
        } else {
            mostrarAlerta(data.mensaje || 'Error al crear', 'danger');
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarAlerta('❌ Error de conexión', 'danger');
    }
}

// Funciones Inventario
// CARGAR INVENTARIO
async function cargarInventario() {
    try {
        const response = await fetch(`${api_Inventario}/listar`);
        const data = await response.json();
        if (data.success) {
            inventario = data.data;
            mostrarInventario(inventario);
            totalInventario.textContent = inventario.length;
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarAlerta('Error al cargar inventario', 'danger');
    }
}

// MOSTRAR INVENTARIO
function mostrarInventario(lista) {
    if (!lista || lista.length === 0) {
        tablaInventario.innerHTML = `
            <tr>
                <td colspan="6" class="text-center">No hay entradas de inventario</td>
            </tr>
        `;
        return;
    }
    
    tablaInventario.innerHTML = lista.map(i => `
        <tr>
            <td><strong>#${i.iD_Inventario}</strong></td>
            <td>${i.nombreProducto}</td>
            <td><span class="badge bg-success">${i.cantidad}</span></td>
            <td>${new Date(i.fecha_Ingreso).toLocaleDateString('es-ES')}</td>
            <td>${i.fecha_Caducidad ? new Date(i.fecha_Caducidad).toLocaleDateString('es-ES') : 'Sin caducidad'}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editarInventario(${i.ID_Inventario})">
                    <i class="bi bi-pencil"></i> Editar
                </button>
                <button class="btn btn-sm btn-danger" onclick="eliminarInventario(${i.iD_Inventario})">
                    <i class="bi bi-trash"></i> Eliminar
                </button>
            </td>
        </tr>
    `).join('');
}

// FILTRAR INVENTARIO
function filtrarInventario() {
    const termino = buscarInventario.value.toLowerCase();
    const filtrados = inventario.filter(i => 
        i.nombreProducto.toLowerCase().includes(termino)
    );
    mostrarInventario(filtrados);
}

// MODAL AGREGAR INVENTARIO
function ModalAgregarInventario() {
    const selProd = document.getElementById('agregarInventarioProducto');
    SelectProductos(selProd);
    
    document.getElementById('agregarInventarioCantidad').value = '';
    document.getElementById('agregarInventarioFechaIngreso').value = new Date().toISOString().split('T')[0];
    document.getElementById('agregarInventarioFechaCaducidad').value = '';
    
    new bootstrap.Modal(modalAgregarInventario).show();
}

// FUNCION PARA LLENAR PRODUCTOS (reutilizable)
function SelectProductos(selectElement, idSeleccionado = null) {
    selectElement.innerHTML = '<option value="">-- Selecciona un producto --</option>';
    productos.forEach(p => {
        const id = p.iD_Producto ?? p.ID_Producto;
        const nombre = p.nombre ?? p.Nombre;
        const option = document.createElement('option');
        option.value = id;
        option.textContent = nombre;
        if (idSeleccionado && idSeleccionado === id) option.selected = true;
        selectElement.appendChild(option);
    });
}

// GUARDAR NUEVO INVENTARIO
async function guardarNuevoInventario() {
    const idProducto = parseInt(document.getElementById('agregarInventarioProducto').value);
    const cantidad = parseInt(document.getElementById('agregarInventarioCantidad').value);
    const fechaIngreso = document.getElementById('agregarInventarioFechaIngreso').value;
    const fechaCaducidad = document.getElementById('agregarInventarioFechaCaducidad').value || null;

    if (!idProducto || !cantidad || !fechaIngreso || cantidad <= 0) {
        mostrarAlerta('Completa todos los campos requeridos correctamente', 'warning');
        return;
    }

    try {
        const response = await fetch(`${api_Inventario}/registrar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ID_Producto: idProducto,
                Cantidad: cantidad,
                Fecha_Ingreso: fechaIngreso,
                Fecha_Caducidad: fechaCaducidad
            })
        });

        const data = await response.json();
        if (data.success) {
            mostrarAlerta('✅ Entrada de inventario creada correctamente', 'success');
            bootstrap.Modal.getInstance(modalAgregarInventario).hide();
            cargarInventario();
            cargarProductos();
        } else {
            mostrarAlerta(data.mensaje || 'Error al crear entrada', 'danger');
        }   
    } catch (error) {
        console.error(error);
        mostrarAlerta('❌ Error de conexión', 'danger');
    }
}

// EDITAR INVENTARIO
function editarInventario(id) {
    inventarioSeleccionado = inventario.find(i => i.ID_Inventario === id);
    if (!inventarioSeleccionado) {
        mostrarAlerta('Entrada no encontrada', 'warning');
        return;
    }

    document.getElementById('editInventarioId').value = inventarioSeleccionado.iD_Inventario;
    document.getElementById('editInventarioCantidad').value = inventarioSeleccionado.cantidad;
    document.getElementById('editInventarioFechaIngreso').value = new Date(inventarioSeleccionado.fecha_Ingreso).toISOString().split('T')[0];
    document.getElementById('editInventarioFechaCaducidad').value = inventarioSeleccionado.fecha_Caducidad ? 
        new Date(inventarioSeleccionado.fecha_Caducidad).toISOString().split('T')[0] : '';

    const selProd = document.getElementById('editInventarioProducto');
    SelectProductos(selProd, inventarioSeleccionado.iD_Producto);

    new bootstrap.Modal(modalEditarInventario).show();
}


// GUARDAR CAMBIOS INVENTARIO
async function guardarCambiosInventario() {
    const id = parseInt(document.getElementById('editInventarioId').value);
    const idProducto = parseInt(document.getElementById('editInventarioProducto').value);
    const cantidad = parseInt(document.getElementById('editInventarioCantidad').value);
    const fechaIngreso = document.getElementById('editInventarioFechaIngreso').value;
    const fechaCaducidad = document.getElementById('editInventarioFechaCaducidad').value || null;

    if (!idProducto || !cantidad || !fechaIngreso || cantidad <= 0) {
        mostrarAlerta('Verifica los datos del inventario', 'warning');
        return;
    }

    try {
        const response = await fetch(`${api_Inventario}/actualizar/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ID_Inventario: id,
                ID_Producto: idProducto,
                Cantidad: cantidad,
                Fecha_Ingreso: fechaIngreso,
                Fecha_Caducidad: fechaCaducidad
            })
        });

        const data = await response.json();
        if (data.success) {
            mostrarAlerta('✅ Inventario actualizado correctamente', 'success');
            bootstrap.Modal.getInstance(modalEditarInventario).hide();
            cargarInventario();
        } else {
            mostrarAlerta(data.mensaje || 'Error al actualizar', 'danger');
        }
    } catch (error) {
        console.error(error);
        mostrarAlerta('❌ Error de conexión', 'danger');
    }
}

// ELIMINAR INVENTARIO
async function eliminarInventario(id) {
    const entrada = inventario.find(i => i.iD_Inventario === id);
    if (!entrada) return;

    if (!confirm(`¿Eliminar entrada de "${entrada.nombreProducto}"?`)) return;

        try {
            const response = await fetch(`${api_Inventario}/eliminar/${id}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            if (data.success) {
                mostrarAlerta('✅ Entrada eliminada correctamente', 'success');
                cargarInventario();
            } else {
                mostrarAlerta(data.mensaje || 'Error al eliminar', 'danger');
            }
        }
        catch (error) {
            console.error('Error:', error);
            mostrarAlerta('❌ Error de conexión', 'danger');
       }
    }

// FUNCIONES  METODO DE PAGO
// CARGAR MÉTODOS DE PAGO
async function cargarMetodosPago() {
    try {
        const response = await fetch(`${api_MetPago}/listar`);
        const data = await response.json();
        if (data.success) {
            metodos = data.data;
            mostrarMetodos(metodos);
        } else {
            mostrarAlerta(data.mensaje || 'Error al cargar métodos de pago', 'danger');
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarAlerta('Error de conexión al cargar métodos de pago', 'danger');
    }
}

// MOSTRAR MÉTODOS EN TABLA
function mostrarMetodos(lista) {
    if (!lista || lista.length === 0) {
        tablaMetodos.innerHTML = `
            <tr>
                <td colspan="7" class="text-center">No hay métodos de pago registrados</td>
            </tr>`;
        return;
    }

    tablaMetodos.innerHTML = lista.map(m => `
        <tr>
            <td><strong>${m.iD_Metodo}</strong></td>
            <td>${m.codigo}</td>
            <td>${m.descripcion}</td>
            <td>${m.tipo}</td>
            <td>${m.requiereReferencia ? 'Sí' : 'No'}</td>
            <td>
                <span class="badge ${m.estado ? 'bg-success' : 'bg-secondary'}">
                    ${m.estado ? 'Activo' : 'Inactivo'}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editarMetodo(${m.iD_Metodo})">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-warning" onclick="cambiarEstadoMetodo(${m.iD_Metodo})">
                    <i class="bi bi-toggle-on"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="eliminarMetodo(${m.iD_Metodo})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// FILTRAR MÉTODOS
function filtrarMetodos() {
    const termino = buscarMetodo.value.toLowerCase();
    const filtrados = metodos.filter(m =>
        m.codigo.toLowerCase().includes(termino) ||
        m.descripcion.toLowerCase().includes(termino) ||
        m.tipo.toLowerCase().includes(termino)
    );
    mostrarMetodos(filtrados);
}
// ABRIR MODAL AGREGAR MÉTODO
function abrirModalAgregarMetodo() {
    document.getElementById('agregarMetodoCodigo').value = '';
    document.getElementById('agregarMetodoDescripcion').value = '';
    document.getElementById('agregarMetodoTipo').value = '';
    document.getElementById('agregarMetodoRequiereRef').checked = false;

    new bootstrap.Modal(modalAgregarMetodo).show();
}
// GUARDAR NUEVO MÉTODO
async function guardarNuevoMetodo() {
    const codigo = document.getElementById('agregarMetodoCodigo').value.trim();
    const descripcion = document.getElementById('agregarMetodoDescripcion').value.trim();
    const tipo = document.getElementById('agregarMetodoTipo').value;
    const requiereRef = document.getElementById('agregarMetodoRequiereRef').checked;

    if (!codigo || !descripcion || !tipo) {
        mostrarAlerta('Completa código, descripción y tipo.', 'warning');
        return;
    }

    try {
        const response = await fetch(`${api_MetPago}/registrar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Codigo: codigo,
                Descripcion: descripcion,
                Tipo: tipo,
                RequiereReferencia: requiereRef,
                Estado: true
            })
        });
        const data = await response.json();
        if (data.success) {
            mostrarAlerta('Método de pago creado correctamente', 'success');
            bootstrap.Modal.getInstance(modalAgregarMetodo).hide();
            cargarMetodosPago();
        } else {
            mostrarAlerta(data.mensaje || 'Error al crear método de pago', 'danger');
        }
    } catch (error) {
        console.error(error);
        mostrarAlerta('Error de conexión', 'danger');
    }
}
// EDITAR MÉTODO
function editarMetodo(id) {
    metodoSeleccionado = metodos.find(m => m.iD_Metodo === id);
    if (!metodoSeleccionado) {
        mostrarAlerta('Método no encontrado', 'warning');
        return;
    }

    document.getElementById('editMetodoId').value = metodoSeleccionado.iD_Metodo;
    document.getElementById('editMetodoCodigo').value = metodoSeleccionado.codigo;
    document.getElementById('editMetodoDescripcion').value = metodoSeleccionado.descripcion;
    document.getElementById('editMetodoTipo').value = metodoSeleccionado.tipo;
    document.getElementById('editMetodoRequiereRef').checked = metodoSeleccionado.requiereReferencia;
    document.getElementById('editMetodoEstado').checked = metodoSeleccionado.estado;

    new bootstrap.Modal(modalEditarMetodo).show();
}

// GUARDAR CAMBIOS MÉTODO
async function guardarCambiosMetodo() {
    const id = parseInt(document.getElementById('editMetodoId').value);
    const codigo = document.getElementById('editMetodoCodigo').value.trim();
    const descripcion = document.getElementById('editMetodoDescripcion').value.trim();
    const tipo = document.getElementById('editMetodoTipo').value;
    const requiereRef = document.getElementById('editMetodoRequiereRef').checked;
    const estado = document.getElementById('editMetodoEstado').checked;

    if (!codigo || !descripcion || !tipo) {
        mostrarAlerta('Verifica los datos del método de pago.', 'warning');
        return;
    }





    try {
        const response = await fetch(`${api_MetPago}/actualizar/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ID_Metodo: id,
                Codigo: codigo,
                Descripcion: descripcion,
                Tipo: tipo,
                RequiereReferencia: requiereRef,
                Estado: estado
            })
        });
        const data = await response.json();
        if (data.success) {
            mostrarAlerta('Método de pago actualizado correctamente', 'success');
            bootstrap.Modal.getInstance(modalEditarMetodo).hide();
            cargarMetodosPago();
        } else {
            mostrarAlerta(data.mensaje || 'Error al actualizar', 'danger');
        }
    } catch (error) {
        console.error(error);
        mostrarAlerta('Error de conexión', 'danger');
    }
}

//CAMBIAR ESTADO MÉTODO
async function cambiarEstadoMetodo(id) {
    const metodo = metodos.find(m => m.iD_Metodo === id);
    if (!metodo) return ;

    const nuevoEstado = !metodo.estado;

    try {   
        const response = await fetch(`${api_MetPago}/cambiar-estado/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoEstado)
        });
        const data = await response.json();
        if (data.success) {
            mostrarAlerta('Estado actualizado correctamente', 'success');
            cargarMetodosPago();
        } else {
            mostrarAlerta(data.mensaje || 'Error al cambiar estado', 'danger');
        }
    } catch (error) {
        console.error(error);
        mostrarAlerta('Error de conexión', 'danger');
    }
}

async function eliminarMetodo(id) {
    if (!confirm('¿Eliminar este método de pago?')) return;

    try {
        const response = await fetch(`${api_MetPago}/eliminar/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        if (data.success) {
            mostrarAlerta('Método de pago eliminado correctamente', 'success');
            cargarMetodosPago();
        } else {
            mostrarAlerta(data.mensaje || 'No se pudo eliminar (puede estar usado en ventas)', 'warning');
        }
    } catch (error) {
        console.error(error);
        mostrarAlerta('Error de conexión', 'danger');
    }
}

//FUNCIONES CLIENTES
// CARGAR CLIENTES
async function cargarClientes() {
    try {
        const response = await fetch(`${apiUrlCliente}/listar`);
        const data = await response.json();
        if (data.success) {
            clientes = data.data;
            mostrarClientes(clientes);
            totalClientes.textContent = clientes.length;
        } else {
            mostrarAlerta(data.mensaje || 'Error al cargar clientes', 'danger');
        }
    } catch (error) {
        console.error(error);
        mostrarAlerta('Error de conexión al cargar clientes', 'danger');
    }
}

// MOSTRAR EN TABLA
function mostrarClientes(lista) {
    if (!lista || lista.length === 0) {
        tablaClientes.innerHTML = `
            <tr>
                <td colspan="7" class="text-center py-4 text-muted">
                    No hay clientes registrados
                </td>
            </tr>`;
        return;
    }

    tablaClientes.innerHTML = lista.map(c => `
        <tr>
            <td><strong>${c.iD_Cliente}</strong></td>
            <td>${c.nombre} ${c.apellidos}</td>
            <td>${c.telefono || '<span class="text-muted">-</span>'}</td>
            <td>${c.correo || '<span class="text-muted">-</span>'}</td>
            <td>${c.direccion ? c.direccion.substring(0, 40) + (c.direccion.length > 40 ? '...' : '') : '<span class="text-muted">-</span>'}</td>
            <td>
                <span class="badge ${c.estado ? 'bg-success' : 'bg-secondary'}">
                    ${c.estado ? 'Activo' : 'Inactivo'}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editarCliente(${c.iD_Cliente})">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-warning" onclick="cambiarEstadoCliente(${c.iD_Cliente})">
                    <i class="bi bi-toggle-on"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="eliminarCliente(${c.iD_Cliente})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// FILTRAR
function filtrarClientes() {
    const termino = buscarCliente.value.toLowerCase();
    const filtrados = clientes.filter(c =>
        (c.Nombre + ' ' + c.Apellidos).toLowerCase().includes(termino) ||
        (c.Telefono || '').toLowerCase().includes(termino) ||
        (c.Correo || '').toLowerCase().includes(termino)
    );
    mostrarClientes(filtrados);
}

function abrirModalAgregarCliente() {
    document.getElementById('agregarClienteNombre').value = '';
    document.getElementById('agregarClienteApellidos').value = '';
    document.getElementById('agregarClienteTelefono').value = '';
    document.getElementById('agregarClienteCorreo').value = '';
    document.getElementById('agregarClienteDireccion').value = '';

    new bootstrap.Modal(modalAgregarCliente).show();
}

async function guardarNuevoCliente() {
    const nombre = document.getElementById('agregarClienteNombre').value.trim();
    const apellidos = document.getElementById('agregarClienteApellidos').value.trim();
    const telefono = document.getElementById('agregarClienteTelefono').value.trim();
    const correo = document.getElementById('agregarClienteCorreo').value.trim();
    const direccion = document.getElementById('agregarClienteDireccion').value.trim();

    if (!nombre || !apellidos) {
        mostrarAlerta('Nombre y apellidos son obligatorios.', 'warning');
        return;
    }

    try {
        const response = await fetch(`${apiUrlCliente}/registrar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Nombre: nombre,
                Apellidos: apellidos,
                Telefono: telefono,
                Correo: correo,
                Direccion: direccion
            })
        });
        const data = await response.json();
        if (data.success) {
            mostrarAlerta('Cliente creado correctamente', 'success');
            bootstrap.Modal.getInstance(modalAgregarCliente).hide();
            await cargarClientes();
        } else {
            mostrarAlerta(data.mensaje || 'Error al crear cliente', 'danger');
        }
    } catch (error) {
        console.error(error);
        mostrarAlerta('Error de conexión', 'danger');
    }
}

function editarCliente(id) {
    clienteSeleccionado = clientes.find(c => c.iD_Cliente === id);
    if (!clienteSeleccionado) {
        mostrarAlerta('Cliente no encontrado', 'warning');
        return;
    }

    document.getElementById('editClienteId').value = clienteSeleccionado.iD_Cliente;
    document.getElementById('editClienteNombre').value = clienteSeleccionado.nombre;
    document.getElementById('editClienteApellidos').value = clienteSeleccionado.apellidos;
    document.getElementById('editClienteTelefono').value = clienteSeleccionado.telefono || '';
    document.getElementById('editClienteCorreo').value = clienteSeleccionado.correo || '';
    document.getElementById('editClienteDireccion').value = clienteSeleccionado.direccion || '';
    document.getElementById('editClienteEstado').checked = clienteSeleccionado.estado;

    new bootstrap.Modal(modalEditarCliente).show();
}

async function guardarCambiosCliente() {
    const id = parseInt(document.getElementById('editClienteId').value);
    const nombre = document.getElementById('editClienteNombre').value.trim();
    const apellidos = document.getElementById('editClienteApellidos').value.trim();
    const telefono = document.getElementById('editClienteTelefono').value.trim();
    const correo = document.getElementById('editClienteCorreo').value.trim();
    const direccion = document.getElementById('editClienteDireccion').value.trim();
    const estado = document.getElementById('editClienteEstado').checked;

    if (!nombre || !apellidos) {
        mostrarAlerta('Nombre y apellidos son obligatorios.', 'warning');
        return;
    }

    try {
        const response = await fetch(`${apiUrlCliente}/actualizar/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ID_Cliente: id,
                Nombre: nombre,
                Apellidos: apellidos,
                Telefono: telefono,
                Correo: correo,
                Direccion: direccion,
                Estado: estado
            })
        });
        const data = await response.json();
        if (data.success) {
            mostrarAlerta('Cliente actualizado correctamente', 'success');
            bootstrap.Modal.getInstance(modalEditarCliente).hide();
            await cargarClientes();
        } else {
            mostrarAlerta(data.mensaje || 'Error al actualizar cliente', 'danger');
        }
    } catch (error) {
        console.error(error);
        mostrarAlerta('Error de conexión', 'danger');
    }
}



async function cambiarEstadoCliente(id) {
    const cli = clientes.find(c => c.iD_Cliente === id);
    if (!cli) return;

    const nuevoEstado = !cli.estado;

    try {
        const response = await fetch(`${apiUrlCliente}/cambiar-estado/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoEstado)
        });
        const data = await response.json();
        if (data.success) {
            mostrarAlerta('Estado actualizado correctamente', 'success');
            await cargarClientes();
        } else {
            mostrarAlerta(data.mensaje || 'Error al cambiar estado', 'danger');
        }
    } catch (error) {
        console.error(error);
        mostrarAlerta('Error de conexión', 'danger');
    }
}

async function eliminarCliente(id) {
    if (!confirm('¿Eliminar este cliente? Esta acción no se puede deshacer.')) return;

    try {
        const response = await fetch(`${apiUrlCliente}/eliminar/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        if (data.success) {
            mostrarAlerta('Cliente eliminado correctamente', 'success');
            await cargarClientes();
        } else {
            mostrarAlerta(data.mensaje || 'Error al eliminar cliente', 'danger');
        }
    } catch (error) {
        console.error(error);
        mostrarAlerta('Error de conexión', 'danger');
    }
}


async function cargarReporteVentas() {
   const inicio = filtroFechaInicio.value; // YYYY-MM-DD
    const fin = filtroFechaFin.value;       // YYYY-MM-DD

    try {
      
        const resp = await fetch(`${apiUrlVenta}/listar`);
        const data = await resp.json();

        if (data.success) {
            let ventas = data.data || [];
            if(inicio && fin){
            // Filtro manual en JS si usas Opción B
            ventas = ventas.filter(v => {
                const fechaVenta = v.fecha.split('T')[0]; // Asumiendo formato ISO
                return fechaVenta >= inicio && fechaVenta <= fin;

            }); 
            }
            mostrarTablaVentas(ventas);
        } else {
            mostrarAlerta('No se pudieron cargar las ventas', 'danger');
        }
    } catch (error) {
        console.error(error);
        mostrarAlerta('Error de conexión', 'danger');
    }
}

function mostrarTablaVentas(lista) {
    if (!lista.length) {
        tablaReporteVentas.innerHTML = '<tr><td colspan="6" class="text-center">No hay ventas en este rango.</td></tr>';
        return;
    }

    tablaReporteVentas.innerHTML = lista.map(v => `
        <tr>
            <td><strong>#${v.iD_Venta}</strong></td>
            <td>${new Date(v.fecha).toLocaleString('es-CO', { hour12: true })}</td>
            <td>${v.empleado}</td>
            <td>${v.cliente}</td>
            <td class="text-end fw-bold">$${v.total.toFixed(2)}</td>
            <td class="text-center">
                <button class="btn btn-sm btn-info text-white" onclick="verDetalleVenta(${v.iD_Venta})">
                    <i class="bi bi-eye"></i> Ver
                </button>
                <button class="btn btn-sm btn-primary" onclick="generarPDF(${v.iD_Venta})" title="Reimprimir Ticket">
                    <i class="bi bi-printer"></i>
                </button>
                
            </td>
        </tr>
    `).join('');
}

async function verDetalleVenta(idVenta) {
    try {
        const response = await fetch(`${apiUrlDetalleVenta}/listar?idVenta=${idVenta}`);
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
            const detalles = data;
            const tabla = document.getElementById('tablaDetalleModal');
            document.getElementById('lblIdVenta').textContent = idVenta;

            tabla.innerHTML = detalles.map(d => `
                <tr>
                    <td>${ d.producto}</td>
                    <td class="text-center">${d.cantidad}</td>
                    <td class="text-end">$${(d.precio_Unitario).toFixed(2)}</td>
                    <td class="text-end">$${(d.subtotal).toFixed(2)}</td>
                </tr>
            `).join('');

            const total = detalles.reduce((acc, d) => acc + ( d.subtotal), 0);
            document.getElementById('lblTotalVenta').textContent = total.toFixed(2);

           
            // 1. Obtener el elemento HTML
            const modalElement = document.getElementById('modalDetalleVenta');
            
            // 2. Crear la instancia de Bootstrap
            const modalInstance = new bootstrap.Modal(modalElement);
            
            // 3. Mostrar el modal
            modalInstance.show();
        } else {
            alert('No se encontraron detalles para esta venta');
        }
       
    } catch (error) {
        console.error(error);
        alert('Error al cargar detalles');
    }
}

async function generarPDF(idVenta) {
    try {
        // Llamar al backend para obtener los datos de la venta
        const resp = await fetch(`${apiUrlVenta}/obtener/${idVenta}`);
        const respDetalle = await fetch(`${apiUrlDetalleVenta}/listar?idVenta=${idVenta}`);
        
        const dataVenta = await resp.json();
        const dataDetalle = await respDetalle.json();
        
        if (!dataVenta.success) {
            alert('No se pudo obtener los datos de la venta');
            return;
        }

        const venta = dataVenta.data;
        const detalles = Array.isArray(dataDetalle) ? dataDetalle : (dataDetalle.data || []);
       
        // ✅ Sin parámetros de montoRecibido ni cambio
        generarTicketPDF(venta, detalles);

    } catch (err) {
        console.error("Error generando PDF:", err);
        alert('Error al generar el PDF');
    }
}

function generarTicketPDF(venta, detalles) {
   const { jsPDF } = window.jspdf;

    // Crear PDF tamaño ticket (80mm x variable)
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [80, 200]
    });

    let yPosition = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 5;
    
    // --- VARIABLES DE ALINEACIÓN ---
    const xValue = pageWidth - margin; 
    const xLabel = pageWidth - margin - 35; 

    // LOGO / NOMBRE EMPRESA
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('SoluSoft', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 8;

    doc.setFontSize(8);
    doc.setFont(undefined, 'normal');
    doc.text('Sistema de Ventas', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 5;
    
    // Línea separadora
    doc.setDrawColor(0);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 5;

    // INFORMACIÓN DE VENTA
    doc.setFontSize(8);
    doc.text(`Factura Nº: ${venta.iD_Venta || venta.ID_Venta}`, margin, yPosition);
    yPosition += 4;
    doc.text(`Fecha: ${venta.fecha || venta.Fecha}`, margin, yPosition);
    yPosition += 4;
    doc.text(`Cliente: ${venta.cliente || venta.Cliente}`, margin, yPosition);
    yPosition += 4;
    doc.text(`Vendedor: ${venta.empleado || venta.Empleado}`, margin, yPosition);
    yPosition += 4;
    doc.text(`Pago: ${venta.metodoPago || venta.MetodoPago}`, margin, yPosition);
    yPosition += 6;

    // Línea separadora
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 5;

    // ENCABEZADO DE TABLA
    doc.setFont(undefined, 'bold');
    doc.text('PRODUCTO', margin, yPosition);
    doc.text('CANT', margin + 40, yPosition);
    doc.text('PRECIO', margin + 50, yPosition);
    yPosition += 4;

    doc.setFont(undefined, 'normal');
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 4;

    // DETALLES
    detalles.forEach(d => {
        const nombreProducto = d.producto || d.Producto || 'Producto';
        const cantidad = d.cantidad || d.Cantidad || 0;
        const precio = d.precio_Unitario || d.Precio_Unitario || 0;

        const maxChars = 25;
        
        if (nombreProducto.length > maxChars) {
            doc.text(nombreProducto.substring(0, maxChars), margin, yPosition);
            yPosition += 3;
            doc.text(nombreProducto.substring(maxChars), margin, yPosition);
        } else {
            doc.text(nombreProducto, margin, yPosition);
        }

        doc.text(cantidad.toString(), margin + 40, yPosition);
        doc.text(`$${parseFloat(precio).toFixed(2)}`, margin + 50, yPosition);
        yPosition += 4;
    });

    // Línea separadora final
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 5;

    // ==========================================
    // SOLO MOSTRAR TOTAL (Sin Efectivo ni Cambio)
    // ==========================================
    
    doc.setFont(undefined, 'bold');
    doc.setFontSize(10);
    const totalVal = venta.total || venta.Total || 0;
    
    doc.text('TOTAL:', xLabel, yPosition);
    doc.text(`$${parseFloat(totalVal).toFixed(2)}`, xValue, yPosition, { align: 'right' });
    yPosition += 6;

    // PIE DE PÁGINA
    doc.setFontSize(7);
    doc.setFont(undefined, 'normal');
    doc.text('Gracias por su compra', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 3;
    doc.text(new Date().toLocaleString(), pageWidth / 2, yPosition, { align: 'center' });

    const nombreArchivo = `Factura_${venta.iD_Venta || venta.ID_Venta}.pdf`;
    doc.save(nombreArchivo);
}










// ===== MOSTRAR ALERTA =====
function mostrarAlerta(mensaje, tipo) {
    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo} alert-dismissible fade show`;
    alerta.setAttribute('role', 'alert');
    alerta.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    document.body.insertBefore(alerta, document.body.firstChild);
    setTimeout(() => alerta.remove(), 4000);
}

// ===== EVENT LISTENERS =====

// ===== INICIALIZAR (CRITICAL) =====
document.addEventListener('DOMContentLoaded', function() {
    const adminInfo = JSON.parse(localStorage.getItem('usuarioLogueado'));
    if (adminInfo) adminName.textContent = adminInfo.Nombre || 'Administrador';
    
    // ✅ Agregar event listeners AQUÍ después de que el DOM está listo
   const btnGuardarUsuario = document.getElementById('btnGuardarUsuario');
   const btnGuardarEmpleado = document.querySelector('.btn-guardar-empleado');
   const btnGuardarProducto = document.querySelector('.btn-guardar-producto');
   const btnGuardarCategoria = document.querySelector('.btn-guardar-categoria');  
   const btnGuardarProveedor = document.querySelector('.btn-guardar-proveedor');
   const btnGuardarNuevoProducto = document.querySelector('.btn-guardar-nuevo-producto');
   const btnGuardarNuevoInv = document.querySelector('.btn-guardar-nuevo-inventario');
   const btnGuardarInv = document.querySelector('.btn-guardar-inventario');
   const btnGuardarMetodoNuevo = document.querySelector('.btn-guardar-metodo');
   const btnGuardarMetodoEdit = document.querySelector('.btn-guardar-metodo-edit');
   const btnGuardarClienteNuevo = document.querySelector('.btn-guardar-cliente-nuevo');
   const btnGuardarClienteEdit = document.querySelector('.btn-guardar-cliente-edit');
   const btnCargarProductosReponer = document.getElementById('btn-cargarProductosReponer');
   const btnreponerProducto = document.getElementById('btn-reponer-producto');
   const btnresetearContraseña = document.getElementById('btnResetearContraseña'); 
   const hoy = new Date().toISOString().split('T')[0];
const btnGenerarPDF = document.querySelector('.btn-generar-pdf');


   const btnCerrarSesion = document.getElementById('btnCerrarSesion');


    
    buscarUsuario.addEventListener('input', filtrarUsuarios);
    buscarEmpleado.addEventListener('input', filtrarEmpleados);
    buscarProducto.addEventListener('input', filtrarProductos);
    buscarCategoria.addEventListener('input', filtrarCategorias);  
    buscarProveedor.addEventListener('input', filtrarProveedores);
    buscarInventario.addEventListener('input', filtrarInventario);
    buscarMetodo.addEventListener('input', filtrarMetodos);
    buscarCliente.addEventListener('input', filtrarClientes);



  if (btnGuardarUsuario) btnGuardarUsuario.addEventListener('click', guardarCambiosUsuario);
  if (btnGuardarEmpleado) btnGuardarEmpleado.addEventListener('click', guardarCambiosEmpleado);
  if (btnGuardarProducto) btnGuardarProducto.addEventListener('click', guardarCambiosProducto);
  if (btnGuardarCategoria) btnGuardarCategoria.addEventListener('click', guardarCambiosCategoria);
  if (btnGuardarProveedor) btnGuardarProveedor.addEventListener('click', guardarCambiosProveedor);
  if (btnGuardarNuevoProducto) btnGuardarNuevoProducto.addEventListener('click', guardarNuevoProducto);
  if (btnGuardarNuevoInv) btnGuardarNuevoInv.addEventListener('click', guardarNuevoInventario);
  if (btnGuardarInv) btnGuardarInv.addEventListener('click', guardarCambiosInventario);
  if (btnGuardarMetodoNuevo) btnGuardarMetodoNuevo.addEventListener('click', guardarNuevoMetodo);
  if (btnGuardarMetodoEdit) btnGuardarMetodoEdit.addEventListener('click', guardarCambiosMetodo);
  if (btnGuardarClienteNuevo) btnGuardarClienteNuevo.addEventListener('click', guardarNuevoCliente);
  if (btnGuardarClienteEdit) btnGuardarClienteEdit.addEventListener('click', guardarCambiosCliente);
  if (btnCargarProductosReponer) btnCargarProductosReponer.addEventListener('click', cargarProductosPorReponer);
  if (btnreponerProducto) btnreponerProducto.addEventListener('click', reponerDesdeListado);
  if(btnresetearContraseña) btnresetearContraseña.addEventListener('click', resetearClaveUsuario);
  if(filtroFechaInicio) filtroFechaInicio.value = hoy;
  if(filtroFechaFin) filtroFechaFin.value = hoy;
   
    if (btnGenerarPDF) btnGenerarPDF.addEventListener('click', generarPDF);
    btnCerrarSesion.addEventListener('click', function() {
        if (confirm('¿Cerrar sesión?')) {
            localStorage.clear();
            window.location.href = '/html/Login/index.html';
        }
    });
    


   
    cargarUsuarios();
    cargarEmpleados();
    cargarProductos();
    cargarCategorias();  
    cargarProveedores();  
    cargarInventario();
    cargarMetodosPago();
    cargarClientes();
    cargarProductosPorReponer();

});

// ===== EXPORTAR FUNCIONES GLOBALES =====
window.editarUsuario = editarUsuario;
window.eliminarUsuarioYEmpleado = eliminarUsuarioYEmpleado;
window.editarEmpleado = editarEmpleado;
window.eliminarEmpleado = eliminarEmpleado;
window.editarProducto = editarProducto;
window.ModalAgregarProducto = ModalAgregarProducto;
window.eliminarProducto = eliminarProducto;
window.editarCategoria = editarCategoria;
window.eliminarCategoria = eliminarCategoria;
window.guardarCambiosCategoria = guardarCambiosCategoria;
window.agregarCategoria = agregarCategoria;
window.abrirModalAgregarCategoria = abrirModalAgregarCategoria;
window.filtrarCategorias = filtrarCategorias;
window.editarProveedor = editarProveedor;
window.eliminarProveedor = eliminarProveedor;
window.guardarCambiosProveedor = guardarCambiosProveedor;
window.agregarProveedor = agregarProveedor;
window.abrirModalAgregarProveedor = abrirModalAgregarProveedor;
window.filtrarProveedores = filtrarProveedores;
window.guardarNuevoProducto = guardarNuevoProducto;
window.ModalAgregarInventario = ModalAgregarInventario;
window.editarInventario = editarInventario;
window.eliminarInventario = eliminarInventario;
window.guardarNuevoInventario = guardarNuevoInventario;
window.guardarCambiosInventario = guardarCambiosInventario;
window.abrirModalAgregarMetodo = abrirModalAgregarMetodo;
window.editarMetodo = editarMetodo;
window.cambiarEstadoMetodo = cambiarEstadoMetodo;
window.eliminarMetodo = eliminarMetodo;
window.abrirModalAgregarCliente = abrirModalAgregarCliente;
window.editarCliente = editarCliente;
window.cambiarEstadoCliente = cambiarEstadoCliente;
window.eliminarCliente = eliminarCliente;
window.cargarProductosPorReponer = cargarProductosPorReponer;
window.reponerDesdeListado = reponerDesdeListado;
window.resetearClaveUsuario = resetearClaveUsuario;
window.cargarReporteVentas= cargarReporteVentas;
window.verDetalleVenta= verDetalleVenta;
window.generarPDF = generarPDF;