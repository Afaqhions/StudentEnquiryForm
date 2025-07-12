const Enquiry =require("../../Models/enquiry.model.js");

const saveUserEnquiry = async (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const savedEnquiry = await Enquiry.create({ name, email, phone, message });
        res.status(201).json({ message: "Enquiry submitted successfully", data: savedEnquiry });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ error: "Email already exists." });
        }
        console.error("Error adding enquiry:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Getting Data from Model
const getAllUserEnquiry = async (req,res)=>{
    try{
        const enquiries = await Enquiry.find();
        res.send({status:"1",data:enquiries});
    } catch(error){
        res.status(500).json({error:"Server error"})
    }
}

const getUserEnquiry = async (req, res) => {
    try {
        const { id } = req.params;
        const enquiry = await Enquiry.findById(id);
        if (!enquiry) {
            return res.status(404).json({ status: "0", message: "Enquiry not found" });
        }
        res.send({ status: "1", data: enquiry });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Deleting user Controller
const DeleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEnquiry = await Enquiry.findByIdAndDelete(id);

        if (!deletedEnquiry) {
            return res.status(404).json({ status: "0", message: "Enquiry not found" });
        }

        res.status(200).json({ status: "1", message: "Enquiry deleted successfully" });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({
            status: "0",
            message: "Failed to delete enquiry",
            error: error.message,
        });
    }
};

// Updating Controller
const updateEnquiry = async (req, res) => {
  try {
    const enquiryId = req.params.id;
    const updateData = req.body;

    const updated = await Enquiry.findByIdAndUpdate(enquiryId, updateData, { new: true });

    if (!updated) {
      return res.status(404).json({ status: "0", message: "Enquiry not found" });
    }

    res.status(200).json({
      status: "1",
      message: "Enquiry updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({
      status: "0",
      message: "Failed to update enquiry",
      error: error.message,
    });
 }
}

module.exports = { saveUserEnquiry,getAllUserEnquiry ,getUserEnquiry, DeleteUser, updateEnquiry };