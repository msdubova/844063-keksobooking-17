'use strict';

var mapPins = document.querySelector('.map__pins');
var types = ['palace', 'flat', 'house', 'bungalo'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var LOWLINE_Y = 130;
var TOPLINE_Y = 630;

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
 * Функция конкатенирует строку для значения стиля аватарки из указанной строки и конкатенации случайного числа
 * @return {string} Возвращает строку - значение свойства аватара
 */
var getRandomAvatar = function () {
  return ('img/avatars/user0' + getRandomInRange(1, 8) + '.png');
};

/**
 * Функция конкатенирует строку для значения локализации из указанной строки и конкатенации случайного числа
 * @return {string} Возвращает строку - значение локализации
 */
var getRandomLocation = function () {
  return 'left: ' + (getRandomInRange(0, mapPins.offsetWidth) - PIN_WIDTH / 2) + 'px; top: ' + (getRandomInRange(LOWLINE_Y, TOPLINE_Y) - PIN_HEIGHT) + 'px';
};

/**
 * Функция конкатенирует строку для значения типа жилища из указанной строки и конкатенации случайного числа
 * @return {string} Возвращает строку - значение типа жилища
 */
var getRandomType = function () {

  return 'type: ' + types[getRandomInRange(0, types.length)];
};

/**
 * Функция создает булавки и добавляет из в разметку. Данные о булавках  генерируются случайно
 * @param {number} quantity желаемое количество элементов в массиве
 */
var generatePins = function (quantity) {
  var hotels = [];
  var ad = document.querySelector('#pin').content;
  var fragment = document.createDocumentFragment();

  /**
   * Функция создает массив из заданного количества объектов, значения свойств которых генерируются случайным образом
   * @param {number} quantity желаемое количество элементов в массиве
   * @return {arr}
   */
  var generateTemplates = function (quantity) {
    for (var i = 0; i < quantity; i++) {
      var hotelTemplate = {};
      hotelTemplate.author = getRandomAvatar();
      hotelTemplate.location = getRandomLocation();
      hotelTemplate.offer = getRandomType();
      hotels.push(hotelTemplate);
    }
    return hotels;
  };
  generateTemplates(quantity);

  for (var i = 0; i < quantity; i++) {
    var clonedAd = ad.cloneNode(true);
    var clonedAdImage = clonedAd.querySelector('img');
    var clonedAdButton = clonedAd.querySelector('button');
    clonedAdButton.style = hotels[i].location;
    clonedAdImage.src = hotels[i].author;
    clonedAdImage.alt = hotels[i].offer;
    fragment.appendChild(clonedAd);
  }
  mapPins.appendChild(fragment);
};

var setup = function (quantity) {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
  generatePins(quantity);
};

setup(8);

