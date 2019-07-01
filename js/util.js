'use strict';
(function () {
  // изменение
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
     * Функция возращает числовое значение запрашиваемого параметра заданного элемента
     * @param {string} parameterStringValue
     * @return {number} числовое значение любогозапрашиваемого параметра элемента
     */
  var getParameterNumValue = function (parameterStringValue) {
    return Math.round(parseInt(parameterStringValue, 10));
  };








  window.util = {
    getRandomInRange: getRandomInRange,
    shuffleArray: shuffleArray,
    getParameterNumValue: getParameterNumValue
  };
})();
