import { generatePhotos } from './photo-generator.js';
const photoData = generatePhotos();
console.log(photoData);

import { renderThumbnails } from './renderThumbnails.js';

// Временные данные для тестирования
const temporaryData = [
  {
    url: 'https://example.com/photo1.jpg',
    description: 'Beautiful beach',
    likes: 45,
    comments: 8
  },
  {
    url: 'https://example.com/photo2.jpg',
    description: 'Mountain view',
    likes: 68,
    comments: 15
  }
];

document.addEventListener('DOMContentLoaded', () => {
  renderThumbnails(temporaryData);
});
import { showBigPicture } from './big-picture.js';

// Пример данных
const examplePhotos = [
  {
    url: 'img/photo1.jpg',
    likes: 123,
    description: 'Пример описания',
    comments: [
      { avatar: 'img/avatar-1.svg', name: 'Кот', message: 'Мяу!' },
      { avatar: 'img/avatar-2.svg', name: 'Собака', message: 'Гав!' },
      { avatar: 'img/avatar-3.svg', name: 'Кролик', message: 'Прыг!' },
      { avatar: 'img/avatar-4.svg', name: 'Медведь', message: 'Р-р-р!' },
      { avatar: 'img/avatar-5.svg', name: 'Лев', message: 'Рык!' },
      { avatar: 'img/avatar-6.svg', name: 'Петух', message: 'Кукареку!' },
    ],
  },
];
examplePhotos.forEach((photo) => {
  const thumbnail = document.createElement('img');
  thumbnail.src = photo.url;
  thumbnail.alt = photo.description;

  thumbnail.addEventListener('click', () => {
    showBigPicture(photo);
  });

  document.querySelector('.pictures').appendChild(thumbnail);
});

import { showBigPicture } from './big-picture.js';

const photoThumbnails = document.querySelectorAll('.picture'); // миниатюры фотографий
const photosData = [...];

// Обработчик кликов по миниатюре
photoThumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', () => {
    showBigPicture(photosData[index]);
  });
});
