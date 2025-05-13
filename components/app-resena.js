class AppResena extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    let nombre = new String(this.getElementsByTagName("nombre")[0].innerHTML)
    let fecha = new String(this.getElementsByClassName("fecha")[0].innerHTML)
    let puntos = new Number(this.getElementsByClassName("puntos")[0].innerHTML)
    let mensaje = new String(this.getElementsByClassName("mensaje")[0].innerHTML)

    this.innerHTML = ''

    this.innerHTML = /* html */`
    <div class="centered">
      <>
    </div>
    `
  }
}

/*

<resena>
  <nombre>
  <fecha>
  <puntos>
  <mensaje>
<resena>
*/

customElements.define("app-resena", AppResena);