'use strict';
(function () {
  window.load = function (onSuccess, onError) {
    var
      URL = 'https://js.dump.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    var onLoadRequest = function () {
      var error;
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        case 400:
          error = 'Bad request';
          break;
        case 401:
          error = 'Access denied';
          break;
        case 404:
          error = 'Not found';
          break;
        default:
          error = 'Status : ' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        onError(error);
      }
    };
    xhr.addEventListener('load', onLoadRequest);

    xhr.open('GET', URL);
    xhr.send();
  };
})();
