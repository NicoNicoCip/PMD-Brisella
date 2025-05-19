class AppLoading extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = /* html */`
    <div id="loadingScreen">
    </div>
    `;

    window.addEventListener("load", () => {
      
      setTimeout(() => {
        this.remove()
      }, 200);
    })
  }
}



customElements.define("app-loading", AppLoading);


