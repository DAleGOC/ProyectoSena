import { apiUrlUsuario } from '../api/apiUrlSolusoft.js';

document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("editarForm");

  const campos = [
    { id: "nombre", regla: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{2,50}$/, mensaje: "Solo letras, mínimo 2 caracteres." },
    { id: "apellidos", regla: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{2,50}$/, mensaje: "Solo letras, mínimo 2 caracteres." },
    { id: "telefono", regla: /^\d{7,15}$/, mensaje: "El teléfono debe tener entre 7 y 15 dígitos numéricos." },
    { id: "direccion", regla: /^.{3,100}$/, mensaje: "La dirección debe tener mínimo 3 caracteres." },
    { id: "cargo", regla: /^.{3,50}$/, mensaje: "El cargo debe tener mínimo 3 caracteres." },
    { id: "nombreUsuario", regla: /^\d{5,15}$/, mensaje: "La identificación debe ser numérica (5 a 15 dígitos)." }
  ];

  const validarCampo = ({ id, regla, mensaje }) => {
    const input = document.getElementById(id);
    const valor = input.value.trim();
    if (!regla.test(valor)) {
      input.classList.add("is-invalid");
      input.classList.remove("is-valid");
      input.setCustomValidity(mensaje);
      return false;
    } else {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
      input.setCustomValidity("");
      return true;
    }
  };

  campos.forEach(c => {
    const input = document.getElementById(c.id);
    input.addEventListener("input", () => validarCampo(c));
  });

  // === Obtener el ID del usuario desde la URL ===
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se recibió el ID del usuario para editar.",
    });
    return;
  }

  // === Cargar datos del usuario seleccionado ===
  try {
    const res = await fetch(`${apiUrlUsuario}/obtener/${id}`);
    if (!res.ok) throw new Error("No se encontró el usuario.");
    const data = await res.json();

    document.getElementById("idEmpleado").value = data.ID_Empleado;
    document.getElementById("nombre").value = data.Nombre;
    document.getElementById("apellidos").value = data.Apellidos;
    document.getElementById("telefono").value = data.Telefono;
    document.getElementById("direccion").value = data.Direccion;
    document.getElementById("cargo").value = data.Cargo;
    document.getElementById("nombreUsuario").value = data.Nombre_Usuario;
    document.getElementById("contraseña").value = data.Contraseña;
    document.getElementById("rol").value = data.Rol;
    document.getElementById("estado").value = data.Estado ? "1" : "0";

  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Error al cargar datos",
      text: err.message,
    });
  }

  // === Envío de actualización ===
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const validos = campos.every(validarCampo);
    if (!validos) {
      Swal.fire({
        icon: "warning",
        title: "Campos inválidos",
        text: "Por favor revisa los campos marcados en rojo.",
      });
      return;
    }

    const usuarioEditado = {
      ID_Empleado: document.getElementById("idEmpleado").value,
      Nombre: document.getElementById("nombre").value.trim(),
      Apellidos: document.getElementById("apellidos").value.trim(),
      Telefono: document.getElementById("telefono").value.trim(),
      Direccion: document.getElementById("direccion").value.trim(),
      Cargo: document.getElementById("cargo").value.trim(),
      Nombre_Usuario: document.getElementById("nombreUsuario").value.trim(),
      Contraseña: document.getElementById("contraseña").value.trim(),
      Rol: document.getElementById("rol").value,
      Estado: document.getElementById("estado").value === "1"
    };

    try {
      const res = await fetch(`${apiUrlUsuario}/editar`, {

        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioEditado)
      });

      if (!res.ok) throw new Error("No se pudo actualizar el usuario.");

      Swal.fire({
        icon: "success",
        title: "Actualizado correctamente",
        text: "Los datos del usuario fueron modificados con éxito.",
        timer: 2000,
        showConfirmButton: false
      }).then(() => window.location.href = "/html/usuarios.html");

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al actualizar: " + err.message,
      });
    }
  });
});
