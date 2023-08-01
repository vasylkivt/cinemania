import svgCloseIcon from '../../images/icon/sprite.svg';

export const markupGoToPage = () => {
  return `
  <div class="modal-move-to-page">
  <button type="button" class="js-close-modal-btn modal-move-to-page-close-btn">
      <svg class="modal-error-message-trailer-close-btn-icon">
        <use href="${svgCloseIcon}#icon-button-close"></use>
      </svg>
    </button>
    <form class="js-move-to-page move-to-page-form">
    <input class=" move-to-page-form-input" autocomplete="off" type="text" name="pageInput" autofocus>
    <button class="move-to-page-button button-accent "  type="submit">Go...</button>
    </form>
    
  </div>
  `;
};
