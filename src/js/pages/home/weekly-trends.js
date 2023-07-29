import { TMDB_API } from '../../api/';
import { Loader } from '../../components';

import { createMarkupMovieList } from '../../components';

const themoviedbAPI = new TMDB_API();

const getTrendMovieOfWeek = async () => {
  try {
    Loader.onShow();
    const { results } = await themoviedbAPI.getTrendMovieByParam('week');
    const genresList = await themoviedbAPI.getGenresList();
    const correctList = results.slice(0, 3);

    document.querySelector('.js-home-weekly-trends-movie-list').innerHTML =
      createMarkupMovieList(correctList, genresList);
  } catch (error) {
    console.log('Error:', error);
  }
  Loader.onClose();
};

getTrendMovieOfWeek();
