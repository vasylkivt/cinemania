import svgCloseIcon from '../../images/icon/sprite.svg';

export const markupErrorMessageTrailer = () =>
  `

  <div class="modal-error-message-trailer-wrap">
  <button type="button" class="js-close-modal-error-message-btn modal-error-message-trailer-close-btn">
      <svg class="modal-error-message-trailer-close-btn-icon">
        <use href="${svgCloseIcon}#icon-button-close"></use>
      </svg>
    </button>
    
    <p class="modal-error-message-trailer-text">OOPS...<br/> We are very sorry!<br /> But we couldn’t find the trailer.</p>
    

  </div>
 
  
  `;
