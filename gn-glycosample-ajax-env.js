
export class GlycoNaviAjaxEnv {
  constructor(test, element) {
    this.test=test;
    this.element=element;
  }

  static getUrls() {
        return {
  "search": {
    "test" : {
     "url": "https://test.sparqlist.glyconavi.org/api/GlycoSampleList_v2_page?"
    },
    "default": {
     "url": "https://sparqlist.glyconavi.org/api/GlycoSampleList_v2_page?"
    }
  },
  "table": {
    "test" : {
     "url": "https://test.sparqlist.glyconavi.org/api/GlycoSampleList_v2_page?offset={{_calculateOffset(page)}}&limit={{limit}}"
    },
    "default": {
     "url": "https://sparqlist.glyconavi.org/api/GlycoSampleList_v2_page?offset={{_calculateOffset(page)}}&limit={{limit}}"
    }
  }
};
  }

  get getUrl() {
    console.log("getUrl");
    console.log(GlycoNaviAjaxEnv.getUrls());
    console.log(GlycoNaviAjaxEnv.getUrls()[this.element]["test"]);
    if (this.test) {
      return GlycoNaviAjaxEnv.getUrls()[this.element]["test"];
    } else {
      return GlycoNaviAjaxEnv.getUrls()[this.element]["default"];
    }
  }

  generateGlycoSampleListUrlTable(criteria) {
    console.log("generateGlycoSampleListUrlTable");
    if (null === criteria || undefined === criteria) {
      return;
    }
    if (criteria == "gene") {

    }
  }

  getRequest(query) {
    console.log("getRequest");
    console.log(this.getUrl() + query);
    fetch(this.getUrl() + query)
      .then(function (response) {
        console.log(response.json());
        return response.json();
      })
      .then(function (myJson) {
        console.log(JSON.stringify(myJson));
      });
  }

  sparqlList() {
    console.log("sparqlList");
    console.log(this.getUrl() + query);
    fetch(this.getUrl() + query)
      .then(function (response) {
        console.log(response.json());
        return response.json();
      })
      .then(function (myJson) {
        console.log(JSON.stringify(myJson));
      });
  }
}
