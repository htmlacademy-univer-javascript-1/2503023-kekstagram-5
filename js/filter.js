import { renderPictures } from './gallery.js';
import { debounce, getRandomElements } from './util.js';

const MAX_RANDOM_PICTURES_COUNT = 10;
const ACTIVE_CLASS = 'img-filters__button--active';

const filterSection = document.querySelector('.img-filters');
const defaultFilter = document.querySelector('#filter-default');
const randomFilter = document.querySelector('#filter-random');
const discussedFilter = document.querySelector('#filter-discussed');

const getRandomPictures = (pictures, count) => getRandomElements(pictures, count);

const sortByComments = (a, b) => b.comments.length - a.comments.length;
const getDiscussedPhotos = (pictures) => [...pictures].sort(sortByComments);

const clearPictures = () => document.querySelectorAll('.picture').forEach((picture) => picture.remove());

const showFilteredPictures = (pictures) => {
  renderPictures(pictures);
  filterSection.classList.remove('img-filters--inactive');

  const debouncedRender = debounce((filteredPictures) => {
    clearPictures();
    renderPictures(filteredPictures);
  }, 500);

  const updateFilter = (filterFunction, filterButton) => {
    const currentActiveButton = document.querySelector(`.${ACTIVE_CLASS}`);
    if (currentActiveButton) {
      currentActiveButton.classList.remove(ACTIVE_CLASS);
    }
    filterButton.classList.add(ACTIVE_CLASS);

    const filteredPictures = filterFunction(pictures);
    debouncedRender(filteredPictures);
  };

  randomFilter.addEventListener('click', () => {
    updateFilter(
      (photos) => getRandomPictures(photos, MAX_RANDOM_PICTURES_COUNT),
      randomFilter
    );
  });

  discussedFilter.addEventListener('click', () => {
    updateFilter(getDiscussedPhotos, discussedFilter);
  });

  defaultFilter.addEventListener('click', () => {
    updateFilter((photos) => photos, defaultFilter);
  });
};

export { showFilteredPictures };
