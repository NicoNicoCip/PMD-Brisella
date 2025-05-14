const { createElement } = require("react");

//@ts-check
class AppProductos extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    let type = this.getAttribute("type")
    switch(type) {
      case "oneline": 
        this.onelineProductList() 
        break

      case "spotlight":
        this.spotlightProductList()
        break;

    }
  }

  onelineProductList() {
    let leftButton = createElement("button")
    leftButton.setAttribute("leftbtn","")
    let rightButton = createElement("button")
    rightButton.setAttribute("rightbtn","")
    let scrollbar = createElement("span")
    scrollbar.setAttribute("scrollbar","")
  }

  wrappedProductList() {

  }
}

// /\ Easy-er
// | to
//\/ HARD
// TODO: Footer elements
// TODO: src atribute funccionalaty and loading from json
// TODO: html to json parser
// TODO: cookies
// TODO: cart area
// TODO: favourites area
// TODO: cookies popup
// TODO: registering

// FIX: product images and buttons sizes

class AppProducto extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    let image = this.getElementsByTagName("img")[0]
    let paragraph = this.getElementsByTagName("p")[0]
    paragraph.setAttribute("onclick", "this.classList.toggle('expanded')")
    paragraph.classList.add("paragraph")
    this.getElementsByTagName("img")[0].remove()

    let rest = this.innerHTML
    let buttons = /*html*/`
      <div id="fragrancias">
        <app-tooltip data="Fragrancia Naranja" v-offset="-70"><button><img src="/PMD-Brisella/img/naranja.png"></button></app-tooltip>
        <app-tooltip data="Fragrancia Menta" v-offset="-70"><button><img src="/PMD-Brisella/img/menta.png"></button></app-tooltip>
        <app-tooltip data="Fragrancia Vainilla" v-offset="-70"><button><img src="/PMD-Brisella/img/vainilla.png"></button></app-tooltip>
        <app-tooltip data="Fragrancia Rosa" v-offset="-70"><button><img src="/PMD-Brisella/img/rosa.png"></button></app-tooltip>
      </div>
      <div id="compras">
        <button><p>Anadir a la cesta</p><img src="/PMD-Brisella/img/carrito_white.png"></button>
        <app-tooltip data="Anadir a favoritos" v-offset="12"><button><img src="/PMD-Brisella/img/favoritos.png"></button></app-tooltip>
      </div>
    `

    window.addEventListener("load", () => {this.setInner(image,rest,buttons)})
    window.addEventListener("resize", () => {this.setInner(image,rest,buttons)})
  }

  setInner(image, rest, buttons) {
    if(this.getAttribute("type") == "page") {
      this.innerHTML = ''

      if(window.innerWidth >= 960) {
        this.innerHTML = /*html*/`
        <table>
          <td>`+ image.outerHTML + /*html*/`</td>
          <td></td>
          <td>
            `+ rest + buttons + /*html*/`
          </td>
        </table>
        `
      } else {
        this.innerHTML = /*html*/`
        <table>
          <tr>`+ image.outerHTML + /*html*/`</tr>
          <tr>
            `+ rest + buttons + /*html*/`
          </tr>
        </table>
        `
      }
    } else {
      this.innerHTML =/*html*/`
        ${rest}
        ${image.outerHTML}
        <div id="compras">
          <button><p>Anadir a la cesta</p><img src="/PMD-Brisella/img/carrito_white.png"></button>
          <app-tooltip data="Anadir a favoritos" v-offset="12"><button><img src="/PMD-Brisella/img/favoritos.png"></button></app-tooltip>
        </div>
      `
    }
  }
}

class AppColorwheel extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
  }
}

customElements.define("app-producto", AppProducto);
customElements.define("app-colorwheel", AppColorwheel);
customElements.define("app-productos", AppProductos);
