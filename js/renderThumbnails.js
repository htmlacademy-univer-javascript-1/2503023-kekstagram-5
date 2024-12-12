/**
 * Отрисовка миниатюр фотографий
 * @param {Array} photos - Массив объектов с данными фотографий
 */
const renderThumbnails = (photos) => {
  const pictureTemplate = document.querySelector('#picture').content; // Шаблон миниатюры
  const pictureContainer = document.querySelector('.pictures'); // Контейнер для миниатюр

  const fragment = document.createDocumentFragment();

  photos.forEach(({ url, likes, comments }) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    fragment.appendChild(pictureElement);
  });

  pictureContainer.appendChild(fragment);
};

export { renderThumbnails };
