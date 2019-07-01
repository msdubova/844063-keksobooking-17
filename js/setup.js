'use strict';
(function () {
  var formFieldsets = window.globalElements.formCustomAd.children;
  /**
   * Функция деактивирует форму. Также выполняет заполнение поле ввода адреса автоматически при открытии. Используется при открытии страницы
    */
  var deactivateForm = function () {
    if (!window.globalElements.formCustomAd.classList.contains('ad-form--disabled')) {
      window.globalElements.formCustomAd.classList.add('ad-form--disabled');
    }

    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].setAttribute('disabled', 'disabled');
    }

    fillPinInitialAddress(window.globalElements.mapPinMain);
  };

  /**
   * Функция записывает координаты центра переданного элемента в поле Input (address)
    * @param {Element} el
    */
  var fillPinInitialAddress = function (el) {
    var util = window.util;
    window.globalElements.addressInput.value = (util.getParameterNumValue(el.style.left) + Math.round(util.getParameterNumValue(el.clientWidth) / 2)) + ', '
        + (util.getParameterNumValue(el.style.top) + Math.round(util.getParameterNumValue(el.clientHeight) / 2));
  };

  var runActivation = function () {
    activatePage();
  };

  /**
   * Функция активирует форму и карту с ее функциями и элементами
    */
  var activatePage = function () {
    window.globalElements.formCustomAd.classList.remove('ad-form--disabled');

    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].removeAttribute('disabled');
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
  window.globalElements.mapPinMain.addEventListener('mousedown', window.dragNdrop.onDragListen(runActivation), {once: true});
})();

