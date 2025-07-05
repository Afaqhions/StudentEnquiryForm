// Importing Controllers
let userEnquiry = require("../../Controllers/Client/userEnquiry.js");
let router = require("express").Router();
router.use(express.json());

router.post("/insert-enquiry",userEnquiry);


module.exports = router;