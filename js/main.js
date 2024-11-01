import { generatePhotos } from './photo-generator.js';
const photoData = generatePhotos();
console.log(photoData);

import { renderThumbnails } from './renderThumbnails.js';

// временные данные для разработки
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
