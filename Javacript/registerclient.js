document.addEventListener("DOMContentLoaded", () => {
  const form       = document.getElementById("registerClientForm");
  const nameInput  = document.getElementById("clientName");
  const emailInput = document.getElementById("clientEmail");
  const phoneInput = document.getElementById("clientPhone");

  const errors = {
    name:  document.getElementById("clientNameError"),
    email: document.getElementById("clientEmailError"),
    phone: document.getElementById("clientPhoneError")
  };

  
  const regex = {
    name:  /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{2,50}$/,
    email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    phone: /^\d{7,15}$/
  };

  function validateField(input, regex, errorElem, message) {
    if (!regex.test(input.value.trim())) {
      input.classList.add("is-invalid");
      errorElem.textContent = message;
      return false;
    }
    input.classList.remove("is-invalid");
    errorElem.textContent = "";
    return true;
  }

  
  nameInput.addEventListener("input", () => {
    validateField(nameInput, regex.name, errors.name, "Solo letras y espacios (2–50).");
  });
  emailInput.addEventListener("input", () => {
    validateField(emailInput, regex.email, errors.email, "Correo no válido.");
  });
  phoneInput.addEventListener("input", () => {
    validateField(phoneInput, regex.phone, errors.phone, "7–15 dígitos numéricos.");
  });

  form.addEventListener("submit", e => {
    e.preventDefault();

    const validName  = validateField(nameInput,  regex.name,  errors.name,  "Solo letras y espacios (2–50).");
    const validEmail = validateField(emailInput, regex.email, errors.email, "Correo no válido.");
    const validPhone = validateField(phoneInput, regex.phone, errors.phone, "7–15 dígitos numéricos.");

    if (!(validName && validEmail && validPhone)) return;

    
    const clients = JSON.parse(localStorage.getItem("solusoft_clients") || "[]");
    clients.push({
      nombre:   nameInput.value.trim(),
      correo:   emailInput.value.trim(),
      telefono: phoneInput.value.trim(),
      id:       Date.now()
    });
    localStorage.setItem("solusoft_clients", JSON.stringify(clients));
    window.close();
  });
});
