// =========================================================================
// 1. IMPORTACIONES
// =========================================================================
import { 
    apiUrlVenta, 
    apiUrlCliente, 
    apiUrlMetodoPago, 
    apiUrlProducto, 
    apiUrlUsuario, 
    apiUrlDetalleVenta
} from "../api/apiUrlSolusoft.js";

// =========================================================================
// 2. VARIABLES GLOBALES
// =========================================================================
let detalleVenta = [];
let listaProductosCache = []; // Cache para búsquedas rápidas sin llamar a la API cada vez
let metodoPagoSeleccionado = null;

// =========================================================================
// 3. INICIALIZACIÓN (DOMContentLoaded)
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // 3.1 Cargar datos de sesión
    const nombreUsuario = sessionStorage.getItem('nombreUsuario');
    const nombre = sessionStorage.getItem('nombre');
    const apellido = sessionStorage.getItem('apellido');
    
    if (nombreUsuario) {
        const input = document.getElementById('usuarioActual');
        if (input) input.value = nombreUsuario;
    }
    
    if (nombre && apellido) {
        const nombreEmpleado = document.getElementById('empleadoNombre');
        if (nombreEmpleado) nombreEmpleado.value = `${nombre} ${apellido}`;
    }

    // 3.2 Establecer fecha actual (Zona horaria Bogotá)
    const fechaVenta = document.getElementById('fechaVenta');
    if (fechaVenta) {
        const hoy = new Date().toLocaleString("sv-SE", { timeZone: "America/Bogota" }).slice(0, 10);
        fechaVenta.value = hoy;
    }

    // 3.3 Cargar listas desde API
    cargarClientes();
    cargarMetodosPago();
    cargarProductos();

    // 3.4 Listeners de botones
    const btnAgregar = document.getElementById('addLineBtn');
    if (btnAgregar) btnAgregar.addEventListener('click', agregarLinea);

    const btnConfirmar = document.getElementById('confirmBtn');
    if (btnConfirmar) btnConfirmar.addEventListener('click', confirmarVenta);

    const btnCancelar = document.getElementById('cancelBtn');
    if (btnCancelar) btnCancelar.addEventListener('click', cancelarVenta);

    const btnGuardarCambios = document.getElementById('guardarCambiosCajero');
    if (btnGuardarCambios) btnGuardarCambios.addEventListener('click', cambiarClaveCajero);

    const btnGenerarPDF = document.querySelector('.btn-generar-pdf');
    if (btnGenerarPDF) btnGenerarPDF.addEventListener('click', generarPDF);

    const btnCerrarSesion = document.getElementById('btnCerrarSesion');
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener('click', function() {
            if (confirm('¿Cerrar sesión?')) {
                sessionStorage.clear(); // Mejor usar sessionStorage si es donde guardas la sesión
                localStorage.clear();
                window.location.href = '/index.html';
            }
        });
    }

     const inputRecibido = document.getElementById('montoRecibido');
    if (inputRecibido) {
        inputRecibido.addEventListener('input', calcularCambio);
    }

    // Listener para detectar si es Efectivo (opcional, para auto-llenar)
    const selectMetodo = document.getElementById('metodoPagoSelect');
    if (selectMetodo) {
        selectMetodo.addEventListener('change', manejarMetodoPago);
    }

    // Listener para buscar producto al escribir
    const inputProd = document.getElementById('productoInput');
    if (inputProd) inputProd.addEventListener('input', detectarProductoSeleccionado);

        // Botón [+] Agregar Cliente
     const btnAddClient = document.getElementById('addClientBtn');
    if (btnAddClient) {
        btnAddClient.addEventListener('click', () => {
            // Limpiar formulario
            document.getElementById('formAgregarCliente').reset();
            document.getElementById('msgAgregarCliente').innerHTML = '';
            // Abrir modal
            const modal = new bootstrap.Modal(document.getElementById('modalAgregarCliente'));
            modal.show();
        });
    }

    // Botón Guardar Nuevo Cliente (en el modal)
    const btnGuardarNuevo = document.getElementById('btnGuardarNuevoCliente');
    if (btnGuardarNuevo) {
        btnGuardarNuevo.addEventListener('click', guardarNuevoCliente);
    }

    // Listener para habilitar/deshabilitar botón de edición
    const selectCliente = document.getElementById('clienteSelect');
    const btnEditClient = document.getElementById('editClientBtn');
    if (selectCliente && btnEditClient) {
        selectCliente.addEventListener('change', () => {
            btnEditClient.disabled = !selectCliente.value;
        });

        // Botón [✏️] Editar Cliente
        btnEditClient.addEventListener('click', abrirModalEditarCliente);
    }

    // Botón Guardar Edición Cliente (en el modal)
    const btnGuardarEdit = document.getElementById('btnGuardarEditCliente');
    if (btnGuardarEdit) {
        btnGuardarEdit.addEventListener('click', guardarEdicionCliente);
    }




});

// =========================================================================
// 4. FUNCIONES DE CARGA (API GET)
// =========================================================================

async function cargarClientes() {
    try {
        const select = document.getElementById('clienteSelect');
        select.innerHTML = '<option value="" disabled selected>Seleccionar cliente</option>';

        const resp = await fetch(`${apiUrlCliente}/listar`);
        const data = await resp.json();

        // Verificar estructura de respuesta (si es {success:true, data:[]} o directo [])
        const lista = data.data || data;

        if (Array.isArray(lista)) {
            lista.forEach(c => {
                if(c.estado) { // Solo activos si aplica
                    const opt = document.createElement('option');
                    // IMPORTANTE: Ajuste a nombres de C# (ID_Cliente)
                    opt.value = c.iD_Cliente; 
                    opt.textContent = `${c.nombre} ${c.apellidos}`;
                    select.appendChild(opt);
                }
            });
        }
    } catch (err) {
        console.error("Error cargando clientes:", err);
    }
}

async function cargarMetodosPago() {
    try {
          const select = document.getElementById('metodoPagoSelect');
        select.innerHTML = '<option value="" disabled selected>Seleccionar método de pago</option>';

        const resp = await fetch(`${apiUrlMetodoPago}/listar`);
        const data = await resp.json();
        const lista = data.data || data;

        if (Array.isArray(lista)) {
            // FILTRAR SOLO LOS MÉTODOS ACTIVOS
            const metodosActivos = lista.filter(m => m.estado === true || m.estado === 1);

            metodosActivos.forEach(m => {
                const opt = document.createElement('option');
                opt.value = m.iD_Metodo;                    // ID del método
                opt.textContent = m.nombre || m.descripcion; // Texto que ves en el select
                select.appendChild(opt);
            });
        }


    } catch (err) {
        console.error("Error cargando métodos:", err);
    }
}

async function cargarProductos() {
    try {
        const datalist = document.getElementById('productosList');
        datalist.innerHTML = '';
        listaProductosCache = []; // Limpiar caché local

        const resp = await fetch(`${apiUrlProducto}/listar`);
        const data = await resp.json();
        const lista = data.data || data;

        if (Array.isArray(lista)) {
            // Guardamos solo productos con stock y activos en cache
            listaProductosCache = lista.filter(p => p.stock > 0 );

            listaProductosCache.forEach(p => {
                const opt = document.createElement('option');
                opt.value = p.nombre; // Valor visible/buscable
                // Información extra visible en navegadores compatibles
                opt.label = `$${p.precio} | Disp: ${p.stock}`;
                datalist.appendChild(opt);
            });
        }
    } catch (err) {
        console.error("Error cargando productos:", err);
    }
}

// Busca en el array local cuando el usuario escribe
function detectarProductoSeleccionado(e) {
    const valor = e.target.value;
    const producto = listaProductosCache.find(p => p.nombre === valor);

    if (producto) {
        document.getElementById('productoIdActual').value = producto.iD_Producto;
        document.getElementById('precioInput').value = producto.precio;
        
        // Auto-enfocar cantidad
        const inputCant = document.getElementById('cantidadInput');
        inputCant.value = 1;
        inputCant.focus();
        inputCant.select();
    } else {
        document.getElementById('productoIdActual').value = '';
        document.getElementById('precioInput').value = '';
    }
}

// =========================================================================
// 5. GESTIÓN DEL DETALLE (FRONTEND)
// =========================================================================

function agregarLinea(e) {
    e.preventDefault();
    mostrarAlerta("", "light"); // Limpiar alertas

    const idProd = document.getElementById('productoIdActual').value;
    const nombreProd = document.getElementById('productoInput').value;
    const cantidad = parseFloat(document.getElementById('cantidadInput').value || '0');
    const precio = parseFloat(document.getElementById('precioInput').value || '0');

    // Validaciones
    if (!idProd) return mostrarAlerta('Selecciona un producto válido de la lista.', 'warning');
    if (cantidad <= 0) return mostrarAlerta('La cantidad debe ser mayor a 0.', 'warning');

    // Validar Stock vs Cache Local
    const prodEnCache = listaProductosCache.find(p => p.iD_Producto == idProd);
    console.log('prodEnCache =>', prodEnCache);
    if (prodEnCache && cantidad > prodEnCache.stock) {
        return mostrarAlerta(`Stock insuficiente. Disponible: ${prodEnCache.stock}`, 'danger');
    }

    const subtotal = cantidad * precio;

    // Verificar si ya existe en tabla para sumar
    const index = detalleVenta.findIndex(d => d.ID_Producto == idProd);
    console.log('index encontrado =>', index);

    if (index >= 0) {
        const nuevaCantidad = detalleVenta[index].Cantidad + cantidad;
        if (prodEnCache && nuevaCantidad > prodEnCache.stock) {
            return mostrarAlerta(`Excedes el stock disponible (${prodEnCache.stock}).`, 'danger');
        }
        detalleVenta[index].Cantidad = nuevaCantidad;
        detalleVenta[index].Subtotal = nuevaCantidad * precio;
    } else {
        detalleVenta.push({
            ID_Producto: parseInt(idProd),
            Nombre: nombreProd,
            Cantidad: cantidad,
            Precio_Unitario: precio, // Nombre exacto C#
            Subtotal: subtotal
        });
        console.log('detalleVenta actualizado =>', detalleVenta); 
    }

    // Limpiar inputs
    document.getElementById('productoIdActual').value = '';
    document.getElementById('productoInput').value = '';
    document.getElementById('cantidadInput').value = 1;
    document.getElementById('precioInput').value = '';
    document.getElementById('productoInput').focus();

    renderTablaDetalle();
}

function renderTablaDetalle() {
    const tbody = document.getElementById('tablaDetalleVenta');
    tbody.innerHTML = '';
    let total = 0;

    if (detalleVenta.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">Carrito vacío</td></tr>`;
        document.getElementById('confirmBtn').disabled = true;
    } else {
        detalleVenta.forEach((item, index) => {
            total += item.Subtotal;
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.ID_Producto}</td>
                <td>${item.Nombre}</td>
                <td class="text-end">${item.Cantidad}</td>
                <td class="text-end">$${item.Precio_Unitario.toFixed(2)}</td>
                <td class="text-end">$${item.Subtotal.toFixed(2)}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-danger" onclick="eliminarLinea(${index})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
        document.getElementById('confirmBtn').disabled = false;
    }
    
    document.getElementById('totalInput').value = total.toFixed(2);

    manejarMetodoPago(); 
    //Recalcular cambio si ya habían escrito algo
    calcularCambio(); 
    
    // Ajustamos la validación del botón confirmar
    const recibido = parseFloat(document.getElementById('montoRecibido').value) || 0;
    // Si es efectivo y falta dinero, mantenemos deshabilitado
    if (detalleVenta.length > 0 && recibido >= total) {
        document.getElementById('confirmBtn').disabled = false;
    } else if (detalleVenta.length === 0) {
        document.getElementById('confirmBtn').disabled = true;
    }




}

// Función global para onclick
window.eliminarLinea = function(index) {
    detalleVenta.splice(index, 1);
    renderTablaDetalle();
};

function cancelarVenta() {
    if (detalleVenta.length > 0 && !confirm('¿Cancelar venta actual?')) return;
    
    detalleVenta = [];
    renderTablaDetalle();
    document.getElementById('clienteSelect').value = "";
    document.getElementById('metodoPagoSelect').value = "";
    document.getElementById('alertaVenta').innerHTML = '';
}

// =========================================================================
// 6. CONFIRMAR VENTA (POST API)
// =========================================================================

async function confirmarVenta() {
    const btn = document.getElementById('confirmBtn');
    mostrarAlerta("", "light");

    const idCliente = document.getElementById('clienteSelect').value;
    const idMetodo = document.getElementById('metodoPagoSelect').value;
    const idEmpleado = sessionStorage.getItem('idEmpleado');
    const total = parseFloat(document.getElementById('totalInput').value);
    const recibido = parseFloat(document.getElementById('montoRecibido').value) || 0;
    const recibidoPantalla = document.getElementById('montoRecibido').value;
    const cambioPantalla = document.getElementById('cambioOutput').value;
    
     // 1. Tomamos la fecha del input (YYYY-MM-DD)
    const fechaInput = document.getElementById('fechaVenta').value;
    
    // 2. Obtenemos la hora actual precisa
    const ahora = new Date();
    const hora = String(ahora.getHours()).padStart(2, '0');
    const min = String(ahora.getMinutes()).padStart(2, '0');
    const seg = String(ahora.getSeconds()).padStart(2, '0');
    
    // 3. Combinamos para formato ISO completo (YYYY-MM-DDTHH:mm:ss)
   
    const fechaCompleta = `${fechaInput} ${hora}:${min}:${seg}`;
    console.log('Fecha completa para la venta:', fechaCompleta); 

    // AGREGA ESTO:
  console.log("DEBUG ANTES DE ENVIAR:");
  console.log("Empleado en SessionStorage:", idEmpleado); // ¿Dice null, undefined o un número?
  console.log("Cliente seleccionado:", idCliente);
    if (recibido < total) {
        return mostrarAlerta(`El pago es insuficiente. Faltan $${(total - recibido).toFixed(2)}`, 'danger');
    }
    if (!idCliente) return mostrarAlerta('Selecciona un cliente.', 'warning');
    if (!idMetodo) return mostrarAlerta('Selecciona un método de pago.', 'warning');
    if (!idEmpleado) return mostrarAlerta('Error de sesión: Empleado no identificado.', 'danger');
    if (detalleVenta.length === 0) return mostrarAlerta('Agrega productos.', 'warning');

    const payload = {
        Venta: {
            ID_Cliente: parseInt(idCliente),
            ID_Empleado: parseInt(idEmpleado),
            ID_Metodo: parseInt(idMetodo),
            Fecha: fechaCompleta,
            Total: total
        },
        Detalles: detalleVenta.map(d => ({
            ID_Producto: d.ID_Producto,
            Cantidad: d.Cantidad,
            Precio_Unitario: d.Precio_Unitario,
            Subtotal: d.Subtotal
        }))
    };

    try {
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Procesando...';

        const resp = await fetch(`${apiUrlVenta}/registrar-completa`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await resp.json();

        if (data.success) {
            // Guardamos el ID de la venta para usarlo luego
            const idVentaGenerada = data.idVenta;
            
            // Ocultar botones de acción principales para evitar doble clic
            btn.style.display = 'none'; 
            document.getElementById('cancelBtn').style.display = 'none';

            // Mostrar estado de éxito con acciones finales
            const alertaDiv = document.getElementById('alertaVenta');
            alertaDiv.innerHTML = `
                <div class="alert alert-success shadow-sm p-4 text-center" role="alert">
                    <h4 class="alert-heading"><i class="bi bi-check-circle-fill"></i> ¡Venta Exitosa!</h4>
                    <p class="mb-0 fs-5">Venta #${idVentaGenerada} registrada.</p>
                    <hr>
                    <div class="d-grid gap-2 d-sm-flex justify-content-sm-center my-3">
                        <button type="button" class="btn btn-outline-primary btn-lg" onclick="generarPDF(${idVentaGenerada}, '${recibidoPantalla}', '${cambioPantalla}')">
                            <i class="bi bi-printer"></i> Imprimir Ticket
                        </button>
                        <button type="button" class="btn btn-success btn-lg px-5" onclick="iniciarNuevaVenta()" id="btnNuevaVenta">
                            <i class="bi bi-cart-plus"></i> Nueva Venta
                        </button>
                     </div>
                  </div> `;
            
            // Foco automático en "Nueva Venta" para que puedan dar Enter
            setTimeout(() => document.getElementById('btnNuevaVenta').focus(), 100);

        } 
        
        
        else {
            mostrarAlerta(`❌ Error: ${data.mensaje}`, 'danger');
            btn.disabled = false;
            btn.innerHTML = '<i class="bi bi-check-circle"></i> Confirmar venta';
        }
    } catch (err) {
        console.error(err);
        mostrarAlerta('Error de conexión con el servidor.', 'danger');
        btn.disabled = false;
        btn.innerHTML = '<i class="bi bi-check-circle"></i> Confirmar venta';
    }
}


function mostrarAlerta(msg, tipo) {
    const div = document.getElementById('alertaVenta');
    if (!msg) { div.innerHTML = ''; return; }
    div.innerHTML = `<div class="alert alert-${tipo} alert-dismissible fade show">${msg}<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>`;
}


function iniciarNuevaVenta() {
  // 1. Limpiar datos
    detalleVenta = [];
    renderTablaDetalle(); // Esto limpiará la tabla y el total
    
    // 2. Restaurar UI
    document.getElementById('clienteSelect').value = "";
    document.getElementById('metodoPagoSelect').value = "";
    document.getElementById('alertaVenta').innerHTML = ''; // Quita el mensaje de éxito
    
    // 3. Restaurar botones principales
    document.getElementById('confirmBtn').style.display = 'inline-block';
    document.getElementById('confirmBtn').innerHTML = '<i class="bi bi-check-circle"></i> Confirmar venta';
    document.getElementById('confirmBtn').disabled = true; // Se deshabilita porque el carrito está vacío
    document.getElementById('cancelBtn').style.display = 'inline-block';
    
    // 4. Foco listo para escanear/buscar siguiente producto
    document.getElementById('productoInput').focus();


}

function manejarMetodoPago() {
    const select = document.getElementById('metodoPagoSelect');
    const inputRecibido = document.getElementById('montoRecibido');
    const total = parseFloat(document.getElementById('totalInput').value) || 0;
    
    // Obtenemos el texto de la opción seleccionada
    const textoMetodo = select.options[select.selectedIndex].text.toLowerCase();

    // Si NO es efectivo (ej. tarjeta), asumimos pago exacto
    if (!textoMetodo.includes('efectivo')) {
        inputRecibido.value = total.toFixed(2);
        inputRecibido.disabled = true; // Bloqueamos para que no editen
    } else {
        inputRecibido.value = ''; // Limpiamos para que escriban
        inputRecibido.disabled = false;
        inputRecibido.focus();
    }
    calcularCambio();
}

function calcularCambio() {
    const total = parseFloat(document.getElementById('totalInput').value) || 0;
    const recibido = parseFloat(document.getElementById('montoRecibido').value) || 0;
    const inputCambio = document.getElementById('cambioOutput');
    const msg = document.getElementById('msgPago');
    const btnConfirmar = document.getElementById('confirmBtn');

    // Cálculo
    const cambio = recibido - total;

    if (recibido > 0) {
        inputCambio.value = cambio.toFixed(2);
        
        if (cambio < 0) {
            // Falta dinero
            inputCambio.classList.add('text-danger');
            inputCambio.classList.remove('text-success');
            msg.textContent = `Faltan $${Math.abs(cambio).toFixed(2)} para cubrir el total.`;
            btnConfirmar.disabled = true; // Bloquear botón
        } else {
            // Pago correcto
            inputCambio.classList.remove('text-danger');
            inputCambio.classList.add('text-success');
            msg.textContent = '';
            // Solo habilitamos si hay productos
            if (detalleVenta.length > 0) btnConfirmar.disabled = false;
        }
    } else {
        inputCambio.value = "0.00";
        msg.textContent = '';
    }
}


// =========================================================================
// 7. FUNCIONES CAJERO (Cambio Clave)
// =========================================================================

async function cambiarClaveCajero() {
    const idEmpleado = parseInt(sessionStorage.getItem('idEmpleado') || '0', 10);
    const usuarioNuevo = document.getElementById('usuarioNuevo').value.trim();
    const claveActual = document.getElementById('claveActual').value;
    const claveNueva = document.getElementById('claveNueva').value;
    const claveConfirmar = document.getElementById('claveConfirmar').value;
    const alerta = document.getElementById('alertaClave');

    alerta.innerHTML = '';

    if (!idEmpleado) {
        alerta.innerHTML = '<div class="alert alert-danger">No se encontró el empleado en sesión.</div>';
        return;
    }

    if (!usuarioNuevo && !claveNueva) {
        alerta.innerHTML = '<div class="alert alert-warning">Ingresa un nuevo usuario o una nueva contraseña.</div>';
        return;
    }

    if (claveNueva) {
        if (!claveActual) {
            alerta.innerHTML = '<div class="alert alert-warning">Escribe tu contraseña actual.</div>';
            return;
        }
        if (claveNueva !== claveConfirmar) {
            alerta.innerHTML = '<div class="alert alert-warning">Las nuevas contraseñas no coinciden.</div>';
            return;
        }
    }

    const body = {
        ID_Empleado: idEmpleado,
        UsuarioNuevo: usuarioNuevo || null,
        ClaveActual: claveActual || null,
        ClaveNueva: claveNueva || null
    };

    try {
        const resp = await fetch(`${apiUrlUsuario}/actualizar-perfil`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const data = await resp.json();

        if (data.success) {
            alerta.innerHTML = `<div class="alert alert-success">${data.mensaje || 'Datos actualizados correctamente.'}</div>`;

            if (usuarioNuevo) {
                sessionStorage.setItem('nombreUsuario', usuarioNuevo);
                const lbl = document.getElementById('menuCajero');
                if (lbl) lbl.innerHTML = `<i class="bi bi-person-circle"></i> ${usuarioNuevo}`;
                const input = document.getElementById('usuarioActual');
                if (input) input.value = usuarioNuevo;
            }

            setTimeout(() => {
                const modal = bootstrap.Modal.getInstance(document.getElementById('modalCambiarClave'));
                if (modal) modal.hide();
                document.getElementById('usuarioNuevo').value = '';
                document.getElementById('claveActual').value = '';
                document.getElementById('claveNueva').value = '';
                document.getElementById('claveConfirmar').value = '';
                alerta.innerHTML = '';
            }, 1500);
        } else {
            alerta.innerHTML = `<div class="alert alert-danger">${data.mensaje || 'No se pudieron actualizar las credenciales.'}</div>`;
        }
    } catch (err) {
        console.error(err);
        alerta.innerHTML = '<div class="alert alert-danger">Error de comunicación con el servidor.</div>';
    }
}

// =========================================================================
// 8. GENERAR PDF DEL TICKET
// =========================================================================

async function generarPDF(idVenta,montoRecibido = null, cambio = null) {
    try {
        // Llamar al backend para obtener los datos de la venta
        const resp = await fetch(`${apiUrlVenta}/obtener/${idVenta}`);
        const respDetalle = await fetch(`${apiUrlDetalleVenta}/listar?idVenta=${idVenta}`);
        console.log('respDetalle =>', respDetalle);
        const dataVenta = await resp.json();
        const dataDetalle = await respDetalle.json();
        console.log('dataDetalle =>', dataDetalle);
        
        if (!dataVenta.success) {
            alert('No se pudo obtener los datos de la venta');
            return;
        }

        const venta = dataVenta.data;
        console.log("Venta para PDF =>", venta);
        const detalles =  Array.isArray(dataDetalle) ? dataDetalle : (dataDetalle.data || []);
        console.log('Detalles de venta para PDF =>', detalles);
       
        generarTicketPDF(venta, detalles, montoRecibido, cambio);

    } catch (err) {
        console.error("Error generando PDF:", err);
        alert('Error al generar el PDF');
    }
}


function generarTicketPDF(venta, detalles,montoRecibido = null, cambio = null) {
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
    
    // --- VARIABLES DE ALINEACIÓN (ESTAS FALTABAN) ---
    // xValue: Donde termina el número (alineado a la derecha)
    const xValue = pageWidth - margin; 
    // xLabel: Donde empieza el texto "Cambio:" (40mm antes del final)
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
    // Nota: Asegúrate que tus propiedades (iD_Venta vs ID_Venta) sean correctas según tu console.log anterior
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

        const maxChars = 25; // Reduje un poco para evitar solapamiento
        
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
    // SECCIÓN DE TOTALES (CORREGIDA)
    // ==========================================
    
    // 1. TOTAL
    doc.setFont(undefined, 'bold');
    doc.setFontSize(10);
    const totalVal = venta.total || venta.Total || 0;
    
    // Usamos xLabel y xValue para alinear todo bonito a la derecha
    doc.text('TOTAL:', xLabel, yPosition);
    doc.text(`$${parseFloat(totalVal).toFixed(2)}`, xValue, yPosition, { align: 'right' });
    yPosition += 5;

    // 2. EFECTIVO / CAMBIO (Solo si existen)
    if (montoRecibido && parseFloat(montoRecibido) > 0) {
        doc.setFontSize(8);
        doc.setFont(undefined, 'normal');
        
        doc.text('Efectivo:', xLabel, yPosition);
        doc.text(`$${parseFloat(montoRecibido).toFixed(2)}`, xValue, yPosition, { align: 'right' });
        yPosition += 4;

        if (cambio) {
            doc.setFont(undefined, 'bold'); // Negrita para el cambio
            doc.text('Cambio:', xLabel, yPosition);
            doc.text(`$${parseFloat(cambio).toFixed(2)}`, xValue, yPosition, { align: 'right' });
            yPosition += 6;
        }
    }

    // PIE DE PÁGINA
    yPosition += 5;
    doc.setFontSize(7);
    doc.setFont(undefined, 'normal');
    doc.text('Gracias por su compra', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 3;
    doc.text(new Date().toLocaleString(), pageWidth / 2, yPosition, { align: 'center' });

    const nombreArchivo = `Factura_${venta.iD_Venta || venta.ID_Venta}.pdf`;
    doc.save(nombreArchivo);

 }

// --- Funciones de Lógica ---

async function guardarNuevoCliente() {
    const btn = document.getElementById('btnGuardarNuevoCliente');
    const msgDiv = document.getElementById('msgAgregarCliente');
    
    // Obtener datos
    const nombre = document.getElementById('nuevoClienteNombre').value.trim();
    const apellido = document.getElementById('nuevoClienteApellido').value.trim();
    const telefono = document.getElementById('nuevoClienteTelefono').value.trim();
    const correo = document.getElementById('nuevoClienteCorreo').value.trim();
    const direccion = document.getElementById('nuevoClienteDireccion').value.trim();

    if (!nombre || !apellido) {
        msgDiv.innerHTML = '<div class="alert alert-warning py-1">Nombre y Apellido son obligatorios</div>';
        return;
    }

    const payload = {
        Nombre: nombre,
        Apellidos: apellido,
        Telefono: telefono,
        Correo: correo,
        Direccion: direccion,
        Estado: true
    };

    try {
        btn.disabled = true;
        const resp = await fetch(`${apiUrlCliente}/registrar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await resp.json();

        if (data.success) {
            // Cerrar modal
            const modalEl = document.getElementById('modalAgregarCliente');
            const modal = bootstrap.Modal.getInstance(modalEl);
            modal.hide();

            // Recargar lista de clientes y seleccionar el nuevo (opcional, aquí solo recargamos)
            await cargarClientes(); 
            
            // Como no tenemos el ID nuevo directo, mostramos alerta global
            mostrarAlerta('Cliente registrado exitosamente', 'success');
        } else {
            msgDiv.innerHTML = `<div class="alert alert-danger py-1">${data.mensaje}</div>`;
        }
    } catch (error) {
        console.error(error);
        msgDiv.innerHTML = '<div class="alert alert-danger py-1">Error de conexión</div>';
    } finally {
        btn.disabled = false;
    }
}

async function abrirModalEditarCliente() {
    const idCliente = document.getElementById('clienteSelect').value;
    if (!idCliente) return;

    try {
        // Cargar datos actuales del cliente
        const resp = await fetch(`${apiUrlCliente}/obtener/${idCliente}`);
        const data = await resp.json();

        if (data.success) {
            const c = data.data;
            // Llenar formulario
            document.getElementById('editClienteId').value = c.iD_Cliente || c.ID_Cliente; // Ajustar según API
            document.getElementById('editClienteNombre').value = c.nombre || c.Nombre;
            document.getElementById('editClienteApellido').value = c.apellidos || c.Apellidos;
            document.getElementById('editClienteTelefono').value = c.telefono || c.Telefono || '';
            document.getElementById('editClienteCorreo').value = c.correo || c.Correo || '';
            document.getElementById('editClienteDireccion').value = c.direccion || c.Direccion || '';
            
            document.getElementById('msgEditarCliente').innerHTML = '';
            
            const modal = new bootstrap.Modal(document.getElementById('modalEditarCliente'));
            modal.show();
        } else {
            alert('No se pudo cargar la información del cliente');
        }
    } catch (error) {
        console.error(error);
        alert('Error al consultar cliente');
    }
}

async function guardarEdicionCliente() {
    const btn = document.getElementById('btnGuardarEditCliente');
    const msgDiv = document.getElementById('msgEditarCliente');
    
    const id = document.getElementById('editClienteId').value;
    const nombre = document.getElementById('editClienteNombre').value.trim();
    const apellido = document.getElementById('editClienteApellido').value.trim();
    const telefono = document.getElementById('editClienteTelefono').value.trim();
    const correo = document.getElementById('editClienteCorreo').value.trim();
    const direccion = document.getElementById('editClienteDireccion').value.trim();

    if (!nombre || !apellido) {
        msgDiv.innerHTML = '<div class="alert alert-warning py-1">Nombre y Apellido son obligatorios</div>';
        return;
    }

    const payload = {
        ID_Cliente: parseInt(id),
        Nombre: nombre,
        Apellidos: apellido,
        Telefono: telefono,
        Correo: correo,
        Direccion: direccion,
        Estado: true 
    };

    try {
        btn.disabled = true;
        const resp = await fetch(`${apiUrlCliente}/actualizar/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await resp.json();

        if (data.success) {
            const modalEl = document.getElementById('modalEditarCliente');
            const modal = bootstrap.Modal.getInstance(modalEl);
            modal.hide();

            // Recargar lista y mantener selección
            await cargarClientes();
            document.getElementById('clienteSelect').value = id;
            
            mostrarAlerta('Cliente actualizado correctamente', 'success');
        } else {
            msgDiv.innerHTML = `<div class="alert alert-danger py-1">${data.mensaje}</div>`;
        }
    } catch (error) {
        console.error(error);
        msgDiv.innerHTML = '<div class="alert alert-danger py-1">Error de conexión</div>';
    } finally {
        btn.disabled = false;
    }
}




// Exponer funciones necesarias al objeto window
window.cambiarClaveCajero = cambiarClaveCajero;
window.generarPDF = generarPDF;
window.iniciarNuevaVenta = iniciarNuevaVenta;
