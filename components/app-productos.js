//@ts-check

const PRODUCTS_KEY = 'brisella_products';

function getProductsArray() {
  const products = localStorage.getItem(PRODUCTS_KEY);
  return products ? JSON.parse(products) : [];
}

function updateProductInArray(identifier, newData) {
  const products = getProductsArray();
  const index = products.findIndex(p => p.identifier === identifier);

  if (index > -1) {
    products[index] = { ...products[index], ...newData };
  } else {
    products.push({ identifier, ...newData });
  }

  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  return products[index] || newData;
}

class AppProductos extends HTMLElement {
  constructor() {
    super();
    this.products = getProductsArray();
  }

  connectedCallback() {
    this.render();
    this.addEventListener('product-updated', this.handleProductUpdate);
  }

  handleProductUpdate = (event) => {
    this.products = getProductsArray();
    this.updateProductDisplay(event.detail.identifier);
  };

  updateProductDisplay(identifier) {
    const productElement = this.querySelector(
      `app-producto[name="${identifier}"]`);
    if (productElement) {
      //@ts-ignore
      productElement._data = productElement.loadProductData();
      //@ts-ignore
      productElement.updatePriceDisplay();
    }
  }

  render() {
    let type = this.getAttribute("type")
    //@ts-ignore
    if (!["oneline", "cart", "favos", "wrap"].includes(type)) {
      type = "wrap";
      this.setAttribute("type", type);
    } else if (type == "cart") {
      if (localStorage.getItem("hasAcceptedCookies")) {
        let products = getProductsArray()
        fetch('/PMD-Brisella/scripts/json/productList.json')
          .then((response) => {
            if (!response.ok)
              throw new Error("file not loaded cusscesfully")
            return response.json()
          })
          .then((data) => {
            products.forEach((element) => {
              console.log(data["products"][element.identifier])
            })
          })
          .catch((error) => {
            console.error('There was a problem with the fetch operation:', error)
          })
      }
    }
  }
}

// TODO: cart area
// TODO: favourites area

class AppProducto extends HTMLElement {
  constructor() {
    super();
    this._defaultData = {
      isInCart: false,
      isInFavourites: false,
      fragrance: 0,
      quantity: 1
    };
  }

  connectedCallback() {
    this.identifier = this.getAttribute("name");
    this._data = this.loadProductData();
    this.render();
  }

  loadProductData() {
    const products = getProductsArray();
    const stored = products.find(p => p.identifier === this.identifier);
    return { ...this._defaultData, ...stored };
  }

  render() {

    let identifier = "" + this.getAttribute("name")
    // name, isInCart, isInFavourites, fragrance, ammount.

    let globalData = JSON.parse("" + localStorage.getItem(identifier))

    this._data = {
      isInCart: false,
      isInFavourites: false,
      fragrance: 0,
      ammount: 0
    }

    let image = this.getElementsByTagName("img")[0]
    let paragraph = this.getElementsByTagName("p")[0]
    let price = this.querySelector("price")

    if (price) {
      this._onePrice = Number(price.innerHTML)
      this.querySelector("price")?.remove()
    }

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
          <button name="incart" value="1">
            <p>Anadir a la cesta</p>
            <p id="totalPrice"></p>
            <img src="/PMD-Brisella/img/carrito_white.png">
          </button>
          <div id="addRemove">
            <app-tooltip data="Quitar"><button name="remove"><img src="/PMD-Brisella/img/minus.png"></button></app-tooltip>
            <input type="text" name="count" value="1" maxlength="2">
            <app-tooltip data="Añadir"><button name="add"><img src="/PMD-Brisella/img/plus.png"></button></app-tooltip>
          </div>
        </div>
    `
    this._fragrance = 0
    if (this.getAttribute("type") == "page") {
      this.innerHTML = /*html*/`
        <div id="prodImage">
          ${image.outerHTML}
          <button id="favs" name="favoritos"><img src="/PMD-Brisella/img/favoritos.png"></button>
        </div>
        <div id="prodContent">
          ${rest}
          ${buttons}
        </div>
      `
    } else {
      this.innerHTML =/*html*/`
        <div id="prodImage">
          ${rest}
          ${image.outerHTML}
          <button id="favs"><img src="/PMD-Brisella/img/favoritos.png"></button>
        </div>
        <div id="compras" name="compras">
          <button name="incart" value="1">
            <p>Anadir a la cesta</p>
            <p id="totalPrice"></p>
            <img src="/PMD-Brisella/img/carrito_white.png">
          </button>
          <div id="addRemove">
            <app-tooltip data="Quitar">
              <button name="remove"><img src="/PMD-Brisella/img/minus.png"></button>
            </app-tooltip>
            <input type="number" name="count" value="1" maxlength="2">
            <app-tooltip data="Añadir">
              <button name="add"><img src="/PMD-Brisella/img/plus.png"></button>
            </app-tooltip>
          </div>
        </div>
        `
      this._data.fragrance = -1
    }

    let fragrances = this.querySelectorAll('button[name="frag"]')
    let cartBtn = this.querySelector('button[name="incart"]')
    if (cartBtn) {
      cartBtn.addEventListener("click", () => {
        this.addToCart()
        this.updateGlobalData()
      })
    }

    if (this._data.fragrance != -1) {
      if (fragrances) {
        for (let btn of fragrances) {
          btn.addEventListener("click", () => {

            if (this._data) //@ts-ignore
              this._data.fragrance = btn.value

            for (let btn of fragrances) {
              //@ts-ignore
              btn.style.backgroundColor = "#FFFFFF00"
            }

            if (this._data) {
              //@ts-ignore
              fragrances[this._data.fragrance].style.backgroundColor = "#FFFFFF"
              //@ts-ignore
              this._data.ammount = input.value;
            }

            this.updateGlobalData()
          })
        }
      }
    }

    let favsButton = this.querySelector('button[id="favs"]')
    if (favsButton) this._data.isInFavourites = true;

    let add = this.querySelector('button[name="add"]')
    let input = this.querySelector('input[name="count"]')
    let remove = this.querySelector('button[name="remove"]')
    if (add && input) add.addEventListener("click", () => {
      //@ts-ignore
      if (input.value < 99) {
        //@ts-ignore
        input.value++
        if (this._data)
          //@ts-ignore
          this._data.ammount = input.value;
        this.updateGlobalData()
      }
    })

    if (remove && input) remove.addEventListener("click", () => {
      //@ts-ignore
      if (input.value > 1) {
        //@ts-ignore
        input.value--
        if (this._data) //@ts-ignore
          this._data.ammount = input.value;
        this.updateGlobalData()
      }
    })

    if (input) {
      // Optional: set step size and limits
      const min = 1;
      const max = 99;

      input.addEventListener("wheel", (event) => {
        event.preventDefault(); // Prevent page scrolling

        // Convert to number and fallback to 0 if not valid
        //@ts-ignore
        let currentValue = parseInt(input.value) || 0

        // Check scroll direction
        //@ts-ignore
        if ((event.deltaY < 0 || event.deltaX > 0) && currentValue < max) {
          //@ts-ignore
          input.value = currentValue + 1
        }
        //@ts-ignore
        else if ((event.deltaY > 0 || event.deltaX < 0) && currentValue > min) {

          //@ts-ignore
          input.value = currentValue - 1
        }

        //@ts-ignore
        this._data.ammount = input.value
        this.updateGlobalData()
      })

      input.addEventListener("focusout", () => {
        //@ts-ignore
        this._data.ammount = input.value
        this.updateGlobalData()
      })
    }

    if (globalData) {
      this._data = {
        isInCart: globalData.isInCart,
        isInFavourites: globalData.isInFavourites,
        fragrance: globalData.fragrance,
        ammount: globalData.ammount
      }

      if (this._data.fragrance != -1) {
        for (let btn of fragrances) {
          //@ts-ignore
          btn.style.backgroundColor = "#FFFFFF00"
        }

        if (this._data) {
          //@ts-ignore
          fragrances[this._data.fragrance].style.backgroundColor = "#FFFFFF"
        }
      }

      if (this._data.isInCart == true) {
        let arm = this.querySelector('div[id="addRemove"]')

        //@ts-ignore
        arm.style.display = "flex"
        //@ts-ignore
        input.value = Number(this._data.ammount)
        this.updatePriceDisplay()
      }
    }
  }

  updatePriceDisplay() {
    let ptp = this.querySelector('p[id="totalPrice"]')

    if (this._onePrice && ptp && this._data && this._data.isInCart) {
      if (!this._data) return
      ptp.innerHTML = `${String(this._onePrice * this._data.ammount)}€`
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

  updateGlobalData() {
    updateProductInArray(this.identifier, this._data);
    this.dispatchEvent(new CustomEvent('product-updated', {
      bubbles: true,
      detail: { identifier: this.identifier }
    }));
  }

  handleQuantityChange(delta) {
    this._data.quantity = Math.max(1,
      Math.min(99, this._data.quantity + delta));
    this.updateGlobalData();
    this.updatePriceDisplay();
  }

  handleFragranceChange(value) {
    this._data.fragrance = value;
    this.updateGlobalData();
  }
}

if (!localStorage.getItem(PRODUCTS_KEY)) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify([]));
}

customElements.define("app-producto", AppProducto);
customElements.define("app-productos", AppProductos);
