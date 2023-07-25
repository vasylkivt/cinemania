import { TMDB_API } from '../../api/themoviedbAPI';
import { Loader } from '../../components/loader';

import { createMarkupMovieList } from '../../components/movie-list';

const getTrendMovieOfWeek = async () => {
  try {
    Loader.onShow();
    const response = await TMDB_API.getTrendMovieByParam('week');

    const correctList = response.slice(0, 3);

    document.querySelector('.home-weekly-trends-movie-list').innerHTML =
      await createMarkupMovieList(correctList);
  } catch (error) {
    console.log('Error:', error);
  }
  Loader.onClose();
};

getTrendMovieOfWeek();
