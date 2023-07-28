import { TMDB_API, TMDB_APIi } from '../../api/themoviedbAPI';
import { markupBtnLoadMore } from '../../components/button-load-more';
import { markupErrorMessageSearch } from '../../components/error-message-search';
import { Loader } from '../../components/loader';
import { markupPagination } from '../../components/markup-pagimation';
import { createMarkupMovieList } from '../../components/movie-list';

const themoviedbAPI = new TMDB_API();

const catalogMovieList = document.querySelector('.js-catalog-movie-list');
const formButtonClose = document.querySelector(
  '.js-catalog-search-form-button-close'
);

getMovieList('week-movies');

async function getMovieList(action) {
  try {
    Loader.onShow();

    if (action === 'week-movies') {
      const response = await themoviedbAPI.getTrendMovieByParam('week');
      const genresList = await themoviedbAPI.getGenresList();
      updateGallery(response, genresList);
    } else if (action === 'query-movies') {
      const response = await themoviedbAPI.searchMovieByQuery();
      const genresList = await themoviedbAPI.getGenresList();
      updateGallery(response, genresList);
    }
  } catch (error) {
    console.log('Error:', error);
  }
  Loader.onClose();
}

const updateGallery = (response, genresList) => {
  const { results, page: currentPage, total_pages, total_results } = response;

  const catalogPaginationEl = document.querySelector('.js-catalog-pagination');

  if (results.length === 0) {
    catalogPaginationEl.innerHTML = '';
    catalogMovieList.innerHTML = markupErrorMessageSearch();
    return;
  }

  if (currentPage < total_pages) {
    catalogPaginationEl.innerHTML = markupBtnLoadMore() + markupPagination();
    document
      .querySelector('.js-load-more')
      .addEventListener('click', handlerLoadMoreClick);
  } else {
    catalogPaginationEl.innerHTML = '';
  }

  if (themoviedbAPI.page === 1) catalogMovieList.innerHTML = '';

  catalogMovieList.insertAdjacentHTML(
    'beforeend',
    createMarkupMovieList(results, genresList)
  );
};

const formEl = document.querySelector('.js-catalog-search-form');
const { query, queryText, select } = formEl.elements;

query.addEventListener('input', () => {
  formButtonClose.classList.remove('is-hidden');
  queryText.placeholder = query.value;
  if (query.value === '') formButtonClose.classList.add('is-hidden');
});

formButtonClose.addEventListener('click', () => {
  formButtonClose.classList.add('is-hidden');
  query.value = '';
  queryText.placeholder = 'Film';
});

formEl.addEventListener('submit', handlerSubmit);

function handlerSubmit(e) {
  e.preventDefault();
  themoviedbAPI.page = 1;

  if (
    themoviedbAPI.query === query.value &&
    themoviedbAPI.year === select.value
  )
    return;

  if (query.value.trim() === '') return;
  if (select.value !== '') themoviedbAPI.year = select.value;

  themoviedbAPI.query = query.value;

  getMovieList('query-movies');
}

function handlerLoadMoreClick() {
  themoviedbAPI.page += 1;
  if (themoviedbAPI.query === '') {
    getMovieList('week-movies');
  } else {
    getMovieList('query-movies');
  }
}
