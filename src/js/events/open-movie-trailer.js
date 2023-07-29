import { TMDB_API, BasicLightbox } from '../api';
import { markupErrorMessageTrailer } from '../components';

const themoviedbAPI = new TMDB_API();

export const addEventListenerByOpenTrailer = () => {
  try {
    document
      .querySelectorAll('.js-button-show-trailer')
      .forEach(el => el.addEventListener('click', onOpenTrailerBtnClick));
  } catch (error) {
    console.log(error);
  }
};
function onOpenTrailerBtnClick(e) {
  if (e.currentTarget.dataset.movie_id_for_trailer)
    getTrailerByMovieId(e.currentTarget.dataset.movie_id_for_trailer);
}

async function getTrailerByMovieId(movieId) {
  try {
    const trailers = await themoviedbAPI.getTrailerByMovieId(movieId);

    if (trailers && trailers.length === 0) {
      const instance = BasicLightbox.errorMessage(markupErrorMessageTrailer());

      instance.show();
      return;
    }

    const trailer = trailers.find(
      el => el.type === 'Trailer' || el.name === 'Official Trailer'
    );

    const instance = BasicLightbox.showTrailer(trailer);

    instance.show();
  } catch (error) {
    console.log('error:', error);
    const instance = BasicLightbox.errorMessage(markupErrorMessageTrailer());

    instance.show();
  }
}
