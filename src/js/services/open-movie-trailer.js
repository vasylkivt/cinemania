import { TMDB_API } from '../api/themoviedbAPI';

import { BasicLightbox } from './basic-lightbox';

export const openTrailer = () => {
  try {
    document
      .querySelector('.js-button-show-trailer')
      .addEventListener('click', onOpenTrailerBtnClick);
  } catch (error) {
    console.log(error);
  }
};

function onOpenTrailerBtnClick(e) {
  console.log();

  if (e.currentTarget.dataset.movie_id)
    getTrailerByMovieId(e.currentTarget.dataset.movie_id);
}

async function getTrailerByMovieId(movieId) {
  try {
    const trailers = await TMDB_API.getTrailerByMovieId(movieId);

    const trailer = trailers.find(
      el => el.type === 'Trailer' || el.name === 'Official Trailer'
    );

    const instance = BasicLightbox.showTrailer(trailer);

    instance.show();
  } catch (error) {
    console.log('error:', error);
  }
}
