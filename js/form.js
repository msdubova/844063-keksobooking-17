'use strict';

(function () {
  var validateForm = function () {
    var adTypeSelect = window.util.formCustomAd.querySelector('#type');
    var adPriceInput = window.util.formCustomAd.querySelector('#price');
    var adCheckinSelect = window.util.formCustomAd.querySelector('#timein');
    var adCheckOutSelect = window.util.formCustomAd.querySelector('#timeout');

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
        validateForm();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.util.mapPinMain.addEventListener('mousedown', onPinDrag, {once: true});

})();

