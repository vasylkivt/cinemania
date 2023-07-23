import Storage from '../../api/localStorageAPI/localStorageAPI';
import { STORAGE_KEY } from '../../localStorageKey/localStorageKey';
import { refs } from './refs';
import { createMarkupFilmsCards } from '../../components/createMarkupFilmCard';
import { markupContentTextMessage } from './markupContentTextMessage';
import { Loader } from '../../loader';
import { SelectService } from '../../components/select';

const PER_PAGE = 6;

const loader = new Loader();

let correctGenre = 'All';
let totalPage;
let page = 0;
let startIndex = 0;
let endIndex = 0;
let correctGenreMovieList = [];

const dataStorage = Storage.load(STORAGE_KEY.myLibraryMoviesList);

renderContentBasedOnConditions();

document.addEventListener('click', function (e) {
  if (e.target.dataset.action === 'add-remove-to-my-library') {
    const dataStorage = Storage.load(STORAGE_KEY.myLibraryMoviesList);
    if (dataStorage.length === 0) {
      // refs.genreList.removeEventListener('change', onSelectGenreListChange);
      refs.myLibrarySection.classList.add(
        'my-library-content-text-message-section'
      );
      refs.libraryContent.innerHTML = markupContentTextMessage();
    }

    renderLibraryCards(dataStorage);
  }
});

function renderContentBasedOnConditions() {
  if (dataStorage?.length === 0) {
    refs.genreList.removeEventListener('click', renderGenreList);
    refs.myLibrarySection.classList.add(
      'my-library-content-text-message-section'
    );
    refs.libraryContent.innerHTML = markupContentTextMessage();
  } else if (dataStorage) {
    //? Отримую унікальні ID жанрів фільмів, які є у localStorage і за допомогою функції createSelectOptionMarkup отримую розмітку з жанром, і вставляю у select
    2;
    const allGenres = dataStorage
      .reduce((acc, el) => [...acc, ...el.genres], [])
      .filter(
        (genre, index, self) =>
          index ===
          self.findIndex(g => g.id === genre.id && g.name === genre.name)
      );

    const markupString = createSelectOption(allGenres);

    const selectService = new SelectService(
      '.js-select-my-library-genre-list',
      markupString
    );
    selectService.addEventListenerSelect();

    document
      .querySelector('.select-my-library-option-list')
      .addEventListener('click', renderGenreList);

    renderLibraryCards(dataStorage);
  } else {
    refs.genreList.removeEventListener('click', renderGenreList);
    refs.myLibrarySection.classList.add(
      'my-library-content-text-message-section'
    );
    refs.libraryContent.innerHTML = markupContentTextMessage();
  }
}

function createSelectOption(options) {
  return options.map(({ id, name }) => {
    return { value: id, text: name };
  });
}

function renderGenreList(e) {
  correctGenre = e.target.textContent;

  page = 0;

  if (correctGenre === 'All Genres') {
    correctGenre = 'All Genres';
    renderLibraryCards(dataStorage);
    return;
  }

  correctGenreMovieList = dataStorage.filter(el => {
    return el.genres.some(genre => genre.name === correctGenre);
  });

  renderLibraryCards(correctGenreMovieList);
}

async function renderLibraryCards(movieList) {
  loader.onShow();
  startIndex = 0;
  endIndex = PER_PAGE;
  refs.moviesList.innerHTML = '';
  refs.loadMoreButton.style.display = 'none';
  if (movieList.length > PER_PAGE) {
    refs.loadMoreButton.style.display = 'block';
    refs.loadMoreButton.addEventListener('click', onloadMoreButtonClick);
    localStoragePagination(startIndex, endIndex, movieList);
  } else {
    refs.moviesList.innerHTML = await createMarkupFilmsCards(movieList);
  }
  loader.onClose();
}

function onloadMoreButtonClick() {
  loader.onShow();
  refs.loadMoreButton.blur();

  startIndex += PER_PAGE;
  endIndex += PER_PAGE;

  if (correctGenre === 'All Genres') {
    localStoragePagination(startIndex, endIndex, dataStorage);
  } else {
    localStoragePagination(startIndex, endIndex, correctGenreMovieList);
  }
  loader.onClose();
}

async function localStoragePagination(start, end, data) {
  page += 1;

  totalPage = data.length / PER_PAGE;

  if (totalPage > page) {
    const pagination = data.slice(start, end);

    refs.moviesList.insertAdjacentHTML(
      'beforeend',
      await createMarkupFilmsCards(pagination)
    );
  } else {
    const pagination = data.slice(start, end);
    refs.moviesList.insertAdjacentHTML(
      'beforeend',
      await createMarkupFilmsCards(pagination)
    );

    refs.loadMoreButton.style.display = 'none';
  }
}
