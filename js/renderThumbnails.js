export function renderThumbnails(data) {
  const picturesContainer = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  data.forEach(({ url, description, likes, comments }) => {
    const pictureElement = document.createElement('div');
    pictureElement.classList.add('picture');

    pictureElement.innerHTML = `
      <img class="picture__img" src="${url}" alt="${description}">
      <p class="picture__info">
        <span class="picture__likes">${likes}</span> likes
        <span class="picture__comments">${comments}</span> comments
      </p>
    `;

    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
}
