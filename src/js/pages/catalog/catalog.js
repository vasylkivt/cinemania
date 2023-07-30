import { PagePagination, TMDB_API } from '../../api';
import {
  Loader,
  createMarkupMovieList,
  markupErrorMessageSearch,
} from '../../components';

const themoviedbAPI = new TMDB_API();

const catalogMovieList = document.querySelector('.js-catalog-movie-list');
const formButtonClose = document.querySelector(
  '.js-catalog-search-form-button-close'
);
const catalogPaginationEl = document.querySelector('.js-catalog-pagination');
//!===================================================
const pagination = new PagePagination(
  document.querySelector('.js-catalog-pagination-btn-wrap'),
  document.querySelector('.js-catalog-load-more')
);
//!===================================================

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

  //!===================================================
  pagination.setTotalPage(total_pages > 500 ? 500 : total_pages);
  //!===================================================

  if (results.length === 0) {
    catalogMovieList.innerHTML = markupErrorMessageSearch();
    return;
  }
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
  //!===================================================
  pagination.reset();
  //!===================================================
  catalogMovieList.innerHTML = '';
  getMovieList('query-movies');
}

//!===================================================
pagination.on(page => {
  onPaginationClick(page);
});

pagination.onLoadMore(page => {
  onLoadMoreClick(page);
});
//!===================================================

function onLoadMoreClick(page) {
  if (themoviedbAPI.query) {
    themoviedbAPI.page = page;
    getMovieList('query-movies');
  } else {
    themoviedbAPI.page = page;

    getMovieList('week-movies');
  }
}
function onPaginationClick(page) {
  catalogMovieList.innerHTML = '';
  if (themoviedbAPI.query) {
    themoviedbAPI.page = page;
    getMovieList('query-movies');
  } else {
    themoviedbAPI.page = page;

    getMovieList('week-movies');
  }
}
