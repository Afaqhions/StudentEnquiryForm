import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EditEnquiry = ({ enquiryId, onClose, onUpdated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    if (enquiryId) {
      axios
        .get(`http://localhost:3000/api/client/view/${enquiryId}`)
        .then((res) => setFormData(res.data.data))
        .catch(() => toast.error("Failed to load enquiry"));
    }
  }, [enquiryId]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/api/client/update/${enquiryId}`, formData)
      .then(() => {
        toast.success("Enquiry updated!");
        onUpdated();  // Trigger parent to refresh
        onClose();    // Close this form
      })
      .catch(() => toast.error("Update failed"));
  };

  return (
    <div className="bg-white shadow-md rounded p-6 w-full max-w-md mt-4">
      <h2 className="text-xl font-bold mb-4">Edit Enquiry</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 border rounded"
        />
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
          className="w-full p-2 border rounded"
        />
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Update
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-red-500 hover:underline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEnquiry;
