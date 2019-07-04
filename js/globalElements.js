'use strict';
(function () {
  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');
  var formCustomAd = document.querySelector('.ad-form');
  var addressInput = formCustomAd.querySelector('input[name="address"]');
  var map = document.querySelector('.map');


  window.globalElements = {
    map: map,
    mapPins: mapPins,
    mapPinMain: mapPinMain,
    addressInput: addressInput,
    formCustomAd: formCustomAd
  };
})();


