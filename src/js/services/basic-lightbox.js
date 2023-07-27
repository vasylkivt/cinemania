import * as basicLightbox from 'basiclightbox';
import { ServiceAddRemoveBtn } from './add-remove-movie';
import { markupModalMovieCard } from '../components/modal-movie-card';
import { ScrollService } from './scroll-services';

const handlerEsc = function (evt) {
  if (evt.code === 'Escape') this.close();
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
       <iframe class="iframe" src="https://www.youtube.com/embed/${trailer.key}" width="560" height="315" frameborder="0"></iframe>`,
    {
      handlerEscape: null,

      onShow(instance) {
        this.handlerEscape = handlerEsc.bind(instance);
        document.addEventListener('keydown', this.handlerEscape);
      },
      onClose() {
        document.removeEventListener('keydown', this.handlerEscape);
      },
    }
  );

export const BasicLightbox = {
  openModal,
  showTrailer,
};
