'use strict';

(function () {
  var validateForm = function () {
    var form = window.globalElements.formCustomAd;
    var adTypeSelect = form.querySelector('#type');
    var adPriceInput = form.querySelector('#price');
    var adCheckinSelect = form.querySelector('#timein');
    var adCheckOutSelect = form.querySelector('#timeout');
    var adRoomSelect = form.querySelector('#room_number');
    var adCapacitySelect = form.querySelector('#capacity');
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
     * Функция назначает мин значение цены для выбранного поля типа размещения
     * @param {Object} evt обьект события
     */
    var onPriceInput = function (evt) {
      evt.preventDefault();
      var minPrice;
      switch (adTypeSelect.value) {
        case 'bungalo' :
          minPrice = 0;
          break;
        case 'flat' :
          minPrice = 1000;
          break;
        case 'house' :
          minPrice = 5000;
          break;
        case 'palace' :
          minPrice = 10000;
          break;
      }
      adPriceInput.setAttribute('min', minPrice);
    };

    /**
     * Функция-обработчик событий селекта чекин и автоматического подбора значения полю чекаут
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

    /**
     * Функция колбек выполняет проверку и назначает сообщение для ошибки для двух полей сразу  - комнаты и гости
     */
    var onRoomCapacityChange = function () {
      setValidation(adRoomSelect);
      setValidation(adCapacitySelect);
    };

    /**
     * Функция назначает сообщение об ошибке , если проверка соотношения гостей-комнат не пройдена, для заданного элемента
     * @param {HTMLElement} select
     */
    var setValidation = function (select) {
      var check = window.checkRoomGuests();
      if (!check) {
        select.setCustomValidity('Некорректное соотношение гостей и комнат.');
      } else {
        select.setCustomValidity('');
      }
    };

    /**
     * Функция проверяет соотношение гостей и комнат и выдает булево значение результатом
     * @return {boolean}
     */
    window.checkRoomGuests = function () {
      if (adRoomSelect.value === adCapacitySelect.value) {
        return true;
      } else if ((!(adRoomSelect.value === '100')) && (adCapacitySelect.value === '0')) {
        return false;
      } else if ((!(adRoomSelect.value === '100')) && (adRoomSelect.value > adCapacitySelect.value)) {
        return true;
      } else if ((adRoomSelect.value === '100') && (adCapacitySelect.value === '0')) {
        return true;
      } else if ((adRoomSelect.value === '100') && (!(adCapacitySelect.value === '0'))) {
        return false;
      } else if (adRoomSelect.value < adCapacitySelect.value) {
        return false;
      } else if ((adRoomSelect.value === '1') && (adCapacitySelect.value === '0')) {
        return false;
      } else if ((adRoomSelect.value === '2') && (adCapacitySelect.value === '0')) {
        return false;
      } else if ((adRoomSelect.value === '3') && (adCapacitySelect.value === '0')) {
        return false;
      } else {
        return false;
      }
    };


    adTypeSelect.addEventListener('change', onTypeSelect);
    adPriceInput.addEventListener('input', onPriceInput);
    adCheckinSelect.addEventListener('change', onCheckinSelect);
    adCheckOutSelect.addEventListener('change', onCheckoutSelect);
    adRoomSelect.addEventListener('change', onRoomCapacityChange);
    adCapacitySelect.addEventListener('change', onRoomCapacityChange);
  };

  /**
   Callback функция которая будет выполняться при выполлении условий onDragListen
   */
  window.runValidation = function () {
    validateForm();
  };
})();
