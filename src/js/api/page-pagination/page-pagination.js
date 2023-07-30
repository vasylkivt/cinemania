export class PagePagination {
  totalPage = null;
  page = 1;
  actionClick = null;
  callback = null;

  localName = null;

  showSetPageBtnPrev = false;
  showSetPageBtnNext = true;
  showFirstBtn = false;
  showBtnTotalPage = true;

  showPrevNextBtn = false;

  constructor(element) {
    console.log(element);
    this.localName = element.localName;

    this.element = element;
    this.element.addEventListener('click', this.onPaginationClick);
    this.element.innerHTML = this.markup();
  }

  setTotalPage(totalPage) {
    this.totalPage = totalPage;
    if (this.totalPage < 6) {
      this.showBtnTotalPage = false;
    }

    this.element.innerHTML = this.markup();
  }

  on(callback) {
    this.callback = callback;
  }

  onPaginationClick = e => {
    const { action } = e.target.dataset;

    if (e.target.dataset.action) {
      switch (action) {
        case 'prev':
          this.actionClick = 'prev';
          break;
        case 'next':
          this.actionClick = 'next';
          break;
        default:
          this.page = Number(action);
      }

      this.callback(this.page, this.actionClick);
      this.showSetPageBtnPrev = this.page > 4 ? true : false;
      this.showFirstBtn = this.page > 3 ? true : false;
      this.showSetPageBtnNext = this.page < this.totalPage - 3 ? true : false;
      this.showBtnTotalPage = this.page < this.totalPage - 2 ? true : false;
      this.element.innerHTML = this.markup();
    }
  };

  dynamicButtons() {
    let value = this.page < 4 ? 3 : this.page;
    value = this.page > this.totalPage - 2 ? this.totalPage - 2 : value;

    return `
        <button data-action="${value - 2}">${value - 2}</button>
        <button data-action="${value - 1}">${value - 1}</button>
        <button data-action="${value}">${value}</button>
        <button data-action="${+value + 1}">${+value + 1}</button>
        <button data-action="${+value + 2}">${+value + 2}</button>
        `;
  }

  markup() {
    return `
    <style>
        ${this.localName} button {
          padding: 4px;
          border: 1px solid tomato;
          border-radius: 4px;
          background-color: antiquewhite;
        }
      </style>

    ${this.showPrevNextBtn ? '<button data-action="prev"><-</button>' : ''}
    ${this.showFirstBtn ? ` <button data-action="1">1</button>` : ''}
    ${
      this.showSetPageBtnPrev
        ? ` <button data-action="setPage">...</button>`
        : ''
    }
        ${this.dynamicButtons()}
    ${
      this.showSetPageBtnNext
        ? ` <button data-action="setPage">...</button>`
        : ''
    }
    ${
      this.showBtnTotalPage
        ? `<button data-action=${this.totalPage}>${this.totalPage}</button>`
        : ''
    }
    ${this.showPrevNextBtn ? ' <button data-action=next>-></button>' : ''}
      `;
  }

  reset() {
    this.totalPage = null;
    this.page = 1;
    this.actionClick = null;

    this.showSetPageBtnPrev = false;
    this.showSetPageBtnNext = true;
    this.showFirstBtn = false;
    this.showBtnTotalPage = true;
  }
}
