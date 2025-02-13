import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  id: string;
  name: string;
  // Add other product properties as needed
}

interface ApiResponse {
  products: Product[];
  totalPages: number;
}

const PaginationComponent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async (page: number): Promise<void> => {
    try {
      const response = await axios.get<ApiResponse>(`/api/products?page=${page}&pageSize=10`);
      const { products, totalPages } = response.data;
      setProducts(products);
      setTotalPages(totalPages);
    } catch (error) {
      console.error('Error fetching products:', error instanceof Error ? error.message : 'Unknown error');
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handlePrevPage = (): void => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = (): void => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (<div>Hello</div>)
  // return (
  //   <div>
  //     {/* Display the products */}
  //     {products.map((product) => (
  //       <div key={product.id}>{product.name}</div>
  //     ))}

  //     {/* Pagination controls */}
  //     <button 
  //       onClick={handlePrevPage} 
  //       disabled={currentPage === 1}
  //     >
  //       Previous Page
  //     </button>
  //     <button 
  //       onClick={handleNextPage} 
  //       disabled={currentPage === totalPages}
  //     >
  //       Next Page
  //     </button>
  //   </div>
  );
};

export default PaginationComponent;