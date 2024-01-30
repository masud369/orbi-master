import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    // Fetch orders when the component mounts
    axios.get('https://orbi-master-api.onrender.com/api/totalorders')
      .then(response => {
        setOrders(response.data.orderList);
        console.log(response.data.orderList);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching orders:', error.response ? error.response.data : error.message);
        setLoading(false);
      });
  }, []);

  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await axios.delete(`https://orbi-master-api.onrender.com/api/orders/${orderId}`);
      console.log(response.data.message);
      // Remove the deleted order from the state
      setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
      // Clear the selected order details when an order is deleted
      setSelectedOrderId(null);
    } catch (error) {
      console.error('Error deleting order:', error.response ? error.response.data : error.message);
      // Handle error scenarios
    }
  };

  const renderOrderDetails = (order) => {
    // Render detailed order information (e.g., address and description)
    return (
      <div>
        <p className="text-lg font-semibold mb-2">Address: {order.shippingAddress?.address}</p>
        <p className="text-lg font-semibold">Description: {order.shippingAddress?.description}</p>
      </div>
    );
  };

  const calculateTotalPrice = (order) => {
    // Calculate the total price for each order
    return order.products?.reduce((total, product) => total + (parseFloat(product.price) * product.quantity), 0).toFixed(2);
  };

  const handleDetailsToggle = (orderId) => {
    // Toggle the selected order for details
    setSelectedOrderId(prevOrderId => (prevOrderId === orderId ? null : orderId));
  };

  return (
    <div className="order-list-container">
      <h1 className="text-3xl font-bold mb-4">Order List</h1>
      {loading && <p>Loading...</p>}

      {orders.map((order) => (
        <div key={order._id} className="order-item border border-gray-300 rounded-md p-4 mb-4">
          {/* Additional check for undefined products */}
          {order.products?.map(product => (
            <div key={product._id} className="product-item flex items-center mb-2">
              <img src={product.image} alt={product.name} className="w-16 h-16 object-cover mr-4" />
              <div className="product-details">
                <p className="text-lg font-bold">Product Name: {product.name}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Name: {order.shippingAddress?.name}</p>
                <p>Phone Number: {order.shippingAddress?.phoneNumber}</p>
                <p>Price: ${parseFloat(product.price).toFixed(2)}</p>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center mt-4">
            {/* Toggle Details button */}
            <button
              className={`bg-blue-500 text-white px-4 py-2 rounded ${selectedOrderId === order._id ? 'bg-blue-700' : ''}`}
              onClick={() => handleDetailsToggle(order._id)}
            >
              {selectedOrderId === order._id ? 'Hide Details' : 'Show Details'}
            </button>
            {/* Delete button */}
            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleDeleteOrder(order._id)}>
              Delete
            </button>
            {/* Total price */}
            <p className="text-xl font-semibold">Total Price: ${calculateTotalPrice(order)}</p>
          </div>
          {/* Render details for the selected order */}
          {selectedOrderId === order._id && (
            <div className="mt-4">
              {renderOrderDetails(order)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderList;
