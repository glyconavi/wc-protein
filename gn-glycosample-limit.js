import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import 'web-animations-js/web-animations-next.min.js';

class PageLimit extends PolymerElement {
  static get template() {
    return html`
<style type="text/css">

</style>

<paper-dropdown-menu label="Limit">
  <paper-listbox slot="dropdown-content" selected="{{limit}}" attr-for-selected="value">
    <paper-item value="10">10</paper-item>
    <paper-item value="20">20</paper-item>
    <paper-item value="50">50</paper-item>
    <paper-item value="100">100</paper-item>
  </paper-listbox>
</paper-dropdown-menu>
`;
  }
  constructor() {
    super();
  }
  static get properties() {
    return {
      limit: {
        type: String,
        notify: true,
        value: "50"
      }
    };
  }
}

customElements.define('gn-glycosample-limit', PageLimit);
