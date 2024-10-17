import { getRandomInt, getRandomElement } from './utils.js';
import { messages, names } from './data.js';
export const generateComment = () => ({
  id: getRandomInt(100, 999),
  avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
  message: getRandomElement(messages),
  name: getRandomElement(names)
});
