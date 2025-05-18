document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (id === null) return alert("Falta ID de cliente.");

  const clients = JSON.parse(localStorage.getItem("solusoft_clients") || "[]");
  const client  = clients[id];
  if (!client) return alert("Cliente no encontrado.");

  
  const nameIn  = document.getElementById("clientName");
  const emailIn = document.getElementById("clientEmail");
  const phoneIn = document.getElementById("clientPhone");
  const errs = {
    name:  document.getElementById("clientNameError"),
    email: document.getElementById("clientEmailError"),
    phone: document.getElementById("clientPhoneError")
  };

  nameIn.value  = client.nombre;
  emailIn.value = client.correo;
  phoneIn.value = client.telefono;

  
  const regex = {
    name:  /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{2,50}$/,
    email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    phone: /^\d{7,15}$/
  };
  function validate(input, reg, errElem, msg) {
    if (!reg.test(input.value.trim())) {
      input.classList.add("is-invalid"); errElem.textContent = msg; return false;
    }
    input.classList.remove("is-invalid"); errElem.textContent = ""; return true;
  }

 
  nameIn.addEventListener("input", () => validate(nameIn, regex.name, errs.name, "Solo letras (2‑50)."));
  emailIn.addEventListener("input", () => validate(emailIn, regex.email, errs.email, "Email no válido."));
  phoneIn.addEventListener("input", () => validate(phoneIn, regex.phone, errs.phone, "7‑15 dígitos."));


  document.getElementById("editClientForm").addEventListener("submit", e => {
    e.preventDefault();
    const vN = validate(nameIn, regex.name, errs.name, "Solo letras (2‑50).");
    const vE = validate(emailIn, regex.email, errs.email, "Email no válido.");
    const vP = validate(phoneIn, regex.phone, errs.phone, "7‑15 dígitos.");
    if (!(vN && vE && vP)) return;

  
    clients[id] = {
      ...client,
      nombre:  nameIn.value.trim(),
      correo:  emailIn.value.trim(),
      telefono:phoneIn.value.trim()
    };
    localStorage.setItem("solusoft_clients", JSON.stringify(clients));
    window.close();
  });

  
  document.getElementById("cancelBtn").addEventListener("click", () => window.close());
});
