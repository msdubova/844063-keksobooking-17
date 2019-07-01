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
     * @param {object} firstSelect селект, в котором происходит выбор опции
     * @param {object} secondSelect селект, в котором выбор опции подтягивается выбором в первом селекте
     */
    var matchSelects = function (firstSelect, secondSelect) {
      secondSelect.selectedIndex = firstSelect.selectedIndex;
    };

    adTypeSelect.addEventListener('change', function () {
      adPriceInput.setAttribute('placeholder', adTypeParameters[adTypeSelect.value].placeholder);
      adPriceInput.setAttribute('min', parseInt(adTypeParameters[adTypeSelect.value].min, 10));
    });

    adCheckinSelect.addEventListener('change', function () {
      matchSelects(adCheckinSelect, adCheckOutSelect);
    });

    adCheckOutSelect.addEventListener('change', function () {
      adCheckinSelect.selectedIndex = adCheckOutSelect.selectedIndex;
      matchSelects(adCheckOutSelect, adCheckinSelect);
    });

    // adRoomSelect.addEventListener('change', function () {
    //   adCapacitySelect.selectedIndex = adRoomSelect.selectedIndex;
    // });
  };

  var runValidation = function () {
    validateForm();
  };


  window.globalElements.mapPinMain.addEventListener('mousedown', window.dragNdrop.onDragListen(runValidation), {once: true});

})();

