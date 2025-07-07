import axios from "axios";
export function Layout() {
  // Function to prevent page refresh on form submission
  let saveEnquiry = (e) => {
    // Creating object to store data
    let formData = {
      name:e.target.name.value,
      phone:e.target.phone.value,
      email: e.target.email.value,
      message:e.target.message.value,
    }
    axios.post("http://localhost:3000/api/client/insert-enquiry",formData).then((res)=>{
      console.log("Enquiry saved successfully:", res.data);
    }).catch((err)=>{
      console.error("Error saving enquiry:", err);
    });
    alert("Enquiry saved successfully!");
    e.preventDefault();
  };
  // Sample user data
  let users = [
    {
      id: 1,
      name: "John Doe",
      email: "m@gmail.com",
      message: "Interested in the course",
      phone: "1234567890"
    },
  ];

  function handleEdit(id) {
    alert("Edit user with ID: " + id);
  }

  function handleDelete(id) {
    alert("Delete user with ID: " + id);
  }
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen gap-6 bg-gray-100">
        <div className="mt-10 p-6 bg-white shadow-md rounded">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Student Inquiry Form
          </h2>
          <form onSubmit={saveEnquiry}>
            <div className="mb-4">
              <label className="block mb-1">Name</label>
              <input
                type="text" name="name"
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Phone Number</label>
              <input
                type="text" name="phone"
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Email</label>
              <input
                type="email" name="email"
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Message</label>
              <textarea
                rows="4" name="message"
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>
        <div>
          <table>
            <div className="max-w-6xl mx-auto mt-10 p-4">
              <h2 className="text-2xl font-semibold mb-4">User Inquiries</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="border px-4 py-2">S.No.</th>
                      <th className="border px-4 py-2">Name</th>
                      <th className="border px-4 py-2">Email</th>
                      <th className="border px-4 py-2">Phone No</th>
                      <th className="border px-4 py-2">Message</th>
                      <th className="border px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={user.id} className="text-center">
                        <td className="border px-4 py-2">{index + 1}</td>
                        <td className="border px-4 py-2">{user.name}</td>
                        <td className="border px-4 py-2">{user.email}</td>
                        <td className="border px-4 py-2">{user.phone}</td>
                        <td className="border px-4 py-2">{user.message}</td>
                        <td className="border px-4 py-2 space-x-2">
                          <button
                            onClick={() => handleEdit(user.id)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Layout