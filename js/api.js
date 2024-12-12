const BASE_URL = 'https://25.javascript.pages.academy/kekstagram';

/**
 * Получение данных с сервера
 * @returns {Promise} - Возвращает данные фотографий
 */
const fetchData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/data`);
    if (!response.ok) {
      throw new Error(`Ошибка загрузки данных: ${response.status}`);
    }
    return await response.json(); // Парсим JSON
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
    throw error; // Пробрасываем ошибку для обработки на уровне вызова
  }
};

/**
 * Отправка данных формы на сервер
 * @param {FormData} formData - Данные формы
 * @returns {Promise} - Возвращает результат отправки
 */
const sendData = async (formData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`Ошибка отправки данных: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Ошибка при отправке данных:', error);
    throw error;
  }
};

// Экспортируем функции
export { fetchData, sendData };
