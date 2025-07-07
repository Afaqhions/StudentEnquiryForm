// Importing Controllers
const { saveUserEnquiry, getUserEnquiry } = require("../../Controllers/Client/userEnquiries.js");
const router = require("express").Router();

// Route to handle enquiry insertion
router.post("/insert-enquiry", saveUserEnquiry);
// Route to handle fetching enquiries
router.get("/enquiries", getUserEnquiry)

// Exporting the router
module.exports = router;
