function closeContactarnosPopup() {
  let popup = document.getElementById("contactarnosPopup")?.parentNode
  if (!popup) return
  popup.style.opacity = 0;
  setTimeout(() => popup.remove(), 200)
}

function confirmaDatosContactarnos() {
  let popup = document.getElementById("contactarnosPopup")
  if (!popup) return

  let warnings = document.getElementById("warnings")
  if (!warnings) return

  warnings.innerHTML = ""

  let nombre = document.getElementById("nombre")
  if (!nombre) return

  if (nombre.value === "")
    warnings.innerHTML += "<p> * Se va a enviar en anonimo.</p>"

  let email = document.getElementById("contactEmail")
  if (!email) return

  if (email.value === "")
    warnings.innerHTML += "<p>* El email es vacio.</p>"
  else if (!validateEmail(email.value))
    warnings.innerHTML += "<p> * El email no es valido. </p>"

  let mensaje = document.getElementById("textarea")
  if (!mensaje) return

  if (mensaje.value === "")
    warnings.innerHTML += "<p>* No se puede enviar un mensaje vacio.</p>"

  let contactSending = {
    nombre: nombre.value,
    correo: email.value,
    mensaje: mensaje.value
  }

  if (!contactSending.correo || !contactSending.mensaje)
    return;
  else {
    console.log(contactSending)
    closeContactarnosPopup()
  }
}

function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}