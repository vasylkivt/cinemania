const checkBoxEl = document.querySelector('.js-theme-switch-toggle');
const body = document.querySelector('body');

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const STORAGE_KEY = 'theme';

checkBoxEl.addEventListener('change', onCheckboxClick);

function onCheckboxClick(evt) {
  let value = '';
  if (evt.currentTarget.checked) {
    value = Theme.LIGHT;
    body.classList.remove(Theme.DARK);
    body.classList.add(value);
  } else {
    value = Theme.DARK;
    body.classList.add(value);
    body.classList.remove(Theme.LIGHT);
  }
  localStorage.setItem(STORAGE_KEY, value);
}

function savedThemeOnReloaded() {
  const savedValue = localStorage.getItem(STORAGE_KEY);

  if (savedValue) {
    body.classList.add(savedValue);
  } else {
    body.classList.add(Theme.DARK);
  }

  if (savedValue === Theme.LIGHT) {
    checkBoxEl.setAttribute('checked', true);
  }
}
savedThemeOnReloaded();
