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
          <p id="navName"><b><a href="/PMD-Brisella/pages/header/sobreBrisella.html">BRISELLA</a></b></p>
        
          <div class="navPages">
            <a href="/PMD-Brisella/pages/header/productos.html">Productos</a>
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
            <a href="#"><app-tooltip data="Instagram"><img src="/PMD-Brisella/img/instagram.png" alt="instagram"></app-tooltip></a>
            <a href="#"><app-tooltip data="TikTok"><img src="/PMD-Brisella/img/tiktok.png" alt="tiktok"></app-tooltip></a>
            <a href="#"><app-tooltip data="Twitter"><img src="/PMD-Brisella/img/twitter.png" alt="twitter"></app-tooltip></a>
          </div>
          <div class="section">
            <p>Registrarse</p>
            <a href="#">Iniciar Sesion</a>
          </div>
          <img src="/PMD-Brisella/img/Brisella_logo_blanco.png">
        </div>
      </footer>
    `
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

document.addEventListener("DOMContentLoaded", () => {
  makeBurgerListeners()
})

customElements.define("app-mainpage", MainPage)