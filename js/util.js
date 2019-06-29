'use strict';
(function () {
  var mapPins = document.querySelector('.map__pins');
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var LOWLINE_Y = 130;
  var TOPLINE_Y = 630;
  var ELEMENTS_COUNT = 8;
  var dragged = false;

  var formCustomAd = document.querySelector('.ad-form');
  var formFieldsets = formCustomAd.children;
  var mapPinMain = document.querySelector('.map__pin--main');
  var addressInput = formCustomAd.querySelector('input[name="address"]');
  var PIN_TAIL_HEIGHT = 22;

  /**
   * Функция генерирует случайное число в указанном диапазоне
   * @param {number} min минимальное число включительно
   * @param {number} max максимальное число невключительно
   * @return {number} округленное до целого числа случайное число в обозначенном промежутке
   */
  var getRandomInRange = function (min, max) {
    return (Math.round(Math.random() * (max - min) + min));
  };
  /**
   * Функция перемешивает элементы массива
   * @param {arr} arr принимает массив элементов
   * @return {number[]} Возвращает перемешанный массив
   */
  var shuffleArray = function (arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  };

    /**
     * Функция возращает числовое значение запрашиваемого параметра заданного элемента
     * @param {string} parameterStringValue
     * @return {number} числовое значение любогозапрашиваемого параметра элемента
     */
  var getParameterNumValue = function (parameterStringValue) {
    return Math.round(parseInt(parameterStringValue, 10));
  };

  window.util = {
    mapPins: mapPins,
    types: types,
    LOWLINE_Y: LOWLINE_Y,
    TOPLINE_Y: TOPLINE_Y,
    PIN_TAIL_HEIGHT: PIN_TAIL_HEIGHT,
    ELEMENTS_COUNT: ELEMENTS_COUNT,
    dragged: dragged,
    formCustomAd: formCustomAd,
    formFieldsets: formFieldsets,
    mapPinMain: mapPinMain,
    addressInput: addressInput,
    getRandomInRange: getRandomInRange,
    shuffleArray: shuffleArray,
    getParameterNumValue: getParameterNumValue
  };
})();
