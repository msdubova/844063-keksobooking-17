'use strict';
(function () {
  var validateForm = function () {
    var globals = window.globalElements;

    var adTypeParameters = {
      bungalo: {min: 0, placeholder: 0},
      flat: {min: 1000, placeholder: 1000},
      house: {min: 5000, placeholder: 5000},
      palace: {min: 10000, placeholder: 10000}
    };

    /**
     * Функция кастомизирует сообщение об ошибке в поле ввода названия
     * @param {Event} evt объект события
     * @return {void}
     */
    var onTitleInput = function (evt) {
      var target = evt.target;
      if (target.validity.tooShort) {
        target.setCustomValidity('Название объявления должно состоять минимум из 30 символов');
      } else if (target.validity.tooLong) {
        target.setCustomValidity('Название объявления не должно превышать 100 символов');
      } else if (target.validity.valueMissing) {
        target.setCustomValidity('Дайте название объявлению');
      } else {
        target.setCustomValidity('');
      }
    };

    /**
     * @param {HTMLSelectElement} firstSelect элемент, значение которого присваивается
     * @param {HTMLSelectElement} secondSelect элемент, которому присваивается значение
     * @return {void}
     */
    var synchronizeSelect = function (firstSelect, secondSelect) {
      secondSelect.selectedIndex = firstSelect.selectedIndex;
    };

    var updatePriceMinValue = function () {
      globals.adPriceInput.setAttribute('placeholder', adTypeParameters[globals.adTypeSelect.value].placeholder);
      globals.adPriceInput.setAttribute('min', parseInt(adTypeParameters[globals.adTypeSelect.value].min, 10));
    };


    window.onTypeSelect = function () {
      updatePriceMinValue();
      onPriceInvalid();
    };

    /**
     * Функция назначает мин значение цены для выбранного поля типа размещения
     * @return {void}
     */
    var onPriceInput = function () {
      var minPrice;
      switch (globals.adTypeSelect.value) {
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
      globals.adPriceInput.setAttribute('min', minPrice);
    };

    /**
     * Функция кастомизирует сообщение об ошибке в поле ввода цены
     * @return {void}
     */
    var onPriceInvalid = function () {
      if (globals.adPriceInput.validity.valueMissing) {
        globals.adPriceInput.setCustomValidity('Укажите цену проживания в объекте размещения за одну ночь');
      } else if (globals.adPriceInput.validity.rangeUnderflow) {
        switch (globals.adTypeSelect.value) {
          case 'bungalo' :
            globals.adPriceInput.setCustomValidity('Минимальная цена за ночь в бунгало - 0 денег');
            break;
          case 'flat' :
            globals.adPriceInput.setCustomValidity('Минимальная цена за ночь в квартире - 1000 денег');
            break;
          case 'house' :
            globals.adPriceInput.setCustomValidity('Минимальная цена за ночь в доме - 5000 денег');
            break;
          case 'palace' :
            globals.adPriceInput.setCustomValidity('Минимальная цена за ночь во дворце - 10000 денег');
            break;
        }
      } else {
        globals.adPriceInput.setCustomValidity('');
      }
    };


    var onCheckinSelect = function () {
      synchronizeSelect(globals.adCheckinSelect, globals.adCheckOutSelect);
    };

    var onCheckoutSelect = function () {
      globals.adCheckinSelect.selectedIndex = globals.adCheckOutSelect.selectedIndex;
      synchronizeSelect(globals.adCheckOutSelect, globals.adCheckinSelect);
    };

    var onRoomCapacityChange = function () {
      setValidation(globals.adRoomSelect);
      setValidation(globals.adCapacitySelect);
    };

    /**
     * Функция назначает сообщение об ошибке , если проверка соотношения гостей-комнат не пройдена, для заданного элемента
     * @param {HTMLSelectElement} select проверяемое поле
     * @return {void}
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
     * @return {boolean}
     */
    window.checkRoomGuests = function () {
      if (globals.adRoomSelect.value === globals.adCapacitySelect.value) {
        return true;
      } else if ((!(globals.adRoomSelect.value === '100')) && (globals.adCapacitySelect.value === '0')) {
        return false;
      } else if ((!(globals.adRoomSelect.value === '100')) && (globals.adRoomSelect.value > globals.adCapacitySelect.value)) {
        return true;
      } else if ((globals.adRoomSelect.value === '100') && (globals.adCapacitySelect.value === '0')) {
        return true;
      } else if ((globals.adRoomSelect.value === '100') && (!(globals.adCapacitySelect.value === '0'))) {
        return false;
      } else if (globals.adRoomSelect.value < globals.adCapacitySelect.value) {
        return false;
      } else if ((globals.adRoomSelect.value === '1') && (globals.adCapacitySelect.value === '0')) {
        return false;
      } else if ((globals.adRoomSelect.value === '2') && (globals.adCapacitySelect.value === '0')) {
        return false;
      } else if ((globals.adRoomSelect.value === '3') && (globals.adCapacitySelect.value === '0')) {
        return false;
      }
      return false;
    };

    globals.target.addEventListener('input', onTitleInput);
    globals.adTypeSelect.addEventListener('change', window.onTypeSelect);
    globals.adPriceInput.addEventListener('input', onPriceInput);
    globals.adPriceInput.addEventListener('input', onPriceInvalid);
    globals.adCheckinSelect.addEventListener('change', onCheckinSelect);
    globals.adCheckOutSelect.addEventListener('change', onCheckoutSelect);
    globals.adRoomSelect.addEventListener('change', onRoomCapacityChange);
    globals.adCapacitySelect.addEventListener('change', onRoomCapacityChange);
  };

  /**
   Callback функция которая будет выполняться при выполлении условий onDragListen
   * @return {void}
   */
  window.runValidation = function () {
    validateForm();
  };
})();
