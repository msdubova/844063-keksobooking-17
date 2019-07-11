'use strict';
(function () {
  /**
   * Функция рендерит объявление об обьекте размещения с данными, полученными с сервера
   * @param  {{author : {
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
   * }} ad обьект свойств одного пина и обьявления, полученный из загружженого с сервера массива данных
   */
  window.renderCard = function (ad) {
    var template = document.querySelector('#card').content;
    var fragment = document.createDocumentFragment();
    var clonedCard = template.cloneNode(true);
    var clonedCardImage = clonedCard.querySelector('.popup__avatar');
    var clonedCardHead = clonedCard.querySelector('.popup__title');
    var clonedCardAddress = clonedCard.querySelector('.popup__text--address');
    var clonedCardPrice = clonedCard.querySelector('.popup__text--price');
    var clonedCardType = clonedCard.querySelector('.popup__type');
    var clonedCardCapacity = clonedCard.querySelector('.popup__text--capacity');
    var clonedCardTime = clonedCard.querySelector('.popup__text--time');
    var clonedCardFeatures = clonedCard.querySelector('.popup__features');
    var clonedCardDescription = clonedCard.querySelector('.popup__description');
    var clonedCardPhotos = clonedCard.querySelector('.popup__photos');
    var closeCardButton = clonedCard.querySelector('.popup__close');


    if (window.globalElements.mapPins.querySelector('article')) {
      window.globalElements.mapPins.querySelector('article').remove();
    }

    /**
     * Функция присваивает обьявлению значение типа обьекта размещения
     */
    var addType = function () {
      clonedCardPhotos.innerHTML = '';
      switch (ad.offer.type) {
        case 'palace':
          clonedCardType.textContent = 'Дворец';
          break;
        case 'flat':
          clonedCardType.textContent = 'Квартира';
          break;
        case 'house':
          clonedCardType.textContent = 'Дом';
          break;
        case 'bungalo':
          clonedCardType.textContent = 'Бунгало';
          break;
        default:
          clonedCardType.textContent = ad.offer.type;
      }
    };

    /**
     * Функция добавляет в объявление лишки - удобства, если таковые имеются для данного пина
     */
    var addFeatures = function () {
      var featuresData = ad.offer.features;
      for (var j = 0; j < featuresData.length; j++) {
        var li = document.createElement('li');
        li.classList.add('popup__feature');
        switch (featuresData[j]) {
          case 'wifi':
            li.classList.add('popup__feature--wifi');
            break;
          case 'dishwasher':
            li.classList.add('popup__feature--dishwasher');
            break;
          case 'parking':
            li.classList.add('popup__feature--parking');
            break;
          case 'washer':
            li.classList.add('popup__feature--washer');
            break;
          case 'elevator':
            li.classList.add('popup__feature--elevator');
            break;
          case 'conditioner':
            li.classList.add('popup__feature--conditioner');
            break;
        }
        clonedCardFeatures.appendChild(li);
      }
    };

    /**
     * Функция добавляет в объявление фотографии, если таковые имеются для данного пина
     */
    var addPhotos = function () {
      var photos = ad.offer.photos;
      for (var j = 0; j < photos.length; j++) {
        var img = document.createElement('img');
        img.src = photos[j];
        img.classList.add('popup__photo');
        img.height = 40;
        img.width = 45;
        clonedCardPhotos.appendChild(img);
      }
    };

    /**
     * Функция закрывает попап на нажатию кнопки закрытия попапа и удаляет слушатель клавиатурных событий с документа
     * @param {object} evt обьект события
     */
    var closeCard = function (evt) {
      evt.preventDefault();
      var popup = window.globalElements.map.querySelector('.map__card');
      popup.remove();
      if (window.globalElements.mapPins.querySelector('.map__pin--active')) {
        window.globalElements.mapPins.querySelector('.map__pin--active').classList.remove('map__pin--active');
      }
      document.removeEventListener('keydown', window.onEscPush);
      evt.stopPropagation();
    };

    /**
     * Функция закрывает попап при нажатии кнопки ESCAPE
     * @param {object} evt  обьект события
     */
    window.onEscPush = function (evt) {
      evt.preventDefault();
      if (evt.keyCode === window.constants.ESCAPE_CODE) {
        closeCard(evt);
      }
      document.removeEventListener('keydown', window.onEscPush);
    };
    clonedCardImage.src = ad.author.avatar;
    clonedCardHead.textContent = ad.offer.title;
    clonedCardAddress.textContent = ad.offer.address;
    clonedCardPrice.textContent = (ad.offer.price + '₽/ночь');
    addType();
    clonedCardCapacity.textContent = (ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей');
    clonedCardTime.textContent = ('Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout);
    addFeatures();
    clonedCardDescription.textContent = ad.offer.description;
    addPhotos();

    document.removeEventListener('keydown', window.onEscPush);
    document.addEventListener('keydown', window.onEscPush);
    closeCardButton.addEventListener('click', function (evt) {
      if ((evt.currentTarget.tagName === 'BUTTON') && (evt.target.tagName === 'BUTTON')) {
        closeCard(evt);
        evt.stopPropagation();
        document.removeEventListener('keydown', window.onEscPush);
      }
    });

    fragment.appendChild(clonedCard);
    window.globalElements.mapPins.appendChild(fragment);
  };
})();
