'use strict';
// coordinates
(function () {

  /**
   * Функция записывает координаты нижней центральной точки переданного элемента в поле Input (address)
   * @param {Element} element
   */
  var fillPinAddressOnActiveMap = function (element) {
    window.util.addressInput.value = (window.util.getParameterNumValue(element.style.left) + Math.round(window.util.getParameterNumValue(element.clientWidth) / 2)) + ', '
        + (window.util.getParameterNumValue(element.style.top) + window.util.getParameterNumValue(element.clientHeight) + window.util.PIN_TAIL_HEIGHT);
  };

  window.util.mapPinMain.addEventListener('mousedown', function (evt) {
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

      var top = (window.util.mapPinMain.offsetTop - shift.y);
      var left = (window.util.mapPinMain.offsetLeft - shift.x);

      var setPinCoordinate = function () {
        if (top + window.util.PIN_TAIL_HEIGHT + window.util.mapPinMain.clientHeight < window.util.LOWLINE_Y) {
          top = window.util.LOWLINE_Y - window.util.PIN_TAIL_HEIGHT - window.util.mapPinMain.clientHeight;
        } else if (top + window.util.PIN_TAIL_HEIGHT + window.util.mapPinMain.clientHeight > window.util.TOPLINE_Y) {
          top = window.util.TOPLINE_Y - window.util.PIN_TAIL_HEIGHT - window.util.mapPinMain.clientHeight;
        } else {
          window.util.mapPinMain.style.top = top + 'px';
        }


        if (left < 0) {
          left = 0;
        } else if (left + window.util.mapPinMain.clientWidth > window.util.mapPins.offsetWidth) {
          left = window.util.mapPins.offsetWidth - window.util.mapPinMain.clientWidth;
        } else {
          window.util.mapPinMain.style.left = left + 'px';
        }
        window.util.mapPinMain.style.left = left + 'px';
        window.util.mapPinMain.style.top = top + 'px';
      };

      setPinCoordinate();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      fillPinAddressOnActiveMap(window.util.mapPinMain, window.util.PIN_TAIL_HEIGHT);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };


    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();

