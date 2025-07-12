import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import EnquiryForm from "../Component/EnquiryForm";
import EnquiryList from "../Component/EnquiryList";

export function Layout() {
  const [users, setUsers] = useState([]);
  const [editingEnquiry, setEditingEnquiry] = useState(null);

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

  const handleEdit = (enquiry) => {
    setEditingEnquiry(enquiry);
  };

  const handleFormSubmit = () => {
    fetchUsers();
    setEditingEnquiry(null);
  };

  return (
    <div className="flex flex-col items-center min-h-screen gap-6 bg-gray-100 px-4 py-10">
      <ToastContainer />

      <EnquiryForm
        enquiry={editingEnquiry}
        onFormSubmit={handleFormSubmit}
        onCancel={() => setEditingEnquiry(null)}
      />

      <EnquiryList
        users={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Layout;
