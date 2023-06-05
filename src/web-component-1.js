const template = document.createElement("template");
template.innerHTML = `
<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css"
</style>
<nav class="navbar has-shadow is-white">
<div class="navbar-burger" id="burger">
  <span></span>
  <span></span>
  <span></span>
</div>
<div class="navbar-menu" id="navbar-links">
  <a class="navbar-item" href="index.html" id="homeBtn">
    Home
  </a>

  <a class="navbar-item is-hoverable" href="app.html" id="appBtn">
    App
  </a>

  <a class="navbar-item is-hoverable" href="docu.html" id="docuBtn">
    Documentation
  </a>
</div>
</nav>
`;
class NavigationBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: "open"
    });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    const homeBtn = this.homeBtn = this.shadowRoot.querySelector("#homeBtn");
    const appBtn = this.homeBtn = this.shadowRoot.querySelector("#appBtn");
    const docuBtn = this.docuBtn = this.shadowRoot.querySelector("#docuBtn");
    if(!this.dataset.page) this.dataset.page = page;
  }
  connectedCallback() {
    const burgerIcon = this.burgerIcon = this.shadowRoot.querySelector("#burger");
    const navbarMenu = this.navbarMenu = this.shadowRoot.querySelector("#navbar-links");
    burgerIcon.addEventListener('click', () => {
      navbarMenu.classList.toggle('is-active');
    });
    this.render();
  }
  render() {
    const homeBtn = this.homeBtn = this.shadowRoot.querySelector("#homeBtn");
    const appBtn = this.homeBtn = this.shadowRoot.querySelector("#appBtn");
    const docuBtn = this.docuBtn = this.shadowRoot.querySelector("#docuBtn");
    const page = this.getAttribute('data-page') ? this.getAttribute('data-page') : "home";
    if(page == "home"){
      homeBtn.style.fontWeight = 700;
      appBtn.style.fontWeight = 400;
      docuBtn.style.fontWeight = 400;
    }
    else if(page == "app"){
      homeBtn.style.fontWeight = 400;
      appBtn.style.fontWeight = 700;
      docuBtn.style.fontWeight = 400;
    }
    else if(page == "docu"){
      homeBtn.style.fontWeight = 400;
      appBtn.style.fontWeight = 400;
      docuBtn.style.fontWeight = 700;
    }
  }
};
customElements.define('nav-bar', NavigationBar);