// Importing Controllers
const { saveUserEnquiry,getUserEnquiry, getAllUserEnquiry, DeleteUser, updateEnquiry } = require("../../Controllers/Client/userEnquiries.js");
const router = require("express").Router();

// Route to handle enquiry insertion
router.post("/insert-enquiry", saveUserEnquiry);

// Route to handle fetching users
router.get("/view", getAllUserEnquiry)

// Route to handle fetching user by id
router.get("/view/:id", getUserEnquiry)

//Route to Edit user
router.delete("/delete/:id", DeleteUser)

// Rout to update Enquiry data
router.put("/update/:id", updateEnquiry)

// Exporting the router
module.exports = router;