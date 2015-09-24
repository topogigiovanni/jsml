/*!
 * jsml - javascript markup language
 * from topogigiovanni https://github.com/topogigiovanni/jsml
 * 
 */
( function( window ) {

'use strict';

// helpers
function _getDomElementData(el, depth){
  depth = depth || 0;
  var response = {};
  response.nodeName = el.nodeName.toLowerCase();
  response.children = [];
  //$.extend( response, el.attributes);
  var attr,
      attributesLength = el.attributes.length;
  console.log('el.attributes',el, el.attributes);
  // for( attr in el.attributes) {
  //   console.log('attr for', attr);
  //   response[attr.name] = attr.value; 
  // }

  for (var i = 0; i < attributesLength; i++) {
    var attr = el.attributes[i];
    console.log('attr for', attr);
    response[attr.name] = attr.value; 
  };

  /*
    verifica se tem filhos "children"
    e vai inserindo recursivamente
  */
  var childrenLength = el.children.length;
  if(childrenLength){
    depth++;
    // TODO terminar 
    for (var ii = 0; ii < childrenLength; ii++) {
      var child = el.children[ii];
      console.log('childrenLength child', child, child.attributes);
      //response[attr.name] = attr.value; 
    };

  };

  return response;
};

var generateJSON;

generateJSON = function(){
  var response = [];
  //$('body > *') e fazer recursividade interna
  // $('*').not('body')
  $('body > *').each(function(){
    var attributes = _getDomElementData(this);
    response.push(attributes);
  });
  return JSON.stringify(response);
};

var jsml = {
  generateJSON: generateJSON
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( jsml );
} else {
  // browser global
  window.jsml = jsml;
}

})( window );
