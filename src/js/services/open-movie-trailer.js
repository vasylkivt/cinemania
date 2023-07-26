// import { TMDB_API } from '../api/themoviedbAPI';

// import { BasicLightbox } from './basic-lightbox';

// // try {
// //   document
// //     .querySelectorAll('.js-button-show-trailer')
// //     .forEach(el => el.addEventListener('click', onMovieCardClick));
// // } catch (error) {
// //   console.log(error);
// // }

// function onOpenTrailerBtnClick(e) {
//   if (e.target.dataset.movie_id) getTrailerByMovieId(e.target.dataset.movie_id);
// }

// async function getTrailerByMovieId(movieId) {
//   try {
//     const movie = await TMDB_API.getMovieByMovieId(movieId);

//     const instance = BasicLightbox.openModal(movie);

//     instance.show();
//   } catch (error) {
//     console.log('error:', error);
//   }
// }
