/*!
 * jsml - javascript markup language
 * from topogigiovanni https://github.com/topogigiovanni/jsml
 * 
 * jsml.has( elem, 'my-class' ) -> true/false

 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

/* ====================================== */
// helpers
function _getDomElementData(el, depth){
  depth = depth || 0;
  var response = {};
  response.nodeName = el.nodeName.toLowerCase();
  response.children = [];
  //$.extend( response, el.attributes);
  var attr,
      length = el.attributes.length
  console.log('el.attributes', el.attributes);
  // for( attr in el.attributes) {
  //   console.log('attr for', attr);
  //   response[attr.name] = attr.value; 
  // }

  for (var i = 0; i < length; i++) {
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
  }

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
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass,

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
