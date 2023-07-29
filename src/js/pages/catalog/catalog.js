import { TMDB_API } from '../../api';
import {
  Loader,
  createMarkupMovieList,
  markupErrorMessageSearch,
} from '../../components';

//!======================================================
import Pagination from 'tui-pagination/dist/tui-pagination.min.js';
import 'tui-pagination/dist/tui-pagination.min.css';
const pagination = new Pagination(
  document.querySelector('.tui-pagination-container'),
  {
    totalItems: 1000,
    itemsPerPage: 20,
    visiblePages: 5,
    centerAlign: true,
  }
);
//!======================================================

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
  const { results, total_pages, total_results } = response;

  const catalogPaginationEl = document.querySelector('.js-catalog-pagination');

  if (results.length === 0) {
    catalogPaginationEl.innerHTML = '';
    catalogMovieList.innerHTML = markupErrorMessageSearch();
    return;
  }
  catalogMovieList.innerHTML = createMarkupMovieList(results, genresList);

  if (1 < total_pages) {
    //!======================================================
    pagination.setTotalItems(total_results > 10000 ? 10000 : total_results);
    //!======================================================
    return;
  }
  catalogPaginationEl.innerHTML = '';
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
  pagination.movePageTo(1);
}

//!======================================================
pagination.on('beforeMove', function (eventData) {
  themoviedbAPI.page = eventData.page;
  if (themoviedbAPI.query) {
    getMovieList('query-movies');
    return;
  }
  getMovieList('week-movies');
});
//!======================================================

// pagination.on('afterMove', function (eventData) {

// });
