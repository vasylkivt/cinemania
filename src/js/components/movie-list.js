import comingSoonImg from '../../images/default-image-for-movie.webp';
import { ratingStarsMarkup } from './rating-stars';

export const createMarkupMovieList = (
  movieList,
  genresList
) => `<ul class="movie-list">
${movieList
  .map(
    ({
      id,
      poster_path,
      genre_ids,
      original_title,
      release_date,
      vote_average,
    }) => `
        <li data-movie_id_for_modal="${id}" class="movie-card">
          <img
          ${getImg(poster_path, original_title)}
          class="movie-card-img"
          width="280"
          height="406"
          />
          <div class="movie-card-wrapper">
              <h2 class="movie-card-title">${original_title}</h2>
              <p class="movie-card-text">
                ${getGenre(genre_ids, genresList)} | ${release_date.slice(0, 4)}
              </p>
              <div class="movie-card-rating">
              ${ratingStarsMarkup(vote_average * 10)}
              </div>
          </div>
        </li>
       `
  )
  .join('')}

</ul>`;

function getGenre(genreIds, genresList) {
  let genre = '';
  if (genreIds?.length === 0) {
    genre = 'Unknown Genre';
  } else if (genreIds) {
    genre = getGenreName(genreIds, genresList).slice(0, 1).join(' ');
  }

  return genre;
}

function getGenreName(ids, genresList) {
  try {
    return ids.map(id => {
      const genre = genresList.find(genre => genre.id === id);
      return genre ? genre.name : null;
    });
  } catch (error) {
    return ['Unknown Genre'];
  }
}

function getImg(poster, title) {
  if (poster === null || !poster) {
    return `src='${comingSoonImg}' alt='${title}'`;
  }

  return `
    srcset="
    https://image.tmdb.org/t/p/w300/${poster} 342w,
    https://image.tmdb.org/t/p/w500/${poster} 500w
            "
       src="https://image.tmdb.org/t/p/w500/${poster}"
     sizes="(min-width: 768px) 500px, (min-width: 480px) 342px, (min-width: 320px) 185px, 100vw"   
     alt='${title}'`;
}
