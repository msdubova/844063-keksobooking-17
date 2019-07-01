'use strict';

(function () {
  /**
   * Функция создает массив строк  - адресов изображений аватарок
   * @param {{author: string,
   *           offer: string,
   *           location: {
   *             x: number,
   *             y: number
   *           }}[]} arr Массив обьектов случайных свойств
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
   * @param { {author: string,
   *           offer: string,
   *           location: {
   *             x: number,
   *             y: number
   *           }}[] } arr массив с заготовленными обьектами - шаблонами свойств
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
   * Функция - параметр обработчика
   */
  var runAction = function () {
    renderPins(window.generateTemplates(window.constants.ELEMENTS_COUNT));
    customizePinSize();
  };
  window.globalElements.mapPinMain.addEventListener('mousedown', window.dragNdrop.onDragListen(runAction), {once: true});
})();
