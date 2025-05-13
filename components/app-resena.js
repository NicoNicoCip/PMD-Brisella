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

    let star = '☆';
    let wholeScode = 0

    let finalScode = 0

    this.innerHTML = /* html */`
    <div class="centered">
      <p>${nombre}</p>
      <p>${fecha}</p>
      <p>${finalScode}</p>
      <p>${mensaje}</p>
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