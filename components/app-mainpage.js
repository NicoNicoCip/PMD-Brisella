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
            <app-tootlip data="Favoritos">
              <a href="/PMD-Brisella/pages/header/favoritos.html">
                <img src="/PMD-Brisella/img/favoritos.png" alt="fav">
              </a>
            </app-tootlip>
            <app-tootlip data="Contactarnos">
              <a href="/PMD-Brisella/pages/header/copntactarnos.html">
                <img src="/PMD-Brisella/img/contactoarnos.png" alt="con">
              </a>
            </app-tootlip>
            <app-tootlip data="Carrito">
              <a href="/PMD-Brisella/pages/header/carito.html">
                <img src="/PMD-Brisella/img/carito.png" alt="car">
              </a>
            </app-tootlip>
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
              <app-tootlip data="Favoritos">
                <a href="/PMD-Brisella/pages/header/favoritos.html">
                  <img src="/PMD-Brisella/img/favoritos.png" alt="fav">
                </a>
              </app-tootlip>
              <app-tootlip data="Contactarnos">
                <a href="/PMD-Brisella/pages/header/copntactarnos.html">
                  <img src="/PMD-Brisella/img/contactoarnos.png" alt="con">
                </a>
              </app-tootlip>
              <app-tootlip data="Carrito">
                <a href="/PMD-Brisella/pages/header/carito.html">
                  <img src="/PMD-Brisella/img/carito.png" alt="car">
                </a>
              </app-tootlip>
            </div>
            <div class="navPages">
              <a href="/PMD-Brisella/index.html">Inicio</a>
              <a href="/PMD-Brisella/pages/header/productos.html">Productos</a>
              <a href="/PMD-Brisella/pages/header/novedades.html">Novedades</a>
              <a href="/PMD-Brisella/pages/header/specialPrices.html" class="velvet">Special Prices</a>
            </div>
          </div>
        </div>

        <script src="/PMD-Brisella/components/app-tooltip.js"></script>
      </header>
    `+ 
      this.innerHTML
    + /*html*/`
      <footer>
        <div id="footbar">
          <div class="section">
            <p>Title</p>
            <a href="/PMD-Brisella/index.html">Inicio</a>
            <a href="/PMD-Brisella/pages/footer/devoluciones.html">Devoluciones</a>
            <a href="/PMD-Brisella/pages/footer/politicaPrivacidad.html">Politica de privacidad</a>
            <a href="/PMD-Brisella/pages/footer/terminosYCondiciones.html">Terminos y condiciones</a>
            <a href="/PMD-Brisella/pages/footer/registrarse.html">Registrarse</a>
          </div>
          <div class="section">
            <p>Title</p>
          </div>
          <div class="section">
            <p>Title</p>
          </div>

          <img src="/PMD-Brisella/img/brisellaLogo.png" width="128px" height="128px">
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