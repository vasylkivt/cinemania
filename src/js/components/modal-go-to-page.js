import svgCloseIcon from '../../images/icon/sprite.svg';

export const markupGoToPage = () => {
  return `
  <div class="modal-move-to-page">
  <button type="button" class="js-close-modal-btn modal-error-message-trailer-close-btn">
      <svg class="modal-error-message-trailer-close-btn-icon">
        <use href="${svgCloseIcon}#icon-button-close"></use>
      </svg>
    </button>
    <form class="js-move-to-page">
    <input type="text" name="pageInput" autofocus>
    <button type="submit">Go...</button>
    </form>
    
  </div>
  `;
};
