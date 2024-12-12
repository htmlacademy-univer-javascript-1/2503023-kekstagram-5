const fileInput = document.querySelector('#upload-file');
const previewImage = document.querySelector('.img-upload__preview img');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const effectsList = document.querySelector('.effects__list');
const form = document.querySelector('.img-upload__form');
const closeFormButton = document.querySelector('.img-upload__cancel');

let currentScale = 100; // Текущий масштаб в процентах

/**
 * Функция для изменения масштаба изображения
 * @param {number} scale - Новый масштаб
 */
const updateScale = (scale) => {
  previewImage.style.transform = `scale(${scale / 100})`;
  scaleControlValue.value = `${scale}%`;
};

/**
 * Сброс формы и предварительного просмотра
 */
const resetForm = () => {
  form.reset(); // Сбрасываем все поля формы
  previewImage.src = 'img/upload-default-image.jpg'; // Сбрасываем изображение на стандартное
  previewImage.style.transform = ''; // Сбрасываем масштаб
  previewImage.className = ''; // Сбрасываем фильтры
  currentScale = 100; // Сбрасываем масштаб
};

/**
 * Обработчик загрузки файла
 */
fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  const validTypes = ['image/jpeg', 'image/png', 'image/gif'];

  if (file && validTypes.includes(file.type)) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewImage.src = reader.result; // Устанавливаем загруженное изображение
    });

    reader.readAsDataURL(file);
  } else {
    alert('Пожалуйста, выберите изображение формата JPG, PNG или GIF.');
    fileInput.value = ''; // Сбрасываем поле ввода
  }
});

/**
 * Обработчики изменения масштаба
 */
scaleControlSmaller.addEventListener('click', () => {
  if (currentScale > 25) {
    currentScale -= 25;
    updateScale(currentScale);
  }
});

scaleControlBigger.addEventListener('click', () => {
  if (currentScale < 100) {
    currentScale += 25;
    updateScale(currentScale);
  }
});

/**
 * Обработчик применения фильтров
 */
effectsList.addEventListener('change', (event) => {
  const effect = event.target.value;

  previewImage.className = ''; // Сбрасываем предыдущие классы
  if (effect !== 'none') {
    previewImage.classList.add(`effects__preview--${effect}`); // Применяем выбранный эффект
  }
});

/**
 * Обработчик закрытия формы
 */
closeFormButton.addEventListener('click', resetForm);
