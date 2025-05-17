src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
crossorigin="anonymous"
src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+"
crossorigin="anonymous"


    document.addEventListener("DOMContentLoaded", () => {
  const form        = document.getElementById("registerForm");
  const submitBtn   = document.getElementById("submitBtn");
  const pwdField    = document.getElementById("password");
  const confirmField= document.getElementById("confirmPassword");
  const strengthBar = document.getElementById("strengthBar");
  const strengthTxt = document.getElementById("strengthText");

  const campos = [
    { id:"nombre", regla:/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{2,50}$/, mensaje:"Solo letras, mínimo 2 caracteres." },
    { id:"identificacion", regla:/^\d{5,15}$/, mensaje:"5 a 15 dígitos numéricos." },
    { id:"correo", regla:/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, mensaje:"Email inválido." },
    { id:"telefono", regla:/^\d{7,15}$/, mensaje:"7 a 15 dígitos numéricos." }
  ];

  function validarCampo({id,regla,mensaje}){
    const i=document.getElementById(id), e=document.getElementById(id+"Error");
    if(!regla.test(i.value.trim())){
      i.classList.add("is-invalid"); i.classList.remove("is-valid");
      e.textContent=mensaje; return false;
    }
    i.classList.remove("is-invalid"); i.classList.add("is-valid");
    e.textContent=""; return true;
  }

  campos.forEach(c=>{
    document.getElementById(c.id).addEventListener("input",()=>{
      validarCampo(c); toggle();
    });
  });

  // fuerza contraseña
  pwdField.addEventListener("input",()=>{
    let v=pwdField.value, s=0;
    if(v.length>=6) s++; if(/[A-Z]/.test(v)) s++;
    if(/\d/.test(v)) s++; if(/[^A-Za-z0-9]/.test(v)) s++;
    const pct=(s/4)*100;
    strengthBar.style.width=pct+"%"; strengthBar.className="progress-bar";
    if(s<=1) {strengthBar.classList.add("bg-danger"); strengthTxt.textContent="Débil";}
    else if(s<=3){strengthBar.classList.add("bg-warning"); strengthTxt.textContent="Media";}
    else {strengthBar.classList.add("bg-success"); strengthTxt.textContent="Muy segura";}
    toggle();
  });

  // confirmar
  function validarConfirm(){
    const e=document.getElementById("confirmPasswordError");
    if(pwdField.value && pwdField.value===confirmField.value){
      confirmField.classList.remove("is-invalid");
      confirmField.classList.add("is-valid");
      e.textContent=""; return true;
    }
    confirmField.classList.add("is-invalid");
    confirmField.classList.remove("is-valid");
    e.textContent="¡Las contraseñas deben coincidir!";
    return false;
  }
  confirmField.addEventListener("input",()=>{ validarConfirm(); toggle(); });

 
  function toggle(){
    const okText = campos.every(validarCampo);
    const okPwd  = parseInt(strengthBar.style.width)>=50;
    const okCon  = validarConfirm();
    submitBtn.disabled = !(okText && okPwd && okCon);
  }


  document.querySelectorAll(".toggle-password").forEach(b=>{
    b.addEventListener("click",()=>{
      const inp=document.getElementById(b.dataset.target), i=b.querySelector("i");
      if(inp.type==="password"){ inp.type="text"; i.className="bi bi-eye-slash"; }
      else { inp.type="password"; i.className="bi bi-eye"; }
    });
  });

 
  form.addEventListener("submit", e=>{
    e.preventDefault();
    const user = {
      nombre: document.getElementById("nombre").value.trim(),
      identificacion: document.getElementById("identificacion").value.trim(),
      correo: document.getElementById("correo").value.trim(),
      telefono: document.getElementById("telefono").value.trim(),
      password: pwdField.value
    };
    localStorage.setItem("solusoft_user", JSON.stringify(user));
    window.location.href = "/html/index.html";
  });

  toggle();
});

    
   

  
 
 