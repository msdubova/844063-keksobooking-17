'use strict';

var mapPins = document.querySelector('.map__pins');
var types = ['palace', 'flat', 'house', 'bungalo'];

var LOWLINE_Y = 130;
var TOPLINE_Y = 630;
var ELEMENTS_COUNT = 8;

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
  var avatars = shuffleArray(generateAvatars(quantity));
  for (var i = 0; i < quantity; i++) {
    var hotelTemplate = {
      author: {
        avatar: avatars[i]
      },
      offer: {
        type: types[getRandomInRange(0, types.length - 1)]
      },
      location: {
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
var renderPins = function (arr) {
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
 * Функция запускает предварительные настройки
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

var formCustomAd = document.querySelector('.ad-form');
var formFieldsets = formCustomAd.children;
var mapPinMain = document.querySelector('.map__pin--main');
var addressInput = formCustomAd.querySelector('input[name="address"]');
var PIN_TAIL_HEIGHT = 22;

/**
 * Функция возращает числовое значение запрашиваемого параметра заданного элемента
 * @param {string} parameterStringValue
 * @return {number} числовое значение любогозапрашиваемого параметра элемента
 */
var getParameterNumValue = function (parameterStringValue) {
  return Math.round(parseInt(parameterStringValue, 10));
};

/**
 * Функция записывает координаты нижней центральной точки переданного элемента в поле Input (address)
 * @param {object} element
 */
var fillPinAddressOnActiveMap = function (element) {
  addressInput.value = (getParameterNumValue(element.style.left) + Math.round(getParameterNumValue(element.clientWidth) / 2)) + ', '
  + (getParameterNumValue(element.style.top) + getParameterNumValue(element.clientHeight) + PIN_TAIL_HEIGHT);
};

/**
 * Функция записывает координаты центра переданного элемента в поле Input (address)
 * @param {object} element
 */
var fillPinInitialAddress = function (element) {
  addressInput.value = (getParameterNumValue(element.style.left) + Math.round(getParameterNumValue(element.clientWidth) / 2)) + ', '
  + (getParameterNumValue(element.style.top) + Math.round(getParameterNumValue(element.clientHeight) / 2));
};

/**
 * Функция деактивирует форму. Также выполняет заполнение поле ввода адреса автоматически при открытии. Используется при открытии страницы
 */
var deactivateForm = function () {
  if (!formCustomAd.classList.contains('ad-form--disabled')) {
    formCustomAd.classList.add('ad-form--disabled');
  }

  for (var i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].setAttribute('disabled', 'disabled');
  }

  fillPinInitialAddress(mapPinMain);
};

/**
 * Функция активирует форму и карту с ее функциями и элементами
 */
var activatePage = function () {
  formCustomAd.classList.remove('ad-form--disabled');

  for (var i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].removeAttribute('disabled');
  }

  setup();
  renderPins(generateTemplates(ELEMENTS_COUNT));
  customizePinSize();
};


deactivateForm();

mapPinMain.addEventListener('click', function () {
  activatePage();
}, {once: true});

mapPinMain.addEventListener('mouseup', function () {
  fillPinAddressOnActiveMap(mapPinMain, PIN_TAIL_HEIGHT);
});


var adTypeSelect = formCustomAd.querySelector('#type');
var adPriceInput = formCustomAd.querySelector('#price');
var adCheckinSelect = formCustomAd.querySelector('#timein');
var adCheckOutSelect = formCustomAd.querySelector('#timeout');
// в этой домашке же не нужно пока трогать комнаты и вместимость?
// var adRoomSelect = formCustomAd.querySelector('#room_number');
// var adCapacitySelect = formCustomAd.querySelector('#capacity');

var adTypeParameters = {
  bungalo: {min: 0, placeholder: 0},
  flat: {min: 1000, placeholder: 1000},
  house: {min: 5000, placeholder: 5000},
  palace: {min: 10000, placeholder: 10000}
};

/**
 * Функция подтягивает значения двух селектов по порядковому номеру выбранной опции
 * @param {object} firstSelect селект, в котором происходит выбор опции
 * @param {object} secondSelect селект, в котором выбор опции подтягивается выбором в первом селекте
 */
var matchSelects = function (firstSelect, secondSelect) {
  secondSelect.selectedIndex = firstSelect.selectedIndex;
};

adTypeSelect.addEventListener('change', function () {
  adPriceInput.setAttribute('placeholder', adTypeParameters[adTypeSelect.value].placeholder);
  adPriceInput.setAttribute('min', parseInt(adTypeParameters[adTypeSelect.value].min, 10));
});

adCheckinSelect.addEventListener('change', function () {
  matchSelects(adCheckinSelect, adCheckOutSelect);
});

adCheckOutSelect.addEventListener('change', function () {
  adCheckinSelect.selectedIndex = adCheckOutSelect.selectedIndex;
  matchSelects(adCheckOutSelect, adCheckinSelect);
});

// adRoomSelect.addEventListener('change', function () {
//   adCapacitySelect.selectedIndex = adRoomSelect.selectedIndex;
// });


