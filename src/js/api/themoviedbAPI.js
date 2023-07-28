import { randomElementOfArray } from '../helpers/random-element';

import axios from 'axios';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export class TMDB_API {
  #API_KEY = '267e0ef2e56c2254d403c0d4ffe19052';

  #query = '';
  #page = 1;
  #year = null;

  // Пошук фільму за запитом і роком
  async searchMovieByQuery() {
    const options = {
      method: 'GET',
      url: '/search/movie',
      params: this.#year
        ? {
            api_key: this.#API_KEY,
            query: this.#query,
            page: this.#page,
            year: this.#year,
          }
        : { api_key: this.#API_KEY, query: this.#query, page: this.#page },
    };
    const { data } = await axios.request(options);

    return data;
  }

  // Трендові фільми дня та тижня
  async getTrendMovieByParam(param) {
    const options = {
      method: 'GET',
      url: `/trending/movie/${param}`,
      params: { api_key: this.#API_KEY, page: this.#page },
    };

    const { data } = await axios.request(options);

    return data;
  }

  // Нові фільми
  async getUpcomingFilms() {
    const options = {
      method: 'GET',
      url: `/movie/upcoming`,
      params: { api_key: this.#API_KEY },
    };

    const { data } = await axios.request(options);
    return data;
  }

  // Нові фільми (один довільний фільм)
  async randomUpcomingFilms() {
    const { results } = await this.getUpcomingFilms();
    const { id } = randomElementOfArray(results);
    const movie = await this.getMovieByMovieId(id);
    return movie;
  }

  // Детальна інформація про фільм
  async getMovieByMovieId(movieId) {
    const options = {
      method: 'GET',
      url: `/movie/${movieId}`,
      params: { api_key: this.#API_KEY },
    };

    const { data } = await axios.request(options);

    return data;
  }

  // Повна інформація про можливий трейлер фільма на ютубі
  async getTrailerByMovieId(movieId) {
    const options = {
      method: 'GET',
      url: `movie/${movieId}/videos`,
      params: { api_key: this.#API_KEY },
    };

    const { data } = await axios.request(options);

    return data.results;
  }

  // Перелік жанрів
  async getGenresList() {
    const options = {
      method: 'GET',
      url: 'genre/movie/list',
      params: { api_key: this.#API_KEY },
    };

    const { data } = await axios.request(options);

    return data.genres;
  }

  get query() {
    return this.#query;
  }
  set query(query) {
    this.#query = query.trim();
  }

  get page() {
    return this.#page;
  }
  set page(page) {
    this.#page = page;
  }

  get year() {
    return this.#year;
  }
  set year(year) {
    this.#year = year;
  }
}

// Трендові фільми дня та тижня

// const getTrendMovieByParam = async (param, page = 1) => {
//   const options = {
//     method: 'GET',
//     url: `/trending/movie/${param}`,
//     params: { api_key: API_KEY, page },
//   };

//   const { data } = await axios.request(options);

//   return data;
// };

// Нові фільми
// const getUpcomingFilms = async () => {
//   const options = {
//     method: 'GET',
//     url: `/movie/upcoming`,
//     params: { api_key: API_KEY },
//   };

//   const { data } = await axios.request(options);

//   const randomMovie = randomElementOfArray(data.results);

//   return getMovieByMovieId(randomMovie.id);
// };

// Детальна інформація про фільм

// const getMovieByMovieId = async movieId => {
//   const options = {
//     method: 'GET',
//     url: `/movie/${movieId}`,
//     params: { api_key: API_KEY },
//   };

//   const { data } = await axios.request(options);

//   return data;
// };

// Перелік жанрів
// const getGenresList = async () => {
//   const options = {
//     method: 'GET',
//     url: 'genre/movie/list',
//     params: { api_key: API_KEY },
//   };

//   const { data } = await axios.request(options);

//   return data.genres;
// };

// Повна інформація про можливий трейлер фільма на ютубі
// const getTrailerByMovieId = async movieId => {
//   const options = {
//     method: 'GET',
//     url: `movie/${movieId}/videos`,
//     params: { api_key: API_KEY },
//   };

//   const { data } = await axios.request(options);

//   return data.results;
// };

// const searchMovieByQuery = async (query, page = 1, year) => {
//   const options = {
//     method: 'GET',
//     url: '/search/movie',
//     params: year
//       ? { api_key: API_KEY, query, page, year }
//       : { api_key: API_KEY, query, page },
//   };

//   const { data } = await axios.request(options);

//   return data;
// };

// const getMovieCastByMovieId = async movieId => {
//   const options = {
//     method: 'GET',
//     url: `/movie/${movieId}/credits`,
//     params: { api_key: API_KEY },
//   };

//   const { data } = await axios.request(options);

//   return data.cast;
// };

// const getMovieReviewsByMovieId = async movieId => {
//   const options = {
//     method: 'GET',
//     url: `/movie/${movieId}/reviews`,
//     params: { api_key: API_KEY },
//   };

//   const { data } = await axios.request(options);

//   return data.results;
// };

// export const TMDB_API = {
//   getTrendMovieByParam,
//   getMovieByMovieId,
//   getUpcomingFilms,
//   getTrailerByMovieId,
//   getMovieReviewsByMovieId,
//   getMovieCastByMovieId,
//   searchMovieByQuery,
//   getGenresList,
// };
