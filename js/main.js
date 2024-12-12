import { fetchData } from './api.js';
import { renderThumbnails } from './renderThumbnails.js';
import { showBigPicture } from './big-picture.js';

// Инициализация приложения
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Загружаем данные с сервера
    const photosData = await fetchData();

    // Отрисовываем миниатюры
    renderThumbnails(photosData);

    // Добавляем обработчик для отображения большого изображения
    const photoThumbnails = document.querySelectorAll('.picture'); // Миниатюры фотографий

    photoThumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener('click', () => {
        showBigPicture(photosData[index]); // Передаём данные выбранной фотографии
      });
    });
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
});
