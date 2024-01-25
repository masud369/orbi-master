import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch all products when the component mounts
    axios.get('http://localhost:5000/api/allproducts')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error.response ? error.response.data : error.message);
      });
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/products/${productId}`);
      console.log(response.data.message);
      // Handle UI updates or additional actions after successful deletion
      // For example, you might want to update the products state to reflect the deletion
      setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error.response ? error.response.data : error.message);
      // Handle error scenarios
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <ul className="list-disc pl-4">
        {products.map(product => (
          <li key={product._id} className="flex items-center justify-between border-b py-2">
            <div className="flex items-center space-x-4">
              <img src={product.productImage} alt={product.productName} className="w-20 h-20 object-cover rounded-full" />
              <div>
                <p className="font-semibold">{product.productName}</p>
                <p className="text-gray-600">${product.productPrice}</p>
                <p className="text-gray-500">Color: {product.productColor}</p>

              </div>
            </div>
            <button
              onClick={() => handleDeleteProduct(product._id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
