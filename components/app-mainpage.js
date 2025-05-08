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
            <a href="/PMD-Brisella/pages/header/specialPrices.html" id="ofertas">Special Prices</a>
          </div>
        
          <div class="navOpts">
            <app-tootlip data="Favoritos">
              <a href="/PMD-Brisella/pages/header/favoritos.html">
                <img src="/PMD-Brisella/img/favoritos.png" alt="fav" id="normalIcon">
              </a>
            </app-tootlip>
            <app-tootlip data="Contactarnos">
              <a href="/PMD-Brisella/pages/header/copntactarnos.html">
                <img src="/PMD-Brisella/img/contactoarnos.png" alt="con" id="normalIcon">
              </a>
            </app-tootlip>
            <app-tootlip data="Carrito">
              <a href="/PMD-Brisella/pages/header/carito.html">
                <img src="/PMD-Brisella/img/carito.png" alt="car" id="normalIcon">
              </a>
            </app-tootlip>
          </div>
        </div>

        <div id="burgerMenu">
          <div id="burgerIcon">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div>
            <div class="navOpts">
              <app-tootlip data="Favoritos">
                <a href="/PMD-Brisella/pages/header/favoritos.html">
                  <img src="/PMD-Brisella/img/favoritos.png" alt="fav" id="normalIcon">
                </a>
              </app-tootlip>
              <app-tootlip data="Contactarnos">
                <a href="/PMD-Brisella/pages/header/copntactarnos.html">
                  <img src="/PMD-Brisella/img/contactoarnos.png" alt="con" id="normalIcon">
                </a>
              </app-tootlip>
              <app-tootlip data="Carrito">
                <a href="/PMD-Brisella/pages/header/carito.html">
                  <img src="/PMD-Brisella/img/carito.png" alt="car" id="normalIcon">
                </a>
              </app-tootlip>
            </div>
            <div class="navPages">
              <a href="/PMD-Brisella/index.html">Inicio</a>
              <a href="/PMD-Brisella/pages/header/productos.html">Productos</a>
              <a href="/PMD-Brisella/pages/header/novedades.html">Novedades</a>
              <a href="/PMD-Brisella/pages/header/specialPrices.html">Special Prices</a>
            </div>
          </div>
        </div>

        <script scr="/PMD-Brisella/components/app-tooltip.js"></script>
      </header>
      <main>
        <div id="mainBody">
    `+ 
      this.innerHTML
    + /*html*/`
        </div>
      </main>
      <footer>
        <div id="footbar">
          <div id=secion1>
            <p>Title</p>
            <a href="/PMD-Brisella/index.html">Inicio</a>
            <a href="/PMD-Brisella/pages/footer/devoluciones.html">Devoluciones</a>
            <a href="/PMD-Brisella/pages/footer/politicaPrivacidad.html">Politica de privacidad</a>
            <a href="/PMD-Brisella/pages/footer/terminosYCondiciones.html">Terminos y condiciones</a>
            <a href="/PMD-Brisella/pages/footer/registrarse.html">Registrarse</a>
          </div>
          <div id=section2>
            <p>Title</p>
          </div>
          <div id=section3>
            <p>Title</p>
          </div>

          <img src="/PMD-Brisella/img/brisellaLogo.png" alt="Logo" width="128px" height="128px">
        </div>
      </footer>
    `
  }
}

customElements.define("app-mainpage", MainPage)