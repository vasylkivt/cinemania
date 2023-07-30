export class PagePagination {
  totalPage = null;
  page = 1;

  actionClick = null;
  callback = null;

  totalButtons = 5;

  showSetPageBtnPrev = false;
  showSetPageBtnNext = true;
  showFirstBtn = false;
  showBtnTotalPage = true;

  showPrevNextBtn = false;

  constructor(element, elementLoadMoreBtn) {
    this.element = element;
    this.element.addEventListener('click', this.onPaginationClick);
    this.element.innerHTML = this.markupPaginationBtn();

    this.elementLoadMoreBtn = elementLoadMoreBtn;
    this.elementLoadMoreBtn.addEventListener('click', this.onLoadMoreClick);
    this.elementLoadMoreBtn.innerHTML = this.markupBtnLoadMore();
  }

  setTotalPage(totalPage) {
    this.totalPage = totalPage;
    if (this.totalPage <= this.totalButtons) {
      this.showSetPageBtnNext = false;
      this.showBtnTotalPage = false;
    }

    this.element.innerHTML = this.markupPaginationBtn();
    this.elementLoadMoreBtn.innerHTML = this.markupBtnLoadMore();
  }

  on(callback) {
    this.callback = callback;
  }

  onLoadMore(callback) {
    this.callbackLoadMore = callback;
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
      this.setPaginationBtn();
    }
  };

  onLoadMoreClick = () => {
    this.page += 1;
    this.callbackLoadMore(this.page, this.actionClick);

    this.setPaginationBtn();
  };

  setPaginationBtn() {
    this.showSetPageBtnPrev = this.page > 4 ? true : false;
    this.showFirstBtn =
      this.page > 3 && !(this.totalPage <= this.totalButtons) ? true : false;
    this.showSetPageBtnNext = this.page < this.totalPage - 3 ? true : false;
    this.showBtnTotalPage = this.page < this.totalPage - 2 ? true : false;
    this.element.innerHTML = this.markupPaginationBtn();
    this.elementLoadMoreBtn.innerHTML = this.markupBtnLoadMore();
  }

  dynamicButtons() {
    let value;

    if (this.totalPage <= this.totalButtons) {
      value = 3;
    } else {
      value = this.page <= 3 ? 3 : this.page;
      value = this.page > this.totalPage - 2 ? this.totalPage - 2 : value;
    }

    let markupDynamicButtons = '';
    const countIteration =
      this.totalPage <= this.totalButtons ? this.totalPage : this.totalButtons;

    for (let i = 0; i < countIteration; i++) {
      markupDynamicButtons += `<button data-action="${value + (i - 2)}">${
        value + (i - 2)
      }</button>`;
    }
    return markupDynamicButtons;
  }

  markupBtnLoadMore() {
    return `
    ${
      this.page < this.totalPage
        ? `<button class=" button-dark-theme" type="button">
        Load More
      </button>`
        : ''
    }
     `;
  }

  markupPaginationBtn() {
    if (!(1 < this.totalPage)) {
      return '';
    }
    return `

    <style>
        ${this.element.localName} button {
          padding: 4px;
          border: 1px solid tomato;
          border-radius: 4px;
          background-color: antiquewhite;
        }
      </style>
      <div>current Page ${this.page}</div>
    ${this.showPrevNextBtn ? '<button data-action="prev"><-</button>' : ''}
    ${this.showFirstBtn ? ` <button data-action="1">1+</button>` : ''}
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
