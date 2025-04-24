import React from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.css";

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedPage: number) => void;
  pageRangeDisplayed?: number;
  marginPagesDisplayed?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  onPageChange,
  pageRangeDisplayed = 5,
  marginPagesDisplayed = 2,
}) => {
  const handlePageChange = (selectedItem: { selected: number }) => {
    onPageChange(selectedItem.selected);
  };

  return (
    <div className="pagination-container">
      <ReactPaginate
        previousLabel={<span className="arrow" aria-label="Previous page">←</span>}
        nextLabel={<span className="arrow" aria-label="Next page">→</span>}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={marginPagesDisplayed}
        pageRangeDisplayed={pageRangeDisplayed}
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
