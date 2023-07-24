import { ScrollService } from './scrollService';

const refs = {
  openMobileMenuBtn: document.querySelector('.js-open-mobile-menu-button'),
  mobileMenuBackdrop: document.querySelector('.mobile-menu-backdrop'),
  mobileMenu: document.querySelector('.mobile-menu'),
};

refs.openMobileMenuBtn.addEventListener('click', openMobileMenu);

function openMobileMenu() {
  ScrollService.blockScroll();
  refs.mobileMenuBackdrop.classList.remove('is-hidden');
  refs.mobileMenu.classList.remove('is-hidden');
  refs.openMobileMenuBtn.removeEventListener('click', openMobileMenu);
  refs.mobileMenuBackdrop.addEventListener('click', handlerBackdropClick);
  window.addEventListener('keydown', handlerKeyDown);
}

function closeMobileMenu() {
  refs.mobileMenu.classList.add('is-hidden');
  refs.mobileMenuBackdrop.classList.add('is-hidden');
  refs.openMobileMenuBtn.addEventListener('click', openMobileMenu);
  refs.mobileMenuBackdrop.removeEventListener('click', handlerBackdropClick);
  window.removeEventListener('keydown', handlerKeyDown);
  ScrollService.restoreScroll();
}

function handlerKeyDown(e) {
  if (e.code === 'Escape') closeMobileMenu();
}

function handlerBackdropClick(e) {
  if (e.currentTarget === e.target) closeMobileMenu();
}
