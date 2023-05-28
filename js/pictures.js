'use strict';
(function () {
  var avatarChooser = window.globalElements.formCustomAd.querySelector('.ad-form__field input[type=file]');
  window.avatarPreview = window.globalElements.formCustomAd.querySelector('.ad-form-header__preview img');
  var galleryChooser = window.globalElements.formCustomAd.querySelector('.ad-form__upload input[type=file]');
  window.gallery = window.globalElements.formCustomAd.querySelector('.ad-form__photo');
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  /**
   * Функция загружает фото в поле аватара
   * @param {HTMLSelectElement} fileChooser зона дропа
   * @param {HTMLSelectElement} preview элемент которому присвоится src изображения
   * @return {void}
   */
  var uploadPicture = function (fileChooser, preview) {
    fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          preview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    });
  };

  /**
   * Функция заружает изображения в галерею фото
   * @param {HTMLSelectElement} fileChooser зона дропа
   * @param {HTMLSelectElement} photoGallery зона для размещения превью
   * @return {void}
   */
  var uploadGallery = function (fileChooser, photoGallery) {
    fileChooser.addEventListener('change', function () {
      var files = Array.from(fileChooser.files);
      var fragment = document.createDocumentFragment();

      var generatePreview = function (file) {
        var createdPreview = document.createElement('img');
        createdPreview.classList.add('photo_preview');
        createdPreview.draggable = true;
        createdPreview.style.width = '67px';
        createdPreview.style.height = '67px';
        createdPreview.style.border = '2px solid #e4e4de';
        createdPreview.style.borderRadius = '8px';

        var fileName = file.name.toLowerCase();
        var matches = FILE_TYPES.some(function (it) {
          return fileName.endsWith(it);
        });

        if (matches) {
          var reader = new FileReader();
          reader.addEventListener('load', function () {
            createdPreview.src = reader.result;
          });
          fragment.appendChild(createdPreview);
          reader.readAsDataURL(file);
        }
      };

      files.forEach(function (thisFile) {
        generatePreview(thisFile);
      });
      photoGallery.style = 'background-color: transparent; display: flex; padding-top: 1.5px; padding-bottom: 1.5px; justify-content: flex-start ; align-items: center; flex-wrap: wrap; width: auto; height: auto;';
      photoGallery.appendChild(fragment);
    });
  };

  uploadPicture(avatarChooser, window.avatarPreview);
  uploadGallery(galleryChooser, window.gallery);
})();
