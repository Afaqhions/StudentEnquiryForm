let mongoose = require("mongoose");

// Creating Schema for Enquiry
let enquirySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    message:{
        type:String,
        requires:true
    }
})
// Packing Model to Enquiry
let Enquiry = mongoose.model("Enquiry", enquirySchema);

// Exporting Enquiry Model
module.exports = Enquiry;