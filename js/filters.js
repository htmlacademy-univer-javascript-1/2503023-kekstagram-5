import { renderThumbnails } from './renderThumbnails.js';
import { debounce } from './utils/debounce.js';

// Константы
const RANDOM_PHOTOS_COUNT = 10;

// DOM-элементы
const filtersContainer = document.querySelector('.img-filters'); // Блок с фильтрами
const filtersButtons = filtersContainer.querySelectorAll('.img-filters__button');

// Функция для удаления ранее отрисованных миниатюр
const clearThumbnails = () => {
  const pictures = document.querySelectorAll('.picture'); // Найти все миниатюры
  pictures.forEach((picture) => picture.remove()); // Удалить каждую миниатюру
};

// Функция для фильтрации случайных фотографий
const getRandomPhotos = (photos) => {
  const shuffled = [...photos].sort(() => 0.5 - Math.random()); // Перемешиваем массив
  return shuffled.slice(0, RANDOM_PHOTOS_COUNT); // Берём первые 10 случайных элементов
};

// Функция для фильтрации обсуждаемых фотографий
const getDiscussedPhotos = (photos) => {
  return [...photos].sort((a, b) => b.comments.length - a.comments.length); // Сортировка по количеству комментариев
};

// Функция для управления фильтрами
const applyFilter = (filter, photos) => {
  clearThumbnails(); // Удаляем текущие миниатюры

  let filteredPhotos = photos;

  switch (filter) {
    case 'filter-random':
      filteredPhotos = getRandomPhotos(photos);
      break;
    case 'filter-discussed':
      filteredPhotos = getDiscussedPhotos(photos);
      break;
    default:
      filteredPhotos = photos; // Фильтр по умолчанию
  }

  renderThumbnails(filteredPhotos); // Отрисовываем миниатюры для выбранного фильтра
};

// Функция для инициализации фильтров
const initFilters = (photos) => {
  filtersContainer.classList.remove('img-filters--inactive'); // Показываем блок фильтров

  let activeButton = filtersContainer.querySelector('.img-filters__button--active'); // Текущая активная кнопка

  filtersButtons.forEach((button) => {
    button.addEventListener(
      'click',
      debounce(() => {
        // Обновляем активную кнопку
        if (activeButton) {
          activeButton.classList.remove('img-filters__button--active');
        }
        button.classList.add('img-filters__button--active');
        activeButton = button;

        // Применяем фильтр
        applyFilter(button.id, photos);
      }, 500)
    );
  });
};

export { initFilters };
