const pagesEl = document.querySelectorAll('.js-header-nav-link');
console.log('pagesEl:', pagesEl);
const windowPathName = window.location.pathname;
console.log('windowPathName:', windowPathName);

pagesEl.forEach(pageEl => {
  const pageLinkPathname = new URL(pageEl.href).pathname;
  console.log('pageLinkPathname:', pageLinkPathname);

  if (windowPathName === '/' && pageLinkPathname === '/index.html') {
    pageEl.classList.add('active');
  }

  if (pageLinkPathname === windowPathName) {
    pageEl.classList.add('active');
  }
});
