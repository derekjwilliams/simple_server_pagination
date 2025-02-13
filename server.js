import express from "express"
const app = express();

// Sample data
const products = [
  { id: 1, name: 'Product 1' },
  { id: 2, name: 'Product 2' },
  { id: 3, name: 'Product 3' },
  // ... Add more products
];

// Route to handle pagination requests
app.get('/api/products', (req, res) => {
  const page = parseInt(req.query.page);
  const pageSize = parseInt(req.query.pageSize);
  
  // Calculate the start and end indexes for the requested page
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  
  // Slice the products array based on the indexes
  const paginatedProducts = products.slice(startIndex, endIndex);
  
  // Calculate the total number of pages
  const totalPages = Math.ceil(products.length / pageSize);
  
  // Send the paginated products and total pages as the API response
  res.json({ products: paginatedProducts, totalPages });
});

app.listen(5001, () => {
  console.log('Server is running on port 5001');
});