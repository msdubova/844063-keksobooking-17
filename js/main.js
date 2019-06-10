'use strict';

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var pin = document.querySelector('#pin').content;
var hotels = [];
var fragment = document.createDocumentFragment();

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
var randomizeAvatar = function () {
  return ('img/avatars/user0' + getRandomInRange(1, 9) + '.png');
};

/**
 * Функция конкатенирует строку для значения локализации из указанной строки и конкатенации случайного числа
 * @return {string} Возвращает строку - значение локализации
 */
var randomizeLocation = function () {
  return 'left: ' + getRandomInRange(0, mapPins.offsetWidth) + 'px; top: ' + getRandomInRange(130, 631) + 'px';
};

/**
 * Функция конкатенирует строку для значения типа жилища из указанной строки и конкатенации случайного числа
 * @return {string} Возвращает строку - значение типа жилища
 */
var randomizeType = function () {
  var types = ['palace', 'flat', 'house', 'bungalo'];
  return 'type: ' + types[getRandomInRange(0, types.length)];
};

/**
 * Функция создает массив из заданного количества объектов, значения свойств которых генерируются случайным образом
 * @param {number} quantity желаемое количество элементов в массиве
 * @return {arr}
 */
var generateArray = function (quantity) {
  for (var i = 0; i < quantity; i++) {
    var hotelTemplate = {};
    hotelTemplate.author = randomizeAvatar();
    hotelTemplate.location = randomizeLocation();
    hotelTemplate.offer = randomizeType();
    hotels.push(hotelTemplate);
  }
  return hotels;
};

/**
 * Функция создает булавки и добавляет из в разметку. Данные о булавках  генерируются случайно
 * @param {number} quantity желаемое количество элементов в массиве
 */
var generatePins = function (quantity) {
  generateArray(quantity);

  for (var i = 0; i < quantity; i++) {
    var clonedPin = pin.cloneNode(true);
    var clonedPinImage = clonedPin.querySelector('img');
    clonedPin.style = hotels[i].location;
    clonedPinImage.src = hotels[i].author;
    clonedPinImage.alt = hotels[i].offer;
    fragment.appendChild(clonedPin);
  }
  mapPins.appendChild(fragment);
};





map.classList.remove('map--faded');
generatePins(8);
console.log(hotels);
