import React from 'react';

const Page = ({ totalPosts, postsPerPage, currentPage, handlePageChange }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="paging">
            <span className="page-first">
                <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
                    처음
                </button>
            </span>
            <span className="page-prev">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    이전
                </button>
            </span>
            {pageNumbers.map(num => (
                <span key={num} className={`page-num ${currentPage === num ? 'on' : ''}`}>
                    <button onClick={() => handlePageChange(num)}>
                        {num}
                    </button>
                </span>
            ))}
            <span className="page-next">
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pageNumbers.length}>
                    다음
                </button>
            </span>
            <span className="page-last">
                <button onClick={() => handlePageChange(pageNumbers.length)} disabled={currentPage === pageNumbers.length}>
                    끝
                </button>
            </span>
        </div>
    );
};

export default Page;
