const onShow = () => {
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div class="backdrop-loader">
  <div class="lds-dual-ring"></div>
</div>`
  );
};

const onClose = () => {
  document.querySelector('.backdrop-loader').remove();
};

export const Loader = { onShow, onClose };
