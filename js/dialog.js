'use strict';

(function () {
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

    document.addEventListener('mousemove', window.functional.onMouseMove);
    document.addEventListener('mouseup', window.functional.onMouseUp);
  };
  window.globalElements.mapPinMain.addEventListener('mousedown', function (evt) {
    dragDropPin(evt);
  });
})();
