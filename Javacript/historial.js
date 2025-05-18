document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("historialBody");
  const back  = document.getElementById("backBtn");


  const historial = JSON.parse(localStorage.getItem("solusoft_sales") || "[]");

 
  historial.forEach((v, idx) => {
    const tr = document.createElement("tr");
   
    const detalles = v.lineas
      .map(l => `${l.nombre} (x${l.cantidad})`)
      .join(", ");

    tr.innerHTML = `    
      <td>${idx + 1}</td>
      <td>${v.fecha}</td>
      <td>${v.cliente}</td>
      <td>${detalles}</td>
      <td class="text-end">$${v.total.toFixed(2)}</td>
    `;
    tbody.appendChild(tr);
  });

  back.addEventListener("click", () =>    
 window.location.href = "/html/venta.html"
);
});
