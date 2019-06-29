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

  /**
 * Функция- обработчик, обрабатывает событие перетаскивания пина
 * @param {object} evt объeкт события
 */
  var dragDropPin = function (evt) {
    evt.preventDefault();

    window.startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  /**
   * Функция ограничивает поле перемещения пина
   */
  var setPinCoordinate = function () {
    if (window.topCoord + PIN_TAIL_HEIGHT + mapPinMain.clientHeight < LOWLINE_Y) {
      window.topCoord = LOWLINE_Y - PIN_TAIL_HEIGHT - mapPinMain.clientHeight;
    } else if (window.topCoord + PIN_TAIL_HEIGHT + mapPinMain.clientHeight > TOPLINE_Y) {
      window.topCoord = TOPLINE_Y - PIN_TAIL_HEIGHT - mapPinMain.clientHeight;
    } else {
      mapPinMain.style.top = window.topCoord + 'px';
    }

    if (window.leftCoord < 0) {
      window.leftCoord = 0;
    } else if (window.leftCoord + mapPinMain.clientWidth > mapPins.offsetWidth) {
      window.leftCoord = mapPins.offsetWidth - mapPinMain.clientWidth;
    } else {
      mapPinMain.style.left = window.leftCoord + 'px';
    }
    mapPinMain.style.left = window.leftCoord + 'px';
    mapPinMain.style.top = window.topCoord + 'px';
  };

  /**
   * Функция-обработчик перемещения мыши - перемещает пин по движению мыши и запускает ограничитель поля перемещения
   * @param {object} moveEvt объeкт события
   */
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = {
      x: window.startCoords.x - moveEvt.clientX,
      y: window.startCoords.y - moveEvt.clientY
    };

    window.startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    window.topCoord = (mapPinMain.offsetTop - shift.y);
    window.leftCoord = (mapPinMain.offsetLeft - shift.x);

    setPinCoordinate();
  };

  /**
   * Функция-обработчик события отпускания мыши - записывает координаты сброса пина в форму и удаляет обработчики мыши перемещения
   * @param {object} upEvt  объeкт события
   */
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    fillPinAddressOnActiveMap(mapPinMain, PIN_TAIL_HEIGHT);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  /**
   * Функция записывает координаты нижней центральной точки переданного элемента в поле Input (address)
   * @param {Element} el элемент, чьи координаты необходимо получить
   */
  var fillPinAddressOnActiveMap = function (el) {
    addressInput.value = (getParameterNumValue(el.style.left) + Math.round(getParameterNumValue(el.clientWidth) / 2)) + ', '
        + (getParameterNumValue(el.style.top) + getParameterNumValue(el.clientHeight) + PIN_TAIL_HEIGHT);
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
    getParameterNumValue: getParameterNumValue,
    dragDropPin: dragDropPin,
    fillPinAddressOnActiveMap: fillPinAddressOnActiveMap
  };
})();
