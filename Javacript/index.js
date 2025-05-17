document.addEventListener("DOMContentLoaded", () => {
  const userInput   = document.getElementById("username");
  const pwdInput    = document.getElementById("passwordLogin");
  const rememberCh  = document.getElementById("rememberMe");
  const loginError  = document.getElementById("loginError");
  const goRegister  = document.getElementById("goRegister");
  const form        = document.getElementById("loginForm");

  
  const saved = JSON.parse(localStorage.getItem("solusoft_user") || "null");
  const remember = localStorage.getItem("rememberMe") === "true";
  if (remember && saved) {
    userInput.value  = saved.identificacion;
    pwdInput.value   = saved.password;
    rememberCh.checked = true;
  }


  document.querySelectorAll(".toggle-password").forEach(btn => {
    btn.addEventListener("click", () => {
      const tgt = document.getElementById(btn.dataset.target);
      const icon = btn.querySelector("i");
      if (tgt.type === "password") {
        tgt.type = "text";
        icon.classList.replace("bi-eye","bi-eye-slash");
      } else {
        tgt.type = "password";
        icon.classList.replace("bi-eye-slash","bi-eye");
      }
    });
  });

  
  form.addEventListener("submit", e => {
    e.preventDefault();
    loginError.textContent = "";

    
    const registered = JSON.parse(localStorage.getItem("solusoft_user") || "null");
    if (!registered) {
      loginError.textContent = "No hay ningún usuario registrado.";
      return;
    }

    const u = userInput.value.trim();
    const p = pwdInput.value;

    if (u === registered.identificacion && p === registered.password) {
      
      if (rememberCh.checked) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.setItem("rememberMe", "false");
        localStorage.removeItem("solusoft_user"); 
       
      }
    
      window.location.href = "/html/venta.html";
    } else {
      loginError.textContent = "Usuario o contraseña incorrectos.";
    }
  });

 
  goRegister.addEventListener("click", () => {
    window.open("/html/registrouser.html", "_blank");
  });
});
