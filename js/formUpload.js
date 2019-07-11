'use strict';
(function () {
  var form = window.globalElements.formCustomAd;
  var adAddress = form.querySelector('#address');

  var onSuccess = function () {
    var template = document.querySelector('#success').content;
    var success = template.cloneNode(true);

    var onSuccessDocumentClick = function (evt) {
      evt.preventDefault();
      window.globalElements.mapPins.querySelector('.success').remove();
      document.removeEventListener('click', onSuccessDocumentClick);
      document.removeEventListener('keydown', onSuccessDocumentKeydown);
    };

    var onSuccessDocumentKeydown = function (evt) {
      evt.preventDefault();
      if (evt.keyCode === window.constants.ESCAPE_CODE) {
        window.globalElements.mapPins.querySelector('.success').remove();
        document.removeEventListener('keydown', onSuccessDocumentKeydown);
        document.removeEventListener('click', onSuccessDocumentClick);
      }
    };

    window.resetPage();

    window.globalElements.mapPins.appendChild(success);
    document.addEventListener('click', onSuccessDocumentClick);
    document.addEventListener('keydown', onSuccessDocumentKeydown);

    window.globalElements.mapPinMain.left = window.startX;
    window.globalElements.mapPinMain.top = window.startY;
    window.fillPinInitialAddress(window.globalElements.mapPinMain);
  };

  var onError = function () {
    var template = document.querySelector('#error').content;
    var error = template.cloneNode(true);
    var main = document.querySelector('main');
    var buttonClose = main.querySelector('.error__button');

    var onErrorDocumentClick = function (evt) {
      evt.preventDefault();
      main.querySelector('.error').remove();
      document.removeEventListener('click', onErrorDocumentClick);
      document.removeEventListener('click', onErrorDocumentKeydown);
      buttonClose.removeEventListener('click', onErrorCloseButtonClick);
    };

    var onErrorDocumentKeydown = function (evt) {
      evt.preventDefault();
      if (evt.keyCode === window.constants.ESCAPE_CODE) {
        main.querySelector('.error').remove();
        document.removeEventListener('click', onErrorDocumentKeydown);
        document.removeEventListener('click', onErrorDocumentClick);
        buttonClose.removeEventListener('click', onErrorCloseButtonClick);
      }
    };

    var onErrorCloseButtonClick = function (evt) {
      evt.preventDefault();
      main.querySelector('.error').remove();
      document.removeEventListener('click', onErrorDocumentClick);
      document.removeEventListener('click', onErrorDocumentKeydown);
      buttonClose.removeEventListener('click', onErrorCloseButtonClick);
    };

    main.appendChild(error);
    document.addEventListener('click', onErrorDocumentClick);
    document.addEventListener('keydown', onErrorDocumentKeydown);
    buttonClose.addEventListener('click', onErrorCloseButtonClick);
  };


  form.addEventListener('submit', function (evt) {
    adAddress.removeAttribute('readonly');
    var trigger = window.checkRoomGuests();
    if (trigger) {
      window.save(new FormData(form), onSuccess, onError);
    }
    evt.preventDefault();
  });

  form.querySelector('.ad-form__reset').addEventListener('click', function () {
    window.gallery.innerHTML = '';
    window.avatarPreview.src = 'img/muffin-grey.svg';
  });
})();
