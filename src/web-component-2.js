const template = document.createElement("template");
template.innerHTML = `
<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css"
</style>
<div class="content has-text-centered">
<p>
  <strong>Dark Souls, Bloodborne and Elden Ring</strong> are all properties of
  <a href="https://www.fromsoftware.jp/ww/">From Software</a>. The website and it's features were programmed by Andrew Beach
</p>
</div>
`;
class PageFooter extends HTMLElement {
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
customElements.define('page-footer', PageFooter);