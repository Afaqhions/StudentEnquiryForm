import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify"
import Swal from 'sweetalert2/dist/sweetalert2.js'

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

    // New entry
    axios
      .post("http://localhost:3000/api/client/insert-enquiry", formData)
      .then((res) => {
        toast.success("Added Successfully.")
        setFormData({ name: "", email: "", phone: "", message: "" });
        fetchUsers();
      })
      .catch((err) => {
        console.error("Error saving enquiry:", err);
        toast.error("Something went Wrong.")
      });
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

 const handleEdit = (id) => {
  axios
    .get(`http://localhost:3000/api/client/view/${id}`)
    .then((res) => {
      setFormData(res.data.data); // Assuming res.data.data is the enquiry object
      toast.warn(`Editing enquiry with ID: ${id}`);
    })
    .catch((err) => {
      console.error("Error fetching enquiry:", err);
      toast.error("Failed to load enquiry for editing.");
    });
  };



  const handleDelete = (id) => {
    Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Delete",
        denyButtonText: `Don't delete`
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://localhost:3000/api/client/delete/${id}`)
          toast.success("Deleted Successfully.")
          Swal.fire("Deleted!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Enquiry not Deleted", "", "info");
        }
      });
          
  };

  return (
    <div className="flex flex-wrap items-start justify-center min-h-screen gap-6 bg-gray-100 px-4 py-10 sm:flex-col">
  {/* Form */}
  <ToastContainer />
  <div className="w-full max-w-md bg-white p-6 shadow-md rounded">
    <h2 className="text-xl font-semibold mb-4 text-center">Student Inquiry Form</h2>
    <form onSubmit={ handleSubmit }>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData?.name}
        onChange={handleChange}
        className="w-full mb-3 p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={formData?.phone}
        onChange={handleChange}
        className="w-full mb-3 p-2 border border-gray-300 rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData?.email}
        onChange={handleChange}
        className="w-full mb-3 p-2 border border-gray-300 rounded"
      />
      <textarea
        name="message"
        placeholder="Message"
        value={formData?.message}
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
  <div className="w-full max-w-6xl bg-white p-4 rounded shadow-md">
    <h2 className="text-2xl font-semibold mb-4 text-center sm:text-left">User Inquiries</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 text-sm sm:text-xs">
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
                  onClick={() => handleEdit(user._id)} onChange={fetchUsers()}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mb-1"
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
