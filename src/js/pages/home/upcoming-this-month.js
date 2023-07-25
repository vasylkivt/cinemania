const movieDescription = document.querySelector('.movieDescription');

getNewFilms();

async function getNewFilms() {
  try {
    const response = await apiMovie.getNewFilms();
    const randomFilm = randomElement(response.data.results);

    const movie = await apiMovie.getMovieInfo(randomFilm.id);

    movieDescription.innerHTML = createUpcomingMovieMarkup(movie.data);

    const addRemoveBtn = document.querySelector('.add-remove-btn');

    const serviceAddRemoveBtn = new ServiceAddRemoveBtn(addRemoveBtn, movie);

    serviceAddRemoveBtn.setButtonName();
  } catch (error) {
    console.log(error);
  }
}

function randomElement(arr) {
  const rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}

function createUpcomingMovieMarkup({
  id,
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
  const allGenres = genres.map(({ name }) => name).join(', ');
  return `
    <div class="image-upcoming">  
    <img loading="lazy" class="gallery-item_img"
        width="704" height="400"
        srcset="
  https://image.tmdb.org/t/p/w780${backdrop_path} 768w,
  https://image.tmdb.org/t/p/w300${poster_path} 320w"
  src="https://image.tmdb.org/t/p/w300${poster_path}" "sizes="(min-width: 1280px) 1280px, (min-width: 768px) 768px, (min-width: 320px) 320px, 100vw "        
  
        alt="Movie Poster">
    </div>
    <div class="gallery-item" id="${id}">
      <h3 class="info-item-title">${original_title}</h3>
      <div class="info">
        <ul class="info-item-one-part">
          <li class="info-item">Release date</li>
          <li class="info-item">Vote / Votes</li>
        </ul>
        <ul class="info-item-two-part">
          <li class="info-item-two info-item-second">${release_date}</li>
          <li class="info-item-two">
            <span class="info-item-fourth vote-text">${vote_average}</span> / <span class="info-item-fourth vote-text">${vote_count}</span>
          </li>
        </ul>
        <ul class="info-item-one-part">
          <li class="info-item">Popularity</li>
          <li class="info-item">Genre</li>
        </ul>
        <ul class="info-item-two-part">
          <li class="info-item-two">${popularity}</li>
          <li class="info-item-two">${allGenres}</li>
        </ul>
      </div>
      <div class="info-item-about">
        <h4 class="info-item-thirty">About</h4>
        <p class="info-item-about-movie">${overview}</p>
      </div>
      <button type="button" class="add-remove-btn button-accent" id="fix"></button>
    </div>`;
}
