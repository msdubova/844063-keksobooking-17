'use strict';

var mapPins = document.querySelector('.map__pins');
var types = ['palace', 'flat', 'house', 'bungalo'];

var LOWLINE_Y = 130;
var TOPLINE_Y = 630;
var ELEMENTS_COUNT = 8;
// var PIN_WIDTH = mapPins.querySelector('.map__pin').clientWidth;
// var PIN_HEIGHT = mapPins.querySelector('.map__pin').clientHeight;

/**
 * Функция генерирует случайное число в указанном диапазоне
 * @param {number} min минимальное число включительно
 * @param {number} max максимальное число невключительно
 * @return {number} округленное до целого числа случайное число в обозначенном промежутке
 */
var getRandomInRange = function (min, max) {
  return (Math.round(Math.random() * (max - min) + min));
};

/**
 * Функция перемешивает элементы массива
 * @param {arr} arr принимает массив элементов
 * @return {number[]} Возвращает перемешанный массив
 */
var shuffleArray = function (arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};

/**
  * Функция создает массив массив, состоящий из 8 сгенерированных JS объектов, которые будут описывать значения булавок на карте
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
var generateTemplates = function (quantity) {
  var ads = [];
  var avatars = shuffleArray(getRandomAvatars(quantity));
  for (var i = 0; i < quantity; i++) {
    var hotelTemplate = {
      author: {
        avatar: avatars[i]
      },
      offer: {
        type: types[getRandomInRange(0, types.length - 1)]
      },
      location: {
        // x: (getRandomInRange(PIN_WIDTH / 2, mapPins.offsetWidth - PIN_WIDTH)),
        // y: (getRandomInRange(LOWLINE_Y - PIN_HEIGHT, TOPLINE_Y))
        x: (getRandomInRange(0, mapPins.offsetWidth)),
        y: (getRandomInRange(LOWLINE_Y, TOPLINE_Y))
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
var getRandomAvatars = function (quantity) {
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

/**
 * Функция создает массив строк  - адресов изображений аватарок
 * @param {arr} arr Массив обьектов случайных свойств
 * @return {string[]} массив строк - адресов
 */
var generateCoordinates = function (arr) {
  var coordinates = [];
  for (var i = 0; i < arr.length; i++) {
    coordinates.push('left: ' + arr[i].location.x + 'px; top: ' + arr[i].location.y + 'px;');
  }
  return coordinates;
};

/**
 * Функция создает булавки и добавляет их в разметку
 * @param {arr} arr массив с заготовленными обьектами - шаблонами свойств
 */
var generatePins = function (arr) {
  var ad = document.querySelector('#pin').content;
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    var clonedAd = ad.cloneNode(true);
    var clonedAdImage = clonedAd.querySelector('img');
    var clonedAdButton = clonedAd.querySelector('button');
    clonedAdButton.style = (generateCoordinates(arr)[i]);
    clonedAdImage.src = arr[i].author.avatar;
    clonedAdImage.alt = arr[i].offer.type;
    fragment.appendChild(clonedAd);
  }

  mapPins.appendChild(fragment);
};

/**
 * Функция запускает алгоритм генерации булавок со случайными значениями и их добалвение в разметку
 * @param {number} quantity
 */
var setup = function () {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
};

/**
 * Функция корректирует координаты булавки , учитывая погрешность на размер булавки и перенос центра отсчета с левого верхнего угла на кончик булавки
 */
var customizePinSize = function () {
  var ads = mapPins.querySelectorAll('.map__pin');
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
    if ((left + width) > mapPins.offsetWidth) {
      left = mapPins.offsetWidth - width;
    }
    ads[i].style = 'left: ' + left + 'px; top: ' + top + 'px;';
  }
};

setup();
generatePins(generateTemplates(ELEMENTS_COUNT));
customizePinSize();
