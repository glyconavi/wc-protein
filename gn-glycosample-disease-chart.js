import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@google-web-components/google-chart';

class DiseaseChart extends PolymerElement {
  static get template() {
    return html`
<style type="text/css">
google-chart {
  height: 200px;
}
</style>

<iron-ajax auto="" url="https://test.sparqlist.glyconavi.org/api/GlycoSample_List_chart?whereclause={{whereclause}}&selectsubject={{selectsubject}}" handle-as="json" last-response="{{resultdata}}"></iron-ajax>

<google-chart options='{"title": "Diseases", "legend": { "position": "right"}}' id="selectionchart" type="pie" rows='[[resultdata]]' cols='[{"label": "selectsubject", "type": "string"},{"label": "Count", "type": "number"}]' on-google-chart-select="selectionClicked" selection="{{selection}}" ></google-chart>
`;
  }
  static get properties() {
    return {
      selection: {
        notify: true,
        type: String,
      },
      resultdata: {
        notify: true,
        type: Object,
        value: function() {
          return new Object();
        }
      },
      whereclause: {
        notify: true,
        type: String,
        value: "?gs gn:disease ?disease_res .  ?disease_res  rdf:type sio:SIO_010299 .  ?disease_res rdfs:label ?disease ."
      },
      selectsubject: {
        notify: true,
        type: String,
        value: "?disease"
      }
    };
  }
  selectionClicked(e) {
    this.selection = this.resultdata[this.selection[0].row][0];
  }
}

customElements.define('gn-glycosample-disease-chart', DiseaseChart);
