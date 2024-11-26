const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
export const showBigPicture = (photoData) => {
  bigPictureImg.src = photoData.url;
  likesCount.textContent = photoData.likes;
  commentsCount.textContent = photoData.comments.length;
  socialComments.innerHTML = '';
  photoData.comments.forEach(({ avatar, name, message }) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    commentElement.innerHTML = `
      <img
        class="social__picture"
        src="${avatar}"
        alt="${name}"
        width="35" height="35">
      <p class="social__text">${message}</p>
    `;
    socialComments.appendChild(commentElement);
  });

  socialCaption.textContent = photoData.description;

  commentCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  bigPicture.classList.remove('hidden');

  document.body.classList.add('modal-open');

  closeButton.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onEscKeyPress);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  closeButton.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onEscKeyPress);
};

const onEscKeyPress = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};
const COMMENTS_STEP = 5; // Шаг показа комментариев
let currentCommentsCount = 0; // Количество отображённых комментариев
let allComments = []; // Все комментарии фотографии

const commentList = document.querySelector('.social__comments');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

// Шаблон комментария
const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');
  commentElement.innerHTML = `
    <img
      class="social__picture"
      src="${comment.avatar}"
      alt="${comment.name}"
      width="35" height="35">
    <p class="social__text">${comment.message}</p>
  `;
  return commentElement;
};

// Отрисовка комментариев
const renderComments = () => {
  const fragment = document.createDocumentFragment();
  const commentsToRender = allComments.slice(currentCommentsCount, currentCommentsCount + COMMENTS_STEP);

  commentsToRender.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    fragment.appendChild(commentElement);
  });

  commentList.appendChild(fragment);
  currentCommentsCount += commentsToRender.length;

  // Обновление счётчика комментариев
  commentCount.textContent = `${currentCommentsCount} из ${allComments.length} комментариев`;

  // Скрыть кнопку, если все комментарии отображены
  if (currentCommentsCount >= allComments.length) {
    commentsLoader.classList.add('hidden');
  }
};

// Сброс комментариев
const resetComments = (comments) => {
  allComments = comments;
  currentCommentsCount = 0;
  commentList.innerHTML = ''; // Очистить список комментариев
  commentsLoader.classList.remove('hidden');
  renderComments();
};

// Обработчик нажатия на кнопку «Загрузить ещё»
commentsLoader.addEventListener('click', renderComments);

// Экспорт функции для работы с полноразмерным изображением
export const showBigPicture = (photo) => {
  resetComments(photo.comments);
  // Прочие данные фото (лайки, описание, изображение) задайте в big-picture
};
