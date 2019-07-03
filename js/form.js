'use strict';

(function () {
  var validateForm = function () {
    var adTypeSelect = window.globalElements.formCustomAd.querySelector('#type');
    var adPriceInput = window.globalElements.formCustomAd.querySelector('#price');
    var adCheckinSelect = window.globalElements.formCustomAd.querySelector('#timein');
    var adCheckOutSelect = window.globalElements.formCustomAd.querySelector('#timeout');

    var adTypeParameters = {
      bungalo: {min: 0, placeholder: 0},
      flat: {min: 1000, placeholder: 1000},
      house: {min: 5000, placeholder: 5000},
      palace: {min: 10000, placeholder: 10000}
    };

    /**
     * Функция подтягивает значения двух селектов по порядковому номеру выбранной опции
     * @param {HTMLElement} firstSelect селект, в котором происходит выбор опции
     * @param {HTMLElement} secondSelect селект, в котором выбор опции подтягивается выбором в первом селекте
     */
    var matchSelects = function (firstSelect, secondSelect) {
      secondSelect.selectedIndex = firstSelect.selectedIndex;
    };
    /**
     * Функция-обработчик событий селекта типа жилища. устанавливает минимальное значение поля цены
     */
    var onTypeSelect = function () {
      adPriceInput.setAttribute('placeholder', adTypeParameters[adTypeSelect.value].placeholder);
      adPriceInput.setAttribute('min', parseInt(adTypeParameters[adTypeSelect.value].min, 10));
    };

    /**
     * Функция-обработчик собйтий селекта чекин и автоматического подбора значения полю чекаут
     */
    var onCheckinSelect = function () {
      matchSelects(adCheckinSelect, adCheckOutSelect);
    };

    /**
     * Функция-обработчик собйтий селекта  чекаут и автоматического подбора значения полю чекин
     */
    var onCheckoutSelect = function () {
      adCheckinSelect.selectedIndex = adCheckOutSelect.selectedIndex;
      matchSelects(adCheckOutSelect, adCheckinSelect);
    };

    adTypeSelect.addEventListener('change', onTypeSelect);

    adCheckinSelect.addEventListener('change', onCheckinSelect);

    adCheckOutSelect.addEventListener('change', onCheckoutSelect);

    // adRoomSelect.addEventListener('change', function () {
    //   adCapacitySelect.selectedIndex = adRoomSelect.selectedIndex;
    // });
  };

  /**
Callback функция которая будет выполняться при выполлении условий onDragListen
   */
  window.runValidation = function () {
    validateForm();
  };
})();

