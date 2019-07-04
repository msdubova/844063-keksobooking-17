'use strict';

(function () {
  var filters = window.globalElements.map.querySelector('.map__filters');
  // filters.addEventListener('change', function (evt) {
  // evt.preventDefault();
  // filters.style.background = 'red';
  // });

  var housingTypeFilter = filters.querySelector('#housing-type');
  var housingPriceFilter = filters.querySelector('#housing-price');
  var housingRoomsFilter = filters.querySelector('#housing-rooms');
  var housingGuestsFilter = filters.querySelector('#housing-guests');
  var wifiFilter = filters.querySelector('#filter-wifi');
  var dishFilter = filters.querySelector('#filter-dishwasher');
  var parkFilter = filters.querySelector('#filter-parking');
  var washerFilter = filters.querySelector('#filter-washer');
  var elevatorFilter = filters.querySelector('#filter-elevator');
  var condFilter = filters.querySelector('#filter-conditioner');

var choice;
  var cleanMap = function () {
    var pins = window.globalElements.mapPins.querySelectorAll('button[type = button]');
    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
  };

  var updatePins = function () {
    var sameChoice = window.pins.filter(function(it) {
      return it.offer.type === choice;
    });
    window.renderPins(sameChoice);
  };

  var onFilterChange = function (evt) {
    evt.preventDefault();
    choice = evt.target.value;
    alert(choice);
    cleanMap();
    updatePins();
  };

  housingTypeFilter.addEventListener('change', onFilterChange);
  housingPriceFilter.addEventListener('change', onFilterChange);
  housingGuestsFilter.addEventListener('change', onFilterChange);
  housingRoomsFilter.addEventListener('change', onFilterChange);
  wifiFilter.addEventListener('change', onFilterChange);
  dishFilter.addEventListener('change', onFilterChange);
  parkFilter.addEventListener('change', onFilterChange);
  washerFilter.addEventListener('change', onFilterChange);
  elevatorFilter.addEventListener('change', onFilterChange);
  condFilter.addEventListener('change', onFilterChange);
})();


