import axios from "axios";
import { useEffect, useState } from "react";

export function Layout() {
  // Form data state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // List of inquiries
  const [users, setUsers] = useState([]);

  // Handle input changes
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const updatedData = { ...formData };
    updatedData[name] = value;
    setFormData(updatedData);
  };

  // Handle form submission
  const handleSubmit = (e) => {
  e.preventDefault();

  if (editingId) {
    // Editing existing user
    axios
      .put(`http://localhost:3000/api/client/edit${editingId}`, {
        id: editingId,
        ...formData,
      })
      .then((res) => {
        alert("User updated successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
        setEditingId(null); // Reset edit mode
        fetchUsers();
      })
      .catch((err) => {
        console.error("Error updating user:", err);
        alert("Error while updating user");
      });
  } else {
    // New entry
    axios
      .post("http://localhost:3000/api/client/insert-enquiry", formData)
      .then((res) => {
        alert("Enquiry saved successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
        fetchUsers();
      })
      .catch((err) => {
        console.error("Error saving enquiry:", err);
        alert("Something went wrong.");
      });
  }
};


  // Fetch data from backend
  const fetchUsers = () => {
    axios
      .get("http://localhost:3000/api/client/view")
      .then((res) => {
        if (res.data.status === "1") {
          setUsers(res.data.data); // ✅ Save user list
        }
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle Edit/Delete
  const handleEdit = (user) => {
  setFormData({
    name: user.name,
    email: user.email,
    phone: user.phone,
    message: user.message,
  });
  setEditingId(user._id); // Save user ID to edit
};


  const handleDelete = (id) => {
    alert("Delete user with ID: " + id);
  };

  return (
    <div className="flex items-center justify-center min-h-screen gap-6 bg-gray-100">
      <div className="mt-10 p-6 bg-white shadow-md rounded">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Student Inquiry Form
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mb-3 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full mb-3 p-2 border border-gray-300 rounded"
          />
          <input
            type="email"
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
            rows="4"
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="max-w-6xl mx-auto mt-10 p-4">
        <h2 className="text-2xl font-semibold mb-4">User Inquiries</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2">S.No.</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Phone</th>
                <th className="border px-4 py-2">Message</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="text-center">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.phone}</td>
                  <td className="border px-4 py-2">{user.message}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleEdit(user._id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    No inquiries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Layout;
