import React from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.css";

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount, onPageChange }) => {
  const handlePageChange = (selectedItem: { selected: number }) => {
    onPageChange(selectedItem.selected);
  };

  return (
    <div className="pagination-container">
      <ReactPaginate
        previousLabel={<span className="arrow">←</span>}
        nextLabel={<span className="arrow">→</span>}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"previous-item"}
        nextClassName={"next-item"}
      />
    </div>
  );
};

export default Pagination;
