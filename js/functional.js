'use strict';

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

  window.topCoord = (window.globalElements.mapPinMain.offsetTop - shift.y);
  window.leftCoord = (window.globalElements.mapPinMain.offsetLeft - shift.x);

  setPinCoordinate();
};

/**
 * Функция-обработчик события отпускания мыши - записывает координаты сброса пина в форму и удаляет обработчики мыши перемещения
 * @param {object} upEvt  объeкт события
 */
var onMouseUp = function (upEvt) {
  upEvt.preventDefault();
  fillPinAddressOnActiveMap(window.globalElements.mapPinMain, window.constants.PIN_TAIL_HEIGHT);
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
};


/**
 * Функция ограничивает поле перемещения пина
 */
var setPinCoordinate = function () {
  if (window.topCoord + window.constants.PIN_TAIL_HEIGHT + window.globalElements.mapPinMain.clientHeight < window.constants.LOWLINE_Y) {
    window.topCoord = window.constants.LOWLINE_Y - window.constants.PIN_TAIL_HEIGHT - window.globalElements.mapPinMain.clientHeight;
  } else if (window.topCoord + window.constants.PIN_TAIL_HEIGHT + window.globalElements.mapPinMain.clientHeight > window.constants.TOPLINE_Y) {
    window.topCoord = window.constants.TOPLINE_Y - window.constants.PIN_TAIL_HEIGHT - window.globalElements.mapPinMain.clientHeight;
  } else {
    window.globalElements.mapPinMain.style.top = window.topCoord + 'px';
  }

  if (window.leftCoord < 0) {
    window.leftCoord = 0;
  } else if (window.leftCoord + window.globalElements.mapPinMain.clientWidth > window.globalElements.mapPins.offsetWidth) {
    window.leftCoord = window.globalElements.mapPins.offsetWidth - window.globalElements.mapPinMain.clientWidth;
  } else {
    window.globalElements.mapPinMain.style.left = window.leftCoord + 'px';
  }
  window.globalElements.mapPinMain.style.left = window.leftCoord + 'px';
  window.globalElements.mapPinMain.style.top = window.topCoord + 'px';
};


/**
 * Функция записывает координаты нижней центральной точки переданного элемента в поле Input (address)
 * @param {Element} el элемент, чьи координаты необходимо получить
 */
var fillPinAddressOnActiveMap = function (el) {
  window.globalElements.addressInput.value = (window.util.getParameterNumValue(el.style.left) + Math.round(window.util.getParameterNumValue(el.clientWidth) / 2)) + ', '
    + (window.util.getParameterNumValue(el.style.top) + window.util.getParameterNumValue(el.clientHeight) + PIN_TAIL_HEIGHT);
};

window.functional = {
  onMouseMove: onMouseMove,
  onMouseUp: onMouseUp

}
