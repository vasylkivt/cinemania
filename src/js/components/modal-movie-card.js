import comingSoonImg from '../../images/default_horizontal_poster_path.jpg';

const svgCloseIcon = `<svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path class="svg-close-icon" d="M11.25 11.25L0.75 0.75M11.25 0.75L0.75 11.25" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

export const markupModalMovieCard = ({
  poster_path,
  original_title,
  vote_average,
  vote_count,
  popularity,
  genres,
  overview,
}) => {
  return `
    <img
        class="modal-movie-card-img"
        loading="lazy"
        width="280"
        height="402"
        ${getImg(poster_path, original_title)}
      />

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
          <p class="modal-movie-card-detail-genre">${allGenres(genres)}
          </p>
        </div>
        <p class="modal-movie-card-desc-title">About</p>
        <p class="modal-movie-card-desc">
          ${overview}
        </p>

        <button class="js-add-remove-btn button-accent">Add to my library</button> <button class="js-close button-accent">CLOSE</button>
      </div>`;
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
