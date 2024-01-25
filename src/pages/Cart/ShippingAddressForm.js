// ShippingAddressForm.jsx
import React from "react";

const ShippingAddressForm = ({ formData, formError, onChange }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>
      {formError && <p className="text-red-500 mb-2">{formError}</p>}
      <div className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder="Name"
          className="border px-2 py-1"
        />
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={onChange}
          placeholder="Phone Number"
          className="border px-2 py-1"
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={onChange}
          placeholder="Address"
          className="border px-2 py-1"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={onChange}
          placeholder="Description (Optional)"
          className="border px-2 py-1"
        />
      </div>
    </div>
  );
};

export default ShippingAddressForm;
