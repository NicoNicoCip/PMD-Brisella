(() => {
  const PRODUCTS_KEY = 'brisella_products'

  function getProductsArray() {
    try {
      const products = localStorage.getItem(PRODUCTS_KEY)
      return products ? JSON.parse(products) : []
    } catch (error) {
      console.error('Error getting products:', error)
      return []
    }
  }

  function updateProductInArray(identifier, newData) {
    try {
      const products = getProductsArray()
      const index = products.findIndex(p => p.identifier === identifier)

      if (index > -1) {
        products[index] = { ...products[index], ...newData }
      } else {
        products.push({ identifier, ...newData })
      }

      // Filter out products that are neither in cart nor in favourites
      const filteredProducts = products.filter(p => p.isInCart || p.isInFavourites)

      if (localStorage.getItem("hasAcceptedCookies"))
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(filteredProducts))
      return index > -1 ? products[index] : newData
    } catch (error) {
      console.error('Error updating product:', error)
      return newData
    }
  }


  class AppProductos extends HTMLElement {
    constructor() {
      super()
      this.products = getProductsArray()
      this._boundHandleProductUpdate = this.handleProductUpdate.bind(this)
    }

    connectedCallback() {
      this.render()
      this.addEventListener('product-updated', this._boundHandleProductUpdate)
    }

    disconnectedCallback() {
      this.removeEventListener('product-updated', this._boundHandleProductUpdate)
    }

    handleProductUpdate(event) {
      this.products = getProductsArray()
      if (event?.detail?.identifier) {
        this.updateProductDisplay(event.detail.identifier)
      }
    }

    updateProductDisplay(identifier) {
      const productElement = this.querySelector(`app-producto[name="${identifier}"]`)
      productElement?.refreshProductData()
    }

    render() {
      let type = this.getAttribute("type")

      if (type == "cart") {
        this.handleCartRendering()
      }

      if (type == "favourites") {
        this.handleFavouritesRendering()
      }

      if (!(type == "wrap" || type == "oneline" || type == "cart" || type == "favourites")) {
        type = "wrap"
        this.setAttribute("type", type)
      }
    }

    handleFavouritesRendering() {
      if (localStorage.getItem("hasAcceptedCookies")) {
        let products = getProductsArray().filter(p => p.isInFavourites)
        fetch('/PMD-Brisella/scripts/json/productList.json')
          .then((response) => {
            if (!response.ok)
              throw new Error("file not loaded cusscesfully")
            return response.json()
          })
          .then((data) => {
            products.forEach((element) => {
              const eid = data.products[element.identifier]
              this.innerHTML += /*html*/`
          <app-producto type="list" name="${element.identifier}">
            <img src="${eid.img}" alt="${element.identifier}">
            <h1>${eid.title}</h1>
            <h2>${eid.subtitle}</h2>
            <p>${eid.description}</p>
            <price>${eid.price}</price>
          </app-producto>
          `
            })
          })
          .catch((error) => {
            console.error('There was a problem with the fetch operation:', error)
          })
        this.setAttribute("type", "oneline")
      } else {
        this.innerHTML = /* html */`<p class="rouge centerd miniText">Cookies son desactivados. No se puede guardar nada.</p>`
      }
    }


    handleCartRendering() {
      if (localStorage.getItem("hasAcceptedCookies")) {
        let products = getProductsArray().filter(p => p.isInCart)
        fetch('/PMD-Brisella/scripts/json/productList.json')
          .then((response) => {
            if (!response.ok)
              throw new Error("file not loaded cusscesfully")
            return response.json()
          })
          .then((data) => {
            products.forEach((element) => {
              const eid = data.products[element.identifier]
              this.innerHTML += /*html*/`
              <app-producto type="list" name="${element.identifier}">
                <img src="${eid.img}" alt="${element.identifier}">
                <h1>${eid.title}</h1>
                <h2>${eid.subtitle}</h2>
                <p>${eid.description}</p>
                <price>${eid.price}</price>
              </app-producto>
              `
            })
          })
          .catch((error) => {
            console.error('There was a problem with the fetch operation:', error)
          })
        this.setAttribute("type", "oneline")
      } else {
        this.innerHTML = /* html */`<p class="rouge centerd miniText">Cookies son desactivados. No se puede guardar nada.</p>`
      }
    }
  }

  class AppProducto extends HTMLElement {
    constructor() {
      super()
      this._defaultData = {
        isInCart: false,
        isInFavourites: false,
        fragrance: 0,
        quantity: 1
      }
      this._data = null
      this._observer = null
    }

    async connectedCallback() {
      this.identifier = this.getAttribute("name") || ''
      await this.loadProductData()
      this.setupObservers()
      this.render()
      this.updateUIFromData()
    }

    updateUIFromData() {
      if (!this._data) return

      // Update fragrance selection
      this.querySelectorAll('button[name="frag"]').forEach((btn, i) => {
        btn.style.backgroundColor = i === this._data.fragrance ? "#FFFFFF" : "transparent"
      })

      // Update favourites button background
      const favsButton = this.querySelector('#favs')
      if (favsButton) {
        favsButton.style.backgroundColor = this._data.isInFavourites ? "rgb(255, 101, 114)" : "#e5c7c7"
      }

      // Update cart UI
      const addRemoveDiv = this.querySelector('#addRemove')
      if (addRemoveDiv) {
        addRemoveDiv.style.display = this._data.isInCart ? "flex" : "none"
        this.querySelector('input[name="count"]').value = this._data.quantity
        this.updatePriceDisplay()
      }
    }

    disconnectedCallback() {
      this._observer?.disconnect()
    }

    async loadProductData() {
      try {
        const products = getProductsArray()
        const storedProduct = products.find(p => p.identifier === this.identifier)

        if (!storedProduct) {
          updateProductInArray(this.identifier, this._defaultData)
        }

        this._data = {
          ...this._defaultData,
          ...storedProduct,
          quantity: storedProduct?.quantity || storedProduct?.ammount || 1
        }
      } catch (error) {
        console.error('Data load failed:', error)
        this._data = { ...this._defaultData }
      }
    }

    setupObservers() {
      this._observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (mutation.attributeName === 'name') {
            this.identifier = this.getAttribute("name")
            this.refreshProductData()
          }
        })
      })

      this._observer.observe(this, {
        attributes: true,
        attributeFilter: ['name']
      })
    }

    async refreshProductData() {
      await this.loadProductData()
      this.updateUIFromData()
    }

    render() {
      if (!this._data) {
        this.innerHTML = `<div class="loading-spinner"></div>`
        return
      }

      const image = this.querySelector('img')
      this.querySelector('img')?.remove()
      const paragraph = this.querySelector('p')
      const price = this.querySelector('price')

      if (!image || !paragraph) {
        console.error('Required elements missing')
        return
      }

      this._onePrice = Number(price?.textContent || '0')
      price?.remove()

      paragraph.setAttribute("onclick", "this.classList.toggle('expanded')")
      paragraph.classList.add("paragraph")

      this.setupTemplate(image.outerHTML, this.innerHTML)
      this.setupEventHandlers()
    }

    setupTemplate(imageHtml, contentHtml) {
      const type = this.getAttribute("type")
      const fragranceButtons = this.generateFragranceButtons()
      const purchaseControls = this.generatePurchaseControls()

      this.innerHTML = type === "page"
        ? this.createPageTemplate(imageHtml, contentHtml, fragranceButtons, purchaseControls)
        : this.createDefaultTemplate(imageHtml, contentHtml, purchaseControls)
    }

    generateFragranceButtons() {
      return `
        <div id="fragrancias">
          ${['naranja', 'menta', 'vainilla', 'rosa'].map((frag, i) => `
            <app-tooltip data="Fragrancia ${frag}" v-offset="-70">
              <button name="frag" value="${i}"><img src="/PMD-Brisella/img/${frag}.png"></button>
            </app-tooltip>
          `).join('')}
        </div>`
    }

    generatePurchaseControls() {
      return `
        <div id="compras" name="compras">
          <button name="incart" value="1">
            <p>Añadir a la cesta</p>
            <p id="totalPrice"></p>
            <img src="/PMD-Brisella/img/carrito_white.png">
          </button>
          <div id="addRemove">
            <app-tooltip data="Quitar"><button name="remove"><img src="/PMD-Brisella/img/minus.png"></button></app-tooltip>
            <input type="number" name="count" value="${this._data.quantity}" min="1" max="99">
            <app-tooltip data="Añadir"><button name="add"><img src="/PMD-Brisella/img/plus.png"></button></app-tooltip>
          </div>
        </div>`
    }

    createPageTemplate(image, content, frag, controls) {
      return `
        <div id="prodImage">
          ${image}
          <button id="favs" name="favoritos"><img src="/PMD-Brisella/img/favoritos.png"></button>
        </div>
        <div id="prodContent">
          ${content}
          ${frag}
          ${controls}
        </div>`
    }

    createDefaultTemplate(image, content, controls) {
      return `
        <div id="prodImage">
          ${content}
          <a href="/PMD-Brisella/pages/products/${this.identifier}.html">${image}</a>
          <button id="favs"><img src="/PMD-Brisella/img/favoritos.png"></button>
        </div>
        ${controls}`
    }

    setupEventHandlers() {
      this.setupFragranceHandlers()
      this.setupCartHandlers()
      this.setupQuantityHandlers()
    }

    setupFragranceHandlers() {
      this.querySelectorAll('button[name="frag"]').forEach(btn => {
        btn.addEventListener('click', () => {
          const value = parseInt(btn.value, 10)
          this.handleFragranceChange(value)
          this.querySelectorAll('button[name="frag"]').forEach(b => {
            b.style.backgroundColor = b === btn ? "#FFFFFF" : "transparent"
          })
        })
      })
    }

    setupCartHandlers() {
      this.querySelector('button[name="incart"]')?.addEventListener("click", () => {
        this._data.isInCart = !this._data.isInCart
        this.updateGlobalData()
      })

      this.querySelector('#favs')?.addEventListener('click', () => {
        this._data.isInFavourites = !this._data.isInFavourites
        this.updateGlobalData()
      })
    }

    setupQuantityHandlers() {
      const input = this.querySelector('input[name="count"]')
      const add = this.querySelector('button[name="add"]')
      const remove = this.querySelector('button[name="remove"]')

      add?.addEventListener("click", () => this.handleQuantityChange(1))
      remove?.addEventListener("click", () => this.handleQuantityChange(-1))

      input?.addEventListener('wheel', e => {
        e.preventDefault()
        this.handleQuantityChange(e.deltaY < 0 ? 1 : -1)
      })

      input?.addEventListener('change', () => {
        const value = Math.min(99, Math.max(1, parseInt(input.value, 10) || 1))
        input.value = value
        this._data.quantity = value
        this.updateGlobalData()
      })
    }

    updatePriceDisplay() {
      const priceDisplay = this.querySelector('p#totalPrice')
      if (this._onePrice && priceDisplay && this._data && this._data.isInCart) {
        priceDisplay.textContent = `${(this._onePrice * this._data.quantity).toFixed(2)}€`
      } else if (priceDisplay) {
        priceDisplay.textContent = ''
      }
    }

    handleQuantityChange(delta) {
      if (!this._data) return
      let newQty = this._data.quantity + delta
      newQty = Math.max(1, Math.min(99, newQty))
      this._data.quantity = newQty

      const input = this.querySelector('input[name="count"]')
      if (input) input.value = newQty

      this.updateGlobalData()
      this.updatePriceDisplay()
    }

    handleFragranceChange(value) {
      if (!this._data) return
      const maxFragrances = 4 // Number of fragrance buttons
      this._data.fragrance = Math.max(0, Math.min(maxFragrances - 1, value))
      this.updateGlobalData()
    }

    updateGlobalData() {
      if (this._data && this.identifier) {
        updateProductInArray(this.identifier, this._data)
        this.dispatchEvent(new CustomEvent('product-updated', {
          bubbles: true,
          detail: { identifier: this.identifier }
        }))
      }
    }
  }

  // Initialize products array if not exists
  if (!localStorage.getItem(PRODUCTS_KEY) && localStorage.getItem("hasAcceptedCookies")) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify([]))
  }

  // Register custom elements
  customElements.define("app-producto", AppProducto)
  customElements.define("app-productos", AppProductos)

})()
