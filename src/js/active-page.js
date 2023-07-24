const pagesEl = document.querySelectorAll('.js-header-nav-link');

const windowPathName = window.location.pathname;

pagesEl.forEach(pageEl => {
  const pageLinkPathname = new URL(pageEl.href).pathname;

  //? Тут потрібно написати імя репозиторію, щоб при першому візиті додався клас
  if (
    windowPathName === '/cinemania/' &&
    pageLinkPathname === '/cinemania/index.html'
  )
    pageEl.classList.add('active');

  if (pageLinkPathname === windowPathName) pageEl.classList.add('active');
});
