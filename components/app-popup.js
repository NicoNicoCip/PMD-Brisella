class AppPopup extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
  }
}

customElements.define("app-popup", AppPopup);