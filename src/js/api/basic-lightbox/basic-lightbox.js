import * as basicLightbox from 'basiclightbox';
import { ServiceAddRemoveBtn } from '../../events/add-remove-movie';
import { markupModalMovieCard } from '../../components';
import { ScrollService } from '../../services/scroll-services';

const handlerEsc = function (evt) {
  if (evt.code === 'Escape') this.close();
};

const backdropClick = function (evt) {
  if (evt.target.offsetParent.className !== 'basicLightbox__placeholder')
    this.close();
};

const openModal = movie =>
  basicLightbox.create(markupModalMovieCard(movie), {
    handlerEscape: null,
    className: 'modal-movie-card-backdrop',
    onShow(instance) {
      ScrollService.blockScroll();

      const addRemoveBtn = instance
        .element()
        .querySelector('.js-add-remove-btn');

      const serviceAddRemoveBtn = new ServiceAddRemoveBtn(addRemoveBtn, movie);
      serviceAddRemoveBtn.setButtonName();
      instance.element().querySelector('.js-close-modal-btn').onclick =
        instance.close;

      this.handlerEscape = handlerEsc.bind(instance);
      document.addEventListener('keydown', this.handlerEscape);
    },

    onClose() {
      ScrollService.restoreScroll();
      document.removeEventListener('keydown', this.handlerEscape);
    },
  });

const showTrailer = trailer =>
  basicLightbox.create(
    `
       <iframe class="modal-trailer-iframe" src="https://www.youtube.com/embed/${trailer.key}" width="560" height="315" frameborder="0"></iframe>`,
    {
      handlerEscape: null,

      onShow(instance) {
        ScrollService.blockScroll();
        this.handlerEscape = handlerEsc.bind(instance);
        document.addEventListener('keydown', this.handlerEscape);
      },
      onClose() {
        ScrollService.restoreScroll();
        document.removeEventListener('keydown', this.handlerEscape);
      },
    }
  );

const errorMessage = markupError =>
  basicLightbox.create(markupError, {
    handlerEscape: null,

    onShow(instance) {
      ScrollService.blockScroll();
      instance
        .element()
        .querySelector('.js-close-modal-error-message-btn').onclick =
        instance.close;
      this.handlerEscape = handlerEsc.bind(instance);
      document.addEventListener('keydown', this.handlerEscape);
    },
    onClose() {
      ScrollService.restoreScroll();
      document.removeEventListener('keydown', this.handlerEscape);
    },
  });

const modalMoveToPage = (markup, callback) =>
  basicLightbox.create(markup, {
    handlerEscape: null,
    handlerBackdropClick: null,
    page: null,
    className: 'backdrop-move-to-page',
    onShow(instance) {
      const div = document.querySelector('.js-catalog-pagination-btn-wrap');

      instance.element().querySelector('.js-close-modal-btn').onclick =
        instance.close;
      this.handlerEscape = handlerEsc.bind(instance);
      document.addEventListener('keydown', this.handlerEscape);

      instance
        .element()
        .querySelector('.js-move-to-page')
        .addEventListener('submit', e => {
          e.preventDefault();
          this.page = Number(e.currentTarget.elements.pageInput.value);
          instance.close();
        });

      setTimeout(() => {
        this.handlerBackdropClick = backdropClick.bind(instance);
        document.addEventListener('click', this.handlerBackdropClick);
        div.appendChild(instance.element());
      }, 0);
    },
    onClose() {
      if (this.page) {
        callback(this.page);
      }
      document.removeEventListener('click', this.handlerBackdropClick);
      document.removeEventListener('keydown', this.handlerEscape);
    },
  });

export const BasicLightbox = {
  modalMoveToPage,
  openModal,
  showTrailer,
  errorMessage,
};
