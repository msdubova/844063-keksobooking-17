'use strict';

var mapPins = document.querySelector('.map__pins');
var mapPinMain = document.querySelector('.map__pin--main');
var formCustomAd = document.querySelector('.ad-form');
var addressInput = formCustomAd.querySelector('input[name="address"]');


window.globalElements = {
  mapPins: mapPins,
  mapPinMain: mapPinMain,
  addressInput: addressInput,
  formCustomAd: formCustomAd
};
