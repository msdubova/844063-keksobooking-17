'use strict';

(function () {
  var dragged = false;

  /**
   * Функция-обрабочик , слушает клик на главную булавку при загрузке и если есть перемещение активирует страницу
   * @param {function} action функция которая будет выполняться
   */
  var onDragListen = function (action) {

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      window.util.dragged = true;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      if (window.util.dragged) {
        action();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.dragNdrop = {
    dragged: dragged,
    onDragListen: onDragListen
  };
})();
