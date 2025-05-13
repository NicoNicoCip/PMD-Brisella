class AppTooltip extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.addEventListener("mouseover", () => {
      // this.style.backgroundColor = "red"
    })
  }
}

customElements.define("app-tooltip", AppTooltip);