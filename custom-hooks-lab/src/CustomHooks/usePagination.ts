import { useState, useMemo } from 'react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage?: number;
  initialPage?: number;
}

export const usePagination = ({
  totalItems,
  itemsPerPage = 10,
  initialPage = 1,
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(totalItems / itemsPerPage));
  }, [totalItems, itemsPerPage]);

  // Logic to jump to a specific page with boundary protection
  const setPage = (pageNumber: number) => {
    const pageIndex = Math.max(1, Math.min(pageNumber, totalPages));
    setCurrentPage(pageIndex);
  };

  const nextPage = () => setPage(currentPage + 1);
  const prevPage = () => setPage(currentPage - 1);

  // Calculate indices for slicing data
  const startIndex = (currentPage - 1) * itemsPerPage;
  
  // Ensure endIndex doesn't exceed totalItems
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);

  // Calculate actual count of items on this specific page
  const itemsOnCurrentPage = totalItems > 0 
    ? Math.min(itemsPerPage, totalItems - startIndex) 
    : 0;

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    itemsOnCurrentPage,
    setPage,
    nextPage,
    prevPage,
    canNextPage: currentPage < totalPages,
    canPrevPage: currentPage > 1,
  };
};