import comingSoonImg from '../../images/default_horizontal_poster_path.jpg';
import svgCloseIcon from '../../images/icon/sprite.svg';

export const markupModalMovieCard = ({
  id,
  poster_path,
  original_title,
  vote_average,
  vote_count,
  popularity,
  genres,
  overview,
}) => {
  return `
  
  <div class=" modal-movie-card-wrap"> 
  <div>
    <button type="button" class="js-close-modal-btn modal-movie-card-button-close">
      <svg class="modal-movie-card-button-close-icon">
        <use href="${svgCloseIcon}#icon-button-close"></use>
      </svg>
    </button>
    <div  class="modal-movie-card-inner-wrap">
    <div  class="modal-movie-card-inner">
     <button class="js-button-show-trailer" data-movie_id="${id}" type="button">
        <svg class=" modal-movie-card-button-close-icon">
          <use href="${svgCloseIcon}#icon-play"></use>
        </svg>
     </button>
      </div>
      <img
        class="modal-movie-card-img"
        loading="lazy"
        width="280"
        height="402"
        ${getImg(poster_path, original_title)}
      />
    </div>
  </div>
  <div>
    <h3 class="modal-movie-card-title">${original_title}</h3>
    <div class="modal-movie-card-details-wrapper">
      <p class="modal-movie-card-details-names">Vote / Votes</p>
      <p class="modal-movie-card-detail-vote">
        <span>${vote_average.toFixed(1)}</span> / <span>${vote_count}</span>
      </p>
      <p class="modal-movie-card-details-names">Popularity</p>
      <p class="modal-movie-card-detail-popularity">${popularity}</p>
      <p class="modal-movie-card-details-names">Genre</p>
      <p class="modal-movie-card-detail-genre">${allGenres(genres)}</p>
    </div>
    <p class="modal-movie-card-desc-title">About</p>
    <p class="modal-movie-card-desc">${overview}</p>

    <button type="button" class="js-add-remove-btn button-accent">
      Add to my library
    </button>
  </div>
</div>
  `;
};

function allGenres(genres) {
  return genres.map(({ name }) => name).join(', ');
}

function getImg(poster, title) {
  if (poster === null || !poster) {
    return `src='${comingSoonImg}' alt='${title}'`;
  }

  return ` srcset="
          https://image.tmdb.org/t/p/w1280${poster} 1280w,
          https://image.tmdb.org/t/p/w342${poster}  280w
        "
        src="https://image.tmdb.org/t/p/original${poster}"
        sizes=" (min-width: 768px) 704px, (min-width: 320px) 280px, 100vw"
        alt="${title}"`;
}
