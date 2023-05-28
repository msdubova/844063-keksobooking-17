'use strict';
(function () {
  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');
  var formCustomAd = document.querySelector('.ad-form');
  var addressInput = formCustomAd.querySelector('input[name="address"]');
  var map = document.querySelector('.map');
  var adTitleInput = formCustomAd.querySelector('#title');
  var adTypeSelect = formCustomAd.querySelector('#type');
  var adPriceInput = formCustomAd.querySelector('#price');
  var adCheckinSelect = formCustomAd.querySelector('#timein');
  var adCheckOutSelect = formCustomAd.querySelector('#timeout');
  var adRoomSelect = formCustomAd.querySelector('#room_number');
  var adCapacitySelect = formCustomAd.querySelector('#capacity');

  window.globalElements = {
    map: map,
    mapPins: mapPins,
    mapPinMain: mapPinMain,
    addressInput: addressInput,
    formCustomAd: formCustomAd,
    target: adTitleInput,
    adTypeSelect: adTypeSelect,
    adPriceInput: adPriceInput,
    adCheckinSelect: adCheckinSelect,
    adCheckOutSelect: adCheckOutSelect,
    adRoomSelect: adRoomSelect,
    adCapacitySelect: adCapacitySelect
  };
})();


