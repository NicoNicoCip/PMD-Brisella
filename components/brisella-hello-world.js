class BrisellaHelloWorld extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = /* html */`
      <p>Hello, World!</p>
    `;
  }
}

customElements.define("brisella-hello-world", BrisellaHelloWorld);