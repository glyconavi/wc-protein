import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@google-web-components/google-chart';

import { GlycoNaviAjaxEnv } from './gn-glycosample-ajax-env.js'

/*
 gene, organism, disease, taxonomy
 */
class PageTable extends PolymerElement {

  static get properties() {
    return {
      resultdata: {
        notify: true,
        type: Object,
        value: function () {
          return new Object();
        }
      },
      // page: {
      //   type: Object,
      //   notify: true
      // },
      // pageItem: {
      //   type: Object,
      //   notify: true
      // },
      // limit: {
      //   type: String,
      //   notify: true
      // },
      // limitItem: {
      //   type: Object,
      //   notify: true
      // },
      // offset: {
      //   type: String,
      //   notify: true
      // },
      // offsetItem: {
      //   type: Object,
      //   notify: true
      // },
      // genecriteria: {
      //   type: String,
      //   notify: true,
      // },
      // organismcriteria: {
      //   type: String,
      //   notify: true,
      // },
      // diseasecriteria: {
      //   type: String,
      //   notify: true,
      // },
      // taxonomycriteria: {
      //   type: String,
      //   observer: 'handleTaxonomyKeyPress'
      // },
    };
  }

  static get template() {
    return html`
<style type="text/css">
google-chart {
  width: 100%;
  height: 100%;
}
</style>

<google-chart options='{"title": "Diseases in GlycoNavi"}' id="selectionchart" type="table" rows='[[resultdata]]' cols='[{"label": "ID", "type": "string"},{"label": "InternalID", "type": "string"},{"label": "Title", "type": "string"},{"label": "Gene", "type": "string"},{"label": "Organism", "type": "string"},{"label": "Disease", "type": "string"},{"label": "DOID", "type": "string"},{"label": "Taxonomy", "type": "string"}]'></google-chart>
`;
  }
  constructor() {
    super();
    this.ajaxSearch = new GlycoNaviAjaxEnv(this.test, "search");
  }

  firstUpdated(changedProperties) {
    // console.log("firstUpdated");
    // console.log(changedProperties);
    // console.log(this.criteria);

    // let query = "criteria=" + this.criteria;
    // this.response = this.test ? this.ajaxTest.getRequest(query) : this.ajax.getRequest(query);
    // console.log(this.response);
  }

  // handleTaxonomyKeyPress(newValue, oldValue) {
  //   console.log("table-handleTaxonomyKeyPress");
  //   console.log(newValue);
  //   this.taxonomyCriteria = newValue;
  // }

  // handleDiseaseKeyPress(e) {
  //   console.log("table-handleDiseaseKeyPress");
  //   console.log(e);
  //   console.log(e.detail.value);
  //   if (e.detail.value !== '') {
  //     this.orgaismCriteria = e.detail.value;
  //   }
  // }

  // handleOrganismKeyPress(e) {
  //   console.log("table-handleOrganismKeyPress");
  //   console.log(e);
  //   console.log(e.detail.value);
  //   if (e.detail.value !== '') {
  //     this.organismCriteria = e.detail.value;
  //   }
  // }

  _calculateOffset(page) {
    console.log("page:" + page);
    console.log("offset: " + this.limit * page);
    return this.limit * page;
  }
}

customElements.define('gn-glycosample-table', PageTable);
