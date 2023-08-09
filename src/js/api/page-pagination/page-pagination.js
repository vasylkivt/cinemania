export class PagePagination {
  styles = ` <style>


        .p-pagination,
        .p-pagination-load-more,
        .p-pagination-prev,
        .p-pagination-set-page,
        .p-pagination-next  {
          padding: 6px;
          border: 2px solid #006494;
          border-radius: 10px;
          background-color: #e2e8f0;
          min-height: 24px;
          min-width: 24px;
        }

        .p-pagination-active{
            border: 2px solid grey;
            background-color: #2ec4b6;
        }
      </style>`;

  totalPage = null;
  page = 1;
  actionClick = null;
  callback = null;

  totalButtons = 5;

  buttonPrev = null;
  buttonNext = null;

  showSetPageBtnPrev = false;
  showSetPageBtnNext = true;
  showFirstBtn = false;
  showBtnTotalPage = true;
  showNavigationBtn = false;

  setDefaultStyle = true;

  constructor({
    element,
    elementLoadMoreBtn,
    showNavigationBtn = false,
    setDefaultStyle = true,
    buttonPrev,
    buttonNext,
  }) {
    this.buttonPrev = buttonPrev;
    this.buttonNext = buttonNext;
    this.showNavigationBtn = showNavigationBtn;
    this.setDefaultStyle = setDefaultStyle;

    if (this.setDefaultStyle) {
      document.body.insertAdjacentHTML('beforebegin', this.styles);
    }

    if (element) {
      this.element = element;
      this.element.addEventListener('click', this.onPaginationClick);
      this.element.innerHTML = this.markupPaginationBtn();
    }

    if (elementLoadMoreBtn) {
      this.elementLoadMoreBtn = elementLoadMoreBtn;
      this.elementLoadMoreBtn.addEventListener('click', this.onLoadMoreClick);
      this.elementLoadMoreBtn.innerHTML = this.markupBtnLoadMore();
    }
  }

  setTotalPage(totalPage) {
    this.totalPage = totalPage;
    if (this.totalPage <= this.totalButtons) {
      this.showSetPageBtnNext = false;
      this.showBtnTotalPage = false;
    }

    this.setPaginationBtn();
  }

  onPagination(callback) {
    this.callbackPagination = callback;
  }

  onLoadMore(callback) {
    this.callbackLoadMore = callback;
  }

  onMoveToPage(callback) {
    this.callbackMoveToPage = callback;
  }

  onPaginationClick = e => {
    const { action } = e.target.dataset;

    if (e.target.dataset.action) {
      e.target.blur();
      switch (action) {
        case 'prev':
          this.actionClick = 'prev';
          this.page -= 1;
          break;
        case 'next':
          this.actionClick = 'next';
          this.page += 1;
          break;
        case 'setPage':
          this.actionClick = 'setPage';
          this.moveToPage(this.callbackMoveToPage);

          return;
        default:
          if (this.page === Number(action)) return;
          this.page = Number(action);
      }

      this.callbackPagination({ page: this.page, action: this.actionClick });
      this.setPaginationBtn();
    }
  };

  onLoadMoreClick = () => {
    this.page += 1;
    this.callbackLoadMore({ page: this.page, action: this.actionClick });

    this.setPaginationBtn();
  };

  moveToPage(pageToMove) {
    const currentPage = this.page;

    if (pageToMove) {
      pageToMove();
      return;
    }

    const promptPage = Number(prompt());

    this.page = promptPage
      ? promptPage > this.totalPage
        ? currentPage
        : promptPage
      : currentPage;

    if (currentPage === this.page) {
      return;
    }

    this.callbackPagination({
      page: this.page,
      action: this.actionClick,
    });
    this.setPaginationBtn();
  }

  setPaginationBtn() {
    this.showSetPageBtnPrev = this.page > 4 ? true : false;

    this.showFirstBtn =
      this.page > 3 && !(this.totalPage <= this.totalButtons) ? true : false;
    this.showSetPageBtnNext = this.page < this.totalPage - 3 ? true : false;
    this.showBtnTotalPage = this.page < this.totalPage - 2 ? true : false;
    if (this.element) {
      this.element.innerHTML = this.markupPaginationBtn();
    }
    if (this.elementLoadMoreBtn) {
      this.elementLoadMoreBtn.innerHTML = this.markupBtnLoadMore();
    }
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
      if (this.page === value + (i - 2)) {
        markupDynamicButtons += `<button class="p-pagination p-pagination-active" data-action="${
          value + (i - 2)
        }">${value + (i - 2)}</button>`;
        continue;
      }
      markupDynamicButtons += `<button class="p-pagination" data-action="${
        value + (i - 2)
      }">${value + (i - 2)}</button>`;
    }
    return markupDynamicButtons;
  }

  markupBtnLoadMore() {
    // setPaginationBtn();
    return `
    ${
      this.page < this.totalPage
        ? `<button class=" p-pagination-load-more" type="button">
        Load More
      </button>`
        : ''
    }
     `;
  }

  markupPaginationBtn() {
    const markupBtn = (data, content, className, attr = '') =>
      `<button class="${className}" type="button" data-action="${data}" ${attr}>${content}</button>`;

    const prevIsDisabled = this.page === 1 ? 'disabled' : '';
    const nextIsDisabled = this.page === this.totalPage ? 'disabled' : '';

    if (this.element && 1 < this.totalPage) {
      return `
    ${
      this.showNavigationBtn
        ? markupBtn(
            'prev',
            this.buttonPrev ? this.buttonPrev : '<',
            'p-pagination-prev',
            prevIsDisabled
          )
        : ''
    }${this.showFirstBtn ? markupBtn(1, 1, 'p-pagination') : ''}${
        this.showSetPageBtnPrev
          ? markupBtn('setPage', '...', 'p-pagination-set-page')
          : ''
      }${this.dynamicButtons()}${
        this.showSetPageBtnNext
          ? markupBtn('setPage', '...', 'p-pagination-set-page')
          : ''
      }${
        this.showBtnTotalPage
          ? markupBtn(this.totalPage, this.totalPage, 'p-pagination')
          : ''
      }${
        this.showNavigationBtn
          ? markupBtn(
              'next',
              this.buttonNext ? this.buttonNext : '>',

              'p-pagination-next',
              nextIsDisabled
            )
          : ''
      }`;
    }

    return '';
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
