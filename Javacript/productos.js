document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("productsTbody");
  const modal = new bootstrap.Modal(document.getElementById("productModal"));
  const form  = document.getElementById("productForm");
  const idIn  = document.getElementById("productId");
  const nameIn= document.getElementById("productName");
  const priceIn= document.getElementById("productPrice");
  const addBtn= document.getElementById("addProductBtn");

  let products = JSON.parse(localStorage.getItem("solusoft_products") || "[]");

  function render() {
    tbody.innerHTML = "";
    products.forEach(p => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${p.id}</td>
        <td>${p.nombre}</td>
        <td class="text-end">${p.precio.toFixed(2)}</td>
        <td>
          <button class="btn btn-sm btn-primary edit">✏️</button>
          <button class="btn btn-sm btn-danger delete">🗑️</button>
        </td>`;
      tr.querySelector(".edit").onclick = () => openModal(p);
      tr.querySelector(".delete").onclick = () => {
        products = products.filter(x => x.id !== p.id);
        localStorage.setItem("solusoft_products", JSON.stringify(products));
        render();
      };
      tbody.appendChild(tr);
    });
  }

  function openModal(prod = null) {
    if (prod) {
      document.getElementById("modalTitle").textContent = "Editar Producto";
      idIn.value = prod.id;
      nameIn.value = prod.nombre;
      priceIn.value = prod.precio;
    } else {
      document.getElementById("modalTitle").textContent = "Nuevo Producto";
      idIn.value = "";
      nameIn.value = "";
      priceIn.value = "";
    }
    modal.show();
  }

  addBtn.addEventListener("click", () => openModal());

  form.addEventListener("submit", e => {
    e.preventDefault();
    const id   = idIn.value ? parseInt(idIn.value) : Date.now();
    const prod = { id, nombre: nameIn.value.trim(), precio: parseFloat(priceIn.value) };
    const idx  = products.findIndex(x => x.id === id);
    if (idx >= 0) products[idx] = prod;
    else          products.push(prod);
    localStorage.setItem("solusoft_products", JSON.stringify(products));
    render();
    modal.hide();
  });

  render();
});
