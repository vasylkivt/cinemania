import * as basicLightbox from 'basiclightbox';
import { ServiceAddRemoveBtn } from './add-remove-movie';
import { markupModalMovieCard } from '../components/modal-movie-card';

const openModal = movie =>
  basicLightbox.create(markupModalMovieCard(movie), {
    onShow: instance => {
      const addRemoveBtn = instance
        .element()
        .querySelector('.js-add-remove-btn');

      const serviceAddRemoveBtn = new ServiceAddRemoveBtn(addRemoveBtn, movie);
      serviceAddRemoveBtn.setButtonName();
      instance.element().querySelector('.js-close').onclick = instance.close;
    },
    onClose() {
      console.log('close');
    },
  });

export const BasicLightbox = {
  openModal,
};
