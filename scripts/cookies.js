document.addEventListener("DOMContentLoaded", cookiesLoad)

function cookiesLoad() {
  let hasAcceptedCookies = localStorage.getItem("hasAcceptedCookies")
  if(hasAcceptedCookies) cookiesDelete();
  document.querySelectorAll('a').forEach((element) => {
    element.setAttribute("onmousedown", "event.preventDefault()")
  })
}

function cookiesDelete() {
  let popup = document.getElementsByTagName("app-popup")[0]
  popup.style.opacity = 0;
  setTimeout(() => popup.remove(), 200)
}

function cookiesAccept() {
  localStorage.setItem("hasAcceptedCookies", true)
  cookiesDelete()
  window.location.reload()
}