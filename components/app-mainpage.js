//@ts-check
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
            <a href="/PMD-Brisella/pages/header/novedades.html">Novedades</a>
            <a href="/PMD-Brisella/pages/header/specialPrices.html" class="velvet">Special Prices</a>
          </div>
        
          <div class="navOpts">
            <a href="/PMD-Brisella/pages/header/favoritos.html">
              <app-tooltip data="Favoritos"><img src="/PMD-Brisella/img/favoritos_white.png" alt="fav"></app-tootlip>
            </a>
            
            <a href="/PMD-Brisella/pages/header/copntactarnos.html">
              <app-tooltip data="Contactarnos"><img src="/PMD-Brisella/img/contactoarnos_white.png" alt="con"></app-tootlip>
            </a>

            <a href="/PMD-Brisella/pages/header/carito.html">
              <app-tooltip data="Carrito"><img src="/PMD-Brisella/img/carrito_white.png" alt="car"></app-tootlip>
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
              <a href="/PMD-Brisella/pages/header/favoritos.html">
                <app-tooltip data="Favoritos"><img src="/PMD-Brisella/img/favoritos_white.png" alt="fav"></app-tooltip>
              </a>
              
              <a href="/PMD-Brisella/pages/header/copntactarnos.html">
                <app-tooltip data="Contactarnos"><img src="/PMD-Brisella/img/contactoarnos_white.png" alt="con"></app-tooltip>
              </a>

              <a href="/PMD-Brisella/pages/header/carito.html">
                <app-tooltip data="Carrito"><img src="/PMD-Brisella/img/carrito_white.png" alt="car"></app-tooltip>
              </a>
            </div>
            <div class="navPages">
              <a href="/PMD-Brisella/index.html">Inicio</a>
              <a href="/PMD-Brisella/pages/header/productos.html">Productos</a>
              <a href="/PMD-Brisella/pages/header/novedades.html">Novedades</a>
              <a href="/PMD-Brisella/pages/header/specialPrices.html" class="velvet">Special Prices</a>
            </div>
          </div>
        </div>
      </header>
      ${this.innerHTML}
      <footer>
        <div id="footbar">
          <div class="section">
            <p>Ayuda</p>
            <a href="#">Aviso legal</a>
            <a href="/PMD-Brisella/pages/footer/politicaPrivacidad.html">Politica de privacidad</a>
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
              <a href="#"><app-tooltip data="Instagram"><img src="/PMD-Brisella/img/instagram.png" alt="instagram"></app-tooltip></a>
              <a href="#"><app-tooltip data="TikTok"><img src="/PMD-Brisella/img/tiktok.png" alt="tiktok"></app-tooltip></a>
              <a href="#"><app-tooltip data="Twitter"><img src="/PMD-Brisella/img/twitter.png" alt="twitter"></app-tooltip></a>
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
        <div id="oneline">
          <h2>Register</h2>
          <button onclick="closeRegisterPopup()">X</button>
        </div>
        <div id="textinputs">
          <p>¿Quieres recibir descuentos y ofertas especiales?</p>
          <div id="multiline">
            <input type="email" name="email" id="email" placeholder="Correo ELectorico">
            <input type="password" name="password" id="password" placeholder="Contrasena">
          </div>
        </div>
        <div id="oneline">
          <input type="checkbox" name="pdp" id="pdp" value="1">
          <p>He leido y accepto la <i><a href="#">politica de privacidad.</a></i></p>
        </div>
        <div id="oneline">
          <input type="checkbox" name="cc" id="cc" value="1">
          <p>Accepto recibir comunicaciones comerciales.</p>
        </div>
        <div id="warnings"></div>
        <button onclick="confirmaDatos()">Suscribirme</button>
      </div>
    </app-popup>
    `
    let popups = document.getElementById("popups")
    if (popups && !popups.querySelector('#registerPopup')) {
      popups.insertAdjacentHTML("beforeend", popup);
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