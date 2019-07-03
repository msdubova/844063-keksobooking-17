'use strict';

(function () {
  /**
   * Функция создает булавки и добавляет их в разметку
   * @param {{author: string,
   *           offer: string,
   *           location: {
   *             x: number,
   *             y: number
   *           } } } advertisement объект свойств обьявления из массива, полученного с сервера
   *          @return {object} clonedAd
   */
  var renderPins = function (advertisement) {
    var ad = document.querySelector('#pin').content;

    var clonedAd = ad.cloneNode(true);
    var clonedAdImage = clonedAd.querySelector('img');
    var clonedAdButton = clonedAd.querySelector('button');
    clonedAdButton.style.top = advertisement.location.y + 'px';
    clonedAdButton.style.left = advertisement.location.x + 'px';
    clonedAdImage.src = advertisement.author.avatar;
    clonedAdImage.alt = advertisement.offer.type;

    return clonedAd;
  };

  var successHandler = function (ads) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < ads.length; i++) {
      fragment.appendChild(renderPins(ads[i]));
    }
    window.globalElements.mapPins.appendChild(fragment);

  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; width: 400px; height: auto; text-align: center; background-color: tomato; color: #ffffff; font-size: 2em; padding: 30px; position: absolute; top: 40%; margin: 0 auto;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
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
   * Callback функция которая будет выполняться при выполлении условий onDragListen
   */
  window.runAction = function () {
    // renderPins(window.generateTemplates(window.constants.ELEMENTS_COUNT));
    window.load(successHandler, errorHandler);
    customizePinSize();
  };

})();
