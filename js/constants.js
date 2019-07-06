'use strict';
(function () {
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var PIN_TAIL_HEIGHT = 22;
  var LOWLINE_Y = 130;
  var TOPLINE_Y = 630;
  var ELEMENTS_COUNT = 5;

  var Price = {
    LOW_PRICE_LIMIT: 10000,
    HIGH_PRICE_LIMIT: 50000
  }

  window.constants = {
    TYPES: TYPES,
    PIN_TAIL_HEIGHT: PIN_TAIL_HEIGHT,
    LOWLINE_Y: LOWLINE_Y,
    TOPLINE_Y: TOPLINE_Y,
    ELEMENTS_COUNT: ELEMENTS_COUNT,
    Price: Price
  };
})();

