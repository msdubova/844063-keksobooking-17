'use strict';

var mapPins = document.querySelector('.map__pins');
var types = ['palace', 'flat', 'house', 'bungalo'];

var LOWLINE_Y = 130;
var TOPLINE_Y = 630;
var ELEMENTS = 8;
var PIN_WIDTH = mapPins.querySelector('.map__pin').clientWidth;
var PIN_HEIGHT = mapPins.querySelector('.map__pin').clientHeight;

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
 * Функция создает массив из чисел от одного до указанного числа
 * @param {number} quantity количество элементов в массиве
 * @return {arr} arr массив из указанного количества элементов: чисел от 1 до макс в диапазоне
 */
var getRandomArr = function (quantity) {
  var arr = [];
  for (var j = 1; j <= quantity; j++) {
    arr.push(j);
  }
  return arr;
};

/**
 * Функция перемешивает элементы массива
 * @param {arr} arr принимает массив элементов
 * @return {arr} arr Возвращает перемешанный массив
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
  * Функция создает массив из заданного количества объектов, значения свойств которых генерируются случайным образом
  * @param {number} quantity желаемое количество элементов в массиве
  * @return {arr}   Массив обьектов случайных свойств
  */
var generateTemplates = function (quantity) {
  var hotels = [];
  var avatars = shuffleArray(getRandomArr(quantity));
  for (var i = 0; i < quantity; i++) {
    var hotelTemplate = {};
    hotelTemplate.author = {};
    hotelTemplate.author.avatar = 'img/avatars/user0' + (avatars[i]) + '.png';

    hotelTemplate.offer = {};
    hotelTemplate.offer.type = types[getRandomInRange(0, types.length)];

    hotelTemplate.location = {};
    hotelTemplate.location.x = (getRandomInRange(0, mapPins.offsetWidth) - PIN_WIDTH / 2);
    hotelTemplate.location.y = (getRandomInRange(LOWLINE_Y, TOPLINE_Y) - PIN_HEIGHT);

    hotels.push(hotelTemplate);
  }
  return hotels;
};

/**
 * Функция создает массив строк  - адресов изображений аватарок
 * @param {arr} arr Массив обьектов случайных свойств
 * @return {arr} avatars  - массив строк - адресов
 */
var getRandomAvatarArrayString = function (arr) {
  var avatars = [];
  for (var i = 0; i < arr.length; i++) {
    avatars[i] = 'left: ' + arr[i].location.x + 'px; top: ' + arr[i].location.y + 'px;';
  }
  return avatars;
};

/**
 * Функция создает булавки и добавляет их в разметку, данные каждой булавки получены из массива  - результата фунцкии generateTemplates
 * @param {arr} arr массив с заготовленными обьектами - шаблонами свойств
 */
var generatePins = function (arr) {
  var ad = document.querySelector('#pin').content;
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    var clonedAd = ad.cloneNode(true);
    var clonedAdImage = clonedAd.querySelector('img');
    var clonedAdButton = clonedAd.querySelector('button');
    clonedAdButton.style = (getRandomAvatarArrayString(arr)[i]);
    clonedAdImage.src = arr[i].author.avatar;
    clonedAdImage.alt = arr[i].offer.type;
    fragment.appendChild(clonedAd);
  }

  mapPins.appendChild(fragment);
};

/**
 * Функция запускает алшоритм генерации булавок со случайными значениями и их добалвение в разметку
 * @param {number} quantity
 */
var setup = function (quantity) {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');

  generatePins(generateTemplates(quantity));
};

setup(ELEMENTS);
