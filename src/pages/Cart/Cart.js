import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { resetCart } from "../../redux/orebiSlice";
import { emptyCart } from "../../assets/images/index";
import ItemCard from "./ItemCard";
import axios from 'axios';
import ShippingAddressForm from "./ShippingAddressForm"; // Import your ShippingAddressForm component

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.orebiReducer.products);
  const [totalAmt, setTotalAmt] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    description: "",
  });
  const [formError, setFormError] = useState("");

  useEffect(() => {
    let price = 0;
    products.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmt(price);
  }, [products]);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProceedToCheckout = () => {
    // Check if required form fields are filled
    if (!formData.name || !formData.phoneNumber || !formData.address) {
      setFormError("Please fill in the required fields.");
    } else {
      // Post data to the server
      const postData = {
        shippingAddress: formData,
        products,
      };
      console.log(postData);
      // Call your API endpoint to post data
      // Example using fetch:
      axios.post('http://localhost:5000/api/orders', postData, {
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => {
    // Handle success response from server
    console.log('Data posted successfully:', response.data);
    // Reset the cart after successful checkout
    dispatch(resetCart());
  })
  .catch((error) => {
    // Handle error
    console.error('Error posting data:', error);
  });
    }
  };

  return (
    <div className="max-w-container mx-auto px-4 flex">
      <div className="w-1/3 pr-4">
        <ShippingAddressForm
          formData={formData}
          formError={formError}
          onChange={handleFormChange}
        />
      </div>
      <div className="w-2/3 pl-4">
        <Breadcrumbs title="Cart" />
         {products.length > 0 ? (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">Product</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Sub Total</h2>
          </div>
          <div className="mt-5">
            {products.map((item) => (
              <div key={item._id}>
                <ItemCard item={item} />
              </div>
            ))}
          </div>

          <button
            onClick={() => dispatch(resetCart())}
            className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
          >
            Reset cart
          </button>

          {/* <div className="flex flex-col mdl:flex-row justify-between border py-4 px-4 items-center gap-2 mdl:gap-0">
                    //   <div className="flex items-center gap-4">
                    //     <input
                    //       className="w-44 mdl:w-52 h-8 px-4 border text-primeColor text-sm outline-none border-gray-400"
                    //       type="text"
                    //       placeholder="Coupon Number"
                    //     />
                    //     <p className="text-sm mdl:text-base font-semibold">
                    //       Apply Coupon
                    //     </p>
                    //   </div>
                    //   <p className="text-lg font-semibold">Update Cart</p>
                    // </div>*/}
          <div className="max-w-7xl gap-4 flex justify-end mt-4">
            <div className="w-96 flex flex-col gap-4">
              <h1 className="text-2xl font-semibold text-right">Cart totals</h1>
              <div>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Subtotal
                  <span className="font-semibold tracking-wide font-titleFont">
                    ${totalAmt}
                  </span>
                </p>
                {/* <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                                //   Shipping Charge
                                //   <span className="font-semibold tracking-wide font-titleFont">
                                //     // ${shippingCharge}
                                //   </span>
                                // </p>*/}
                <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                  Total
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                    ${totalAmt}
                  </span>
                </p>
              </div>
              <div className="flex justify-end">
                <Link>
                  <button onClick={handleProceedToCheckout} className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Your Cart feels lonely.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Your Shopping cart lives to serve. Give it purpose - fill it with
              books, electronics, videos, etc. and make it happy.
            </p>
            <Link to="/shop">
              <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                Continue Shopping
              </button>
            </Link>
          </div>
        </motion.div>
      )}
      </div>
    </div>
  );
};

export default Cart;
