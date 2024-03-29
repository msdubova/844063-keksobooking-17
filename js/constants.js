'use strict';
(function () {
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var PIN_TAIL_HEIGHT = 22;
  var LOWLINE_Y = 130;
  var TOPLINE_Y = 630;
  var ELEMENTS_COUNT = 5;
  var ESCAPE_CODE = 27;
  var ENTER_CODE = 13;
  var START_X = 570;
  var START_Y = 375;
  var DEBOUNCE_INTERVAL = 500;
  var Price = {
    LOW_PRICE_LIMIT: 10000,
    HIGH_PRICE_LIMIT: 50000
  };

  window.constants = {
    TYPES: TYPES,
    PIN_TAIL_HEIGHT: PIN_TAIL_HEIGHT,
    LOWLINE_Y: LOWLINE_Y,
    TOPLINE_Y: TOPLINE_Y,
    ELEMENTS_COUNT: ELEMENTS_COUNT,
    ESCAPE_CODE: ESCAPE_CODE,
    ENTER_CODE: ENTER_CODE,
    START_X: START_X,
    START_Y: START_Y,
    DEBOUNCE_INTERVAL: DEBOUNCE_INTERVAL,
    Price: Price
  };
})();

