'use strict';

(function () {
  /**
   * Функция создает массив строк  - адресов изображений аватарок
   * @param {object[]} arr Массив обьектов случайных свойств
   * @return {string[]} массив строк - адресов
   */
  var generateCoordinates = function (arr) {
    var coordinates = [];
    for (var i = 0; i < arr.length; i++) {
      coordinates.push('left: ' + arr[i].location.x + 'px; top: ' + arr[i].location.y + 'px;');
    }
    return coordinates;
  };

  /**
   * Функция создает булавки и добавляет их в разметку
   * @param {object[]} arr массив с заготовленными обьектами - шаблонами свойств
   */
  var renderPins = function (arr) {
    var ad = document.querySelector('#pin').content;
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < arr.length; i++) {
      var clonedAd = ad.cloneNode(true);
      var clonedAdImage = clonedAd.querySelector('img');
      var clonedAdButton = clonedAd.querySelector('button');
      clonedAdButton.style = (generateCoordinates(arr)[i]);
      clonedAdImage.src = arr[i].author.avatar;
      clonedAdImage.alt = arr[i].offer.type;
      fragment.appendChild(clonedAd);
    }

    window.globalElements.mapPins.appendChild(fragment);
  };

  /**
  * Функция корректирует координаты булавки , учитывая погрешность на размер булавки и перенос центра отсчета с левого  верхнего    угла на кончик булавки
  */
  var customizePinSize = function () {
    var ads = window.globalElements.mapPins.querySelectorAll('.map__pin');
    for (var i = 1; i < ads.length; i++) {
      var left = (ads[i].style.left);
      var top = (ads[i].style.top);
      var width = (ads[i].clientWidth);
      var height = (ads[i].clientHeight);
      left = parseInt(left, 10) - width / 2;
      top = parseInt(top, 10) - height;
      if ((left - width / 2) < 0) {
        left = 0;
      }
      if ((left + width) > window.globalElements.mapPins.offsetWidth) {
        left = window.globalElements.mapPins.offsetWidth - width;
      }
      ads[i].style = 'left: ' + left + 'px; top: ' + top + 'px;';
    }
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
        renderPins(window.generateTemplates(window.util.ELEMENTS_COUNT));
        customizePinSize();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  window.globalElements.mapPinMain.addEventListener('mousedown', onPinDrag, {once: true});
})();
