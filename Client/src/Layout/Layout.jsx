import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import EditEnquiry from "../Component/enquiryEdit"; //Import the edit component

export function Layout() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null); // Track which enquiry is being edited

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission (for new enquiry)
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/client/insert-enquiry", formData)
      .then(() => {
        toast.success("Enquiry added!");
        setFormData({ name: "", email: "", phone: "", message: "" });
        fetchUsers();
      })
      .catch(() => toast.error("Failed to add enquiry"));
  };

  // Fetch all enquiries
  const fetchUsers = () => {
    axios
      .get("http://localhost:3000/api/client/view")
      .then((res) => {
        if (res.data.status === "1") {
          setUsers(res.data.data);
        }
      })
      .catch(() => toast.error("Failed to fetch enquiries"));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle delete with confirmation
  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete this enquiry?",
      text: "You won’t be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/api/client/delete/${id}`)
          .then(() => {
            toast.success("Deleted successfully");
            fetchUsers();
          })
          .catch(() => toast.error("Failed to delete enquiry"));
      }
    });
  };

  return (
    <div className="flex flex-col items-center min-h-screen gap-6 bg-gray-100 px-4 py-10">
      <ToastContainer />

      {/* New Enquiry Form */}
      <div className="w-full max-w-md bg-white p-6 shadow-md rounded">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Add New Enquiry
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
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Enquiries Table */}
      <div className="w-full max-w-6xl bg-white p-4 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center sm:text-left">
          All User Enquiries
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2">#</th>
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
                      onClick={() => setEditId(user._id)}
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
                    No enquiries yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/*Edit Enquiry Component Appears Here */}
      {editId && (
        <EditEnquiry
          enquiryId={editId}
          onClose={() => setEditId(null)}
          onUpdated={fetchUsers}
        />
      )}
    </div>
  );
}

export default Layout;
