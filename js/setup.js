'use strict';
(function () {
  var formFieldsets = Array.from(window.globalElements.formCustomAd.children);
  var filterSelects = Array.from(document.querySelector('.map__filters'));


  /**
   * Функция деактивирует форму. Также выполняет заполнение поле ввода адреса автоматически при открытии. Используется при открытии страницы
   * @return {void}
   */
  var deactivateForm = function () {
    if (!window.globalElements.formCustomAd.classList.contains('ad-form--disabled')) {
      window.globalElements.formCustomAd.classList.add('ad-form--disabled');
    }
    filterSelects.forEach(function (filterSelect) {
      filterSelect.setAttribute('disabled', 'disabled');
      filterSelect.classList.add('deactivated');
    });
    window.fillPinInitialAddress(window.globalElements.mapPinMain);

    formFieldsets.forEach(function (formFieldset) {
      formFieldset.setAttribute('disabled', 'disabled');
      formFieldset.classList.add('deactivated');
    });
  };

  /**
   * Функция записывает координаты центра переданного элемента в поле Input (address)
    * @param {HTMLSelectElement} el поле куда запишется значение
   * @return {void}
   */
  window.fillPinInitialAddress = function (el) {
    var util = window.util;
    window.globalElements.addressInput.value = (util.getParameterNumValue(el.style.left) + Math.round(util.getParameterNumValue(el.clientWidth) / 2)) + ', '
        + (util.getParameterNumValue(el.style.top) + Math.round(util.getParameterNumValue(el.clientHeight) / 2));
  };

  window.runActivation = function () {
    window.runAction();
    window.runValidation();
  };

  /**
   * Функция активирует форму и карту с ее функциями и элементами
   * @return {void}
   */
  window.activatePage = function () {
    window.globalElements.formCustomAd.classList.remove('ad-form--disabled');
    filterSelects.forEach(function (filterSelect) {
      filterSelect.removeAttribute('disabled', 'disabled');
      filterSelect.classList.remove('deactivated');
    });

    formFieldsets.forEach(function (formFieldset) {
      formFieldset.removeAttribute('disabled', 'disabled');
      formFieldset.classList.remove('deactivated');
    });

    window.globalElements.map.classList.remove('map--faded');

    window.globalElements.formCustomAd.querySelector('.ad-form__submit').removeAttribute('disabled', 'disabled');
  };


  window.resetPage = function () {
    window.globalElements.map.classList.add('map--faded');

    window.checkboxes.forEach(function (it) {
      if (it.checked) {
        it.removeAttribute('checked', 'checked');
      }
    });
    window.cleanMap();
    if (window.globalElements.mapPins.querySelector('article')) {
      window.globalElements.mapPins.querySelector('article').remove();
    }
    window.gallery.innerHTML = '';
    window.avatarPreview.src = 'img/muffin-grey.svg';
    window.globalElements.formCustomAd.reset();
    window.onTypeSelect();
    window.globalElements.mapPinMain.addEventListener('keydown', window.onPinKeydown);
    window.globalElements.mapPinMain.style.top = window.constants.START_Y + 'px';
    window.globalElements.mapPinMain.style.left = window.constants.START_X + 'px';
    window.globalElements.mapPinMain.addEventListener('keydown', window.onPinKeydown);
    deactivateForm();
    window.activated = false;
  };

  deactivateForm();
})();

