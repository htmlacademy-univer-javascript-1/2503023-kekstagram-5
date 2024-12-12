import { fetchData } from './api.js';

// Функция для отрисовки фотографий
const renderPhotos = async () => {
  try {
    const photos = await fetchData(); // Загружаем данные с сервера
    const pictureContainer = document.querySelector('.pictures');
    const pictureTemplate = document.querySelector('#picture').content;

    const fragment = document.createDocumentFragment();

    photos.forEach(({ url, likes, comments }) => {
      const pictureElement = pictureTemplate.cloneNode(true);
      pictureElement.querySelector('.picture__img').src = url;
      pictureElement.querySelector('.picture__likes').textContent = likes;
      pictureElement.querySelector('.picture__comments').textContent = comments.length;
      fragment.appendChild(pictureElement);
    });

    pictureContainer.appendChild(fragment);
  } catch (error) {
    console.error('Ошибка загрузки фотографий:', error);

    // Добавляем уведомление об ошибке
    const errorMessage = document.createElement('div');
    errorMessage.textContent = 'Не удалось загрузить фотографии. Попробуйте позже.';
    errorMessage.style.position = 'fixed';
    errorMessage.style.top = '0';
    errorMessage.style.left = '0';
    errorMessage.style.right = '0';
    errorMessage.style.backgroundColor = 'red';
    errorMessage.style.color = 'white';
    errorMessage.style.textAlign = 'center';
    errorMessage.style.padding = '10px';
    document.body.appendChild(errorMessage);
  }
};

export { renderPhotos };
