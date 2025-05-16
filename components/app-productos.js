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
    //@ts-ignore
    if (!["oneline", "spotlight", "wrap"].includes(type)) {
      type = "wrap";
      this.setAttribute("type", type);
    }
  }

  onelineProductList() {
    this.style.display = "inline-flex";
  }

  spotlightProductList() {

  }
}

// TODO: cart area
// TODO: favourites area
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
    let rest = new String(this.innerHTML)
    let buttons = /*html*/`

        <div id="fragrancias">
          <app-tooltip data="Añadir a favoritos" v-offset="12">
            <button name="infavs" value="1"><img src="/PMD-Brisella/img/favoritos.png"></button>
          </app-tooltip>
          <app-tooltip data="Fragrancia Naranja" v-offset="-70">
            <button><img src="/PMD-Brisella/img/naranja.png"></button>
          </app-tooltip>
          <app-tooltip data="Fragrancia Menta" v-offset="-70">
            <button name="frag" value="1"><img src="/PMD-Brisella/img/menta.png"></button>
          </app-tooltip>
          <app-tooltip data="Fragrancia Vainilla" v-offset="-70">
            <button name="frag" value="2"><img src="/PMD-Brisella/img/vainilla.png"></button>
          </app-tooltip>
          <app-tooltip data="Fragrancia Rosa" v-offset="-70">
            <button name="frag" value="3"><img src="/PMD-Brisella/img/rosa.png"></button>
          </app-tooltip>
        </div>
        <div id="compras">
          <button name="incart" value="1"><p>Anadir a la cesta</p><img src="/PMD-Brisella/img/carrito_white.png"></button>
          <div id="addRemove">
            <app-tooltip data="Quitar"><button name="remove" value="1"><img src="/PMD-Brisella/img/minus.png"></button></app-tooltip>
            <input type="text" name="count" value="0" maxlength="2">
            <app-tooltip data="Añadir"><button name="add" value="1"><img src="/PMD-Brisella/img/plus.png"></button></app-tooltip>
          </div>
        </div>
    `

    window.addEventListener("load", () => { this.setInner(image, rest, buttons) })
    window.addEventListener("resize", () => { this.setInner(image, rest, buttons) })
  }

  setInner(image, rest, buttons) {
    if (this.getAttribute("type") == "page") {
      if (window.innerWidth >= 960) {
        this.innerHTML = ''
        this.innerHTML = /*html*/`
        <table>
          <tr>
          <td>${image.outerHTML}</td>
          <td>${rest}${buttons}</td>
          </tr>
        </table>
        `
      } else {
        this.innerHTML = ''
        this.innerHTML = /*html*/`
        <table>
          <tr><td>${image.outerHTML}</td></tr>
          <tr><td>${rest}${buttons}</td></tr>
        </table>
        `
      }
    } else {
      this.innerHTML =/*html*/`
      ${rest}
      <app-tooltip data="Añadir a favoritos" v-offset="12"><button name="infavs" value="1"><img src="/PMD-Brisella/img/favoritos.png"></button></app-tooltip>
      ${image.outerHTML}
      <div class="compras">
        <button name="incart" value="1"><p>Anadir a la cesta</p><img src="/PMD-Brisella/img/carrito_white.png"></button>
        <div id="addRemove">
          <app-tooltip data="Quitar"><button name="remove" value="1"><img src="/PMD-Brisella/img/minus.png"></button></app-tooltip>
          <input type="text" name="count" value="0" maxlength="2">
          <app-tooltip data="Añadir"><button name="add" value="1"><img src="/PMD-Brisella/img/plus.png"></button></app-tooltip>
        </div>         
      </div>
      `
    }
  }
}

customElements.define("app-producto", AppProducto);
customElements.define("app-productos", AppProductos);
