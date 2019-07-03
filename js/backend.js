'use strict';
(function () {
  window.load = function (onSuccess, onError) {
    var URL = 'https://js.dump.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    var onLoadRequest = function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError(xhr.status);
      }
    };
    xhr.addEventListener('load', onLoadRequest);

    xhr.open('GET', URL);
    xhr.send();
  };
})();
