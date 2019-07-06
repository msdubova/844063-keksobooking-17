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

    var hasMatchingType = function (it) {
      if (typeChoice == 'any') {
        return it;
      } else {
        return it.offer.type == typeChoice;
      }
    };

    var hasMatchingPrice = function (it) {
      if (priceChoice == 'any') {
        return it;
      } else {
        var price;
        if (it.offer.price < window.constants.Price.LOW_PRICE_LIMIT) {
          price = 'low';
        } else if ((it.offer.price >= window.constants.Price.LOW_PRICE_LIMIT) && (it.offer.price < window.constants.Price.HIGH_PRICE_LIMIT)) {
          price = 'middle';
        } else if (it.offer.price >= window.constants.Price.HIGH_PRICE_LIMIT) {
          price = 'high';
        }
        return price === priceChoice;
      }
    };

    var hasMatchingRooms = function (it) {
      if (roomsChoice === 'any') {
        return it;
      } else {
        return it.offer.rooms == roomsChoice;
      }
    };

    var hasMatchingGuests = function (it) {
      if (guestsChoice == 'any') {
        return it;
      } else {
        return it.offer.guests == guestsChoice;
      }
    };

    var filteredAds = ads.filter(hasMatchingType).filter(hasMatchingPrice).filter(hasMatchingRooms).filter(hasMatchingGuests);

    if (filteredAds.length > 5) {
      var sliced = filteredAds.slice(5);
      window.renderPins(sliced);
    } else {
      window.renderPins(filteredAds);
    }
  };

  var onFilterChange = function (evt) {
    evt.preventDefault();
    cleanMap();
    updatePins();
  };

  filters.addEventListener('change', onFilterChange);
})();


