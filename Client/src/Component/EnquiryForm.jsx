import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EnquiryForm = ({ enquiry, onFormSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const isEditMode = !!enquiry;

  useEffect(() => {
    if (isEditMode) {
      setFormData(enquiry);
    }
  }, [enquiry, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = isEditMode
      ? `http://localhost:3000/api/client/update/${enquiry._id}`
      : "http://localhost:3000/api/client/insert-enquiry";
    const method = isEditMode ? "put" : "post";

    axios[method](url, formData)
      .then(() => {
        toast.success(`Enquiry ${isEditMode ? "updated" : "added"}!`);
        onFormSubmit();
        if (isEditMode) onCancel(); // Close form after editing
      })
      .catch(() => toast.error(`Failed to ${isEditMode ? "update" : "add"} enquiry`));
  };

  return (
    <div className="w-full max-w-md bg-white p-6 shadow-md rounded">
      <h2 className="text-xl font-semibold mb-4 text-center">
        {isEditMode ? "Edit Enquiry" : "Add New Enquiry"}
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-3 p-2 border border-gray-300 rounded"
        />
        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full mb-3 p-2 border border-gray-300 rounded"
        />
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-3 p-2 border border-gray-300 rounded"
        />
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          rows="3"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {isEditMode ? "Update" : "Submit"}
          </button>
          {isEditMode && (
            <button
              type="button"
              onClick={onCancel}
              className="text-red-500 hover:underline"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EnquiryForm;