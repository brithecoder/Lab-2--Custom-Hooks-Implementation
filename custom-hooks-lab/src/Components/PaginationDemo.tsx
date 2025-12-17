import React from 'react';
import { usePagination } from '../CustomHooks/usePagination';

const PaginationDemo = () => {
  // 1. Simulate a list of 100 items
  const items = Array.from({ length: 100 }, (_, i) => `📦 Item ${i + 1}`);

  // 2. Initialize the hook
  const {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    itemsOnCurrentPage,
    setPage,
    nextPage,
    prevPage,
    canNextPage,
    canPrevPage,
  } = usePagination({
    totalItems: items.length,
    itemsPerPage: 10,
    initialPage: 1,
  });

  // 3. Slice the data for the current view
  const currentItems = items.slice(startIndex, endIndex + 1);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '500px' }}>
      <h2>Pagination Demo</h2>

      {/* Info Stats */}
      <div style={{ marginBottom: '10px', color: '#666' }}>
        <p>Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong></p>
        <p>Showing {itemsOnCurrentPage} items (Index {startIndex} to {endIndex})</p>
      </div>

      {/* The List of Items */}
      <ul style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '10px', listStyle: 'none' }}>
        {currentItems.map((item) => (
          <li key={item} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
            {item}
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div style={{ display: 'flex', gap: '5px', marginTop: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
        
        {/* Previous Button */}
        <button 
          onClick={prevPage} 
          disabled={!canPrevPage}
          style={buttonStyle}
        >
          Previous
        </button>

        {/* Individual Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => {
          const pageNum = i + 1;
          // Logic to only show some buttons if totalPages is huge (optional)
          return (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              style={{
                ...buttonStyle,
                backgroundColor: currentPage === pageNum ? '#007bff' : '#f8f9fa',
                color: currentPage === pageNum ? 'white' : 'black',
              }}
            >
              {pageNum}
            </button>
          );
        })}

        {/* Next Button */}
        <button 
          onClick={nextPage} 
          disabled={!canNextPage}
          style={buttonStyle}
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Simple inline styles for the buttons
const buttonStyle: React.CSSProperties = {
  padding: '6px 12px',
  cursor: 'pointer',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '14px'
};

export default PaginationDemo;