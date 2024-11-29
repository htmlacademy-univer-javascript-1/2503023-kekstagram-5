import noUiSlider from '../vendor/nouislider/nouislider.min.js';

const scaleSlider = document.getElementById('scale-slider');
const scaleValue = document.getElementById('scale-value');
const imgPreview = document.querySelector('.img-upload__preview');

// Инициализация слайдера для масштаба изображения
noUiSlider.create(scaleSlider, {
  start: [100], // масштаб (100%)
  connect: [true, false], // линия подключения слайдера
  range: {
    'min': [50], // min масштаб 50%
    'max': [150], // max масштаб 150%
  },
  step: 1, // изменения масштаба
  format: {
    to: value => Math.round(value), // округляем
    from: value => Number(value), // преобразуем значение обратно в число
  }
});

scaleSlider.noUiSlider.on('update', (values, handle) => {
  const scale = values[handle];
  imgPreview.style.transform = `scale(${scale / 100})`;
  scaleValue.value = scale;
});

// сброс значения масштаба при переключении фильтров
const filterButtons = document.querySelectorAll('.filter-button');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    scaleSlider.noUiSlider.set(100);
  });
});
