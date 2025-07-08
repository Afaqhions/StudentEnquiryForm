// Importing Controllers
const { saveUserEnquiry, getUserEnquiry, DeleteUser, updateEnquiry } = require("../../Controllers/Client/userEnquiries.js");
const router = require("express").Router();

// Route to handle enquiry insertion
router.post("/insert-enquiry", saveUserEnquiry);

// Route to handle fetching enquiries
router.get("/view", getUserEnquiry)

//Route to Edit user
router.delete("/delete/:id", DeleteUser)

// Rout to update Enquiry data
router.put("/update/:id", updateEnquiry)

// Exporting the router
module.exports = router;