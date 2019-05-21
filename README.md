# gn-components

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/gn-components)

## test js


var test={
  "head": {
    "link": [],
    "vars": [
      "disease",
      "count"
    ]
  },
  "results": {
    "distinct": false,
    "ordered": true,
    "bindings": [
      {
        "disease": {
          "type": "literal",
          "value": "pancreatic cancer"
        },
        "count": {
          "type": "typed-literal",
          "datatype": "http://www.w3.org/2001/XMLSchema#integer",
          "value": "11"
        }
      },
      {
        "disease": {
          "type": "literal",
          "value": "complete hydatidiform mole"
        },
        "count": {
          "type": "typed-literal",
          "datatype": "http://www.w3.org/2001/XMLSchema#integer",
          "value": "7"
        }
      },
      {
        "disease": {
          "type": "literal",
          "value": "choriocarcinoma"
        },
        "count": {
          "type": "typed-literal",
          "datatype": "http://www.w3.org/2001/XMLSchema#integer",
          "value": "3"
        }
      },
      {
        "disease": {
          "type": "literal",
          "value": "gestational choriocarcinomas"
        },
        "count": {
          "type": "typed-literal",
          "datatype": "http://www.w3.org/2001/XMLSchema#integer",
          "value": "2"
        }
      },
      {
        "disease": {
          "type": "literal",
          "value": "metastatic choriocarcinoma"
        },
        "count": {
          "type": "typed-literal",
          "datatype": "http://www.w3.org/2001/XMLSchema#integer",
          "value": "2"
        }
      },
      {
        "disease": {
          "type": "literal",
          "value": "chronic pancreatitis"
        },
        "count": {
          "type": "typed-literal",
          "datatype": "http://www.w3.org/2001/XMLSchema#integer",
          "value": "2"
        }
      },
      {
        "disease": {
          "type": "literal",
          "value": "invasive mole"
        },
        "count": {
          "type": "typed-literal",
          "datatype": "http://www.w3.org/2001/XMLSchema#integer",
          "value": "2"
        }
      },
      {
        "disease": {
          "type": "literal",
          "value": "hepatocellular carcinoma"
        },
        "count": {
          "type": "typed-literal",
          "datatype": "http://www.w3.org/2001/XMLSchema#integer",
          "value": "2"
        }
      },
      {
        "disease": {
          "type": "literal",
          "value": "liver cirrhosis"
        },
        "count": {
          "type": "typed-literal",
          "datatype": "http://www.w3.org/2001/XMLSchema#integer",
          "value": "1"
        }
      },
      {
        "disease": {
          "type": "literal",
          "value": "intrauterine choriocarcinoma"
        },
        "count": {
          "type": "typed-literal",
          "datatype": "http://www.w3.org/2001/XMLSchema#integer",
          "value": "1"
        }
      },
      {
        "disease": {
          "type": "literal",
          "value": "gastric cancer"
        },
        "count": {
          "type": "typed-literal",
          "datatype": "http://www.w3.org/2001/XMLSchema#integer",
          "value": "1"
        }
      },
      {
        "disease": {
          "type": "literal",
          "value": "colon cancer"
        },
        "count": {
          "type": "typed-literal",
          "datatype": "http://www.w3.org/2001/XMLSchema#integer",
          "value": "1"
        }
      },
      {
        "disease": {
          "type": "literal",
          "value": "aplastic anemia"
        },
        "count": {
          "type": "typed-literal",
          "datatype": "http://www.w3.org/2001/XMLSchema#integer",
          "value": "1"
        }
      }
    ]
  }
};

// var resultjson =     (
//   {
//   json(test) {
    let bindings = test.results.bindings;
    var item = [];
    test.results.bindings.map((row) => {
      var selectsubject = "";
      var count= 0;
      var firstkey = Object.keys(row)[0];
      console.log(firstkey);
      console.log(row[firstkey]);
      selectsubject = row[firstkey].value ;
      count  = row.count.value ;
      var data = [ selectsubject, parseInt(count) ];
      item.push(data);
      console.log("push");
      console.log(data);
    });
    return item;
//  },
  // text({item}) {
  //   return array.json("\n");
  // }
// });

console.log(JSON.stringify(resultjson));

