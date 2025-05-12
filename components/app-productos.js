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

    this.innerHTML = /*html*/`
    <table>
      <td>`+ image.outerHTML + /*html*/`</td>
      <td>
        `+ this.innerHTML + /*html*/`
        
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
      </td>
    </table>
    `
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