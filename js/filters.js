'use strict';

(function () {
  var filters = window.globalElements.map.querySelector('.map__filters');

  var housingTypeFilter = filters.querySelector('#housing-type');
  var housingPriceFilter = filters.querySelector('#housing-price');
  var housingRoomsFilter = filters.querySelector('#housing-rooms');
  var housingGuestsFilter = filters.querySelector('#housing-guests');

  var cleanMap = function () {
    var pins = window.globalElements.mapPins.querySelectorAll('button[type = button]');
    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
  };


  var updatePins = function () {
    var ads = window.pins;
    var typeChoice = housingTypeFilter.value;
    var priceChoice = housingPriceFilter.value;
    var roomsChoice = housingRoomsFilter.value;
    var guestsChoice = housingGuestsFilter.value;

    var typeFiltered = ads.filter(function (it) {
      if (typeChoice == 'any') {
        return it;
      } else {
        return it.offer.type == typeChoice;
      }
    });

    var priceFiltered = typeFiltered.filter(function (it) {
      if (priceChoice == 'any') {
        return it;
      } else {
        var price;
        if (it.offer.price < 10000) {
          price = 'low';
        } else if ((it.offer.price >= 10000) && (it.offer.price < 50000)) {
          price = 'middle';
        } else if (it.offer.price >= 50000) {
          price = 'high';
        }
        return price === priceChoice;
      }
    });

    var roomsFiltered = priceFiltered.filter(function (it) {
      if (roomsChoice === 'any') {
        return it;
      } else {
        return it.offer.rooms == roomsChoice;
      }
    });

    var guestsFiltered = roomsFiltered.filter(function (it) {
      if (guestsChoice == 'any') {
        return it;
      } else {
        return it.offer.guests == guestsChoice;
      }
    });

    window.renderPins(guestsFiltered);
  };

  var onFilterChange = function (evt) {
    evt.preventDefault();

    cleanMap();
    updatePins();
  };

  filters.addEventListener('change', onFilterChange);
})();


