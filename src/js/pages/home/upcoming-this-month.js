import { TMDB_API } from '../../api/themoviedbAPI';
import comingSoonImg from '../../../images/default-image-for-movie.webp';
import defaultImg from '../../../images/default_horizontal_poster_path.jpg';
import { ServiceAddRemoveBtn } from '../../services/add-remove-movie';

getNewFilms();

async function getNewFilms() {
  try {
    const movie = await TMDB_API.getUpcomingFilms();

    document.querySelector('.home-upcoming-this-month-wrapper').innerHTML =
      createUpcomingMovieMarkup(movie);

    const addRemoveBtn = document.querySelector('.js-add-remove-btn');
    const serviceAddRemoveBtn = new ServiceAddRemoveBtn(addRemoveBtn, movie);
    serviceAddRemoveBtn.setButtonName();
  } catch (error) {
    console.log(error);
  }
}

function createUpcomingMovieMarkup({
  backdrop_path,
  original_title,
  release_date,
  vote_average,
  vote_count,
  popularity,
  genres,
  overview,
  poster_path,
}) {
  return `
    <img
        class="home-upcoming-this-month-img"
        loading="lazy"
        width="280"
        height="402"
        ${getImg(poster_path, backdrop_path, original_title)}
      />

      <div>
        <h3 class="home-upcoming-movie-title">${original_title}</h3>
        <div class="home-upcoming-movie-details-wrapper">
          <p class="home-upcoming-movie-details-names">Release date</p>
          <p class="home-upcoming-movie-detail-date">${release_date}</p>
          <p class="home-upcoming-movie-details-names">Vote / Votes</p>
          <p class="home-upcoming-movie-detail-vote">
            <span>${vote_average.toFixed(1)}</span> / <span>${vote_count}</span>
          </p>
          <p class="home-upcoming-movie-details-names">Popularity</p>
          <p class="home-upcoming-movie-detail-popularity">${popularity}</p>
          <p class="home-upcoming-movie-details-names">Genre</p>
          <p class="home-upcoming-movie-detail-genre">${allGenres(genres)}
          </p>
        </div>
        <p class="home-upcoming-movie-desc-title">About</p>
        <p class="home-upcoming-movie-desc">
          ${overview}
        </p>

        <button class="js-add-remove-btn button-accent">Add to my library</button>
      </div>`;
}

function allGenres(genres) {
  return genres.map(({ name }) => name).join(', ');
}

function getImg(poster, backdropPoster, title) {
  if (poster === null || !poster) {
    return `src='${comingSoonImg}' alt='${title}'`;
  }
  if (backdropPoster === null || !backdropPoster) {
    return `src='${defaultImg}' alt='${title}'`;
  }

  return ` srcset="
          https://image.tmdb.org/t/p/w1280${backdropPoster} 1280w,
          https://image.tmdb.org/t/p/w342${poster}  280w
        "
        src="https://image.tmdb.org/t/p/original${poster}"
        sizes=" (min-width: 768px) 704px, (min-width: 320px) 280px, 100vw"
        alt="${title}"`;
}
