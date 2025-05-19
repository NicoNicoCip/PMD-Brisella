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
    let identifier = this.getAttribute("name")
    // name, isInCart, isInFavourites, fragrance, ammount.
    this._data = {
      isInCart: false,
      isInFavourites: false,
      fragrance: 0,
      ammount: 0
    }

    let image = this.getElementsByTagName("img")[0]
    let paragraph = this.getElementsByTagName("p")[0]
    paragraph.setAttribute("onclick", "this.classList.toggle('expanded')")
    paragraph.classList.add("paragraph")
    this.getElementsByTagName("img")[0].remove()
    let rest = new String(this.innerHTML)
    let buttons = /*html*/`
        <div id="fragrancias">
          <app-tooltip data="Fragrancia Naranja" v-offset="-70">
            <button name="frag" value="0"><img src="/PMD-Brisella/img/naranja.png"></button>
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
        <div id="compras" name="compras">
          <button name="incart"><p>Anadir a la cesta</p><img src="/PMD-Brisella/img/carrito_white.png"></button>
          <div id="addRemove">
            <app-tooltip data="Quitar"><button name="remove"><img src="/PMD-Brisella/img/minus.png"></button></app-tooltip>
            <input type="text" name="count" value="0" maxlength="2">
            <app-tooltip data="Añadir"><button name="add"><img src="/PMD-Brisella/img/plus.png"></button></app-tooltip>
          </div>
        </div>
    `
    this._fragrance = 0
    if (this.getAttribute("type") == "page") {
      this.innerHTML = /*html*/`
        <div id="prodImage">
          ${image.outerHTML}
          <app-tooltip data="Añadir a favoritos" v-offset="-70">
            <button id="favs" name="favoritos"><img src="/PMD-Brisella/img/favoritos.png"></button>
          </app-tooltip>
        </div>
        <div id="prodContent">
          ${rest}
          ${buttons}
        </div>
      `

    } else {
      this.innerHTML =/*html*/`
          ${rest}
          ${image.outerHTML}
          <app-tooltip data="Añadir a favoritos" v-offset="-70">
            <button id="favs"><img src="/PMD-Brisella/img/favoritos.png"></button>
          </app-tooltip>
          <div id="compras" name="compras">
            <button name="incart" value="1"><p>Anadir a la cesta</p><img src="/PMD-Brisella/img/carrito_white.png"></button>
            <div id="addRemove">
              <app-tooltip data="Quitar">
                <button name="remove"><img src="/PMD-Brisella/img/minus.png"></button>
              </app-tooltip>
              <input type="text" name="count" value="0" maxlength="2">
              <app-tooltip data="Añadir">
                <button name="add"><img src="/PMD-Brisella/img/plus.png"></button>
              </app-tooltip>
            </div>
          </div>
        `
      this._data.fragrance = -1
    }
    let cartBtn = this.querySelector('button[name="incart"]')

    if (cartBtn) cartBtn.addEventListener("click", () => this.addToCart())

    if (this._data.fragrance != -1) {
      let fragrances = this.querySelectorAll('button[name="frag"]')
      if (fragrances) {
        for (let btn of fragrances) {
          btn.addEventListener("click", () => {

            if (this._data) //@ts-ignore
              this._data.fragrance = btn.value
            this.changeFragrance(fragrances)
          })
        }

        this.changeFragrance(fragrances)
      }
    }

    let favsButton = this.querySelector('button[id="favs"]')
    if (favsButton) this._data.isInFavourites = true;

    let add = this.querySelector('button[name="add"]')
    let input = this.querySelector('input[name="count"]')
    let remove = this.querySelector('button[name="remove"]')
    if (add && input) add.addEventListener("click", () => {
      //@ts-ignore
      if (input.value < 99)
        //@ts-ignore
        input.value++
    })

    if (remove && input) remove.addEventListener("click", () => {
      //@ts-ignore
      if (input.value > 0)
        //@ts-ignore
        input.value--
    })

    if (input) {
      // Optional: set step size and limits
      const min = 0;
      const max = 99;

      input.addEventListener("wheel", (event) => {
        event.preventDefault(); // Prevent page scrolling

        // Convert to number and fallback to 0 if not valid
        //@ts-ignore
        let currentValue = parseInt(input.value) || 0;

        // Check scroll direction
        //@ts-ignore
        if ((event.deltaY > 0 || event.deltaX < 0) && currentValue < max) {
          //@ts-ignore
          input.value = currentValue + 1;
        } 
        //@ts-ignore
        else if ((event.deltaY < 0 || event.deltaX > 0) && currentValue > min) {

          //@ts-ignore
          input.value = currentValue - 1;
        }

        //@ts-ignore
        this._data.ammount = input.value;
      });

      this.addEventListener("mouseover", () => {
        let productData = localStorage.getItem(`${identifier}`)
        if(productData) {
          productData = JSON.parse(productData)
          if(JSON.stringify(this._data) !== productData) {
            localStorage.setItem(`${identifier}`, JSON.stringify(this._data))
          }
        } else {
          localStorage.setItem(`${identifier}`, JSON.stringify(this._data))
        }
      })
    }
  }

  addToCart() {
    if (this._data) {
      this._data.isInCart = true
      let arm = this.querySelector('div[id="addRemove"]')
      //@ts-ignore
      arm.style.display = "flex"
    }
  }

  changeFragrance(frags) {
    for (let btn of frags) {
      btn.style.backgroundColor = "#FFFFFF00"
    }
    if (this._data)
      frags[this._data.fragrance].style.backgroundColor = "#FFFFFF"
  }
}

customElements.define("app-producto", AppProducto);
customElements.define("app-productos", AppProductos);
