// import { LitElement, html } from 'lit-element';
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
//import '@polymer/paper-item/paper-item.js';
import '@polymer/iron-input/iron-input.js';
import '@polymer/paper-listbox/paper-listbox.js';
import 'web-animations-js/web-animations-next.min.js';
// import { GlycoNaviAjaxEnv } from './gn-ajax-env.js'

/*
 gene, organism, disease, taxonomy
 class PageSearch extends PolymerElement {
 */
class DiseaseSearch extends PolymerElement {
  static get properties() {
    return {
      criteria: {
        type: String,
        notify: true,
      },
      test: {
        type: Boolean,
        notify: true,
      }
    };
  }
  // render() {
  static get template() {
    return html`
<style type="text/css">
</style>
<paper-input label="search criteria for diseases" value="{{criteria}}">

`;
// <input value="{{criteria}}" />
// <iron-input bind-value="criteria">
//   <input value="{{value::input}}">
// </iron-input>
  }

  // constructor() {
  //   super();
  //   this.criteria = "";
  // }

  // handleKeyPress(e) {
  //   // console.log("search-handleKeyPress");
  //   // console.log(e);
  //   // console.log(e.detail.value);
  //   // console.log(this.criteria);
  //
  //   let event = new CustomEvent(this.criteria + '-value-change',
  //     {
  //       detail: { value: e.detail.value },
  //       bubbles: true,
  //       composed: true
  //     });
  //   this.dispatchEvent(event);
  // }
}

customElements.define('gn-glycosample-disease-search', DiseaseSearch);
