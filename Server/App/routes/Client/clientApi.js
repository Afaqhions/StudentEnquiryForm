// Importing Controllers
const { saveUserEnquiry, getUserEnquiry, editUser } = require("../../Controllers/Client/userEnquiries.js");
const router = require("express").Router();

// Route to handle enquiry insertion
router.post("/insert-enquiry", saveUserEnquiry);

// Route to handle fetching enquiries
router.get("/view", getUserEnquiry)

//Route to Edit user
router.put("/edit:id", editUser)

// Exporting the router
module.exports = router;
