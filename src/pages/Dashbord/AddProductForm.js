import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './Allproduct';
import OrderList from './OrderList';
import Logout from './Logout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const AddProductForm = ({checkUserData}) => {
  const [productDetails, setProductDetails] = useState({
    productName: '',
    price: '',
    color: '',
    des: '',
    img: '', // To store the image URL
  });
  const [products, setProducts] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState('addProduct');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleImageUpload = async () => {
    const cloudinaryUploadEndpoint = 'https://api.cloudinary.com/v1_1/du1nuzfg8/image/upload';
    const formData = new FormData();
    formData.append('file', productDetails.img);
    formData.append('upload_preset', 'ml_default');
    formData.append("cloud_name", "du1nuzfg8");

    try {
      const response = await fetch(cloudinaryUploadEndpoint, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const imageUrl = data.secure_url;
        setProductDetails((prevDetails) => ({
          ...prevDetails,
          img: imageUrl,
        }));
      } else {
        console.error('Failed to upload image to Cloudinary');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const getAllProduct = () => {
    axios.get('https://orbi-master-api.onrender.com/api/allproducts')
      .then(response => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error.response ? error.response.data : error.message);
      });
  }

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`https://orbi-master-api.onrender.com/api/createproducts`, productDetails);
    console.log('Product created successfully:', response.data);
    
    // Display success toast
    toast.success('Product created successfully', {
      position: 'top-right',
      autoClose: 3000, // Close the toast after 3000 milliseconds (3 seconds)
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    // Reset the form
    await handleImageUpload();
    setProductDetails({
      productName: '',
      price: '',
      color: '',
      des: '',
      img: '', // To store the image URL
    });

  } catch (error) {
    console.error('Error creating product:', error.response ? error.response.data : error.message);
    // Display error toast
    toast.error('Error creating product', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
};

  
  const renderComponent = () => {
    switch (selectedMenu) {
      case 'addProduct':
        return (
          <form className="bg-white p-8 rounded shadow-md w-full md:w-4/5 lg:w-4/5 xl:w-4/5" onSubmit={handleSubmit}>
            <label className="block mb-4">
          Product Name:
          <input
            type="text"
            name="productName"
            value={productDetails.productName}
            onChange={handleChange}
            className="form-input mt-1 w-full border rounded"
          />
        </label>

        <label className="block mb-4">
          Product Price:
          <input
            type="text"
            name="price"
            value={productDetails.price}
            onChange={handleChange}
            className="form-input mt-1 w-full border rounded"
          />
        </label>

        <label className="block mb-4">
          Product Color:
          <input
            type="text"
            name="color"
            value={productDetails.color}
            onChange={handleChange}
            className="form-input mt-1 w-full border rounded"
          />
        </label>

        <label className="block mb-4">
          Product Description:
          <textarea
            name="des"
            value={productDetails.des}
            onChange={handleChange}
            className="form-textarea mt-1 w-full border rounded"
          />
        </label>

        <label className="block mb-4">
          Product Image (URL):
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setProductDetails((prevDetails) => ({
                ...prevDetails,
                img: e.target.files[0],
              }))
            }
            className="form-input mt-1 w-full border rounded"
          />
        </label>
        
        <button type="button" onClick={handleImageUpload} className="bg-blue-500 text-white py-2 px-4 mr-2 rounded">
          Upload Image
        </button>
        <img src={productDetails.img} alt="no image here" className="w-20 h-20 object-cover rounded" />

        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
          Add Product
        </button>
          </form>
        );
      case 'totalProduct':
        return <ProductList />;
      case 'logout':
        return <Logout checkUserData={checkUserData}/>;
      case 'totalOrders':
        return <OrderList />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Simple Menu Bar */}
      <nav className="bg-gray-800 p-4 text-white">
        <ul className="flex">
          <li className={`mr-6 cursor-pointer ${selectedMenu === 'logout' ? 'font-bold' : ''}`} onClick={() => setSelectedMenu('logout')}>Log out</li>
          <li className={`mr-6 cursor-pointer ${selectedMenu === 'addProduct' ? 'font-bold' : ''}`} onClick={() => setSelectedMenu('addProduct')}>Add Product</li>
          <li className={`mr-6 cursor-pointer ${selectedMenu === 'totalProduct' ? 'font-bold' : ''}`} onClick={() => setSelectedMenu('totalProduct')}>Total Product</li>
          <li className={`mr-6 cursor-pointer ${selectedMenu === 'totalOrders' ? 'font-bold' : ''}`} onClick={() => setSelectedMenu('totalOrders')}>Total Orders</li>
        </ul>
      </nav>

      {/* Render the selected component */}
      {renderComponent()}
      
          <ToastContainer />
    </div>
  );
};

export default AddProductForm;