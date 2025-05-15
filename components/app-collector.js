class AppCollector extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    let buttons = this.getElementsByTagName("button");
    for(let btn of buttons) {
      btn.addEventListener("click", () => {
        this.setAttribute(btn.name, btn.value);
      })
    }
  }
}

customElements.define("app-collector", AppCollector);