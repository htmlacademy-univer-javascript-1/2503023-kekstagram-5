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
