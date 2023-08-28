import Storage from '../../services/local-storage';
import { STORAGE_KEY } from '../../events/add-remove-movie';
import { refs } from './refs';
import { markupContentTextMessage } from './markupContentTextMessage';

import { TMDB_API } from '../../api';
import { Loader, createMarkupMovieList } from '../../components';

const themoviedbAPI = new TMDB_API();

// const PER_PAGE = 6;

// const isVisibleBtnLoadMore =
//   isVisibleMovieList && dataStorage?.length > PER_PAGE;

renderContentBasedOnConditions();

//? слухач на кнопку (додавання видалення з локального сховища) для динамічного обновлення списку фільмів
document.addEventListener('click', e => {
  if (e.target.classList.contains('js-add-remove-btn'))
    renderContentBasedOnConditions();
});

function renderContentBasedOnConditions() {
  refs.moviesList.innerHTML = '';
  refs.contentMessage.innerHTML = '';
  const dataStorage = Storage.load(STORAGE_KEY.myLibraryMoviesList);
  const isVisibleMovieList = Boolean(dataStorage && dataStorage?.length !== 0);

  if (isVisibleMovieList) {
    renderMovieList(dataStorage);
  } else {
    refs.contentMessage.innerHTML = markupContentTextMessage();
  }
}

async function renderMovieList(dataStorage) {
  // if (isVisibleBtnLoadMore) {
  //   refs.loadMore.innerHTML = markupBtnLoadMore();
  // }

  try {
    Loader.onShow();
    const genresList = await themoviedbAPI.getGenresList();
    refs.moviesList.insertAdjacentHTML(
      'beforeend',
      createMarkupMovieList(dataStorage, genresList)
    );
  } catch (error) {
    console.log('Error:', error);
  }
  Loader.onClose();
}
