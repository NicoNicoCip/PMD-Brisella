//@ts-check
class AppProductos extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
  }
}
// /\ Easy-er
// | to
//\/ HARD
// TODO: add a button that lets you switch from list to page mode
// TODO: The rest of the buttons and their styles
// TODO: Footer elements
// TODO: src atribute funccionalaty and loading from json
// TODO: html to json parser
// TODO: cookies
// TODO: cart area
// TODO: favourites area
// TODO: cookies popup
// TODO: registering

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
        <button><img src="/PMD-Brisella/img/favoritos.png"></button>
        <button><img src="/PMD-Brisella/img/favoritos.png"></button>
        <button><img src="/PMD-Brisella/img/favoritos.png"></button>
        <button><img src="/PMD-Brisella/img/favoritos.png"></button>
      </div>
      <div id="compras">
        <button><p>Anadir a la cesta</p><img src="/PMD-Brisella/img/carito_white.png"></button>
        <button><img src="/PMD-Brisella/img/favoritos.png"></button>
      </div>
    `

    window.addEventListener("load", () => {this.setInner(image,rest,buttons)})
    window.addEventListener("resize", () => {this.setInner(image,rest,buttons)})
  }

  setInner(image, rest, buttons) {
    if(this.parentElement?.getAttribute("type") == "page") {
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
      this.innerHTML = image.outerHTML + /*html*/`
        <div id="compras">
          <button><p>Anadir a la cesta</p><img src="/PMD-Brisella/img/carito_white.png"></button>
          <button><img src="/PMD-Brisella/img/favoritos.png"></button>
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