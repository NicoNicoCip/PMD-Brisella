
class MainPage extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.innerHTML =
    /*html*/`
      <header>
        <div id="navbar">
          <p id="navName"><b><a href="/PMD-Brisella/index.html">BRISELLA</a></b></p>
        
          <div class="navPages">
            <a href="/PMD-Brisella/pages/productos.html">Productos</a>
            <a href="/PMD-Brisella/pages/novedades.html">Novedades</a>
            <a href="/PMD-Brisella/pages/specialPrices.html" class="velvet">Special Prices</a>
          </div>
        
          <div class="navOpts">
            <a href="/PMD-Brisella/pages/copntactarnos.html">
              <app-tooltip data="Contactarnos"><img src="/PMD-Brisella/img/contactoarnos_white.png" alt="con"></app-tooltip>
            </a>

            <a href="/PMD-Brisella/pages/favoritos.html">
              <app-tooltip data="Favoritos"><img src="/PMD-Brisella/img/favoritos_white.png" alt="fav"></app-tooltip>
            </a>

            <a href="/PMD-Brisella/pages/carrito.html">
              <app-tooltip data="Carrito"><img src="/PMD-Brisella/img/carrito_white.png" alt="car"></app-tooltip>
            </a>
          </div>
        </div>

        <div class="burgerMenu">

          <div class="burgerIcon">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div>
            <div class="navOpts">
              <a href="/PMD-Brisella/pages/copntactarnos.html">
                <app-tooltip data="Contactarnos"><img src="/PMD-Brisella/img/contactoarnos_white.png" alt="con"></app-tooltip>
              </a>

              <a href="/PMD-Brisella/pages/favoritos.html">
                <app-tooltip data="Favoritos"><img src="/PMD-Brisella/img/favoritos_white.png" alt="fav"></app-tooltip>
              </a>

              <a href="/PMD-Brisella/pages/carrito.html">
                <app-tooltip data="Carrito"><img src="/PMD-Brisella/img/carrito_white.png" alt="car"></app-tooltip>
              </a>
            </div>
            <div class="navPages">
              <a href="/PMD-Brisella/index.html">Inicio</a>
              <a href="/PMD-Brisella/pages/productos.html">Productos</a>
              <a href="/PMD-Brisella/pages/novedades.html">Novedades</a>
              <a href="/PMD-Brisella/pages/specialPrices.html" class="velvet">Special Prices</a>
            </div>
          </div>
        </div>
      </header>
      ${this.innerHTML}
      <footer>
        <div id="footbar">
          <div class="section">
            <p>Ayuda</p>
            <a href="/PMD-Brisella/pages/extras/avisoLegal.html">Aviso legal</a>
            <a href="#">Politica de privacidad</a>
            <a href="#">Politica de cookies</a>
            <a href="#">Terminos y condiciones</a>
          </div>
          <div class="section">
            <p>Empresa</p>
            <a href="#">Blog</a>
            <a href="#">Contactarnos</a>
          </div>
          <div class="section">
            <p>Redes Sociales</p>
            <div class="inline">
              <a href="https://www.instagram.com/brisella.panuelos?igsh=dTAwc2E2bzIzYThs&utm_source=qr"><app-tooltip data="Instagram"><img src="/PMD-Brisella/img/instagram.png" alt="instagram"></app-tooltip></a>
              <a href="https://www.tiktok.com/@brisella.panuelos?_t=ZN-8wUiuCkKtUs&_r=1"><app-tooltip data="TikTok"><img src="/PMD-Brisella/img/tiktok.png" alt="tiktok"></app-tooltip></a>
              <a href="https://x.com/brisellaoficial?s=21"><app-tooltip data="Twitter"><img src="/PMD-Brisella/img/twitter.png" alt="twitter"></app-tooltip></a>
            </div>
            <p>Registrarse</p>
            <a name="session">Iniciar Sesion</a>
          </div>
          <img src="/PMD-Brisella/img/Brisella_logo_blanco.png">
        </div>
      </footer>
    `

    let registerPopup = this.querySelector('a[name="session"]')
    //@ts-ignore
    registerPopup.style.cursor = "pointer"
    if (registerPopup) registerPopup.addEventListener("click", () => {
      this.registerPopup()
    })
  }

  registerPopup() {
    let popup =  /* html */`
    <app-popup class="centerer">
      <div id="registerPopup">
        <div id="registerPopupheader">
          <div id="oneline">
            <h2>Registrar</h2>
            <button onclick="closeRegisterPopup()">X</button>
          </div>
        </div>
        <div id=registerPopupBody>
          <div id="textinputs">
            <p>¿Quieres recibir descuentos y ofertas especiales?</p>
            <div id="multiline">
              <input type="email" name="email" id="email" placeholder="Correo Electorico">
              <input type="password" name="password" id="password" placeholder="Contrasenna">
            </div>
          </div>
          <div id="oneline">
            <input type="checkbox" name="pdp" id="pdp" value="1">
            <pre>He leido y accepto la <i><a href="#">politica de privacidad.</a></i></pre>
          </div>
          <div id="oneline">
            <input type="checkbox" name="cc" id="cc" value="1">
            <p>Acepto recibir comunicaciones comerciales.</p>
          </div>
          <div id="warnings"></div>
          <button onclick="confirmaDatos()">Aceptar</button>
        </div>
      </div>
    </app-popup>
    `
    let popups = document.getElementById("popups")
    if (popups && !popups.querySelector('#registerPopup')) {
      popups.insertAdjacentHTML("beforeend", popup);
      this.dragElement(document.getElementById("registerPopup"))
    } else {
      closeRegisterPopup()
    }
  }

  dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      // if present, the header is where you move the DIV from:
      //@ts-ignore
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
}

function makeBurgerListeners() {
  const burgerMenu = document.querySelector('.burgerMenu');
  const burgerIcon = document.querySelector('.burgerIcon');
  if (!burgerMenu || !burgerIcon) {
    alert("The burger menu is null")
    return;
  }

  burgerIcon.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    //@ts-ignore
    if (!burgerMenu.contains(e.target) && burgerMenu.classList.contains('active')) {
      burgerMenu.classList.remove('active');
    }
  });
}

function makeFaviconThemeChange() {
  function setFavicon(theme = "") {
    const favicon = document.getElementById("favicon")
    if (!favicon) return

    const isDark = theme === "dark"
    //@ts-ignore
    favicon.href = isDark ? "/PMD-Brisella/img/Brisella_logo_blanco.png" : "/PMD-Brisella/img/Brisella_logo_Negro.png"
  }

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
  setFavicon(mediaQuery.matches ? "dark" : "light")

  mediaQuery.addEventListener("change", (e) => {
    setFavicon(e.matches ? "dark" : "light")
  })
}

document.addEventListener("DOMContentLoaded", () => {
  makeFaviconThemeChange()
  makeBurgerListeners()
})

customElements.define("app-mainpage", MainPage)