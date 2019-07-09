'use strict';

(function () {
  var validateForm = function () {
    var adTypeSelect = window.globalElements.formCustomAd.querySelector('#type');
    var adPriceInput = window.globalElements.formCustomAd.querySelector('#price');
    var adCheckinSelect = window.globalElements.formCustomAd.querySelector('#timein');
    var adCheckOutSelect = window.globalElements.formCustomAd.querySelector('#timeout');
    var adRoomSelect = window.globalElements.formCustomAd.querySelector('#room_number');
    var adCapacitySelect = window.globalElements.formCustomAd.querySelector('#capacity');
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

    var setCustomValidityRoom = function (evt) {
      if (evt.target.value === '1') {
        adCapacitySelect.options[0].setAttribute('disabled', 'disabled');
        adCapacitySelect.options[1].setAttribute('disabled', 'disabled');
        adCapacitySelect.options[2].removeAttribute('disabled', 'disabled');
        adCapacitySelect.options[3].setAttribute('disabled', 'disabled');
      } else if (evt.target.value === '2') {
        adCapacitySelect.options[0].setAttribute('disabled', 'disabled');
        adCapacitySelect.options[3].setAttribute('disabled', 'disabled');
        adCapacitySelect.options[1].removeAttribute('disabled', 'disabled');
        adCapacitySelect.options[2].removeAttribute('disabled', 'disabled');
      } else if (evt.target.value === '3') {
        adCapacitySelect.options[0].removeAttribute('disabled', 'disabled');
        adCapacitySelect.options[1].removeAttribute('disabled', 'disabled');
        adCapacitySelect.options[2].removeAttribute('disabled', 'disabled');
        adCapacitySelect.options[3].setAttribute('disabled', 'disabled');
      } else if (evt.target.value === '100') {
        adCapacitySelect.options[0].setAttribute('disabled', 'disabled');
        adCapacitySelect.options[1].setAttribute('disabled', 'disabled');
        adCapacitySelect.options[2].setAttribute('disabled', 'disabled');
        adCapacitySelect.options[3].removeAttribute('disabled', 'disabled');
      }
    };

    var setCustomValidityCapacity = function (evt) {
      if (evt.target.value === '3') {
        adRoomSelect.options[0].setAttribute('disabled', 'disabled');
        adRoomSelect.options[1].setAttribute('disabled', 'disabled');
        adRoomSelect.options[3].setAttribute('disabled', 'disabled');
        adRoomSelect.options[2].removeAttribute('disabled', 'disabled');
      } else if (evt.target.value === '2') {
        adRoomSelect.options[0].setAttribute('disabled', 'disabled');
        adRoomSelect.options[1].removeAttribute('disabled', 'disabled');
        adRoomSelect.options[2].removeAttribute('disabled', 'disabled');
        adRoomSelect.options[3].setAttribute('disabled', 'disabled');
      } else if (evt.target.value === '1') {
        adRoomSelect.options[0].removeAttribute('disabled', 'disabled');
        adRoomSelect.options[1].setAttribute('disabled', 'disabled');
        adRoomSelect.options[2].setAttribute('disabled', 'disabled');
        adRoomSelect.options[3].setAttribute('disabled', 'disabled');
      } else if (evt.target.value === '0') {
        adRoomSelect.options[0].setAttribute('disabled', 'disabled');
        adRoomSelect.options[1].setAttribute('disabled', 'disabled');
        adRoomSelect.options[2].setAttribute('disabled', 'disabled');
        adRoomSelect.options[3].removeAttribute('disabled', 'disabled');
      }
    };

    var onRoomSelect = function (evt) {
      setCustomValidityRoom(evt);
      if (adRoomSelect.value === '100') {
        adCapacitySelect.value = 0;
      } else if (adRoomSelect.value === '1') {
        adCapacitySelect.value = '1';
      }
    };

    var onCapacitySelect = function (evt) {
      setCustomValidityCapacity(evt);
      if (adCapacitySelect.value === '0') {
        adRoomSelect.value = '100';
      } else if (adCapacitySelect.value === '3') {
        adRoomSelect.value = '3';
      }
    };

    adTypeSelect.addEventListener('change', onTypeSelect);

    adCheckinSelect.addEventListener('change', onCheckinSelect);

    adCheckOutSelect.addEventListener('change', onCheckoutSelect);

    adRoomSelect.addEventListener('change', onRoomSelect);

    adCapacitySelect.addEventListener('change', onCapacitySelect);

    var onSuccess = function () {
      var template = document.querySelector('#success').content;
      var success = template.cloneNode(true);

      var onButtonClick = function (evt) {
        evt.preventDefault();
        window.globalElements.mapPins.querySelector('.success').remove();
        document.removeEventListener('click', onButtonClick);
        document.removeEventListener('click', onButtonPush);
      };

      var onButtonPush = function (evt) {
        evt.preventDefault();
        if (evt.keyCode === window.constants.ESCAPE_CODE) {
          window.globalElements.mapPins.querySelector('.success').remove();
          document.removeEventListener('click', onButtonPush);
          document.removeEventListener('click', onButtonClick);
        }
      };

      window.globalElements.mapPins.appendChild(success);
      document.addEventListener('click', onButtonClick);
      document.addEventListener('keydown', onButtonPush);
      window.globalElements.formCustomAd.reset();

      window.globalElements.mapPinMain.left = window.startX;
      window.globalElements.mapPinMain.top = window.startY;
      window.fillPinInitialAddress(window.globalElements.mapPinMain);
    };

    var onError = function () {};

    window.globalElements.formCustomAd.addEventListener('submit', function (evt) {
      evt.preventDefault();
      window.save(new FormData(window.globalElements.formCustomAd), onSuccess, onError);
    });
  };

  /**
   Callback функция которая будет выполняться при выполлении условий onDragListen
   */
  window.runValidation = function () {
    validateForm();
  };
})();
