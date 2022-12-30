export function paginateResponse(data, page, limit) {
  const { rows, count } = data;
  page = parseInt(page);
  limit = parseInt(limit);
  const lastPage = Math.ceil(count / limit);
  const nextPage = page + 1 > lastPage ? null : page + 1;
  const prevPage = page - 1 < 1 ? null : page - 1;
  return {
    rows,
    currentPage: page,
    nextPage,
    prevPage,
    total: count,
  };
}
