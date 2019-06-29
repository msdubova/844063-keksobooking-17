'use strict';
(function () {
  /**
   * Функция деактивирует форму. Также выполняет заполнение поле ввода адреса автоматически при открытии. Используется при открытии страницы
    */
  var deactivateForm = function () {
    if (!window.util.formCustomAd.classList.contains('ad-form--disabled')) {
      window.util.formCustomAd.classList.add('ad-form--disabled');
    }

    for (var i = 0; i < window.util.formFieldsets.length; i++) {
      window.util.formFieldsets[i].setAttribute('disabled', 'disabled');
    }

    fillPinInitialAddress(window.util.mapPinMain);
  };

  /**
   * Функция записывает координаты центра переданного элемента в поле Input (address)
    * @param {object} element
    */
  var fillPinInitialAddress = function (element) {
    window.util.addressInput.value = (window.util.getParameterNumValue(element.style.left) + Math.round(window.util.getParameterNumValue(element.clientWidth) / 2)) + ', '
        + (window.util.getParameterNumValue(element.style.top) + Math.round(window.util.getParameterNumValue(element.clientHeight) / 2));
  };

  /**
   * Функция-обрабочик , слушает клик на главную булавку при загрузке и если есть перемещение активирует страницу
    */
  var onPinDrag = function () {
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      window.util.dragged = true;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      if (window.util.dragged) {
        activatePage();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  /**
   * Функция активирует форму и карту с ее функциями и элементами
    */
  var activatePage = function () {
    window.util.formCustomAd.classList.remove('ad-form--disabled');

    for (var i = 0; i < window.util.formFieldsets.length; i++) {
      window.util.formFieldsets[i].removeAttribute('disabled');
    }

    setup();
  };

  /**
   * Функция запускает предварительные настройки
    */
  var setup = function () {
    var map = document.querySelector('.map');
    map.classList.remove('map--faded');
  };

  deactivateForm();
  window.util.mapPinMain.addEventListener('mousedown', onPinDrag, {once: true});
})();

