import Pristine from '../vendor/pristine/pristine.min.js';

const form = document.querySelector('.form-selector');
const fileInput = document.querySelector('.img-upload__input');
const closeButton = document.querySelector('.close-button');

const pristine = new Pristine(form, {
  classTo: 'form-group',
  errorClass: 'has-error',
  successClass: 'has-success',
  errorTextParent: 'form-group',
  errorTextTag: 'div',
  errorTextClass: 'error-text'

const validateHashtags = (value) => {
  if (!value) return true;
  const hashtags = value.split(' ');
  for (let tag of hashtags) {
    if (!/^#[a-zA-Z0-9]{1,20}$/.test(tag)) {
      return false;
    }
  }
  return true;
};

const validateComment = (value) => {
  return value.length <= 140;
};

pristine.addValidator(document.querySelector('[name="hashtags"]'), validateHashtags, 'Хэш-теги должны начинаться с "#" и содержать только буквы и цифры.');
pristine.addValidator(document.querySelector('[name="comment"]'), validateComment, 'Комментарий не должен превышать 140 символов.');

form.addEventListener('submit', (event) => {
  if (!pristine.validate()) {
    event.preventDefault();
  }
});

closeButton.addEventListener('click', () => {
  form.reset();
  fileInput.value = '';
});

const hashtagsInput = document.querySelector('[name="hashtags"]');
const commentInput = document.querySelector('[name="comment"]');

hashtagsInput.addEventListener('input', () => {
  pristine.validate(hashtagsInput);
});

commentInput.addEventListener('input', () => {
  pristine.validate(commentInput);
});

const resetForm = () => {
  form.reset();
  fileInput.value = '';
  pristine.reset();
};

const openForm = () => {
  form.classList.remove('hidden');
  resetForm();
};
