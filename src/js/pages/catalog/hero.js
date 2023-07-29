import defaultImg from '../../../images/default_horizontal_poster_path.jpg';
import 'swiper/swiper-bundle.min.css';
import Swiper from 'swiper/swiper-bundle.min.mjs';

import { ratingStarsMarkup, Loader } from '../../components';
import { TMDB_API } from '../../api';
import { addEventListenerByOpenTrailer } from '../../events/open-movie-trailer';

const themoviedbAPI = new TMDB_API();

const getTrendMovieOfDay = async () => {
  try {
    Loader.onShow();
    const { results } = await themoviedbAPI.getTrendMovieByParam('day');
    const correctList = results.slice(0, 5);

    document.querySelector('.js-hero-wrapper').innerHTML =
      createMarkupMovieList(correctList);
    addEventListenerByOpenTrailer();

    new Swiper('.js-hero-wrapper', swiperOption);
  } catch (error) {
    console.log('error:', error);
  }
  Loader.onClose();
};

getTrendMovieOfDay();

const swiperOption = {
  effect: 'cube',
  loop: true,
  keyboard: {
    enabled: true,
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  on: {
    autoplayTimeLeft(s, time, progress) {
      document
        .querySelector('.autoplay-progress svg')
        .style.setProperty('--progress', 1 - progress);
      document.querySelector(
        '.autoplay-progress span'
      ).textContent = `${Math.ceil(time / 1000)}s`;
    },
  },
  grabCursor: true,
  cubeEffect: {
    shadow: true,
    slideShadows: true,
    shadowOffset: 20,
    shadowScale: 0.94,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
};

function createMarkupMovieList(movies) {
  return ` 

      <div class="swiper-wrapper">
        ${movies.map(movie => createMarkupMovieItem(movie)).join('')}
      </div>
      <div class="swiper-pagination"></div>
      <div class="autoplay-progress">
      <svg viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="20"></circle>
      </svg>
      <span></span>
    </div>
    `;
}

function createMarkupMovieItem({
  id,
  backdrop_path,
  original_title,
  overview,
  vote_average,
}) {
  return `
    <div class="swiper-slide">
        <img class="hero-background-img
        ${getBgImg(backdrop_path, backdrop_path, original_title)}/>
      
      <div class="container">
        <div class="hero-text-wrap">
          <h1 class=" hero-title">${original_title}</h1>
          <div class="hero-movie-rating">
            ${ratingStarsMarkup(vote_average * 10)}
          </div>
          <p class=" hero-text">${overview}</p>
        </div>

        <div class="hero-button-wrap">
        <button data-movie_id_for_trailer=${id}
            type="button" class="js-button-show-trailer button-accent">
              Watch trailer
          </button>
          <button data-movie_id_for_modal=${id}
            type="button" class="button-light-theme">
              More details
          </button>
        </div>

      </div>
    </div>`;
}

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
