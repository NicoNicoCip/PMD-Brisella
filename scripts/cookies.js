function cookiesLoad() {
  let hasAcceptedCookies = localStorage.getItem("hasAcceptedCookies")
  if(hasAcceptedCookies) cookiesDelete();
}

function cookiesDelete() {
  let popup = document.getElementsByTagName("app-popup")[0]
  popup.style.opacity = 0;
  setTimeout(() => popup.remove(), 200)
}

function cookiesAccept() {
  localStorage.setItem("hasAcceptedCookies", true);
  cookiesDelete();
}