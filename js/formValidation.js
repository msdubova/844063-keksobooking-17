'use strict';
(function () {
  var validateForm = function () {
    var globs = window.globalElements;

    var adTypeParameters = {
      bungalo: {min: 0, placeholder: 0},
      flat: {min: 1000, placeholder: 1000},
      house: {min: 5000, placeholder: 5000},
      palace: {min: 10000, placeholder: 10000}
    };

    var onTitleInvalid = function (evt) {
      if (globs.adTitleInput.validity.tooShort) {
        globs.adTitleInput.setCustomValidity('Название объявления должно состоять минимум из 30 символов');
      } else if (globs.adTitleInput.validity.tooLong) {
        globs.adTitleInput.setCustomValidity('Название объявления не должно превышать 100 символов');
      } else if (globs.adTitleInput.validity.valueMissing) {
        globs.adTitleInput.setCustomValidity('Дайте название объявлению');
      }
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
    window.onTypeSelect = function () {
      globs.adPriceInput.setAttribute('placeholder', adTypeParameters[globs.adTypeSelect.value].placeholder);
      globs.adPriceInput.setAttribute('min', parseInt(adTypeParameters[globs.adTypeSelect.value].min, 10));
    };

    /**
     * Функция назначает мин значение цены для выбранного поля типа размещения
     * @param {Object} evt обьект события
     */
    var onPriceInput = function (evt) {
      evt.preventDefault();
      var minPrice;
      switch (globs.adTypeSelect.value) {
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
      globs.adPriceInput.setAttribute('min', minPrice);
    };

    /**
     * Функция-обработчик событий селекта чекин и автоматического подбора значения полю чекаут
     */
    var onCheckinSelect = function () {
      matchSelects(globs.adCheckinSelect, globs.adCheckOutSelect);
    };

    /**
     * Функция-обработчик собйтий селекта  чекаут и автоматического подбора значения полю чекин
     */
    var onCheckoutSelect = function () {
      globs.adCheckinSelect.selectedIndex = globs.adCheckOutSelect.selectedIndex;
      matchSelects(globs.adCheckOutSelect, globs.adCheckinSelect);
    };

    /**
     * Функция колбек выполняет проверку и назначает сообщение для ошибки для двух полей сразу  - комнаты и гости
     */
    var onRoomCapacityChange = function () {
      setValidation(globs.adRoomSelect);
      setValidation(globs.adCapacitySelect);
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
      if (globs.adRoomSelect.value === globs.adCapacitySelect.value) {
        return true;
      } else if ((!(globs.adRoomSelect.value === '100')) && (globs.adCapacitySelect.value === '0')) {
        return false;
      } else if ((!(globs.adRoomSelect.value === '100')) && (globs.adRoomSelect.value > globs.adCapacitySelect.value)) {
        return true;
      } else if ((globs.adRoomSelect.value === '100') && (globs.adCapacitySelect.value === '0')) {
        return true;
      } else if ((globs.adRoomSelect.value === '100') && (!(globs.adCapacitySelect.value === '0'))) {
        return false;
      } else if (globs.adRoomSelect.value < globs.adCapacitySelect.value) {
        return false;
      } else if ((globs.adRoomSelect.value === '1') && (globs.adCapacitySelect.value === '0')) {
        return false;
      } else if ((globs.adRoomSelect.value === '2') && (globs.adCapacitySelect.value === '0')) {
        return false;
      } else if ((globs.adRoomSelect.value === '3') && (globs.adCapacitySelect.value === '0')) {
        return false;
      }
      return false;
    };
    globs.adTitleInput.addEventListener('invalid', onTitleInvalid);
    globs.adTypeSelect.addEventListener('change', window.onTypeSelect);
    globs.adPriceInput.addEventListener('input', onPriceInput);
    globs.adCheckinSelect.addEventListener('change', onCheckinSelect);
    globs.adCheckOutSelect.addEventListener('change', onCheckoutSelect);
    globs.adRoomSelect.addEventListener('change', onRoomCapacityChange);
    globs.adCapacitySelect.addEventListener('change', onRoomCapacityChange);
  };

  /**
   Callback функция которая будет выполняться при выполлении условий onDragListen
   */
  window.runValidation = function () {
    validateForm();
  };
})();
