'use strict';

(function () {
  window.wizards = [];
  /**
   * Функция создает булавки и добавляет их в разметку
   * @param {{author: string,
   *           offer: string,
   *           location: {
   *             x: number,
   *             y: number
   *           } } } ads объект свойств обьявления из массива, полученного с сервера
   */
  window.renderPins = function (ads) {
    var ad = document.querySelector('#pin').content;
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < ads.length; i++) {
      var clonedAd = ad.cloneNode(true);
      var clonedAdImage = clonedAd.querySelector('img');
      var clonedAdButton = clonedAd.querySelector('button');
      clonedAdButton.style.top = ads[i].location.y + 'px';
      clonedAdButton.style.left = ads[i].location.x + 'px';
      clonedAdImage.src = ads[i].author.avatar;
      clonedAdImage.alt = ads[i].offer.type;
      fragment.appendChild(clonedAd);
    }
    window.globalElements.mapPins.appendChild(fragment);
  };

  var successHandler = function (ads) {
    window.pins = ads;
    window.renderPins(window.pins);
  };

  var errorHandler = function (errorStatus) {
    var page = document.querySelector('main');

    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var alarm = errorTemplate.cloneNode(true);


    page.insertAdjacentElement('afterbegin', alarm);

    var errorDescription = alarm.querySelector('.error__message');

    switch (errorStatus) {
      case 300:
        errorDescription.textContent = 'Multiple Choice';
        break;
      case 301:
        errorDescription.textContent = 'Moved Permanently';
        break;
      case 307:
        errorDescription.textContent = 'Temporary Redirect';
        break;
      case 400:
        errorDescription.textContent = 'Bad Request';
        break;
      case 401:
        errorDescription.textContent = 'Access denied';
        break;
      case 404:
        errorDescription.textContent = 'Not found';
        break;
      case 500:
        errorDescription.textContent = 'Internal Server Error';
        break;
      default:
        errorDescription.textContent = 'CRequest status: ' + status;
    }
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
    window.load(successHandler, errorHandler);
    customizePinSize();
  };

})();
