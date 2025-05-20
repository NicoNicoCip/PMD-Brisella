document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("hasAcceptedCookies"))
    return

  let userdata = JSON.parse(String(localStorage.getItem("usuario")))
  if (!userdata)
    return
  else
    closeRegisterPopup()
})

function closeRegisterPopup() {
  let popup = document.getElementById("registerPopup")?.parentNode
  if (!popup) return
  popup.style.opacity = 0;
  setTimeout(() => popup.remove(), 200)
}

function confirmaDatos() {
  let popup = document.getElementById("registerPopup")
  if (!popup) return

  let warnings = document.getElementById("warnings")
  if (!warnings) return

  warnings.innerHTML = ""

  let email = document.getElementById("email")
  if (!email) return

  if (email.value === "")
    warnings.innerHTML += "<p>* El email es vacio.</p>"
  else if (!validateEmail(email.value))
    warnings.innerHTML += "<p> * El email no es valido. </p>"

  let password = document.getElementById("password")
  if (!password) return

  if (password.value === "")
    warnings.innerHTML += "<p> * La contrasena es vacia.</p>"
  else if (password.value.length < 8)
    warnings.innerHTML += "<p> * La contrasena no es suficientamente larga. Tiene que tener minimo 8 caracteres.</p>"

  let pdp = document.getElementById("pdp")
  if (!pdp) return

  if (!pdp.checked)
    warnings.innerHTML += "<p> * Tienes que acceptar nuestra politica de privacidad.</p>"

  let cc = document.getElementById("cc")
  if (!cc) return

  if (!localStorage.getItem("hasAcceptedCookies")) {
    warnings.innerHTML += "<p> * Si no acceptas los cookies, estos datos se van a perder.</p>"
    return
  }

  let usuario = {
    correo: email.value,
    contrasena: password.value,
    privacidad: pdp.checked,
    newsletter: cc.checked
  }

  if (!usuario.correo || !usuario.contrasena || !usuario.privacidad)
    return;
  else {
    localStorage.setItem("usuario", JSON.stringify(usuario));
    closeRegisterPopup()
  }
}

function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}