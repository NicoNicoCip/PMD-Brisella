class BrisellaHelloWorld extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = /* html */`
    <div id="loadingScreen">
      <div id="loadingContent">
        <div class="dot-loader">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </div>
    </div>
    `;
  }
}

customElements.define("brisella-hello-world", BrisellaHelloWorld);


