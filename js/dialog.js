'use strict';

(function () {
  var consts = window.constants;
  var globs = window.globalElements;
  var utils = window.util;
  var activated = false;
  /**
   * Функция - обработчик, реализует перемещение пина по мышиным событиям драгндроп
   * @param {object} evt объeкт события
   */
  window.dragDropPin = function (evt) {
    evt.preventDefault();
    var dragged = false;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    /**
     * Функция-обработчик перемещения мыши - перемещает пин по движению мыши и запускает ограничитель поля перемещения
     * @param {object} moveEvt объeкт события
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

      var topCoord = (globs.mapPinMain.offsetTop - shift.y);
      var leftCoord = (globs.mapPinMain.offsetLeft - shift.x);

      /**
       * Функция ограничивает поле перемещения пина
       */
      var setPinCoordinate = function () {
        if (topCoord + consts.PIN_TAIL_HEIGHT + globs.mapPinMain.clientHeight < consts.LOWLINE_Y) {
          topCoord = consts.LOWLINE_Y - consts.PIN_TAIL_HEIGHT - globs.mapPinMain.clientHeight;
        } else if (topCoord + consts.PIN_TAIL_HEIGHT + globs.mapPinMain.clientHeight > consts.TOPLINE_Y) {
          topCoord = consts.TOPLINE_Y - consts.PIN_TAIL_HEIGHT - globs.mapPinMain.clientHeight;
        }

        if (leftCoord < 0) {
          leftCoord = 0;
        } else if (leftCoord + globs.mapPinMain.clientWidth > globs.mapPins.offsetWidth) {
          leftCoord = globs.mapPins.offsetWidth - globs.mapPinMain.clientWidth;
        }

        globs.mapPinMain.style.left = leftCoord + 'px';
        globs.mapPinMain.style.top = topCoord + 'px';
      };

      setPinCoordinate();
    };

    /**
     * Функция-обработчик события отпускания мыши - записывает координаты сброса пина в форму и удаляет обработчики мыши перемещения
     * @param {object} upEvt объeкт события
     */
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      if ((dragged) && (!activated)) {
        window.runActivation();
        activated = true;
      }
      fillPinAddressOnActiveMap(globs.mapPinMain, consts.PIN_TAIL_HEIGHT);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

    };

    /**
     * Функция записывает координаты нижней центральной точки переданного элемента в поле Input (address)
     * @param {HTMLElement} el элемент, чьи координаты необходимо получить
     */
    var fillPinAddressOnActiveMap = function (el) {
      globs.addressInput.value = (utils.getParameterNumValue(el.style.left) + Math.round(utils.getParameterNumValue(el.clientWidth) / 2)) + ', '
        + (utils.getParameterNumValue(el.style.top) + utils.getParameterNumValue(el.clientHeight) + consts.PIN_TAIL_HEIGHT);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };


  globs.mapPinMain.addEventListener('mousedown', function (evt) {
    window.dragDropPin(evt);
  });

})();
