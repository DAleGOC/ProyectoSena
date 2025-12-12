import { apiUrlVenta ,apiUrlDetalleVenta} from "../api/apiUrlSolusoft.js";



async function cargarHistorialCajero() {
    const tbody = document.getElementById('historialBody');
    const idEmpleado = sessionStorage.getItem('idEmpleado'); // Solo sus ventas
    
    try {
        const resp = await fetch(`${apiUrlVenta}/listar`);

        const data = await resp.json();
        console.log('Datos de ventas recibidos:', data);
        console.log(data.success)
        if (data.success) {
            const ventas = data.data;
            console.log(ventas)
            console.log('ID Empleado de sesión:', idEmpleado);
            // Filtramos: Solo las de ESTE empleado y de HOY (opcional lo de hoy)
            const misVentas = ventas.filter(v => v.iD_Empleado == idEmpleado);
            console.log(misVentas)
            
            // Ordenar: Más reciente primero
            misVentas.sort((a, b) => b.iD_Venta - a.iD_Venta);

            tbody.innerHTML = '';
            
            if (misVentas.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" class="text-center">No has realizado ventas hoy.</td></tr>';
                return;
            }

            misVentas.forEach(v => {
                const tr = document.createElement('tr');
                // Formatear fecha bonita
                const fecha = new Date(v.Fecha).toLocaleString(); 
                
                tr.innerHTML = `
                    <td>${v.iD_Venta}</td>
                    <td>${v.fecha}</td>
                    <td>${v.cliente}</td>
                    <td>${v.metodoPago}</td>
                    <td class="fw-bold">$${v.total.toFixed(2)}</td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="reimprimirTicket(${v.iD_Venta})">
                            <i class="bi bi-printer"></i> Ticket
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }
    } catch (error) {
        console.error(error);
        tbody.innerHTML = '<tr><td colspan="5" class="text-danger text-center">Error al cargar historial.</td></tr>';
    }
}


async function reimprimirTicket(idVenta) {
    try {
        // Mostrar feedback de carga (opcional)
        document.body.style.cursor = 'wait';

        // 1. Obtener datos de la venta (Cabecera)
        const respVenta = await fetch(`${apiUrlVenta}/obtener/${idVenta}`);
        const dataVenta = await respVenta.json();

        // 2. Obtener detalles (Productos)
        const respDetalle = await fetch(`${apiUrlDetalleVenta}/listar?idVenta=${idVenta}`);
        const dataDetalle = await respDetalle.json();

        if (dataVenta.success) {
            const venta = dataVenta.data;
            // Manejamos si dataDetalle es array directo o viene en .data
            const detalles = Array.isArray(dataDetalle) ? dataDetalle : (dataDetalle.data || []);

            generarPDFDesdeHistorial(venta, detalles);
        } else {
            alert('No se pudo recuperar la información de la venta.');
        }

    } catch (error) {
        console.error("Error al reimprimir:", error);
        alert('Error al generar el ticket.');
    } finally {
        document.body.style.cursor = 'default';
    }
}


// =========================================================
// 3. GENERADOR DE PDF 
// =========================================================
function generarPDFDesdeHistorial(venta, detalles) {
    const { jsPDF } = window.jspdf;
    if (!jsPDF) { alert("Error: Librería PDF no cargada"); return; }

    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [80, 200]
    });

    let yPosition = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 5;
    const xValue = pageWidth - margin; 
    const xLabel = pageWidth - margin - 35; 

    // --- ENCABEZADO ---
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('SoluSoft', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 8;

    doc.setFontSize(8);
    doc.setFont(undefined, 'normal');
    doc.text('Reimpresión de Ticket', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 5;
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 5;

    // --- DATOS VENTA ---
    // Usamos || para asegurar compatibilidad con mayúsculas/minúsculas del backend
    const id = venta.iD_Venta || venta.ID_Venta;
    const fecha = venta.fecha || venta.Fecha;
    const nomCliente = venta.cliente || venta.Cliente;
    const nomEmpleado = venta.empleado || venta.Empleado;
    const nomMetodo = venta.metodoPago || venta.MetodoPago;

    doc.text(`Factura Nº: ${id}`, margin, yPosition);
    yPosition += 4;
    doc.text(`Fecha: ${fecha}`, margin, yPosition);
    yPosition += 4;
    doc.text(`Cliente: ${nomCliente}`, margin, yPosition);
    yPosition += 4;
    doc.text(`Vendedor: ${nomEmpleado}`, margin, yPosition);
    yPosition += 4;
    doc.text(`Pago: ${nomMetodo}`, margin, yPosition);
    yPosition += 6;

    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 5;

    // --- TABLA PRODUCTOS ---
    doc.setFont(undefined, 'bold');
    doc.text('PRODUCTO', margin, yPosition);
    doc.text('CANT', margin + 40, yPosition);
    doc.text('TOTAL', margin + 50, yPosition);
    yPosition += 4;
    doc.setFont(undefined, 'normal');

    detalles.forEach(d => {
        const prod = d.producto || d.Producto || d.Nombre || 'Producto';
        const cant = d.cantidad || d.Cantidad;
        const sub = d.subtotal || d.Subtotal;

        // Truncar nombre largo
        if (prod.length > 20) {
            doc.text(prod.substring(0, 20) + '...', margin, yPosition);
        } else {
            doc.text(prod, margin, yPosition);
        }
        
        doc.text(cant.toString(), margin + 40, yPosition);
        doc.text(`$${sub.toFixed(2)}`, margin + 50, yPosition);
        yPosition += 4;
    });

    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 5;

    // --- TOTALES ---
    const totalVenta = venta.total || venta.Total;
    doc.setFont(undefined, 'bold');
    doc.setFontSize(10);
    doc.text('TOTAL:', xLabel, yPosition);
    doc.text(`$${totalVenta.toFixed(2)}`, xValue, yPosition, { align: 'right' });

    // --- PIE ---
    yPosition += 10;
    doc.setFontSize(7);
    doc.setFont(undefined, 'normal');
    doc.text('Copia del Cliente', pageWidth / 2, yPosition, { align: 'center' });

    doc.save(`Ticket_Reimpresion_${id}.pdf`);
}








 document.addEventListener('DOMContentLoaded', () => {
    cargarHistorialCajero();

    const inputFiltro = document.getElementById('filtroInput');
    if (inputFiltro) {
    inputFiltro.addEventListener('keyup', function() {
        const valor = this.value.toLowerCase().trim(); // trim() quita espacios extra
        const filas = document.querySelectorAll('#historialBody tr');

        filas.forEach(fila => {
            // Buscamos en todo el texto de la fila (Fecha, Cliente, Empleado, Total)
            const textoFila = fila.textContent.toLowerCase();
            
            // Mostramos u ocultamos según coincidencia
            if (textoFila.includes(valor)) {
                fila.style.display = '';
            } else {
                fila.style.display = 'none';
            }
        });
    });
    }










    // Botón Volver
    document.getElementById('backBtn').addEventListener('click', () => {
        window.location.href = '/html/Venta/venta.html';
    });
});

window.reimprimirTicket = reimprimirTicket;
