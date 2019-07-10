'use strict';
(function () {
  var form = window.globalElements.formCustomAd;
  var adAddress = form.querySelector('#address');

  var onSuccess = function () {
    var template = document.querySelector('#success').content;
    var success = template.cloneNode(true);

    var onButtonClick = function (evt) {
      evt.preventDefault();
      window.globalElements.mapPins.querySelector('.success').remove();
      document.removeEventListener('click', onButtonClick);
      document.removeEventListener('keydown', onButtonPush);
    };

    var onButtonPush = function (evt) {
      evt.preventDefault();
      if (evt.keyCode === window.constants.ESCAPE_CODE) {
        window.globalElements.mapPins.querySelector('.success').remove();
        document.removeEventListener('keydown', onButtonPush);
        document.removeEventListener('click', onButtonClick);
      }
    };

    window.resetPage();

    window.globalElements.mapPins.appendChild(success);
    document.addEventListener('click', onButtonClick);
    document.addEventListener('keydown', onButtonPush);

    window.globalElements.mapPinMain.left = window.startX;
    window.globalElements.mapPinMain.top = window.startY;
    window.fillPinInitialAddress(window.globalElements.mapPinMain);
  };

  var onError = function () {
    var template = document.querySelector('#error').content;
    var error = template.cloneNode(true);
    var main = document.querySelector('main');
    var buttonClose = main.querySelector('.error__button');

    var onButtonClick = function (evt) {
      evt.preventDefault();
      main.querySelector('.error').remove();
      document.removeEventListener('click', onButtonClick);
      document.removeEventListener('click', onButtonPush);
      buttonClose.removeEventListener('click', onButtonCloseClick);
    };

    var onButtonPush = function (evt) {
      evt.preventDefault();
      if (evt.keyCode === window.constants.ESCAPE_CODE) {
        main.querySelector('.error').remove();
        document.removeEventListener('click', onButtonPush);
        document.removeEventListener('click', onButtonClick);
        buttonClose.removeEventListener('click', onButtonCloseClick);
      }
    };

    var onButtonCloseClick = function (evt) {
      evt.preventDefault();
      main.querySelector('.error').remove();
      document.removeEventListener('click', onButtonClick);
      document.removeEventListener('click', onButtonPush);
      buttonClose.removeEventListener('click', onButtonCloseClick);
    };

    main.appendChild(error);
    document.addEventListener('click', onButtonClick);
    document.addEventListener('keydown', onButtonPush);
    buttonClose.addEventListener('click', onButtonCloseClick);
  };


  form.addEventListener('submit', function (evt) {
    adAddress.removeAttribute('readonly');
    var trigger = window.checkRoomGuests();
    if (trigger) {
      window.save(new FormData(form), onSuccess, onError);
    }
    evt.preventDefault();
  });
})();
