import React from 'react';

const Pageination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={handlePreviousPage}
        className={"disabled:hidden"}
        disabled={currentPage === 1}
      >
        <img src="arrow-right.svg" className='rotate-180' alt="" />
      </button>
      {[...Array(totalPages).keys()].map((page) => (
        <button
          key={page + 1}
          onClick={() => handlePageChange(page + 1)}
          className={`px-3 py-1 rounded ${
            page + 1 === currentPage ? ' bg-primary-color text-white' : 'text-gray-700 hover:text-gray-900'
          }`}
        >
          {page + 1}
        </button>
      ))}
      <button
        onClick={handleNextPage}
        className={"disabled:hidden"}
        disabled={currentPage === totalPages}
      >
        <img src="arrow-right.svg" alt="" />
      </button>
    </div>
  );
};

export default Pageination;