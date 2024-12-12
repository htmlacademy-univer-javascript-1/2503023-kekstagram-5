import { fetchData } from './api.js';
import { renderThumbnails } from './renderThumbnails.js';
import { showBigPicture } from './big-picture.js';
import { initFilters } from './filters.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const photosData = await fetchData(); // Загружаем данные с сервера

    renderThumbnails(photosData); // Отрисовываем миниатюры

    initFilters(photosData); // Инициализируем фильтры

    // Добавляем обработчики кликов для миниатюр
    const photoThumbnails = document.querySelectorAll('.picture');
    photoThumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener('click', () => {
        showBigPicture(photosData[index]);
      });
    });
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
});
