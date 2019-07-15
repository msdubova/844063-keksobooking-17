'use strict';
(function () {
  var formFieldsets = window.globalElements.formCustomAd.children;
  var filterSelects = Array.from(document.querySelector('.map__filters'));


  /**
   * Функция деактивирует форму. Также выполняет заполнение поле ввода адреса автоматически при открытии. Используется при открытии страницы
    */
  var deactivateForm = function () {
    if (!window.globalElements.formCustomAd.classList.contains('ad-form--disabled')) {
      window.globalElements.formCustomAd.classList.add('ad-form--disabled');
    }
    filterSelects.forEach(function (it) {
      it.setAttribute('disabled', 'disabled');
      it.classList.add('deactivated');
    });
    window.fillPinInitialAddress(window.globalElements.mapPinMain);

    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].setAttribute('disabled', 'disabled');
      formFieldsets[i].classList.add('deactivated');

    }
  };

  /**
   * Функция записывает координаты центра переданного элемента в поле Input (address)
    * @param {Element} el
    */
  window.fillPinInitialAddress = function (el) {
    var util = window.util;
    window.globalElements.addressInput.value = (util.getParameterNumValue(el.style.left) + Math.round(util.getParameterNumValue(el.clientWidth) / 2)) + ', '
        + (util.getParameterNumValue(el.style.top) + Math.round(util.getParameterNumValue(el.clientHeight) / 2));
  };

  window.runActivation = function () {
    activatePage();
    window.runValidation();
    window.runAction();
  };

  /**
   * Функция активирует форму и карту с ее функциями и элементами
    */
  var activatePage = function () {
    window.globalElements.formCustomAd.classList.remove('ad-form--disabled');
    filterSelects.forEach(function (it) {
      it.removeAttribute('disabled', 'disabled');
      it.classList.remove('deactivated');
    });
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].removeAttribute('disabled', 'disabled');
      formFieldsets[i].classList.remove('deactivated');
    }
    setup();
  };

  /**
   * Функция запускает предварительные настройки
    */
  var setup = function () {
    window.globalElements.map.classList.remove('map--faded');
  };

  window.resetPage = function () {
    window.globalElements.map.classList.add('map--faded');
    window.cleanMap();
    if (window.globalElements.mapPins.querySelector('article')) {
      window.globalElements.mapPins.querySelector('article').remove();
    }
    window.gallery.innerHTML = '';
    window.avatarPreview.src = 'img/muffin-grey.svg';
    window.globalElements.formCustomAd.reset();
    window.onTypeSelect();
    window.globalElements.mapPinMain.style.top = window.constants.START_Y + 'px';
    window.globalElements.mapPinMain.style.left = window.constants.START_X + 'px';
    deactivateForm();
    window.activated = false;
  };

  deactivateForm();
})();

