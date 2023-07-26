import { TMDB_API } from '../api/themoviedbAPI';

import { BasicLightbox } from './basic-lightbox';
try {
  document
    .querySelectorAll('.js-open-modal-movie')
    .forEach(el => el.addEventListener('click', onMovieCardClick));
} catch (error) {
  console.log(error);
}

function onMovieCardClick(e) {
  if (e.target.dataset.movie_id) openMovieModalById(e.target.dataset.movie_id);
}

async function openMovieModalById(movieId) {
  try {
    const movie = await TMDB_API.getMovieByMovieId(movieId);

    const instance = BasicLightbox.openModal(movie);

    instance.show();
  } catch (error) {
    console.log('error:', error);
  }
}
