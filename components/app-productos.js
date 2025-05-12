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

class AppProducto extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    let image = this.getElementsByTagName("img")[0]
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
        <button><p>Anadir a la cesta</p><img src="/PMD-Brisella/img/favoritos.png"></button>
        <button><img src="/PMD-Brisella/img/favoritos.png"></button>
      </div>
    `
    window.addEventListener("load", () => {
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
    })

    window.addEventListener("resize", () => {
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
    })
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