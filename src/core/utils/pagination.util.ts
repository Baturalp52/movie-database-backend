class _pagination {
  getPagination(page, size) {
    const limit = size ? +size : 10;
    const offset = page ? (page - 1) * limit : 0;

    return { limit, offset };
  }

  getPaginationData = (data, page, limit) => {
    const { count: totalItems, rows: rows } = data;
    const currentPage = page ? +page : 1;
    const totalPage = Math.ceil(totalItems / limit);

    return {
      total: totalItems,
      totalPage,
      page: currentPage,
      size: limit,
      rows,
    };
  };
}

const Pagination = new _pagination();
export default Pagination;
