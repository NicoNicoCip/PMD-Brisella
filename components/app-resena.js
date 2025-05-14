class AppResena extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    let nombre = new String(this.getElementsByTagName("nombre")[0].innerHTML)
    let fecha = new String(this.getElementsByTagName("fecha")[0].innerHTML)
    let puntos = new Number(this.getElementsByTagName("puntos")[0].innerHTML)
    let mensaje = new String(this.getElementsByTagName("mensaje")[0].innerHTML)
    let producto = new String(this.getElementsByTagName("producto")[0].innerHTML)

    this.innerHTML = ''

    let star = '★';
    puntos = puntos < 0 ? 0 : puntos > 5 ? 5 : puntos
    let wholeScode = parseInt(puntos)
    let restScore = puntos % 1

    let finalScode = ''
    for(let i = 0; i < wholeScode; i++) {
      finalScode += `<p style="color: rgba(255, 255, 255, 1)">${star}</p>`
    }

    if(restScore > 0)
      finalScode += `<p style="color: rgba(255, 255, 255, ${restScore})">${star}</p>`

    this.innerHTML = /* html */`
    <p>${nombre}</p>
    <p>${fecha}</p>
    <div class="inline">${finalScode}</div>
    <p>${mensaje}</p>
    <p>${producto}</p>
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