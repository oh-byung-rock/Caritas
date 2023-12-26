import React, { useState } from "react";
import '../App.css';
import Pagination from "react-js-pagination";

const Paging = ({ page, setPage,totaldbcount }) => {

  const handlePageChange = (page) => {
    setPage(page);
    console.log(page);
  };

  return (
    <Pagination
      activePage={page}
    // ▼ 한 페이지당 보여줄 리스트 아이템의 개수
      itemsCountPerPage={5}
    // ▼ 총 아이템의 개수
      totalItemsCount={totaldbcount}
    // ▼ 보여줄 페이지의 범위
      pageRangeDisplayed={5}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={handlePageChange}
    />
  );
};

export default Paging;