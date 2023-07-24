const pagesEl = document.querySelectorAll('.js-header-nav-link');
const windowPathName = window.location.pathname;

pagesEl.forEach(pageEl => {
  const pageLinkPathname = new URL(pageEl.href).pathname;

  if (windowPathName === '/' && pageLinkPathname === '/index.html') {
    pageEl.classList.add('active');
  }

  if (pageLinkPathname === windowPathName) {
    pageEl.classList.add('active');
  }
});
