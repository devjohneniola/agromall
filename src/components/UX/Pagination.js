import React from "react";
import PropTypes from "prop-types";

const Pagination = ({
   label,
   align,
   curPage,
   maxPages,
   prevClick,
   nextClick
}) => {
   let ulClass = "pagination";
   if (align) ulClass += " justify-content-" + align;
   return (
      <nav aria-label={label}>
         <ul className={ulClass}>
            <li className="page-item">
               <button
                  className="btn btn-sm page-link"
                  onClick={prevClick}
                  disabled={curPage === 1}
               >
                  Previous
               </button>
            </li>
            <li className="page-item">
               <button
                  className="btn btn-sm page-link"
                  onClick={nextClick}
                  disabled={curPage === maxPages}
               >
                  Next
               </button>
            </li>
         </ul>
      </nav>
   );
};

Pagination.defaultProps = {
   label: "",
   curPage: 1,
   prevClick: () => {},
   nextClick: () => {}
};

Pagination.propTypes = {
   label: PropTypes.string,
   curPage: PropTypes.number,
   prevClick: PropTypes.func,
   nextClick: PropTypes.func
};

export default Pagination;
