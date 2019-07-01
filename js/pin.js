'use strict';

(function () {
  /**
  * Функция создает массив массив, состоящий из 8 сгенерированных JS объектов (количество объектов задется параметром функции), которые будут описывать значения булавок на карте
  * @param {number} quantity желаемое количество элементов в массиве
  * @return {[{
    * author: {
        * avatar: string
        * },
        * offer: {
        * type: string
        * },
        * location: {
        * x: number,
        * y: number
        * }
        * }]} Массив обьектов случайных свойств
      */
  window.generateTemplates = function (quantity) {
    var ads = [];
    var avatars = window.util.shuffleArray(generateAvatars(quantity));
    for (var i = 0; i < quantity; i++) {
      var hotelTemplate = {
        author: {
          avatar: avatars[i]
        },
        offer: {
          type: window.constants.TYPES[window.util.getRandomInRange(0, window.constants.TYPES.length - 1)]
        },
        location: {
          x: (window.util.getRandomInRange(0, window.globalElements.mapPins.offsetWidth)),
          y: (window.util.getRandomInRange(window.util.LOWLINE_Y, window.util.TOPLINE_Y))
        }
      };

      ads.push(hotelTemplate);
    }
    return ads;
  };

  /**
   * Функция создает массив из 8 адресов. В случае, если задано количество элементов массива больше 8 - адреса повторяются, начиная с первого.
    * @param {number} quantity желаемое количество элементов в массиве
    * @return {string[]} возвращает массив
    */
  var generateAvatars = function (quantity) {
    var avatarsArray = [];

    for (var i = 0; i < quantity; i++) {
      if (i >= 9) {
        avatarsArray[i] = 'img/avatars/user' + (i + 1) + '.png';
      } else {
        avatarsArray[i] = 'img/avatars/user0' + (i + 1) + '.png';
      }
    }
    return avatarsArray;
  };
})();
