import React, { useState } from "react";
import '../App.css';
import Pagination from "react-js-pagination";

const Paging = () => {
  const [page, setPage] = useState(1);

  const handlePageChange = (page) => {
    setPage(page);
    console.log(page);
  };

  return (
    <Pagination
      activePage={page}
    // ▼ 한 페이지당 보여줄 리스트 아이템의 개수
      itemsCountPerPage={10}
    // ▼ 총 아이템의 개수
      totalItemsCount={450}
    // ▼ 보여줄 페이지의 범위
      pageRangeDisplayed={5}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={handlePageChange}
    />
  );
};

export default Paging;