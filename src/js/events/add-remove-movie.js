import Storage from '../services/local-storage';

const STORAGE_KEY = {
  myLibraryMoviesList: 'my-library-movies-list',
};

/**
 *? Клас, що забезпечує обробку кнопки додавання або видалення з бібліотеки фільмів.
 */
export class ServiceAddRemoveBtn {
  /**
   * Конструктор класу ServiceAddRemoveBtn.
   * @param {HTMLButtonElement} addRemoveBtn - Кнопка додавання або видалення.
   * @param {Object} movie - Об'єкт фільму.
   * @param {number} movie.data.id - Ідентифікатор фільму.
   */
  constructor(addRemoveBtn, movie) {
    this.addRemoveBtn = addRemoveBtn;
    this.movieData = movie;
    this.removeBtn = null;
    this.addMovieBtn = null;
    this.localStorageData = Storage.load(STORAGE_KEY.myLibraryMoviesList);
  }

  /**
   *? Встановлює текст кнопки та оброблює кліки на ній.
   */
  setButtonName() {
    if (!this.localStorageData || this.localStorageData.length === 0) {
      this.handleEmptyLibrary();
    } else {
      this.handleNonEmptyLibrary();
    }
  }

  /**
   *? Оброблює випадок, коли бібліотека фільмів порожня.
   */
  handleEmptyLibrary() {
    Storage.save(STORAGE_KEY.myLibraryMoviesList, []);
    this.addRemoveBtn.textContent = 'Add to my library';
    this.addMovieBtn = this.onAddMovieBtnClick.bind(this);
    this.addRemoveBtn.addEventListener('click', this.addMovieBtn);
  }

  /**
   *? Оброблює випадок, коли бібліотека фільмів не є порожньою.
   */
  handleNonEmptyLibrary() {
    const isMovieInLibrary = this.localStorageData.some(
      ({ id }) => id === this.movieData.id
    );
    this.addRemoveBtn.textContent = isMovieInLibrary
      ? 'Remove from my library'
      : 'Add to my library';

    if (isMovieInLibrary) {
      this.removeBtn = this.onRemoveBtnClick.bind(this);
      this.addRemoveBtn.addEventListener('click', this.removeBtn);
    } else {
      this.addMovieBtn = this.onAddMovieBtnClick.bind(this);
      this.addRemoveBtn.addEventListener('click', this.addMovieBtn);
    }
  }

  /**
   * Оброблює клік на кнопці видалення з бібліотеки.
   */
  onRemoveBtnClick() {
    this.addRemoveBtn.blur();
    const index = Storage.load(STORAGE_KEY.myLibraryMoviesList).findIndex(
      ({ id }) => id === this.movieData.id
    );
    const updateData = Storage.load(STORAGE_KEY.myLibraryMoviesList);
    updateData.splice(index, 1);
    Storage.save(STORAGE_KEY.myLibraryMoviesList, updateData);
    this.addRemoveBtn.textContent = 'Add to my library';
    this.addMovieBtn = this.onAddMovieBtnClick.bind(this);
    this.addRemoveBtn.removeEventListener('click', this.removeBtn);
    this.addRemoveBtn.addEventListener('click', this.addMovieBtn);
  }

  /**
   * Оброблює клік на кнопці додавання до бібліотеки.
   */
  onAddMovieBtnClick() {
    this.addRemoveBtn.blur();
    const localStorageData = Storage.load(STORAGE_KEY.myLibraryMoviesList);
    const updateData = [this.movieData, ...localStorageData];
    Storage.save(STORAGE_KEY.myLibraryMoviesList, updateData);
    this.addRemoveBtn.textContent = 'Remove from my library';
    this.removeBtn = this.onRemoveBtnClick.bind(this);
    this.addRemoveBtn.removeEventListener('click', this.addMovieBtn);
    this.addRemoveBtn.addEventListener('click', this.removeBtn);
  }
}
