export class SelectService {
  constructor(select, markupString = null) {
    this.select = document.querySelector(select);

    this.selectedValue = this.select.firstElementChild;

    this.optionList = this.select.lastElementChild;
    this.optionListFirstElementChild = this.optionList.firstElementChild;
    this.markupString = markupString;
    this.optionListValue = null;
  }

  addEventListenerSelect() {
    this.selectedValue.classList.add('selected-option');
    this.optionList.classList.add('option-list');
    this.select.classList.add('select');

    this.selectedValue.addEventListener(
      'mouseenter',
      this.onSelectHover.bind(this)
    );
    this.selectedValue.addEventListener(
      'mouseleave',
      this.onSelectLostHover.bind(this)
    );
    this.optionList.addEventListener(
      'mouseenter',
      this.onSelectHover.bind(this)
    );
    this.optionList.addEventListener(
      'mouseleave',
      this.onSelectLostHover.bind(this)
    );
    if (this.markupString) {
      this.optionList.insertAdjacentHTML('beforeend', this.markupString);
    }
  }

  onSelectHover(e) {
    this.select.classList.add('select-active');

    this.optionList.addEventListener('click', this.onOptionClick.bind(this));
  }

  onSelectLostHover(e) {
    this.select.classList.remove('select-active');
    this.optionList.removeEventListener('click', this.onOptionClick.bind(this));
  }

  onOptionClick(e) {
    this.optionListValue = e.target.textContent;
    this.selectedValue.firstChild.textContent = this.optionListValue;
    this.select.classList.remove('select-active');

    this.optionList.removeEventListener('click', this.onOptionClick);
  }
}

//? ініціалізація екземпляра
//  const selectService = new SelectService('Селектор', [markup]);
//
// selectService.addEventListenerSelect();

//? html
// <div class="Селектор">
//   <div>
//     All Genres
//     [svg-icon]
//   </div >
//     <ul>
//       <li>All Genres</li>
//     </ul>
// </div>

//? css
// .selected-option,
// .option-list,
// .option-list > div {
//   position: relative;
//   z-index: 11;
//   background-color: rgb(41, 41, 41);
// }

// .selected-option,
// .option-list > div {
//   padding-top: 10px;
//   padding-bottom: 10px;
//   padding-right: 10px;
//   padding-left: 10px;
// }

// .selected-option {
//   border: 1px solid rgb(141, 141, 141);
//   border-radius: 4px;
// }

// .option-list {
//   /* pointer-events: none; */
//   opacity: 0;
//   visibility: hidden;
//   position: absolute;

//   transform: scaleY(0);
//   transform-origin: top;

//   transition: opacity 300ms ease-in-out, visibility 300ms ease-in-out,
//     transform 300ms ease-in-out;
// }

// .option-list > div {
//   border: 1px solid rgb(141, 141, 141);
// }

// .option-list > div:last-child {
//   border-radius: 0px 0px 4px 4px;
// }

// .select-active .option-list {
//   opacity: 1;
//   visibility: visible;

//   transform: scaleY(1);
// }

// .select-active .selected-option {
//   border-radius: 4px 4px 0px 0px;
// }
