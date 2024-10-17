import { getRandomInt } from './utils.js';
import { generateComment } from './comment.js';
export const generatePhotos = () => Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  url: `photos/${i + 1}.jpg`,
  description: `Описание фотографии ${i + 1}`,
  likes: getRandomInt(15, 200),
  comments: Array.from({ length: getRandomInt(0, 30) }, generateComment)
}));
