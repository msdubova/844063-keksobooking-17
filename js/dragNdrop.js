'use strict';

(function () {
  var dragged = false;

  /**
   * Функция-обрабочик , слушает клик на главную булавку при загрузке и если есть перемещение активирует страницу
   * @param {function} action функция, которую следует выполнить в родительской функции
   */
  var onDragListen = function (action) {

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      if (dragged) {
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
