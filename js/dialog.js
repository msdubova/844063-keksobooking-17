'use strict';

(function () {
  var constants = window.constants;
  var globals = window.globalElements;
  var utils = window.util;
  window.activated = false;

  /**
   * Функция записывает координаты нижней центральной точки переданного элемента в поле Input (address)
   * @param {HTMLSelectElement} el элемент, чьи координаты необходимо получить
   * @return {void}
   */
  var fillPinAddressOnActiveMap = function (el) {
    globals.addressInput.value = (utils.getParameterNumValue(el.style.left) + Math.round(utils.getParameterNumValue(el.clientWidth) / 2)) + ', '
      + (utils.getParameterNumValue(el.style.top) + utils.getParameterNumValue(el.clientHeight) + constants.PIN_TAIL_HEIGHT);
  };

  /**
   * Функция - обработчик, реализует перемещение пина по мышиным событиям драгндроп
   * @param {MouseEvent} evt объeкт события
   * @return {void}
   */
  window.onPinDrag = function (evt) {
    evt.preventDefault();
    var dragged = false;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    /**
     * Функция-обработчик перемещения мыши - перемещает пин по движению мыши и запускает ограничитель поля перемещения
     * @param {MouseEvent} moveEvt объeкт события
     * @return {void}
     */
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var topCoord = (globals.mapPinMain.offsetTop - shift.y);
      var leftCoord = (globals.mapPinMain.offsetLeft - shift.x);

      /**
       * Функция ограничивает поле перемещения пина
       * @return {void}
       */
      var setPinCoordinate = function () {
        if (topCoord + constants.PIN_TAIL_HEIGHT + globals.mapPinMain.clientHeight < constants.LOWLINE_Y) {
          topCoord = constants.LOWLINE_Y - constants.PIN_TAIL_HEIGHT - globals.mapPinMain.clientHeight;
        } else if (topCoord + constants.PIN_TAIL_HEIGHT + globals.mapPinMain.clientHeight > constants.TOPLINE_Y) {
          topCoord = constants.TOPLINE_Y - constants.PIN_TAIL_HEIGHT - globals.mapPinMain.clientHeight;
        }

        if (leftCoord < 0) {
          leftCoord = 0;
        } else if (leftCoord + globals.mapPinMain.clientWidth > globals.mapPins.offsetWidth) {
          leftCoord = globals.mapPins.offsetWidth - globals.mapPinMain.clientWidth;
        }

        globals.mapPinMain.style.left = leftCoord + 'px';
        globals.mapPinMain.style.top = topCoord + 'px';
      };

      setPinCoordinate();
    };

    /**
     * Функция-обработчик события отпускания мыши - записывает координаты сброса пина в форму и удаляет обработчики мыши перемещения
     * @param {MouseEvent} upEvt объeкт события
     * @return {void}
     */
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      if ((dragged) && (!window.activated)) {
        window.runActivation();
        window.activated = true;
      }
      fillPinAddressOnActiveMap(globals.mapPinMain, constants.PIN_TAIL_HEIGHT);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      globals.mapPinMain.removeEventListener('keydown', window.onPinKeydown);
    };


    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.onPinKeydown = function (evt) {
    if ((evt.keyCode === window.constants.ENTER_CODE) && (!window.activated)) {
      window.runActivation();
      window.activated = true;
    }
    fillPinAddressOnActiveMap(globals.mapPinMain, constants.PIN_TAIL_HEIGHT);
    globals.mapPinMain.removeEventListener('keydown', window.onPinKeydown);
  };
  globals.mapPinMain.addEventListener('keydown', window.onPinKeydown);
  globals.mapPinMain.addEventListener('mousedown', window.onPinDrag);

})();
