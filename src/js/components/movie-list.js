import { TMDB_API } from '../api/themoviedbAPI';
import comingSoonImg from '../../images/default-image-for-movie.webp';

let genresList = [];

export const createMarkupMovieList = async movieList => {
  try {
    genresList = await TMDB_API.getGenresList();
  } catch (error) {
    console.log(error);
  }

  return movieList
    .map(
      ({
        id,
        poster_path,

        genre_ids,
        original_title,
        release_date,
        vote_average,
      }) => {
        const movieSrc = getImg(poster_path, original_title);
        let genre = '';
        if (genre_ids?.length === 0) {
          genre = 'Unknown Genre';
        } else if (genre_ids) {
          genre = getGenreName(genre_ids).slice(0, 1).join(' ');
        }

        return `
        <li data-movie_id="${id}" class="movie-card">
          <img
          ${movieSrc}
          class="movie-card-img"
          width="280"
          height="406"
          />
          <div class="movie-card-wrapper">
              <h2 class="movie-card-title">${original_title}</h2>
              <p class="movie-card-text">
                ${genre} | ${release_date.slice(0, 4)}
              </p>
              <span class="movie-card-rating">
                *********
              </span>
          </div>
        </li>
       `;
      }
    )
    .join('');
};

function getGenreName(ids) {
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
                https://image.tmdb.org/t/p/w500/${poster} 500w,
                https://image.tmdb.org/t/p/w300/${poster} 342w,
                https://image.tmdb.org/t/p/w185/${poster} 185w"
        src="https://image.tmdb.org/t/p/w500/${poster}"

        " sizes=" (min-width: 768px) 500px, (min-width: 480px) 342px, (min-width: 320px) 185px, 100vw"   
     alt='${title}'`;
}
