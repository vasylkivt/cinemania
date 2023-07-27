import { ratingStarsMarkup } from '../../components/rating-stars';
import defaultImg from '../../../images/default_horizontal_poster_path.jpg';
import { Loader } from '../../components/loader';
import { TMDB_API } from '../../api/themoviedbAPI';
import { addEventListenerByOpenTrailer } from '../../services/open-movie-trailer';

import Swiper from 'swiper';
import '~/node_modules/swiper/swiper-bundle.min.css';

const getTrendMovieOfDay = async () => {
  try {
    Loader.onShow();
    const response = await TMDB_API.getTrendMovieByParam('day');
    const correctList = response.slice(0, 5);

    document.querySelector('.js-hero-wrapper').innerHTML =
      createMarkupMovieList(correctList);
    addEventListenerByOpenTrailer();
    new Swiper('.hero-swiper', {
      scrollbar: {
        el: '.swiper-scrollbar',
        hide: true,
      },
    });
  } catch (error) {
    console.log('error:', error);
  }
  Loader.onClose();
};

getTrendMovieOfDay();

const createMarkupMovieList = movies => `
    <div class="swiper hero-swiper ">
      <div class="swiper-wrapper">
        ${movies.map(movie => createMarkupMovieItem(movie)).join('')}
      </div>
      <div class="swiper-scrollbar"></div>
    </div>`;

const createMarkupMovieItem = ({
  id,
  backdrop_path,
  original_title,
  overview,
  vote_average,
}) => `
    <div class="swiper-slide">

        <img class="hero-background-img
        ${getBgImg(backdrop_path, backdrop_path, original_title)}/>
      
      <div class="container">
        <h1 class=" hero-title">${original_title}</h1>
        <div class="hero-movie-rating">
          ${ratingStarsMarkup(vote_average * 10)}
        </div>
        <p class=" hero-text">${overview}</p>

        <div class="hero-button-wrap">
          <button data-movie_id_for_modal=${id}
            type="button" class="button-accent">
              Get Open Modal
          </button>
          <button data-movie_id_for_trailer=${id}
            type="button" class="js-button-show-trailer button-accent">
              Get Open Trailer
          </button>
        </div>

      </div>
    </div>`;

function getBgImg(backdropPoster, title) {
  if (backdropPoster === null || !backdropPoster) {
    return `src='${defaultImg}' alt='${title}'`;
  }

  return ` srcset="
          https://image.tmdb.org/t/p/w1280${backdropPoster} 1280w,
          https://image.tmdb.org/t/p/w780${backdropPoster}  280w
        "
        src="https://image.tmdb.org/t/p/original${backdropPoster}"
        sizes=" (min-width: 768px) 704px, (min-width: 320px) 280px, 100vw"
        alt="${title}"`;
}
