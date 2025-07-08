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
const getUserEnquiry = async (req,res)=>{
    try{
        const enquiries = await Enquiry.find();
        res.send({status:"1",data:enquiries});
    } catch(error){
        res.status(500).json({error:"Server error"})
    }
}

// Editing user Controller
const DeleteUser = async(req,res)=>{
    const userId = req.params.id;
    const delUser = await Enquiry.deleteOne({_id:userId})
    res.send({status:"1",message:"Deleted Successfully"},delUser)
}

// Updating Controller
const updateEnquiry = async(req,res)=>{
    const userId = req.params.id;
    const userEnquiryData = await Enquiry.findOne({_id:userId})
    res.send({status:"1",data})
}

module.exports = { saveUserEnquiry, getUserEnquiry, DeleteUser, updateEnquiry };