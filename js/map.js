'use strict';

(function () {

  /**
   * Функция создает булавки и добавляет их в разметку
   * @param {[{author : {
   *   avatar: string},
   *   offer: {
   *     title: string,
   *     address: string,
   *     price: number,
   *     type: string,
   *     rooms: number,
   *     guests: number,
   *     checkin: string,
   *     checkout: string,
   *     features: string[],
   *     description: string,
   *     photos: string[]
   *   },
   *   location: {
   *     x: number,
   *     y: number
   *   }
   * }]} ads массив объектов с данными для рендеринга булавок и обьявлений к ним
   */
  window.onRenderPins = function (ads) {
    var ad = document.querySelector('#pin').content;
    var fragment = document.createDocumentFragment();

    ads.forEach(function (thisAd) {
      var clonedAd = ad.cloneNode(true);
      var clonedAdImage = clonedAd.querySelector('img');
      var clonedAdButton = clonedAd.querySelector('button');
      clonedAdButton.style.top = thisAd.location.y + 'px';
      clonedAdButton.style.left = thisAd.location.x + 'px';
      clonedAdImage.src = thisAd.author.avatar;
      clonedAdImage.alt = thisAd.offer.type;
      clonedAdButton.addEventListener('click', function () {
        window.renderCard(thisAd);
        if (window.globalElements.mapPins.querySelector('.map__pin--active')) {
          window.globalElements.mapPins.querySelector('.map__pin--active').classList.remove('map__pin--active');
        }

        clonedAdButton.classList.add('map__pin--active');
      });
      fragment.appendChild(clonedAd);
    });

    window.globalElements.mapPins.appendChild(fragment);
  };


  /**
   * Функция колбэк, если данные с сервера получены успешно - рендерит пины и ограничивает их количество до 5
   * @param {[{author : {
   *   avatar: string},
   *   offer: {
   *     title: string,
   *     address: string,
   *     price: number,
   *     type: string,
   *     rooms: number,
   *     guests: number,
   *     checkin: string,
   *     checkout: string,
   *     features: string[],
   *     description: string,
   *     photos: string[]
   *   },
   *   location: {
   *     x: number,
   *     y: number
   *   }
   * }]} ads полученный с сервера массив объектов с данными для рендеринга булавок и обьявлений к ним
   */
  var successHandler = function (ads) {
    window.pins = ads;
    var sliced = ads.slice(1, 6);
    window.onRenderPins(sliced);
  };

  /**
   * Функция-колбэк для неудачного запроса на сервер, создает окно с сообщением об ошибке
   * @param {number} errorStatus номер ошибки
   */
  var errorHandler = function (errorStatus) {
    var page = document.querySelector('main');

    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var alarm = errorTemplate.cloneNode(true);
    var errorButton = alarm.querySelector('.error__button');
    var tryActivatePage = function () {
      errorButton.removeEventListener('click', tryActivatePage);
      document.querySelector('.error').remove();
      window.load(successHandler, errorHandler);
    };
    var errorDescription = alarm.querySelector('.error__message');

    switch (errorStatus) {
      case 400:
        errorDescription.textContent = 'Ошибка сервера';
        break;
      case 401:
        errorDescription.textContent = 'Нет прав доступа';
        break;
      case 404:
        errorDescription.textContent = 'Страница не найдена';
        break;
      case 503:
        errorDescription.textContent = 'Сервис временно недоступен';
        break;
      default:
        errorDescription.textContent = 'Статус запроса: ' + errorStatus;
    }

    errorButton.addEventListener('click', tryActivatePage);
    page.insertAdjacentElement('afterbegin', alarm);
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
