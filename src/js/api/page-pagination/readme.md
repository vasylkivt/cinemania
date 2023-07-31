Usage

<div class="page-pagination-load-more"></div>
<div class="page-pagination"></div>

const pagination = new PagePagination({ element:
document.querySelector('.page-pagination'),
elementLoadMoreBtn:document.querySelector('.page-pagination-load-more'),
className: [class-name for button],showNavigationBtn[true] });

pagination.setTotalPage([number]);

pagination.reset();

pagination.onPagination(param => { onPaginationClick(param.page); });

pagination.onLoadMore(param => { onLoadMoreClick(param.page); });
