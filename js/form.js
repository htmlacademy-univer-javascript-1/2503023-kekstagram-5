import { sendData } from './api.js';

const form = document.querySelector('.img-upload__form');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

/**
 * Показываем сообщение пользователю
 * @param {Element} messageTemplate - Шаблон сообщения
 */
const showMessage = (messageTemplate) => {
  const messageElement = messageTemplate.cloneNode(true);
  document.body.appendChild(messageElement);

  const closeButton = messageElement.querySelector('button');
  const onClose = () => {
    messageElement.remove();
    document.removeEventListener('keydown', onEscKeyDown);
  };

  const onEscKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
    }
  };

  closeButton.addEventListener('click', onClose);
  document.addEventListener('keydown', onEscKeyDown);
};

// Обработчик отправки формы
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Отменяем действие по умолчанию
  const formData = new FormData(form); // Получаем данные формы

  try {
    await sendData(formData); // Отправляем данные на сервер
    showMessage(successMessageTemplate); // Показываем сообщение об успехе
    form.reset(); // Сбрасываем форму
  } catch (error) {
    showMessage(errorMessageTemplate); // Показываем сообщение об ошибке
  }
})
const closeFormButton = document.querySelector('.img-upload__cancel');
const resetForm = () => {
  form.reset(); // Сбрасываем форму
  document.querySelector('.img-upload__overlay').classList.add('hidden'); // Скрываем форму
};

// Обработчик закрытия формы
closeFormButton.addEventListener('click', resetForm);
const fileInput = document.querySelector('#upload-file'); // Поле для загрузки файла
const previewImage = document.querySelector('.img-upload__preview img'); // Элемент для предварительного просмотра

// Допустимые форматы изображений
const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];

// Обработчик события загрузки файла
fileInput.addEventListener('change', () => {
  const file = fileInput.files[0]; // Получаем загруженный файл
  const fileName = file.name.toLowerCase(); // Приводим имя файла к нижнему регистру

  // Проверяем, является ли файл изображением
  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (matches) {
    const reader = new FileReader();

    // Когда файл загружен, отображаем его в окне предварительного просмотра
    reader.addEventListener('load', () => {
      previewImage.src = reader.result;
    });

    reader.readAsDataURL(file); // Читаем файл как URL
  } else {
    alert('Пожалуйста, выберите изображение формата JPG, JPEG, PNG или GIF');
    fileInput.value = ''; // Сбрасываем поле ввода
  }
});
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');
let currentScale = 100; // Текущий масштаб в процентах

// Функция для изменения масштаба
const updateScale = (scale) => {
  previewImage.style.transform = `scale(${scale / 100})`;
  scaleControlValue.value = `${scale}%`;
};

// Уменьшение масштаба
scaleControlSmaller.addEventListener('click', () => {
  if (currentScale > 25) {
    currentScale -= 25;
    updateScale(currentScale);
  }
});

// Увеличение масштаба
scaleControlBigger.addEventListener('click', () => {
  if (currentScale < 100) {
    currentScale += 25;
    updateScale(currentScale);
  }
});
const effectsList = document.querySelector('.effects__list'); // Список фильтров

effectsList.addEventListener('change', (event) => {
  const effect = event.target.value;

  previewImage.className = ''; // Сбрасываем классы
  if (effect !== 'none') {
    previewImage.classList.add(`effects__preview--${effect}`); // Применяем выбранный эффект
  }
});
