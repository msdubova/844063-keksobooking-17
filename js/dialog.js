'use strict';

var mainPin = document.querySelector('.map__pin--main');
var addressInput = document.querySelector('input[name="address"]');
var PIN_TAIL_HEIGHT = 22;
var LOWLINE_Y = 130;
var TOPLINE_Y = 630;
var viewport = document.querySelector('.map__pins');

/**
 * Функция возращает числовое значение запрашиваемого параметра заданного элемента
 * @param {string} parameterStringValue
 * @return {number} числовое значение любогозапрашиваемого параметра элемента
 */
var getParameterNumValue = function (parameterStringValue) {
  return Math.round(parseInt(parameterStringValue, 10));
};

/**
 * Функция записывает координаты нижней центральной точки переданного элемента в поле Input (address)
 * @param {object} element
 */
var fillPinAddressOnActiveMap = function (element) {
  addressInput.value = (getParameterNumValue(element.style.left) + Math.round(getParameterNumValue(element.clientWidth) / 2)) + ', '
      + (getParameterNumValue(element.style.top) + getParameterNumValue(element.clientHeight) + PIN_TAIL_HEIGHT);
};

mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var top = (mainPin.offsetTop - shift.y);
    var left = (mainPin.offsetLeft - shift.x);

    var setPinCoordinate = function () {
      if (top + PIN_TAIL_HEIGHT + mainPin.clientHeight < LOWLINE_Y) {
        top = LOWLINE_Y - PIN_TAIL_HEIGHT;
      } else if (top + PIN_TAIL_HEIGHT + mainPin.clientHeight > TOPLINE_Y) {
        top = TOPLINE_Y + PIN_TAIL_HEIGHT + mainPin.clientHeight;
      } else {
        mainPin.style.top = top + 'px';
      }
      if (left < 0) {
        left = 0;
      } else if (left + mainPin.clientWidth > viewport.offsetWidth) {
        left = viewport.offsetWidth - mainPin.clientWidth;
      } else {
        mainPin.style.left = left + 'px';
      }
    };

    setPinCoordinate();
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    fillPinAddressOnActiveMap(mainPin, PIN_TAIL_HEIGHT);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
