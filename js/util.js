'use strict';
(function () {
  /**
   * Функция возращает числовое значение запрашиваемого параметра заданного элемента
   * @param {string} parameterStringValue
   * @return {number} числовое значение любогозапрашиваемого параметра элемента
   */
  var getParameterNumValue = function (parameterStringValue) {
    return Math.round(parseInt(parameterStringValue, 10));
  };

  window.util = {
    getParameterNumValue: getParameterNumValue
  };
})();
