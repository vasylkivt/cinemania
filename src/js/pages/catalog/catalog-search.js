import ApiMovie from '../../api/themoviedbAPI/fetch-movie';
import { refs } from './catalog-refs';
import { SelectService } from '../../components/select';
import { pagination, updateBtnNames } from './pagination';
import { createMarkupFilmsCards } from '../../components/createMarkupFilmCard';
import { Loader } from '../../loader';

const apiMovie = new ApiMovie();
const loader = new Loader();

const {
  searchForm,
  searchInput,
  searchSelect,
  searchGallery,
  clearButton,
  jsPagination,
  mobileInput,
} = refs;

const selectService = new SelectService(
  '.catalog-select-years',
  createYearList()
);
//
selectService.addEventListenerSelect();

let currentYear = 'Year';
let page;

searchForm.addEventListener('submit', handleFormSubmit);
clearButton.addEventListener('click', handleClearButtonClick);
searchInput.addEventListener('input', handleInputChange);
searchInput.addEventListener('keydown', handleInputChange);
searchSelect.addEventListener('change', handleYearSelectChange);

getTrend();

clearButton.style.display = 'none';

function handleInputChange(event) {
  // Перевірка, чи пошукова строка пуста
  if (searchInput.value !== '') {
    clearButton.style.display = 'block';
  } else {
    clearButton.style.display = 'none';
  }

  if (event.key === 'Enter') {
    handleFormSubmit(event);
  }
}

// Оновлення вмісту галереї фільмів
async function getTrend() {
  loader.onShow();
  try {
    const response = await apiMovie.getTrend('week');
    const movies = response.data.results;
    const totalMovies = response.data.total_results;
    const pageCount = response.data.total_pages;

    jsPagination.style.display = 'flex';

    pagination.reset(totalMovies / 2);

    updateBtnNames(pageCount);

    updateGallery(movies);

    // Отримання років для селекта
    getYears();
  } catch (error) {
    console.log(error);
  }
  loader.onClose();
}

// Пошук фільмів за ключовим словом та роком
async function handleFormSubmit(event) {
  event.preventDefault();

  const query = searchInput.value.trim();

  page = 1;
  currentYear = null;

  if (query === '' && !currentYear) {
    // getTrend();
    searchGallery.innerHTML =
      '<p class="catalog-message"><span>OOPS...</span><span>We are very sorry!</span><span>We don’t have any results matching your search.</span></p>';

    jsPagination.style.display = 'none';
    return;
  }

  loader.onShow();

  if (query || currentYear) {
    apiMovie.query = query;
    try {
      handleYearSelectChange();

      const response = await apiMovie.searchByQueryYear(page);
      let movie = response.data.results;
      const totalMovies = response.data.total_results;

      const pageCount = response.data.total_pages;
      if (currentYear) {
        movie = response.data.results.filter(
          movie =>
            movie.release_date && movie.release_date.includes(currentYear)
        );
      }

      if (pageCount < 1) {
        jsPagination.style.display = 'none';
      } else {
        jsPagination.style.display = 'flex';
        pagination.reset(totalMovies);
        updateBtnNames(pageCount);
      }

      updateGallery(movie);
    } catch (error) {
      console.log(error);
      searchGallery.innerHTML =
        '<p class="catalog-message"><span>OOPS...</span><span>We are very sorry!</span><span>We don’t have any results matching your search.</span></p>';

      jsPagination.style.display = 'none';
    }
  }

  // apiMovie.query = query;
  // apiMovie.year = currentYear;

  // try {
  //   const response = await apiMovie.searchByQueryYear(page);
  //   const movies = response.data.results;
  //   updateGallery(movies);
  // } catch (error) {
  //   console.log(error);
  // }
  loader.onClose();
}

// Пошук фільмів за вибраним роком
// async function searchMovies() {
//   const query = searchInput.value.trim();
//   page = 1;

//   apiMovie.query = query;
//   apiMovie.year = currentYear;

//   try {
//     const response = await apiMovie.searchByQueryYear(page);
//     const movies = response.data.results;
//     updateGallery(movies);
//   } catch (error) {
//     console.log(error);
//   }
// }

// Оновлення вмісту галереї фільмів
async function updateGallery(movies) {
  searchGallery.innerHTML = '';

  if (movies.length === 0) {
    searchGallery.innerHTML =
      '<p class="catalog-message"><span>OOPS...</span><span>We are very sorry!</span><span>We don’t have any results matching your search.</span></p >';

    jsPagination.style.display = 'none';
  } else if (movies.length < 20) {
    jsPagination.style.display = 'none';
    searchGallery.innerHTML = await createMarkupFilmsCards(movies);
  } else {
    searchGallery.innerHTML = await createMarkupFilmsCards(movies);
  }
}

//.......КНОПКА-Х
// Очищення пошукового поля
function handleClearButtonClick(event) {
  event.preventDefault();
  searchInput.value = '';

  // Перевірка, чи пошукова строка пуста
  if (searchInput.value === '') {
    clearButton.style.display = 'none';
  } else {
    clearButton.style.display = 'block';
  }
}

// searchByQueryYear(2, 2001);

async function searchByQueryYear(page, year) {
  if (arguments.length < 2) {
    try {
      const response = await apiMovie.searchByQueryYear(page);

      return response;
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const response = await apiMovie.searchByQueryYear(page);

      const filteredResults = response.data.results.filter(
        movie => movie.release_date && movie.release_date.includes(year)
      );
      return filteredResults;
    } catch (error) {
      console.log(error);
    }
  }
}

// async function searchByQueryYear(year, query) {
//   try {
//     const response = await apiMovie.searchByQueryYear(query);
//     console.log(`Пошук результата:`, response);
//     const filteredResults = response.data.results.filter(
//       movie => movie.release_date && movie.release_date.includes(year)
//     );
//     return filteredResults;
//   } catch (error) {
//     console.log('Error:', error);
//   }
// }

//.......СЕЛЕКТ
// Обробник події change селекта року
function handleYearSelectChange() {
  currentYear = Number(searchSelect.value);

  // const newYear = searchSelect.value;
  // console.log('newYear:', newYear);

  // if (newYear !== currentYear) {
  //   currentYear = newYear;

  //   if (currentYear) {
  //     searchMovies();
  //   } else {
  //     getTrend();
  //   }
  // }
}

// Ініціалізація SlimSelect зі списком років
const slim = new SlimSelect({
  select: searchSelect,
  data: createYearList(),
  showSearch: false,
  searchPlaceholder: ' ',
});

// Створення списку останніх 50 років
function createYearList() {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 50;
  const yearList = [{ value: '', text: 'Year' }];

  for (let year = currentYear; year >= startYear; year--) {
    yearList.push({ value: year.toString(), text: year.toString() });
  }

  return yearList;
}

console.log(createYearList());

// Отримання списку років
function getYears() {
  const yearList = createYearList();
  slim.setData(yearList);
}

// Викликати функцію для отримання списку років при завантаженні сторінки
getYears();

// searchSelect.addEventListener('change', handleYearSelectChange);

// Пагінація

pagination.on('afterMove', handlerPagination);

async function handlerPagination(event) {
  const currentPage = event.page;
  const query = searchInput.value.trim();

  if (query || currentYear) {
    paginationByQuery(currentPage);
  } else {
    paginationByTrend(currentPage);
  }
}

async function paginationByQuery(page) {
  try {
    const response = await apiMovie.searchByQueryYear(page);
    const movies = response.data.results;
    const pageCount = response.data.total_pages;

    updateBtnNames(pageCount);

    const firstButton = document.querySelector('.tui-first');
    if (page < 3) {
      firstButton.classList.add('tui-is-disabled');
    } else {
      firstButton.classList.remove('tui-is-disabled');
    }

    const lastButton = document.querySelector('.tui-last');
    if (page > pageCount - 2) {
      lastButton.classList.add('tui-is-disabled');
    } else {
      lastButton.classList.remove('tui-is-disabled');
    }

    updateGallery(movies);
  } catch (error) {
    console.log(error);
  }
}

async function paginationByTrend(page) {
  try {
    const response = await apiMovie.getTrendByPage('week', page);
    const movies = response.data.results;
    const pageCount = response.data.total_pages;

    updateBtnNames(pageCount);

    const firstButton = document.querySelector('.tui-first');
    if (page < 3) {
      firstButton.classList.add('tui-is-disabled');
    } else {
      firstButton.classList.remove('tui-is-disabled');
    }

    const lastButton = document.querySelector('.tui-last');
    if (page > 500 - 2) {
      lastButton.classList.add('tui-is-disabled');
    } else {
      lastButton.classList.remove('tui-is-disabled');
    }

    updateGallery(movies);
  } catch (error) {
    console.log(error);
  }
}
