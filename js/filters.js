'use strict';

(function () {
  var filters = window.globalElements.map.querySelector('.map__filters');
  var housingTypeFilter = filters.querySelector('#housing-type');
  var housingPriceFilter = filters.querySelector('#housing-price');
  var housingRoomsFilter = filters.querySelector('#housing-rooms');
  var housingGuestsFilter = filters.querySelector('#housing-guests');

  var wifiFilter = filters.querySelector('#filter-wifi');
  var dishwasherFilter = filters.querySelector('#filter-dishwasher');
  var parkingFilter = filters.querySelector('#filter-parking');
  var washerFilter = filters.querySelector('#filter-washer');
  var elevatorFilter = filters.querySelector('#filter-elevator');
  var conditionerFilter = filters.querySelector('#filter-conditioner');


  window.cleanMap = function () {
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
      if (typeChoice === 'any') {
        return it;
      } else {
        return it.offer.type === typeChoice;
      }
    };

    var hasMatchingPrice = function (it) {
      if (priceChoice === 'any') {
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
        return it.offer.rooms === parseInt(roomsChoice, 10);
      }
    };

    var hasMatchingGuests = function (it) {
      if (guestsChoice === 'any') {
        return it;
      } else if (guestsChoice === '0') {
        return it.offer.guests === parseInt(guestsChoice, 10);
      } else {
        return it.offer.guests >= guestsChoice;
      }
    };

    var wifiProvided = function (it) {
      if (wifiFilter.checked) {
        return (it.offer.features.indexOf('wifi') !== -1);
      } else {
        return it;
      }
    };
    var dishwasherProvided = function (it) {
      if (dishwasherFilter.checked) {
        return (it.offer.features.indexOf('dishwasher') !== -1);
      } else {
        return it;
      }
    };

    var parkingProvided = function (it) {
      if (parkingFilter.checked) {
        return (it.offer.features.indexOf('parking') !== -1);
      } else {
        return it;
      }
    };

    var washerProvided = function (it) {
      if (washerFilter.checked) {
        return (it.offer.features.indexOf('washer') !== -1);
      } else {
        return it;
      }
    };

    var elevatorProvided = function (it) {
      if (elevatorFilter.checked) {
        return (it.offer.features.indexOf('elevator') !== -1);
      } else {
        return it;
      }
    };

    var conditionerProvided = function (it) {
      if (conditionerFilter.checked) {
        return (it.offer.features.indexOf('conditioner') !== -1);
      } else {
        return it;
      }
    };


    var filteredAds = ads.filter(hasMatchingType)
      .filter(hasMatchingPrice)
      .filter(hasMatchingRooms)
      .filter(hasMatchingGuests)
      .filter(wifiProvided)
      .filter(dishwasherProvided)
      .filter(parkingProvided)
      .filter(washerProvided)
      .filter(elevatorProvided)
      .filter(conditionerProvided);

    if (filteredAds.length > 5) {
      var sliced = filteredAds.slice(1, 6);
      window.onRenderPins(sliced);
    } else {
      window.onRenderPins(filteredAds);
    }
  };


  var onFilterChange = window.debounce(
      function (evt) {
        evt.preventDefault();
        window.cleanMap();
        updatePins(evt);
      }
  );

  filters.addEventListener('change', onFilterChange);
})();


