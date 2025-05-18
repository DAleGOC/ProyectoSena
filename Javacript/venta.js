document.addEventListener("DOMContentLoaded", () => {
  
  const clienteSelect = document.getElementById("clienteSelect");
  const addClientBtn  = document.getElementById("addClientBtn");
  const editClientBtn = document.getElementById("editClientBtn");
  const fechaInput    = document.getElementById("fechaVenta");
  const hoy           = new Date().toISOString().split("T")[0];
  fechaInput.value    = hoy;
  const prodInput     = document.getElementById("productoInput");
  const listaProd     = document.getElementById("productosList");
  const cantInput     = document.getElementById("cantidadInput");
  const precioInput   = document.getElementById("precioInput");
  const addLineBtn    = document.getElementById("addLineBtn");
  const tbodyLineas   = document.querySelector("table tbody");
  const totalInput    = document.getElementById("totalInput");
  const confirmBtn    = document.getElementById("confirmBtn");
  const cancelBtn     = document.getElementById("cancelBtn");

  
  let storedClients = JSON.parse(localStorage.getItem("solusoft_clients") || "[]");
  function populateClients() {
    clienteSelect.querySelectorAll("option:not([disabled])").forEach(o => o.remove());
    storedClients.forEach((c, idx) => {
      const opt = document.createElement("option");
      opt.value = idx;
      opt.textContent = c.nombre;
      clienteSelect.appendChild(opt);
    });
    const optNew = document.createElement("option");
    optNew.value = "__new";
    optNew.textContent = "➕ Agregar nuevo cliente…";
    clienteSelect.appendChild(optNew);
  }
  populateClients();

  clienteSelect.addEventListener("change", () => {
    if (clienteSelect.value === "__new") {
      window.open("/html/registroCliente.html", "_blank");
      clienteSelect.value = "";
      editClientBtn.disabled = true;
    } else {
      editClientBtn.disabled = false;
    }
    toggleConfirm();
  });

  addClientBtn.addEventListener("click", () => {
    window.open("/html/registroCliente.html", "_blank");
  });
  editClientBtn.addEventListener("click", () => {
    const id = clienteSelect.value;
    if (id !== "" && id !== "__new") {
      window.open(`/html/editar.html?id=${id}`, "_blank");
    }
  });

  
  let products = JSON.parse(localStorage.getItem("solusoft_products") || "[]");
  function populateProducts() {
    listaProd.innerHTML = "";
    products.forEach(p => {
      const opt = document.createElement("option");
      opt.value = p.nombre;
      listaProd.appendChild(opt);
    });
  }
  populateProducts();

  prodInput.addEventListener("input", () => {
    const p = products.find(x => x.nombre === prodInput.value);
    if (p) precioInput.value = p.precio;
    toggleAddLine();
  });
  cantInput.addEventListener("input", toggleAddLine);

  function toggleAddLine() {
    const prodOK = products.some(p => p.nombre === prodInput.value);
    const cant   = parseFloat(cantInput.value);
    const cantOK = !isNaN(cant) && cant >= 1;
    addLineBtn.disabled = !(prodOK && cantOK);
  }
  toggleAddLine();

  addLineBtn.addEventListener("click", () => {
    const prod = products.find(x => x.nombre === prodInput.value);
    const cant = parseFloat(cantInput.value);
    if (!prod || isNaN(cant) || cant < 1) return;

    const sub = (prod.precio * cant).toFixed(2);
    const tr  = document.createElement("tr");
    tr.innerHTML = `
      <td>${prod.id}</td>
      <td>${prod.nombre}</td>
      <td class="text-center">${cant}</td>
      <td class="text-end">${prod.precio.toFixed(2)}</td>
      <td class="text-end subtotal">${sub}</td>
      <td class="text-center">
        <button class="btn btn-danger btn-sm del-line">Eliminar</button>
      </td>`;
    tbodyLineas.appendChild(tr);
    updateTotal();
    toggleAddLine();
    toggleConfirm();
  });

  tbodyLineas.addEventListener("click", e => {
    if (e.target.matches(".del-line")) {
      e.target.closest("tr").remove();
      updateTotal();
      toggleConfirm();
    }
  });

  function updateTotal() {
    let sum = 0;
    tbodyLineas.querySelectorAll(".subtotal")
      .forEach(td => sum += parseFloat(td.textContent));
    totalInput.value = sum.toFixed(2);
  }

  
  function toggleConfirm() {
    const clienteOK = clienteSelect.value !== "";
    const tieneLineas = tbodyLineas.querySelectorAll("tr").length > 0;
    confirmBtn.disabled = !(clienteOK && tieneLineas);
  }
  toggleConfirm();

  cancelBtn.addEventListener("click", () => {
    fechaInput.value      = new Date().toISOString().split("T")[0];
    clienteSelect.value   = "";
    editClientBtn.disabled= true;
    prodInput.value       = "";
    cantInput.value       = "";
    precioInput.value     = "";
    tbodyLineas.innerHTML = "";
    totalInput.value      = "";
    toggleAddLine();
    toggleConfirm();
  });

  confirmBtn.addEventListener("click", e => {
    e.preventDefault();
    
    const fecha   = fechaInput.value;
    const cliente = clienteSelect.options[clienteSelect.selectedIndex].text;
    const lineas  = Array.from(tbodyLineas.querySelectorAll("tr")).map(tr => ({
      id:       tr.children[0].textContent,
      nombre:   tr.children[1].textContent,
      cantidad: parseFloat(tr.children[2].textContent),
      precio:   parseFloat(tr.children[3].textContent),
      subtotal: parseFloat(tr.children[4].textContent)
    }));
    const total   = parseFloat(totalInput.value) || 0;

    const historial = JSON.parse(localStorage.getItem("solusoft_sales") || "[]");
    historial.push({ fecha, cliente, lineas, total });
    localStorage.setItem("solusoft_sales", JSON.stringify(historial));

    alert("✅ Venta registrada correctamente.");
    
    cancelBtn.click();
  });

  
  const navProductos = document.getElementById("navProductos");
  navProductos.addEventListener("click", async e => {
    e.preventDefault();
    const user = prompt("👤 Usuario administrador:");
    if (user === null) return;
    const pass = prompt("🔒 Contraseña:");
    if (pass === null) return;
    if (user === "admin" && pass === "1234") {
      window.location.href = "/html/productos.html";
    } else {
      alert("❌ Credenciales incorrectas.");
    }
  });


  
});
