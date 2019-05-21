import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';

import './gn-glycosample-menu.js';
import './gn-glycosample-limit.js';
import './gn-glycosample-disease-chart.js';
import './gn-glycosample-gene-chart.js';
import './gn-glycosample-organism-chart.js';
import './gn-glycosample-taxonomy-chart.js';
import './gn-glycosample-search.js';
// import './gn-glycosample-disease-search.js';
// import './gn-glycosample-gene-search.js';
// import './gn-glycosample-organism-search.js';
// import './gn-glycosample-taxonomy-search.js';
import './gn-glycosample-table.js';

class PageDemo extends PolymerElement {
  static get template() {
    return html `
<style type="text/css">
  #facet {
    /* display: block; */
    border: 1px
    solid red;
  }

  #table {
   /* display: block; */
   border: 1px
   solid green;
  }

  #chart0 {
    /* display: block; */
    border: 1px
    solid red;
  }

  #chart1 {
    /* display: block; */
    border: 1px
    solid purple;
  }

  #disease {
    float: left;
  }

  #gene {
    float: left;
  }

/*

#organism {
}


#gene {
}

<iron-ajax auto="" url="https://test.sparqlist.glyconavi.org/api/GlycoSampleList_v2_page_search?offset={{page}}&limit={{limit}}&diseasecriteria={{diseasecriteria}}&genecriteria={{genecriteria}}&organismcriteria={{organismcriteria}}&taxonomycriteria={{taxonomycriteria}}" handle-as="json" last-response="{{resultdata}}"></iron-ajax>
<iron-ajax auto="" url="https://test.sparqlist.glyconavi.org/api/GlycoSampleList_v2_page_search_crieria?offset={{offset}}&limit={{limit}}&criteria={{sparqlcriteria}}" handle-as="json" last-response="{{resultdata}}"></iron-ajax>
<gn-glycosample-organism-search criteria="{{organismcriteria}}"></gn-glycosample-organism-search>
<gn-glycosample-gene-search criteria="{{genecriteria}}"></gn-glycosample-gene-search>
 */

}

</style>


<iron-ajax id="ajax" auto="" url="https://test.sparqlist.glyconavi.org/api/GlycoSampleList_v2_page_search_criteria?limit={{limit}}&offset={{offset}}&criteria={{sparqlcriteria}}&selectsubject={{selectsubject}}" handle-as="json" last-response="{{resultdata}}"></iron-ajax>

<div id="facet">
<div id="chart0">
<div id="disease">
<gn-glycosample-disease-chart selection="{{diseasecriteria}}" ></gn-glycosample-disease-chart>
<gn-glycosample-search criteria="{{diseasecriteria}}" label="Disease Search Criteria"</gn-glycosample-search>
</div>
<div id="organism">
<gn-glycosample-organism-chart selection="{{organismcriteria}}"></gn-glycosample-organism-chart>
<gn-glycosample-search criteria="{{organismcriteria}}" label="Organism Search Criteria"</gn-glycosample-search>
</div>
</div>
<div id="chart1">
<div id="gene">
<gn-glycosample-gene-chart selection="{{genecriteria}}"></gn-glycosample-gene-chart>
<gn-glycosample-search criteria="{{genecriteria}}" label="Gene Search Criteria"</gn-glycosample-search>
</div>
<div id="taxonomy">
<gn-glycosample-taxonomy-chart selection="{{taxonomycriteria}}"></gn-glycosample-taxonomy-chart>
<gn-glycosample-search criteria="{{taxonomycriteria}}" label="Taxonomy Search Criteria"</gn-glycosample-search>
</div>
</div>

<div id="table">
<div id="limit">
<gn-glycosample-limit limit="{{limit}}"></gn-glycosample-limit>
</div>
<div id="menu">
<gn-glycosample-menu page="{{page}}" limit="{{limit}}" offset="{{offset}}" diseasecriteria="{{diseasecriteria}}" genecriteria="{{genecriteria}}" organismcriteria="{{organismcriteria}} taxonomycriteria="{{taxonomycriteria}}"></gn-glycosample-menu>
</div>
<gn-glycosample-table resultdata="{{resultdata}}"></gn-glycosample-table>
</div>
`;
  }
  static get properties() {
    return {
      selection: {
        notify: true,
        type: Object,
        value: function() {
          return new Object();
        }
      },
      resultdata: {
        notify: true,
        type: Object,
        value: function() {
          return new Object();
        }
      },
      page: {
        type: String,
        notify: true,
        value: "1"
      },
      limit: {
        type: String,
        notify: true,
        value: "50"
      },
      offset: {
        type: String,
        notify: true,
        value: "0"
      },
      genecriteria: {
        type: String,
        notify: true,
        observer: '_geneChanged'
      },
      organismcriteria: {
        type: String,
        notify: true,
        observer: '_organismChanged'
      },
      diseasecriteria: {
        type: String,
        notify: true,
        observer: '_diseaseChanged'
      },
      taxonomycriteria: {
        type: String,
        notify: true,
        observer: '_taxonomyChanged'
      },
      selectsubject: {
        type: String,
        notify: true,
        value: "?gene ?organism ?taxonomy ?disease ?doid"
      },
      // selectsubject is a json with each condition as a key, holding the conditions select clause.  when specific condition are not selected, they will be "" as ?condition.
      // selectsubjectobject: {
      //   type: Object,
      //   notify: true,
      //   value: {
      //     gene: "?gene",
      //     organism: "?organism",
      //     taxonomy: "?taxonomy",
      //     disease: "?disease",
      //     doid: "?doid"
      //   },
      //   // value: '?gene "" as ?organism "" as ?taxonomy "" as  ?disease "" as ?doid',
      // },
      sparqlcriteria: {
        type: String,
        notify: true,
        value: 'optional { ?gs gs:gene ?gene . } ' +
          'optional { ?gs gs:organism ?organism . } ' +
          'optional { ?gs gn:disease ?disease_res . ?disease_res  rdf:type sio:SIO_010299 . ?disease_res rdfs:label ?disease . ?disease_res gn:has_doid ?doid . } ' +
          'optional { ?gs gs:taxonomy ?taxonomy . } ',
      },
      // sparqlcriteria is a json mapping to control the where clause;
      sparqlcriteriaobject: {
        type: Object,
        notify: true,
        value: { gene: 'optional { ?gs gs:gene ?gene . } ', organism: 'optional { ?gs gs:organism ?organism . } ', disease: 'optional { ?gs gn:disease ?disease_res . ?disease_res  rdf:type sio:SIO_010299 . ?disease_res rdfs:label ?disease . ?disease_res gn:has_doid ?doid . } ', taxonomy: 'optional { ?gs gs:taxonomy ?taxonomy . } '},
      }
    }
  }
  _formatLimit(value) {
    console.log("formatLimit: " + value);
    var choice = "10";
    switch (value) {
      case 0:
        choice = "10";
        break;
      case 1:
        choice = "50";
        break;
      case 2:
        choice = "100";
        break;
    }
    return choice;
  }
  connectedCallback() {
    super.connectedCallback();
    console.log("cc");
  }
  handleDiseaseChange(e) {
    console.log("handleDiseaseChange!")
    this.diseasecriteria = e.detail.value;
  }
  handleGeneChange(e) {
    console.log("handleGeneChange!")
    this.genecriteria = e.detail.value;
  }
  handleTaxonomyChange(e) {
    console.log("handleTaxonomyChange!")
    this.taxonomycriteria = e.detail.value;
  }
  handleOrganismChange(e) {
    console.log("handleOrganismChange!")
    this.organismcriteria = e.detail.value;
  }
  // Observer method defined as a class method
  _diseaseChanged(newValue, oldValue) {
    this.chooseCriteria("disease", newValue);
  }
  _geneChanged(newValue, oldValue) {
    this.chooseCriteria("gene", newValue);
  }
  _organismChanged(newValue, oldValue) {
    this.chooseCriteria("organism", newValue);
  }
  _taxonomyChanged(newValue, oldValue) {
    this.chooseCriteria("taxonomy", newValue);
  }
  chooseCriteria(choice, newValue) {
    console.log("chooseCriteria");
    console.log(newValue);
    console.log(choice);
    if ((newValue === null) || (newValue.length === 0)) {
      console.log("removed");
      switch (choice) {
        case "gene":
          this.sparqlcriteriaobject.gene = 'optional { ?gs gs:gene ?gene . } ';
          break;
        case "organism":
          this.sparqlcriteriaobject.organism = 'optional { ?gs gs:organism ?organism . } ';
          break;
        case "disease":
          this.sparqlcriteriaobject.disease = 'optional { ?gs gn:disease ?disease_res . ?disease_res  rdf:type sio:SIO_010299 . ?disease_res rdfs:label ?disease . ?disease_res gn:has_doid ?doid . } ';
          break;
        case "taxonomy":
          this.sparqlcriteriaobject.taxonomy = 'optional { ?gs gs:taxonomy ?taxonomy . } ';
          break;
        default:
          console.log("ERROR should never be in default");
      }
      // check criterias to reset
      console.log("criterias");
      console.log(this.genecriteria);
      console.log(this.organismcriteria);
      console.log(this.diseasecriteria);
      console.log(this.taxonomycriteria);
      if ((this.genecriteria === null || this.genecriteria.length === 0 ) && (this.organismcriteria === null || this.organismcriteria.length === 0) && (this.diseasecriteria === null || this.diseasecriteria.length === 0) && (this.taxonomycriteria === null || this.taxonomycriteria.length === 0)) {
        console.log("all criterias blank");
      //   // this.selectsubjectobject = {
      //     //   gene: "?gene",
      //     //   organism: "?organism",
      //     //   taxonomy: "?taxonomy",
      //     //   disease: "?disease",
      //     //   doid: "?doid"
      //     // };
      //     this.sparqlcriteria = 'optional { ?gs gs:gene ?gene . } ' +
      //     'optional { ?gs gn:disease ?disease_res . ?disease_res  rdf:type sio:SIO_010299 . ?disease_res rdfs:label ?disease . ?disease_res gn:has_doid ?doid . } ' +
      //     'optional { ?gs gs:organism ?organism . } ' +
      //     'optional { ?gs gs:taxonomy ?taxonomy . } ';
      } else {
        console.log("!all criterias blank");
      }
    } else {
      // this.setSelectSubjectObject(choice);
      switch (choice) {
        case "gene":
          console.log("gene was changed");
          this.sparqlcriteriaobject.gene = '?gs gs:gene ?gene . ' +
            'FILTER contains( str(?gene), "' + newValue + '") ';
          // ?gene bif:contains "' + newValue + '" .';
          break;
        case "organism":
          console.log("organism was changed");
          this.sparqlcriteriaobject.organism = '?gs gs:organism ?organism . ' +
            'FILTER contains( str(?organism), "' + newValue + '") ';
          break;
        case "disease":
          console.log("disease was changed");
          this.sparqlcriteriaobject.disease = '?gs gn:disease ?disease_res . ?disease_res  rdf:type sio:SIO_010299 . ?disease_res rdfs:label ?disease . ?disease_res gn:has_doid ?doid . ' +
            'FILTER contains( str(?disease), "' + newValue + '") ';
          // ?disease bif:contains "' + newValue + '" .';
          break;
        case "taxonomy":
          console.log("taxon was changed");
          this.sparqlcriteriaobject.taxonomy = '?gs gn:disease ?disease_res . ?disease_res  rdf:type sio:SIO_010299 . ?disease_res rdfs:label ?disease . ?disease_res gn:has_doid ?doid . ' +
            'FILTER contains( str(?taxonomy), "' + newValue + '") ';
          // ?taxonomy bif:contains "' + newValue + '" .';
          break;
        default:
          console.log("ERROR should never be in default");
      }
      // this._parseSelectSubject();
    }
    this._parseSparqlCriteria();
    // this.requestUpdate();
  }

  // requestUpdate() {
  //   let ajax = this.shadowRoot.getElementById("ajax");
  //   // https://www.webcomponents.org/element/@polymer/iron-ajax/elements/iron-ajax
  //   ajax.generateRequest();
  // }

  // _parseSelectSubject() {
  //   console.log(this.selectsubjectobject.gene + ' ' + this.selectsubjectobject.organism + ' ' + this.selectsubjectobject.disease + ' ' + this.selectsubjectobject.taxonomy);
  //   this.selectsubject = this.selectsubjectobject.gene + ' ' + this.selectsubjectobject.organism + ' ' + this.selectsubjectobject.disease + ' ' + this.selectsubjectobject.taxonomy;
  // }

  _parseSparqlCriteria() {
    var crit = "";
    console.log(this.sparqlcriteriaobject);
    console.log(Object.keys(this.sparqlcriteriaobject));
    var keysarray = Object.keys(this.sparqlcriteriaobject);
    for (var i = 0; i < keysarray.length; i++) {
      var key = keysarray[i];
      console.log("key");
      console.log(key);
      console.log(this.sparqlcriteriaobject[key]);
      crit += this.sparqlcriteriaobject[key];
    }
    this.sparqlcriteria = crit;
    console.log(this.sparqlcriteria);
  }

  // setSelectSubjectObject(condition) {
  //   switch (condition) {
  //     case "disease":
  //       this.selectsubjectobject.disease = '?disease';
  //       this.selectsubjectobject.doid = '?doid';
  //       break;
  //     case "organism":
  //       this.selectsubjectobject.organism = '?organism';
  //       break;
  //     case "taxonomy":
  //       this.selectsubjectobject.taxonomy = '?taxonomy';
  //       break;
  //     case "gene":
  //       this.selectsubjectobject.gene = '?gene';
  //       break;
  //   }
  //
  //   if (!this.genecriteria)
  //     this.selectsubjectobject.gene = '"" as ?gene';
  //   if (!this.organismcriteria)
  //     this.selectsubjectobject.organism = '"" as ?organism';
  //   if (!this.taxonomycriteria)
  //     this.selectsubjectobject.taxonomy = '"" as ?taxonomy';
  //   if (!this.diseasecriteria) {
  //     this.selectsubjectobject.disease = '"" as ?disease';
  //     this.selectsubjectobject.doid = '"" as ?doid';
  //   }
  // }

  // Each item of observers array is a method name followed by
  // a comma-separated list of one or more dependencies.
  // https://polymer-library.polymer-project.org/3.0/docs/devguide/observers#array-observation
  // static get observers() {
  //   return [
  //     'updateQuery(diseasecriteria, organismcriteria, genecriteria, taxonomycriteria)'
  //   ]
  // }

  // Each method referenced in observers must be defined in
  // element prototype. The arguments to the method are new value
  // of each dependency, and may be undefined.
  // updateQuery(diseasecriteria, organismcriteria, genecriteria, taxonomycriteria) {
  //   // ... do work using dependent values
  //   var diseasecondition = '?gs gn:disease ?disease_res . \n?disease_res  rdf:type sio:SIO_010299 .\n?disease_res rdfs:label ?disease .\n?disease_res gn:has_doid ?doid .\n?disease bif:contains "' + diseasecriteria + '" .';
  //   var organismcondition = '?gs gs:organism ?organism .\n?organism bif:contains "' + organismcriteria + '" .';
  //   var taxonomycondition = '?gs gs:taxonomy ?taxonomy .\n?taxonomy bif:contains "' + taxonomycriteria + '" .';
  //   var genecondition = '?gs gs:gene ?gene . \n?gene bif:contains "' + genecriteria + '" .
  //   this.criteria =
  //   // let url = "https://test.sparqlist.glyconavi.org/api/GlycoSampleList_v2_page_search_criteria?offset={{page}}&limit={{limit}}&diseasecriteria={{diseasecriteria}}&genecriteria={{genecriteria}}&organismcriteria={{organismcriteria}}&taxonomycriteria={{taxonomycriteria}}";
  //   // this.resultdata = fetch(url)
  //   //   .then(function (response) {
  //   //     console.log(response.json());
  //   //     return response.json();
  //   //   })
  //   //   .then(function (myJson) {
  //   //     console.log(JSON.stringify(myJson));
  //   //   })
  //   //   .else(function (response) {
  //   //     console.log(response);
  //   //   });
  // }
}

customElements.define('gn-glycosample-list', PageDemo);
