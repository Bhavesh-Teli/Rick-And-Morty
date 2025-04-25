import React from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.css";

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedPage: number) => void;
  pageRangeDisplayed?: number;
  marginPagesDisplayed?: number;
}

// Pagination component renders a pagination bar with navigation buttons.
// It takes in the following props:
// - pageCount: the total number of pages
// - onPageChange: a callback function to be called when a page is selected
// - pageRangeDisplayed: the number of pages to display in the pagination bar
// - marginPagesDisplayed: the number of pages to display on the left and right of the current page

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
