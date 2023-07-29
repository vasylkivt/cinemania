import { TMDB_API, BasicLightbox } from '../api';

const themoviedbAPI = new TMDB_API();

import { addEventListenerByOpenTrailer } from './open-movie-trailer';

try {
  document
    .querySelectorAll('.js-open-modal-movie')
    .forEach(el => el.addEventListener('click', onMovieCardClick));
} catch (error) {
  console.log(error);
}

function onMovieCardClick(e) {
  if (e.target.dataset.movie_id_for_modal)
    openMovieModalById(e.target.dataset.movie_id_for_modal);
}

async function openMovieModalById(movieId) {
  try {
    const movie = await themoviedbAPI.getMovieByMovieId(movieId);

    const instance = BasicLightbox.openModal(movie);

    instance.show();
    addEventListenerByOpenTrailer();
  } catch (error) {
    console.log('error:', error);
  }
}
