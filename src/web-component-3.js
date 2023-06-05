const template = document.createElement("template");
template.innerHTML = `
<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css"
</style>
<section class="section has-background-warning">
<div class="container">
  <div class="columns is-vcentered">
    <div class="column">  
      <div class="hero is-large is-info p-2 has-background-black">
        <div class="hero-head">
          <p class="title">
            Souls-Borne Boss Audio Visualizer
          </p>
          <p class="subtitle">
            Listen to a few of the best boss themes as well as your own song here
          </p>
          <img class="p-3" style="float:right;width:50%" src="img/dark souls.jpg" alt="Dark Souls 3">
        </div>
      </div>
    </div>
  </div>
</div>
</section>
`;
class HomePage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: "open"
    });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {
    this.render();
  }
  render() {

  }
};
customElements.define('home-page', HomePage);