const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names = ['Артём', 'Мария', 'Иван', 'Ольга', 'Дмитрий', 'Светлана', 'Александр', 'Екатерина', 'Никита', 'Алиса'];

// Генерация случайного числа в диапазоне и случайного элемента массива
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomElement = (arr) => arr[getRandomInt(0, arr.length - 1)];

// Генерация комментария
const generateComment = () => ({
  id: getRandomInt(100, 999),
  avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
  message: getRandomElement(messages),
  name: getRandomElement(names)
});

// Генерация фотографий с комментариями
const generatePhotos = () => Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  url: `photos/${i + 1}.jpg`,
  description: `Описание фотографии ${i + 1}`,
  likes: getRandomInt(15, 200),
  comments: Array.from({ length: getRandomInt(0, 30) }, generateComment)
}));

// Генерация данных для фотографий
const photoData = generatePhotos();
console.log(photoData);
