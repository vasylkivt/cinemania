import { BasicLightbox, PagePagination, TMDB_API } from '../../api';
import {
  Loader,
  createMarkupMovieList,
  markupErrorMessageSearch,
  markupGoToPage,
} from '../../components';

const themoviedbAPI = new TMDB_API();

const catalogMovieList = document.querySelector('.js-catalog-movie-list');
const formButtonClose = document.querySelector(
  '.js-catalog-search-form-button-close'
);

const catalogPaginationEl = document.querySelector(
  '.js-catalog-pagination-btn-wrap'
);
const catalogLoadMoreBtn = document.querySelector('.js-catalog-load-more');

//!===================================================
const pagination = new PagePagination({
  element: catalogPaginationEl,
  elementLoadMoreBtn: catalogLoadMoreBtn,
  showNavigationBtn: true,
});

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
pagination.onPagination(param => {
  onPaginationClick(param.page);
});

pagination.onLoadMore(param => {
  onLoadMoreClick(param.page);
});

pagination.onMoveToPage(() => {
  BasicLightbox.modalMoveToPage(markupGoToPage(), onPaginationClick).show();
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
  if (page > pagination.totalPage) {
    return;
  }
  catalogMovieList.innerHTML = '';
  pagination.page = page;

  if (themoviedbAPI.query) {
    themoviedbAPI.page = page;
    getMovieList('query-movies');
  } else {
    themoviedbAPI.page = page;

    getMovieList('week-movies');
  }
}
