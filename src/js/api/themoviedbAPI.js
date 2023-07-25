import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const API_KEY = '267e0ef2e56c2254d403c0d4ffe19052';

// Трендові фільми дня та тижня
//! для хіро(1 або для слайдера5)
//!  віклі три перші фільми
const getTrendMovieByParam = async param => {
  const { data } = await axios.get(
    `trending/movie/${param}?api_key=${API_KEY}`
  );

  return data.results;
};

// Нові фільми
//! для Upcoming this months рандомний фільм
const getUpcomingFilms = () => {
  const { data } = axios.get(`movie/upcoming?api_key=${API_KEY}`);

  return data.results;
};

// Детальна інформація про фільм
//!для модалки
const getMovieByMovieId = async movieId => {
  const { data } = await axios.get(`/movie/${movieId}?api_key=${API_KEY}`);

  return data;
};

// Перелік жанрів
const getGenresList = async () => {
  const { data } = await axios.get(`genre/movie/list?api_key=${API_KEY}`);
  return data.genres;
};

// Повна інформація про можливий трейлер фільма на ютубі
const getTrailerByMovieId = movieId => {
  return axios.get(`movie/${movieId}/videos?api_key=${API_KEY}`);
};

const getMovieCastByMovieId = async movieId => {
  const response = await axios.get(
    `/movie/${movieId}/credits?api_key=${API_KEY}`
  );
  return response.data.cast;
};

const getMovieReviewsByMovieId = async movieId => {
  const response = await axios.get(
    `/movie/${movieId}/reviews?api_key=${API_KEY}`
  );
  return response.data.results;
};

const searchMovieByQuery = async (query, page) => {
  const response = await axios.get(
    `/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
  );

  return response.data;
};

export const TMDB_API = {
  getTrendMovieByParam,
  getMovieByMovieId,
  getUpcomingFilms,
  getTrailerByMovieId,
  getMovieReviewsByMovieId,
  getMovieCastByMovieId,
  searchMovieByQuery,
  getGenresList,
};

class ApiMovie {
  #API_KEY = '28909b5df6d6afd9591e6fc0c7cef11e';
  #BASE_URL = 'https://api.themoviedb.org/3/';
  #query = '';

  getTrend(param) {
    return axios.get(
      `${this.#BASE_URL}trending/movie/${param}?api_key=${this.#API_KEY}`
    );
  }

  // Трендові фільми дня та тижня за сторінкою
  getTrendByPage(param, page) {
    return axios.get(
      `${this.#BASE_URL}trending/movie/${param}?api_key=${
        this.#API_KEY
      }&page=${page}`
    );
  }

  // Нові фільми
  getNewFilms(page) {
    return axios.get(
      `${this.#BASE_URL}movie/upcoming?api_key=${this.#API_KEY}&page=${page}`
    );
  }

  // Фільми за ключовим словом + за роком
  searchByQueryYear(page) {
    return axios.get(
      `${this.#BASE_URL}search/movie?api_key=${this.#API_KEY}&query=${
        this.query
      }&page=${page}`
    );
  }

  // Детальна інформація про фільм
  getMovieInfo(id) {
    return axios.get(`${this.#BASE_URL}movie/${id}?api_key=${this.#API_KEY}`);
  }

  // Повна інформація про можливий трейлер фільма на ютубі
  getTrailer(id) {
    return axios.get(
      `${this.#BASE_URL}movie/${id}/videos?api_key=${this.#API_KEY}`
    );
  }

  // Перелік жанрів
  getGenresList() {
    return axios.get(
      `${this.#BASE_URL}genre/movie/list?api_key=${this.#API_KEY}`
    );
  }

  get query() {
    return this.#query;
  }

  set query(newQuery) {
    this.#query = newQuery;
  }
}
