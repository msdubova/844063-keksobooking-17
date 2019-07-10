'use strict';
var f1 = function (){
  alert('Callback');
};

var generateEventListener = function (element, event, cb) {
  element.addEventListener(event, cb);
};

generateEventListener(window.globalElements.mapPinMain, 'click', f1);


var f2
