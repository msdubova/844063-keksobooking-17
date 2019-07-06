'use strict';
(function () {
  window.renderCard = function () {
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


    clonedCardImage.src = window.pins[0].author.avatar;
    clonedCardHead.textContent = window.pins[0].offer.title;
    clonedCardAddress.textContent = window.pins[0].offer.address;
    clonedCardPrice.textContent = (window.pins[0].offer.price + '₽/ночь');

    var addType = function () {
      clonedCardPhotos.innerHTML = '';
      switch (window.pins[0].offer.type) {
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
          clonedCardType.textContent = window.pins[0].offer.type;
      }
    };

    addType();

    clonedCardCapacity.textContent = (window.pins[0].offer.rooms + ' комнаты для ' + window.pins[0].offer.guests + ' гостей');
    clonedCardTime.textContent = ('Заезд после ' + window.pins[0].offer.checkin + ', выезд до ' + window.pins[0].offer.checkout);

    var addFeatures = function () {
      var featuresData = window.pins[0].offer.features;
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

    addFeatures();

    clonedCardDescription.textContent = window.pins[0].offer.description;


    var addPhotos = function () {
      var photos = window.pins[0].offer.photos;
      for (var j = 0; j < photos.length; j++) {
        var img = document.createElement('img');
        img.src = photos[j];
        img.classList.add('popup__photo');
        img.height = 40;
        img.width = 45;
        clonedCardPhotos.appendChild(img);
      }
    };

    addPhotos();


    var closeCard = function (evt) {
      evt.preventDefault();
      var popup = window.globalElements.map.querySelector('.map__card');
      popup.remove();
    };
    // Юрий, этот клик не работает на закрытие окна, так как сейчас перехватывается нажатие на button из
    // map.js 35 строка и как бы оновременно и создается и закрывается попап поэтому не поисходит фактического
    //  закрытия окна. Как можно ограничить родительский обработчик на попапе, чтоб он слышал только свои
    closeCardButton.addEventListener('click', closeCard);

    fragment.appendChild(clonedCard);
    window.globalElements.mapPins.appendChild(fragment);
  };
})();
