import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
// import 'web-animations-js/web-animations-next.min.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-icon-button/paper-icon-button.js';

class PageMenu extends PolymerElement {
  static get template() {
    return html`
<style type="text/css">
</style>

<iron-ajax auto="" url="https://test.sparqlist.glyconavi.org/api/GlycoSampleList_v2_count_search?diseasecriteria={{diseasecriteria}}&genecriteria={{genecriteria}}&organismcriteria={{organismcriteria}}&taxonomycriteria={{taxonomycriteria}}" handle-as="json" last-response="{{countdata}}"></iron-ajax>
max:{{_processCount(countdata)}}
page:{{page}}
diseasecriteria:{{diseasecriteria}}
<paper-listbox slot="dropdown-content" selectedItem="[[pageItem]]" selected="{{page}}">
  <paper-listbox id="pages" selected="[[currentPage]]" selected-attribute="page" style="display:flex;flex-direction:row;justify-content:center;align-items: center;">
    <template is="dom-repeat" items="[[generatePageItems(limit, countdata, page)]]">
      <paper-button id="[[item.label]]" on-click="handleClickEvent" class="paper-pagination" hidden$="[[item.hidden]]" page="[[item.page]]" pointer>[[item.label]]</paper-button>
    </template>
  </paper-listbox>
</paper-listbox>
`;
  }

  /**

  <paper-icon-button id="first" on-tap="first" icon="first-page" hidden$="[[hiddenFirstPageButton]]"></paper-icon-button>
  <paper-icon-button id="prev" on-tap="prev" icon="chevron-left" hidden$="[[hiddenPreviousPageButton]]"></paper-icon-button>
  <paper-icon-button id="next" on-tap="next" icon="chevron-right" hidden$="[[hiddenNextPageButton]]"></paper-icon-button>
  <paper-icon-button id="last" on-tap="last" icon="last-page" hidden$="[[hiddenFirstPageButton]]"></paper-icon-button>
      <template is="dom-repeat" items="[[resultdata]]">
        [[item.chem_comp_name]]
      </template>

      */
  constructor() {
    super();
    this.handleClickEvent = this.handleClickEvent.bind(this);
  }
  connectedCallback() {
     super.connectedCallback();
  }
  static get properties() {
    return {
      page: {
        type: String,
        notify: true,
        value: "1"
      },
      max: {
        type: String,
        notify: true
      },
      maxItem: {
        type: Object,
        notify: true
      },
      offset: {
        type: String,
        notify: true,
        value: "10"
      },
      offsetItem: {
        type: Object,
        notify: true
      },
      limit: {
        type: String,
        notify: true,
        value: "10"
      },
      limitItem: {
        type: Object,
        notify: true
      },
      maxResultCount: {
        type: Number,
        notify: true,
        computed: '_processCount(countdata)'
      },
      countdata: {
        notify: true,
        type: Object,
        value: function() {
          return new Object();
        }
      },
      hiddenFirstPageButton: Boolean,
      hiddenLastPageButton: Boolean,
      hiddenNextPageButton: Boolean,
      hiddenPreviousPageButton: Boolean,
                      /**
                 * Current page number
                page: Number,
                 */
                /**
                 * Page count of data
                 */
                count: Number,
                /**
                 * Count of pagination
                 */
                range: {
                    type: Number,
                    value: 5
                },
                /**
                 * Hide first element
                 */
                hideFirst: {
                    type: Boolean,
                    value: false
                },
                /**
                 * Hide last element
                 */
                hideLast: {
                    type: Boolean,
                    value: false
                },
                /**
                 * Hide previous element
                 */
                hidePrevious: {
                    type: Boolean,
                    value: false
                },
                /**
                 * Hide next element
                 */
                hideNext: {
                    type: Boolean,
                    value: false
                },
                /**
                 * Visibiliy
                    computed: '_computedHidden(page, count, range, url)',
                 */
                hidden: {
                    type: Boolean,
                    notify: true,
                    reflectToAttribute: true
                },
                /**
                 * Method name that provides page click event on dom host.
                 * While click event bind, hyper link will be disabled.
                 */
                pageClick: String,
                /**
                 * Page information
                 */
                pageNumber: {
                    type: Array,
                    computed: '_computePageNumber(page, count, range, url)'
                },
                /**
                 * Previous page information, null when current is first page
                 */
                previous: {
                    type: Object,
                    computed: '_computePrevious(page, count, range, url, hidePrevious)'
                },
                /**
                 * Next page information, null when current is last page
                 */
                next: {
                    type: Object,
                    computed: '_computeNext(page, count, range, url, hideNext)'
                },
                /**
                 * First page information, null when current is first page
                 */
                first: {
                    type: Object,
                    computed: '_computeFirst(page, count, range, url, hideFirst)'
                },
                /**
                 * Last page information, null when current is last page
                 */
                last: {
                    type: Object,
                    computed: '_computeLast(page, count, range, url, hideLast)'
                },
      genecriteria: {
        type: String,
        notify: true,
      },
      organismcriteria: {
        type: String,
        notify: true,
      },
      diseasecriteria: {
        type: String,
        notify: true,
      },
      taxonomycriteria: {
        type: String,
        notify: true,
      },
    };
  }
  _processCount(countdata) {
    // console.log("countdata:" + countdata);
    // console.log("countdata[0]:" +  (countdata[0] === undefined? null : countdata[0].count));
    return (countdata[0] === undefined? null : countdata[0].count);
  }

  generatePageItems(limit, countdata, page) {
    page = Math.max(1, page);
    limit = Math.max(10, limit);
    this.maxResultCount = Math.max(1, this._processCount(countdata));
    page = Math.min(limit, page);
    // console.log("page:" + page);
    // console.log("limit:" + limit);
    // console.log("maxResultCount:" + this.maxResultCount);
    let result = [];

    /*
      loop through pages, minimum of 0,
      each one is a count from the limit multiplied by each page until the maximum page
      first set i to be maximum of either 1 or current page x 1 - maximum + 1
      loop to current page x i < maximum
     */
      /*<paper-item class="paper-pagination" hidden$="[[item.hidden]]" page="[[item.page]]" pointer>[[item.label]]</paper-item>*/
    for (let i = 1, o = 0; o <= this.maxResultCount; o=o+limit, i++) {
      result.push({
        hidden: false,
        page: o,
        label: i,
        current: page * 1 === i,
      });
    }

    this.offset = (page - 1) * limit;
    console.log("offset");
    console.log(this.offset);

    return result;
  }
  handleClickEvent(event) {
    const id = event.target.id;
    // console.log('click id:>' + id);
    this.page=id;
  }

          /**
         * Caculate page information
         *
         * @param {Number} page Page number
         * @param {Number} count Page count
         * @param {Number} range Display range
         * @return {Array} Page information
         */
        _computePageNumber(page, count, range) {
            page = Math.max(1, page);
            count = Math.max(1, count);
            range = Math.max(1, range);
            page = Math.min(count, page);
            let result = [];
            for (let i = Math.max(1, page * 1 - range + 1); i <= Math.min(count * 1, page * 1 + range - 1); i++) {
                result.push({
                    css: 'general' + (page * 1 === i ? ' current' : ''),
                    page: i,
                    text: i,
                    current: page * 1 === i,
                    url: this._resolveUrl(i, count, this.url)
                });
            }
            return result;
        }

                /**
         * Caculate previous page information
         *
         * @param {Number} page Page number
         * @param {Number} count Page count
         * @param {Number} range Display range
         * @param {String} url Url template
         * @param {Boolean} hidePrevious Hide previous element
         * @return {Object} Previous page information, null when current is first page
         */
        _computePrevious(page, count, range, url, hidePrevious) {
            page = Math.max(1, page);
            count = Math.max(1, count);
            range = Math.max(1, range);
            page = Math.min(count, page);
            return hidePrevious || (page * 1 === 1) ? null : {
                css: 'general previous',
                page: Math.max(1, page * 1 - 1),
                text: Math.max(1, page * 1 - 1),
                url: this._resolveUrl(Math.max(1, page * 1 - 1), count, url)
            };
        }
        /**
         * Caculate next page information
         *
         * @param {Number} page Page number
         * @param {Number} count Page count
         * @param {Number} range Display range
         * @param {String} url Url template
         * @param {Boolean} hideNext Hide next element
         * @return {Object} Next page information, null when current is last page
         */
        _computeNext(page, count, range, url, hideNext) {
            page = Math.max(1, page);
            count = Math.max(1, count);
            range = Math.max(1, range);
            page = Math.min(count, page);
            return hideNext || (page * 1 === count * 1) ? null : {
                css: 'general next',
                page: Math.min(count * 1, page * 1 + 1),
                text: Math.min(count * 1, page * 1 + 1),
                url: this._resolveUrl(Math.min(count * 1, page * 1 + 1), count, url)
            };
        }
        /**
         * Caculate first page information
         *
         * @param {Number} page Page number
         * @param {Number} count Page count
         * @param {Number} range Display range
         * @param {String} url Url template
         * @param {Boolean} hideFirst Hide first element
         * @return {Object} First page information, null if current is first page
         */
        _computeFirst(page, count, range, url, hideFirst) {
            page = Math.max(1, page);
            count = Math.max(1, count);
            range = Math.max(1, range);
            page = Math.min(count, page);
            return hideFirst || (page * 1 === 1) ? null : {
                css: 'general first',
                page: 1,
                text: 1,
                url: this._resolveUrl(1, count, url)
            };
        }
        /**
         * Caculate last page information
         *
         * @param {Number} page Page number
         * @param {Number} count Page count
         * @param {Number} range Display range
         * @param {String} url Url template
         * @param {Boolean} hideLast Hide last element
         * @return {Object} Last page information, null if current is last page
         */
        _computeLast(page, count, range, url, hideLast) {
            page = Math.max(1, page);
            count = Math.max(1, count);
            range = Math.max(1, range);
            page = Math.min(count, page);
            return hideLast || (page * 1 === count * 1) ? null : {
                css: 'general last',
                page: count * 1,
                text: count * 1,
                url: this._resolveUrl(count * 1, count, url)
            };
        }
        /**
         * Generate real url from template text
         *
         * @param {Number} page Page number
         * @param {Number} count Page count
         * @param {String} template Template of url
         * @returns {String} Url
         */
        _resolveUrl(page, count, template) {
            return (template || '#').replace(/#\{page}/, page)
                .replace(/#\{count}/, count);
        }
        /**
         * Get render template
         *
         * @param {String} name Slot name
         * @return {Class} TemplateInstance class
         */
        _getTemplateType(name) {
            let TemplateClass = this[`__pageTemplate${name}`];
            if (!TemplateClass) {
                let template = this.querySelector(`template[slot=${name}]`);
                if (!template) {
                    console.warn(`equires a <template slot="${name}"> child`);
                    return null;
                }
                // initialize template class
                TemplateClass = this[`__pageTemplate${name}`] = Polymer.Templatize.templatize(template, this, {
                    instanceProps: {
                        css: String,
                        page: Number,
                        text: String,
                        curent: Boolean,
                        url: String
                    }
                });
            }
            return TemplateClass;
        }
}

customElements.define('gn-glycosample-menu', PageMenu);
