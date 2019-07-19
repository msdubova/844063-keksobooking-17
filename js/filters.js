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
  window.checkboxes = Array.from(document.querySelectorAll('input[type=checkbox]'));

  window.checkboxes.forEach(function (checkboxItem) {
    var onCheckboxKeydown = function (evt) {
      if (evt.keyCode === window.constants.ENTER_CODE) {
        if (!checkboxItem.checked) {
          checkboxItem.setAttribute('checked', 'checked');
          onFilterChange(evt);
        } else if (checkboxItem.checked) {
          checkboxItem.removeAttribute('checked', 'checked');
          onFilterChange(evt);
        }
      }
    };
    checkboxItem.addEventListener('keydown', onCheckboxKeydown);
  });

  window.cleanMap = function () {
    var pins = Array.from(window.globalElements.mapPins.querySelectorAll('button[type = button]'));

    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  var hasMatchingType = function (pin) {
    if (window.typeChoice === 'any') {
      return pin;
    }
    return pin.offer.type === window.typeChoice;
  };

  var hasMatchingPrice = function (pin) {
    if (window.priceChoice === 'any') {
      return pin;
    } else {
      var price;
      if (pin.offer.price < window.constants.Price.LOW_PRICE_LIMIT) {
        price = 'low';
      } else if ((pin.offer.price >= window.constants.Price.LOW_PRICE_LIMIT) && (pin.offer.price < window.constants.Price.HIGH_PRICE_LIMIT)) {
        price = 'middle';
      } else if (pin.offer.price >= window.constants.Price.HIGH_PRICE_LIMIT) {
        price = 'high';
      }
      return price === window.priceChoice;
    }
  };

  var hasMatchingRooms = function (pin) {
    if (window.roomsChoice === 'any') {
      return pin;
    }
    return pin.offer.rooms === parseInt(window.roomsChoice, 10);

  };

  var hasMatchingGuests = function (pin) {
    if (window.guestsChoice === 'any') {
      return pin;
    } else if (window.guestsChoice === '0') {
      return pin.offer.guests === parseInt(window.guestsChoice, 10);
    } else {
      return pin.offer.guests === parseInt(window.guestsChoice, 10);
    }
  };

  var generateIsFn = function (service, key) {
    return function (it) {
      if (service.checked) {
        return (it.offer.features.indexOf(key) !== -1);
      }
      return it;
    };
  };

  var updatePins = function () {
    window.typeChoice = housingTypeFilter.value;
    window.priceChoice = housingPriceFilter.value;
    window.roomsChoice = housingRoomsFilter.value;
    window.guestsChoice = housingGuestsFilter.value;
    var ads = window.pins;
    var filteredAds = ads.filter(hasMatchingType)
      .filter(hasMatchingPrice)
      .filter(hasMatchingRooms)
      .filter(hasMatchingGuests)
      .filter(generateIsFn(wifiFilter, 'wifi'))
      .filter(generateIsFn(dishwasherFilter, 'dishwasher'))
      .filter(generateIsFn(parkingFilter, 'parking'))
      .filter(generateIsFn(washerFilter, 'washer'))
      .filter(generateIsFn(elevatorFilter, 'elevator'))
      .filter(generateIsFn(conditionerFilter, 'conditioner'));

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
        if (window.globalElements.mapPins.querySelector('article')) {
          window.globalElements.mapPins.querySelector('article').remove();
        }
        (document.removeEventListener('keydown', window.onEscPush));

      }
  );

  filters.addEventListener('change', onFilterChange);
})();


